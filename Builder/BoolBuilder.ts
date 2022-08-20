interface bool {
    filter?: Array<Object>,
    must?: Array<Object>,
    should?: Array<Object>,
    must_not?: Array<Object>,
    minimum_should_match?: Number
}

export class BoolBuilder {

    private bool: bool;

    constructor() {
        this.bool = {}
    }

    build(): Object {
        return this.bool
    }

    private addFilter(filterObj: Object): BoolBuilder {
        if (this.bool.hasOwnProperty('filter') === false) {
            this.bool = {
                ...this.bool,
                filter: []
            }
        }
        this.bool.filter = [...this.bool.filter, filterObj]
        return this
    }

    private addMust(mustObj: Object) : BoolBuilder{
        if (this.bool.hasOwnProperty('must') === false) {
            this.bool = {
                ...this.bool,
                must: []
            }
        }
        this.bool.must = [...this.bool.must, mustObj]

        return this
    }

    addMinimumShouldMatch(shouldMatch: Number) : BoolBuilder{
        this.bool.minimum_should_match = shouldMatch

        return this
    }

    addTermToFilter(field: String, value: String) : BoolBuilder {

        let term ={}
        term["term"] = {}
        term["term"][field] = value
        this.addFilter(term)

        return this
    }

    addRangeToFilterGteTime(date: String): BoolBuilder{

        let range ={}
        range["range"] = {}
        range["range"] = {
            '@timestamp':{
                gte:date
            }
        }
        this.addFilter(range)

        return this
    }

    addRangeToFilterLteTime(date: String): BoolBuilder{

        let range ={}
        range["range"] = {}
        range["range"] = {
            '@timestamp':{
                lte:date
            }
        }
        this.addFilter(range)

        return this
    }

    addBoolToFilter(bool: Object): BoolBuilder{
        this.addFilter(bool)

        return this
    }

    addRangeToMust(gte: String, lte: String): BoolBuilder{

        let range = {
            "@timestamp":{
                gte,
                lte
            }
        }

        this.addMust({range})

        return this;
    }
    
}