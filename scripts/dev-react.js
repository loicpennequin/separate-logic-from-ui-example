const chalk = require('chalk');

setTimeout(() => {
  console.log('===========================================================');
  console.log('===========================================================');
  console.log(
    'Running @daria/client-react and @daria/shared with concurrently causes some weird typescript errors'
  );
  console.log('I have no idea why.');
  console.log(
    `please run ${chalk.green(
      'yarn client-react dev'
    )} dev in a separate terminal`
  );
  console.log('===========================================================');
  console.log('===========================================================');
}, 10_000);
