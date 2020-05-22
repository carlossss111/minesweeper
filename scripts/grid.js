var grid = {
    _rows:12,//default
    _cols:12,//default
    _mines:40,//default
    _gridArray:[],//set in initialiseGrid

    //Method initialises the grid with rows and cols as paramenters (or defaults).
    initialiseGrid: function(rows = this._rows, cols = this._cols) {
        this._rows = rows;//Sets object properties.
        this._cols = cols;
        const container = document.getElementById("gridContainer");
        container.style.setProperty('--grid-rows', rows);//CSS properties
        container.style.setProperty('--grid-cols', cols);
        //Loops through and creates the required number of cells.
        for (i = 0; i < (rows * cols); i++) {
          let cell = document.createElement("div");
          container.appendChild(cell).className = "cell";
        };
        //Finished grid node array is saved.
        this.gridArray = document.querySelectorAll(".cell");
    },

    //Method places the required (or default) amount of mines around randomly.
    initialiseMines: function(mines = this._mines){
        this._mines = mines;
        for (i = 0; i < this.gridArray.length; i++){
            if((Math.random() < 0.05) && (mines !== 0) && (mines.className !== "cell mine")){
                this.gridArray[i].className = "cell mine";
                this.gridArray[i].innerText = "M";
                mines--;
            }
        }
        //If the entire grid has been iterated and all mines have not been placed, then repeat the function until they have.
        if(mines !== 0){
            this.initialiseMines(mines);
        }
    },

    //Calls both initialiseGrid(,) and initialiseMines().
    initialiseAll: function(rows, cols, mines){
        this.initialiseGrid(rows,cols);
        this.initialiseMines(mines);
        console.log("Initialised!")
    }
}

grid.initialiseAll();