cc.Class({
    extends: cc.Component,

    properties: {
        tip: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function() {
        cc.audioEngine.play(this.tip, true, 1);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});