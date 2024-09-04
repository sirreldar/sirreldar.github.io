

var disk = [
	{
		angles:[0, 11, 22, 33, 44, 55, 66, 77, 88, 99, 110, 121, 132, 143, 154, 165, 176, 187, 198, 209, 220, 231, 242, 253, 264, 275, 286, 297, 308, 319, 330, 341],
		values: ["M","K","C","I","G","M","K","C","I","G","M","K","C","I","G","M","K","C","I","G","M","K","C","I","G","M","K","C","I","G","M","K"],
		position: 0,
		wraps: 0
	},
	{
		angles:[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 163, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 344],
		values: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		position: 0,
		wraps: 0
	},
	{
		angles:[0, 16, 36, 54, 72, 90, 108, 126, 144, 162, 178, 195, 216, 234, 252, 270, 288, 310, 326, 342],
		values: [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
		position: 0,
		wraps: 0
	},
	{
		angles:[0, 22, 44, 66, 88, 110, 132, 152, 178, 194, 220, 242, 269, 286, 304, 322, 342],
		values: [0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1],
		position: 0,
		wraps: 0
	},
	{
		angles:[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 163, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 344],
		values: ["M","K","C","I","G","A","M","K","C","I","G","A","M","K","C","I","G","A","M","K","C","I","G","A"],
		position: 0,
		wraps: 0
	}
]

//initialize values
document.documentElement.style.setProperty('--d0r', '0');
document.documentElement.style.setProperty('--d1r', '0');
document.documentElement.style.setProperty('--d2r', '0');
document.documentElement.style.setProperty('--d3r', '0');
document.documentElement.style.setProperty('--d4r', '0');

//add rotation button listeners
//up buttons
document.getElementById("d0u").addEventListener("click", function() {rotateDisk(0,-1)}, false);
document.getElementById("d1u").addEventListener("click", function() {rotateDisk(1,-1)}, false);
document.getElementById("d2u").addEventListener("click", function() {rotateDisk(2,-1)}, false);
document.getElementById("d3u").addEventListener("click", function() {rotateDisk(3,-1)}, false);
document.getElementById("d4u").addEventListener("click", function() {rotateDisk(4,-1)}, false);

//down buttons
document.getElementById("d0d").addEventListener("click", function() {rotateDisk(0,1)}, false);
document.getElementById("d1d").addEventListener("click", function() {rotateDisk(1,1)}, false);
document.getElementById("d2d").addEventListener("click", function() {rotateDisk(2,1)}, false);
document.getElementById("d3d").addEventListener("click", function() {rotateDisk(3,1)}, false);
document.getElementById("d4d").addEventListener("click", function() {rotateDisk(4,1)}, false);





function setDisk(d, position){
	disk[d].position = position;
	let angle = disk[d].angles[position];
	angle = disk[d].wraps*360 + angle;
	
	document.documentElement.style.setProperty('--d'+d+'r', angle + 'deg');
	recalculateOutput();
}

function rotateDisk(d, amount) {
	//check for and apply arrow invert setting
	if (document.getElementById("invertArrows").checked){amount *= -1}
	
	disk[d].position += amount;
	
	if (disk[d].position < 0) {
		disk[d].position = disk[d].angles.length-1;
		disk[d].wraps -=1;
	}
	
	if (disk[d].position > disk[d].angles.length-1) {
		disk[d].position = 0;
		disk[d].wraps +=1;
	}
	
	setDisk(d, disk[d].position);
}

function recalculateOutput(){
	let str = "";
	if (document.getElementById("d4include").checked){str += disk[4].values[disk[4].position]};
	if (document.getElementById("d3include").checked){str += disk[3].values[disk[3].position]};
	if (document.getElementById("d2include").checked){str += disk[2].values[disk[2].position]};
	if (document.getElementById("d1include").checked){str += disk[1].values[disk[1].position]};
	if (document.getElementById("d0include").checked){str += disk[0].values[disk[0].position]};
	
	//read as eyes
	if(document.getElementById("readAsEyes").checked){
		str = str.replaceAll("1","*")
		str = str.replaceAll("0","1")
		str = str.replaceAll("*","0")
	}
	
	//read from edge
	if(document.getElementById("readFromEdge").checked){
		str = str.split("").reverse().join("");
	}
	
	document.getElementById("currentDisplayText").innerHTML = str;
}


function addOutput(){
	let currentDisplay = document.getElementById("currentDisplayText").innerHTML;
	let currentOutput = document.getElementById("scrollableOutput").innerHTML;
	let outputSeparator = document.getElementById("outputSeparator").value;
	
	
	if(currentOutput){
		if (outputSeparator =="\\n"){outputSeparator = "<br>"}
		currentOutput = currentOutput + outputSeparator + currentDisplay;
	} else {
		currentOutput = currentDisplay;
	}
	
	document.getElementById("scrollableOutput").innerHTML = currentOutput;
}


function clearOutput(){
	document.getElementById("scrollableOutput").innerHTML = "";
}


function copyOutput(){
	navigator.clipboard.writeText(document.getElementById("scrollableOutput").innerHTML);
}


function load(){
	disk[0].wraps = parseInt(getCookie("wraps0"));
	disk[1].wraps = parseInt(getCookie("wraps1"));
	disk[2].wraps = parseInt(getCookie("wraps2"));
	disk[3].wraps = parseInt(getCookie("wraps3"));
	disk[4].wraps = parseInt(getCookie("wraps4"));
	setDisk(0,parseInt(getCookie("pos0")));
	setDisk(1,parseInt(getCookie("pos1")));
	setDisk(2,parseInt(getCookie("pos2")));
	setDisk(3,parseInt(getCookie("pos3")));
	setDisk(4,parseInt(getCookie("pos4")));
}

function resetAll(){
	if(confirm("This will reset the circle and delete your saved state. Are you sure?")){
		document.cookie = "pos0=0";
		document.cookie = "pos1=0";
		document.cookie = "pos2=0";
		document.cookie = "pos3=0";
		document.cookie = "pos4=0";
		document.cookie = "wraps0=0";
		document.cookie = "wraps1=0";
		document.cookie = "wraps2=0";
		document.cookie = "wraps3=0";
		document.cookie = "wraps4=0";
	load();
	}
}

function save(){
	document.cookie = "pos0=" + disk[0].position + "";
	document.cookie = "pos1=" + disk[1].position + "";
	document.cookie = "pos2=" + disk[2].position + "";
	document.cookie = "pos3=" + disk[3].position + "";
	document.cookie = "pos4=" + disk[4].position + "";
	document.cookie = "wraps0=" + disk[0].wraps + "";
	document.cookie = "wraps1=" + disk[1].wraps + "";
	document.cookie = "wraps2=" + disk[2].wraps + "";
	document.cookie = "wraps3=" + disk[3].wraps + "";
	document.cookie = "wraps4=" + disk[4].wraps + "";
}


function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}