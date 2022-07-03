function Error(Number1, reason, howFixIt, ErrorName) {
	document.getElementById("SystemError").hidden = "false";
	var stylechange=document.getElementById("StyleControl");
	stylechange.innerHTML = stylechange.innerHTML + "";
	document.getElementById("SystemError").innerHTML = "<div><p>"+ErrorName+"</p><p id=\'ErrorNumber\'>Error:"+Number1+"</p><p>Reason:</p>"+reason+"<p>How Fix It:"+howFixIt+"</p></div>";
	throw new Error(ErrorName+"\nError:"+Number1+"\nReason:"+reason+"program will be stoped");
}
function SystemErrorClose(){
	document.getElementById("SystemError").innerHTML="";
	document.getElementById("SystemError").hidden="hidden";
}
function system_failure(){
	alert( "This program exeded the limit of errors acepted, this can be dengerous for the system and will be reported, system out!!!" );
	self.close();
}
function SystemJs( dir, o ){
	if (o==1) {
		document.getElementById().innerHTML=document.getElementById.innerHTML + dir;
	}
	if( 0==2 ){

	}
}
function SystemCss( dir, o ){

}