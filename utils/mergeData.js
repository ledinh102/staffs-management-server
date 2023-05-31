const staff = {
	Employee_ID: null,
	First_Name: null,
	Last_Name: null,
	Social_Security_Number: null,
	City: null,
	Phone_Number: null,
	Shareholder_Status: null,
	Middle_Initial: null,
	Address1: null,
	Address2: null,
	State: null,
	Zip: null,
	Email: null,
	Drivers_License: null,
	Marital_Status: null,
	Gender: null,
	Shareholder_Status: null,
	Benefit_Plans: null,
	Ethnicity: null,
	idEmployee: null,
	PayRates_id: null,
	Paid_To_Date: null,
	Paid_Last_Year: null,
	Pay_Rate: null,
	Vacation_Days: null,
}

const returnPersonal = (personal) => {
	return {
		...staff,
		...personal,
	}
}

const returnEmployee = (employee) => {
	employee = {
		...employee,
		Employee_ID: employee.Employee_Number,
		Social_Security_Number: employee.SSN,
	}
	delete employee.Employee_Number
	delete employee.SSN
	return {
		...staff,
		...employee,
	}
}

const returnStaff = (personal, employee) => {
	employee = {
		...employee,
		Employee_ID: employee.Employee_Number,
		Social_Security_Number: employee.SSN,
	}
	delete employee.Employee_Number
	delete employee.SSN
	return {
		...personal,
		...employee,
	}
}

export { returnPersonal, returnEmployee, returnStaff, staff }
