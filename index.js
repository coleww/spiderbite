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

module.exports = function (currentSong) {
  var interval, globalTick = 0, song = currentSong
  return {
    start: function () {
      if (interval) throw('wtf')
      interval = setInterval(function () {
        globalTick++
        Object.keys(song.instruments).forEach(function (k) {
          var instrument = song.instruments[k]
          var pattern = instrument.patterns[song.current]

          var onItsBeat = globalTick % (pattern.mod || 1) == 0

          if (onItsBeat && roll(pattern.probs[pattern.currentVersion][pattern.currentTick])) {
            instrument.play(pattern.notes ? pick(pattern.notes[pattern.currentVersion][pattern.currentTick]) : undefined)
          }
          if (onItsBeat) pattern.currentTick++
          if (pattern.currentTick == pattern.probs[pattern.currentVersion].length) {
            pattern.currentTick = 0
            pattern.currentVersion = pick(pattern.nexts[pattern.currentVersion])
            if (instrument.lead) {
              if (nextSong) song = nextSong, nextSong = null
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
    updateSong: function (newSong) {
      song = newSong
    }
  }
}
