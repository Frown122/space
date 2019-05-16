<?php
	//字符集
	header('content-type:text/html;charset=utf-8');
	//操作数据库  连接数据库
	$db = mysql_connect('localhost','root','root');
	//选择数据库
	mysql_select_db('wq1901',$db);
	//字符集
	mysql_query('set names utf-8');