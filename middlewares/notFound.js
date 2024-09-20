const notFount = (req,res,next)=>{
    const error = new Error(`Not Fount - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error)

};

module.exports = notFount