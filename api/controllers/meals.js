const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Meals = require('../models/meals');


exports.addUserMeal = (req,res) => {

    const Meal = new Meals({
        meal: req.body.meal,
        calories: req.body.calories,
        userId: req.body.userId,
        emailId: req.body.emailId,
        username: req.body.username
    })

    Meal.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message:'Added Meal Successfully',
            meal: result
        })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json(error);
    })
}

exports.getUserMeals = async (req,res) => {
    let userId = req.body.id;
    let fromDate = req.body.fromDate;
    let toDate = req.body.toDate;
    console.log(fromDate);
    console.log(toDate);
    let qry = {
        date:{
            '$gte': fromDate,
            '$lte': toDate
        }
    }

    if(!req.body.is_admin) qry.userId = userId

    try {
        let userMeals = await Meals.find(qry).sort({'date':'desc'}).exec();
        let dateCalArr = [];
        await userMeals.map(e => {
            var d = new Date(e.date);
            let dateKey = d.getDate()+"-"+d.getMonth()+"-"+d.getFullYear();
            dateCalArr[dateKey] = dateCalArr[dateKey] || [];
            dateCalArr[dateKey].push(e.calories);
        })
        let calArr = [];
        for (let date in dateCalArr){
            let totalCalories = await dateCalArr[date].reduce( function(accumulator , cal){
                return parseInt(accumulator + parseInt(cal));
            },0);
            dateCalArr[date] = totalCalories;
            calArr.push(date+"="+totalCalories);
        }
        

        let finalData = {
            userMeals: userMeals,
            dateCalories: calArr
        }

        res.status(200).json(finalData);

    } catch (err) {
        console.log('err');
        console.log(err)
    }
    
}

exports.deleteMeal = (req,res) => {
    Meals.deleteOne({_id:req.params.mealId})
        .exec()
        .then( response => {
            console.log(response);
            res.status(200).json({
                message:"Meal Deleted"
            })
        })
        .catch(err => {
            res.status(500).json({
                message:"Error Deleting Meal"
            })
        })
}