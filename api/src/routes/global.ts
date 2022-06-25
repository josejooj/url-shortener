import { Request, Response } from 'express';
import { fileurl } from '../main';
import { Url } from '../db';
import fs from 'fs'

export default async function(req: Request, res: Response) {

    const url = req.url.split('/').reverse()[0]
    
    const urlInfo = await Url.findOne({ customUrl: url })

    if(!urlInfo) return res.status(404).sendFile(fileurl + '404/index.html')
    else {

                     res.sendFile(fileurl+'\\redirect\\index.html')
        const c = fs.readFileSync(fileurl+'\\redirect\\index.html')
        console.log(c)
    }
}