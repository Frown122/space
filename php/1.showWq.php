<?php
	include 'public.php';
	//编写语句
	$sql = 'SELECT * FROM `wqtab` WHERE 1';
	//执行
	//查询返回集合
	$set = mysql_query($sql);
	//转为数组，数组每次只能一个，所以用循环
	while($arr = mysql_fetch_array($set)){
		//循环转出来是每一条是变量，所以存放多个数据，用数组
		$list[] = $arr;   //形成二位数组  [[],[],[]]是php数组	
	}
	//将php数组转为json
	echo json_encode($list);
