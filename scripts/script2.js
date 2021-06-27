var fs = require('fs');

const files = [
    'blmki_aib'
]

const newData = []

for (let i = 0; i < files.length; i++) {
    const fileJson = JSON.parse(fs.readFileSync('./' + files[i] + '.json', 'utf8'));
    console.log("running file", i)
    for (let y = 0; y < fileJson.length; y++) {
        newData.push(fileJson[y])
    }
}

console.log(newData.length)

fs.writeFileSync('data.json', JSON.stringify(newData));
