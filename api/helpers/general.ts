import { logger } from "../logger"

export const mongodbUrl = 'mongodb://127.0.0.1:27017/paramed'

export function construct(ctx: { [key: string]: any }, args: { [key: string]: any }) {
    for (let key in args) {
        ctx[key] = args[key]
    }
}

export async function basicPreSave(that: any) {
    const rn = new Date()
    that.updatedAt = rn
    that.createdAt = rn ?? that.createdAt
    that.archived = false ?? that.archived
}

export async function readStream(stream?: ReadableStream) {
    if (!stream) return null
    let data = '';
    for await (const chunk of stream) {
        data += chunk.toString();
    }
    logger('DATA', data)
    return data;
}