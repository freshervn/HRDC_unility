export function circleEvent(
  canvas: HTMLCanvasElement,
  area: any,
  map: {
    mapX: number;
    mapY: number;
  }
) {
  const Handler = (e: MouseEvent) => {
    if ((area.shape = "circle")) {
      var mouseX = e.clientX - canvas.getBoundingClientRect().left;
      var mouseY = e.clientY - canvas.getBoundingClientRect().top;

      // Check if the click is within the canvas
      if (
        mouseX >= map.mapX + area.x &&
        mouseX <= map.mapX + area.x + 100 &&
        mouseY >= map.mapY + area.y &&
        mouseY <= map.mapY + area.y + 100
      ) {
        // Perform actions when clicked inside the map area
        console.log("Clicked inside the map area.");
      }
    }
    // canvas.removeEventListener("onClick", Handler);
  };
  canvas.addEventListener("click", Handler);
}
