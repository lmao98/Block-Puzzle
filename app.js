const board = []
const boardElement = document.querySelector('.board')
const startElement = document.querySelector('.start')
const controlsElement = document.querySelector('.controls')
const scoreElement = document.querySelector('.score')
const pieces = [
    [
        [1,1],
        [1,1]
    ],
    [
        [0,0,0],
        [1,1,0],
        [0,1,1]
    ],
    [
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0],
        [0,1,0,0]
    ],
    [
        [0,0,0],
        [0,1,1],
        [1,1,0]
    ],
    [
        [0,1,0],
        [0,1,0],
        [0,1,1]
    ],
    [
        [0,1,0],
        [0,1,0],
        [1,1,0]
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,1,0]
    ]
]
let currentPiece = null
let gameState = 0
let score = 0
function InitBoard () {
    for (let y = 0; y < 22; y++){
        const row = []
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        for (let x = 0; x < 12; x++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            if (x == 0 || x == 11 || y == 0 ) {
                cell.classList.add('border')
            } else if (y == 21) {
                cell.classList.add('border')
                cell.onclick = dropPiece
            }else {
                cell.classList.add('empty')
                cell.onclick = rotatePiece
            }
            cell.onmouseover = () => {
                movePieceHorizontally(x);
            }
            rowElement.appendChild(cell)
            row.push(cell)
        }
        boardElement.appendChild(rowElement)
        board.push(row)
    }
}
function addPiece(){
    for (let y in currentPiece.piece) {
        for(let x in currentPiece.piece[y]) {
            const currentPieceCell = currentPiece.piece[y][x]
            if (currentPieceCell === 1) {
                let xCoord = +x + currentPiece.coordinates.x
                let yCoord = +y + currentPiece.coordinates.y
                let boardCell = board[yCoord][xCoord]
                boardCell.classList.remove('empty')
                boardCell.classList.add('green')
            }
        }
    }
}
function removePiece() {
    for (let y in currentPiece.piece) {
        for(let x in currentPiece.piece[y]) {
            const currentPieceCell = currentPiece.piece[y][x]
            if (currentPieceCell === 1) {
                let xCoord = +x + currentPiece.coordinates.x
                let yCoord = +y + currentPiece.coordinates.y
                let boardCell = board[yCoord][xCoord]
                boardCell.classList.add('empty')
                boardCell.classList.remove('green')
            }
        }
    }
}

function getNextPiece() {
    const pieceIndex = Math.floor(Math.random()* pieces.length)
    const piece = pieces[pieceIndex]
    currentPiece = {
        piece,
        coordinates: {
            x: 1, 
            y: 1
        }
    }
    if (!checkPiece()) {
        gameState = 1
    }
    addPiece();
}
function checkPiece() {
    for (let y in currentPiece.piece) {
        for(let x in currentPiece.piece[y]) {
            const currentPieceCell = currentPiece.piece[y][x]
            if (currentPieceCell === 1) {
                let xCoord = +x + currentPiece.coordinates.x
                let yCoord = +y + currentPiece.coordinates.y
                let boardCell = board[yCoord][xCoord]
                if (!boardCell.classList.contains('empty')) {
                    return false
                }
            }
        }
    }
    return true
}

function pullLinesDown(startY) {
    for (let y = startY; y > 1; y--) {
        board[y].forEach((cell, x) => {
            cell.className = board[y-1][x].className
        });
    }
}

function increaseScore() {
    score += 100
    scoreElement.textContent = score
}

function checkLines() {
    for (let y in board) {
        const row = board[y]
        if (
            !row[1].classList.contains('border') &&
            row.every((cell) => {return !cell.classList.contains('empty')})
        ) {
            pullLinesDown(y);
            increaseScore();
        }
    }
}

function movePieceDown() {
    removePiece();
    currentPiece.coordinates.y++;
    if(!checkPiece()){
        currentPiece.coordinates.y--;
        addPiece();
        checkLines();
        getNextPiece();
        return;
    }
    addPiece()
}

function dropPiece() {
    removePiece();
    while (checkPiece()) {
        currentPiece.coordinates.y++
    }
    currentPiece.coordinates.y--
    addPiece();
}

function movePieceHorizontally(x) {
    removePiece();
    const direction = currentPiece.coordinates.x > x ? -1: 1
    while (checkPiece()&& currentPiece.coordinates.x != x) {
        currentPiece.coordinates.x += direction
    } 
    if (!checkPiece()) {
        currentPiece.coordinates.x -= direction
    } 
    addPiece();
}

function rotatePiece() {
    removePiece();
    currentPiece.piece = currentPiece.piece[0].map((val, index) =>
    currentPiece.piece.map((row) => row[index]).reverse()
  );
  if (!checkPiece()) {
    currentPiece.piece = currentPiece.piece[0].map((val, index) =>
    currentPiece.piece.map((row) => row[row.length - 1 - index])
  );
  }
  addPiece();
}

function gameCycle () {
    if (currentPiece === null) {
        getNextPiece()
    }else {
        movePieceDown();
    }
    if (gameState === 1) {
        alert('Nice try! Score: '+score)
        return;
    }
    setTimeout(gameCycle,1000)
}

startElement.onclick = () => {
    controlsElement.classList.add('hidden')
    InitBoard();
    gameCycle();
}