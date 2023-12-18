const chalk = require("chalk")

const nota = 8

if (nota >= 7) {
  console.log(chalk.green.bold('Parabéns! Você esta aprovado!'))
} else {
  console.log(chalk.bgRed.black('Você precisa fazer a prova de recuperação!'))
}
