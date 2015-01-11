'use strict';

(function(exports){
	var router = {
		route:function(hash){
			hash = hash || '';
			if(!hash){
				hash = 'list';
			}
			var transitionAnimation = null;
			var qqswitcherContainer = document.getElementById('qqswitcher-container');
			//动画切换路由
			if(qqswitcherContainer.innerHTML.trim() !== ''){
				if(hash === 'about'){
					transitionAnimation = {transIn:'animateright',transOut:'animateleft'};
				}
				else if(hash === 'edit'){
					transitionAnimation = {transIn:'animateleft',transOut:'animateright'};
				}
				else if(hash === 'list'){
					if(document.body.querySelector('.aboutcontent')){
						//about
						transitionAnimation = {transIn:'animateleft',transOut:'animateright'};
					}
					else if(document.body.querySelector('.precautions')){
						//edit
						transitionAnimation = {transIn:'animateright',transOut:'animateleft'};
					}
				}
			}
			qqswitcher.show(hash,{transitionAnimation:transitionAnimation});
		}
	};
	exports.router = router;
})(qqswitcher);
