var seq = require('./')({bpm: 200}) // './'' => 'spiderbite'
window.AudioContext = window.AudioContext || window.webkitAudioContext
var ac = new AudioContext()
var pie = require('pie-ano')(ac)
pie.connect(ac.destination)




seq.bind(true, function (data, index, array) {
  // here, just using the data value to play a midi note.
  // might also map it to a scale, or do other stuff, or whatever u want really GET WILD
  console.log(data)
  pie.update({midiNote: 69 + data, attack: 0.253, decay: 0.1, sustain: 0.13, release: 0.15, peak: 0.15, mid: 0.3, end: 0.00000001}, ac.currentTime)
  // and trigger it!
  pie.start(ac.currentTime)
  console.log('stuff')
}, [
  {
    data: [
      [[0, 7], [0], [0, -7], [0]],
      [[0, 7], [0], [5, -3], [3]]
    ],
    probs: [
      [1, 0.75, 0.5, 0.25],
      [1, 0.75, 1, 0.75]
    ],
    nexts: [
      [0, 0, 1], [1, 1, 0]
    ],
    mod: 1,
    current: 0,
    tick: 0
  },
  {
    data: [
      [[3, 7], [3], [3, -7], [3], [5, 0], [5], [5, -0], [5]],
      [[5, 3], [5], [5, -3], [3], [0, 3], [0], [0, -3], [3]]
    ],
    probs: [
      [1, 0.35, 0.5, 0.25, 1, 0.35, 0.5, 0.25],
      [1, 0.75, 1, 0.75, 1, 0.35, 0.5, 0.25]
    ],
    nexts: [
      [0, 0, 1], [1, 1, 0, null]
    ],
    mod: 1,
    current: 0,
    tick: 0
  }
])

seq.setStructure([[0, 0, 0, 1], [1]])

seq.start()
// seq.stop()

console.log('them thangs')