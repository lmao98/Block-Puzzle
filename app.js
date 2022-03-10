// The game will have 6 shapes
// square, triangle, I shape, Z shape, L shape, T shape.
// The pieces will drop down once every second
// The user should be able to rotate the shape by hovering over with the mouse
// For every line completed the user should get 100 points and the line should be removed.
// once any piece touches the top of the box, it's considered lossing, 
// a messege should be displayed to tell the user what the score was and how many lines they completed
// to increase the difficulty of the game, after the user reaches 1000 points,
// the pieces should drop faster (half a second) ?
// for the style the game should be played in a box right in the center of the page
// it should display the score on the left side
// it should have 2 options at the begining
// a start option and About Me option (start will start the game)
// About me option will display a small paragraph about how the game should be played and when it gets harder,
// and a link to my linkedin page.
// maybe some mussic ?
const board = []
const boardElement = document.querySelector('.board')
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
function InitBoard () {
    for (let y = 0; y < 22; y++){
        const row = []
        const rowElement = document.createElement('div')
        rowElement.classList.add('row')
        for (let x = 0; x < 12; x++) {
            const cell = document.createElement('div')
            cell.classList.add('cell')
            if (x == 0 || x == 11 || y == 0 || y == 21) {
                cell.classList.add('border')
            } else {
                cell.classList.add('empty')
            }
            rowElement.appendChild(cell)
            row.push(cell)
        }
        boardElement.appendChild(rowElement)
        board.push(row)
    }
}

function gameCycle () {

}
InitBoard();
gameCycle();