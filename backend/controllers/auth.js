import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

//Register user

export const register = async (req, res) => {
    try {
        const { firstname, lastname, email, password, picturePath, friends, loaction, occupation } = req.body
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstname, lastname, email, password: passwordHash, picturePath, friends, loaction, occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 1000)

        })

        const savedUser = await newUser.save()
        res.status(201).json(savedUser)
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}


//logining

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        if (!user) return res.status(400).json({ msg: "user doesn not exits" })
        const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(400).json({msg:"Inavlid credentials"})

    const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
    delete  user.passwordres.status(200).json({token,user})


    } catch (error) {
        res.status(401).json({ error })

    }
}