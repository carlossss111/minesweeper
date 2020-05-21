const container = document.getElementById("gridContainer");

//The grid is initalised. Each cell is a div with the class="cell".
function initialiseGrid(rows, cols) {
    container.style.setProperty('--grid-rows', rows);
    container.style.setProperty('--grid-cols', cols);
    for (i = 0; i < (rows * cols); i++) {
      let cell = document.createElement("div");
      cell.innerText = (i + 1);
      container.appendChild(cell).className = "cell";
    };
  };
  
initialiseGrid(16, 16);