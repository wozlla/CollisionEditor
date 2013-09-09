if(window.require) {
    window.fs = require('fs');
}


Ext.application({

    requires: [
        'Ext.container.Viewport',
        'IDE.base.DirectoryDialog',
        'IDE.base.FileDialog'
    ],
    
    name: 'IDE',

    controllers: [
        'EditorController'
    ],

    appFolder: 'IDE',

    launch: function() {
        console.log('launch');

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [{
                xtype : 'collisionEditor'
            }]
        });
    }
});