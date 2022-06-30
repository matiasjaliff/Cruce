const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("@hapi/joi");
require("dotenv").config();

const schemaRegister = Joi.object({
    fname: Joi.string().min(3).max(255).required(),
    lname: Joi.string().min(3).max(255).required(),
    dni: Joi.number().integer().required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required()
});

const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(4).max(1024).required()
});


router.post('/login', async(req, res) => {
    //validaciones de usuario (ingreso)
    const { error } = schemaLogin.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })

    const user = await User.findOne({ email: req.body.email })
    if(!user) return res.status(400).json({ error: true, mensaje: 'email no registrado' })

    const passValida = await bcrypt.compare(req.body.password, user.password)
    if(!passValida) return res.status(400).json({ error:true, mensaje: 'contraseña erronea'})

    //crear token
    const token = jwt.sign({
        email: user.email,
        fname: user.fname,
        lname: user.lname,
        admin: user.admin,
        operator: user.operator,      
        id: user._id,
        
       
    }, process.env.TOKEN_SECRET)

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })


});

router.post('/register', async(req, res) => {
    //validaciones de usuarios (registro)
    const { error } = schemaRegister.validate(req.body)
    if(error){return res.status(400).json({ error: error.details[0].message })}

    const existeEmail = await User.findOne({email: req.body.email})
    if(existeEmail){return res.status(400).json({error: true, mensaje: 'email esta registrado'})}
    
    //hash contraseña
    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos)

    const user = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        dni: req.body.dni,
        email: req.body.email,
        password: password
    })

    try {
        const userDB = await user.save();
        res.json({
            error: null,
            data: userDB
        })

    // await User.create(user);
    // res.send("User Created)");
    }catch(error) {
        res.status(400).json(error)
    }
   
});

module.exports = router;
