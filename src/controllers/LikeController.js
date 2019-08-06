const Dev = require("../models/Dev");

module.exports = {
  async store(req, res) {
    const { user } = req.headers;
    const { devId } = req.params;

    const loggdDev = await Dev.findById(user);
    const targetDev = await Dev.findById(devId);

    if (!targetDev) {
      return res.status(400).json({ error: "Dev not exists" });
    }

    if (targetDev.likes.includes(loggdDev._id)) {
      console.log("Deu Match");
    }

    loggdDev.likes.push(targetDev._id);

    await loggdDev.save();

    return res.json(loggdDev);
  }
};
