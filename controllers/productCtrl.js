const Products = require('../models/productModel')
const Payments = require('../models/paymentModel')
const Category = require('../models/categoryModel')
var ObjectId = require('mongodb').ObjectId; 
//Filter , sorting and paginating 
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;

    }
    filtering() {
        //console.log(this.queryString)
        const queryObj = { ...this.queryString }
        //console.log({before:queryObj})//before delete page
        const excludeFields = ['page', 'sort', 'limit']
        excludeFields.forEach(e1 => delete (queryObj[e1]))
        //console.log({after:queryObj}) //after delete page
        let queryStr = JSON.stringify(queryObj)

        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        //console.log(JSON.parse(queryStr))

        this.query.find(JSON.parse(queryStr))

        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ')
            //console.log(sortBy)
            this.query = this.query.sort(sortBy)
        }
        else {
            this.query = this.query.sort('-createdAt')
        }

        return this;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 2
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)

        return this;
    }
}
const productCtrl = {
    getProduct: async (req, res) => {
        try {


            const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating()

            const products = await features.query
            //console.log(products)
            res.json({
                status: 'success',
                result: products.length,
                products: products

            })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    createProduct: async (req, res) => {
        try {
            const { product_id, title, content, description, images, category, email, mobileno } = req.body;
            if (!images) return res.status(400).json({ msg: "no img upload" })
            const product = await Products.findOne({ product_id })
            if (product) return res.status(400).json({ msg: "This product already exists. " })
            const newProduct = new Products({
                product_id, title: title.toLowerCase(), content, description, images, category, email, mobileno
            })
            await newProduct.save()
            res.json({ msg: "Created a Product" })

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({ msg: "Deleted a Product" })

        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { title, content, description, images, category, email, mobileno } = req.body
            if (!images) return res.status(400).json({ msg: "no img upload" })
            await Products.findByIdAndUpdate({ _id: req.params.id }, {
                title: title.toLowerCase(), content, description, images, category, email, mobileno
            })
            res.json({ msg: "Updated a Product" })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    recommand: async (req, res) => {
        try {

            const prod = await Products.find()
            const history = await Payments.find({ user_id: req.user.id })
            const categories = await Category.find()
            const rec =await createRecommand(prod, history, categories)
            //console.log({data:rec})
            //const features = new APIfeatures(rec, req.query).filtering().sorting().paginating()
            
            //const products = await features.query
            //console.log(products)
            res.json({
                status: 'success',
                result: rec.length,
                products: rec

            })
        }
        catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
}
var createRecommand = async(pro, history, categories) => {
    //console.log({ history: history})
    var mostUsedServicesInCategory = [];
    var allCategories=[];
    for(let j=0;j<categories.length;j++){
        allCategories.push(categories[j].name);
    }
    var userData=[];
    for(let j=0;j<history.length;j++){
        var o_id = new ObjectId(history[j].ID);
        const prods = await Products.findById(o_id)
        var o_id1 = new ObjectId(prods.category);
        const prods1 = await Category.findById(o_id1)    
           
        userData.push({"ID":o_id,category:prods1.name,title:prods.title});
            
       
    }
    var allData = []
    for(let j=0;j<pro.length;j++){
        var o_id = new ObjectId(pro[j].category);
        const prods = await Category.findById(o_id)
            
        //console.log(prods);   
        allData.push({"ID":o_id,category:prods.name,title:pro[j].title});
            
       
    }
    
    //console.log({user:userData,data:allData,category:allCategories});
    for (let i = 0; i < allCategories.length; i++) {

        var visited = [];
        var tempServices = [];

        for (let j = 0; j < allData.length; j++) {
            if (allData[j].category == allCategories[i]) {

                if (visited.includes(allData[j].title)) {

                    for (let k = 0; k < tempServices.length; k++) {
                        if (tempServices[k][1] == allData[j].title) {
                            tempServices[k][0]++;
                        }
                    }

                }
                else {
                    tempServices.push([1, allData[j].title]);
                    visited.push(allData[j].title);
                }
            }
        }

        tempServices.sort();
        tempServices.reverse();
        let reccomandForThisCategory = [];

        for (let l = 0; l < tempServices.length; l++) {
            reccomandForThisCategory.push(tempServices[l][1]);
        }

        if( reccomandForThisCategory.length > 0 ){
            let res = [];
            res.push(allCategories[i]);
            res.push(reccomandForThisCategory);
            mostUsedServicesInCategory.push(res);
        }      

    }


    for (let i = 0; i < mostUsedServicesInCategory.length; i++) {
        //console.log(mostUsedServicesInCategory[i]);
    }




    var visitedCategory = [];
    var visitedServices = [];

    for (let i = 0; i < userData.length; i++) {
        visitedCategory.push(userData[i].category);
        visitedServices.push(userData[i].title);
    }

    let finalReccomendServices = [];
    for (let i = 0; i < mostUsedServicesInCategory.length; i++) {

        if (visitedCategory.includes(mostUsedServicesInCategory[i][0])) {
            for (let j = 0; j < mostUsedServicesInCategory[i][1].length; j++) {
                if (!visitedServices.includes(mostUsedServicesInCategory[i][1][j])) {
                    finalReccomendServices.push(mostUsedServicesInCategory[i][1][j]);
                }
            }
        }
    }
    let products1 = [];
    //console.log("-------------");
    for (let i = 0; i < finalReccomendServices.length; i++) {
                for(let k=0;k<allData.length;k++){
                    if(allData[k].title==finalReccomendServices[i]){
                        products1.push(pro[k]);
                        //console.log("helllo");
                    }
                }
        
    }
    //console.log(products1);
    
   
    
    return products1;
}
module.exports = productCtrl