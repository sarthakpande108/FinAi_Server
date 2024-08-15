const FinancialGoal = require('../models/FinancialGoal');

exports.createFinancialGoal = async (req, res) => {
  const { userId, goal, targetAmount, deadline } = req.body;
  try {
    const financialGoal = await FinancialGoal.create({ userId, goal, targetAmount, deadline });
    res.status(201).json(financialGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFinancialGoal = async (req, res) => {
  // Correctly extract 'userId' from req.params
  const { userId } = req.params;
  try {
    // Fetch the financial goal based on 'userId'
    const financialGoal = await FinancialGoal.findOne({ where: { userId } });
    if (!financialGoal) return res.status(404).json({ message: 'Financial Goal not found' });
    res.json(financialGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateFinancialGoal = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  try {
    const [updated] = await FinancialGoal.update(updates, { where: { userId } });
    if (!updated) return res.status(404).json({ message: 'Financial Goal not found' });
    const financialGoal = await FinancialGoal.findOne({ where: { userId } });
    res.json(financialGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteFinancialGoal = async (req, res) => {
  const { userId } = req.params;
  try {
    const deleted = await FinancialGoal.destroy({ where: { userId } });
    if (!deleted) return res.status(404).json({ message: 'Financial Goal not found' });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
