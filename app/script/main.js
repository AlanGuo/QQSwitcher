'use strict';

//程序入口
window.onhashchange = function(){
     var newHash = location.hash.substring(2) || location.pathname.substring(1);
     //路由
     qqswitcher.router.route(newHash);
};

window.onhashchange();
qqswitcher.eventHandler.bindEvent('click');
qqswitcher.listener.init();