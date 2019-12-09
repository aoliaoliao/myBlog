const fs = require('fs')
const file = fs.createWriteStream(
  './static/articles/2018_12/26/testarticle_4c3968e0-08e3-11e9-bbf6-cbd8adb91c31.md'
)

for (let i = 0; i <= 1e6; i++) {
  file.write(
    'good good study and day day up,good good study and day day up,good good study and day day up,good good study and day day up .\n'
  )
}

file.end()
