cc.Class({
    extends: cc.Component,
    properties: {
        _canvas: null,
        points: {
            default: [],
            type: cc.Vec2,
        },
        mouseFlag: 0, // 1代表鼠标左键已经按下
        woodArr: {
            default: []
        },
        length: 0
    },


    onLoad() {
        this._canvas = cc.find('Canvas');
        this.game = cc.find('Canvas/PlayView_background').getComponent('game');
        this.key = cc.find('Canvas/key').getComponent('key');
        //获取所有木块节点数组
        this.woodArr.push(this._canvas.getChildByName('wood4'));
        this.woodArr.push(this._canvas.getChildByName('wood2'));
        this.woodArr.push(this._canvas.getChildByName('wood3'));
        this.woodArr.push(this._canvas.getChildByName('wood1'));
        this.hashWood = ['wood4', 'wood2', 'wood3', 'wood1'];
        //移动事件的监听
        this.node.on('mousedown', (e) => {
            let location = e.getLocation();
            let isContain = this.check(location);
            if (!isContain) {
                //如果在透明区域内，则手动派发一个点击事件到其余节点
                //只向自己的下一级节点派发事件  实现透明穿透
                var endEvent = new cc.Event.EventMouse(cc.Event.EventMouse.DOWN, false);
                endEvent.type = "mousedown";
                endEvent._x = e.getLocation().x;
                endEvent._y = e.getLocation().y;
                endEvent._detail = this.node.name;
                if (e.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
                    endEvent._button = cc.Event.EventMouse.BUTTON_LEFT;
                } else {
                    endEvent._button = cc.Event.EventMouse.BUTTON_RIGHT;
                }
                endEvent._propagationStopped = true;
                if (this.node.name !== 'wood4') {
                    this.woodArr[this.hashWood.indexOf(this.node.name) - 1].dispatchEvent(endEvent);
                }
                return;

            }
            if (e.getButton() === cc.Event.EventMouse.BUTTON_LEFT) {
                if (isContain) {
                    this.mouseFlag = 1; //左键按下
                    this.game.currentWood = this.node.name;
                }
            }
            if (e.getButton() === cc.Event.EventMouse.BUTTON_RIGHT) { //右键按下则是翻转
                if (isContain) {
                    var audio = cc.find('Canvas/PlayView_background').getComponent('game').woodAudio;
                    cc.audioEngine.play(audio, false, 1);
                    this.game.currentWood = this.node.name; //当前操作的木块名
                    //cc.eventManager.resumeTarget(this.node);
                    this.node.scaleX *= -1;
                    return;
                }
            }
        }, this);
        this.node.on('mouseup', (e) => {
            let location = e.getLocation();
            let isContain = this.check(location);
            if (isContain) {
                this.mouseFlag = 0;
                this.game.currentWood = 0;
            }
        }, this);
        /*
        this.node.on('mouseleave', (e) => {
            let location = e.getLocation();
            let isContain = this.check(location);
            if (isContain) {
                this.mouseFlag = 0;
                this.game.currentWood = 0;
                cc.log('mouseleave change 0');
            }
        }, this);
        */
        this.node.on('mouseenter', (e) => {
            let location = e.getLocation();
            let isContain = this.check(location);
            if (isContain) {
                if (this.game.currentWood !== 0 && this.game.currentWood !== this.node.name) {
                    cc.find(`Canvas/${this.game.currentWood}`).getComponent('CustomComponent').mouseFlag = 0;
                    this.game.currentWood = 0;
                }
            }
        });
        //按住之后开始移动
        this.node.on('mousemove', (e) => {
            let location = e.getLocation();
            let isContain = this.check(location);
            if (this.mouseFlag === 1) {
                this.node.x += e.getDelta().x;
                this.node.y += e.getDelta().y;
            }
        }, this);
        //监听滚轮事件控制旋转
        this.node.on('mousewheel', (e) => {
            if (this.mouseFlag === 1) {
                return;
            }
            let location = e.getLocation();
            let isContain = this.check(location);
            if (isContain) {
                var audio = cc.find('Canvas/PlayView_background').getComponent('game').woodAudio;
                cc.audioEngine.play(audio, false, 1);
                this.game.currentWood = this.node.name;
                if (e.getScrollY() > 0) { //当向上滚动的时候逆时针旋转
                    this.node.rotation -= 45;
                    this.game.currentWood = 0;
                } else {
                    this.node.rotation += 45;
                    this.game.currentWood = 0;
                }
                this.game.currentWood = 0;
            }
            //}
        }, this);
        this.node.on('position-changed', () => {
            for (let i = 0; i < this.length; i++) {
                this.key.finishPoints[i] = 0;
            }
            this.key.finishFlag = 0;
        });
        //当组件移动的时候恢复所有木块组件的事件监听
        /*
        this.node.on('position-changed', () => {
            let nodeArr = [];
            nodeArr.push(this._canvas.getChildByName('wood1'));
            nodeArr.push(this._canvas.getChildByName('wood2'));
            nodeArr.push(this._canvas.getChildByName('wood3'));
            nodeArr.push(this._canvas.getChildByName('wood4'));
            nodeArr.forEach((node) => {
                cc.eventManager.resumeTarget(node);
            });
        }, this);
        */
    },

    check(location) {
        let node = this.node;
        let pointInNode = node.convertToNodeSpaceAR(location);
        if (pointInNode.x < -node.width / 2 || pointInNode.x > node.width / 2 || pointInNode.y > node.height / 2 || pointInNode.y < -node.height / 2) {
            return false;
        }

        let i, j, c = false;

        let nvert = this.points.length;
        let testx = pointInNode.x;
        let testy = pointInNode.y;
        let vert = this.points;

        for (i = 0, j = nvert - 1; i < nvert; j = i++) {
            if (((vert[i].y > testy) != (vert[j].y > testy)) &&
                (testx < (vert[j].x - vert[i].x) * (testy - vert[i].y) / (vert[j].y - vert[i].y) + vert[i].x))
                c = !c;
        }

        return c;
    },
    onCollisionEnter: function(other, self) {
        if (self.node.name !== this.game.currentWood && this.game.currentWood !== 0) {
            cc.eventManager.pauseTarget(self.node);
        }
    },
    onCollisionStay: function(other, self) {

        if (this.game.currentWood === 0) {
            cc.eventManager.resumeTarget(self.node);
        } else {
            if (self.node.name !== this.game.currentWood) {
                cc.eventManager.pauseTarget(self.node);
            }
        }
    },
    onCollisionExit: function(other, self) {
        cc.eventManager.resumeTarget(self.node);
    }



});