var origin='*';
var iframe=document.getElementById('qqswitcher-dialog');
if(!iframe) {
	iframe = document.createElement('iframe');
}
//ga
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-50634980-2', 'auto');

iframe.src='http://115.29.195.88:1005/dist/index.html';
iframe.id='qqswitcher-dialog';
iframe.setAttribute('style','position:absolute;left:0;top:0;right:0;bottom:0;z-index:9999;overflow:hidden;width:100%;height:100%;border:0');
document.body.appendChild(iframe);
var dispatchEvent = function(elem,className,eventName){
	var evt = null;
	if(document.createEvent){
		evt = document.createEvent(className);
		evt.initEvent(eventName, true, true);
		elem.dispatchEvent(evt);
	}
	else{
		evt = document.createEventObject();
		elem.fireEvent(on+eventName,evt);
	}
}
var func = iframe.addEventListener?'addEventListener':'attachEvent';
var name = iframe.addEventListener?'load':'onload';
iframe[func](name,function(){
	var uin=/\buin=(.*?)(;|$)/.exec(document.cookie);
	if(uin){
		uin=uin[1].replace(/\D/i,'')*1;
	}
	iframe.contentWindow.postMessage(JSON.stringify({message:'uin',data:uin}),iframe.src);});
	var loginframe=document.getElementById('qqswitcher-login');
	if(!loginframe) {
		loginframe = document.createElement('iframe');
	}
	loginframe.id='qqswitcher-login';
	var domain = location.host.split('.').slice(-2).join('.');
	/*
	if('qcloud.com'===domain){
		loginframe.src= 'http://xui.ptlogin2.qcloud.com/cgi-bin/xlogin?hide_title_bar=1&bgcolor=ffffff&no_verifyimg=1&link_target=blank&style=22&appid=543009503&target=parent&s_url='+window.location.href+'&enable_qlogin=0&qqswitcherrandom='+Math.random();
	}
	else*/{
		loginframe.src='http://ui.ptlogin2.'+domain+'/cgi-bin/login?hide_title_bar=1&bgcolor=ffffff&style=12&appid=543009503&target=parent&enable_qlogin=0&s_url='+window.location.href+'&qqswitcherrandom='+Math.random();
	}
	loginframe.style.display='none';
	document.body.appendChild(loginframe);
	window.iframeDOM=function(name){return loginframe.contentDocument.getElementById(name);};
	loginframe[func](name,function(){
		var old=loginframe.contentWindow.ptuiCB;
		loginframe.contentWindow.ptuiCB=function(){
			old.apply(window,arguments);
			if(/验证码/.test(arguments[4]) && iframeDOM('verifyArea').style.display != 'none' && iframeDOM('verifyimg').src){
				dispatchEvent(iframeDOM('verifyimgArea'),'MouseEvent','click');
				/*带验证码登录*/
				ga('send', 'event', 'login', 'start',{'verify':'true'});

				iframe.contentWindow.postMessage(JSON.stringify({data:iframeDOM('verifyimg').src,message:'verifycode'}),origin);
			}else{

				ga('send', 'event', 'login', 'error');

				iframe.contentWindow.postMessage(JSON.stringify({message:'error',data:arguments[4]}),iframe.src);
			}
		}
	});
	name = iframe.addEventListener?'message':'onmessage';
	window[func](name,function(event){
		if(event.origin!=='http://115.29.195.88:1005' && event.origin!=='https://115.29.195.88'){
			return;
		}
		origin=event.origin;
		var data = JSON.parse(event.data);
		if(data.message==='login'){
			console.log('登录请求:');

			var request=data;iframeDOM('u').value=request.uin;
			//iframeDOM('u').dispatchEvent(new FocusEvent('blur'));
			dispatchEvent(iframeDOM('u'),'FocusEvent','blur');
			iframeDOM('p').value=request.pwd;
			dispatchEvent(iframeDOM('p'),'FocusEvent','focus');
			/*等待验证码的处理*/
			setTimeout(function(){
				console.log('开始登录。');
				if(iframeDOM('verifyArea').style.display != 'none' && iframeDOM('verifyimg').src){
					dispatchEvent(iframeDOM('verifyimgArea'),'MouseEvent','click');
					console.log('需要验证码。');
					/*带验证码登录*/
					ga('send', 'event', 'login', 'start',{'verify':'true'});

					iframe.contentWindow.postMessage(JSON.stringify({data:iframeDOM('verifyimg').src,message:'verifycode'}),origin);
				}
				else{
					/*不带验证码登录*/
					ga('send', 'event', 'login', 'start',{'verify':'false'});

					console.log('不需要验证码，直接登录。');iframeDOM('login_button').click();
					/*登录成功*/
					ga('send', 'event', 'login', 'success',{'verify':'false'});
				}
			},200);
		}else if(data.message==='vercode'){
			console.log('带验证码登录。'+data.code);

			/*登录成功*/
			ga('send', 'event', 'login', 'success',{'verify':'true'});

			iframeDOM('verifycode').value=data.code;
			iframeDOM('login_button').click();
		}else if(data.message==='close'){
			document.body.removeChild(iframe);
		}
});