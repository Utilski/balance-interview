// GET
// receive total fee and type of fee
// check against saved structure
// return the numeric value of the cost of the transaction
// e.g. total 100, type clearing -> 0 > 100 < 500 -> .0379 * 100 (return value)

// GET [schema]:[host]:[port]/fees?total=int&type=string

module.exports = {
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        try {
            const { total, type } = request.query;
            console.log(request.query);
            const rule = request.server.app.fees_ruleset.findRule(total, type)
            return total * rule.perc;
        } catch(e) {
            console.error(e);
            return h.response(`${e}`)
        }
    }
}
