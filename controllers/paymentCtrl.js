const Payments = require('../models/paymentModel')
const Users = require('../models/userModules')
const Products = require('../models/productModel')
const Updatesold = async(ID,sold)=>{
    await Products.findOneAndUpdate({_id:ID},{
        sold:sold+1
    })
}
const paymentCtrl = {
    getPayments: async(req,res)=>{
        try{
            const payments = await Payments.find()
            res.json(payments)

        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createPayment:async(req,res)=>{
        try{
            const user =await Users.findById(req.user.id).select('name email')
            if(!user) return res.status(400).json({msg:"User does not exists."})

            const {description,ID,sold}  = req.body;
            const {_id, name, email} = user;
            const newPayment = new Payments({
                user_id:_id,name,email,ID,description
            })

            
            Updatesold(ID,sold)

            await newPayment.save()

            res.json({msg:"Payment Success!"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}


module.exports = paymentCtrl 