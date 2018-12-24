const cmd = require('node-cmd')
const args = process.argv.slice(2)
console.log(args)
//cmd.run('./node_modules/.bin/cucumber-js --world-parameters {"platform": "' + args[0] + '" "environment": "' + args[1] + '" }')
cmd.get(
  'node_modules\\.bin\\cucumber-js.cmd ' +
  '--world-parameters "{\\\"platform\\\": \\\"windows\\\", \\\"environment\\\": \\\"stage\\\" }"',
  function(err, data, stderr){
    if(stderr){
      console.log(stderr)
    }
    console.log(data)
  }
);