module.exports.getAllProjects = (req, res) => {
  res.status(200).send('all');
};

module.exports.getOneProject = (req, res) => {
  res.status(200).send('one');
};

module.exports.createOneProject = (req, res) => {
  res.status(200).send('post');
};

module.exports.replaceOneProject = (req, res) => {
  res.status(200).send('put');
};

module.exports.updateOneProject = (req, res) => {
  res.status(200).send('patch');
};

module.exports.deleteOneProject = (req, res) => {
  res.status(200).send('delete');
};
