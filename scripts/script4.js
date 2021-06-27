const mongoose = require('mongoose');
var fs = require('fs')

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

mongoose.connect('MONGO_URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', async function() {
    const Objects = mongoose.model('Objects');

    const data = JSON.parse(fs.readFileSync('./data.json', 'utf8'))

    for (let i = 0; i < data.length; i++) {

        console.log("doing", i)

        const object = new Objects({
            collectionType: data[i].collection,
            museum: data[i].museum,
            objectId: data[i].objectId,
            description: data[i].description,
            type: data[i].type,
            title: data[i].title,
            author: data[i].author,
            filePath: data[i].filePath,
            imgFile: data[i].imgFile
        })

        await object.save();
    }

});