const mongoose = require('mongoose')

const pdfDetailsSchema = new mongoose.Schema ({
    pdf:String,
    title:String,
    userId: { type: String, required: true } 


},{collection:"pdfDetails"});

const pdfDetails = mongoose.model('pdfDetails',pdfDetailsSchema);
module.exports = pdfDetails;