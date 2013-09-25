Ext.define('IDE.view.CollisionEditor', {

    extend : "Ext.panel.Panel",

    alias: 'widget.collisionEditor',

    title : 'Collision Editor',

    layout : 'fit',

    imageOffset : {
        x : 0,
        y : 0
    },

    currentStackColor : 'stack_000000',

    stacks : {},

    mesh : {},

    initComponent : function() {

        var me = this;

        Ext.apply(this, {
            items: {
                xtype : 'panel',
                layout : 'fit',
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [{
                        text: '打开地图 (Ctrl+R)',
                        handler : function() {
                            me.openAnImage();
                        }
                    }, {
                        xtype : 'tbspacer'
                    }, {
                        text: '导入一组 (Ctrl+F)',
                        handler : function() {
                            me.importData();
                        }
                    }, {
                        text: '导出当前分组 (Ctrl+S)',
                        handler : function() {
                            me.exportData();
                        }
                    }, {
                        text: '构建网格',
                        handler : function() {
                            me.buildMesh();
                        }
                    }, {
                        text : '导出网络',
                        handler : function() {
                            me.exportMesh();
                        }
                    }, {
                        xtype : 'tbspacer'
                    }, {
                        iconCls : 'group_btn_icon',
                        text : '选择已有分组',
                        menu : {
                            items: [{
                                text : '新分组',
                                menu: Ext.create('Ext.menu.ColorPicker', {
                                    value: '000000',
                                    listeners : {
                                        select : function(_, colorVal) {
                                            me.selectGroupByColor('#' + colorVal);
                                        }
                                    }
                                })
                            }, {
                                iconCls : 'menu_icon_000000',
                                text : '#000000',
                                handler : function(view) {
                                    me.selectGroupByColor(view.text);
                                }
                            }],
                            listeners : {
                                beforeshow : function(menu) {
                                    for(var name in me.stacks) {
                                        var cssColor = me.getStackColor(name);
                                        if(cssColor === '#000000') {
                                            continue;
                                        }
                                        var id = 'menu_icon_' + cssColor.replace('#', '');
                                        if(Ext.query('.' + id).length > 0) {
                                            continue;
                                        }
                                        menu.add(Ext.create('Ext.menu.Item', {
                                            flag : 'clearableItem',
                                            iconCls : id,
                                            text : cssColor,
                                            handler : function(view) {
                                                me.selectGroupByColor(view.text);
                                            }
                                        }));
                                    }
                                    setTimeout(function() {
                                        for(var name in me.stacks) {
                                            var color = me.getStackColor(name).replace('#', '');
                                            Ext.select('.menu_icon_' + color)
                                                .setStyle('background-color', '#' + color);
                                        }
                                    }, 10);

                                }
                            }
                        }
                    }, {
                        xtype : 'tbspacer'
                    }, {
                        text: '上一步 (Ctrl+Z)',
                        handler : function() {
                            me.returnStep();
                        }
                    }, {
                        text: '合并 (Ctrl+E)',
                        handler : function() {
                            me.combineCurrentStack();
                        }
                    }, {
                        text: '清除所有 (Ctrl+X)',
                        handler : function() {
                            Ext.Msg.confirm('Confirm', '确定清除?', function(btn) {
                                if(btn === 'yes' || btn === 'ok') {
                                    me.clearAll();
                                }
                            });

                        }
                    }]
                }],
                items : [{
                    xtype : 'box',
                    autoEl : {
                        tag: 'div',
                        html : '<div style="position: relative">' +
                            '<img id="img" src="#" style="position: absolute; top: 0; left: 0;">' +
                            '<canvas id="canvas" style="position: absolute; top: 0; left: 0;"></canvas></div>'
                    },
                    listeners : {
                        render : function() {
                            var mouseDown = false;
                            var movePoint;
                            var canvas = document.getElementById('canvas');
                            var lastPos;

                            canvas.addEventListener('mousedown', function(e) {
                                movePoint = me.getPointByXY(e.offsetX-me.imageOffset.x, e.offsetY-me.imageOffset.y);
                                mouseDown = true;
                                lastPos = {
                                    x : e.offsetX,
                                    y : e.offsetY
                                };
                            });

                            canvas.addEventListener('mousemove', function(e) {
                                if(mouseDown) {
                                    var deltaX = e.offsetX - lastPos.x;
                                    var deltaY = e.offsetY - lastPos.y;
                                    lastPos = {
                                        x : e.offsetX,
                                        y : e.offsetY
                                    };
                                    if(movePoint) {
                                        movePoint.x += deltaX;
                                        movePoint.y += deltaY;
                                        me.redrawStack();
                                    } else {
                                        me.resetImageOffset(deltaX, deltaY);
                                    }
                                }
                            });

                            window.addEventListener('mouseup', function(e) {
                                mouseDown = false;
                                movePoint = null;
                            });

                            canvas.addEventListener('dblclick', function(e) {
                                me.dblclickImagePosition(e.offsetX-me.imageOffset.x, e.offsetY-me.imageOffset.y);
                            });

                            canvas.addEventListener('contextmenu', function(e) {
                                var point = me.getPointByXY(e.offsetX-me.imageOffset.x, e.offsetY-me.imageOffset.y);
                                if(point) {
                                    Ext.create('Ext.menu.Menu', {
                                        items : [{
                                            text : '插入一个点',
                                            handler : function() {
                                                me.insertPointAt(point);
                                            }
                                        }, {
                                            text : '删除该点',
                                            handler : function() {
                                                me.deletePoint(point);
                                            }
                                        }]
                                    }).showAt(e.pageX, e.pageY);
                                }
                            });
                        },
                        resize : function(component, width, height) {
                            var canvas = document.getElementById('canvas');
                            canvas.width = width;
                            canvas.height = height;
                            canvas.style.webkitUserSelect = 'none';
                        }
                    }
                }]
            }
        });

        this.callParent(arguments);

        var keyMap = {
            83 : 's',
            68 : 'd',
            69 : 'e',
            90 : 'z'
        };

        window.addEventListener('keydown', function(e) {
            if(e.metaKey || e.ctrlKey) {
                switch(e.keyCode) {
                    case 83 :
                        me.exportData();
                        break;
                    case 70 :
                        me.importData();
                        break;
                    case 69 :
                        me.combineCurrentStack();
                        break;
                    case 90 :
                        me.returnStep();
                        break;
                    case 82 :
                        me.openAnImage();
                        break;
                    case 88 :
                        me.clearAll();
                }
            }
        });
    },

    openAnImage : function() {
        var me = this;
        IDE.base.FileDialog.open(function(file) {
            if(!file) return;
            document.getElementById('img').src = file;
            me.imageOffset.x = 0;
            me.imageOffset.y = 0;
            me.resetImageOffset(0, 0);
        });
    },

    importData : function() {
        var me = this;
        IDE.base.FileDialog.open(function(file) {
            if(!file) return;
            var data = fs.readFileSync(file, 'utf8');
            me.stacks[me.currentStackColor] = JSON.parse(data);
            me.redrawStack();
        });
    },

    exportData : function() {
        var me = this;
        var stack = me.stacks[me.currentStackColor];
        if(!stack) {
            Ext.Msg.alert('Warn', '当前分组没有数据!');
        } else {
            IDE.base.FileDialog.open(true, function(file) {
                if(!file) return;
                console.log(file);
                fs.writeFile(file, JSON.stringify(stack, null, "\t"), function(err) {
                    console.log(err);
                });
            });
        }
    },

    buildMesh : function() {
        var me = this;
        var stack = me.stacks[me.currentStackColor];
        if(!stack) {
            Ext.Msg.alert('Warn', '当前分组没有数据!');
        } else {
            me.mesh[me.currentStackColor] = new navmesh.Path(stack);
            me.redrawStack();
        }
    },

    exportMesh : function() {
        var mesh = this.mesh[this.currentStackColor];
        if(!mesh) {
            Ext.Msg.alert('Warn', '当前分组没有数据!');
        } else {
            var i, len, trg;
            var triangleV = mesh.triangleV;
            var triangleVData = [];
            for (i=0, len=triangleV.length; i<len; i++) {
                trg = triangleV[i];
                triangleVData.push({
                    a : {
                        x : trg.pointA.x,
                        y : trg.pointA.y
                    },
                    b : {
                        x : trg.pointB.x,
                        y : trg.pointB.y
                    },
                    c : {
                        x : trg.pointC.x,
                        y : trg.pointC.y
                    }
                });
            }
            IDE.base.FileDialog.open(true, function(file) {
                if(!file) return;
                console.log(file);
                fs.writeFile(file, JSON.stringify(triangleVData, null, "\t"), function(err) {
                    console.log(err);
                });
            });
        }
    },

    getPointByXY : function(x, y) {
        var currentStack = this.stacks[this.currentStackColor];
        if(currentStack) {
            for(var i=0; i<currentStack.length; i++) {
                var p = currentStack[i];
                if(p === 'combine') {
                    continue;
                }
                if(Math.abs(x-p.x) < 5 && Math.abs(y-p.y) < 5) {
                    return p;
                }
            }
        }
        return null;
    },

    deletePoint : function(point) {
        var currentStack = this.stacks[this.currentStackColor];
        if(currentStack) {
            for(var i=0; i<currentStack.length; i++) {
                var p = currentStack[i];
                if(p === point) {
                    currentStack.splice(i, 1);
                    this.redrawStack();
                    return;
                }
            }
        }
    },

    insertPointAt : function(point) {
        var currentStack = this.stacks[this.currentStackColor];
        var newPoint = {
            x : point.x - 10,
            y : point.y - 10
        };
        if(currentStack) {
            for(var i=0; i<currentStack.length; i++) {
                var p = currentStack[i];
                if(p === point) {
                    currentStack.splice(i, 0, newPoint);
                    this.redrawStack();
                    return;
                }
            }
        }
    },

    clearAll : function() {
        this.currentStackColor = 'stack_000000';
        var clearables = Ext.ComponentQuery.query('menuitem[flag=clearableItem]');
        for(var i= 0; i<clearables.length; i++) {
            clearables[i].parentMenu.remove(clearables[i], true);
        }
        this.stacks = {};
        this.selectGroupByColor('#000000');
        this.redrawStack();
    },

    selectGroupByColor : function(colorVal) {
        this.currentStackColor = 'stack_' + colorVal.replace('#', '');
        Ext.select('.group_btn_icon').setStyle('background-color', colorVal);
    },

    getStackColor : function(stackName) {
        return '#' + stackName.replace('stack_', '')
    },

    resetImageOffset : function(deltaX, deltaY) {
        this.imageOffset.x += deltaX;
        this.imageOffset.y += deltaY;
        var img = document.getElementById('img');
        img.style.left = this.imageOffset.x + 'px';
        img.style.top = this.imageOffset.y + 'px';
        this.redrawStack();
    },

    returnStep : function() {
        var currentStack = this.stacks[this.currentStackColor];
        if(!currentStack) {
            return;
        }
        currentStack.splice(currentStack.length-1, 1);
        this.redrawStack();
    },

    combineCurrentStack : function() {
        var currentStack = this.stacks[this.currentStackColor];
        if(!currentStack) {
            return;
        }
        if('combine' === currentStack[currentStack.length-1]) {
            return;
        }
        currentStack.push('combine');
        this.redrawStack();
    },

    dblclickImagePosition : function(x, y) {
        var currentStack = this.stacks[this.currentStackColor];
        if(!currentStack) {
            currentStack = this.stacks[this.currentStackColor] = [];
        }
        currentStack.push({
            x : x,
            y : y
        });
        this.redrawStack();
    },

    redrawStack : function() {
        var canvas = document.getElementById('canvas');
        var thisWidth = canvas.width;
        canvas.width = 0;
        canvas.width = thisWidth;
        var ctx = canvas.getContext('2d');
        ctx.save();
        ctx.translate(this.imageOffset.x,this.imageOffset.y);
        var i, len;
        for(var name in this.stacks) {
            var stack = this.stacks[name];
            ctx.strokeStyle = this.getStackColor(name);
            ctx.lineWidth = 4;
            var first = stack[0];
            ctx.beginPath();
            ctx.moveTo(first.x, first.y);
            for(i=1; i<stack.length; i++) {
                if(stack[i] !== 'combine') {
                    ctx.lineTo(stack[i].x, stack[i].y);
                } else {
                    ctx.lineTo(first.x, first.y);
                    ctx.stroke();
                    i++;
                    first = stack[i];
                    if(first) {
                        ctx.moveTo(first.x, first.y);
                    }
                }
            }
            var path = this.mesh[name];
            if(path) {
                path.draw(ctx);
            }
            ctx.stroke();

            ctx.fillStyle = 'yellow';
            for(i=0,len=stack.length; i<len; i++) {
                if(stack[i] === 'combine') {
                    continue;
                }
                ctx.fillRect(stack[i].x-5, stack[i].y-5, 10, 10);
            }
        }
        ctx.restore();
    }

});