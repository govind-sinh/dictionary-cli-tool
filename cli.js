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
  .action((userWord) => {
    console.log(colors.info(userWord));
  });

program
  .command('getAntonyms <word>')
  .alias('ant')
  .description('Know Word antonyms from Oxford dictionary.')
  .action((userWord) => {
    console.log(colors.info(userWord));
  });

program
  .command('getExamples <word>')
  .alias('ex')
  .description('Get Word Example sentences from Oxford dictionary.')
  .action(() => {
    prompt(questions).then(answers =>
      console.log(colors.info('Your word Definition:'+answers)));
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