// packages
const fs = require('fs');
const inquirer = require('inquirer');

// generate README file
function generateREADME(answers) {
    console.log(answers.license);
    const projectLicense = answers.license;
    const badgeLicense = projectLicense.badge;
    const noticeLicense = `Licensing: ${projectLicense.name}. ${projectLicense.description}`;
    const badgeClean = badgeLicense.replace('[![', '![').replace(')]', ')');

    return `
${badgeClean}

# ${answers.title}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Testing](#testing)
- [License](#license)
- [Questions](#questions)

## Description
${answers.description}

## Installation
${answers.installation}

## Usage
${answers.instructions}

## Contributing
${answers.contribute}

## Testing
${answers.testing}

## License
${noticeLicense}

## Questions
If you have any questions, feel free to reach out:

- GitHub: [${answers.github}](https://github.com/${answers.github})
- Email: <a href="mailto:${answers.email}">${answers.email}</a>
`;
}

// write README file
function writeREADME(content) {
    fs.writeFile('README.md', content, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('README.md has been created successfully!');
    });
}

inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is the name of your project?',
      name: 'title',
    },
    {
      type: 'input',
      message: 'Provide a description for your project. What was your motivation for making the project and what problem(s) does it address?',
      name: 'description',
    },
    {
        type: 'input',
        message: 'Provide written instructions of how to install your project. How can a user get the development environment running?',
        name: 'installation',
    },
    {
        type: 'input',
        message: 'Provide instructions for use.',
        name: 'instructions',
    },
    {
        type: 'input',
        message: 'If you created an application or package and would like other developers to contribute it, include guidelines for doing so.',
        name: 'contribute',
    },
    {
        type: 'input',
        message: 'Provide test instructions for your project.',
        name: 'testing',
    },
    {
        type: 'list',
        message: 'Choose a license for your project.',
        name: 'license',
        choices: [
            {
                name: 'MIT',
                value: {
                    name: 'MIT License',
                    description: 'A permissive license that allows you to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software.',
                    badge: '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)]'
                }
            },
            {
                name: 'GNU (GPL)',
                value: {
                    name: 'GNU General Public License (GPL)',
                    description: 'A copyleft license that requires derivative works to be distributed under the same license terms, ensuring that the software remains free and open-source.',
                    badge: '[![License: GPL](https://img.shields.io/badge/License-GPL-blue.svg)]'
                }
            },
            {
                name: 'Apache',
                value: {
                    name: 'Apache License',
                    description: 'A permissive license that allows you to use, modify, distribute, and sublicense the software, including patent rights.',
                    badge: '[![License: Apache](https://img.shields.io/badge/License-Apache-blue.svg)]'
                }
            },
            {
                name: 'BSD',
                value: {
                    name: 'BSD License',
                    description: 'Permissive licenses similar to the MIT License but with slightly different wording and clauses.',
                    badge: '[![License: BSD](https://img.shields.io/badge/License-BSD-blue.svg)]'
                }
            },
            {
                name: 'CC',
                value: {
                    name: 'Creative Commons License',
                    description: 'These licenses are used for creative works, such as documentation, artwork, etc., allowing authors to specify how their work can be used and distributed.',
                    badge: '[![License: CC](https://img.shields.io/badge/License-CC-green.svg)]'
                }
            },
            {
                name: 'MPL',
                value: {
                    name: 'Mozilla Public License (MPL)',
                    description: 'A copyleft license that combines aspects of both the GPL and permissive licenses, allowing code under MPL to be combined with code under other licenses.',
                    badge: '[![License: MPL](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)]'
                }
            },
            {
                name: 'ISC',
                value: {
                    name: 'ISC License',
                    description: 'A permissive license similar to the MIT License but with simpler language and fewer clauses.',
                    badge: '[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)]'
                }
            },
            {
                name: 'Unlicense',
                value: {
                    name: 'Unlicense',
                    description: 'A public domain dedication intended to release software into the public domain, waiving all copyright and related rights.',
                    badge: '[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)]'
                }
            }
        ]
    },
    {
        type: 'input',
        message: 'Enter your Github username.',
        name: 'github',
    },
    {
        type: 'input',
        message: 'Enter an email for users and other developers to contact you.',
        name: 'email',
    },
  ])
  .then((answers) => 
    {
        const readmeContent = generateREADME(answers);
        writeREADME(readmeContent);
    })
    .catch((error) => 
    {
        console.error(error);
    });
