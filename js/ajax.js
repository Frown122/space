var ajax = {};
ajax.get = function(url,fn){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
	xhr.open('get',url,true);
	xhr.send();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status ==200){
			if(typeof fn === 'function'){
				fn(xhr.responseText);
			}
			
		}
	}
};

ajax.post = function(url,data,fnWin){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	xhr.open('post',url,true);
	
	xhr.setRequestHeader('content-type',"Application/x-www-form-urlencoded;charset=utf-8");
	xhr.send(data);
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status === 200){
			if(typeof fnWin === 'function'){
				fnWin(xhr.responseText);
			}
		}
	}
}
