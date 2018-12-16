const program = require('commander');
require('dotenv').config();
const { getWordDefinition, getFullWordInfo } = require('./modules/dictionary/dictionaryController');
const { logOutputs, logErrors, logFullWordInfo, getRandomWord, logWod } = require('./helper/utils');

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
      const firstDef = definitions.length > 0 ? '---> '+ definitions[0] : definitions[0];
      if (firstDef) {
          definitions[0] = firstDef;
          const msg = definitions.join('\n---> ');
          logOutputs('Definitions', userWord, msg);
      }
      else {
        logErrors(`Definitions for word '${userWord}' is not found.`);
      }
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
      const synonyms = await getWordDefinition(userWord,'synonyms');
      const firstSyn = synonyms.length > 0 ? '---> '+ synonyms[0] : synonyms[0];
      if (firstSyn) {
          synonyms[0] = firstSyn;
          const msg = synonyms.join('\n---> ');
          logOutputs('Synonyms', userWord, msg);
      }
      else {
        logErrors(`Synonyms for word '${userWord}' is not found.`);
      } 
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
      const firstAnt = antonyms.length > 0 ? '---> '+ antonyms[0] : antonyms[0];
      if (firstAnt) {
          antonyms[0] = firstAnt;
          const msg = antonyms.join('\n---> ');
          logOutputs('Antonyms', userWord, msg);
      }
      else {
        logErrors(`Antonyms for word '${userWord}' is not found.`);
      }
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
      const firstEx = sentences.length > 0 ? '---> '+ sentences[0] : sentences[0];
      if (firstEx) {
          sentences[0] = firstEx;
          const msg = sentences.join('\n---> ');
          logOutputs('Examples', userWord, msg);
      }
      else {
        logErrors(`Examples for word '${userWord}' is not found.`);
      }
    } catch(err) {
      logErrors(err);
    }
  });

program
  .command('getFullDic <word>')
  .alias('dic')
  .description('Get Word\'s full description from Oxford dictionary.')
  .action(async (userWord) => {
    try {
      const full = await getFullWordInfo(userWord);
      logFullWordInfo(full, userWord);
    } catch(err) {
      logErrors(err);
    }
  });

program
  .command('getWordOfTheDay')
  .alias('wod')
  .description('Get Word of the day with full description from Oxford dictionary.')
  .action(async(userWord) => {
    try {
      const word = getRandomWord();
      const full = await getFullWordInfo(word);
      logWod(word);
      logFullWordInfo(full, word);
    } catch(err) {
      logErrors(err);
    }
  });
program.parse(process.argv);