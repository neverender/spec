(function() {
  var colors;
  colors = require('colors');
  (function(glob) {
    var stack, stackInfo, start_time;
    start_time = Date.now();
    stack = {
      pass: [],
      fail: [],
      error: []
    };
    this.describe = function(name, callback) {
      console.log(' ');
      console.log(name);
      return callback();
    };
    this.it = function(name, callback) {
      var file, line;
      try {
        callback();
        console.log('  ✓ ' + name.green);
        return stack.pass.push(name);
      } catch (e) {
        if (e.name === 'AssertionError') {
          file = stackInfo(e.stack).file;
          line = stackInfo(e.stack).line;
          if (!e.message) {
            if (e.operator === '==') {
              e.operator = 'equal';
            }
            e.message = 'expected ' + e.actual + ' to ' + e.operator + ' ' + e.expected;
          }
          console.log('  ✗ ' + name.yellow);
          console.log('    » ' + e.message.yellow + ' // '.grey + file.grey + ':'.grey + line.grey);
          return stack.fail.push(name);
        } else {
          console.log('  ✗ ' + name.red);
          console.log('    » ' + e.message.red);
          return stack.error.push(name);
        }
      }
    };
    stackInfo = function(stack) {
      var file, line, s;
      s = stack.split('\n')[1].split(':');
      line = s[1];
      s = s[0].split('/');
      file = s.pop();
      this.line = line;
      this.file = file;
      return this;
    };
    return process.on('exit', function() {
      var end_time, errored, failed, m, passed, time;
      console.log(' ');
      if (stack.pass.length > 0) {
        passed = true;
      }
      if (stack.error.length > 0) {
        errored = true;
        m = '✗' + ' Errored'.red.bold;
        m += ' » ';
        m += stack.error.length + ' Errored';
      } else if (stack.fail.length > 0) {
        failed = true;
        m = '✗' + ' Failed'.yellow.bold;
      } else {
        m = '✓' + ' Passed'.green.bold;
      }
      if (!errored) {
        m += ' » ';
        if (passed) {
          m += stack.pass.length + ' Passed';
        }
        if (failed) {
          m += ' • ' + stack.fail.length + ' Failed';
        }
      }
      end_time = Date.now();
      time = ((end_time - start_time) / 1000).toFixed(2);
      m += ' ('.grey + time.grey + 's)'.grey;
      return console.log(m);
    });
  })(this);
}).call(this);
