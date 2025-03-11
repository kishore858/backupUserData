const UserData = require('../models/UserData');

exports.createUser = async (req, res) => {
    try {
        const { name, username, password, website } = req.body;
        const existingUser = await UserData.findOne({ username, website });
        if (existingUser) return res.status(400).json({ msg: "User already exists for this website" });

        const newUser = new UserData({ name, username, password, website });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getUsers = async (req, res) => {
    const users = await UserData.find();
    res.json(users);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    updates.lastUpdated = new Date();
    const updatedUser = await UserData.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedUser);
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await UserData.findByIdAndDelete(id);
    res.json({ msg: "User deleted" });
};
