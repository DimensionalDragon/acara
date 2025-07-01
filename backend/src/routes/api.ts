import express from "express";
import dummyController from "../controllers/dummy.controller";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({success: true});
});

router.get('/dummy', dummyController.dummy);


export default router;