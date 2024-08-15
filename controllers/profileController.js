const Profile = require('../models/Profile');
const User = require('../models/User'); // Assuming User model is also used

// Create or Update Profile
exports.createOrUpdateProfile = async (req, res) => {
  const { userId, name, age, email, gender, maritalStatus, occupation, address, nationality, mobileNumber, aadharNumber, dependents } = req.body;

  try {
    // Check if a profile with the given userId already exists
    let profile = await Profile.findOne({ where: { userId } });

    if (profile) {
      // If profile exists, update it
      profile = await Profile.update(
        { name, age, email, gender, maritalStatus, occupation, address, nationality, mobileNumber, aadharNumber, dependents },
        { where: { userId }, returning: true } // Returning the updated profile
      );
      res.status(200).json({ message: 'Profile updated successfully', profile: profile[1][0] }); // Sending the updated profile
    } else {
      // If profile doesn't exist, create a new one
      profile = await Profile.create({ userId, name, age, email, gender, maritalStatus, occupation, address, nationality, mobileNumber, aadharNumber, dependents });
      res.status(201).json({ message: 'Profile created successfully', profile });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profile by userId
exports.getProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ where: { userId } });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
