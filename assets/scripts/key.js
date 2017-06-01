cc.Class({
    extends: cc.Component,

    properties: {
        finishPoints: { //完成碰撞的点，每个元素对应相对点的碰撞，1代表重合，0代表没有重合
            default: []
        },
        finishFlag: 0,
        length: 0,
        dispach: 0
    },

    // use this for initialization
    onLoad: function() {
        //碰撞系统开启，debug模式
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        var length = this.length;
        // manager.enabledDrawBoundingBox = true
        for (let i = 0; i < length; i++) {
            this.finishPoints[i] = 0;
        }
        this.node.on('mouseenter', () => {
            var current = cc.find('Canvas/PlayView_background').getComponent('game').currentWood;
            if (current !== 0) {
                cc.find(`Canvas/${current}`).getComponent('CustomComponent').mouseFlag = 0;
                cc.find('Canvas/PlayView_background').getComponent('game').currentWood = 0;
            }
        })
    },
    onCollisionEnter: function(other, self) {

    },
    onCollisionStay: function(other, self) {
        let selfWorld = self.world;
        let otherWorld = other.world;
        let selfPoints = selfWorld.points;
        let otherPoints = otherWorld.points;
        selfPoints.forEach((s, index) => {
            otherPoints.forEach((o) => {
                if (Math.abs(o.x - s.x) < 8 && Math.abs(o.y - s.y) < 8) {
                    this.finishPoints[index] = 1;
                }
            })
        });
        //是否每个点都已经重合
        if (this.finishPoints.every((v) => { return v === 1 })) {
            this.finishFlag = 1;
            // 弹出完成该局游戏的模态框显示完成时间，点击后进行下一局
        }

    },
    onCollisionExit: function(other, self) {
        for (let i = 0; i < this.length; i++) {
            this.finishPoints[i] = 0;
        }
    }


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});