const Asset = require('../models/Asset');

exports.createOrUpdateAsset = async (req, res) => {
  const { userId, monthlyIncome, monthlyExpenditure, currentSavings, emergencyFund, investments, insurance, loans } = req.body;

  try {
    // Check if an asset record exists for the given userId
    let asset = await Asset.findOne({ where: { userId } });

    if (asset) {
      // Update existing asset record
      await Asset.update({ monthlyIncome, monthlyExpenditure, currentSavings, emergencyFund, investments, insurance, loans }, { where: { userId } });
      asset = await Asset.findOne({ where: { userId } });
      res.status(200).json({ message: 'Asset updated successfully', asset });
    } else {
      // Create a new asset record
      asset = await Asset.create({ userId, monthlyIncome, monthlyExpenditure, currentSavings, emergencyFund, investments, insurance, loans });
      res.status(201).json({ message: 'Asset created successfully', asset });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAssetByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const asset = await Asset.findOne({ where: { userId } });
    if (!asset) return res.status(404).json({ message: 'Asset not found' });
    res.json(asset);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


