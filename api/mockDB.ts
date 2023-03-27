import { connect, disconnect, connection, ObjectId } from 'mongoose'
import { Carreer } from './schemas/Carreer'
import { Subject } from './schemas/Subject'

export const mongodbUrl = 'mongodb://localhost:27017/paramed'

const carreers = [
    {
        name: 'Computer Science',
        notes: 'Carreer Plan 2013'
    },
    { name:'Business Administration' },
    { name: 'Engineering' }
]

const subjects = [
    [
        'Introduction to Programming',
        'Data Structures and Algorithms',
        'Computer Networks',
        'Operating Systems',
        'Software Engineering',
        'Database Systems',
        'Computer Architecture',
        'Artificial Intelligence',
        'Machine Learning',
        'Computer Graphics',
        'Human-Computer Interaction',
        'Computer Security',
        'Web Development',
        'Mobile App Development',
        'Cloud Computing',
        'Diseño Multimedia',
    ],
    [
        'Accounting',
        'Marketing',
        'Finance',
        'Management',
        'Human Resources',
        'Operations Management',
        'Strategic Management',
        'Organizational Behavior',
        'Business Law',
        'Economics',
        'Entrepreneurship',
        'International Business',
        'Business Ethics',
        'Information Systems',
        'Business Communication'
    ],
    [
        'Calculus',
        'Physics',
        'Chemistry',
        'Statics',
        'Dynamics',
        'Thermodynamics',
        'Materials Science'
    ]
]

const saveSubjects = (subjectsArr: string[]) => {
    return subjectsArr.map(async (subj) => {
        const savedSubject = await new Subject({
            name: subj,
        }).save()
        return savedSubject._id
    })
}

const afterConnection = async () => {
    const subjectsIds = await Promise.all(subjects.map(async(subs) => {
        return await Promise.all(saveSubjects(subs))
    }))
    const [computerSci, businessAdmin, engineering] = await Promise.all(carreers.map(async (obj, index) => {
        return new Carreer({
            subjects: subjectsIds[index],
            ...obj
        }).save()
    }))
}

const run = async () => {
    try {
        await connect(mongodbUrl)
        // Dropeamos la db antes de volver a poblarla
        connection.dropDatabase()
        await afterConnection()
    } finally {
        await disconnect()
        process.exit()
    }
}
run()