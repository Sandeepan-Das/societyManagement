const apiErrorHandler = (err, req, res, next) => {
    
    res.status(err.status || 500).send({ msg: err.msg })

}


module.exports = apiErrorHandler

