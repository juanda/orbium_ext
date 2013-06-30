Ext.define('Orbium.controller.Toolbar', {
    extend: 'Ext.app.Controller',
    requires: [
    'Orbium.view.form.CubeForm',
    'Orbium.view.form.SphereForm'
    ],
    refs: [
        {
            ref: 'btnPlay',
            selector: 'orbiumtoolbarplayer button[action=play]'
        },
        {
            ref: 'btnGravity',
            selector: 'orbiumtoolbarbodies button[action=gravity]'
        },        
        {
            ref: 'btnFloor',
            selector: 'orbiumtoolbarbodies button[action=floor]'
        }
    ],
    init: function() {

        this.control({
            'orbiumtoolbarplayer button[action=play]': {
                click: this.onPlay
            },
            'orbiumtoolbarplayer button[action=reset]': {
                click: this.onReset
            },
            'orbiumtoolbarbodies button[action=addCube]': {
                click: this.onAddCube
            },
            'orbiumtoolbarbodies button[action=addBall]': {
                click: this.onAddSphere
            },            
            'orbiumtoolbarbodies button[action=floor]': {
                click: this.onFloor
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
        if(this.getBtnPlay().pressed){
            Orbium.app.mundo.startAnimation();

            console.log(this.getBtnPlay());
            this.getBtnPlay().setText("Pause");            
        }
        else{
            Orbium.app.mundo.pauseAnimation();          
            this.getBtnPlay().setText("Play");
        }
    },
    onPause: function() {       
        Orbium.app.mundo.pauseAnimation();
    },
    onReset: function() {        
        this.getBtnPlay().pressed = false;
        this.getBtnPlay().setText("Play");
        Orbium.app.mundo.resetAnimation();
    },
    onAddCube: function() {        
        var cubeform = Ext.create('Orbium.view.form.CubeForm');
        cubeform.show();

    },
    onFloor: function(){
        if(this.getBtnFloor().pressed)
            Orbium.app.mundo.addFloor();
        else
            Orbium.app.mundo.removeFloor();
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
        if(this.getBtnGravity().pressed)
            Orbium.app.mundo.physicsWorld.setGravity([0,0,0]);
        else
            Orbium.app.mundo.physicsWorld.setGravity([0,-10 ,0]);
    }

});
