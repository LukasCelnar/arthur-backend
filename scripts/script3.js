// var request = require("request").defaults({ encoding: null });
var fs = require('fs')

const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))

const newData = []

for (let i = 0; i < 20; i++) {
    const folder = data[i].imgFolder
    const file = data[i].imgFile

    const img = fs.readFileSync('./Pics/Pictures/Pictures/' + folder + '/' + file)
    fs.writeFileSync('./images/' + file, img);
    
    newData.push({
        ...data[i],
        filePath: '/images/' + file
    })
}

fs.writeFileSync('data.json', JSON.stringify(newData));