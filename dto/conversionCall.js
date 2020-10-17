class ConversionCall {
    constructor(req) {
        this.query = req.params.query;
    }

    validate () {
        return (typeof this.query === 'string' && this.query.length > 0);
    }
}

module.exports = {
    ConversionCall
  }