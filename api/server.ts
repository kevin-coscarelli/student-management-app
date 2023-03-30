import mongoose, { connect, connection } from "mongoose"
import { models } from './schemas/models'
import { logger } from "./logger"
import { ReqMethods, getEndpointHandler, registerAllEndpoints } from "./EPLogic"
import { mongodbUrl } from "./helpers/general"
// @ts-ignore ts(1479)
import chalk from "chalk"

type CarreerT = ReturnType<typeof models.get>['Carreer']
type SubjectT = ReturnType<typeof models.get>['Subject']

let Carreer: CarreerT, Subject: SubjectT
const port = 8081

mongoose.set('strictQuery', false);
const run = async () => {
    connection.on('error', (err) => logger('MongoDB', 'MongoDB Error:', err));
    connection.on('open', () => logger('MongoDB', 'Connected to MongoDB'))
    connection.on('disconnected', () => logger('MongoDB', 'Disconnected from MongoDB'))

    await connect(mongodbUrl)
    Carreer = models.get().Carreer
    Subject = models.get().Subject

    /**
     * Registramos los endpoints después de conectarnos a la DB para asegurarnos
     * de que los modelos estén definidos y que no haya errores.
     */
    registerAllEndpoints()

    Bun.serve({
        port: port,
        async fetch(req) {
            const url = new URL(req.url).pathname
            const method = req.method as ReqMethods
            logger('HTTP', `${chalk.blue.bold.inverse('REQUEST')}: ${method} ${url}`)
            const res = await getEndpointHandler(url)(req)
            logger('HTTP', `${chalk.blue.bold.inverse('RESPONSE')}: ${res.status}: ${url}`, res.body)
            return res
        },
        error(error: Error) {
            return new Response(`<pre>${error}\n${error.stack}</pre>`, {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        },
    })

    logger('Helper', `HTTP server listening on port ${port}`)
    logger('HTTP', 'Handling request')
}

run()
    .catch(console.error)
    .finally();