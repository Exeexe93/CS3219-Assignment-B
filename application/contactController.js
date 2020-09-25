Contact = require("./contactModel");

exports.index = function (req, res) {
  Contact.get(function (err, contacts) {
    if (err) {
      res.json({
        status: "Error",
        message: err,
      });
    }
    res.json({
      status: "Success",
      message: "Contacts retrieved successfully",
      data: contacts,
    });
  });
};

// Handle create contact
exports.new = function (req, res) {
  var contact = new Contact();
  contact.name = req.body.name ? req.body.name : contact.name;
  contact.gender = req.body.gender;
  contact.email = req.body.email;
  contact.phone = req.body.phone;

  contact.save(function (err) {
    if (err) {
      return res.send(err);
    }
    res.json({
      message: "New contact created!",
      data: contact,
    });
  });
};

// Handle view contact info
exports.view = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err)
      return res.send({
        status: "Error",
        message: "No such record with the contact id found!",
      });
    res.json({
      message: "Loading contact details successfully",
      data: contact,
    });
  });
};

// Handle update contact info
exports.update = function (req, res) {
  Contact.findById(req.params.contact_id, function (err, contact) {
    if (err) return res.send(err);
    contact.name = req.body.name ? req.body.name : contact.name;
    contact.gender = req.body.gender;
    contact.email = req.body.email;
    contact.phone = req.body.phone;

    contact.save(function (err) {
      if (err) return res.json(err);
      res.json({
        message: "Contact Info updated",
        data: contact,
      });
    });
  });
};

// Handle delete contact
exports.delete = function (req, res) {
  Contact.remove(
    {
      _id: req.params.contact_id,
    },
    function (err, contact) {
      if (err) return res.send(err);
      res.json({
        status: "Success",
        message: "Contact deleted",
      });
    }
  );
};
