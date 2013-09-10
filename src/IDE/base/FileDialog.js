Ext.define('IDE.base.FileDialog', {

    singleton : true,

    init : false,

    callback : null,

    open : function(saveAs, callback) {
        var me = this;
        if(typeof saveAs === 'function') {
            callback = saveAs;
            saveAs = false;
        }
        this.callback = callback;
        var fileChooser = document.getElementById(saveAs ? 'saveFileAsChooser' : 'fileChooser');
        fileChooser.click();
        if(!this.init) {
            fileChooser.addEventListener('change', function() {
                var dir = fileChooser.value;
                if(dir) {
                    me.callback && me.callback(dir);
                    me.callback = null;
                }
                fileChooser.value = '';
            });
            this.init = true;
        }
    }
});