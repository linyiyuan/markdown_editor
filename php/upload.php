<?php

	$uploadFolder = '../image/';//上传图片路径
	$onlinePath = 'http://39.108.127.171:8866/image/';//返回的路径

	$response = array();
	if (isset($_FILES['file'])) {
	    $file = $_FILES['file'];
	    $filename = uniqid() . '.' . (pathinfo($file['name'], PATHINFO_EXTENSION) ? : 'png');
	    move_uploaded_file($file['tmp_name'], $uploadFolder . $filename);
	    $response['data'] = $onlinePath . $filename;
	} else {
	    $response['data'] = 'Error while uploading file';
	}

	echo $response['data'];

?>