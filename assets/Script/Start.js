cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel:cc.Node,
        bgSpr:cc.Node,
        startBtn:cc.Node,
        btnEffect:cc.AudioClip
    },

    onLoad: function () {
        // this.bgSpr.width = cc.winSize.width;
        // this.bgSpr.height = cc.winSize.height;
        // this.bgSpr.setPosition(this.bgSpr.width/2,this.bgSpr.height/2);

        var action = cc.repeatForever(cc.sequence(cc.scaleTo(1,1.5),cc.scaleTo(1,1)));
        this.nameLabel.runAction(action);

    },

    startGame: function () {
        cc.audioEngine.playEffect(this.btnEffect);
        cc.director.loadScene("GameScene")
    },

    // update: function (dt) {

    // },
});
