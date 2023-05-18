// array, object

// 자바스크립트에서의 함수는, 처리방법을 담고있는 구문(state)와 그것에 대한 값(value)를 동시에 가지고 있다.

var f = function (){
    console.log(1+1);
    console.log(1+2);    
}

console.log(f);
f();

var a = [f]; // 배열의 원소로 함수가 들어갈 수 있다.
a[0]();

var o = {
    func:f
}

o.func(f)
// var i = if(true){console.log(1+1)}; 조건문은 값이 아님

// var w = while(true){console.log(1+1)}; 마찬가지로 조건문은 값이 아님

