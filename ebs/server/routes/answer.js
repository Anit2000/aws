import { Router } from "express";
import { getAnswers } from "../controllers/answer.js";

const answerRouter = Router();

answerRouter.get("/",async(req,res) =>{
    try{
        const answers = await getAnswers();
        res.status(200).send({
            ok: true,
            answers
        })
    }catch(err){
        res.status(420).send({
            ok: false,
            message: `Failed to get answers reason --> ${err.message}`
        })
    }
});
export default answerRouter;