"use strict";

const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");

let mdFileName;

// array of questions for user
const questions = [
    "What is your project title?",
    "Project description: ",
    "Installation instructions: ",
    "Usage information: ",
    "Contribution guidelines: ",
    "Test instructions: "
];

function writeToFile(fileName, title) {

    var fileNameLower = fileName.toLowerCase().split(' ').join('') + ".md";
    // JSON.stringify(contents, null, '\t')
    fs.writeFile(fileNameLower, title + '\n' + '\n', function(err) {
        if (err) {return console.log(err);}
        console.log("READ has been generated!!")
    })

    mdFileName = fileNameLower;
}

function appendToFile(fileName, subtitle) {
    fs.appendFile(fileName, writeMdSubTitle(subtitle) + '\n', function(err) {
        console.log(err);
    })
}

function writeMdTitle(title) {
    return `# ${title}`
}

function writeMdSubTitle(subTitle) {
    return `## ${subTitle}`
}

// function writeMdContents(file, ans) {
//     for (let an of ans) {
//         let con = "# " +an + '\n';
//         console.log(file);
//         console.log(con);
//     }

// }

// writeMdContents("file", questions)

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
        // {
        //     type: "input",
        //     name: "installation",
        //     message: questions[2]
        // },
        // {
        //     type: "input",
        //     name: "usage",
        //     message: questions[3]
        // },
        // {
        //     type: "input",
        //     name: "constribution",
        //     message: questions[4]
        // },
        // {
        //     type: "input",
        //     name: "test",
        //     message: questions[5]
        // },
    ]).then(function(data) {
        writeToFile(data.title, writeMdTitle(data.title));
        fs.appendFile(mdFileName, "## hihihi", function(err) {console.log(err)});
        // appendToFile(, "hihi");
        // Object.keys(data)[1]
        // console.log(mdFileName);
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
