function pick (arr) {
  // console.log(arr)
  return arr[~~(Math.random() * arr.length)]
}

function roll (prob) {
  return Math.random() < prob
}

// ADD
// - modulus
// - randos? flipsies?

module.exports = function (bpm) {
  var interval, globalTick = 0, current = 0, instruments = [], structure
  return {
    start: function () {
      // check if bound data is all gonna be chill!
      // no wait u did that already?
      if (!instruments.length) throw('no data is bound')
      if (!structure) throw('no structure is bound')
      if (interval) throw('oops u tried to start another loop, way to go Steve Reich smdh')




      interval = setInterval(function () {
        globalTick++
        instruments.forEach(function (instrument) {
          var pattern = instrument.data[song.current]

          var onItsBeat = globalTick % (pattern.mod || 1) == 0

          if (onItsBeat && roll(pattern.probs[pattern.currentVersion][pattern.currentTick])) {
            instrument.play(pattern.notes ? pick(pattern.notes[pattern.currentVersion][pattern.currentTick]) : undefined)
          }
          if (onItsBeat) pattern.currentTick++
          if (pattern.currentTick == pattern.probs[pattern.currentVersion].length) {
            pattern.currentTick = 0
            pattern.currentVersion = pick(pattern.nexts[pattern.currentVersion])
            if (instrument.lead) {
              // if (nextSong) song = nextSong, nextSong = null
              song.current = pick(song.nexts[song.current])
              if (!song.current) alert('it is over')
            }
          }
        })
      }, 60000.0 / song.bpm)
    },
    stop: function () {
      clearInterval(interval)
      interval = null
    },
    bind: function (cb, data) {
      if (instruments.length) {
        // check that this data has the same # of stuff as that data
      }
      // check that the data is valid, note/prob/next-wise
      instruments.push({data: data, play: cb})
    },
    setStructure: function () {

    }
  }
}
