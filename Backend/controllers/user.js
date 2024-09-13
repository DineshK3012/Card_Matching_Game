const User = require('../models/User');

exports.registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        });

        if (user) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "User alredy exists"
                })
        }

        user = await User.create({
            username,
            email,
            password
        })

        const token = await user.generateToken();

        res.status(201)
            .cookie("token", token, {
                expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
                httpOnly: true,
                secure: true,
                sameSite: 'None' // Allow cross-site requests
            })
            .json({
                success: true,
                user,
                token,
                message: "Registration Successful"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No user found with this email"
            })
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Password"
            })
        }

        const token = await user.generateToken();

        res.status(200).
        cookie("token", token, {
            expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'None' // Allow cross-site requests
        })
            .json({
                success: true,
                user,
                token,
                message: "Login successful"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.logoutUser = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", null, {
                expires: new Date(Date.now()),
                httpOnly: true,
                secure: true,
                sameSite: 'None' // Allow cross-site requests
            })
            .json({
                success: true,
                message: "Logged out successfully"
            })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = req.user;

        // Find the user by ID
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json({ userId: user._id, username: user.username, email: user.email, bestScore: user.bestScore });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getLeaderBoard = async (req, res) => {
    try {
        // Find top 10 users sorted by bestScore (lowest is better)
        const leaderboard = await User.find({ bestScore: { $ne: null } })
            .sort({ bestScore: 1 })  // Sort by bestScore ascending (fewer moves first)
            .limit(10)
            .select('username bestScore')
            .lean();  // Convert the query result to a plain JavaScript object

        res.json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.getScores = async (req, res) => {
    try {
        const user = req.user;
        if (!user) return res.status(404).json({ msg: 'User not found' });

        res.json({ username: user.username, pastScores: user.pastScores.reverse() });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

exports.updateScore = async (req, res) => {
    try {
        const { score } = req.body;
        const  user = req.user;
        if (!user) return res.status(404).json({ msg: 'User not found' });

        // Update the bestScore if the new score is better (lower)
        if (user.bestScore === null || score < user.bestScore) {
            user.bestScore = score;
        }

        // Add the new score to pastScores array
        user.pastScores.push({ score });

        await user.save();
        res.json({ msg: 'Score updated', bestScore: user.bestScore, pastScores: user.pastScores });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}
