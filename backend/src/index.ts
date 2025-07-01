import express from "express";
import router from "./routes/api";

const PORT = 5000;

const app = express();

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})