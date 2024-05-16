export default function drawSquare(
  ctx: any,
  { content, shape }: { content: any; shape: any }
) {
  const x = shape?.x - 50 || 100;
  const y = shape?.y - 50 || 100;
  const side = 100;
  const borderRadius = 10;
  const background = shape?.background || "black";
  // Draw the rounded rectangle
  ctx.fillStyle = background;
  ctx.beginPath();
  ctx.moveTo(x + borderRadius, y);
  ctx.lineTo(x + side - borderRadius, y);
  ctx.quadraticCurveTo(x + side, y, x + side, y + borderRadius);
  ctx.lineTo(x + side, y + side - borderRadius);
  ctx.quadraticCurveTo(x + side, y + side, x + side - borderRadius, y + side);
  ctx.lineTo(x + borderRadius, y + side);
  ctx.quadraticCurveTo(x, y + side, x, y + side - borderRadius);
  ctx.lineTo(x, y + borderRadius);
  ctx.quadraticCurveTo(x, y, x + borderRadius, y);
  ctx.closePath();
  ctx.fill();

  var fontSize = 16;
  var textColor = "red";
  ctx.font = fontSize + "px Arial";
  ctx.fillStyle = textColor;
  ctx.fillText(content?.title || "", shape?.x - 20 || 50, shape?.y || 50);
}
