var varArray = {
	variables1: 	[ "x", "y", "z", "b","d","e","f","g","i","j","g","l","n"]
},
	constantes = {
		Objects: 	["e","π", "pi"],
		value: 		[ Math.E, Math.PI, Math.PI ]
}, formulas  = {
		FGC_1: "x=(-b+√(b^2-4ac))/(2a)",
		FGC_3: "x=(-b-√(b^2-4ac))/(2a)",
		LDC: "l=∫√(1+(y')^2)dx" 
};
function formulas( o){
	switch(o){
		case 0:
		break;
		case 1:
		break;
		case 2:
		break;
		case 3:
		break;
		case 4:
		break;
		default:
	}
}
function Central( string ){
	for( ; string.GetPosition(" ")!=-1; ){
		string = string.replace("", " ");
	}
	var result;
	console.log( string );
	while(1){
		if(IsSimp(string)!=1){
			string = Simplificar(string);
		} else {
			if( string.GetPosition("") ){
				string = Integral(string);
			} else if(string.GetPosition("")){
				string = Diferencial(string);
			} else if(string.GetPosition("")){
				string = Limites(string);
			} else if(string.GetPosition("")){
				string = Sumatoria( string );
			} else if(string.GetPosition("")){
				string = Ecuaciones( string );
			} else {
				return string;
			}
		}
	}
}
function Simplificar( string ){
	var vari = BuscarVariables(string);
	if(vari == -1){
		var toFunction = Function("return "+string);
		return toFunction();
	} else {
		var exp = GetExpresions(string);// Obtiene las sumas separadas
		string = Multiplicar(string);
		string = Sumar(string);
	} // fin de else
	return string;
}
function Diferencial(dif, respect){
	var exp;
	var existe;
	var esNumero;
	var exponente, pos, derivado, numero;
	dif = GetExpresions(dif);
	for (var i=0;i<dif.length;i++) {
		existe =0;
		numero = Number(GetNumbersNotExp(dif[i]));
		dif[i] = ReplaceNotExp(dif[i]);
		if ( (pos=dif[i].GetPosition("&"))!=-1 )
				dif[i] =dif[i].splice1(pos, pos);
		exp = ObtenerFactores(dif[i]);
		if (!isNaN(Number(dif[i]))) {
			dif = Eliminar(dif, i , i);
			if (i<dif.length) {
				numero = GetNumbersNotExp(dif[i]);
				dif[i] = ReplaceNotExp(dif[i]);
				if ( (pos=dif[i].GetPosition("&"))!=-1 )
					dif[i] =dif[i].splice1(pos, pos);
				exp = ObtenerFactores(dif[i]);
			}
		}
		if (numero===0)
			numero=1;
		for (var x = 0;x<exp.length;x++) {
			esNumero = 0;
			if ( exp[x][0]==respect ) {
				exponente =Number(GetNexNumber(exp[x], 0));
				if (exponente==0)
					exponente = 1;

				if (exponente!=0&&exponente!=1){

					derivado =exp[x][0];
					if (exponente-1!=1){
						derivado +="^"+(exponente-1);
					} 
					exp[x] = derivado;

				} else if (exponente==1){
					exp[x] = "";
					esNumero = 1;
				} else {
					exp[x] = "";
				}
				x=exp.length;
			}
		}
        if (exp!=""&&!esNumero){
            exp = exponente*numero+exp;
            dif[i] = exp;
        } else if(esNumero){
        	exp = numero+exp;
        	dif[i] = exp;
        } else {
        	dif = Eliminar(dif, i, i);
        }
	}
	return Unir(dif);
}
function GetNextNumberSig(string, from){
	var almacen = "";
	var salir = 1;
	var numero = 0;
	for ( var i = from; salir&&i<string.length ;i++ ) {
		if (IsNumber(string[i])||string[i]=='-'||string[i]=='+') {
			numero = 1;
			almacen+=string[i];
		} else {
			if ( numero ) {
				salir = 0;
			}
		}
	}
	return almacen;
}
function Integral(dif,respect){
	var exp, existe, integrado, negativo;
	dif = GetExpresions(dif);
	var salir;
	for (var x=0;x<dif.length;x++){
		exp=ObtenerFactores(dif[x]);
		existe=0;
		len=exp.length
		negativo=0;
		for(var i=0;i<len;i++) {
			if(exp[i][0]==respect){
				existe=1;
				console.log(exp[i]);
				console.log(exponente = GetNextNumberSig(exp[i], 0));
				console.log("==");
				if (exponente==="")exponente="1";
				if (exponente!="-1"&&exponente!=""&&!negativo){
					console.log("es positivo: "+exponente);
					exp[i]=respect+"^"+(Number(exponente)+1)+"/"+(Number(exponente)+1);
				}else if(exponente=="-1"){
					console.log("es negativo: -1");
					exp[i] = "ln(|"+respect+"|)";
				}
				i = exp[i].length;
			}

		}
		if (!existe){
			dif[x] = dif[x]+respect;
		}
		dif[x] = exp.join("");

	}
	return dif;
}
function Multiplicar(string){
	var exp = GetExpresions(string);
	var exp_2;
	var result;
	var IN;
	var using;
	var a, b;
	var division = 0;
	var numbers;
	var buscar = 0;
	var count=0;
	var negativo=0;
	var numero;
	var salir;
	var pos;
	for ( var x = 0; x < exp.length; x++ ) {
		using = 1;
		count = 0;
		negativo = 0;
		numbers = GetNumbersNotExp(exp[x]);
		exp[x] = ReplaceNotExp(exp[x]);
		if ((exp[x][0]=="-")){
			negativo = 1;
			exp[x] = exp[x].Remove( "-");
		}
		for (var t = 0;using!=0;t++){
			exp_2 = ObtenerFactores(exp[x]);
			IN = exp_2[0][0];
			using = 0;
			division = 0;
			numero = 1;
			salir = 1;
			IN = exp_2[0][0];
			for ( var w = 1;( w < exp_2.length)&&salir;w++ ){
				if (exp_2[w][0]=="&"&&IN=="&") {
					a = w;
					for (;(w < exp_2.length)&&salir;w++) {
						if (exp_2[w][0] == "&") {
							salir = 0;
							b = w;
						}
					}
					using = 1;
					if (salir) {
						exp_2.push("&");
						exp_2.shift();
						exp[x] = exp_2.join("");
						count++; 
					} else {
						result = Number( numbers[0] )* Number( numbers[1] );
						exp_2 = Eliminar(exp_2 , b, b);
						count=0;
						numbers[0] = result;
						numbers = splice2( numbers, 1, 1);
						exp[x] = exp_2.join("");
					}
				} else if (exp_2[w][0]==IN) {
					using = w;
					w = exp_2.length;
				} else if ( exp_2[w][0] =="/" ) {
					division = 1;
				}
			}
			if (using&&salir) {
				if (exp_2[0].GetPosition("^")==-1){
					a = 1;
				} else {
					a = Number(GetNexNumber(exp_2[0], 0) );
				}
				if (exp_2[using].GetPosition("^")==-1) {
					b = 1;
				} else {
					b = Number(GetNexNumber(exp_2[using], 0));
					if (division)
						b*=-1;
				}
				result = IN+ "^" + (a+b);
				exp_2[0] = result;
				exp_2 = splice2(exp_2, using, using);
				exp[x] = exp_2.join("");
				count=0;
			} else if(salir){
				exp_2.push(exp_2[0]);
				exp_2.shift();
				if (count++<exp_2.length){
					using = 1;
				}
				exp[x]=exp_2.join("");
			}
		}
		if ((pos = exp[x].GetPosition("&"))!=-1) {
			exp[x] = exp[x].splice1(pos, pos);
			exp[x] = numbers[0]+ exp[x];
		}
		if(negativo)
			exp[x] = "-" + exp[x];
	}
	return Unir(exp);
}
function Distribuir(resultado, factores){
	var  i = 0;
	var lista;
	var exp = GetExpresions(resultado);
	for ( ; i < exp.length;i++ ){
		for (var g = 0; g < factores.length; g++ ) {
			lista[i] += factores[g];
		}
	}
	return Unir(lista);
}
function Unir (arg) { // Une sumas
	var resultado = "";
	for ( var i in arg ){
		if ( arg[i][0]=="-" ) {
			resultado += arg[i];
		} else if ( i!=0 ) {
			resultado += "+"+ arg[i];
		} else {
			resultado += arg[i];
		}
	}
	return resultado;
}
function ObtenerFactores(string){ // Obtiene los factores
	var a = "",
		exp = [""], 
		l = 0;
	for ( var i = 0;i<string.length;i++ ) {
		if ( IsNumber(string[i])&&string[i-1]!=="^" ) {
			exp[l] = "";
			for ( ;IsNumber(string[i]);i++ ) {
				exp[l] += string[i];
			}
			l++;
			i--;
		} else if( string[i]=="*" ){
		}else if( string[i]=='(' ){
			var con = true,
				j = 1;
			exp[l] = string[i++];
			for ( ;con;i++ ) {
				if ( j == 0 ) {
					con = false;
				} else if (string[i]=="("){
					j++;
					exp[l] += string[i];
				} else if (string[i]==")"){
					j--;
					exp[l] += string[i];
				} else {
					exp[l] += string[i];
				}
			}
			l++;
		} else if ( string[i+1]!="^") {
			exp[l++] = string[ i ];
		} else if (!(IsNumber(string[i]))) {
			
			exp[ l ] = string[i++];
			exp[ l ] += string[i++];
			for (;IsNumber( string[i] )||string[i]=="-"||string[i]=="+";i++) {
				exp[l] += string[i];
			}
			l++;
			i--;
		}
	}
	return exp;
}
function GetNexNumber(string, from){
	var almacen = "";
	var salir = 1;
	var numero = 0;
	for ( var i = from; salir&&i<string.length ;i++ ) {
		if (IsNumber(string[i])) {
			numero = 1;
			almacen+=string[i];
		} else {
			if ( numero ) {
				salir = 0;
			}
		}
	}
	return Number(almacen);
}
function organizar( string ){
	var variables = BuscarVariables(string);
	alert(variables);
	string = ObtenerFactores( string );
	var a = '';
	for( var i = 0;i<variables.length;i++ ){
		for(var j = 0;j<string.length;j++){
			if(string[j].GetPosition( variables[i] )!==-1){
				a += string[j];
				string.splice( j, j );
			}
		}
	}
	return a;
}
function Sumar(string){
	var numeros=[];
	var expresiones = [];
	var resultado;
	var pos;
	var result;
	string = GetExpresions(string);
	var k = 0;
	for (var i in string){
		result = Number(GetNumbersNotExp(string[i]));
		if (result==0)
			result = 1;
		string[i] = organizar(string[i]);
		string[i] = ReplaceNotExp(string[i]);
		if ((pos=string[i].GetPosition("&"))!=-1){
			string[i] = string[i].splice1(pos,pos); 
		} else {
			
		}
		if ((pos = expresiones.indexOf(string[i]))!=-1){
			numeros[pos]+=result;
		} else {
			expresiones[k] = string[i];
			numeros[k++] = result;
		}
	}
	string = [];
	for (var i in numeros){
		if (numeros[i]!=1) {
			string[i] = numeros[i];
		} else {
			string[i] = "";
		}
		string[i] +=expresiones[i];
	}
	return Unir(string);
}
function ReplaceNotExp( string ){
	var i= 0, 
	almacen = "";
	for ( ;i<string.length;i++ ) {

		if ( IsNumber( string[i] ) ) {

			if (string[i-1]=="^"){

				for ( ;IsNumber(string[i]);i++) {
					almacen +=string[i];
				}
			} else {

				for (;IsNumber( string[i]);i++ ){
				}

				almacen += "&";
			}
			i--;
		} else {
			almacen+=string[i];
		}
	}
	return almacen;
}
function IsNumber( arg ){
	return !(isNaN(parseInt( arg )))||arg ===".";
}
function RealizeO( string ){	
}
function Mult(){
	var result = 0, 
		num = [""], 
		k =0, 
		m = 1,
		vari = BuscarVariables(arguments[0]);
	if ( vari>1 )
		return 0;
	var item;
	for ( var i in arguments ){
		for ( var j in arguments[i] ){
			if ( IsNumber(arguments[i][j]) ){
				num[k]+=arguments[i][j];
			} else if (arguments[i][j]=="-"&&num[k].length==0) {
				num[k]+="-";
			} else if ( arguments[i][j]=="-"&&num[k].length!=0) {
				break;
			} else if ( arguments[i][j]=="+"&&num[k].length!=0 ){
				break;
			}
		}
		if ( num[k]==undefined ) {
			num[k]=1;
		}
		num[k]=Number(num[k]);
		k++;
		num[k]="";
	}
	for (var l = 0;k!=l;l++) {
		result+=num[l];
	}
	for ( var i in arguments ) {
		if(arguments[i][0]=="-") {
			m*=-1;
		}
	}
	return vari+"^"+result*m;
}
function GetNumbersNotExp( string  ){ // no exponentes
	var numbers = [""], 
		count = 0, 
		j = true;
	for( var i=0, item;item=string[i++];){
		if( string[i-1]!="^" ){
			if( !(isNaN(parseInt(item,10)))||item==="."){
				numbers[count]+=item;
			} else if( !(isNaN(parseInt(string[i],10)))||string[i]==="."){
				count++;
				numbers[count] = "";
			}			
		} else {
			for( ; j ; ){
				if(isNaN(parseInt( string[i], 10 ))&&string[i]!="." ){
					j = false;
				}
				i++;
			}
			i--;
			j = true;
		}
	}
	if ( numbers[0]==="" ) {
		numbers.splice(0,1);
	}
	if ( numbers[0] === undefined ) {
		return 1;
	}
	return numbers;
}
function GetNumbers(string){
	var numbers = [""], 
		count = 0, 
		isFirst = false;
	for( var i=0, item;item=string[i++];){
		if( !(isNaN(parseInt(item,10)))||item=="."){
			numbers[count]+=item;
		} else if( !(isNaN(parseInt(string[i],10)))||string[i]=="."){
			count++;
			numbers[count]="";
		}
	}
	if ( numbers[0]==="" ) {
		numbers.splice(0,1);
	}
	return numbers;
}
function IsSimp(string, numbers){
	var variables = BuscarVariables(string), expresiones = new Array, count = 0, count2 = 0;
}
function GetExpresions_proto(string){
	var i = 0, l = 0, p = 0;;
	var expresiones = [];
	for (var i = 0; i < string.length; i++){
		if ((string[i]=="-"||string[i]=="+")&&string[i-1]!="^"){
			if (l>0){
				l++;
			} else {
				if (expresiones[0]!=undefined){
					l++;
				} else {
					expresiones[0] = "";
				}
			}
			if ( string[i] == "-" ){
				expresiones[l] = string[i];
			} else {
				expresiones[l] = "";
			}
		} else if (string[i]=="(") {
			console.log(string[i])
				for (;p>0;i++){
					console.log(p)
					if ( string[i] =="(" ){
						p++;
					} else if ( string[i] == ")" ){
						p--;
					}
					console.log()
					expresiones[l] += string[i];
				}
				i++;
			console.log(expresiones[l])
		} else {
			//console.log(string[i])
			if (expresiones[l]==undefined){
				expresiones[l] = "";
			}
			expresiones[l] += string[i];
		}
	}
	return expresiones;
}
function GetExpresions(string){
	var i = 0, 
		count = 0, 
		expresiones = [""];
	for(;i<string.length;i++){
		if(string[i]!="-"&&string[i]!="+"&&string[i]!="("){
			expresiones[count]+=string[i];
		} else if(string[i]=="-"&&string[i-1]!="^"){
			if(string[i-1]=="/"||string[i-1]=="*"||string[i-1]===undefined){
				expresiones[count]+=string[i];
			} else {
				count++;
				expresiones[count]="";
				expresiones[count]+=string[i];
			}
		} else if(string[i]=="+"&&string[i-1]!="^"){
			if(string[i-1]=="/"||string[i-1]=="*"||string[i-1]===undefined){
				expresiones[count]+=string[i];
			} else {
				count++;
				expresiones[count]="";
			}
		} else if ( string[i]=="(" ){
			var equ = 1,
				con = true;
			expresiones[count] += string[i++];
			for ( ; con ;i++ ) {
				if ( equ==0 ){
					con = false;
				} else if( string[i]==")" ){
					expresiones[count] += string[i];
					equ--;
				} else if( string[i]=="(" ) {
					expresiones[count] += string[i];
					equ++;
				} else {
					expresiones[count]+=string[i];
				}
			}

		} else if(string[i]=="-"||string[i]=="+") {
			expresiones[count] = string[i-2]+ string[i-1]+ string[i];
			i++;
			for ( ; IsNumber(string[i]);i++ ) {
				expresiones+=string[i];
			}
			i++;
			count++;
		}
	}
	return expresiones;
}
function Constantes( position, option ){
	var a = [ "e","π" ];
	switch(option){
		case 1:
		return a[ position ];
		break;
		case 2:
		return a.length;
		break;
	}
}
function BuscarVariables(string){
	var i = 0, 
		variables = [1], 
		count = 0;
	for( ; i<varArray.variables1.length;i++ ){
		if(string.GetPosition(varArray.variables1[i])!= -1){
			variables[count] = varArray.variables1[i];
			count++;
		}
	}
	if( variables[0]!=1 ){
		return variables;
	} else{
		return -1;
	}
}
/*function IsPrime( n ){
	( typeof n !== "Number" ? return -1 );
	for( var i = 0;i<n;i++ ){
		for(var j = 0;j<i;j++){
			if( i< ){

			}
		}
	}
	return 
}*/
function BuscarConstantes( ){
	var i = 0, 
		j = Constantes( "", 1 );
	for( ; i<j;i++ ){
		if(string.GetPosition(Constantes( i, 2 ))!= -1){
			return 0;
		}
	}
	return -1;
}
function Sumatoria( Sum, a, b  ){
	if( BuscarVariables( a )!= -1||BuscarVariables( a )!=-1||b>a ){
		throw new Error("Sumatoria no valida.");
		return 0;
	}
	var i, result=Sum;
	for(var i = b; i<a;i++){
		result += "+"+Analizar( Sum, "i", i  );
 	}
 	return Simplificar(result);
}
function Eliminar(list, a, b) {
	var arreglo = [];
	var t = 0;
	var len = list.length;
	for (var i = 0; i < len ; i++) {
		if (i<a||i>b){
			arreglo[t++] = list[i];
		}
	}
	return arreglo;
};
function Analizar( exp, vari, a ){
	return Simplificar(exp.replace( vari, a ));
}
// compara this con string y devuelve un porcentaje que representa el nivel de parentesco
String.prototype.Compare = function( string ) {
	var a = 0,
		len_1 = this.length,
		len_2 = string.length,
		len =(len_1>len_2)?len_1:len_2;
	for(var i = 0, item; item= this[i++]; ){
		if( item==string[i - 1] )a++;
	}
	return ( 100 / len )*a;
};
// elimina elem de this desde from
String.prototype.Remove = function( elem, from ) {
	var Eidx = this.GetPosition( elem, from || 0 ),
		Slen = elem.length, string = this;
	if ( Eidx != -1) {
		var i = Eidx + Slen -1;
			string = string.splice1( Eidx, i );
		return string;
	}
	return string;
};
// elimina todos los elem de this desde from
String.prototype.RemoveAll = function( elem, from ) {
	var string = this;
	while( this.GetPosition( elem, from || 0 )!= -1 ){
		string = string.Remove( elem, from);
	}
	return string;
};
// remueve una parte del string desde a hasta b
String.prototype.splice1 = function( a, b ) {
	var string_1="";
	for(var i=0,item;item=this[i++];){
		if ( i-1 < a || i-1 > b ) {
			string_1 += item;
		}
	}
	return string_1;
};
function splice2(lista, a, b){
	var lista_2 = [];
	var h = 0;
	for (var i = 0; i<lista.length;i++) {
		if ( i<a || i>b ) {
			lista_2[h++] = lista[i];
		}
	}
	return lista_2;
}
String.prototype.replace2 = function(string, a, b) {
	for(var i = 0, item, a = "";item = this[i++];){
		if( i - 1<a||i - 1 >b ){
			a+=item;
		} else {
			a+=string;
			i=b+1;
		}
	}
	return a;
};
// Contrario a splice, devuelve el string que se encuentra entre ay b
String.prototype.GetString = function( a, b ) {
	var string_1=new String;
	for(var i=0,item;item=this[i++];){
		if( i - 1 < a || i - 1> b ){
		} else {
			string_1 += item;
		}
	}
	return string_1;
};
// reemplaza string con string_2 desde from
String.prototype.replace = function(string_2, string_3, from) {
	var pos = this.GetPosition( string_2 ),
		string = this.replace2(string_3, pos, pos + string_2.length - 1);
	return string;
}
// lo mismo que replace solo que elimina todos
String.prototype.replaceAll = function( string, string_2) {
	var G = this
	while(GetPosition(this,string)){
		G=replace(this, string, string_2);
	}
	return G;
};
// Agrega un string en un lugar especifico
String.prototype.StringAdd = function( string_1, a ) {
	var string="";
	for(var i=0,item;item=this[i++];){
		if ( i - 1 == a ) {
			string += string_1 + item ;
		} else {
			string += item;
		}
	}
	return string;
};
// Obtiene la posicion de elem en this desde a hasta b
String.prototype.GetPositionFrom = function( elem, a, b) {
	var j = 0;
	if( a == undefined ){
		a =0;
	}
	for( var i = a ; i < b ; i++ ){
		if( this[i] == elem[j] ) {
			j++;

			if( j == elem.length ){
				return i - elem.length + 1;
			}
		} else {
			j = 0;
		}
	}
	return -1;
};
//  obtiene la posicion de elem desde from
String.prototype.GetPosition = function(elem) {
	var j = 0, 
	len = elem.length;
	for(var i = 0,item;item = this[i++];){
		if( item == elem[j] ){
			j++;
			if( j==len){
				return i - len;
			}
		} else {
			j=0;
		}
	}
	return -1;
};
// Dificil de explicar xD
String.prototype.GetNumberOfList = function(elem, num) {
	var i = 0, 
		j = 0, 
		k = 0, 
		m = 0;
	for( ; i < this.length ; i++ ){
		if( this[i] == elem[k] ){
			k++;
		} else {
			k = 0;
			j = i + 1;
		}
		if( elem.length  == k ){
			k = 0;
			m++;
		} 
		if( m == num ){
			if( j==0 ){
				return -1;
			}
			return j;
		}
	}
};
// Devuelve el numero de elem que se encuentran en this y si no los encuetra devuelve -1
String.prototype.NumberOfList = function(elem) {
	var len = elem.length - 1;
	for( var i = 0,item, j = 0, count = 0;item = this[i++]; ){
		if(item==elem[j]){
			if(j==len){
				count++;
			}
			j++;
		} else {
			j = 0;
		}
	}
	return count;
};
String.prototype.dif = function(elem, where) {
	var i=0, 
		j=0,
		k=0,
		m=0,
		pos = where+elem.length, 
		len = this.length, 
		elem_len = elem.length-1;
		for(;i<len;i++){
			if(elem[j]==this[i]){
				if(j==elem_len){
					j=0;
					k++;
					if(i==where){
						j=0;
						for(;i<len;i++){
							if(this[i]==elem[j]){
								if( j == elem_len){
									return k - 1;
								}
								j++;
							} else {
								return -1;
							}
							if( pos<1 ){
								return -1;
							}
						}
					}
				}
				j++;
			} else {
				j = 0;
			}
			if( pos<1 ){
				return -1;
			}
		}
		return -1;
};
String.prototype.replace = function(string_2, string_3, from) {
	var S1idx = this.GetPosition( string_2, from),
		string = "",
		i = 0,
		len_1 = this.length,
		len_2 = string_2.length,
		len_3 = string_3.length;
	for(  ; i < len_1 ; i++ ){
		if( i < S1idx || i > S1idx ){
			string += this[i];
		} else {
			string += string_3;
			i = S1idx + len_2 - 1;
		}
	}
	return string;
};