import mongoose from "mongoose";

const answerSchema = mongoose.Schema({
    uuid:{
        type: String,
        required: true
    },
    answer:{
        type: String,
        required: true
    }
});

const Answer = new mongoose.model("answer",answerSchema);

export default Answer;