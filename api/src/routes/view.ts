import { Request, Response } from 'express';
import { fileurl } from '../main';
import { Url } from '../db';

export default function(req: Request, res: Response) {

    const result = Url.findOne({ _id: req.params.id, userId: req.cookies.userId })

    if (!result) res.sendFile(fileurl + '404/index.html')

    res.sendFile(fileurl + 'view/index.html')

}