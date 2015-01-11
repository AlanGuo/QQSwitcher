'use strict';

(function(exports){
	var listener = {
		init:function(){
			var func = window.addEventListener?'addEventListener':'attachEvent';
			var type = window.addEventListener?'message':'onmessage';
			window[func](type,function(evt){
				var data = JSON.parse(evt.data);
				if(data.message === 'uin'){
					qqswitcher.listView.selectli(data.data);
				}
				else if(data.message === 'verifycode'){
					qqswitcher.listView.showVerifyCode(data.data);
				}
				else if(data.message === 'error'){
					qqswitcher.listView.showError(data.data);
				}
			});
		}
	};

	exports.listener = listener;
})(qqswitcher);
