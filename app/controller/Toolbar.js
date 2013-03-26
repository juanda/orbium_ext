Ext.define('Orbium.controller.Toolbar', {
    extend: 'Ext.app.Controller',
    init: function() {

        this.control({
            'orbiumtoolbar button[action=play]': {
                click: this.onPlay
            },
            'orbiumtoolbar button[action=pause]': {
                click: this.onPause
            },
            'orbiumtoolbar button[action=stop]': {
                click: this.onStop
            },
            'orbiumtoolbar button[action=addCube]': {
                click: this.onAddCube
            },
            'orbiumtoolbar button[action=addBall]': {
                click: this.onAddBall
            },
        });
    },
    onPlay: function() {
        Orbium.app.consoleLog('play clicked');
        Orbium.app.mundo.startAnimation();
    },
    onPause: function() {
        Orbium.app.consoleLog('pause clicked');
        Orbium.app.mundo.pauseAnimation();
    },
    onStop: function() {
        Orbium.app.consoleLog('stop clicked');
        Orbium.app.mundo.stopAnimation();
    },
    onAddCube: function() {
        Orbium.app.consoleLog('add cube clicked');
        Orbium.app.mundo.addCube();
    },
    onAddBall: function() {
        Orbium.app.consoleLog('add ball clicked');
        Orbium.app.mundo.addBall();
    }
});
