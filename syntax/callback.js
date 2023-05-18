// function a(){
//     console.log('A');
// }


// JS에서는 함수가 값이다 라고 이해할 수 있음
var a = function(){
    console.log('A');
}


function slowfunc(callback){
    callback();
}

slowfunc(a);