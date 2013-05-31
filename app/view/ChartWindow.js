/**
 * Class: Orbium.view.ChartWindow
 * 
 * It's a window minimizable intended to plot cinematic data of the bodies.
 * 
 * The index of the body to plot is needed when instantiating a ChartWindow
 * 
 */
Ext.define('Orbium.view.ChartWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.orbiumchartwindow',
    width: 400,
    height: 500,
    //minimizable: true,
    animCollapse: true,
    layout: 'fit',
    resizable: false,
    constructor: function(kbody, windowTitle, magX, magY) {       

        /**
         * A model is needed to create a store, and a store is needed
         * to draw its data in a chart
         */
        Ext.define('PlotXY', {
            extend: 'Ext.data.Model',
            fields: ['x', 'y']
        });

        // The index of the body to be plotted
        this.kbody = kbody;

        this.xtitle = this.getAxeTitle(magX);
        this.ytitle = this.getAxeTitle(magY);
        this.magX = magX;
        this.magY = magY;


        this.callParent();

        this.setTitle('Body: '+ this.kbody);


//        Ext.util.Observable.observe(Orbium.app.mundo);
//
//        Orbium.app.mundo.on('startAnimation', function() {
//            Orbium.app.consoleLog('animation started');
//            me.startDraw.call(me);
//        });
//        Orbium.app.mundo.on('stopAnimation', function() {
//            Orbium.app.consoleLog('animation stoped');
//            me.stopDraw();
//        });
//        Orbium.app.mundo.on('pauseAnimation', function() {
//            Orbium.app.consoleLog('animation paused');
//            me.stopDraw();
//        });

    },
    initComponent: function() {

        var me = this;
        
        // A store is needed to initialize the chart
        // Let's start with an empty one
        var store = Ext.create('Ext.data.Store', {
            model: 'PlotXY',
            data: [{}]
        });

        var magnitudes = Ext.create('Ext.data.Store', {
            fields: ['abbr', 'name'],
            data: [
                {"abbr": "t", "name": "Time"},
                {"abbr": "x", "name": "Position X"},
                {"abbr": "y", "name": "Position Y"},
                {"abbr": "z", "name": "Position Z"},
                {"abbr": "vx", "name": "Velocity X"},
                {"abbr": "vy", "name": "Velocity Y"},
                {"abbr": "vz", "name": "Velocity Z"}

            ]
        });

        this.items = [{
                xtype: 'chart',
                style: 'background:#fff',
                store: store,
                maxHeight: 420,
                axes: [
                    {
                        title: me.ytitle,
                        type: 'Numeric',
                        position: 'left',
                        fields: ['y'],
                        minimum: 0,
                        maximum: 10
                    },
                    {
                        title: me.xtitle,
                        type: 'Numeric',
                        position: 'bottom',
                        fields: ['x'],
                        minimum: 0,
                        maximum: 10
                    }
                ],
                series: [{
                        type: 'line',
                        axis: ['left', 'bottom'],
                        xField: 'x',
                        yField: 'y',
                    }
                ]
            },
            {
                xtype: 'toolbar',
                layout: 'vbox',
                region: 'south',
                items: [
                    {
                        xtype: 'combobox',
                        fieldLabel: 'x-axe:',
                        store: magnitudes,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        editable: false,
                        value: "t",
                        listeners: {
                            'select': function(evt) {
                                clearInterval(this.intervalDrawPoint);
                                me.magX = evt.value;
                                me.xtitle = me.getAxeTitle(me.magX);
                                me_window.getComponent(0).axes.items[1].title = me.xtitle;
                                me.startDraw();
                            }
                        }
                    },
                    {
                        xtype: 'combobox',
                        fieldLabel: 'y-axe',
                        store: magnitudes,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'abbr',
                        editable: false,
                        value: "x",
                        listeners: {
                            'select': function(evt) {
                                clearInterval(this.intervalDrawPoint);
                                me.magY = evt.value;
                                me.ytitle = me.getAxeTitle(me.magY);                                
                                me_window.getComponent(0).axes.items[0].title = me.ytitle;
                                me.startDraw();
                            }
                        }
                    }
                ],
            }
        ];                
        
        this.callParent();
        this.startDraw();
    },
    getAxeTitle: function(axe) {
        var axeTitle;
        switch (axe) {
            case "x":
                axeTitle = "Position X";
                break;
            case "y":
                axeTitle = "Position Y";
                break;
            case "z":
                axeTitle = "Position Z";
                break;
            case "vx":
                axeTitle = "Velocity X";
                break;
            case "vy":
                axeTitle = "Velocity Y";
                break;
            case "vz":
                axeTitle = "Velocity Z";
                break;
            case "wx":
                axeTitle = "Angular velocity X";
                break;
            case "wy":
                axeTitle = "Angular velocity Y";
                break;
            case "wz":
                axeTitle = "Angular velocity Z";
                break;
            case "t":
                axeTitle = "Time";
                break;
        }
        return axeTitle;
    },
    getAxeValue: function(magnitude) {

        switch (magnitude) {
            case "x":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.position.x;

            case "y":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.position.y;

            case "z":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.position.z;

            case "vx":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.velocity.x;

            case "vy":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.velocity.y;

            case "vz":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.velocity.z;

            case "wx":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.angularVelocity.x;

            case "wy":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.angularVelocity.y;

            case "wz":
                return Orbium.app.mundo.bodyStore.getAt(this.kbody).physics.angularVelocity.z;

            case "t":
                return Orbium.app.mundo.physicsWorld.time;
        }


    },
    startDraw: function() {

        var me = this;

        var generateData = (function() {
            var data = [];
            return function() {
                if (data.length >= 200) {
                    data = data.slice(1, 200);
                }
                data.push({
                    y: me.getAxeValue(me.magY),
                    x: me.getAxeValue(me.magX)
                });

                return data;
            };
        })();

        var store = Ext.create('Ext.data.Store', {
            model: 'PlotXY',
            data: generateData()
        });

        var ymax, ymin, xmax, xmin;

        this.getComponent(0).store = store;

        this.getComponent(0).axes.items[0].minimum = ymin;
        this.getComponent(0).axes.items[0].maximum = ymax;
        this.getComponent(0).axes.items[1].minimum = xmin;
        this.getComponent(0).axes.items[1].maximum = xmax;

        //console.log(this.getComponent(0).axes);


        this.intervalDrawPoint = setInterval(function() {
            var gs = generateData();

            store.loadData(gs);
            ymax = store.max('y');
            ymin = store.min('y');
            xmax = store.max('x');
            xmin = store.min('x');

        }, 500);
    },
    stopDraw: function() {
        if (typeof this.intervalDrawPoint !== undefined) {
            clearInterval(this.intervalDrawPoint);
        }
    },
    listeners: {
        "minimize": function(window, opts) {

            window.collapse();
            window.setWidth(150);
            window.alignTo(Ext.getBody(), 'bl-bl');
        }
    }

});