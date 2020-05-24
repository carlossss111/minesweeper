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
        console.log("Initialising grid...")
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
        console.log("Planting mines...")
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
}

grid.initialiseGrid();
grid.initialiseMines();

//var myArray = new Array();
//myArray.push([4,4]);
//myArray.push([document.querySelector(".x"),document.querySelector(".y")])
//console.log(myArray)























/*//OLD 1D
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
        pos = parseInt(pos);
        console.log(`Cell ${pos} clicked after ${event.timeStamp}ms.`);
        let cell = this._gridArray[pos];

        //Checks if there is a mine on the cell clicked.
        if (this.returnIfMine(pos)){
            console.log("A mine has been hit! Game over.");
            document.getElementById("failMsg").style.visibility = "visible";
            myEvents.failed = true;
            return;
        }

        //Checks all adjacent cells.
        let adjacentMines = 0;
        if (this.returnIfMine(pos+1)){ adjacentMines++; }//right
        if (this.returnIfMine(pos-1)){ adjacentMines++; }//left
        if (this.returnIfMine(pos+this._rows)){ adjacentMines++; }//below
        if (this.returnIfMine(pos-this._rows)){ adjacentMines++; }//above
        if (this.returnIfMine(pos+1+this._rows)){ adjacentMines++; }//right below
        if (this.returnIfMine(pos-1+this._rows)){ adjacentMines++; }//left below
        if (this.returnIfMine(pos+1-this._rows)){ adjacentMines++; }//right above
        if (this.returnIfMine(pos-1-this._rows)){ adjacentMines++; }//left above
        console.log(adjacentMines);

        //TODO FIX EDGES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        if(adjacentMines !== 0){
            cell.innerText = adjacentMines;
            cell.style.color = "#2d132c";
        }
        cell.style.backgroundColor = "#c72c41";
    },

    //Returns if there is a mine.
    returnIfMine: function(pos){
        let cell = this._gridArray[pos];
        if (cell === undefined){
            return false;
        }
        let classArray = cell.className.split(" ");
        if (classArray.some(function(elem){return elem === "mine";})){
            return true;
        }
        else{
            return false;
        }
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

grid.initialiseAll(12,12,60);//Initalises grid and mines.
myEvents.initialiseAll();//Initialises event listeners.*/