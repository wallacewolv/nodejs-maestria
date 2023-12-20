// modulos externos
const inquirer = require('inquirer');
const chalk = require('chalk');

// modulos internos
const fs = require('fs');

operation();

function operation() {
  inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'O que você deseja fazer?',
      choices: [
        'Criar conta',
        'Consultar saldo',
        'Depositar',
        'Sacar',
        'Sair',
      ],
    },
  ])
    .then((answer) => {
      const action = answer['action'];

      if (action === 'Criar conta') {
        createAccout();
      }
    })
    .catch((err) => console.log(err))
}

// create an account
function createAccout() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));
}
