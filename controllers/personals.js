import { querySql } from "../utils/queryDB.js";

const getPersonals = async (req, res) => {
  try {
    const data = await querySql("SELECT * FROM Personal");
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getPersonalById = async (req, res) => {
  const id = req.params.personalId;
  try {
    const data = await querySql(
      `SELECT * FROM Personal WHERE Employee_ID = ${id}`
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getPersonals, getPersonalById };
