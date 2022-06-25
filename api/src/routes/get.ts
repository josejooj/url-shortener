import { Request, Response } from 'express'
import Base64 from '../base64';
import { Url, SchemaTS } from '../db'
import { sendError } from '../main'

export default async function (req: Request, res: Response) {

    const { query } = req

    console.log(req.query)
    //@ts-ignore
    const data: SchemaTS = await Url.findOne({ _id: query.token })

    if (!data || req.cookies.userId !== data.userId && !data.public) return sendError(res, 2)

    res.send(data)
}