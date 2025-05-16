import Answer from "../models/answer.js";
const getAnswers = async() =>{
    try{
        const answers = await Answer.find({});
        return answers;
    }catch(err){
        throw new Error("Failed to get answers");
    }
};
export {
    getAnswers
}