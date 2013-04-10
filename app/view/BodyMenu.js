Ext.define('Orbium.view.BodyMenu', {
    extend: 'Ext.menu.Menu',
    width: 100,
    margin: '0 0 10 0',
    floating: true, 
//    renderTo: Ext.getBody(), // usually rendered by it's containing component
    items: [{
            text: 'regular item 1'
        }, {
            text: 'regular item 2'
        }, {
            text: 'regular item 3'
        }]
});



