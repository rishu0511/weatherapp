import React from "react";
import { useRef, useEffect, useState } from "react";
export default function Canvasc(props) {
  const canvasRef = useRef(null);
  const [Width, setwidth] = useState(0);
  const [Height, setHeight] = useState(0);
  const [count, setCount] = useState(0);
  const [changedir,setchange] = useState(1);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    function animecloud(){
      context.clearRect(0, 0, 1450, 600);
      const date = new Date();
      const milisec = date.getMilliseconds();
      const width = window.innerWidth;
      const height = window.innerHeight;
      setwidth(width);
      setHeight(height);
      const grad = context.createRadialGradient(200, 150, 30, 200, 150, 300);
      grad.addColorStop(0, "lightblue");
      grad.addColorStop(1, "darkblue");
      // Fill rectangle with gradient
      context.fillStyle = grad;
      context.fillRect(1, 1, width - 20, 600);
      if (canvasRef == null) return;

      context.font = "20px Arial";
      context.fillStyle = "skyblue";
      context.fillText(props.PLACE,Width-200,80);
      context.fillText(props.TEMP+" °C",Width-200,500);
      context.fillText(props.DESCRIPT,50,500);
      const now = new Date();
      const sec = now.getSeconds()
      const len=0;
      const len1 = 0;
      var r = sec % 2 == 0 ? len : len +1;
      var r1 = sec % 2 != 0 ? len1 : len1 +1;
      if(r===1||r1===1){
        setCount(count+changedir)
      }
      if(count>=500){
        setchange(-1)
      }else if(count<=0){
        setchange(1)
      }
      drawStarr(width - 1200 +count, 150, 20, 85, 3, "lightblue", context);
      drawStarr(width - 1100+count/10, 180-count/9, 40, 90, 3, "lightblue", context);
      drawStarr(width - 910-count/7, 230, 20, 95, 3, "lightblue", context);
      drawStarr(width - 800 + count / 6,200,35,65,3,"lightblue",context);
      drawStarr(width - 700,180 + count/ 3,50,50,3,"lightblue",context);
      drawStarr(width - 660, 400-count / 2, 35, 55, 4, "lightblue", context);
      drawStarr(width - 800,400 - count / 2,50,70,3,"lightblue",context);
      window.requestAnimationFrame(animecloud);
      } 
      window.requestAnimationFrame(animecloud);
  });
  function drawStarr(x, y, radius, radius_c, sides, fillColor, ctx) {
    var points = sides;
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x, y + radius);
    for (let i = 0; i <= points + 1; i++) {
      var a = (Math.PI * i * 2) / points;
      ctx.arc(
        x + radius * Math.sin(a),
        y + radius * Math.cos(a),
        radius_c,
        0,
        2 * Math.PI
      );
    }
    ctx.closePath();
    if (fillColor) ctx.fill();
  }
  return <canvas class = "cloud"ref={canvasRef} width={Width} height={600} />;
}