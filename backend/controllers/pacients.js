const Pacient = require("../models/pacient");

exports.createPacient = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const pacient = new Pacient({
    name: req.body.name,
    birthdate: req.body.birthdate,
    address: req.body.address,
    condition: req.body.condition,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  pacient
    .save()
    .then(createdPacient => {
      res.status(201).json({
        message: "Pacient added successfully",
        pacient: {
          ...createdPacient,
          id: createdPacient._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a pacient failed!"
      });
    });
};

exports.updatePacient = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }
  const pacient = new Pacient({
    _id: req.body.id,
    name: req.body.name,
    birthdate: req.body.birthdate,
    address: req.body.address,
    condition: req.body.condition,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  Pacient.updateOne({ _id: req.params.id, creator: req.userData.userId }, pacient)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate pacient!"
      });
    });
};

exports.getPacients = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const searchTerm = req.query.searchterm;
  const searchOption = req.query.searchoption;
  // const pacientQuery = Pacient.find();
  const pacientQuery = Pacient.find({[searchOption]: searchTerm });
  console.log(req.query, pageSize)
  let fetchedPacients;
  if (pageSize && currentPage) {
    pacientQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  pacientQuery
    .then(documents => {
      fetchedPacients = documents;
      return Pacient.countDocuments();
    })
    .then(count => {
      res.status(200).json({
        message: "Pacients fetched successfully!",
        pacients: fetchedPacients,
        maxPacients: count
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching pacients failed!"
      });
    });
};

exports.getPacient = (req, res, next) => {
  Pacient.findById(req.params.id)
    .then(pacient => {
      if (pacient) {
        res.status(200).json(pacient);
      } else {
        res.status(404).json({ message: "Pacient not found!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching pacient failed!"
      });
    });
};

exports.deletePacient = (req, res, next) => {
  Pacient.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting pacients failed!"
      });
    });
};
