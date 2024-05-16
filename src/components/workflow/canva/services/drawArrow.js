export default function drawArrow(ctx, str1, str2) {
  // Define line properties
  var startY = 100;
  var endX = 350;
  var endY = 100;
  var lineWidth = 2;
  var lineColor = "red";

  ctx.beginPath();
  ctx.moveTo(str1.shape.x, str1.shape.y);
  ctx.lineTo(str2.shape.x, str2.shape.y);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.stroke();
  ctx.closePath();

  // Define arrow properties
  var startX = str2.shape.x - 80;
  var startY = str2.shape.y - 0;
  var arrowWidth = 10;
  var arrowHeight = 20;
  var arrowColor = "blue";

  // Draw the arrow
  // ctx.beginPath();
  // ctx.moveTo(startX, startY);
  // ctx.lineTo(startX + arrowWidth, startY);
  // ctx.lineTo(startX + arrowWidth, startY - arrowHeight / 2);
  // ctx.lineTo(startX + arrowWidth + arrowHeight, startY);
  // ctx.lineTo(startX + arrowWidth, startY + arrowHeight / 2);
  // ctx.lineTo(startX + arrowWidth, startY);
  // ctx.fillStyle = arrowColor;
  // ctx.fill();
  // ctx.closePath();
}
