var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./OLD_blmki_aib.json', 'utf8'));

const newData = []

for (let i = 0; i < data.records.length; i++) {

    try {
        if (data.records[i].beschreibung_de) {
            newData.push({
               "collection": data.records[i].sammlung[0].sammlung,
               "museum": data.records[i].sammlung[0].museum,
               "id": data.records[i].imdasid,
               "description": data.records[i].beschreibung_de,
               "type": data.records[i].objekttitel_de,
               "title": data.records[i].title_de,
               "author": data.records[i].anzeigename,
               "imgFile": data.records[i].medium[0].uri.split('\\')[data.records[0].medium[0].uri.split('\\').length - 1],
               "imgFolder": data.records[i].medium[0].uri.split('\\')[data.records[0].medium[0].uri.split('\\').length - 2]
           })
        }
    } catch (err) {
        continue
    }

}


const newDataJSON = JSON.stringify(newData);
fs.writeFileSync('blmki_aib.json', newDataJSON);
