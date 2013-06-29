Ext.define('Orbium.controller.Toolbar', {
    extend: 'Ext.app.Controller',
    requires: [
        'Orbium.view.form.CubeForm',
        'Orbium.view.form.SphereForm'
    ],
    init: function() {

        this.control({
            'orbiumtoolbarplayer button[action=play]': {
                click: this.onPlay
            },
            'orbiumtoolbarplayer button[action=pause]': {
                click: this.onPause
            },
            'orbiumtoolbarplayer button[action=stop]': {
                click: this.onStop
            },
            'orbiumtoolbarbodies button[action=addCube]': {
                click: this.onAddCube
            },
            'orbiumtoolbarbodies button[action=addBall]': {
                click: this.onAddSphere
            },
            'orbiumtoolbarbodies button[action=chart]': {
                click: this.onChart
            },
            'orbiumtoolbarbodies button[action=gravity]': {
                click: this.onGravity
            }
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
        var cubeform = Ext.create('Orbium.view.form.CubeForm');
        cubeform.show();

    },
    onAddSphere: function() {
        Orbium.app.consoleLog('add sphere clicked');

        var sphereform = Ext.create('Orbium.view.form.SphereForm');
        sphereform.show();
    },
    onChart: function() {
        var kbody = 0;
        var w = Ext.create('Orbium.view.ChartWindow', kbody, "Velocity vs time", "x", "y");
        w.show();
    },
    onGravity: function() {
        
    }

});
