const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

// Route to create or update asset
router.post('/', assetController.createOrUpdateAsset);

// Route to get asset by userId
router.get('/:userId', assetController.getAssetByUserId);



module.exports = router;
