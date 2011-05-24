# A small WIP spec runner for CoffeeScript

I didn't like how Vows specs look and Jasmine for node can't handle straight coffeescript. And I was bored.

It's currently pretty limited (no options, no directories, no async) so you probably don't want to use it.

Specs look similar to Jasmine (or RSpec) but coffeescript

    require './spec'

    describe 'The best thing evar!', ->
      it "should do something", ->
        # assert something

The output is similar to Vows with the --spec option

# TODO: 
- command line options
- directories
- async
- more output options

