Ext.define('Orbium.view.ChartWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.orbiumchartwindow',
    width: 400,
    height: 500,
    minimizable: true,
    animCollapse: true,
    layout: 'fit',
    constructor: function(kbody) {
        var me = this;
        Ext.define('Velocity', {
            extend: 'Ext.data.Model',
            fields: ['velocity', 'time']
        });

        this.kbody = kbody;

        this.callParent();
        Ext.util.Observable.observe(Orbium.app.mundo);

        Orbium.app.mundo.on('startAnimation', function() {
            Orbium.app.consoleLog('animation started');
            me.startDraw.call(me);
        });
        Orbium.app.mundo.on('stopAnimation', function() {
            Orbium.app.consoleLog('animation stoped');
            me.stopDraw();
        });
        Orbium.app.mundo.on('pauseAnimation', function() {
            Orbium.app.consoleLog('animation paused');
            me.stopDraw();
        });

    },
    initComponent: function() {

        var store = Ext.create('Ext.data.Store', {
            model: 'Velocity',
            data: [{}]
        });
       
        this.items = [{
                xtype: 'chart',
                style: 'background:#fff',
                store: store,
                axes: [
                    {
                        title: 'Velocity',
                        type: 'Numeric',
                        position: 'left',
                        fields: ['velocity'],
                        minimum: 0,
                        maximum: 10
                    },
                    {
                        title: 'Time',
                        type: 'Numeric',
                        position: 'bottom',
                        fields: ['time'],
                        minimum: 0,
                        maximum: 10
                    }
                ],
                series: [{
                        type: 'line',
                        axis: ['left', 'bottom'],
                        xField: 'time',
                        yField: 'velocity',
                    }
                ]
            }];

        this.callParent();
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
                    velocity: Orbium.app.mundo.bodies[me.kbody].physics.position.y,
                    time: Orbium.app.mundo.physicsWorld.time
                });

                //last = data[data.length - 1];
                return data;
            };
        })();

        var store = Ext.create('Ext.data.Store', {
            model: 'Velocity',
            data: generateData()
        });

        var vmax, vmin, tmax, tmin;

        this.getComponent(0).store = store;

        this.getComponent(0).axes.items[0].minimum = vmin;
        this.getComponent(0).axes.items[0].maximum = vmax;
        this.getComponent(0).axes.items[1].minimum = tmin;
        this.getComponent(0).axes.items[1].maximum = tmax;
        
        console.log(this.getComponent(0).axes);


        this.intervalDrawPoint = setInterval(function() {                      
            var gs = generateData();

            store.loadData(gs);
            vmax = store.max('velocity');
            vmin = store.min('velocity');
            tmax = store.max('time');
            tmin = store.min('time');

        }, 50);
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