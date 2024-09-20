const express = require('express');
const multer = require('multer')
const { uploadPDF, getAllPDFs, downloadSelectedPages, deletePDF } = require('../controllers/pdfController');
const {body} = require('express-validator')

const router = express.Router()

//Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './files');
    },
    filename: function (req, file, cb) { 
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname); 
    }
});


const upload = multer({storage});

//Routes
router.post('/upload-files',
    upload.single('file'),
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('file').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('PDF file is required');
            }
            return true;
        })
    ],
    uploadPDF
);
router.get('/get-files/:userId',getAllPDFs)
router.post('/download-selected-pages',downloadSelectedPages)
router.delete('/delete-file/:id',deletePDF)

module.exports = router