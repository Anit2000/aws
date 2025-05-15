import e from 'express';
import "dotenv/config";
import path,{resolve} from 'path';
import fs from 'fs';


import {createServer as createViteServer} from 'vite';

const port = process.env.PORT || 8080;
const dev = process.env.NODE_ENV === 'dev';


const createServer = async(root = process.cwd()) =>{
    const app = e();
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