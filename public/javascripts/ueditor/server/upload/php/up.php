<?php
    //上传配置
    $config = array(
        "uploadPath"=>"../uploadfiles/",                          //保存路径
        "fileType"=>array(".gif",".png",".jpg",".jpeg",".bmp"),   //文件允许格式
        "fileSize"=>1000                                          //文件大小限制，单位KB
    );
    
    //文件上传状态,初始默认成功，可选参数{"SUCCESS","ERROR","SIZE","TYPE"}
    $state = "SUCCESS";

    $title = htmlspecialchars($_POST['pictitle'], ENT_QUOTES);
    $path  = $config['uploadPath'];
    if(!file_exists($path)){
        mkdir("$path", 0777);
    }
    //格式验证
    $current_type = strtolower(strrchr($_FILES["picdata"]["name"], '.'));
    if(!in_array($current_type, $config['fileType'])){
        $state = "TYPE";
    }
    //大小验证
    $file_size = 1024 * $config['fileSize'];
    if( $_FILES["picdata"]["size"] > $file_size ){
        $state = "SIZE";
    }
    //保存图片
    if($state == "SUCCESS"){
        $tmp_file=$_FILES["picdata"]["name"];
        $file = $path.rand(1,10000).time().strrchr($tmp_file,'.');
        $result = move_uploaded_file($_FILES["picdata"]["tmp_name"],$file);
        if(!$result){
            $state = "ERROR";
        }
    }
    //向浏览器返回数据json数据
    $file= str_replace('../','',$file);  //为方便理解，替换掉所有类似../和./等相对路径标识
    echo "{'url':'".$file."','title':'".$title."','state':'".$state."'}";

?>

