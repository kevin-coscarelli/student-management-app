import { Schema } from "mongoose"
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
    type: UserType
})

userSchema.pre('save', function() {basicPreSave(this)})