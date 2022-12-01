import mongoose from 'mongoose';

const dbConnection =async()=>{
    try{
        mongoose.connect(`${process.env.MONGO_URI}`)
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.log('failed to connect to database')
    }
}

export default dbConnection;

