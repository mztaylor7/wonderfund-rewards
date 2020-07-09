const { getProjectModel } = require("../database");
const { getRewardModel } = require("../database");

/**
 * Get Search Query
 * @param req The HTTP Request object
 * @returns {{}} A query object containing either the id or title of a project - depending on
 * which was provided in the request.
 */
const getSearchQuery = (req) => {
  const searchQuery = {};
  if (req.id) {
    searchQuery.id = req.id;
  }

  if (req.name) {
    searchQuery.title = req.name;
  }

  return searchQuery;
};

/**
 * Get Image
 * @param id The id of the project to fetch the user for
 * @returns {Promise<PromiseResult<S3.GetObjectOutput, AWSError>>}
 */
const getImage = (id) => {
  const AWS = require("aws-sdk");

  const s3 = new AWS.S3();

  return s3
    .getObject({
      Bucket: "fec-zayers-reward-service",
      Key: `${id}.png`,
    })
    .promise();
};

/**
 * Get User Image
 * @param req The HTTP Request Object
 * @param res The HTTP Response Object
 */
module.exports.getUserImage = (req, res) => {
  getImage(1)
    .then((image) => {
      const buf = Buffer.from(image.Body);
      const base64 = buf.toString("base64");
      const html = `<img src="data:image/jpeg;base64,${base64}" alt="user avatar"/>`;
      res.status(200).send(html);
    })
    .catch((err) => res.status(400).send(err));
};

/**
 * Get One Project
 * @param req The HTTP Request Object
 * @param res The HTTP Response Object
 */
module.exports.getOneProject = (req, res) => {
  const ProjectModel = getProjectModel();
  const rewardModel = getRewardModel();
  const searchQuery = getSearchQuery(req);
  ProjectModel.findAll({
    where: searchQuery,
    include: [
      {
        model: rewardModel,
      },
    ],
  })
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
