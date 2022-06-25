export default class Base64 {

    static encode(arg: string) {
        return Buffer.from(arg).toString('base64')
    }

    static decode(arg: string) {
        return Buffer.from(arg, 'base64').toString('ascii')
    }

}