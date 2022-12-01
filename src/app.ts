import helmet from 'helmet'
import apiErrorHander from './utils/errorhandler';
import express,{Application,Request,Response,NextFunction} from 'express';
import morgan from 'morgan';
const app:Application = express()
import dbConnection from './config/dbConnect'
import userRoutes from './routes/userRoute';

import dotenv from 'dotenv'
dotenv.config()

app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/users',userRoutes)
app.use(apiErrorHander)

const port  = process.env.PORT || 3000
dbConnection()

app.listen(port, () => console.log(`Example app listening on port ${port}!`))