Ext.define('Orbium.world.Body', {
    constructor: function(posInitial, velInitial, mass) {
        
        pos = ( typeof posInitial === 'undefined')? {} : posInitial;
        vel = ( typeof velInitial === 'undefined')? {} : velInitial;
        mass = (typeof mass       === 'undefined')? 1 : mass;
       
        this.position.x = pos.x || 0;
        this.position.y = pos.y || 0;
        this.position.z = pos.z || 0;

        this.velocity.x = vel.x || 0;
        this.velocity.x = vel.y || 0;
        this.velocity.x = vel.z || 0;

        this.mass = mass;
    },
    addToWorld: function() {

    }
});