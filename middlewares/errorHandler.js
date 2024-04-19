const errorHandler=(err,req,res,next) => {
    const errorStatus=err.statusCode
    const errorMessage=err.message

    res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage
    })
}

export default errorHandler