const mongoose = require('mongoose');

/*
"collection": data.records[i].sammlung[0].sammlung,
           "museum": data.records[i].sammlung[0].museum,
           "id": data.records[i].imdasid,
           "description": data.records[i].beschreibung_de,
           "type": data.records[i].objekttitel_de,
           "title": data.records[i].title_de,
           "author": data.records[i].anzeigename,
           "imgFile": data.records[i].medium[0].uri.split('\\')[data.records[0].medium[0].uri.split('\\').length - 1],
           "imgFolder": data.records[i].medium[0].uri.sp
*/

const objectsSchema = new mongoose.Schema({
    collectionType: String,
    museum: String,
    objectId: String,
    description: String,
    type: String,
    title: String,
    author: String,
    filePath: String,
    imgFile: String
})

mongoose.model('Objects', objectsSchema);