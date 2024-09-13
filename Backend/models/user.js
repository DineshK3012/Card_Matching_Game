const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Schema for past scores
const ScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    bestScore: {
        type: Number,
        default: null  // Best score is the least number of moves (lower is better)
    },
    pastScores: [ScoreSchema]  // Array of past scores, each with score and date
}, {
    timestamps: true
});

//pre-save middleware
userSchema.pre("save", async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }

    next();
})

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = async function () {
    return await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

module.exports = mongoose.model("User", userSchema);