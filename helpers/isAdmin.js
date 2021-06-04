module.exports = (req,res,next)=>{
    if (req.userData.role == 'Admin') {
        next()
    } else {
        res.status(401).json({msg:'Only Admin is Authorised for this process'})
    }
}