import multer from 'multer';
import { rm } from "fs/promises";
import { generateId } from '../utils/idGenereate.js';



const storage = multer.diskStorage({
    destination(req, file, cb) {
        // console.log("Multer storage setting destination")
        // cb(null, "uploads/profiles")
        cb(null, "uploads")
    },
    filename(req, file, cb) {
        // console.log("multer storage generate file name")
        // console.log(file.mimetype)
        const id = generateId();
        const filename = file.originalname.split(".").shift()
        const extName = file.originalname.split(".").pop();
        const fileName = `user_${filename}_${id}.${extName}`;
        cb(null, fileName);
    },
});


// remove profile image from upload folder 
export const removeFiles = (filepath) => {
    console.log(filepath)
       rm(filepath);
}

// upload profilpic 
export const uploadProfilePic = multer({storage}).single("image")