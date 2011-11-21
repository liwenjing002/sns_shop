(function() {
    baidu.editor.commands['emotion'] = {
        execCommand : function(){

        },
         queryCommandState : function(){
            return this.highlight ? -1 :0;
        }
};
})();
