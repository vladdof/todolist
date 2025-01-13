import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { setupDB } from './config/setupDB.js'
import tasksRouter from './routes/tasks.js'
const port = process.env.PORT || 8080;

// CREATE APIs URL ENDPOINTS TO CREATE AND DELETE TO DO ITEMS
async function startServer() {
    try {
        await setupDB()
        const app = express()

        const whitelist = ['http://localhost:5173']; // assuming front-end application is running on localhost port 3000

        const corsOptions = {
            origin: (origin, callback) => {
                if (whitelist.indexOf(origin) !== -1) {
                    callback(null, true)
                } else {
                    callback(new Error('Not allowed by CORS'))
                }
            },
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        }

        app.use(cors(corsOptions))
        app.use(express.json())

        app.use('/', tasksRouter)

        app.listen(port, () => {
            console.log(`App listening on port ${port}`)
        })
    } catch (error) {
        console.error(error);
    }
}

startServer()
