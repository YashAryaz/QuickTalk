import express from "express";
import {sendImage,getMessages, sendMessage} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";
import multer from "multer";
import path from "path";

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + Date.now()+ext)
    }
});
 
var upload = multer({ storage: storage });

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.post("/send_image/:id", protectRoute,upload.single('image'),sendImage);


export default router;