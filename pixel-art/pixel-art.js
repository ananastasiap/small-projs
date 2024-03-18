let artField = document.querySelector(".art-field");
let submitGrid = document.getElementById("submit-grid");
let clearGrid = document.getElementById("clear-grid");
let widthRange = document.getElementById("width-range");
let heightRange = document.getElementById("height-range");
let widthValue = document.getElementById("width-value");
let heightValue = document.getElementById("height-value");
let colorInput = document.getElementById("color-input");
let paintColor = document.getElementById("paint-color");
let eraseColor = document.getElementById("erase-color");

const events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";
let draw = false;
let erase = false;

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (error) {
    deviceType = "mouse";
    return false;
  }
};

isTouchDevice();

submitGrid.addEventListener("click", () => {
  artField.innerHTML = "";
  let counter = 0;
  for (let i = 0; i < heightRange.value; i++) {
    counter += 2;
    let row = document.createElement("div");
    row.classList.add("rows");

    for (let j = 0; j < widthRange.value; j++) {
      counter += 2;
      let col = document.createElement("div");
      col.classList.add("cols");
      col.setAttribute("id", `cols${counter}`);

      col.addEventListener(events[deviceType].down, () => {
        draw = true;
        if (erase) {
          col.style.backgroundColor = "transparent";
        } else {
          col.style.backgroundColor = colorInput.value;
        }
      });

      col.addEventListener(events[deviceType].move, (event) => {
        let elId = document.elementFromPoint(
          !isTouchDevice() ? event.clientX : event.touches[0].clientX,
          !isTouchDevice() ? event.clientY : event.touches[0].clientY
        ).id;
        checker(elId);
      });

      col.addEventListener(events[deviceType].up, () => {
        draw = false;
      });

      row.appendChild(col);
    }
    artField.appendChild(row);
  }
});

function checker(elId) {
  let gridCols = document.querySelectorAll(".cols");
  gridCols.forEach((el) => {
    if (elId === el.id) {
      if (draw && !erase) {
        el.style.backgroundColor = colorInput.value;
      } else if (draw && erase) {
        el.style.backgroundColor = "transparent";
      }
    }
  });
}

clearGrid.addEventListener("click", () => {
  artField.innerHTML = "";
});

eraseColor.addEventListener("click", () => {
  erase = true;
  console.log("erase work");
});

paintColor.addEventListener("click", () => {
  erase = false;
});

heightRange.addEventListener("input", () => {
  heightValue.innerHTML =
    heightRange.value < 9 ? `0${heightRange.value}` : heightRange.value;
});

widthRange.addEventListener("input", () => {
  widthValue.innerHTML =
    widthRange.value < 9 ? `0${widthRange.value}` : widthRange.value;
});

window.onload = () => {
  heightRange.value = 0;
  widthRange.value = 0;
};
