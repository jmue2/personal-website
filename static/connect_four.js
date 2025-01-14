// get elements

let playerText = document.getElementById('turnText')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box'))
let colBtns = Array.from(document.getElementsByClassName('colBtn'))

// helper variables
const RED = "red"
const BLUE = "cyan"

const RED_text = "Red"
const BLUE_text = "Blue"

let currentPlayer = RED
let currentPlayer_text = RED_text
let spaces = Array(42).fill(null)
let won = false

const startGame = () => {
    colBtns.forEach(colBtn => colBtn.addEventListener('click', colBtnClicked))
}

//drop checker
function colBtnClicked(e) {
    const id = e.target.id

    let x = +id

    while (x <= 34 && !spaces[x+7]) {
        x = x + 7
    }

    if(spaces[x] == null && !won) {
        spaces[x] = currentPlayer
        boxes[x].style.backgroundColor = currentPlayer
        if (gameWon(x, currentPlayer)) {
            turnText.innerHTML = `${currentPlayer_text} wins!`
            colBtns.forEach(colBtn => colBtn.innerHTML = "WIN")
            won = true
            return
        }
        currentPlayer = currentPlayer == RED ? BLUE : RED
        currentPlayer_text = currentPlayer_text == RED_text ? BLUE_text : RED_text
        colBtns.forEach(colBtn => {
            colBtn.style.color = currentPlayer
            colBtn.style.borderColor = currentPlayer})
        turnText.innerHTML = `${currentPlayer_text}'s turn`
    }
    if (allSpacesFull() && !won) {
        turnText.innerHTML = "It's a tie!"
    }
}

// function on restart button click
function restartGame() {
    for (x = 0; x < 42; x++) {
        spaces[x] = null
        boxes[x].style.backgroundColor=''
    }
    currentPlayer = RED
    currentPlayer_text = RED_text
    colBtns.forEach(colBtn => {
        colBtn.style.color = currentPlayer
        colBtn.style.borderColor = currentPlayer})
    turnText.innerHTML = `${currentPlayer_text}'s turn`
    won = false
    colBtns.forEach(colBtn => colBtn.innerHTML = "Drop")
}

// LOCATION CHECKER HELPERS

function isValid(x) {
    return x < 42 || x >= 0
}

function inSameRow(x, y) {
    // assume isValid(x) and isValid(y)
    return (((x < 7) && (y < 7)) || 
            (((x >= 7) && (x < 14)) && ((y >= 7) && (y < 14))) ||
            (((x >= 14) && (x < 21)) && ((y >= 14) && (y < 21))) ||
            (((x >= 21) && (x < 28)) && ((y >= 21) && (y < 28))) ||
            (((x >= 28) && (x < 35)) && ((y >= 28) && (y < 35))) ||
            (((x >= 35) && (y >= 35))))
}

function inAdjacentCol(x,y) {
    // assume isValid(x) and isValid(y)
    let xmod7 = x % 7
    let ymod7 = y % 7
    return (Math.abs(xmod7-ymod7) === 1)
}

// horizontal win checking
function isHorizontalWin(lastMove, color) {
    let inARow = 0 // keep track of how same color many found in a row
    for (i = 0; i < 4; i++) {
        inARow = 0 // reset back to 0 at start of iteration
        let leftmost = lastMove - i
        let rightmost = lastMove + (3-i)
        for (x = leftmost; x <= rightmost; x++) {
            if (!isValid(leftmost) || !isValid(rightmost)) break
            if (!inSameRow(leftmost, rightmost)) break
            if (spaces[x] == color) {
                inARow++
            }
        }
        if (inARow === 4) {
            return true
        }
    }
    return false
}

// vertical win checking
function isVerticalWin(lastMove, color) {
    let inARow = 0
    let downmost = lastMove + 21
    let upmost = lastMove
    for (x = upmost; x <= downmost; x+=7) {
        if (!isValid(downmost)) break
        if (spaces[x] == color) {
            inARow++
        }
    }
    if (inARow === 4) {
        return true
    }
    return false
}

//diagonal win checking
function isDiagonalWin(lastMove, color) {
    let inARow = 0
    //goes up left to right
    for (i = 0; i < 4; i++) {
        inARow = 0
        let downleftmost = lastMove + 6*i
        let uprightmost = lastMove - 6*(3-i)
        for (x = downleftmost; x >= uprightmost; x-=6) {
            if (!isValid(downleftmost) || !isValid(uprightmost)) break
            if ((inSameRow(downleftmost, downleftmost - 6)) ||
                (inSameRow(downleftmost - 6, downleftmost - 12)) ||
                (inSameRow(downleftmost -12, uprightmost))) break
            if (spaces[x] == color) {
                inARow++
            }
        }
        if (inARow === 4) {
            return true
        }
    }
    //goes down left to right
    for (i = 0; i < 4; i++) {
        inARow = 0
        let upleftmost = lastMove - 8*i
        let downrightmost = lastMove + 8*(3-i)
        for (x = downrightmost; x >= upleftmost; x-=8) {
            if (!isValid(upleftmost) || !isValid(downrightmost)) break
            if ((!inAdjacentCol(downrightmost, downrightmost - 8)) ||
                (!inAdjacentCol(downrightmost -8, downrightmost - 16)) ||
                (!inAdjacentCol(downrightmost -16, upleftmost))) break
            if (spaces[x] == color) {
                inARow++
            }
        }
        if (inARow === 4) {
            return true
        }
    }
    return false
}

//game won checker
function gameWon(lastMove, color) {
    return (isHorizontalWin(lastMove, color)) ||
           (isVerticalWin(lastMove, color)) ||
           (isDiagonalWin(lastMove, color));
}

//tie checking
function allSpacesFull() {
    for (const space of spaces) {
        if (space == null) return false
    }
    return true
}

//add event listeners
restartBtn.addEventListener('click', restartGame)
startGame()