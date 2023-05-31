import { returnStaff, returnPersonal, returnEmployee } from "../utils/mergeData.js";
import { querySql, queryMySql, queryInsert, queryUpdate } from "../utils/queryDB.js";

const getStaffs = async (req, res) => {
  try {
    const personals = await querySql("SELECT * FROM personal");
    const employees = await queryMySql("SELECT * FROM employee");
    console.log(personals.length);
    console.log(employees.length);
    const mergedData = [];

    personals.forEach((personal) => {
      const employee = employees.find(
        (employee) => employee.Employee_Number === personal.Employee_ID
      );
      if (employee) mergedData.push(returnStaff(personal, employee));
      else mergedData.push(returnPersonal(personal));
    });

    employees.forEach((employee) => {
      const personal = personals.find(
        (personal) => personal.Employee_ID === employee.Employee_Number
      );
      if (!personal) mergedData.push(returnEmployee(employee));
    });

    res.json(mergedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getStaffById = async (req, res) => {
  const id = req.params.staffId;
  try {
    const [personal] = await querySql(
      `SELECT * FROM personal WHERE Employee_ID = ${id}`
    );
    const [employee] = await queryMySql(
      `SELECT * FROM employee WHERE Employee_Number = ${id}`
    );
    if (personal && employee) {
      res.json(returnStaff(personal, employee));
    } else if (personal) {
      res.json(returnPersonal(personal));
    } else if (employee) {
      res.json(returnEmployee(employee));
    } else {
      res.status(404).json({ message: "Staff not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createStaff = async (req, res) => {
  const staff = req.body;
  console.log(staff);
  try {
    await querySql(queryInsert(staff, "personal")).catch((err) => {
      res.status(404).json({ message: err.message });
    });
    await queryMySql(queryInsert(staff, "employee"))
      .then(() => {
        res.sendStatus(200);
      })
      .catch(async (err) => {
        await querySql(
          `DELETE FROM Personal WHERE Employee_ID = ${staff.Employee_ID};`
        );
        res.status(404).json({ message: err.message });
      });
  } catch (err) {
    console.log(err);
  }
};

const deleteStaff = async (req, res) => {
  const staffId = req.params.staffId;
  try {
    await queryMySql(
      `DELETE FROM employee WHERE Employee_Number = ${staffId};`
    ).catch((err) => {
      res.status(404).json({ message: err.message });
    });
    await querySql(`DELETE FROM Personal WHERE Employee_ID = ${staffId};`)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  } catch (err) {
    console.log(err);
  }
};

const updateStaff = async (req, res) => {
  const staff = req.body;
  console.log(staff);
  try {
    await querySql(queryUpdate(staff, "personal")).catch((err) => {
      res.status(404).json({ message: err.message });
    });
    await queryMySql(queryUpdate(staff, "employee"))
      .then(() => {
        res.sendStatus(200);
      })
      .catch(async (err) => {
        res.status(404).json({ message: err.message });
      });
  } catch (err) {
    console.log(err);
  }
};

export {
  getStaffs,
  getStaffById,
  createStaff,
  deleteStaff,
  updateStaff
};
