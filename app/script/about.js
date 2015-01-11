'use strict';

(function(exports){
	var aboutView = {
		/** 
		 * 显示指定内容
		 * @method show
		 */
		show:function(){
			ga('send', 'event', 'page', 'view', {'pageName': '#/about'});
			return QQSwitcherTmpl.template('frame')({page:'about',content:QQSwitcherTmpl.template('about')()});
		}
	};

	exports.aboutView = aboutView;
})(qqswitcher);
