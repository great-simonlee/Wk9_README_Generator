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
    fs.writeFileSync(fileNameLower, title + '\n' + '\n' + '\n', function(err) {
        if (err) {return console.log(err);}
    })

    mdFileName = fileNameLower;
}


function writeMdTitle(title) {
    return `# ${title}`
}

function writeMdSubTitle(subTitle) {
    return `## ${subTitle}`
}


function appendToFile(fileName, subtitle, contents) {
    fs.appendFileSync(fileName, writeMdSubTitle(subtitle) + '\n', function(err) {
        console.log(err);
    })
    fs.appendFileSync(fileName, contents + '\n' + '\n' + '\n', function(err) {
        console.log(err);
    })
}

function inquireUserInput() {
    inquirer.prompt([
        {
            type: "input",
            name: "Title",
            message: questions[0]
        },
        {
            type: "input",
            name: "Description",
            message: questions[1]
        },
        {
            type: "input",
            name: "Installation",
            message: questions[2]
        },
        {
            type: "input",
            name: "Usage",
            message: questions[3]
        },
        {
            type: "input",
            name: "Constribution",
            message: questions[4]
        },
        {
            type: "input",
            name: "Test",
            message: questions[5]
        },
    ]).then(function(data) {
        writeToFile(data.Title, writeMdTitle(data.Title));

        for (let i=1; i<Object.keys(data).length; i++) {
            appendToFile(mdFileName, Object.keys(data)[i], Object.values(data)[i]);
        }
    });
}

inquireUserInput();


