const container = document.getElementById("gridContainer");

//The grid is initalised. Each cell is a div with the class="cell".
function initialiseGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
      let cell = document.createElement("div");
      //cell.innerText = (i);
      container.appendChild(cell).className = "cell";
    };
};
initialiseGrid(12, 12);

//Grid is initalised with number of mines put in random positions.
function initaliseMines(mines){
    let grid = document.querySelectorAll(".cell");
    //Iterate through the grid and place mines at random.
    for (i = 0; i < grid.length; i++){
        console.log(mines);
        if((Math.random() < 0.05) && (mines !== 0) && (mines.className !== "cell mine")){
            grid[i].className = "cell mine";
            grid[i].innerText = "M";
            mines--;
        }
    }
    //If the entire grid has been iterated and all mines have not been placed, then repeat the function until they have.
    if(mines !== 0){
        console.log("Function iterated.")
        initaliseMines(mines);
    }
}
initaliseMines(60);

document.querySelectorAll(".cell")[16].className = "cell mine";