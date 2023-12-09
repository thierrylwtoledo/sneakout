const User = require("../models/user.model.js");
const extend = require("lodash/extend.js");
const errorHandler = require("./error.controller.js");

//A user can list all user profiles.
const list = async (req, res) => {
  try {
    let users = await User.find.select("username email 	updated created");
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
//Users can update their emails using their usernames.
const update = async (req, res) => {
  try {
    let update = await User.updateOne({ username: req.body.username }, req.body);
    if (update.modifiedCount > 0) {
      res.json({ message: "Update successful!" });
    } else {
      throw err;
    }
  } catch (err) {
    return res.status(401).json({
      message: "No user has been updated!",
    });
  }
};
//Create a profile.
const create = async (req, res) => {
  let user = 0;
  try {
    //Check if username is taken
    if (!(await User.find({ username: req.body.username })[0])) {
      //Check if email is taken
      if (!(await User.find({ email: req.body.email }))[0]) {
        user = new User(req.body);
        await user.save();
        return res.status(200).json({
          message: "Successfully created!",
        });
      } else {
        return res.json({
          message: "Email is already in use.",
        });
      }
    } else {
      return res.json({
        message: "Username is taken.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "user could not be created!",
    });
  }
};
//Users are deleted using their email.
const remove = async (req, res) => {
  try {
    let deletedUser = await User.deleteOne({ email: req.body.email });
    if (deletedUser.deletedCount == 0) {
      return res.status(200).json({
        message: "No users have been deleted.",
      });
    } else {
      return res.status(200).json({
        deletedUser,
        message: "A user has been successfully deleted!",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      message: "User could not be deleted!",
    });
  }
};
const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    if (!user)
      return res.status("400").json({
        error: "User not found",
      });
    req.profile = user;
    next();
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve user",
    });
  }
};

const read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

module.exports = { create, list, remove, update, userByID, read };
