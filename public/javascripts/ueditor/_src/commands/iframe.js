(function() {
    baidu.editor.commands['insertframe'] = {
        execCommand : function(){

        },
         queryCommandState : function(){
            return this.highlight ? -1 :0;
        }
};
})();
