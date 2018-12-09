const request = require('request');
const rp = require('request-promise');
const colors = require('colors/safe');

colors.setTheme({
    input: 'grey',
    verbose: 'cyan',
    prompt: 'grey',
    info: 'blue',
    data: 'gray',
    help: 'cyan',
    warn: 'yellow',
    error: 'red'
});

const baseUrl = 'https://od-api.oxforddictionaries.com:443/api/v1';

const callApi = (apiData) => {
    const { url, headers } = apiData;
    const options = {
        url: `${baseUrl}${url}`,
        headers: {
            app_id: process.env.oxford_app_id,
            app_key: process.env.oxford_app_key,
            ...headers
        },
        json: true
    };
    return rp(options);
}

const logOutputs = (isFor, word, info) => {
    console.log(colors.data(`Your ${isFor} for ${word} are as follows:`));
    console.log(colors.verbose(info));
}

const logErrors = (err) => {
    if(err.statusCode === 404) {
        console.log(colors.error('Please check your word!'));
    }
    else {
        console.log(colors.error(err));
    }
}
module.exports = {   
    callApi,
    logOutputs,
    logErrors
};



