Ext.define('IDE.base.Dialog', {

	extend : 'Ext.window.Window',

	border: 0,

	modal : true,

	resizable: true,

	width : 500,

	layout: {
        type: 'vbox',
	    align : 'stretch',
	    pack  : 'start',
    },


    descriptionDOMId : null,
    description : null,

    initComponent : function(params) {
		var me = this;
        var descriptionDOMId = 'IDE-dialog-description-' + Date.now();
		Ext.apply(me, {

            descriptionDOMId : descriptionDOMId,

    		items : [{
    			xtype : 'container',
    			layout : 'fit',
    			html : '<div class="IDE-dialog-description-area"><span id="' + descriptionDOMId + '">' + (me.description || '') + '</span></div>'
    		}, me.contentItem],

    		buttons: [
                {
                    text: 'Ok',
                    action : 'ok',
                    handler : function() {
                        me.close();
                    }
                },
                {
                    text: 'Cancel',
                    action : 'cancel',
                    handler : function() {
                        me.close();
                    }
                }
            ]
    	});

    	me.callParent(arguments);

    	
    },

    setDescription : function(description) {
        this.description = description;
        document.getElementById(this.descriptionDOMId).innerHTML = description;
    }



});