import { Router } from "express";
import { getQuestionsList } from "../controllers/question.js";

const questionRouter = Router();

questionRouter.get("/list",async(req,res) =>{
    console.log("question route was hit");
    try{
        const questions = await getQuestionsList();
        console.log(questions);
        res.status(200).send({
            ok: true,
            questions
        })
    }catch(err){
        res.status(420).send({
            ok: false,
            message: "Failed to get questions"
        })
    }
});

export default questionRouter;