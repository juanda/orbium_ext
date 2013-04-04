Ext.define('Orbium.view.ChartWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.orbiumchartwindow',
    width: 400,
    height: 500,
    minimizable: true,
    animCollapse: true,
    layout: 'fit',
    constructor: function(store, vmax, vmin, tmax, tmin) {
        
        this.store = store;
        this.vmax = vmax;
        this.vmin = vmin;
        this.tmax = tmax;
        this.tmin = tmin;

        this.callParent();

    },
    initComponent: function() {
        
        var me = this;
        this.items = [{
                xtype: 'chart',
                style: 'background:#fff',
                store: me.store,
                axes: [
                    {
                        title: 'Velocity',
                        type: 'Numeric',
                        position: 'left',
                        fields: ['velocity'],
                        minimum: me.vmin,
                        maximum: me.vmax
                    },
                    {
                        title: 'Time',
                        type: 'Numeric',
                        position: 'bottom',
                        fields: ['time'],
                        minimum: me.tmin ,
                        maximum: me.tmax
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
    listeners: {
        "minimize": function(window, opts) {

            window.collapse();
            window.setWidth(150);
            window.alignTo(Ext.getBody(), 'bl-bl');
        }
    }

});