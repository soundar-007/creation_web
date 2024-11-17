const User = require("../model/userModel");

exports.getUserDetails = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: true, success: false });
  }
  try {
    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ success: true, data: user, error: false });
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, success: false, message: error.message });
  }
};
exports.uploadAvatar = async (req, res) => {
  const userId = req.userId;
  const secure_url = req.body.data;
  if (!userId) {
    return res.status(401).json({ error: true, success: false });
  }
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: secure_url },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      data: user,
      error: false,
      message: "Profile Picture Uploaded Successfully",
    });
  } catch (error) {
    return res
      .status(401)
      .json({ error: true, success: false, message: error.message });
  }
};
