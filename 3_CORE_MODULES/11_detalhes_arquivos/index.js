const fs = require('fs');

const arqnovo = "novoarquivo.txt";
const pasta = "pasta";

fs.stat(pasta, (err, stats) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`isFile: ${stats.isFile()}`);
  console.log(`isDirectory: ${stats.isDirectory()}`);
  console.log(`isSymbolicLink: ${stats.isSymbolicLink()}`);
  console.log(`create time: ${stats.ctime}`);
  console.log(`size: ${stats.size}`);
});
