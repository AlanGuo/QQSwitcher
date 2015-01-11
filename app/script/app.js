'use strict';

(function(exports){
	var qqswitcher = {
		_container:document.getElementById('qqswitcher-container'),
		/** 
		 * 显示指定的页面
		 * @method show
		 * @param {string} page 页面名称
		 * @param {object} opts 显示选项
		 *  @param {boolean} opts.mask 遮罩
		 *  @param {object} opts.transitionAnimation 过场动画
		 */
		show:function(page, opts){
			var viewName = page+'View';
			opts = opts || {};

			if(this[viewName]){
				//过场动画
				if(opts.transitionAnimation){
					var transOut = opts.transitionAnimation.transOut,
					transIn = opts.transitionAnimation.transIn;
					
					var elemOut = null;
					
					var contentElem = this._container.querySelector('.content');

					if(contentElem){
						elemOut = contentElem.cloneNode();
						elemOut.innerHTML = contentElem.innerHTML;
					}

					//elemIn
					this._container.innerHTML = this[viewName].show();
					var elemIn = this._container.querySelector('.content');
					var dialog = this._container.querySelector('.dialog');
					elemIn.className = 'content '+ transIn;
					var style = this._container.querySelector('.content').getAttribute('style');
					elemIn.setAttribute('style',style?style:'');
					//elemOut
					if(elemOut){
						elemOut.className = 'content animateinit';
						dialog.appendChild(elemOut);
						/*jshint -W030 */
						elemOut.clientHeight;
						elemOut.className = 'content '+transOut+'out';
					}
					//fix bugs in safari
					
					/*jshint -W030 */
					elemIn.clientHeight;
					elemIn.className = 'content';
					
					(function(elem){
						setTimeout(function(){
							if(elem.parentNode){
								elem.parentNode.removeChild(elem);
							}
						},500);
					})(elemOut);
				}
				else{
					//无过场动画
					this._container.innerHTML = this[viewName].show();
				}

				if(this[viewName].events && !this[viewName].events.binded){
					//绑定事件
					for(var p in this[viewName].events){
						this.eventHandler.on(p,this[viewName].events[p]);
					}
					this[viewName].events.binded = true;
				}
				if(this[viewName].init){
					this[viewName].init(this._container);
				}
			}
		},
		/**
		 * 隐藏主界面
		 */
		hide:function(){
			this._container.innerHTML = '';
		}
	};

	exports.qqswitcher = qqswitcher;
})(window);
