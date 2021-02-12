const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

const blocks = [
    [
        [1,0,0],
        [1,1,1],
        [0,0,0],
    ],
    [
        [0,0,0],
        [1,1,1],
        [0,0,0],
    ],
    [
        [1,1,0],
        [1,1,0],
        [0,0,0],
    ],
    [
        [1,1,0],
        [0,1,1],
        [0,0,0],
    ],
]

const height = 20;
const width = 10;


class Block {
    // todo: if block index isnt provided, spawn random block;
    constructor(x, y, speed = 1, block) {
        this.x = x;
        this.y = y;
        this.block = blocks[Math.floor(Math.random() * blocks.length)];
        this.speed = speed * 1000;
        this.timePassed = Date.now();
    }

    update() {
        const date = Date.now();
        if ((date - this.timePassed) >= this.speed) {
            this.timePassed = date;
            this.y += 1;
        }
    }
    draw(context) {
        for (let y = 0; y < this.block.length; y++) {
            for (let x = 0; x < this.block[y].length; x++) {
                const fill = this.block[y][x];
                fill && context.fillRect(this.x + x, this.y + y, 0.99, 0.99);
            }            
        }
    }
    
    
}

function makeGridArray() {
    const grid = new Array(height);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(width).fill(0);
    }
    return grid;   
}


context.scale(30, 30)

const grid = makeGridArray();
this.currentBlock = new Block(4, 1, 0.5, 0);
requestAnimationFrame(update);

function update() {
    context.clearRect(0,0,600,600)

    for (let y = 0; y < grid.length; y++) {
        for (let x = 0; x < grid[y].length; x++) {
            const fill = grid[y][x];
            fill && context.fillRect(x, y, 0.99, 0.99);
        }
        
    }
    
    this.currentBlock.draw(context);
    // reverse loop
    for (let y = currentBlock.block.length - 1; y >= 0 ; y--) {
        for (let x = 0; x < currentBlock.block[y].length; x++) {
            const blockFill = currentBlock.block[y][x];
            if (!blockFill) continue;
            const gridFillFuture = grid[currentBlock.y + y + 1]?.[currentBlock.x + x];
            if (gridFillFuture === undefined) {
                placeCurrentBlock();
                this.currentBlock = new Block(4, 1, 0.5, 0);
            }        
            if (gridFillFuture)  {
                placeCurrentBlock();
                this.currentBlock = new Block(4, 1, 0.5, 0);

            }

        }

    }
    this.currentBlock.update();

    requestAnimationFrame(this.update)
}

function placeCurrentBlock() {
    for (let y = 0; y < currentBlock.block.length; y++) {
        for (let x = 0; x < currentBlock.block[y].length; x++) {
            const fill = currentBlock.block[y][x];
            fill && (grid[currentBlock.y + y][currentBlock.x + x] = fill);
        }
    }
    console.table(grid);    
}

document.addEventListener("keydown", event => {
    const arrowLeft = event.key === "ArrowLeft"
    const arrowRight = event.key === "ArrowRight"
    if (arrowLeft) {
        currentBlock.x -= 1;
    }
    if (arrowRight) {
        currentBlock.x += 1;
    }
})