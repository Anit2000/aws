const getQuestionsList = async() =>{
    try{
        const req = await fetch("/question");
        const res = await req.json();
        console.log(res);
    }catch(err){
        console.log("Failed to get questions reason -->",err.message);
    }
};
export default getQuestionsList;