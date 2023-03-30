import { model } from "mongoose"
import { carreerSchema } from "./Carreer"
import { subjectSchema } from "./Subject"

const createModels = () => {
    const Carreer = model('Carreer', carreerSchema)
    const Subject = model('Subject', subjectSchema )
    return {
        Carreer,
        Subject
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
