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
    "Test instructions: ",
    "Any license(s) you want to add?",
    "Github username?",
    "Email address?"
];

// array of licenses
const licenses = {
    apache: "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)",
    boost: "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)",
    mit: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    ibm: "[![License: IPL 1.0](https://img.shields.io/badge/License-IPL%201.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)",
    mozilla: "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)",
    isc: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)"
}


// Title
function writeMdTitle(title) {
    return `# ${title}`
};

// Sub_Title
function writeMdSubTitle(subTitle) {
    return `## ${subTitle}`
};

// Github
function writeMdGithub(data) {
    return `[My Github Page: ${data}](https://github.com/${data})`
};

// Email
function writeMdEmail(data) {
    return  `You can reach out to me via Email: ${data}`
};

// Create a markdown file function
function writeToFile(fileName, title) {

    var fileNameLower = fileName.toLowerCase().split(' ').join('') + ".md";

    fs.writeFileSync(fileNameLower, title + '\n' + '\n' + '\n', function(err) {
        if (err) {return console.log(err);}
    })

    mdFileName = fileNameLower;
};

// Append Subtitle and Contents function
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
        {
            type: "checkbox",
            name: "License",
            message: questions[6],
            choices: [
                "apache",
                "boost",
                "mit",
                "ibm",
                "mozilla",
                "isc"
            ]
        },
        {
            type: "input",
            name: "Github",
            message: questions[7]
        },
        {
            type: "input",
            name: "Email",
            message: questions[8]
        },
    ]).then(function(data) {
        // Create a MD file
        writeToFile(data.Title, writeMdTitle(data.Title));

        // Append Licenses
        for (let i=0; i<data.License.length; i++) {
            fs.appendFileSync(mdFileName, licenses[`${data.License[i]}`] + '\n', function(err) {console.log(err);});
        };
        // Create a Table of Contents
        fs.appendFileSync(mdFileName, writeMdSubTitle("Table of contents") + '\n', function(err){console.log(err)});
        for (let i=1; i<6; i++) {
            fs.appendFileSync(mdFileName, `[${i}. ${Object.keys(data)[i]}](##${Object.keys(data)[i]})` + '\n' + '\n', function(err){console.log(err)});
        };
        // Append Sub_Titles and Contents
        for (let i=1; i<6; i++) {
            appendToFile(mdFileName, Object.keys(data)[i], Object.values(data)[i]);
        };
        // Github Link and Email
        fs.appendFileSync(mdFileName, writeMdSubTitle("Questions?") + '\n', function(err){console.log(err)});
        fs.appendFileSync(mdFileName, writeMdGithub(data.Github) + '\n' + '\n', function(err){console.log(err)});
        fs.appendFileSync(mdFileName, writeMdEmail(data.Email), function(err){console.log(err)})
    });
}

inquireUserInput();


