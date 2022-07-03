// compara this con string y devuelve un porcentaje que representa el nivel de parentesco
String.prototype.Compare = function( string ) {
	var a = 0,
		i = 0,
		len_1 = this.length,
		len_2 = string.length;
	( len_1 > len_2 ) ? len = len_1 : len = len_2;
	for( ; i < len ; i++ ){
		if( this[i]==string[i] )a++;
	}
	return ( 100 / len )*a;
};
// elimina elem de this desde from
String.prototype.Remove = function( elem, from ) {
	var Eidx = this.GetPosition( elem, from ),
		Slen = elem.length;
	if ( Eidx != -1) {
		var i = Eidx + Slen -1;
			string = string.splice1( Eidx, i );
		return string;
	}
	return string;
};
// elimina todos los elem de this desde from
String.prototype.RemoveAll = function( elem, from ) {
	var string = this
;	while( this.GetPosition( elem, from )!= -1 ){
		string = string.Remove( elem, from);
	}
	return string;
};
// remueve una parte del string desde a hasta b
String.prototype.splice1 = function( a, b ) {
	var string_1="",
		i = 0,
		len = this.length;
	for(  ; i < len ; i++ ){
		if ( i < a || i > b ) {
			string_1 += this[i];
		}
	}
	return string_1;
};
// Contrario a splice, devuelve el string que se encuentra entre ay b
String.prototype.GetString = function( a, b ) {
	var string_1="",
		i = 0,
		len = this.length;
		for( ; i < len ; i++ ){
			if( i < a || i > b ){
			} else {
				string_1 += this[i];
			}
		}
	return string_1;
};
// remplaza string con string_2 desde from
String.prototype.replace = function( string, string_2, from ) {
	var S1idx = this.GetPosition( string, from),
		string = "",
		i = 0,
		len_1 = this.length,
		len_2 = string.length,
		len_3 = string_2.length;
	for(  ; i < len_1 ; i++ ){
		if( i < S1idx || i > S1idx ){
			string += this[i];
		} else {
			string += string_2;
			i = S1idx + len_2 - 1;
		}
	}
	return string;
};
// lo mismo que replace solo que elimina todos
String.prototype.replaceAll = function( string, string_2) {
	var G = this
	while(GetPosition(this,string)){
		G=replace(this, string, string_2);
	}
	return G;
};
// Agrega un stringo en un lugar especifico
String.prototype.StringAdd = function( string_1, a ) {
	var string="",
		i = 0,
		len=this.length;
	for( ; i < len ; i++ ){
		if ( i == a ) {
			string += string_2 + this[i];
		} else {
			string += this[i];
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
String.prototype.GetPosition = function(elem, from) {
	var j = 0;
	if( from == undefined ){
		from =0;
	}
	for( var i = from ; i < this.length ; i++ ){
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
String.prototype.NumberOfList = function(elem, from) {
	var i, j = 0, k = 0;
	if( from == undefined ){
		from = 0;
	}
	for( i = from ; i < list.length ;i++ ){
		if( this[i] == elem[k] ){
			k++;
			if( k == elem.length ){
				j++;
				k = 0;
			}
		} else {
			k = 0 ;
		}
	}
	return j;
};
// 
/*String.prototype.NumberOfList2 = function(elem,where) {
	var i = 0,
		j = 0,
		k = 0,
		m = 0;
	for( ; i < this.length ; i++ ){
		if( this[i] == elem[j] ){
			j++;
		} else {
			j = 0;
		}
		if( j == elem.length ){
			k++;
		}
		if( i == where ){
			for( ; i < this.length; i++ ){
				if( this[i]==elem[m] ){
					m++;
				} else {
					return -1;
				}
				if( m == elem.length -1 ){
					return k;
				}
			}
			return -1;
		}
	}
};*/
String.prototype.NumberOfList2 = function(elem, where) {
	var a=0,b=0,c=0;
	for(var i = 0;i<this.length;i++){
		if( this[i]==elem[a] ){
			if( elem == 0 ){
				b = i;
			}
			if( a == elem.length -1 ){
				c++;
				if( i == where ){
					a = 0;
					for(; i<this.length;i++){
						if( this[i]==elem[i] ){
							a++;
							if( a == elem.length -1 ){
								return c;
							}
						} else {
							return -1;
						}
					}
				}
			}
			a++;
		} else {
			a =0;
		}
	}
	return -1;
};
function GetNumbers( string ){
	var number = "",
		j = 0;	
		for( var i = 0 ; i < string.length ; i++ ){
		switch( Number( string[ i ] ) ){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			number += string[ i ];
			break;
			default:
			number+=" ";

	}
}
	number=number.split(" ");
	return number;
}