cc.Class({
    extends: cc.Component,

    properties: {
        mounseFlag: 0, // woodNum, 0 is none
        scaleFlag: [cc.Integer], //0 is x , 1 is y
        time: {
            default: null,
            type: cc.Node
        },
        roundNum: {
            default: null,
            type: cc.Node
        },
        currentWood: 0,
        woodAudio: {
            url: cc.AudioClip,
            default: null
        },
        woodArr: {
            default: []
        }

    },

    // use this for initialization
    onLoad: function() {
        this._canvas = cc.find('Canvas');
        this.woodArr.push(this._canvas.getChildByName('wood1'));
        this.woodArr.push(this._canvas.getChildByName('wood2'));
        this.woodArr.push(this._canvas.getChildByName('wood3'));
        this.woodArr.push(this._canvas.getChildByName('wood4'));
        //获取四个木块节点
        this.roundNum = this.roundNum.getComponent('cc.Label');
        this.time = this.time.getComponent('cc.Label');
        this.time.string = 0
        cc.director.getScheduler().schedule(() => {
            this.time.string += 1;
        }, this, 1);
        this.node.on('mouseenter', (e) => {
            var current = cc.find('Canvas/PlayView_background').getComponent('game').currentWood;
            if (current !== 0) {
                cc.find(`Canvas/${current}`).getComponent('CustomComponent').mouseFlag = 0;
                cc.find('Canvas/PlayView_background').getComponent('game').currentWood = 0;
            }
        })

    },
    //click events

    // called every frame, uncomment this function to activate update callback
    update: function(dt) {
        if (this.currentWood !== 0) {
            this.woodArr.forEach((e, index) => {
                if (e.name !== this.currentWood) {
                    cc.eventManager.pauseTarget(e);
                }
            });
        } else {
            this.woodArr.forEach((e) => {
                cc.eventManager.resumeTarget(e);
            })
        }
    },
});