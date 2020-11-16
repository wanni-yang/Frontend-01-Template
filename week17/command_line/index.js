const stdin = process.stdin
const stdout = process.stdout

stdin.setRawMode(true)
stdin.resume()
stdin.setEncoding('utf8')

function getChar() {
  return new Promise((resolve) => {
    stdin.once('data', function(key) {
      resolve(key)
    })
  })
}
// n为向上移动几行
function up(n = 1) {
  stdout.write('\033[' + n + 'A')
}

function down(n = 1) {
  stdout.write('\033[' + n + 'B')
}

function left(n = 1) {
  stdout.write('\033[' + n + 'D')
}

function right(n = 1) {
  stdout.write('\033[' + n + 'C')
}

void (async function() {
  stdout.write('which framework do you want to use?\n')
  let ans = await select([ 'vue', 'react', 'angular' ])
  stdout.write('You selected ' + ans + '\n')
  process.exit()
})()

async function select(choices) {
  let selected = 0

  for (let i = 0; i < choices.length; i++) {
    if (i === selected) stdout.write('[x]' + choices[i] + '\n')
    else stdout.write('[ ]' + choices[i] + '\n')
  }
  //光标回到最上面
  up(choices.length)
  right()

  while (true) {
    let char = await getChar()
    if (char === '\u0003') {
      process.exit()
      break
    }
    //  w up; s down
    if (char === 'w' && selected > 0) {
      // x 跟随光标移动
      stdout.write(' ')
      left()
      selected--
      up()
      stdout.write('x')
      left()
    }

    if (char === 's' && selected < choices.length - 1) {
      stdout.write(' ')
      left()
      selected++
      down()
      stdout.write('x')
      left()
    }

    if (char === '\r') {
      down(choices.length - selected)
      left()
      return choices[selected]
    }

    // console.log(char.split('').map((c) => c.charCodeAt(0)))
  }
}
