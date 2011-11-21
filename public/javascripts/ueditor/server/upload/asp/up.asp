<!--#include FILE="upload.inc"-->
<%
    dim upload,file,formName,title,state,picSize,picType,uploadPath

    uploadPath = "../uploadfiles/"       '上传保存路径
    picSize = 500                        '允许的文件大小，单位KB
    picType = ".jpg,.gif,.png,.bmp"      '允许的图片格式
    
    state="SUCCESS"
    set upload=new upload_5xSoft ''''建立上传对象
    title=upload.form("pictitle")

    for each formName in upload.file
        set file=upload.file(formName)

        '大小验证
        if file.filesize > picSize*1024 then
            state="SIZE"
        end if

        '格式验证
        if instr(picType, mid(file.FileName, instrrev(file.FileName,".")))=0 then
            state = "TYPE"
        end If

        '保存图片
        if state="SUCCESS" then
            file.SaveAs Server.mappath( uploadPath & file.FileName) ''''保存文件
        end if
        
        '返回数据
        response.Write "{'url':'" & uploadPath & file.FileName &"','title':'"& title &"','state':'"& state &"'}"
        set file=nothing

    next
    set upload=nothing
%>