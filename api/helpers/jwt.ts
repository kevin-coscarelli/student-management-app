import { Types } from 'mongoose'
import { jwtProps } from '../../env'
import * as jose from 'node-jose'

const privateKey = await Bun.file('./keys/jwt-private-pk8key.pem', {
    type: 'pem',
}).text()
const publicKey = await Bun.file('./keys/jwt-public-key.pem', {
    type: 'pem',
}).text()

// Importamos las keys en jose
const josePrivateKey = await jose.JWK.asKey(privateKey, 'pem')
const josePublicKey = await jose.JWK.asKey(publicKey, 'pem')

export const signJWT = async (email: string, id: Types.ObjectId) => {
    try {
        const tokenPayload = {
            email,
            id,
        }

        const signer = await jose.JWS.createSign({ format: 'compact' }, josePrivateKey)
            .update(JSON.stringify(tokenPayload))
            .final()

        const encryptor = await jose.JWE.createEncrypt({ format: 'compact' }, josePublicKey)
            .update(signer)
            .final()

        verifyJWT(encryptor)

        return encryptor
    } catch (e: any) {
        console.error(e)
    }
}

export const verifyJWT = async (token: string) => {
    try {
        const decryptor = await jose.JWE.createDecrypt(josePrivateKey).decrypt(token)
        const payload = await decryptor.payload.toString('utf8')

        return parseJwt(payload)
    } catch (e: any) {
        console.error(e)
    }
}

const encodeBuffer = (buffer: Buffer) => buffer.toString('base64')
const encodeString = (string: string) => encodeBuffer(Buffer.from(string))
const encodeData = (data: { [key: string]: any }) => encodeString(JSON.stringify(data))
export const encode = (data: any) => {
    if (Buffer.isBuffer(data)) return encodeBuffer(data)
    if (typeof data === 'string') return encodeString(data)
    return encodeData(data)
}
export const decode = (string: string) => {
    const decoded = Buffer.from(string, 'base64').toString()
    try {
        return JSON.parse(decoded)
    } catch (e) {
        return decoded
    }
}
const parseJwt = function(token: string) {
    var base64Url = token.split('.')[1]
    var base64 = base64Url.replace('-', '+').replace('_', '/')
    return decode(base64)
  }