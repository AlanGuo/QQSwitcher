/*TMODJS:{"version":19,"md5":"f5b09f35888dab476b257aff30f4e534"}*/
template('listitem',function($data,$filename) {
'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,data=$data.data,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(data,function($value,$index){
$out+=' <li data-click-event="select"> <span class="number">';
$out+=$escape($value.uin);
$out+='</span> <span class="markup mr5">';
$out+=$escape($value.comment);
$out+='</span> <span class="pwd none">';
$out+=$escape($value.password);
$out+='</span> <span class="vercodewrapper none"> <input class="vercode" id="vercode"> <img class="verifyimg" class="看不清，换一张" src=""> </span> </li> ';
});
return new String($out);
});