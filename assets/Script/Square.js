var Colors = require("Color");

cc.Class({
    extends: cc.Component,

    properties: {
        numLabel:{
            default:null,
            type:cc.Label
        },
        num:0
    },

    // use this for initialization
    onLoad: function () {
        var self = this;
        this.node.on(cc.Node.EventType.TOUCH_START,function(event){
            self.setNum(parseInt(self.numLabel.string)+1,true);
        },this.node);
    },

    destorySquare:function(){
        var action = cc.sequence(cc.scaleTo(0.1,0),cc.callFunc(function(node){
            node.destroy();
        },this.node,this.node));
        this.node.runAction(action);
        this.game.squares[this.row][this.col] = null;
    },

    setArrPos:function(row,col){
        this.row = row;
        this.col = col;
    },

    setNum:function(num,exeLogic){
        this.numLabel.string = num;
        this.num = num;
        switch(num){
            case 1:
                this.node.color = Colors.num1;
                break;
            case 2:
                this.node.color = Colors.num2;
                break;
            case 3:
                this.node.color = Colors.num3;
                break;  
            case 4:
                this.node.color = Colors.num4;
                break;
            case 5:
                this.node.color = Colors.num5;
                break;
            case 6:
                this.node.color = Colors.num6;
                break;  
            case 7:
                this.node.color = Colors.num7;
                break;
            case 8:
                this.node.color = Colors.num8;
                break;
            case 9:
                this.node.color = Colors.num9;
                break;  
            case 10:
                this.node.color = Colors.num10;
                break;
            case 11:
                this.node.color = Colors.num11;
                break;
            case 12:
                this.node.color = Colors.num12;
                break;  
            case 13:
                this.node.color = Colors.num13;
                break;
            case 14:
                this.node.color = Colors.num14;
                break;
            case 15:
                this.node.color = Colors.num15;
                break;
            case 16:
                this.node.color = Colors.num16;
                break;
            case 17:
                this.node.color = Colors.num17;
                break;
            case 18:
                this.node.color = Colors.num18;
                break;
            case 19:
                this.node.color = Colors.num19;
                break;
            case 20:
                this.node.color = Colors.num20;
                break;
            default:
                this.node.color = Colors.nums;
                break;
        }
        // this.node.runAction(cc.sequence(cc.scaleTo(0.15,1.5),cc.scaleTo(0.15,1)));
        if(exeLogic){
            this.game.operateLogic(this.num,this.row,this.col);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
