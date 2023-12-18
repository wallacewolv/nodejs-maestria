const fs = require('fs');

console.log('Início');

fs.writeFileSync('arquivoSincrono.txt', 'oi');

console.log('Fim');
