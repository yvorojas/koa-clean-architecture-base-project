module.exports = class {
    constructor(repository){
        this.repository = repository;
    };

    execute = async (params) => {
        await repository.get(params)
        .then((response) =>{
             return response;
        })
        .catch((err) => {
            throw Error({statusCode: err.statusCode, detail: err.message})
        });
    }
}