(function() {
    baidu.editor.commands['gmap'] = 
    baidu.editor.commands['map'] = {
        execCommand : function(){

        },
         queryCommandState : function(){
            return this.highlight ? -1 :0;
        }
};
})();
