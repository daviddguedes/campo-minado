const fs = require('fs');

let data = [];
// const letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'w', 'y', 'z'];
const letras = ['a', 'b', 'c', 'd'];
const size = letras.length;

for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        data.push({
            group: letras[x].toUpperCase(),
            variable: y + 1,
            value: `${letras[x].toUpperCase()}${y + 1}`
        });
    }
}

fs.writeFile('./data.json', JSON.stringify(data), (a, b) => { });
