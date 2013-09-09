Ext.define('IDE.base.DirectoryDialog', {

    singleton : true,

    open : function(callback) {
        var dirChooser = document.getElementById('dirChooser');
        dirChooser.click();
        dirChooser.addEventListener('change', function() {
            var dir = dirChooser.value;
            callback && callback(dir);
        });
    }
});