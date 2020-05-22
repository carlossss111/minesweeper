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
        //const container = document.getElementById("gridContainer");
        this._container.style.setProperty('--grid-rows', rows);//CSS properties
        this._container.style.setProperty('--grid-cols', cols);
        //Loops through and creates the required number of cells.
        for (i = 0; i < (rows * cols); i++) {
          let cell = document.createElement("div");
          this._container.appendChild(cell).className = "cell";
          this._container.appendChild(cell).id = i;
        };
        //Finished grid node array is saved.
        this._gridArray = document.querySelectorAll(".cell");
        //Fail msg hidden.
        document.getElementById("failMsg").style.visibility = "hidden";
        myEvents.failed = false;
    },

    //Method places the required (or default) amount of mines around randomly.
    initialiseMines: function(mines = this._mines){
        //this._mines = mines;
        for (i = 0; i < this._gridArray.length; i++){
            if((Math.random() < 0.05) && (mines !== 0) && (this._gridArray[i].className !== "cell mine")){
                this._gridArray[i].className += " mine";
                this._gridArray[i].innerText = "M";
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
        console.log("Grid initialised!")
    },

    //Cell event handlers. "pos" is the nth cell in the grid.
    checkCell: function(pos){
        console.log(`Cell ${pos} clicked after ${event.timeStamp}ms.`);
        cell = this._gridArray[pos];

        //Checks if there is a mine on the cell clicked.
        let classArray = cell.className.split(" ");
        if (classArray.some(function(elem){return elem === "mine";})){
            console.log("A mine has been hit! Game over.");
            document.getElementById("failMsg").style.visibility = "visible";
            myEvents.failed = true;
        }
        
        cell.style.backgroundColor = "#c72c41";
    }
}

var myEvents = {
    failed: false,//check if the game is over.

    //Cell click listener.
    cellListeners: function(){
        for (i = 0; i < grid.gridArray.length; i++){
            grid.gridArray[i].addEventListener('mouseup',function(event){
                //Handler calls the checkCell method (if the game is not over).
                if(myEvents.failed === false){
                    console.log(myEvents.failed);
                    grid.checkCell(event.target.id);
                }
            })
        }
    },

    //Reset listener.
    reset: function(){
        document.addEventListener('keydown', function(event){
            //Handler removes current grid and re-initialises it and the event listeners.
            if(event.key === "r" || event.key === "R"){
                for (i = 0; i < grid.gridArray.length; i++){
                    grid._container.removeChild(grid.gridArray[i])
                }
                grid.initialiseAll();
                myEvents.initialiseAll();
                console.clear();
                console.log("Grid Reset!") 
            }
        })
    },

    //Calls the other event listeners.
    initialiseAll: function(){
        this.cellListeners();
        this.reset();
    }
}

grid.initialiseAll();//Initalises grid and mines.
myEvents.initialiseAll();//Initialises event listeners.