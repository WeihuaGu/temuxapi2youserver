const wait = (miao)=>{
    let shelljs = require('shelljs');
    console.log('sleep sec: '+miao);
    shelljs.exec( "sleep" + " " + miao , { async : false } ) ;  
};

while(true){
	wait(5);


}
