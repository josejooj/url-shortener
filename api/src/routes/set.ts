import { Request, Response } from 'express'
import Base64 from '../base64';
import { Url, SchemaTS } from '../db'
import { OnlyNumbersAndChars, siteurl, sendError } from '../main'
import moment from 'moment';

export default {
    get,
    post
}

async function get(req: Request, res: Response) {

    const { query } = req

    //@ts-ignore
    const url: string = query.url || "";

    if (!/(https?:\/\/).+\..+(\/.*)?/gm.test(url)) return sendError(res, 1, 200)
    let c = await Url.findOne({ customUrl: OnlyNumbersAndChars(`${query.customUrl}`) })

    if (c) {
        let exists = 1;
        for (let i = 0; exists; ++i) {
            c = await Url.findOne({ customUrl: OnlyNumbersAndChars(`${query.customUrl}${i}`) });
            if (!c) {
                //@ts-ignore
                query.customUrl = query.customUrl + i;
                exists = 0;
            }
        }
    }

    const pass = {
        _id: OnlyNumbersAndChars(Base64.encode(`${Date.now()}.${req.cookies.userId}`)),
        url: query.url,
        userId: req.cookies.userId,
        customUrl: OnlyNumbersAndChars(`${(query.customUrl || Base64.encode((Math.random() * Date.now()).toString(36)))}`),
        createdTimestamp: new Date().getTime(),
        connections: []
    }

    new Url(pass).save()
    return res.redirect(siteurl + 'view/' + pass._id)
}

async function post(req: Request, res: Response) {

    //@ts-ignore
    const customUrl = req.headers.referer.split('/').reverse()[0]
    //@ts-ignore
    if (req.query.status == 1) return;
    //@ts-ignore
    const data: SchemaTS = await Url.findOne({ customUrl })
    //@ts-ignore
    const q: any = JSON.parse(req.query.url)

    res.send({ url: data.url })

    console.log(data);

    const toput = {
        country: q.country,
        countryCode: q.countryCode,
        region: q.region,
        regionName: q.regionName,
        city: q.city,
        lat: q.lat,
        lon: q.lon,
        timezone: q.timezone,
        as: q.as,
        query: q.query,
        from: req.headers['user-agent'],
        timestamp: new Date().getTime(),
        timestampF: moment(new Date()).format('DD/MM/yyyy [ás] hh:mm:ss')
    }

    for (let x of Object.entries(toput)) {
        //@ts-ignore
        if (!x[1]) delete toput[x[0]]
    }
    //@ts-ignore
    data.connections.push(toput)
    const { connections } = data;
    //@ts-ignore
    Url.findOneAndUpdate({ customUrl }, { connections }, () => { })

}