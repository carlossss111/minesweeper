var grid = {
    _rows: 12,//default
    _cols: 12,//default
    _mines: 40,//default
    _gridArray: [],//set in initialiseGrid
    _container: document.getElementById("gridContainer"),

    //_gridArray getter.
    get gridArray(){
        return(this._gridArray.length === 0 ? console.log("Cannot get grid.gridArray, not initalised yet!") : this._gridArray);
    },

    //Method initialises the grid with rows and cols as paramenters (or defaults).
    initialiseGrid: function(rows = this._rows, cols = this._cols) {
        this._rows = rows;//Sets object properties.
        this._cols = cols;
        this._container.style.setProperty('--grid-rows', rows);//CSS properties
        this._container.style.setProperty('--grid-cols', cols);
        //Loops through and creates the required number of cells.
        //The _gridArray property is turned into a 2d array (x,-y).
        for (i = 0; i < rows; i++) {
            let rowdiv = document.createElement("div");
            this._container.appendChild(rowdiv);
            this._gridArray.push( [] )
            for (j = 0; j < cols; j++) {
                let cell = document.createElement("div");
                rowdiv.appendChild(cell);
                cell.className = "cell";
                cell.isMine = false;//default attribute.
                this._gridArray[i].push(cell);//pushes to the 2d array.
            }
        };
        console.log(this.gridArray);
    },

    //Method places the required (or default) amount of mines around randomly.
    initialiseMines: function(mines = this._mines){
        for (i = 0; i < this._rows; i++){
            for (j = 0; j < this._cols; j++){
                if (mines === 0){
                    break;
                }
                else if ((Math.random() < 0.05) && (this._gridArray[i][j].isMine === false)){
                    this._gridArray[i][j].isMine = true;//creates isMine attribute.
                    this._gridArray[i][j].innerText = "M";//debug
                    mines--;
                }
            }
        }
        if(mines !== 0){
            this.initialiseMines(mines);
        }
    },

    //Calls both initialiseGrid(,) and initialiseMines().
    initialiseAll: function(rows, cols, mines){
        this.initialiseGrid(rows,cols);
        this.initialiseMines(mines);
        document.getElementById("failMsg").style.visibility = "hidden";
        console.log("Grid initialised!")
    },

    //Checks the cell for a mine.
    checkCell: function(cell){

        cell.style.backgroundColor = "#c72c41";
        cell.style.color = "#2d132c";

        if(cell.isMine){
            console.log("Mine hit, game over!");
            cell.innerText = "M";
            document.getElementById("failMsg").style.visibility = "visible";
            gameController.failed = true;
            return;
        }

        //Gets the cell position on the board.
        let pos = this.findCellPosition(cell);
        let x = pos[0];
        let y = pos[1];

        //Writes the number if there are any adjacent mines.
        //FF uncover if there are none.
        if (this.adjacentMines(x,y)){
            cell.innerText = this.adjacentMines(x,y);
        }
        else{
            this.FFuncover(x,y)
        }
    },

    //Returns the number of adjacent mines.
    adjacentMines: function(x,y){
        let count = 0;
        try{    if(this.gridArray[x+1][y].isMine){ count++ };   }catch(ignore){};//right
        try{    if(this.gridArray[x-1][y].isMine){ count++ };   }catch(ignore){};//left
        try{    if(this.gridArray[x][y+1].isMine){ count++ };   }catch(ignore){};//below
        try{    if(this.gridArray[x][y-1].isMine){ count++ };   }catch(ignore){};//above
        try{    if(this.gridArray[x+1][y+1].isMine){ count++ }; }catch(ignore){};//below right
        try{    if(this.gridArray[x-1][y+1].isMine){ count++ }; }catch(ignore){};//below left
        try{    if(this.gridArray[x+1][y-1].isMine){ count++ }; }catch(ignore){};//above right
        try{    if(this.gridArray[x-1][y-1].isMine){ count++ }; }catch(ignore){};//above left
        return count;
    },

    //Finds the cell position (x,y) in the array if not known. For when a cell is clicked.
    findCellPosition : function(cell){
        let index;
        for(x = 0; x < this._rows; x++){
            let y = this.gridArray[x].findIndex(function(elem){
                return elem === cell;
            })
            if (y !== -1){
                index = [x,y];
                break;
            }
        }
        return index;
    },

    //Uses flood fill to uncover cells surrounding a zero.
    FFuncover: function(x,y){
        let cell = this._gridArray[x][y];
        if(cell.visited === true || cell.isMine === true){
            return;
        }

        //Styles
        if (this.adjacentMines(x,y)){
            cell.innerText = this.adjacentMines(x,y);
        }
        cell.style.backgroundColor = "#c72c41";
        cell.style.color = "#2d132c";
        cell.visited = true;

        //If this cell itself is a zero, repeat for nearby cells.
        if(this.adjacentMines(x,y) === 0){
            try{this.FFuncover(x-1, y);}catch(ignore){};//try/catch for edges cba
            try{this.FFuncover(x-1, y+1);}catch(ignore){};
            try{this.FFuncover(x-1, y-1);}catch(ignore){};
            try{this.FFuncover(x+1, y);}catch(ignore){};
            try{this.FFuncover(x+1, y+1);}catch(ignore){};
            try{this.FFuncover(x+1, y-1);}catch(ignore){};
            try{this.FFuncover(x, y-1);}catch(ignore){};
            try{this.FFuncover(x, y+1);}catch(ignore){};
        }
    }
}

var gameController = {
    failed: false,//check if the game is over.

    //Cell click listener.
    cellListener: function(){
        for (i = 0; i < grid._rows; i++){
            for (j = 0; j < grid._cols; j++){
                grid.gridArray[i][j].addEventListener('mouseup', function(event){
                    //Handler calls the checkCell method (if the game is not over).
                    if(gameController.failed === false){
                        grid.checkCell(event.target);//Calls checkCell method.
                    }
                })
            }
        }
    },

    //Refreshes the page
    reset: function(){
        document.addEventListener('keydown', function(event){
            this.location.reload();
        })
    },

    //Calls other listener methods.
    addAllListeners(){
        this.cellListener();
        this.reset();
    }
}

grid.initialiseAll(12,12,40);
gameController.addAllListeners();