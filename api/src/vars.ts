import Base64 from './base64';
import { Response } from 'express';

const erros = getJson('./erros.json')

Date.now = function () {
    return new Date().getTime()
}

function getJson(path: string) {
    return JSON.parse(require('fs').readFileSync(path))
}

function generateToken(username: string): string {
    function gen(): string {
        return ((Math.random() * 1000) * (Math.random() * 1000)).toString(32)
    }
    return (Base64.encode(username || "Sem nome de usuário") + '.' + Base64.encode(new Date().toLocaleString()) + '.' + Base64.encode(gen() + gen() + gen() + gen() + gen()))
}

function OnlyNumbersAndChars(base: string | string[]): string {

    if (typeof base == 'string') base = base.split("")
    else if (Array.isArray(base)) {
        const newarr = []
        for (let x of base) {
            if (typeof x == 'string') { for (let y of x) { newarr.push(y) } }
            base = newarr
        }
    } 

    base = base.filter((x: string): boolean | void => {
        const char = x.charCodeAt(0)
        if (char >= 48 && char <= 57  /* Números */
         || char >= 97 && char <= 122 /* Letras minúsculas */
         || char >= 65 && char <= 90  /* Letras maiúsculas */) return true;
    })
    return base.join("")
}

function sendError(res: Response, code: number, status?: number, callback?: Function): void {
    
    erros['1']

    if(!status) status = 401;
    res.send({ code, status, description: erros[`${code}`] });
    if(callback) callback();
}

export {
    OnlyNumbersAndChars,
    getJson,
    generateToken,
    sendError
}