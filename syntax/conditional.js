var args = process.argv;
console.log(args[2]);

console.log('A');
console.log('B');
if(args[2]==='1'){ // 콘솔에서의 입력값은 문자열 입력으로 받는다
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');