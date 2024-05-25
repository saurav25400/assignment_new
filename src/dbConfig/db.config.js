const mongoose=require('mongoose');

const dbConnection=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        });
        console.log("connected to mongodb database successfully!!!");

        
    } catch (error) {
        console.log(error);
        
    }
}
module.exports= dbConnection;