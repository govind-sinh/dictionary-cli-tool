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

const words = [
    'toxic', 'youthquake','post-truth',
    'antifa','broflake','fragility','kompromat',
    'newsjacking','milk','complicit','recuse','dotard',
    'fidget','chamber','gender-fluid',
    'cuffing-season','Insta','carve','case','cash','cashier','castle' ,
    'ever','farther','gentleman','hardship','improve',
    'jay','kid','laugh','marble','nearly',
    'office','pass','queer','red-bird','smile',
    'tongue','unhurt','velvet'
];

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
    console.log(colors.data(`Your ${isFor} for word `+ colors.info(`'${word}'`) +` are as follows:`));
    console.log(colors.verbose(info));
}

const logFullWordInfo = (full, word) => {
    const { definitions, synonyms, antonyms, sentences } = full;
    if(definitions && definitions.length === 0){
      return  console.log(colors.warn(`Oops! No information for this word`),colors.verbose(word));
    }
    for(let index = 0; index < definitions.length; index += 1) {
        console.log(colors.green(`Definition ${index+1}>`),colors.verbose(definitions[index]));
    }
    if (synonyms) {
        const msg = synonyms.length > 0 ? colors.info(synonyms.join(', ')) : colors.warn('Not available.');
        console.log(colors.america(`Synonyms > `), msg );
    }
    if (antonyms) {
        const msg = antonyms.length > 0 ? colors.blue(antonyms.join(', ')) : colors.warn('Not available.');
        console.log(colors.rainbow(`Antonyms > `), msg);
    }
    if (sentences) {
        const firstEx = sentences.length > 0 ? '---> '+ sentences[0] : sentences[0];
        if (firstEx) {
            sentences[0] = firstEx;
        }
        const msg = sentences.length > 0 ? colors.cyan(sentences.join('\n---> ')) : colors.warn('Not available.');        
        console.log(colors.rainbow(''.padStart(20,'-')));
        console.log(colors.magenta(`Examples`.padStart(15,' ')));
        console.log(colors.rainbow(''.padStart(20,'-')));
        console.log(msg);
    }
}

const logErrors = (err) => {
    if(err.statusCode === 404) {
        console.log(colors.error('Please check your word!'));
    }
    else {
        console.log(colors.error(err));
    }
}

const getSingleArray = (multiDimensionalArray) => {
    return helperLogic(multiDimensionalArray,[]);
}

const helperLogic = (multiDimensionalArray, oneDimensionalArray) => {
    for(var i = 0; i < multiDimensionalArray.length; i++){
        if(!multiDimensionalArray[i]){
            return;
        }
        if(multiDimensionalArray[i] instanceof Array) {
            oneDimensionalArray = helperLogic(multiDimensionalArray[i], oneDimensionalArray);
        }else{
            oneDimensionalArray.push(multiDimensionalArray[i]);
        }
    }
    return oneDimensionalArray;
};

const generateRandomNumber = (maxVaue, minValue) => {
    const random_number = Math.random() * (maxVaue - minValue) + minValue;
    return Math.floor(random_number);
}
const getRandomWord = () => {
    return words[generateRandomNumber(0,words.length)];
}

const logWod = (word) => {
    console.log(colors.verbose('Word of the Day:'),colors.warn(word));
}
module.exports = {   
    callApi,
    logOutputs,
    logErrors,
    getSingleArray,
    logFullWordInfo,
    getRandomWord,
    logWod
};



