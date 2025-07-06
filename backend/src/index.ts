import express from "express";
import bodyParser from "body-parser";

import router from "./routes/api";
import db from "./utils/database";

async function init() {
    try {
        const PORT = 5000;

        const dbConnectionStatus = await db();
        console.log(dbConnectionStatus);

        const app = express();

        app.use(bodyParser.json());

        app.use('/api', router);

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        })

    } catch (error) {
        console.log(error);        
    }
}

init();