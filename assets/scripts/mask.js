cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function() {
        this.wood = cc.find('Canvas/wood').getComponent('wood');
        //创建一个透明遮罩，响应鼠标松开与鼠标移动事件
        this.node.on('mouseup', () => {
            if (this.wood.currentWood !== 0) {
                let temp = this.wood.getChildByName(this.wood.currentWood);
                temp.mouseFlag = 0;
                //操作结束  当前操作木块置0
                this.wood.currentWood = 0;
            }
        });
        this.node.on('mousemove', (e) => {
            if (this.wood.currentWood !== 0) {
                let temp = this.wood.getChildByName(this.wood.currentWood);
                if (temp.mouseFlag === 1) {
                    this.node.x += e.getDelta().x;
                    this.node.y += e.getDelta().y;
                }
            }
        })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});