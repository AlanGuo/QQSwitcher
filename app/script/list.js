'use strict';

(function(exports){
	var listView = {
		_currentUin:null,
		/** 
		 * 显示指定内容
		 * @method show
		 */
		show:function(){
			//统计需求
			ga('send', 'event', 'page', 'view', {'pageName': '#/list'});

			return QQSwitcherTmpl.template('frame')({page:'list',content:QQSwitcherTmpl.template('list')()});
		},
		init:function(){
			var ul = document.body.querySelector('#contentlist');
			var scroll = new Scroll(ul,{vertical:document.getElementById('scrollbar')});

			var data = localStorage.getItem('numbers');
			if(data){
				var items = [];
				data = data.trim();
				if(data){
					items = data.split(/\r\n|\n/);
					for(var i=0;i<items.length;i++){
						items[i] = items[i].trim();
						if(!items[i]) {continue;}

						var content = items[i].split(/,|，/);
						var uin = content[0].trim();
						
						if(!content[1]) {content[1] = '';}
						var password = content[1].trim();
						if(!content[2]) {content[2] = '';}
						var comment = content[2].trim();

						if(uin || comment){
							items[i] = {uin:uin,comment:comment,password:password};
						}
					}
				}
				if(items.length){
					ul.innerHTML = QQSwitcherTmpl.template('listitem')({data:items});
				}
				else{
					ul.innerHTML = QQSwitcherTmpl.template('emptylist')();
				}
			}
			else{
				ul.innerHTML = QQSwitcherTmpl.template('emptylist')();
			}

			if(this._currentUin){
				this.selectli(this._currentUin);
			}

			scroll.calcScrollInfo();
		},
		selectli:function(uin){
			this._currentUin = uin;
			var ul = document.body.querySelector('#contentlist');
			if(ul.querySelector('li')){
				var lis = ul.children;
				for(var i=0;i<lis.length;i++){
					if(lis[i].querySelector('.number').innerHTML*1 === uin){
						lis[i].className = 'current';
					}
					else{
						lis[i].className = '';
					}
				}
			}
		},
		showVerifyCode:function(codeuri){
			var ul = document.body.querySelector('#contentlist');
			var li = ul.querySelector('.current');
			if(li){
				var wrapper = li.querySelector('.vercodewrapper');
				wrapper.className = 'vercodewrapper';
				wrapper.querySelector('img').src = codeuri;
				var vercodeInput = wrapper.querySelector('#vercode');
				vercodeInput.value ='';
				setTimeout(function(){
					vercodeInput.focus();
				},100);

				var keyinput = function(evt){
					evt = evt || window.evt;
					var target = evt.target || evt.srcElement;
					var len = target.value.length;
					if(len === 4){
						window.top.postMessage(JSON.stringify({message:'vercode',code:target.value}),'*');
					}
				};
				vercodeInput.onkeyup = keyinput;
			}
		},
		showError:function(errorMessage){
			var errorRegion = document.getElementById('error');
			errorRegion.innerHTML = errorMessage;
			errorRegion.className = 'error mb10';
		},
		hideError:function(){
			var errorRegion = document.getElementById('error');
			errorRegion.innerHTML = '';
			errorRegion.className = 'error mb10 none';
		},
		events:{
			'select':function(){				
				var index = -1;
				listView.hideError();
				if(this.className !== 'current'){

					var lis = this.parentNode.children;
					for(var i=0;i<lis.length;i++){
						lis[i].className = '';
						lis[i].querySelector('.vercodewrapper').className = 'vercodewrapper none';
						if(this === lis[i]){
							index = i;
						}
					}
					this.className = 'current';
					//切换登录态
					window.top.postMessage(JSON.stringify({message:'login',uin:this.querySelector('.number').innerHTML,pwd:this.querySelector('.pwd').innerHTML}),'*');
				}
			}
		}
	};

	exports.listView = listView;
})(qqswitcher);
