var tap = require('tap')

var spiderbite = require('./')
// check that stuff gets calleda t times i guess?
tap.test('does the thing', function (t) {
  t.plan(1)
  t.equal(spiderbite('world'), 'hello world', 'does it')
})
