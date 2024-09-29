// adminController.js
const Admin = require('../models/Admin');

const getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.userId);
        res.status(200).json(admin);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.userId, req.body, { new: true });
        res.status(200).json(updatedAdmin);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteAdmin = async (req, res) => {
    try {
        await Admin.findByIdAndDelete(req.userId);
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAdmin, updateAdmin, deleteAdmin };
