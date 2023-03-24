import { Schema, model, ObjectId } from 'mongoose'
import { basicPreSave } from '../helpers/general'

const subjectSchema = new Schema({
    // ts se queja porque si.
    // @ts-ignore ts(2693)
    carreerId: [ObjectId],
    createdAt: Date,
    updatedAt: Date,
    name: String,
    note: String,
    archived: Boolean
})

subjectSchema.pre('save', async function() {basicPreSave(this)})

export const Subject = model('Subject', subjectSchema)