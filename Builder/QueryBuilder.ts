export enum criteria{
    asc="asc",
    dsc="dsc"
}

interface Query{
    _source?: Array<String>,
    track_total_hits?: Boolean,
    size?: Number,
    query?: Object,
    sort?: Array<Object>
}

export class QueryBuilder {

    private query: Query = {};

    constructor(_source: Array<String> = [], track_total_hits: Boolean = true, size: Number = 100) {
        let query = {}
        this.query = {
            _source,
            track_total_hits,
            size
        }

        return this
    }

    build(): Object {
        return this.query;
    }

    addBool(bool: Object): QueryBuilder{
        this.query = {
            ...this.query,
            query:bool
        }

        return this
    }

    addSortingCriteriaOnTimestamp(criteria: criteria){
        let sort = [{
            "@timestamp":{ "order": criteria}
        }]

        this.query.sort = sort
    }

}