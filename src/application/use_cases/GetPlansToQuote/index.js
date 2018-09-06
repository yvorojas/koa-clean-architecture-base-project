module.exports = class {

  constructor(repository){
    this.repository = repository
  }

  execute(params) {
    let useCaseByCountry;
    try {
        /* eslint-disable */
        useCaseByCountry = require(`./v1/${params.country}`);
        /* eslint-enable */
    } catch (ex) {
        throw Error({statusCode: 404, detail: `use case for contry ${params.country} not implemented`});
    }
    const useCase = useCaseByCountry(this.configuration, this.repository);
    return useCase.execute(params);
  }
};