document.addEventListener("DOMContentLoaded", function(){

const canvas = new fabric.Canvas('canvas');
canvas.preserveObjectStacking = true;

const upload = document.getElementById("upload");
const fillColor = document.getElementById("fillColor");
const bgColor = document.getElementById("bgColor");
const grad1 = document.getElementById("grad1");
const grad2 = document.getElementById("grad2");
const objOpacity = document.getElementById("objOpacity");
const bgOpacity = document.getElementById("bgOpacity");
const skewX = document.getElementById("skewX");
const skewY = document.getElementById("skewY");
const canvasW = document.getElementById("canvasW");
const canvasH = document.getElementById("canvasH");
const resizeModal = document.getElementById("resizeModal");
const sizeLabel = document.getElementById("sizeLabel");

const fontFamilyEl = document.getElementById("fontFamily");
const fontSizeEl = document.getElementById("fontSize");
const fontColorEl = document.getElementById("fontColor");

let history = [];
let historyIndex = -1;

function saveState(){
  history = history.slice(0, historyIndex + 1);
  history.push(JSON.stringify(canvas.toJSON()));
  historyIndex++;
}

function undo(){
  if(historyIndex > 0){
    historyIndex--;
    canvas.loadFromJSON(history[historyIndex], () => canvas.renderAll());
  }
}

function redo(){
  if(historyIndex < history.length - 1){
    historyIndex++;
    canvas.loadFromJSON(history[historyIndex], () => canvas.renderAll());
  }
}

canvas.on("object:added", () => setTimeout(saveState, 100));
canvas.on("object:modified", () => setTimeout(saveState, 100));
canvas.on("object:removed", () => setTimeout(saveState, 100));

document.addEventListener("keydown", function(e){
  if(e.ctrlKey && e.key === "z"){ e.preventDefault(); undo(); }
  if(e.ctrlKey && e.key === "y"){ e.preventDefault(); redo(); }
  if(e.key === "Delete"){
    const obj = canvas.getActiveObject();
    if(obj) canvas.remove(obj);
  }
});

fillColor.oninput = function(){
  const obj = canvas.getActiveObject();
  if(!obj || obj.type === "image") return;
  obj.set("fill", this.value);
  canvas.renderAll();
};

bgColor.oninput = function(){
  canvas.setBackgroundColor(this.value, canvas.renderAll.bind(canvas));
};

grad1.oninput = grad2.oninput = function(){
  const g = new fabric.Gradient({
    type: "linear",
    coords: {x1:0, y1:0, x2:canvas.width, y2:canvas.height},
    colorStops: [
      {offset:0, color:grad1.value},
      {offset:1, color:grad2.value}
    ]
  });
  canvas.setBackgroundColor(g, canvas.renderAll.bind(canvas));
};

window.addText = function(){
  canvas.add(new fabric.IText("Edit me",{left:100,top:100}));
};

window.addRect = function(){
  canvas.add(new fabric.Rect({left:100,top:100,width:150,height:100,fill:"blue"}));
};

window.addCircle = function(){
  canvas.add(new fabric.Circle({left:150,top:150,radius:50,fill:"green"}));
};

window.addTriangle = function(){
  canvas.add(new fabric.Triangle({left:150,top:150,width:100,height:100,fill:"orange"}));
};

upload.onchange = e=>{
  const reader = new FileReader();
  reader.onload = ev=>{
    fabric.Image.fromURL(ev.target.result, img=>{
      img.scaleToWidth(200);
      canvas.add(img);
    });
  };
  reader.readAsDataURL(e.target.files[0]);
};

window.openResize = function(){
  resizeModal.style.display="flex";
  canvasW.value = canvas.width;
  canvasH.value = canvas.height;
};

window.closeResize = function(){
  resizeModal.style.display="none";
};

window.applyResize = function(){
  canvas.setWidth(parseInt(canvasW.value));
  canvas.setHeight(parseInt(canvasH.value));
  canvas.renderAll();
  sizeLabel.innerText = canvas.width + " x " + canvas.height;
  resizeModal.style.display="none";
};

window.bringForward = function(){
  const obj = canvas.getActiveObject();
  if(obj) canvas.bringForward(obj);
};

window.sendBackward = function(){
  const obj = canvas.getActiveObject();
  if(obj) canvas.sendBackwards(obj);
};

fontFamilyEl.onchange = function(){
  const obj = canvas.getActiveObject();
  if(!obj || obj.type !== "i-text") return;
  obj.set("fontFamily", this.value);
  canvas.renderAll();
};

fontSizeEl.oninput = function(){
  const obj = canvas.getActiveObject();
  if(!obj || obj.type !== "i-text") return;
  obj.set("fontSize", parseInt(this.value));
  canvas.renderAll();
};

fontColorEl.oninput = function(){
  const obj = canvas.getActiveObject();
  if(!obj || obj.type !== "i-text") return;
  obj.set("fill", this.value);
  canvas.renderAll();
};

objOpacity.oninput = function(){
  const obj = canvas.getActiveObject();
  if(!obj) return;
  obj.set("opacity", parseFloat(this.value));
  canvas.renderAll();
};

bgOpacity.oninput = function(){
  const opacity = parseFloat(this.value);
  const color = bgColor.value;
  function hexToRgb(hex){
    hex = hex.replace("#", "");
    let r = parseInt(hex.substring(0,2),16);
    let g = parseInt(hex.substring(2,4),16);
    let b = parseInt(hex.substring(4,6),16);
    return `rgba(${r},${g},${b},${opacity})`;
  }
  const rgba = hexToRgb(color);
  canvas.setBackgroundColor(rgba, canvas.renderAll.bind(canvas));
};

fabric.Object.prototype.set({
  cornerStyle: 'circle',
  cornerColor: '#2563eb',
  borderColor: '#2563eb',
  transparentCorners: false,
  cornerSize: 10,
  padding: 5
});

skewX.oninput = function(){
  const obj = canvas.getActiveObject();
  if(!obj) return;
  obj.set("skewX", parseInt(this.value));
  canvas.renderAll();
};

skewY.oninput = function(){
  const obj = canvas.getActiveObject();
  if(!obj) return;
  obj.set("skewY", parseInt(this.value));
  canvas.renderAll();
};

window.maskInside = function(){
  const active = canvas.getActiveObject();
  if(!active || active.type !== "activeSelection"){
    alert("Select image + shape together");
    return;
  }
  let img=null,shape=null;
  active._objects.forEach(o=>{
    if(o.type==="image") img=o; else shape=o;
  });
  if(!img || !shape) return;
  img.set({originX:'center',originY:'center',left:shape.left,top:shape.top});
  shape.set({originX:'center',originY:'center'});
  const scale=Math.max(shape.getScaledWidth()/img.width,shape.getScaledHeight()/img.height);
  img.scale(scale);
  const clip=shape.clone();
  clip.set({originX:'center',originY:'center'});
  img.clipPath=clip;
  canvas.remove(shape);
  canvas.discardActiveObject();
  canvas.add(img);
  canvas.setActiveObject(img);
  canvas.renderAll();
};

const params = new URLSearchParams(window.location.search);
const width = parseInt(params.get("w")) || 900;
const height = parseInt(params.get("h")) || 500;
canvas.setWidth(width);
canvas.setHeight(height);

});

const params = new URLSearchParams(window.location.search);

const width = parseInt(params.get("w")) || 900;
const height = parseInt(params.get("h")) || 500;
const template = params.get("template");

canvas.setWidth(width);
canvas.setHeight(height);

// 👉 THIS WAS MISSING
if(template){
  loadTemplate(template);
}