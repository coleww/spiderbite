spiderbite
----------------

a generative sequencer, intended for web-audio but ostensibly useful for other things

[![NPM](https://nodei.co/npm/spiderbite.png)](https://nodei.co/npm/spiderbite/)
[![Build Status](https://secure.travis-ci.org/coleww/spiderbite.png)](http://travis-ci.org/coleww/spiderbite)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

based on similar code that is currently running inside of [karaoke-ebooks, a website that writes songs out of your tweets](http://karaoke-ebooks.party), [drone club, a guitar tab player](http://droneclub.club), and [3 things, a generative dubstep single](https://coledubs.itch.io/blzrs-3-things) as well as probably more of my projects that I am now forgetting about.


### generative sequencing

we can think of an audio sequencer as an interface of 1s and 0s,
so a simple boots-n-cats dance rock beat would look like this:

- snare [0, 0, 1, 0]
- hat   [0, 1, 0, 1]
- kick  [1, 0, 0, 0]

instead of just 1s and 0s, we can use any number between 0 and 1 to specify 
the probability of something happening on a given beat. our simple dance rock beat will now occasionally add some more hats and an extra snare at the end:

- snare [0,   0, 1,   0.25]
- hat   [0.5, 1, 0.5, 1]
- kick  [1,   0, 0,   0]

...

...

...