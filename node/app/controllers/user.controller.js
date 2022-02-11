const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.userList = (req, res) => {
  const name = req.query.query;
  var condition = name ? {
    [Op.or]: {
      username: { [Op.like]: `%${name}%` },
      email: { [Op.like]: `%${name}%` }
    }
  } : null;

  User.findAndCountAll({
    where: condition, attributes: { exclude: ['password'] },
    order: [[req.query.orderBy ? req.query.orderBy : 'title', req.query.ascending == 1 ? "ASC" : "DESC"]],
    limit: parseInt(req.query.limit),
    offset: (parseInt(req.query.page) - 1) * parseInt(req.query.limit),
  })
    .then(data => {
      data.password = '';
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};
