Ext.define('Orbium.view.BodyMenu', {
    extend: 'Ext.menu.Menu',
    alias: 'widget.orbiumbodymenu',
    width: 150,
    plain: true,
    floating: true,
    renderTo: Ext.getBody(), // usually rendered by it's containing component
    items: [{
            text: 'change properties',
            id: 'change_properties'
        }, {
            text: 'display graph',
            id: 'display_graph'
        }]

});



