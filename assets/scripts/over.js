cc.Class({
    extends: cc.Component,

    properties: {
        over: {
            url: cc.AudioClip,
            default: null
        }
    },

    // use this for initialization
    onLoad: function() {
        //停止播放bgm
        let bgm = cc.find('bgm').getComponent('bgm').bgm;
        cc.audioEngine.uncache(bgm);
        cc.game.removePersistRootNode(cc.find('bgm')); //销毁常驻节点bgm
        //播放本场景的背景音乐
        cc.audioEngine.play(this.over, true, 1);
        this.overtime = cc.find('time').getComponent('time').time;
        cc.game.removePersistRootNode(cc.find('time'));
        cc.find('Canvas/timeStr').getComponent('cc.Label').string = `${this.overtime}秒`;
        var l = this.overtime;
        var str = '';
        var detail = '';
        switch (true) {
            case l < 180:
                str = "最强王者";
                detail = "少侠骨骼惊奇可否担任我们的DJ？"
                break;
            case l >= 180 && l < 300:
                str = "超凡大师";
                detail = "再努力一点你就可以和李术一战了！"
                break;
            case l >= 300 && l < 600:
                str = "璀璨钻石";
                detail = "再玩一把你就可以和李元术一战了！"
                break;
            case l >= 600 && l < 900:
                str = "华贵铂金";
                detail = "加油，快赶上周绍天了"
                break;
            case l >= 900 && l < 1200:
                str = "荣耀黄金";
                detail = "你是一个有天赋的选手再努力点能超过戴思颖了"
                break;
            case l >= 1200 && l < 1500:
                str = "不屈白银";
                detail = "胜败乃兵家常事，少侠从新来过吧"
                break;
            case l >= 1500:
                str = "英勇青铜";
                detail = "你是要准备反向冲王者吗？"
                break;
        };
        cc.find('Canvas/level').getComponent('cc.Label').string = str;
        cc.find('Canvas/detail').getComponent('cc.Label').string = detail;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});