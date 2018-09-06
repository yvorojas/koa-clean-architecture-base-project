const EnvironmentVariables = require('./infraestructure/EnvironmentVariables');
const server = require('./infraestructure/webserver/server');
// Start the server
const start = () => {

  const environmentVariables = new EnvironmentVariables();
  const configuration = environmentVariables.load();
  try {
    server.create();
    server.listen(configuration.environment.PORT, configuration.environment.NODE_ENV);
  }
  catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();