import e from 'express';
import "dotenv/config";
import path,{resolve} from 'path';
import fs from 'fs';
import {createServer as createViteServer} from 'vite';
import mongoose from 'mongoose';


import questionRouter from './routes/question.js';
import answerRouter from './routes/answer.js';



const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV === 'dev';
const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopify-express-app";

mongoose.connect(mongoUrl);


const createServer = async(root = process.cwd()) =>{
    const app = e();
    app.use(e.json());
    app.use("/question",questionRouter);
    app.use("/answer",answerRouter);
    if(dev){
        const vite = await createViteServer({
            root: path.resolve(process.cwd(),"client"),
            server:{
                middlewareMode: true,
                hmr: {
                    server: app.listen(port,() =>{
                        console.log(`Dev server is runnning on port localhost:${port}`)
                    })
                },
            },
            appType: 'spa'
        });
        app.use(vite.middlewares);
        app.use("'/*\w'",async(req,res) =>{
            const url = req.originalUrl;
            let template = fs.readFileSync(
                path.resolve(process.cwd(),"client","index.html"),
                "utf-8"
            );
            template = await vite.transformIndexHtml(url,template);
            res.status(200).set({
                'content-type':'text/html'
            }).end(template);
        })
    }
    return app;
};
createServer();