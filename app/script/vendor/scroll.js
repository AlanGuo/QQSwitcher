'use strict';

(function(exports){
	var Scroll = function(elem,scrollbars,options){
		options = options || {};
		options.direction = options.direction || 'vertical';
		options.scrollSpeed = options.scrollSpeed || 20;
		options.scrollbarMinLength = options.scrollbarMinLength || 10;

		//保存元素
		this.elem = elem;
		this.options = options;
		this.scrollbars = scrollbars;

		if(elem){
			var self = this;
			var timer = null;
			var func = elem.addEventListener?'addEventListener':'attachEvent';
			var type = elem.addEventListener?'mousewheel':'onmousewheel';
			elem[func](type,function(evt){
				evt = evt || window.event;
				
				if(options.direction === 'vertical'){
					var deltaY = evt.deltaY || -evt.wheelDelta;
					var yoffset = deltaY / 100 * options.scrollSpeed;
					elem.scrollTop += yoffset;

					var handle = self.scrollbars.vertical.querySelector('.handle');
					if(self.scrollbars.vertical){
						if(timer){
							clearTimeout(timer);
						}
						self.scrollbars.vertical.style.opacity = 1;

						var scrollMaxHeight = self.scrollbars.vertical.clientHeight;
						var scrollHeight = self.elem.scrollHeight;
						var ratio = scrollMaxHeight/scrollHeight;

						handle.style.top = parseInt(ratio * elem.scrollTop) + 'px';

						timer = setTimeout(function(){
							self.scrollbars.vertical.style.opacity = 0;
						},1500);
					}
				}
				else if(options.direction === 'horizon'){
					var xoffset = evt.deltaX / 100 * options.scrollSpeed;
					elem.scrollLeft += xoffset;
				}

				if(evt.preventDefault){
					evt.preventDefault();
				}
				return false;
			});
		}
	};
	var scrollProto = Scroll.prototype;
	scrollProto.calcScrollInfo = function(){
		if(this.scrollbars.vertical){
			//有滚动条
			//确定是否显示
			var scrollbar = this.scrollbars.vertical;
			if(this.elem.scrollHeight > this.elem.clientHeight){
				//scrollbar.style.opacity = 1;
				var scrollMaxHeight = this.elem.clientHeight;
				var scrollHeight = this.elem.scrollHeight;
				//滚动条高度，窗口高度/内容高度*窗口高度
				scrollHeight = parseInt((scrollMaxHeight / scrollHeight) * scrollMaxHeight);
				
				if (scrollHeight <= this.options.scrollbarMinLength) { scrollHeight = this.options.scrollbarMinLength; }
				
				var handle = scrollbar.querySelector('.handle');
				handle.style.height = scrollHeight + 'px';

				var self = this;
				var isdrag = false;
				var originClientY = 0;
				var originScrollTop = 0;
				var handleOriginY = handle.style.top.replace(/\D/g,'')*1;
				scrollMaxHeight = self.scrollbars.vertical.clientHeight;
				scrollHeight = self.elem.scrollHeight;
				var ratio = scrollMaxHeight/scrollHeight;
				//绑定鼠标拖动事件
				handle.onmousedown = function(evt){
					evt = evt || window.event;
					isdrag = true;
					originClientY = evt.clientY;
					handleOriginY = handle.style.top.replace(/\D/g,'')*1;
					originScrollTop = self.elem.scrollTop;
					if(evt.preventDefault){
						evt.preventDefault();
					}

					return false;
				};
				var oldmousemove = document.body.onmousemove;
				document.body.onmousemove = function(evt){
					evt = evt || window.event;
					if(oldmousemove){
						oldmousemove(evt);
					}
					if(isdrag){
						var offsetY = evt.clientY - originClientY;
						var oldScrollTop = self.elem.scrollTop;
						self.elem.scrollTop = originScrollTop + offsetY/ratio;
						if(self.elem.scrollTop !== oldScrollTop){
							handle.style.top = (offsetY + handleOriginY) + 'px';
						}
						//移动的时候不要隐藏
						scrollbar.style.opacity = 1;

						if(evt.preventDefault){
							evt.preventDefault();
						}
						return false;
					}			
				};
				var oldmouseup = document.body.onmouseup;
				document.body.onmouseup = function(evt){
					evt = evt || window.event;
					if(oldmouseup){
						oldmouseup(evt);
					}
					isdrag = false;
					scrollbar.removeAttribute('style');
					if(evt.preventDefault){
						evt.preventDefault();
					}

					return false;
				};
			}
			else{
				scrollbar.style.opacity = 0;
			}
		}
		if(this.scrollbars.horizon){
			//有滚动条
			//确定是否显示
			if(this.elem.scrollWidth > this.elem.clientWidth){

			}
		}
	};

	exports.Scroll = Scroll;
})(window);