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
      } else if (action === 'Consultar saldo') {
        getAccountBalance();
      } else if (action === 'Depositar') {
        deposit();
      } else if (action === 'Sacar') {
        withdraw();
      } else if (action === 'Sair') {
        exit();
      }
    })
    .catch((err) => console.log(err))
}

// create an account
function createAccout() {
  console.log(chalk.bgGreen.black('Parabéns por escolher o nosso banco!'));
  console.log(chalk.green('Defina as opções da sua conta a seguir'));

  buildAccount();
}

function buildAccount() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Digite um nome para a sua conta:',
    }
  ])
    .then((answer) => {
      const accountName = answer['accountName'];

      if (accountName.length < 3) {
        console.log(chalk.bgRedBright.black.bold('A conta deve conter no minimo 3 caracteres'));
        return buildAccount();
      }

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRedBright.black.bold('Esta conta já existe, escolha outro nome!'));
        buildAccount();
        return;
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.green('Parabéns, a sua conta foi criada!'));
      operation();
    })
    .catch((err) => console.log(err));
}

// add an amount to user account 
function deposit() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?',
    }
  ])
    .then((answerAccountName) => {
      const accountName = answerAccountName['accountName'];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer.prompt([
        {
          name: 'amount',
          message: 'Quanto você deseja depositar',
        }
      ])
        .then((answerAmount) => {
          const amount = answerAmount['amount'];

          // add an amount
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.lgo(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRedBright.black.bold('Esta conta não existe, escolha outro nome!'));
    return false;
  }

  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRedBright.black.bold('Ocorreu um erro, tente novamente mais tarde!'));
    return deposit();
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  )

  console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`));
}

function getAccount(accountName) {
  const accountJson = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf-8',
    flag: 'r',
  });

  return JSON.parse(accountJson);
}

// show account balance
function getAccountBalance() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?',
    }
  ])
    .then((answer) => {
      const accountName = answer['accountName'];

      // verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);

      console.log(chalk.bgBlue.black.bold(`Olá, o saldo da sua conta é R$${accountData.balance}`));

      operation();
    })
    .catch((err) => console.log(err));
}

function withdraw() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?',
    }
  ])
    .then((answerAccountName) => {
      const accountName = answerAccountName['accountName'];

      if (!checkAccount(accountName)) {
        return withdraw();
      }

      inquirer.prompt([
        {
          name: 'amount',
          message: 'Quanto você deseja sacar?',
        }
      ])
        .then((answerAmount) => {
          const amount = answerAmount['amount'];

          removeAmmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRedBright.black.bold('Ocorreu um erro, tente novamente mais tarde!'));
    return withdraw();
  }

  if (accountData.balance < amount) {
    console.log(chalk.bgRedBright.black.bold('Valor indisponível!'));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  )

  console.log(chalk.green(`Foi realizado um saque de R$${amount} da sua conta!`));
  operation();
}

function exit() {
  console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'));
  process.exit();
}

