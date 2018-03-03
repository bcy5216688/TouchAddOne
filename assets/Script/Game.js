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
        this.checkArr = [];
        this.spawnSquares();
    },

    spawnSquares: function () {
        for(var row = 0; row < 5; row++){
            for(var col = 0; col < 5; col++){
                if (this.squares[row][col] == null) {
                    var square = cc.instantiate(this.squarePre);
                    this.squareBg.addChild(square);
                    var squareScript = square.getComponent("Square");
                    squareScript.game = this;
                    this.squares[row][col] = square;
                    var randomNum = 1;
                    while(true){
                        var arr = new Array();
                        var scanArr = new Array();
                        randomNum = parseInt(Math.random()*7 + 1);
                        squareScript.num = randomNum;
                        this.scanAroundNum(randomNum,row,col,arr,scanArr);
                        if(arr.length<3){
                            break;
                        }
                    }
                    squareScript.setNum(parseInt(randomNum),false);
                    squareScript.newSquare(row,col);
                }
            }
        }
    },

    scanAroundNum: function (num,row,col,arr,scanArr) {
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

    operateLogic: function (num,touchRow,touchCol) {
        var arr = new Array();
        var scanArr = new Array();
        this.scanAroundNum(num,touchRow,touchCol,arr,scanArr);
        var colArr = new Array();
        if(arr.length >= 3) {
            for(var index in arr) { 
                var row = arr[index].split("#")[0];
                var col = arr[index].split("#")[1];
                this.squares[row][col].getComponent("Square").destorySquare();
                this.squares[row][col] = null;
                if (colArr.indexOf(col) == -1) {
                    colArr.push(col);
                }
            }
            this.checkAndMoveSquares(colArr);
            var delay = cc.delayTime(0.2);
            var endFunc = cc.callFunc(function() {
                this.spawnSquares();
            }.bind(this));
            var checkFunc = cc.callFunc(function() {
                this.checkMovedSquares();
            }.bind(this));
            var seqAction = cc.sequence(delay,endFunc,cc.delayTime(0.4),checkFunc);
            this.node.runAction(seqAction);
        }
    },

    checkAndMoveSquares: function (colArr) {
        cc.log("colArr length:",colArr.length);
        for (var index in colArr) {
            var col = colArr[index];
            cc.log("col:",col);
            for (var row = 0; row < 5; row++) {
                if (this.squares[row][col] != null ) {
                    for (var i = 0; i < row; i++) {
                        if (this.squares[i][col] == null) {
                            this.squares[row][col].getComponent("Square").moveSquare(i,col);
                            this.squares[i][col] = this.squares[row][col];
                            this.squares[row][col] = null;
                            if (this.checkArr.indexOf(i+"#"+col) == -1) {
                                this.checkArr.push(i+"#"+col);
                            }
                            break;
                        }
                    }
                }
            }
        }
    },

    checkMovedSquares: function () {
        for (var index in this.checkArr) {
            var row = this.checkArr[index].split("#")[0];
            var col = this.checkArr[index].split("#")[1];
            var square = this.squares[row][col];
            if (square !== null) {
                var squareScript = square.getComponent("Square");
                var arr = new Array();
                var scanArr = new Array();
                this.scanAroundNum(squareScript.num,row,col,arr,scanArr);
                if(arr.length >= 3){
                    this.operateLogic(squareScript.num, row, col);
                    this.checkArr = [];
                    break;
                }
            }
        }
    },

    // update: function (dt) {

    // },
});
