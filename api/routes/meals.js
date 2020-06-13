const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const Meals = require('../models/meals');
const MealsController = require('../controllers/meals');

router.post('/meals',checkAuth, MealsController.getUserMeals);

router.delete('/meals/:mealId', checkAuth, MealsController.deleteMeal);

router.post('/addmeals' , checkAuth, MealsController.addUserMeal);

module.exports = router