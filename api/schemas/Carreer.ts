import { Schema, model, ObjectId } from "mongoose"
import { basicPreSave } from "../helpers/general"

const carreerSchema = new Schema({
    updated_at: Date,
    created_at: Date,
    name: String,
    notes: String,
    archived: Boolean,
    // @ts-ignore ts(2693)
    subject_id: [ObjectId]
})

/**
 * En la linea de abajo pasamos "function() {}" como parametro en lugar de una arrow
 * function "() => {}" porque function bindea la variable "this". Es posible que
 * carreerSchema.pre() tome el callback y lo llame con call(), apply() o bind(), que
 * permiten setear manualmente el valor de "this".
 */
carreerSchema.pre('save', function() {basicPreSave(this)})

export const Carreer = model('Carreer', carreerSchema)
