import { queryMySql } from "../utils/queryDB.js"

const getSalary = async (req, res) => {
	const salary = await queryMySql(
		`SELECT Employee_Number AS Employee_ID, CONCAT(First_Name, ' ', Last_Name) AS Full_Name, Paid_Last_Year * Pay_Amount AS Salary, Pay_Rate_Name, Vacation_Days FROM employee e JOIN pay_rates p ON p.idPay_Rates = e.PayRates_id`
	)
	res.json(salary)
}

const getTopSalary = async (req, res) => {
	const limit = req.params.limit
	const topSalary = await queryMySql(
		`SELECT Employee_Number AS Employee_ID, CONCAT(First_Name, ' ', Last_Name) AS Full_Name, Paid_Last_Year * Pay_Amount AS Salary, Pay_Rate_Name FROM employee e JOIN pay_rates p ON p.idPay_Rates = e.PayRates_id ORDER BY Salary DESC LIMIT ${limit}`
	)
	res.json(topSalary)
}

export { getSalary, getTopSalary }
