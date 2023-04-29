import { EndpointHandler } from "../EPLogic"
import { signJWT } from "../helpers/jwt"
import { logger } from "../logger"
import { models } from "../schemas/models"
import * as bcrypt from 'bcryptjs'

const User = models.get().User

const loginHandler: EndpointHandler = async (req) => {
    try {
        if (req.method === 'POST') {
            const { email, password } = await req.json() as any
            // Comparamos el email y la contraseña con la base de datos
            const resPayload = await User.findOne({
                email,
                password
            }, ['_id', 'email']).lean()
    
            
            if (resPayload?.email) {
                logger('HTTP', 'Login attempt', resPayload.email)
                // Generamos el JSON Web Token a partir del email y el id del usuario,
                // lo encriptamos y devolvemos el token en la respuesta.
                const token = await signJWT(resPayload.email, resPayload._id)
                if (!token) return new Response('Error signing JWT', { status: 500 })
                
                // Encriptamos el token para que no pueda ser leído por el cliente
                const hashToken = await bcrypt.hash(token, 10)

                return new Response('Login successful', {
                    status: 200,
                    headers: {
                        'Content-Type': 'text/plain',
                        'Set-Cookie': `jwt=${hashToken}; Secure; Max-Age=${60 * 60 * 1000}`
                    },
                })
            }
    
            return new Response('Invalid credentials', { 
                status: 401,
                headers: {
                    'Set-Cookie': `jwt=; Secure; Max-Age=0`
                }
            })
        }
    
        return new Response('Unhandled HTTP method', { status: 405 })
    }

    catch (e: any) {
        return new Response(e?.message, { status: 500 })
    }
}

export const login = { url: '/api/login', handler: loginHandler }
