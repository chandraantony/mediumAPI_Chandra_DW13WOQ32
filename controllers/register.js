const jwt = require('jsonwebtoken')

const models = require('../models')
const User = models.user

exports.register = (req, res)=>{    

    const fullname = req.body.fullname
    const email = req.body.email
    const password = req.body.password 
    
        User.findOne({where: {email}}).then(user=>{
            if(user){
                res.send({
                    error :true,
                    massage : "error bray email sudah terdaftar"
                }) 
            }else{
            
                User.create( {fullname, email, password} ).then(user=>{
                    if(user){
                        const token = jwt.sign({ userId: user.id }, 'my-secret-key')
                        res.send({
                            token
                        }) 
                    }else{
                        res.send({
                            error: true,
                            message: "Wrong Email or Password!"
                        })
                    }
                } )
                
            }
        }
    )

}