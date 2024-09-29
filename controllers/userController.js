const User = require('../controllers/autenticationController');  
 
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.userId);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUser, updateUser, deleteUser };