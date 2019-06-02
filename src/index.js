import avator from "./longzhu.jpeg";
import './index.scss'

console.log(avator);

var img = new Image();
img.src = avator;

var root = document.getElementById("root");
root.append(img);

