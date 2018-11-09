// Referenced from: https://github.com/xolvio/chimp/issues/485
// Inspired from: https://github.com/xolvio/qualityfaster/blob/master/.scripts/
const exec = require("child_process").exec;

const meteorCommand = process.argv[2];
const chimpCommand = process.argv[3];

const meteorProcess = exec(meteorCommand); // 'yarn or npm run meteor-test-server'

meteorProcess.stdout.pipe(process.stdout);
meteorProcess.stderr.pipe(process.stderr);

// Wait until Meteor is started and then start the chimp tests
meteorProcess.stdout.on('data', (data) => {
  if (data.toString().match('App running at')) {
    const chimpProcess = exec(chimpCommand, { maxBuffer: 20480000 }); // 'yarn or npm run end-to-end-test'

    chimpProcess.stdout.pipe(process.stdout);
    chimpProcess.stderr.pipe(process.stderr);

    chimpProcess.on('close', (code) => {
      console.log(`Chimp exited with code ${code}`);
      meteorProcess.kill();
      process.exit(code);
    });
  }
});
