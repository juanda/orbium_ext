Ext.define('Orbium.controller.Toolbar', {
    extend: 'Ext.app.Controller',
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
        Orbium.app.mundo.addCube();
    },
    onAddSphere: function() {
        Orbium.app.consoleLog('add sphere clicked');
        Orbium.app.mundo.addSphere();
    },
    onChart: function() {
        Ext.define('Velocity', {
            extend: 'Ext.data.Model',
            fields: ['velocity', 'time']
        });

        var generateData = (function() {
            var data = [];
            return function() {
                if (data.length >= 100) {
                    data = data.slice(1, 100);
                }
                data.push({
                    velocity: Orbium.app.mundo.bodies[0].physics.position.x,
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

        var limits = 0;
        
        var i = 1;

        var intr = setInterval(function() {
            var gs = generateData();

            store.loadData(gs);
            limits = i++;
            //console.log(limits);
//                    = {
//                max: store.max('velocity'),
//                min: store.min('velocity'),
//                tmax: store.max('time'),
//                tmin: store.min('time')
//            };
        }, 100);

        var w = Ext.create('Orbium.view.ChartWindow', store, limits);
        w.setTitle('Velocity vs time');
        w.show();
    }
});
