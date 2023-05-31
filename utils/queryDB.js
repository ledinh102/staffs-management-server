import sql from "mssql";
import mysql from "mysql2";
import { configSql, configMysql } from "../config.js";

const connectSql = sql.connect(configSql);
const connectMysql = mysql.createConnection(configMysql);

const querySql = (query) => {
  return connectSql
    .then(() => {
      return sql.query(query);
    })
    .then((result) => {
      return result.recordset;
    });
};

const queryMySql = (query) => {
  return connectMysql.promise().query(query).then(([data, fields]) => {
    return data;
  });
};

const splitPersonal = (staff) => {
  const personal = { ...staff };
  delete personal.idEmployee;
  delete personal.PayRates_id;
  delete personal.Paid_To_Date;
  delete personal.Paid_Last_Year;
  delete personal.Pay_Rate;
  delete personal.Vacation_Days;

  return personal;
};

const splitEmployee = (staff) => {
  return {
    Employee_Number: staff.Employee_ID,
    idEmployee: staff.idEmployee,
    First_Name: staff.First_Name,
    Last_Name: staff.Last_Name,
    SSN: Number(staff.Social_Security_Number),
    PayRates_id: staff.PayRates_id,
    Pay_Rate: staff.Pay_Rate,
    Vacation_Days: staff.Vacation_Days,
    Paid_To_Date: staff.Paid_To_Date,
    Paid_Last_Year: staff.Paid_Last_Year,
  };
};

const fieldsHasDataInsert = (data) => {
  const fields = Object.keys(data).filter(
    (key) =>
      data[key] !== null &&
      data[key] !== undefined &&
      data[key] !== "" &&
      data[key] !== 0
  );
  const fieldNames = fields.join(", ");
  const fieldValues = fields
    .map((key) => {
      const value = data[key];
      if (typeof value === "string") {
        return `'${value}'`;
      } else if (typeof value === "boolean") {
        return value ? "1" : "0";
      } else {
        return value;
      }
    })
    .join(", ");
  return [fieldNames, fieldValues];
};

const fieldsHasDataUpdate = (data) => {
  const updateFields = Object.keys(data);

  console.log(updateFields);
  const updateValues = updateFields
    .map((key) => {
      const value = data[key];
      if (typeof value === "string") {
        if (value === "") return `${key} = ${null}`;
        return `${key} = '${value}'`;
      } else if (typeof value === "boolean") {
        return `${key} = ${value ? "1" : "0"}`;
      } else {
        return `${key} = ${value}`;
      }
    })
    .join(", ");
  return updateValues;
};

const queryInsert = (staff, table) => {
  let data = splitPersonal(staff);
  if (table === "employee") data = splitEmployee(staff);

  const [fieldNames, fieldValues] = fieldsHasDataInsert(data);

  return `INSERT INTO ${table} (${fieldNames}) VALUES (${fieldValues});`;
};

const queryUpdate = (staff, table) => {
  let data = splitPersonal(staff);
  let where = `Employee_ID = ${data.Employee_ID}`;

  if (table === "employee") {
    data = splitEmployee(staff);
    where = `Employee_Number = ${data.Employee_Number}`;
  }

  const updateValues = fieldsHasDataUpdate(data);

  console.log(`UPDATE ${table} SET ${updateValues} WHERE ${where};`);
  return `UPDATE ${table} SET ${updateValues} WHERE ${where};`;
};

export {
  querySql,
  queryMySql,
  queryInsert,
  queryUpdate,
};
