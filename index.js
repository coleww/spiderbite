module.exports = function (bpm) {
  return {
    bpm: bpm,
    interval: undefined,
    tick: 0, // increments each interval
    current: 0, // which pattern for each inst (verse, chorus, etc.)
    instruments: [], // the instruments, lol
    structure: undefined, // how to jump between the larger patterns

    start: function () {
      if (!this.instruments.length) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('no data is bound')
      if (!this.structure) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('no structure is bound')
      if (this.interval) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('oops u tried to start another loop, way to go Steve Reich smdh')
      if (!this.instruments.some(instrument => instrument.lead)) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('a lead instrument must be bound')

      this.interval = setInterval(() => {
        // advance the global counter
        this.tick++

        this.instruments.forEach(instrument => {

          // grab the current pattern for this instrument (verse, chorus, etc.)
          var pattern = instrument.data[this.current]

          // if the pattern has a modulus value, see if this is it is on beat
          // i.e, mod 1: every beat, mod 2: every other beat
          // useful for creating breakdowns and bass drops
          var onItsBeat = this.tick % (pattern.mod || 1) === 0

          // if the instrument is on it's beat, and wins the dice roll
          if (onItsBeat && roll(pattern.probs[pattern.current][pattern.tick])) {

            // play the instrument, passing along a randomly chosen note if one is available for that beat
            instrument.play(pattern.notes ? pick(pattern.notes[pattern.current][pattern.tick]) : undefined)
          }

          // advance the counter for this pattern
          if (onItsBeat) pattern.tick++

          // if we are at the end of a pattern
          if (pattern.tick === pattern.probs[pattern.current].length) {

            // reset the counter
            pattern.tick = 0

            // pick a new internal pattern to play
            pattern.current = pick(pattern.nexts[pattern.current])

            //
            if (instrument.lead) {
              this.current = pick(this.nexts[this.current])
              if (typeof this.current !== 'number') {

              }
            }
          }
        })
      }, 60000.0 / this.bpm)
    },

    stop: function () {
      clearInterval(this.interval)
      this.interval = null
    },

    bind: function (lead, cb, data) {

      // if this instrument is labelled a "lead" but we already have a lead, that's a boo-boo
      if (lead && this.instruments.some(instrument => instrument.lead)) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('a lead instrument is already bound')

      // check to see that every existing instrument in the sequencer...
      if (this.instruments.length) {

          // has the same number of larger patterns as the data being added...
        if (this.instruments.some(inst => inst.data.length !== data.length)) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('data does not match existing data')
      }

      // if there is a structure bound, ...
      if (this.structure) {

        // ... check to see that it has as many patterns as there are in the bound data
        if (this.structure.length !== data.length) throw new YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError('data does not match existing structure')
      }
      // check that the data is valid, note/prob/next-wise
      this.instruments.push({data: data, play: cb, lead: lead})
    },

    setStructure: function (data) {
      if (this.instruments.length) {
        // check that this data has the same # of stuff as that data
      }
      // check that the data is valid, note/prob/next-wise
      this.structure = data
    }
  }
}

function pick (arr) {
  return arr[~~(Math.random() * arr.length)]
}

function roll (prob) {
  return Math.random() < prob
}

function YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError (msg) {
  this.name = 'YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError'
  this.message = msg
}

YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError.prototype = new Error()
YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError.prototype.constructor = YouGotHitByYouGotStruckByYouGotBitByASmoothDubstepCriminalSpiderYoWatchOutTakeSomeVitaminsForThatOrSomethingError
