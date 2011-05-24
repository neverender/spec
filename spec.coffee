colors = require 'colors'

((glob) ->

  start_date = Date.now()
  
  stack = {
    pass: []
    fail: []
    error: []
  }


  @describe = (name, callback) ->
    console.log ' '
    console.log name
    callback()


  @it = (name, callback) ->
    try

      callback()
      console.log '  ✓ ' + name.green
      stack.pass.push name

    catch e
      if e.name == 'AssertionError'
      
        file = stackInfo(e.stack).file
        line = stackInfo(e.stack).line  
        
        if !e.message
          if e.operator == '==' then e.operator = 'equal'
          e.message = 'expected ' + e.actual + ' to ' + e.operator + ' ' + e.expected
            

        console.log '  ✗ ' + name.yellow
        console.log '    » ' + e.message.yellow + ' // '.grey + file.grey + ':'.grey + line.grey
        stack.fail.push name
      else
        console.log '  ✗ ' + name.red
        console.log '    » ' + e.message.red
        stack.error.push name
     # process.exit()
  stackInfo = (stack) ->
    s = stack.split('\n')[1].split(':')
    line = s[1]
    s = s[0].split('/')
    file = s.pop()
    @line = line
    @file = file
    @
        
  process.on 'exit', ->
    console.log ' '
    
    if stack.pass.length > 0
      passed = true

    if stack.error.length > 0
      errored = true
      m = '✗' + ' Errored'.red.bold
      m += ' » '
      m += stack.error.length + ' Errored'
    else if stack.fail.length > 0
      failed = true
      m = '✗' + ' Failed'.yellow.bold
    else
      m = '✓' + ' Passed'.green.bold
    

    if !errored
      m += ' » '
      if passed then m += stack.pass.length + ' Passed'
      if failed then m += ' • ' + stack.fail.length + ' Failed'
   
    end_date = Date.now()
    time = ((end_date - start_date) / 1000).toFixed(2)
    m += ' ('.grey + time.grey + 's)'.grey 
    console.log m
    
)(@)
