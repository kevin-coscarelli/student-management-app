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