/**
 * Created by JetBrains WebStorm.
 * User: taoqili
 * Date: 11-11-8
 * Time: 下午3:38
 * To change this template use File | Settings | File Templates.
 */


baidu.editor.plugins["checkimage"] = function(){
    var checkedImgs=[];
    baidu.editor.commands['checkimage'] = {
        execCommand : function( cmdName,checkType) {
            if(checkedImgs.length){
                this[checkType] = checkedImgs;
            }
        },
        queryCommandState: function(cmdName,checkType){
            checkedImgs=[];
            var images = this.document.getElementsByTagName("img");
            for(var i=0,ci;ci =images[i++];){
                if(ci.getAttribute(checkType)){
                    checkedImgs.push(ci.getAttribute(checkType));
                }
            }
            return checkedImgs.length ? 1:-1;
        }
    };
};