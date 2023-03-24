import { connect, disconnect, connection } from 'mongoose'
import { Carreer } from './schemas/Carreer'
import { Subject } from './schemas/Subject'

const url = 'mongodb://localhost:27017/paramed'

const afterConnection = async () => {
    const cienciasComputacion = await new Carreer({
        name: 'Ciencias de la Computación',
        notes: 'Plan de carrera 2013'
    }).save()

    const arqSoftware = await new Subject({
        name: 'Arquitectura de Software',
        carreerId: [cienciasComputacion._id]
    }).save()
}

const run = async () => {
    try {
        await connect(url)
        // Dropeamos la db antes de volver a poblarla
        connection.dropDatabase()
        await afterConnection()
    } finally {
        await disconnect()
    }
}
run()