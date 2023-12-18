const chalk = require("chalk");
const inquirer = require('inquirer');

inquirer.prompt([
  {
    name: 'nome',
    message: 'Qual o seu nome?'
  },
  {
    name: 'idade',
    message: 'Qual a sua idade?'
  },
]).then((answers) => {

  if (!answers.nome || !answers.idade) {
    throw new Error("O nome e a idade são obrigatórios");
  }

  if (!Number.isInteger(answers.idade)) {
    throw new Error("A idade deve ser número");
  }

  const response = `Você se chama ${answers.nome} e sua idade é ${answers.idade}`;
  console.log(chalk.bgYellow.black(response));
})
  .catch((err) => console.log(err));
