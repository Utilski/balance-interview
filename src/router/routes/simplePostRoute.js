const ServerError = require('../../utils/error.utils.js');
const { getParser } = require('../../utils/parser.utils.js');
const { Readable } = require('node:stream');
const { Ruleset } = require('../../utils/ruleset.utils.js');
// POST
// receive csv url
// read csv
// validate csv structure against:
// [fee type], [from amount], [to amount], [percentage value]
// save new structure information (maybe in cache / json)
// return new structure saved success / fail / error
// notes:
// * we can save it on disk and hold an in memory json for processing only
//   and during shutdown we save the new value as json file

// POST [schema]:[host]:[port]/fees
// Body:
// Url to csv:
// csv:
// [fee type], [from amount], [to amount], [percentage value]
// Response: validation
module.exports = {
    method: 'POST',
    path: '/',
    handler: async (request, h) => {
        try {
            const { url } = request.payload;
            try {
                const urlObj = new URL(url);
            } catch(e) {
                throw new ServerError(400, "Invalid url");
            }
            const r = await fetch(url);
            let { promise: dataPromise, resolve, reject } = Promise.withResolvers();
            const parser = getParser(resolve);
            Readable.fromWeb(r.body).pipe(parser);
            const parsedData = await dataPromise;
            // console.log(resultJson);
            
            request.server.app.fees_ruleset ??= new Ruleset();
            request.server.app.fees_ruleset.update(parsedData);

            return h.response(parsedData);
        } catch (e) {
            console.error(e);
            return h.response(`${e}`)
        }
        // return `received ${JSON.stringify(body)}`
    }
}

// {clearing: [{from:0, to:500, perc}]}
// arr.filter(type).find(({type, from, to}) =>)