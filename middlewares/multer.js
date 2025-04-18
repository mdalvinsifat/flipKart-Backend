
const multer = require("multer")
const path = require("path")
const uploadDir = 'uploads/';

const storage = multer.diskStorage({
    destination : function(req, file , cd ) {
        cd (null, uploadDir)
    }, 
    filename : function(req , file , cd ){
        const extname = path.extname(file.originalname)

        cd(null, Date.now() + "-" + file.originalname)
    },
});


    const upload = multer({storage:storage})


module.exports = upload