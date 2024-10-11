const asyncErrorHandler = (func)=>{ // taking async function
    return (req,res,next)=>{ // returning function which handles err and calls next with err
        func(req,res,next).catch((err)=>{next(err)});
    }
}

module.exports = asyncErrorHandler;