import { Schema, model, ObjectId } from 'mongoose'
import { basicPreSave } from '../helpers/general'

export const subjectSchema = new Schema({
    // ts se queja porque si.
    // @ts-ignore ts(2693)
    created_at: Date,
    updated_at: Date,
    name: String,
    note: String,
    archived: Boolean
})

subjectSchema.pre('save', function() {basicPreSave(this)})
