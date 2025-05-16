import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    uuid:{
        type: String,
        required: true,
    },
    question:{
        type: String,
        required:true
    },
    options:[String]
});

const Question = new mongoose.model("question",questionSchema);

export default Question;