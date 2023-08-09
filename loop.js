var { smslist , batteryStatus ,vibrate } = require('./termuxapi')

var store = {
	sms:'',
	bat:''
}

const wait = (miao)=>{
    let shelljs = require('shelljs');
    console.log('sleep sec: '+miao);
    shelljs.exec( "sleep" + " " + miao , { async : false } ) ;  
};
const giveavibrate = ()=>{
vibrate.duration(1000)
        .run()
}

const getbat = ()=>{
 return  batteryStatus.run()
}
const getsms = ()=>{
 return  smslist.run()
}

const checkbat = ()=>{
return new Promise((resolve, reject) => {
    getbat().then((batinfo)=>{resolve(batinfo)});
 });
}
const checksms = ()=>{
return new Promise((resolve, reject) => {
    getsms().then((smslist)=>{resolve(smslist)});
 });
}


while(true){
	wait(5);
	checkbat().then((batinfo)=>{
		console.log(batinfo);
	});


}
