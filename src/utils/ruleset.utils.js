const ServerError = require("./error.utils");

class Ruleset {
    constructor() {
    }

    update(ruleset) {
        this.ruleset = ruleset;
    }

    findRule = (total, type) => {
        if (!(type in this.ruleset)) {
            throw new ServerError(400, "invalid type")
        }
        const rule = this.ruleset[type].find(({from, to}) => total < to && total > from);
        if (!rule) {
            throw new ServerError(400, "Couln't fine rule, Invalid total or range")
        }
        return rule
    }
}

module.exports = { Ruleset }