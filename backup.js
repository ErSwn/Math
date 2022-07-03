var varArray = {}, constantes = {};
varArray.variables1 = ["a","b","c","d","e","f","g","h","i","j","g","l","m","n","o","p","q","r","s", "t", "w", "z", "x", "y"];
constantes.Objects = ["e","π", "pi"];
constantes.value = [ Math.E, Math.PI, Math.PI ];

function Central( string ){
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
function Uno(arg){
	for(var i = 1, result = 0; i<arg;i++){
		result+=1/Math.pow(2, i);
	}
	return 
}
function Simplificar( string ){
	var vari = BuscarVariables(string);
	if(vari == -1){
		return toFunction(string);
	} else {
		string = string.RemoveAll( " " );
	var numbers = GetNumbers( string ),
		i = 0,
		min = 0,
		max = 0,
		replace1 = "&",
		len, 
		cadena = "",
	 	result, 
	 	vari = BuscarVariables( string ),
	 	pos,
	 	cadena,
	 	a_position,
	 	b_position,
	 	a,
	 	b,
	 	a_pos,
	 	b_pos,
	 	count=0;
	len = numbers.length;
			for( ; i < len ; i++ ){
		string = string.replace( String(numbers[ i ]), replace1 );
	}
	i = 0;
	for( ; i < len ; i++ ){
		numbers[ i ] = Number( numbers[ i ] ); 
	}
	for( i = 10; i < 25 ; i++ ){
		if( i==24 ){
			div.value = numbers[0];
			return 0;
		}
		if( string.GetPosition( functions(i, 2) !=-1) ){
			i = 34; 
		}
	}
	if(string.NumberOfList("(")==0&&string.NumberOfList(")")==0){
			min = 0;
			max = string.length-1;
			} else {
				while( string.NumberOfList( "(" ) != string.NumberOfList( ")" ) ){
					if (string.NumberOfList( "(" ) < string.NumberOfList( ")" )) {
						string = StringAdd( string, "(" );
					} else {
						string += ")";
					}
				}
			min = string.GetNumberOfList( "(", string.NumberOfList( "(" ) );
			max = string.GetNumberOfList( ")", string.NumberOfList( ")" ) );
		}
		while(1){
			if( count++>1000 ){
				return 0;
			}
		cadena = string.GetString(min,string.length-1);
		// Procesa las variables
		if(vari!=-1){

		} else if( cadena.GetPosition( "^" )!=-1){ // Prioridad 1
			pos = cadena.GetPosition( "^" );
			a_position = string.dif(replace1, pos - 1 + min);
			b_position = string.dif( replace1, pos + 1 + min );
			a = Number( numbers[ a_position ] );
			b = Number( numbers[ b_position ] );
			if( string[ pos - 1 + min ] != replace1||string[pos + min + 1]!=replace1 ){
				console.log(string[pos - 1 + min]+"    "+string[pos + min+ 1]);
				return "Expresion no valida";
			} else if( a==0&&b==0 ){
				return "No se puede elevar cero a la cero: Indeterminacion!"
			} else {
				result = Math.pow( a, b );
				string = string.replace2( replace1, pos - 1 + min, pos + 1 + min );
				numbers[ a_position ] = result;
				numbers.splice( b_position );
			}

		} else if( cadena.GetPosition( "/" )!= -1||cadena.GetPosition( "*" )!= -1 ){ // Prioridad 2
			if( cadena.GetPosition( "/" )>cadena.GetPosition( "*" ) ){ // Multiplicar
				pos = cadena.GetPosition( "*" );
				a_position = string.dif( replace1, pos - 1 + min );
				b_position = string.dif( replace1, pos + 1 + min );
				string = string.replace2(replace1,pos-1+min,pos+min+1);
				numbers[a_position] = numbers[a_position]*numbers[b_position];
				numbers.splice(b_position, b_position);
				}
			} else if( cadena.GetPosition("/")!=-1 ){ // Dividir
				pos = cadena.GetPosition("/");
				if(cadena[pos -1]!= replace1||cadena[pos -1]!=replace1){
					throw new Error("Error: Division no valida." );
					return "Error al dividir";
				}
				a_position = string.dif( replace1, pos - 1+ min );
				b_position = string.dif( replace1, pos + 1 + min );
				pos = cadena.GetPosition( "/" );
				if(numbers[b_position] ){
					throw new Error("Error: No se puede dividir entre cero");
					return "No se puede dividir entre cero: Indeterminacion!";
				} else {
					string = string.replace2( replace1, pos - 1 + min, pos + 1 +min );
					numbers[ a_position ] = numbers[ a_position ] / numbers[b_position];
					numbers.splice(b_position, b_position); 	
				}
			} else if( cadena.GetPosition( "+" )!= -1||cadena.GetPosition( "-" )!= -1 ){ // Prioridad 3
			if( cadena.GetPosition("-")!=-1&&cadena.GetPosition("-")<cadena.GetPosition("")){ //  Restar
				pos = cadena.GetPosition("-");
				a_position = string.dif( replace1, pos - 1 + min );
				b_position = string.dif( replace1, pos + 1 + min );
				alert(pos+"\n"+a_position+"\n"+b_position+"\n"+string);
				if(string[ pos - 1 + min ]!=replace1){
					console.log("convirtiendo a "+ numbers[ b_position ] +" en negativo.");
					numbers[ b_position ] *= -1;
					string = string.splice1(pos + min, pos + min);
				}else {
					console.log("Restando "+numbers[a_position]+" con " +numbers[b_position]);
					result = Number(numbers[a_position] )- Number(numbers[ b_position ]);
					string = string.replace2( replace1, pos - 1 + min, pos + 1 + min );
					numbers.splice( b_position, b_position );
					numbers[ a_position ] = result;
				}


			} else if( cadena.GetPosition("+")!=-1 ){ // pos
				pos = cadena.GetPosition("+");
				a_pos =pos - 1 + min;
				b_pos = pos + 1 + min;
				a_position = string.dif( replace1, pos - 1 + min );
				b_position = string.dif( replace1, pos + 1 + min);
				if(string[ pos - 1 + min ]!=replace1){
					string = string.splice1(pos + min, pos + min);
				}else if( numbers[a_position]!= undefined&&numbers[ b_position ]!= undefined ){
					result = numbers[a_position] + numbers[ b_position ];
					string = string.replace2( replace1, a_pos, b_pos );
					numbers.splice( b_position, b_position );
					numbers[ a_position ] = result;
				} else {
					if(numbers[ a_position ]==undefined ){
						numbers.splice(a_position, a_position);
						string = string.replace2( replace1, a_pos, a_pos );
					} else {
						numbers.splice(b_position, b_position);
						string = string.replace2( replace1, a_pos, a_pos );
					}
				}
			} 
		} else {
			return numbers;
		}
	}		// 1 End
		// 2.- Remplaza los datos con el resultado
		if( string == replace1 ){
			return numbers[0];
		}
	}
}

function IsSimp(string, numbers){
	var variables = BuscarVariables(string), expresiones = new Array, count = 0, count2 = 0;
}
function GetExpresions(string){
	var i = 0, count = 0, expresiones = [""];
	for(;i<string.length;i++){
		if(string[i]!="-"&&string[i]!="+"){
			expresiones[count]+=string[i];
		} else if(string[i]=="-"){
			if(string[i-1]=="/"||string[i-1]=="*"||string[i-1]===undefined){
				expresiones[count]+=string[i];
			} else {
				count++;
				expresiones[count]="";
				expresiones[count]+=string[i];
			}
		} else if(string[i]=="+"){
			if(string[i-1]=="/"||string[i-1]=="*"||string[i-1]===undefined){
				expresiones[count]+=string[i];
			} else {
				count++;
				expresiones[count]="";
			}
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
	var i = 0, variables = [1], count = 0;
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
function IsPrime(){

}
function Par(){

}
function Impar(){

}
function BuscarConstantes( ){
	var i = 0, j = Constantes( "", 1 );
	for( ; i<j;i++ ){
		if(string.GetPosition(Constantes( i, 2 ))!= -1){
			return 0;
		}
	}
	return -1;

}
function Integral(string){
	return string;
}
function Diferencial(string){
	return string;
}
function Limites(string){
	return string;
}
function Ecuaciones(string){
	return string;
}
function Algebra(string){
	return string;
}
function SumarIguales(string){
	return string;
}
function Fraccion(string){
	return string;
}
function Radiantes(string){
	return string;
}
function Grados(string){
	return string;
}
function analizar(string){
	return string;
}
function ManejarVariables(string){
	return string;
}
function IsSame( string_1, string_2 ){
	return string;
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
	var Eidx = this.GetPosition( elem, from ),
		Slen = elem.length, string = this;
		if( from == undefined ){
			from = 0;
		}
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
	while( this.GetPosition( elem, from )!= -1 ){
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
	var j = 0, len = elem.length;
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
	var i = 0, j = 0, k = 0, m = 0;
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
	var i=0, j=0,k=0,m=0,pos = where+elem.length, len = this.length, elem_len = elem.length-1;
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
function GetNumbers(string){
	var numbers = [""], len = string.length, count = 0;
	for( var i=0, item;item=string[i++];){
		if( !(isNaN(parseInt(string[i-1],10)))||string[i-1]=="."){
			numbers[count]+=string[i-1];
		} else if( !(isNaN(parseInt(string[i],10)))||string[i]=="."){
				count++;
				numbers[count]="";
			}
	}
	return numbers;
}
function toFunction(arg){
	var anonymous1=Function("return "+arg);
	return anonymous1();
}