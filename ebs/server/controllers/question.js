import Question from "../models/question.js";

const getQuestionsList = async() =>{
    try{
        const questionsList = await Question.find({});
        console.log(questionsList);
        return questionsList;
    }catch(err){
        throw new Error(`Failed to get questions reason -->${err.message}`);
    }
};
export {getQuestionsList};
