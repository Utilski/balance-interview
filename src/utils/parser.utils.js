const { parse } = require("csv-parse");



const getParser = (resolveDataPromise) => {
    const records = [];
    
    // Initialize the parser
    const parsedData = {};
    const parser = parse({ delimiter: ',' });
    // Use the readable stream api to consume records
    parser.on("readable", () => {
    let record;
    while ((record = parser.read()) !== null) {
        // we can process here
        if (record[0] === "Fee Type") {
            continue;
        }
        records.push(record);
    }
    });
    // Catch any error
    parser.on("error", (err) => {
        console.error(err.message);
    });
    // Test that the parsed records matched the expected records
    parser.on("end", () => {
        console.log('on end');
        records.reduce((acc, record) => {
            const [type, from, to, perc] = record;
            acc[type] ??= [];
            acc[type].push({from, to, perc});
            return acc;
        }, parsedData);
        resolveDataPromise(parsedData);
    });
    return parser;
}

module.exports = { getParser }