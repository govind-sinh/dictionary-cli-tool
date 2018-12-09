const program = require('commander');
require('dotenv').config();
const { getWordDefinition } = require('./modules/dictionary/dictionaryController');
const { logOutputs, logErrors } = require('./helper/utils');

program
  .version('1.0.0')
  .description('Dictionary Tool');

program
  .command('getDefinition <word>')
  .alias('def')
  .description('Know Word definition from Oxford dictionary.')
  .action(async (userWord) => {
    try{
      const definitions = await getWordDefinition(userWord,'definitions');
      definitions[0] = '---> '+ definitions[0]; 
      logOutputs('Definitions', userWord, definitions.join('\n---> '));
    } catch(err) {
      logErrors(err);
    }
  });

program
  .command('getSynonyms <word>')
  .alias('syn')
  .description('Know Word synonyms from Oxford dictionary.')
  .action(async(userWord) => {
    try{
      const antonyms = await getWordDefinition(userWord,'synonyms');
      antonyms[0] = '---> '+ antonyms[0]; 
      logOutputs('Antonyms', userWord, antonyms.join('\n---> '));
    } catch(err) {
      logErrors(err);
    }
  });

program
  .command('getAntonyms <word>')
  .alias('ant')
  .description('Know Word antonyms from Oxford dictionary.')
  .action(async(userWord) => {
    try{
      const antonyms = await getWordDefinition(userWord,'antonyms');
      antonyms[0] = '---> '+ antonyms[0]; 
      logOutputs('Antonyms', userWord, antonyms.join('\n---> '));
    } catch(err) {
      logErrors(err);
    }
  });

program
  .command('getExamples <word>')
  .alias('ex')
  .description('Get Word Example sentences from Oxford dictionary.')
  .action(async (userWord) => {
    try{
      const sentences = await getWordDefinition(userWord,'sentences');
      sentences[0] = '---> '+ sentences[0]; 
      logOutputs('Sentences', userWord, sentences.join('\n---> '));
    } catch(err) {
      logErrors(err);
    }
  });

program
  .command('getFullDic <word>')
  .alias('dic')
  .description('Get Word\'s full description from Oxford dictionary.')
  .action((userWord) => {
    console.log(colors.info(userWord));
  });

program
  .command('getWordOfTheDay <word>')
  .alias('wod')
  .description('Get Word of the day with full description from Oxford dictionary.')
  .action((userWord) => {
    console.log(colors.info(userWord));
  });
program.parse(process.argv);