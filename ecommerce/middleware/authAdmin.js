const Users =require('../models/userModules')
const authAdmin = async(req,res,next)=>{
    try{
        //get userinformation by id
        const user = await Users.findOne({
            _id:req.user.id
        })
        if(user.role===0)
        return res.status(400).json({msg:"Admin resorces access denied"})
        next()
    }
    catch(err){
        return res.status(500).json({msg:err.message})
    }
}
module.exports = authAdmin 