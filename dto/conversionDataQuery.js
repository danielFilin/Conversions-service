class ConversionDataQuery {
    constructor(req) {
        this.startDate = new Date(req.params.startDate);
        this.endDate = new Date(req.params.endDate);
        this.conversionName = req.params.conversionName;
    }

    validate () {
        return ( this.startDate instanceof Date && this.endDate instanceof Date && typeof this.conversionName === 'string' && this.conversionName.length > 0) 
    }
}

module.exports = {
    ConversionDataQuery
    }