const mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    serialNumber: { type: Number, unique: true },
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String }, // Store logo URL
    createdAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
    file: { type: String } // Path to uploaded file
});

// Auto-generate serial number
UserDataSchema.pre('save', async function(next) {
    if (!this.serialNumber) {
        const lastRecord = await mongoose.model('UserData').findOne().sort('-serialNumber');
        this.serialNumber = lastRecord ? lastRecord.serialNumber + 1 : 1;
    }
    next();
});

module.exports = mongoose.model('UserData', UserDataSchema);
