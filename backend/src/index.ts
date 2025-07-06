import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import router from "./routes/api";
import db from "./utils/database";
import docs from "./docs/route";

async function init() {
    try {
        const PORT = 5000;

        const dbConnectionStatus = await db();
        console.log(dbConnectionStatus);

        const app = express();

        app.use(cors());
        app.use(bodyParser.json());

        app.get('/', (req, res) => res.status(200).json({
            message: 'Server is running',
            data: null,
        }));
        app.use('/api', router);
        docs(app);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);        
    }
}

init();