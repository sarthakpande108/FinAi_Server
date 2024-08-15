const express = require('express');
const router = express.Router();
const financialGoalController = require('../controllers/financialGoalController');

// Ensure the parameter is consistently named as 'userId'
router.post('/', financialGoalController.createFinancialGoal);
router.get('/:userId', financialGoalController.getFinancialGoal);
router.put('/:userId', financialGoalController.updateFinancialGoal);
router.delete('/:userId', financialGoalController.deleteFinancialGoal);

module.exports = router;
