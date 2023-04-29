import { connect, disconnect, connection, ObjectId } from 'mongoose'
import { models } from './schemas/models'
import { logger } from './logger'
import { mongodbUrl } from './helpers/general'
import { carreers, subjects, users } from './fakeDB'

const { Carreer, Subject, User } = models.get()

const saveSubjects = (subjectsArr: string[]) => {
    return subjectsArr.map(async (subj) => {
        const savedSubject = await new Subject({
            name: subj,
        }).save()
        return savedSubject._id
    })
}

const afterConnection = async () => {
    const subjectsIds = await Promise.all(subjects.map(async (subs) => {
        return await Promise.all(saveSubjects(subs))
    }))
    const [computerSci, businessAdmin, engineering] = await Promise.all(carreers.map(async (obj, index) => {
        return new Carreer({
            subjects: subjectsIds[index],
            ...obj
        }).save()
    }))
    const [john, jane, admin] = await Promise.all(users.map(async (obj) => {
        return new User({
            ...obj,
            carreers: (obj.type === 'student' || obj.type === 'teacher') ? computerSci._id : null,
            subjects: (obj.type === 'student' || obj.type === 'teacher') ? [subjectsIds[0][0], subjectsIds[0][1]] : null
        }).save()
    }))
}

const run = async () => {
    try {
        await connect(mongodbUrl)
        // Dropeamos la db antes de volver a poblarla
        logger('MongoDB', 'db-seed: Dropping database')
        await connection.dropDatabase()
        logger('MongoDB', 'db-seed: Populating database')
        await afterConnection()
    } 
    catch (error) {
        logger('MongoDB', 'db-seed: Error populating database', error)
    }
    finally {
        await disconnect()
        process.exit()
    }
}
run()