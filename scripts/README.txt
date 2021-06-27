These scripts were used to filter and create our own usable data from provided dataset
In order to run this u will need:

./OLD_blmki_aib.json               this file represents original blmki_aib.json file from dataset
./images                           empty folder where you will store all the images
MONGO_URI string in script4.js     this uri will connect with the hosted mongodb

Also u will need to install modules 'fs' and 'mongoose' from npm.
Then you can simply run:

node script.js
node script2.js
node script3.js
node script4.js