var fs = require('fs');

// readFileSync 동기적으로 처리하는 방식

// console.log('A');
// var result = fs.readFileSync('syntax/sample.txt','utf-8');
// console.log(result);
// console.log('C');

// sync가 없으면 비동기적으로 처리하는 방식
// callback은 함수처럼 쓰면된다.
// readfile은 리턴값이 없는데, sync는 Return 값이 있다.
// 3번째 인자는 Callback을 진행
// 1,2,3을 진행할 때, fs.readFile를 읽고, C를 진행한 후 B값이 나옴
// fs 가 실행되면서 결과를 가져오기전에, C를 먼저 나오고, 결과를 나중에 가져왔다.
// callback : 나중에 전화해

console.log('A');
fs.readFile('syntax/sample.txt','utf-8',function(err,result){
    console.log(result)
});
console.log('C');