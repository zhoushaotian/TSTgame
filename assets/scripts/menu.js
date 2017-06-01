cc.Class({
    extends: cc.Component,

    properties: {
        buttonAudio: {
            url: cc.AudioClip,
            default: null
        },
        startAudio: {
            url: cc.AudioClip,
            default: null
        },
        finishAudio: {
            url: cc.AudioClip,
            default: null
        },
        errorAudio: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function() {},

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    startGame: function() {
        cc.audioEngine.play(this.startAudio, false, 1);
        cc.director.loadScene("playView");
    },
    back: function() {
        cc.audioEngine.pauseAll();
        cc.audioEngine.play(this.buttonAudio, false, 1);
        if (cc.find('time')) {
            cc.game.removePersistRootNode(cc.find('time'));
        }
        cc.director.loadScene('fristView');
    },
    check: function(event, next) {
        var finishFlag = cc.find('Canvas/key').getComponent('key').finishFlag;
        if (finishFlag) {
            var game = cc.find('Canvas/PlayView_background').getComponent('game');
            cc.director.getScheduler().pauseTarget(game); //暂停定时器
            cc.audioEngine.play(this.finishAudio, false, 1);
            cc.director.loadScene(next);
        } else {
            cc.audioEngine.play(this.errorAudio, false, 1);
        }
    },
    backFistView: function() {
        let tip = cc.find('Canvas/tip').getComponent('tip').tip;
        cc.audioEngine.uncache(tip);
        cc.audioEngine.play(this.buttonAudio, false, 1);
        cc.director.loadScene('fristView');
    },
    enterInfor: function() {
        cc.audioEngine.play(this.buttonAudio, false, 1);
        cc.director.loadScene('tip');
    },
    Again: function() {
        let over = cc.find('Canvas/Again').getComponent('over').over
        cc.audioEngine.uncache(over);
        cc.audioEngine.play(this.buttonAudio, false, 1);
        cc.director.loadScene('fristView');
    }
});