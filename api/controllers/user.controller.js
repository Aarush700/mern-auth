import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const test = (req, res) => {
  res.json({
    message: "Api is working!",
  });
};

export const updateUser = async (req, res, next) => {
  // ensure only the logged-in user can update their account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(403, "You can only update your own account."));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // update user with new fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
      },
      { new: true } // return updated document
    );

    // exclude password before sending back
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};