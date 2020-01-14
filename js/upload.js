// 用于拖拽上传图片的js代码
$(function(){
	window.addEventListener("drop", function (e) {
	      e = e || event
	      if (e.target.className == "code") {  // 写入你的拖拽区域classname
	          console.log("有文件拖拽到编辑器了")
	          e.preventDefault()
	      }
	}, false);
	simplemde.codemirror.on('drop', function (editor, e) {
	    console.log("codemirror on drop")

	      if (!(e.dataTransfer && e.dataTransfer.files)) {
	          _this.$message({
	              message: "该浏览器不支持操作",
	              type: 'error'
	          })
	          return
	      }
	      let dataList = e.dataTransfer.files
	      console.log("dataList:" + dataList)
	      console.log(dataList)
	      for (let i = 0; i < dataList.length; i++) {
	          if (dataList[i].type.indexOf('image') === -1 ) {
	              _this.$message({
	                  message: "仅支持Image上传",
	                  type: 'error'
	              })
	              continue
	          }
	          let formData = new FormData()
	          formData.append('file', dataList[i])
	          console.log(formData)
	          fileUpload(simplemde,formData);

	      }
	  });

	function fileUpload(simplemde,formData) {
	    $.ajax({
	        url: "../../php/upload.php",//上传图片地址
	        type: 'POST',
	        cache: false,
	        data: formData,
	        timeout: 5000,
	        //必须false才会避开jQuery对 formdata 的默认处理
	        // XMLHttpRequest会对 formdata 进行正确的处理
	        processData: false,
	        //必须false才会自动加上正确的Content-Type
	        contentType: false,
	        xhrFields: {
	            withCredentials: true
	        },
	        success: function (data) {
	            console.log(data);
	            var content = simplemde.value();
	            simplemde.value(content + '![]('+data+')');
	        },
	        error: function (XMLHttpRequest, textStatus, errorThrown) {
	            console.log("上传出错了")
	        }
	    });
}


})
