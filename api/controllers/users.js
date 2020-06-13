const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

exports.create_user_signup = (req,res,next) => {

    User.find({email:req.body.email})
    .exec()
    .then( user => {
        if(user.length >= 1) {
            return res.status(409).json({
                message:'This Email already exists'
            })
        } else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err) {
                    return res.status(500).json({
                        error:err
                    })
                } else {
                    const user = new User({
                        _id:new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        password: hash,
                        expected_calories:req.body.expected_calories,
                        is_admin: req.body.is_admin 
                    });
                    
                    user.save()
                    .then( result => {
                        res.status(200).json({
                            message:' Congratulations !! You have successfully Signed Up. Login ?  '
                        })
                    })
                    .catch( err => {
                        res.status(500).json({
                            error:err
                        })
                    });
                }
            });
        }
    })
    .catch( err => {
        res.status(500).json({
            error:err
        })
    });

    
}

exports.user_login = (req,res,next) => {
    User.find({email:req.body.email})
    .exec()
    .then( user => {
        console.log(user);
           if(user.length < 1) {
               return res.status(401).json({
                   message:"User does not exist"
               })
           }
           bcrypt.compare(req.body.password , user[0].password,(err,result) => {
                if(err) {
                    return res.status(401).json({
                        message:"Username / Password Incorrect"
                    })
                }
                if(result){
                   const token =  jwt.sign(
                        {
                            email:user[0].email,
                            userId:user[0]._id
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn:"1h"
                        },

                    )
                    res.status(200).json({
                        message:'You have been Logged In Successfully',
                        token:token,
                        name: user[0].username,
                        email: user[0].email,
                        expected_calories: user[0].expected_calories,
                        is_admin: user[0].is_admin,
                        id:user[0]._id
                    })
                } else {
                    return res.status(401).json({
                        message:"Username / Password Incorrect"
                    })
                }
           });
    })
    .catch( err => {
        res.status(500).json({
            error:err
        })
   });
}


exports.delete_user =  (req,res,next) => {
    User.remove({_id:req.params.userId})
    .exec()
    .then(results=>{
        res.status(200).json({
            message:"User Deleted"
        })
    })
    .catch(err => {
        return res.status(500).json({
            error:err
        })
    });
}


exports.get_all_users = (req,res,next) => {
    User.find()
    .exec()
    .then( users => {
        res.status(200).json({
            count:users.length,
            users:users
        })
    })
    .catch(err => {
        res.status(500).json({
         error:err   
        })
    });

}