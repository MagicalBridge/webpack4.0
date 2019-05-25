import avator from "./longzhu.jpeg";

console.log(avator);

var img = new Image();
img.src = avator;

var root = document.getElementById("root");
root.append(img);
