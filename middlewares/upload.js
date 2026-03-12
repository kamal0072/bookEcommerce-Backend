import multer from "multer";
import path from "path";

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/images");
    },

    filename: function (req, file, cb) {
        const uniqueName =
            Date.now() + "-" + file.originalname;

        cb(null, uniqueName);
    }

});

const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const ext = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (ext) {
        cb(null, true);
    } else {
        cb("Only images allowed");
    }

};

const upload = multer({
    storage,
    fileFilter,
});

export default upload;



