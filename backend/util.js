const csv = require('csv-parser');
const fs = require('fs');
const db = require('./queries');

async function refreshRecords() {
    await db.deleteRecords();
    await createRecords();
}

async function createRecords() {
    try {
        await readFile();
    } catch (err) {
        console.log(err.stack)
    }
}

async function readFile() {

    fs.createReadStream('resources/covid_19_data.csv')
        .pipe(csv())
        .on('data', async (row) => {
            var params = row;
            await db.createRecord(await convertToArray(params));
        })
        .on('end', () => {
            console.log('Processed CSV file');
            return true;
        });

}

async function convertToArray(params) {
    var paramsArray = [];
    var entryList = Object.entries(params);
    entryList.forEach((item) => {
        if (item[0] === 'SNo' || item[0] === 'Confirmed' || item[0] === 'Deaths' || item[0] === 'Recovered') {
            paramsArray.push(parseInt(item[1]))
        } else {
            paramsArray.push(item[1]);
        }
    });
    return paramsArray;
}

module.exports = {
    createRecords,
    readFile,
    refreshRecords,
}

