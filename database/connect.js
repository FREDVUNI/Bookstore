const mongoose = require("mongoose")

const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            // useCreateIndex:true,
            // useFindAndModify:false,
            // useUnifiedTopology:true
        })
        console.log(`connected to database.`);
    }
    catch(error){
        console.log(error || `something went wrong`)
        process.exit(1)
    }
}

module.exports = connectDB