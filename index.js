import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import staffsRouter from "./routes/staffs.js"
import employeesRouter from "./routes/employees.js"
import personalsRouter from "./routes/personals.js"
import salaryRouter from "./routes/salary.js"

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/api/staffs", staffsRouter)
app.use("/api/employees", employeesRouter)
app.use("/api/personals", personalsRouter)
app.use("/api/salary", salaryRouter)

app.listen(5000, () => {
	console.log("Server listening on port 5000")
})
