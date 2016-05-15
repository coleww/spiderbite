spiderbite
----------------

a probabilistic sequencer, intended for web-audio but ostensibly useful for other things

[![NPM](https://nodei.co/npm/spiderbite.png)](https://nodei.co/npm/spiderbite/)
[![Build Status](https://secure.travis-ci.org/coleww/spiderbite.png)](http://travis-ci.org/coleww/spiderbite)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

### what

- usually a sequencer is all like `[X][ ][X][ ]` and that plays a sample every other beat
- but hey, on/off is binary, so that is just `[1][0][1][0]` if u think about it
- so why not pass a floating point instead? `[1][0][0.5][0]` now u skip that second hit half the time
- this module tries to do this sort of "randomly pick from a thing based on probabilities" at every level of song structure

### docs

- WIP TODO VERY SORRY. the API to this thing is still shifting around