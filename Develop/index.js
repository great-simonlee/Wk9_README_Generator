"use strict";

const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");


// array of questions for user
const questions = [
    "What is your project title?",
    "Project description: ",
    "Installation instructions: ",
    "Usage information: ",
    "Contribution guidelines: ",
    "Test instructions: "
];

function writeToFile(fileName, data) {

    // let fileNameLower = fileName.toLowerCase().split(' ').join('') + ".md";

    // fs.writeFile(fileNameLower, JSON.stringify(data, null, '\t'), function(err) {
    //     if (err) {return console.log(err);}
    //     console.log("READ has been generated!!")
    // })

    // console.log(fileNameLower);
console.log(fileName);
console.log(data);
}

function inquireUserInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: questions[0]
        },
        {
            type: "input",
            name: "description",
            message: questions[1]
        },
        {
            type: "input",
            name: "installation",
            message: questions[2]
        },
        {
            type: "input",
            name: "usage",
            message: questions[3]
        },
        {
            type: "input",
            name: "constribution",
            message: questions[4]
        },
        {
            type: "input",
            name: "test",
            message: questions[5]
        },
    ]).then(function(data) {
        writeToFile(data.title, data);
    });
}

inquireUserInput();

// // function to write README file

// // function to initialize program
// function init() {
//     inquirer.prompt([
//         {
//             title: questions[0],
//             description: questions[1],
//         }
//     ]).then(writeToFile(data.title, data));
// }

// // function call to initialize program
// init();
