'use strict';

String.prototype.trim = function(){
	return /^\s*([\d\D]*?)\s*$/.exec(this)[1];
};