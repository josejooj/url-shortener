import express, { NextFunction, Request, Response } from 'express';
import Base64 from './base64';
import cookieParser from 'cookie-parser';
import set from './routes/set';
import view from './routes/view';
import global from './routes/global';
import get from './routes/get';
import { OnlyNumbersAndChars, getJson, generateToken, sendError } from './vars'

const app = express();
const siteurl = 'http://localhost:8080/';
const fileurl = process.cwd() + '/public/'

app.use('/public', express.static(fileurl));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser())
app.set('view engine', 'ejs');
app.use((req: Request, res: Response, next: NextFunction) => {
    
    if (!req.cookies?.userId) res.cookie('userId', Base64.encode(`${Math.random()}`), {  maxAge: 39211e9 });

    next()

})

const routes = {
    home: {
        identifier: /^\/(home(page)?)?$/
    },
    set: {
        identifier: '/set',
        fn: set
    },
    get: {
        identifier: '/get',
        fn: get
    },
    view: {
        identifier: '/view/:id',
        fn: view
    }
}

app.get(routes.home.identifier, (req: Request, res: Response) => res.sendFile(fileurl + 'home/index.html'))
app.get(routes.set.identifier, routes.set.fn.get)
app.get(routes.view.identifier, routes.view.fn)
app.get(routes.get.identifier, routes.get.fn)
app.post(routes.set.identifier, routes.set.fn.post)
app.get('*', global)

app.listen(8080, () => console.log("API Iniciada na porta 8080"));

// funções

export {
    OnlyNumbersAndChars,
    getJson,
    generateToken,
    sendError,
    app,
    siteurl,
    fileurl
}

