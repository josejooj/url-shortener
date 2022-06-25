import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

//@ts-ignore
mongoose.connect(process.env.MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })

const Url = mongoose.model('urls', new mongoose.Schema({
    _id: String,
    userId: String,
    customUrl: String,
    url: String,
    createdTimestamp: Number,
    connections: Array,
    public: Boolean
}))

export {
    Url,
    SchemaTS
}

interface SchemaTS {
    _id: String,
    userId: String,
    customUrl: String,
    url: String,
    createdTimestamp: Number,
    connections: Array<Connections>,
    public: Boolean
}

interface Connections {
    country: string
    countryCode: string
    region: string
    regionName: string
    city: string
    lat: number
    lon: number
    timezone: string
    as: string
    query: string
    from: string
    timestamp: number
    timestampF: string
}