$.fn.selectRange = function(start, end) {
    if(!end) end = start; 
    return this.each(function() {
        if (this.setSelectionRange) {
            this.focus();
            this.setSelectionRange(start, end);
        } else if (this.createTextRange) {
            var range = this.createTextRange();
            range.collapse(true);
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    });
};
function CARACTER(caracterList_){
	var caracterList=this.caracterList;
}

function functions(number,act){
	var nameList=["1","2","3","4","5","6","7","8","9","0","Cos","Sen","Tan","aCos","aSen","aTan","√","x^y","!","+","-","(",")", "/", "*"];
 	var caracterList=["1","2","3","4","5","6","7","8","9","0","Cos(","Sen(","Tan(","arcCos(","arcSen(","arcTan(","√(","^","!","+","-","(",")", "/", "*"];
 	if (act==1) {
 		return nameList[number];
 	}else{
		return caracterList[number];
	}
}
function addChar(char){
		var ICalculator1=document.getElementById("ICalculator");
		var content1=ICalculator1.value;
		if (content1=="0"||content1=="") {
			content1="";
		}
		//var selection = document.getElementById('ICalculator');
		var selection = document.getSelection();
		var cursorPos = selection.anchorOffset;
		//var oldContent = selection.anchorNode.nodeValue;
		var toInsert = char;
		//var newContent = oldContent.substring(0, cursorPos) + toInsert + oldContent.substring(cursorPos);
		//selection.anchorNode.nodeValue = newContent;
		selection.value =selection.value.StringAdd( char, cursorPos );
		$('#ICalculator').selectRange(2);
}
function printcal(position){
	if (position.value!="calculator"){
		position.innerHTML="calculator";
		var print="<div id='keyboard'><textarea autofocus id='ICalculator'>0</textarea><div id='numbers'>";
		var j=1;
		for (var i=1; i != 11 ; i++){
			print=print+"<input class='numberscal' id=\'calculator"+i+"\' type='button' onclick='addChar(\""+functions(i-1,2)+"\")' value=\'"+functions(i-1,1)+"\'/>";
			if(j*3==i){
				print+="</br>";
				j++;
			}
		}
	print+="<div class='numberscal' id='equal' onclick='document.getElementById(\"ICalculator\").value=Simplificar(document.getElementById(\"ICalculator\").value);'>=</div></div>";
	for (var i = 10; i != 25; i++) {
		print+="<input class='functions1' class='numberscal' id=\'calculator"+i+"\' type='button' onclick='addChar(\""+functions(i,2)+"\")' value=\'"+functions(i,1)+"\'/>";
	}
	document.getElementById('content').innerHTML=print;
	return 0;
}
}
function Home(position){
	if (position.value!="Home") {
		position.innerHTML="Home";
		document.getElementById("content").innerHTML="<p>Home</p>";
	}
	return 0;
}
function Music(position){
	if (position.value!="Music"){
		position.innerHTML="Music";
		document.getElementById("content").innerHTML="<p>Music</p>";
	}
	return 0;
}
function Documents(position){
	if (position.value!="Documents") {
		position.innerHTML="Documents";
		document.getElementById("content").innerHTML="<embed src='pdf/formulario.pdf' type='application/pdf'width='100%' height='100%'></embed>";
	}
	return 0;
}
function Console(position){
	if (position.value!="Console") {
		position.innerHTML="Console";
		document.getElementById("content").innerHTML="<p>Console</p>";
	}
	return 0;
}