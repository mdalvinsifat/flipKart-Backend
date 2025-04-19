

const multer = require("multer")
const path = require("path")
const uploadDir = 'uploads/';
const AuthDir = "authUploads"
const storage = multer.diskStorage({
    destination : function(req, file , cd ) {
        cd (null, uploadDir)
    }, 
    filename : function(req , file , cd ){
        const extname = path.extname(file.originalname)

        cd(null, Date.now() + "-" + file.originalname)
    },
});



const authUpload = multer.diskStorage({
  destination : function(req, file , cd ) {
    cd (null, AuthDir)
}, 
filename : function(req , file , cd ){
    const extname = path.extname(file.originalname)

    cd(null, Date.now() + "-" + file.originalname)
},
})


exports.upload = multer({storage:storage})
exports.authUpload = multer({storage : authUpload})



