import { model } from "mongoose"
import { carreerSchema } from "./Carreer"
import { subjectSchema } from "./Subject"
import { userSchema } from "./User"

const createModels = () => {
    const Carreer = model('Carreer', carreerSchema)
    const Subject = model('Subject', subjectSchema )
    const User = model('User', userSchema)
    return {
        Carreer,
        Subject,
        User
    }
}

export const models = (() => {
    let modelsInstance: ReturnType<typeof createModels> | undefined
    return {
        get: () => {
            modelsInstance = createModels() ?? modelsInstance
            return modelsInstance
        }
    }
})()
