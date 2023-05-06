import { Schema, ObjectId } from "mongoose"
import { basicPreSave } from "../helpers/general"

export const gradeSchema = new Schema({
    final: Boolean,
    updated_at: Date,
    created_at: Date,
    // @ts-ignore ts(2693)
    subject: { type: ObjectId, ref: 'Subject' },
    title: String,
    comment: String,
    mark: String,
    date: Date,
    pass: Boolean,
})

gradeSchema.pre('save', function() {basicPreSave(this)})