import inquirer from "inquirer";
import chalk from "chalk";
//create a variable of array of object to store the students details
const std_details = [];
//create function student question 
async function student_question() {
    const students = await inquirer.prompt({
        name: "students",
        message: "What would you like to do?",
        type: "list",
        choices: ["Add New", "Delete Student", "Check Status", "Pay Fees", "Show Balance", "Exit"]
    });
    return students.students;
}
;
//create function output which shows all the result of the student
async function output() {
    let detail_length = std_details.length;
    for (let i = 1; i <= detail_length; i++) {
        let students = std_details[i - 1];
        console.log("--------------------------------");
        console.log(chalk.bold.red("|Student Name: ") + (`${students.student_name}\n`) + chalk.bold.red("|Father Name: ") + (`${students.father_name}\n`) + chalk.bold.red("|Age: ") + (`${students.age}\n`) + chalk.bold.red("|Student ID: ") + (`${students.ID}\n`) + chalk.bold.red("|Enrolled Course: ") + (`${students.enrolled_courses}\n`) + chalk.bold.red("|Tution Fees: ") + (`${students.tution_fee}`));
    }
}
//create function total fee with type Promise number instead of just number  
async function total_fee() {
    let total_fees = 0; // initial value of total fees is 0
    //for loop to iterate over student details length 
    for (let i = 0; i < std_details.length; i++) {
        total_fees += std_details[i].tution_fee;
    }
    return total_fees;
}
export { std_details, student_question, output, total_fee };
