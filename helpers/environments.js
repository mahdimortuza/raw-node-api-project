const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: "skdjfbwod"
};

environments.production = {
    port: 5000,
    envName: 'production',
    secretKey: "kjdhiedp"
};
//
// determine which environment was passed
const currentEnvironment =    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// environment to export
const environmentToExport =    typeof environments[currentEnvironment] === 'object'
        ? environments[currentEnvironment]
        : environments.staging;

module.exports = environmentToExport;
