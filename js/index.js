//工具
function $get(selector){
	return document.querySelectorAll(selector);
}
function $create(tagName){
	return document.createElement(tagName);
}
showWq();
addWq();
//显示错题
function showWq(){
	//获取tbody
	let oTbody = $get('#tbody')[0];
	ajax.get('php/1.showWq.php',function(data){
		//从后端拿到数据
		let arr = JSON.parse(data);
		//console.log(arr);
		//遍历数组
		for(let i = 0,len = arr.length;i < len;i ++){
			//创建tr
			let oTr = $create('tr');
			//添加类名
			oTr.className = 'text-center middle';
			//有多个td  用es6的模板字符串  ``
			let str = `
  				<td>${arr[i].wid}</td>
  				<td>${arr[i].content}</td>
  				<td>${arr[i].where}</td>
  				<td>${arr[i].idea}</td>
  				<td>
  					<button class="btn del" data-wq-id="${arr[i].wid}" >删除</button>
  				</td>
  				<td>
  					<button class="btn update" data-wq-id="${arr[i].wid}">
  					<span class="glyphicon glyphicon-cog">修改</span>
  					</button>
  				</td>
			`;
			//添加内容到tr中
			oTr.innerHTML = str;
			//tr放到tbody中
			oTbody.appendChild(oTr);
			removeWq();
			updateWq();
		}
	})
}
//添加错题
function addWq(){
	//获取提交按钮
	let oSub = $get('#wq-save-question')[0];
	//获取错题内容框
	let oContent = $get('#wq-content')[0];
	//获取错在哪里
	let oWhere = $get('#wq-where')[0];
	//获取想法
	let oIdea = $get('#wq-idea')[0];
	//添加点击事件
	oSub.onclick = function(){
		//准备参数格式(key=value&key=value)
		let msg = `content=${oContent.value}&where=${oWhere.value}&idea=${oIdea.value}`;
		ajax.post('php/2.addWQ.php',msg,function(){
			location.reload();
		})
	}
}
//删除错题
function removeWq(){
	//获取所有的删除按钮、
	let del = $get('#tbody .del');
	//遍历加事件
	for(let i = 0,len = del.length;i < len;i ++){
		del[i].onclick = function(){
			//删除当前页面的tr
			this.parentNode.parentNode.remove();
			//删除数据库的数据
			ajax.get('php/3.removeWq.php?id=' + this.getAttribute('data-wq-id'),function(){})
		}
	}
}
//修改错题
function updateWq(){
	//获取所有的修改按钮
	let update = $get('#tbody .update');
	//遍历加事件
	for(let i = 0,len = update.length;i < len;i ++){
		update[i].onclick = function(){
			ajax.get('php/4.updateWq.php?id=' + this.getAttribute('data-wq-id'),function(data){
				//console.log(data);
				let obj = JSON.parse(data);
				let oMark = $create('div');
				let oDiv = $create('div');
				oMark.style.cssText = "width : 100%;height : 100%;background:black;position: absolute;z-index: 10000;opacity: 0.3;left: 0;top: 0;";
				oDiv.style.cssText = "width: 300px;height: 150px;background: pink;position: absolute;z-index: 10001;left: 350px;top: 200px;";
				let str = `
					<form action="php/updated.php" method="post">
						<p><input type="hidden" name="wid" value="${obj.wid}">
						   错题内容: <input type="text" name="content" value="${obj.content}"></p>
						<p>错在哪里 : <input type="text" name="where" value="${obj.where}"></p>
						<p>您的想法: <input type="text" name="idea" value="${obj.idea}"></p>
						<p> <input type="submit" value="修改"></p>
					</form>
				`;
				
				oDiv.innerHTML = str;
				let oBody = document.body;
				oBody.appendChild(oMark);
				oBody.appendChild(oDiv);
//				document.onclick = function(){
//					oDiv.style.display = 'none';
//					oMark.style.display = 'none';
//				}
			})
		}
	}
}
