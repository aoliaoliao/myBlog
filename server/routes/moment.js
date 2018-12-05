const express = require('express');
const router = express.Router();
const momentController = require('../controller').moment

// 新增一个 user
router.post('/create', momentController.addMoment);