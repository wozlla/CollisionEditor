Ext.define('IDE.base.FileDialog', {

    singleton : true,

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
        if(!fileChooser.inited) {
            fileChooser.inited = true;
            fileChooser.addEventListener('change', function() {
                var dir = fileChooser.value;
                console.log('change', dir);
                if(dir) {
                    me.callback && me.callback(dir);
                    me.callback = null;
                }
                fileChooser.value = '';
            });
        }
    }
});