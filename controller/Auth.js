const User = require('../model/User')

const register = async (req,res) => {
    const {username, email} = req.body 

    const ifUsernameExist = await User.findOne({username})
    if(ifUsernameExist) {
        return res.status(400).json({success:false, message:"Username already exist"})
    }

    const ifEmailExist = await User.findOne({email})
    if (ifEmailExist){
        return res.status(400).json({success:false, message:"Email already exist"})
    }

    const newUser = await User.create(req.body) 

    res.status(201).json({success:true, message:"User created", newUser})
}


const login = async (req,res) => {
    const {username, email, password} = req.body 

    const ifUsernameExist = await User.findOne({username}) 
    if (!ifUsernameExist) {
        return res.status(400).json({success:false, message:"Username does not exists"})
    }

    const ifEmailExist = await User.findOne({email}).select("+password")
    if (!ifEmailExist) {
        return res.status(400).json({success:false, message:"Email does not exist"})
    }

    const IfPasswordExist = ifEmailExist.matchPassword(password) 
    if (!IfPasswordExist) {
        return res.status(400).json({success:false, message:"Password does not exist"})
    }

    res.status(200).json({success:true, ifEmailExist})
}


const getUser = async (req,res) => {
    const id = req.params.id 
    const user = await User.findById(id) 
   
    if (!user) {
        return res.status(200).json({success:false, message:`User with the ID:${id} does not exists`})
    } 

    res.status(200).json({success:true, user})
}

module.exports = {
    register, 
    login, 
    getUser
}