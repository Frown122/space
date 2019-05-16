<?php
	include 'public.php';
	//接收数据
	$content = $_POST['content'];
	$where = $_POST['where'];
	$idea = $_POST['idea'];
	//编写语句     添加语句
	$sql = "INSERT INTO `wqtab`(`content`, `where`, `idea`) VALUES ('$content','$where','$idea')";
	//执行
	mysql_query($sql);
