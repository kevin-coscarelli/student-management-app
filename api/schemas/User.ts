import { Schema, ObjectId } from "mongoose"
import { basicPreSave } from "../helpers/general"
import { UserType } from "./enums"

export const userSchema = new Schema({
    user_name: String,
    student_number: String,
    updated_at: Date,
    created_at: Date,
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    active: Boolean,
    type: UserType,
    // @ts-ignore ts(2693)
    carreers: [{ type: ObjectId, ref: 'Carreer' }],
    // @ts-ignore ts(2693)
    subjects: [{ type: ObjectId, ref: 'Subject' }]
})

userSchema.pre('save', function() {basicPreSave(this)})