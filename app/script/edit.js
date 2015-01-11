'use strict';

(function(exports){
	var editView = {
		/** 
		 * 显示指定内容
		 * @method show
		 */
		init:function(){
			var textarea = document.body.querySelector('textarea');
			var content = localStorage.getItem('numbers');
			textarea.innerHTML = content?content:'';
		},
		show:function(){
			ga('send', 'event', 'page', 'view', {'pageName': '#/edit'});
			return QQSwitcherTmpl.template('frame')({page:'edit',content:QQSwitcherTmpl.template('edit')()});
		},
		events:{
			'confirm':function(){
				var textarea = document.body.querySelector('textarea');
				try{
					localStorage.setItem('numbers',textarea.value?textarea.value:'');
					window.location.href = '#/list';
				}
				catch(e){
					window.alert('保存失败！');
				}
			}
		}
	};

	exports.editView = editView;
})(qqswitcher);
