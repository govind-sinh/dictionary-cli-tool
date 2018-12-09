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
                        if (filter === 'sentences') {
                            return lexicalEntry.sentences.map(sentence => {
                                // console.log(sentence.text)
                                return sentence.text;
                            })
                        }
                        else {
                            return lexicalEntry.entries.map(entry => {
                                return entry.senses.map(sense => {
                                    if (filter === 'definitions'){
                                        return sense[filter];
                                    }
                                    else if(filter === 'antonyms' || filter === 'synonyms') {
                                        return sense[filter].map(antonym => {
                                            return antonym.text;
                                        });
                                    }
                                })
                            })
                        }
                    })
                })
            if (filter === 'sentences') {
                const sa = utils.getSingleArray(definitions);
                return resolve(sa);        
            }
            const sa = utils.getSingleArray(definitions);
            return resolve(sa);
        }).catch(err => {
            return reject(err);
        });
    })
}

// Export all methods
module.exports = {   
    getWordDefinition,
};