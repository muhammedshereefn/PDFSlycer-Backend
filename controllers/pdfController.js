const fs = require('fs')
const path = require('path');
const {PDFDocument} = require('pdf-lib')
const PdfDetails = require('../models/pdfModel');
const pdfDetails = require('../models/pdfModel');
const {validationResult} = require('express-validator')


//For Upload PDF
exports.uploadPDF = async (req,res,next) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array() })
    }

    const title = req.body.title;
    const fileName = req.file.filename;
    const userId = req.body.userId; 


    try {
        await pdfDetails.create({title,pdf:fileName,userId});
        res.send({status:"OK"})
    } catch (error) {
        next(error)
    }
}


//For Get All Pdf
exports.getAllPDFs = async (req,res,next) => {
    const userId = req.params.userId; 

    try {
        const data = await pdfDetails.find({userId});
        res.send({status:"ok",data})
    } catch (error) {
        next(error)
    }
};



//For Download selected pdf pages
exports.downloadSelectedPages = async (req,res,next)=>{
    
    const {pdfFile , selectedPages} = req.body;

    try {
        const filePath = path.join(__dirname,'../files',pdfFile);
        if(!fs.existsSync(filePath)){
            return res.status(404).send('File not found');
        }

        const existingPdfBytes = fs.readFileSync(filePath);
        const pdfDoc = await PDFDocument.load(existingPdfBytes);
        const newPdfDoc = await PDFDocument.create();

        for(const pageNumber of selectedPages){
            if(pageNumber > 0 && pageNumber <= pdfDoc.getPageCount()){
                const [page] = await newPdfDoc.copyPages(pdfDoc,[pageNumber-1])
                newPdfDoc.addPage(page);
            }
        }

        const pdfBytes = await newPdfDoc.save();
        res.setHeader('Content-Disposition', 'attachment; filename=selected_pages.pdf');
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', pdfBytes.length);
        res.end(pdfBytes);

    } catch (error) {
        console.error("Error processing PDF:", error)
        next(error)
    }
}


//For Pdf Delete
exports.deletePDF = async (req, res, next) => {
    const { id } = req.params;

    try {
        const pdfRecord = await PdfDetails.findById(id);
        if (!pdfRecord) {
            return res.status(404).send('PDF not found');
        }

        const filePath = path.join(__dirname, '../files', pdfRecord.pdf);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await PdfDetails.findByIdAndDelete(id);
        res.send({ status: 'OK' });

    } catch (error) {
       next(error)
    }
};