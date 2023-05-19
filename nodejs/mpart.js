var M = {
    v:'v',
    f:function(){
        console.log(this.v);
    }

}

module.exports = M; // M이라는 객체를 바깥의 파일에서 사용할 수 있도록 Export 하겠다.