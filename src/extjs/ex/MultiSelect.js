Ext.define("Ext.ux.form.MultiSelect", {
    extend: "Ext.form.FieldContainer",
    mixins: {
        bindable: "Ext.util.Bindable",
        field: "Ext.form.field.Field"
    },
    alternateClassName: "Ext.ux.Multiselect",
    alias: [ "widget.multiselectfield", "widget.multiselect" ],
    requires: [ "Ext.panel.Panel", "Ext.view.BoundList", "Ext.layout.container.Fit" ],
    uses: [ "Ext.view.DragZone", "Ext.view.DropZone" ],
    layout: "anchor",
    ddReorder: false,
    appendOnly: false,
    displayField: "text",
    allowBlank: true,
    minSelections: 0,
    maxSelections: Number.MAX_VALUE,
    blankText: "This field is required",
    minSelectionsText: "Minimum {0} item(s) required",
    maxSelectionsText: "Maximum {0} item(s) required",
    delimiter: ",",
    dragText: "{0} Item{1}",
    ignoreSelectChange: 0,
    initComponent: function() {
        var me = this;
        me.bindStore(me.store, true);
        if (me.store.autoCreated) {
            me.valueField = me.displayField = "field1";
            if (!me.store.expanded) {
                me.displayField = "field2";
            }
        }
        if (!Ext.isDefined(me.valueField)) {
            me.valueField = me.displayField;
        }
        me.items = me.setupItems();
        me.callParent();
        me.initField();
        me.addEvents("drop");
    },
    setupItems: function() {
        var me = this;
        me.boundList = Ext.create("Ext.view.BoundList", Ext.apply({
            anchor: "none 100%",
            deferInitialRefresh: false,
            border: 1,
            multiSelect: true,
            store: me.store,
            displayField: me.displayField,
            disabled: me.disabled
        }, me.listConfig));
        me.boundList.getSelectionModel().on("selectionchange", me.onSelectChange, me);
        me.boundList.on('itemdblclick', function() {
            me.fireEvent('itemdblclcik', me, me.getSelected());
        });
        if (!me.title) {
            return me.boundList;
        }
        me.boundList.border = false;
        return {
            border: true,
            anchor: "none 100%",
            layout: "anchor",
            title: me.title,
            tbar: me.tbar,
            items: me.boundList
        };
    },
    onSelectChange: function(selModel, selections) {
        if (!this.ignoreSelectChange) {
            this.setValue(selections);
        }
    },
    getSelected: function() {
        return this.boundList.getSelectionModel().getSelection();
    },
    isEqual: function(v1, v2) {
        var fromArray = Ext.Array.from, i = 0, len;
        v1 = fromArray(v1);
        v2 = fromArray(v2);
        len = v1.length;
        if (len !== v2.length) {
            return false;
        }
        for (; i < len; i++) {
            if (v2[i] !== v1[i]) {
                return false;
            }
        }
        return true;
    },
    afterRender: function() {
        var me = this, records;
        me.callParent();
        if (me.selectOnRender) {
            records = me.getRecordsForValue(me.value);
            if (records.length) {
                ++me.ignoreSelectChange;
                me.boundList.getSelectionModel().select(records);
                --me.ignoreSelectChange;
            }
            delete me.toSelect;
        }
        if (me.ddReorder && !me.dragGroup && !me.dropGroup) {
            me.dragGroup = me.dropGroup = "MultiselectDD-" + Ext.id();
        }
        if (me.draggable || me.dragGroup) {
            me.dragZone = Ext.create("Ext.view.DragZone", {
                view: me.boundList,
                ddGroup: me.dragGroup,
                dragText: me.dragText
            });
        }
        if (me.droppable || me.dropGroup) {
            me.dropZone = Ext.create("Ext.view.DropZone", {
                view: me.boundList,
                ddGroup: me.dropGroup,
                handleNodeDrop: function(data, dropRecord, position) {
                    var view = this.view, store = view.getStore(), records = data.records, index;
                    data.view.store.remove(records);
                    index = store.indexOf(dropRecord);
                    if (position === "after") {
                        index++;
                    }
                    store.insert(index, records);
                    view.getSelectionModel().select(records);
                    me.fireEvent("drop", me, records);
                }
            });
        }
    },
    isValid: function() {
        var me = this, disabled = me.disabled, validate = me.forceValidation || !disabled;
        return validate ? me.validateValue(me.value) : disabled;
    },
    validateValue: function(value) {
        var me = this, errors = me.getErrors(value), isValid = Ext.isEmpty(errors);
        if (!me.preventMark) {
            if (isValid) {
                me.clearInvalid();
            } else {
                me.markInvalid(errors);
            }
        }
        return isValid;
    },
    markInvalid: function(errors) {
        var me = this, oldMsg = me.getActiveError();
        me.setActiveErrors(Ext.Array.from(errors));
        if (oldMsg !== me.getActiveError()) {
            me.updateLayout();
        }
    },
    clearInvalid: function() {
        var me = this, hadError = me.hasActiveError();
        me.unsetActiveError();
        if (hadError) {
            me.updateLayout();
        }
    },
    getSubmitData: function() {
        var me = this, data = null, val;
        if (!me.disabled && me.submitValue && !me.isFileUpload()) {
            val = me.getSubmitValue();
            if (val !== null) {
                data = {};
                data[me.getName()] = val;
            }
        }
        return data;
    },
    getSubmitValue: function() {
        var me = this, delimiter = me.delimiter, val = me.getValue();
        return Ext.isString(delimiter) ? val.join(delimiter) : val;
    },
    getValue: function() {
        return this.value || [];
    },
    getRecordsForValue: function(value) {
        var me = this, records = [], all = me.store.getRange(), valueField = me.valueField, i = 0, allLen = all.length, rec, j, valueLen;
        for (valueLen = value.length; i < valueLen; ++i) {
            for (j = 0; j < allLen; ++j) {
                rec = all[j];
                if (rec.get(valueField) == value[i]) {
                    records.push(rec);
                }
            }
        }
        return records;
    },
    setupValue: function(value) {
        var delimiter = this.delimiter, valueField = this.valueField, i = 0, out, len, item;
        if (Ext.isDefined(value)) {
            if (delimiter && Ext.isString(value)) {
                value = value.split(delimiter);
            } else if (!Ext.isArray(value)) {
                value = [ value ];
            }
            for (len = value.length; i < len; ++i) {
                item = value[i];
                if (item && item.isModel) {
                    value[i] = item.get(valueField);
                }
            }
            out = Ext.Array.unique(value);
        } else {
            out = [];
        }
        return out;
    },
    setValue: function(value) {
        var me = this, selModel = me.boundList.getSelectionModel(), store = me.store;
        if (!store.getCount()) {
            store.on({
                load: Ext.Function.bind(me.setValue, me, [ value ]),
                single: true
            });
            return;
        }
        value = me.setupValue(value);
        me.mixins.field.setValue.call(me, value);
        if (me.rendered) {
            ++me.ignoreSelectChange;
            selModel.deselectAll();
            selModel.select(me.getRecordsForValue(value));
            --me.ignoreSelectChange;
        } else {
            me.selectOnRender = true;
        }
    },
    clearValue: function() {
        this.setValue([]);
    },
    onEnable: function() {
        var list = this.boundList;
        this.callParent();
        if (list) {
            list.enable();
        }
    },
    onDisable: function() {
        var list = this.boundList;
        this.callParent();
        if (list) {
            list.disable();
        }
    },
    getErrors: function(value) {
        var me = this, format = Ext.String.format, errors = [], numSelected;
        value = Ext.Array.from(value || me.getValue());
        numSelected = value.length;
        if (!me.allowBlank && numSelected < 1) {
            errors.push(me.blankText);
        }
        if (numSelected < me.minSelections) {
            errors.push(format(me.minSelectionsText, me.minSelections));
        }
        if (numSelected > me.maxSelections) {
            errors.push(format(me.maxSelectionsText, me.maxSelections));
        }
        return errors;
    },
    onDestroy: function() {
        var me = this;
        me.bindStore(null);
        Ext.destroy(me.dragZone, me.dropZone);
        me.callParent();
    },
    onBindStore: function(store) {
        var boundList = this.boundList;
        if (boundList) {
            boundList.bindStore(store);
        }
    }
});