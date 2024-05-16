export default function drawCircle(
  ctx: any,
  { content, shape }: { content: any; shape: any }
) {
  const x = shape?.x || 100;
  const y = shape?.y || 100;
  const radius = 50;
  const background = shape?.background || "black";
  const border_width = shape?.border_width || 0;
  const border_color = shape?.border || "transparent";

  ctx.beginPath();
  ctx.arc(x, y, 50, 0, 2 * Math.PI);
  ctx.fillStyle = background;
  ctx.fill();
  ctx.strokeStyle = border_color;
  ctx.lineWidth = border_width;
  ctx.stroke();
  ctx.closePath();

  var fontSize = 16;
  var textColor = "red";
  ctx.font = fontSize + "px Arial";
  ctx.fillStyle = textColor;
  ctx.fillText(content?.title || "", shape?.x - 20 || 50, shape?.y || 50);
}
