var members = ['egoing', 'k8805', 'hoya'];
console.log(members[1]); // k8805

// object 객체는 python의 딕셔너리와 같은 개념이라고 보면 될듯

var roles = {
    'programmer' : 'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
};

console.log(roles.designer); // k8805
console.log(roles['designer']); //k8805

for(var n in roles){
    console.log('object => ', n, 'value =>',roles[n]) // key, value와 동일한 방식
};