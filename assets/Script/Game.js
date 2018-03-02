cc.Class({
    extends: cc.Component,

    properties: {
        squarePre: {
            default:null,
            type:cc.Prefab
        },
        squareBg: {
            default:null,
            type:cc.Node
        },
    },

    onLoad: function () {
        this.squares = [
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null],
            [null,null,null,null,null]
        ];

        for(var row = 0; row < 5; row++){
            for(var col = 0; col < 5; col++){
                var square = cc.instantiate(this.squarePre);
                square.getComponent("Square").game = this;
                square.getComponent("Square").setArrPos(row,col);
                this.squares[row][col] = square;
                var randomNum = 1;
                while(true){
                    var arr = new Array();
                    var scanArr = new Array();
                    randomNum = parseInt(Math.random()*7 + 1);
                    square.getComponent("Square").num = randomNum;
                    this.scanAroundNum(randomNum,row,col,arr,scanArr);
                    if(arr.length<3){
                        break;
                    }
                }
                square.getComponent("Square").setNum(parseInt(randomNum),false);
                var posX = 5 + square.width/2 + (square.width + 5)*col;
                var posY = 5 + square.height/2 + (square.height + 5)*row;
                square.setPosition(posX,posY);
                this.squareBg.addChild(square);
            }
        }
    },

    scanAroundNum:function(num,row,col,arr,scanArr){
        if(this.squares[row][col] == null) {
            return;
        }
        if(scanArr == undefined){
            scanArr = new Array();
        }
        var isClear = false
        if(scanArr.indexOf(row+"#"+col)==-1){
            scanArr.push(row+"#"+col);
        }else{
            return;
        }
        // up
        if(row<4 && this.squares[row+1][col] != null){
            var nexNum = this.squares[row+1][col].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row+1,col,arr,scanArr);
                isClear = true;
            }
        }
        // down
        if(row>0 && this.squares[row-1][col] != null){
            var nexNum = this.squares[row-1][col].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row-1,col,arr,scanArr);
                isClear = true;
            }
        }
        // left
        if(col<4 && this.squares[row][col+1] != null){
            var nexNum = this.squares[row][col+1].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row,col+1,arr,scanArr);
                isClear = true;
            }
        }
        // right
        if(col>0 && this.squares[row][col-1] != null){
            var nexNum = this.squares[row][col-1].getComponent("Square").num;
            if(num == nexNum){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
                this.scanAroundNum(num,row,col-1,arr,scanArr);
                isClear = true;
            }
        }
        if(!isClear){
            var curNum = this.squares[row][col].getComponent("Square").num;
            if(curNum==num){
                if(arr.indexOf(row+"#"+col)==-1){
                    arr.push(row+"#"+col);
                }
            }
        }
    },

    operateLogic:function(num,touchRow,touchCol){
        var arr = new Array();
        var scanArr = new Array();
        this.scanAroundNum(num,touchRow,touchCol,arr,scanArr);
        if(arr.length>=3){
            for(var index in arr){
                var row = arr[index].split("#")[0];
                var col = arr[index].split("#")[1];
                this.squares[row][col].getComponent("Square").destorySquare();
            }
        }
    },

    // update: function (dt) {

    // },
});
