const { getProjectModel } = require('../database');

/**
 * Filter Body
 * @param req the HTTP Request object
 * @returns {Object} An object with only the parameters we need from the request body
 */
const filterBody = (req) => {
  return {
    title: req.body.title,
    subtitle: req.body.subtitle,
    category: req.body.category,
    subcategory: req.body.subcategory,
    location: req.body.location,
    heroImage: req.body.heroImage,
    heroVideo: req.body.heroVideo,
    launchDate: req.body.launchDate,
    campaignDuration: req.body.campaignDuration,
    budget: req.body.budget,
    fundingGoal: req.body.fundingGoal,
    rewards: req.body.rewards
  };
};

module.exports.getAllProjects = (req, res) => {
  const ProjectModel = getProjectModel();
  ProjectModel.findAll()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
};

module.exports.getOneProject = (req, res) => {
  res.status(200).send('one');
};

module.exports.createOneProject = (req, res) => {
  const ProjectModel = getProjectModel();
  ProjectModel.sync({ force: false })
    .then(() => {
      return ProjectModel.create(filterBody(req));
    })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
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
