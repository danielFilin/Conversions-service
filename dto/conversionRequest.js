class ConversionRequest {
    constructor(req) {
        this.name = req.body.name;
    }

    validate () {
        return (typeof this.name === 'string' && this.name.length > 0);
    }
}

module.exports = {
    ConversionRequest
  }