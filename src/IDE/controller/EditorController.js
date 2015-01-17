Ext.define('IDE.controller.EditorController', {

    extend: 'Ext.app.Controller',

    views : [
        'CollisionEditor'
    ],

    init: function() {
        var me = this;

        this.control({
            'viewport > editor': {
                render : function(objectHierarchy) {

                }
            }
        });
    }
});