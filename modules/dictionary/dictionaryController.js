const utils = require('../../helper/utils');

const getWordDefinition = (word,filter) => {
    const _word = word.trim().toLowerCase();
    return new Promise((resolve,reject) => {
        const apiData = {
            url: `/entries/en/${_word}/${filter}`,
        };
        utils.callApi(apiData).then(result => {
            const definitions = result.results
                .map(obj => {
                    return obj.lexicalEntries.map(lexicalEntry => {
                        return lexicalEntry.entries.map(entry => {
                            return entry.senses.map(sense => {
                                return sense.definitions;
                            })
                        })
                    })
                })
            return resolve(definitions[0][0][0]);
        }).catch(err => {
            return reject(err);
        });
    })
}

// Export all methods
module.exports = {   
    getWordDefinition,
};