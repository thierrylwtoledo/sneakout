const Sneaker = require('../models/shoe.model')

const list = async (req, res) => {
    try {
      let users = await Sneaker.find();
      res.json(users);
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
      });
    }
  };

  const updatePrice = async (req, res) => {
    try {
      let update = await Sneaker.updateOne({ model: req.body.model, colourway: req.body.colourway }, req.body);
      if (update.modifiedCount > 0) {
        res.json({ message: "Your sneaker has been updated successful!" });
      } else {
        throw err;
      }
    } catch (err) {
      return res.status(401).json({
        message: "No sneaker has been updated!",
      });
    }
  };

  const create = async (req, res) => {
    let sneaker = 0;
    try {
      //Check if sneaker has been created already
      if (
        !(await Sneaker.find({ model: req.body.model, colourway: req.body.colourway })[0])
        ) {
            sneaker = new Sneaker(req.body);
            await sneaker.save();
            return res.status(200).json({
            message: "Your sneaker has been successfully created!",
          });
        } else {
          return res.json({
            message: "This sneaker already exists. Please try updating the existing sneaker.",
          });
        }
    } catch (err) {
        console.log(err.message)
      return res.status(400).json({
        message: "The sneaker cannot be created!",
      });
    }
  };
  //Users are deleted using their email.
  const remove = async (req, res) => {
    try {
      let deletedSneaker =
        await Sneaker.deleteOne({ model: req.body.model, colourway: req.body.colourway });
      
        if (deletedSneaker.deletedCount == 0) {
        return res.status(200).json({
          message: "No sneakers have been deleted.",
        });
      } else {
        return res.status(200).json({
            deletedSneaker,
          message: "A sneaker has been successfully deleted!",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({
        message: "Your sneaker could not be deleted!",
      });
    }
  };

  module.exports = { create, list, updatePrice, remove };