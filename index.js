// import inquire for user input
import inquirer from "inquirer";
//import chalk for decoration
import chalk from "chalk";
// import functions from separate file 
import { std_details, student_question, output, total_fee } from "./importFunctions.js";
//create variable for initial balance 
let balance = 20000;
//create variable for courses
const enrollCourse = { Python: 2000, JavaScript: 4000, "C++": 1500, Nextjs: 4000, ReactJs: 3000, "Data Science": 6000 };
// create variable to show the value of enrollCourses keys
let valueEnrollCourse = Object.values(enrollCourse);
//create a variable with initial ID value 0 
let id = 0;
// create a variable with a arrow function with the type string, then increment the id with, return id with dot notation (.padStart) to make id with 5 digits started from 00001
const generatedUniqueId = () => {
    id++;
    return String(id).padStart(5, '0');
};
//show the welcome message
console.log(chalk.blueBright("\t---Welcome to Student Management System---"));
// Do all code in while loop to repeat when ever it's true.
while (true) {
    //create a variable with await keywort with the function student question
    const question = await student_question();
    // let id =Math.floor(Math.random()*90000) +10000
    //create variable to show the initial course price 0 
    let course_price = 0;
    //check if the user select the Add New option to add the new student the following question should be asked.
    if (question === "Add New") {
        const student_detail = await inquirer.prompt([
            {
                name: "name",
                message: "Name: ",
                type: "input",
            },
            {
                name: "f_name",
                message: "Father Name: ",
                type: "input",
            },
            {
                name: "age",
                message: "Age: ",
                type: "number",
            },
            {
                name: "courses",
                message: "Select Courses: ",
                type: "checkbox",
                choices: Object.keys(enrollCourse), //to show the only keys from enrollCourse
            }
        ]);
        //here getting the course prices using a forEach method to itterate enrollcourse each time add them in new variable (course) and add course prices in the course_price variable.  
        student_detail.courses.forEach((course) => {
            course_price += enrollCourse[course];
        });
        // then .push method push all the information in the student details
        std_details.push({
            student_name: student_detail.name,
            father_name: student_detail.f_name,
            age: student_detail.age,
            enrolled_courses: student_detail.courses,
            tution_fee: course_price,
            ID: generatedUniqueId()
        });
    }
    //check if the user select Delete Student Option delete the student from the list
    else if (question === "Delete Student") {
        console.log("Coming Soon");
    }
    //check if the user select Check Status. show the status of list of students name, course, fees etc.
    else if (question === "Check Status") {
        output(); //show the total information of the students
        const total = await total_fee(); //create a variable to store the value of totals. Wait for total_fee function where total amount of course are added.
        console.log(`Total Fees of students: ${chalk.yellow(total)}`); //print the message
        //if there is no student added print the below message
        if (std_details.length === 0) {
            console.log("There are no students detail available");
        }
        continue;
    }
    //if the user select Pay Fees option the following code will be run to pay the fees
    else if (question === "Pay Fees") {
        const total = await total_fee(); //create a variable to store the value of totals. Wait for total_fee function where total amount of course are added.
        console.log(`Total Tution fee: ${chalk.yellow(total)}`); //print the message to show the total fee amount.
        //check if the total fee is greater than balance print the message insufficient Balance.
        if (total > balance) {
            console.log("You have insufficient Balance.");
        }
        //otherwise run the following code to pay the fees
        else {
            //create the prompt to confirm want to pay fee or not.
            const payTheFee = await inquirer.prompt({
                name: "pay",
                message: "Are you agree to pay the fees?",
                type: "confirm",
            });
            //check if the value true run the following code to pay
            if (payTheFee.pay === true) {
                let balance_remain = balance - total; //create a balance remaining variable to store the remaining balance 
                console.log(`Remaining Balance: ${chalk.yellow(balance_remain)}`); //print the message
                balance -= total; //here subtract the total amount from the balance
            }
        }
    }
    //check if the user select show Balance 
    else if (question === "Show Balance") {
        console.log(`You have '${chalk.yellow(balance)}' in your account.`); // print the message
    }
    // if the user select exit option the following code block show the details of the students and total strength of the students and the break option stop the loop
    else {
        output();
        console.log(`Total Student Added: ${std_details.length}`);
        break;
    }
    ;
}
;
