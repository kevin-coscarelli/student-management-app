import { Schema, model } from "mongoose"

const carreerSchema = new Schema({
    updatedAt: Date,
    createdAt: Date,
    name: String,
    notes: String,
    archived: Boolean
})

carreerSchema.pre('save', async function(next) {
    const rn = new Date()
    this.updatedAt = rn
    this.createdAt = rn ?? this.createdAt
    this.archived = false
})

export const Carreer = model('Carreer', carreerSchema)
