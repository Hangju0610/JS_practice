var v1 = 'v1';
//100000 code
v1 = 'egoing';
var v2 = 'v2';


// 폴더로 정리정돈을 하는 것과 같은 현상이다.
var p = {
    v1:'v1',
    v2:'v2',
    f1:function(){
        console.log(this.v1);
    },
    f2:function(){
        console.log(this.v2);
    }
};

p.f1();
p.f2();