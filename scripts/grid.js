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
        console.log("Grid initialised!")
    },

    //Checks the cell for a mine.
    checkCell: function(cell){
        cell.style.backgroundColor = "#c72c41";
        cell.style.color = "#2d132c";
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

grid.initialiseAll();
gameController.addAllListeners();