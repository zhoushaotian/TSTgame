cc.Class({
    extends: cc.Component,

    properties: {
        bgm: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function() {
        cc.game.addPersistRootNode(this.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});