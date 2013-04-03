Ext.define('Orbium.view.ChartWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.orbiumchartwindow',
    width: 400,
    height: 500,
    minimizable: true,
    animCollapse: true,
    layout: 'fit',
    constructor: function(store, limits) {
        
        this.store = store;
        this.limits = limits;

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
                        minimum: 0,
                        maximum: 100
                    },
                    {
                        title: 'Time',
                        type: 'Numeric',
                        position: 'bottom',
                        fields: ['time'],
                        minimum: me.limits ,
                        maximum: me.limits + 5
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