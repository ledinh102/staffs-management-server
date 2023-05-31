import { queryMySql } from "../utils/queryDB.js";

const getEmployees = async (req, res) => {
  try {
    const data = await queryMySql("SELECT * FROM employee");
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getEmployeeById = async (req, res) => {
  const id = req.params.employeeId;
  try {
    const data = await queryMySql(
      `SELECT * FROM employee WHERE Employee_Number = ${id}`
    );
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export { getEmployees, getEmployeeById };
