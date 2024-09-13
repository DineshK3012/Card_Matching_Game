const router = require('express').Router();
const { registerUser, loginUser, logoutUser, getUser, getLeaderBoard, getScores, updateScore } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth');

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticated, logoutUser);
router.route("/me")
    .get(isAuthenticated, getUser)

router.route("/leaderboard").get(isAuthenticated, getLeaderBoard);
router.route("/scores").get(isAuthenticated, getScores);
router.route("/update_score").post(isAuthenticated, updateScore);

module.exports = router;