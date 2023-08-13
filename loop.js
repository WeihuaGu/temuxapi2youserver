var { smslist , batteryStatus ,vibrate } = require('./termuxapi')
var { sendtoserver } = require('./send');

const wait = (miao)=>{
    let shelljs = require('shelljs');
    console.log('sleep sec: '+miao);
    shelljs.exec( "sleep" + " " + miao , { async : false } ) ;  
};

const giveavibrate = ()=>{
vibrate.duration(300)
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
    getbat().then((batinfo)=>{resolve(batinfo)})
	    .catch((err)=>{reject(err)});
 });
}

const checksms = ()=>{
return new Promise((resolve, reject) => {
    getsms().then((smslist)=>{resolve(smslist)});
 });
}

const doloop = async (waitime)=>{
  var store = {
	sms:'',
	bat:''
  }
  while(true){
	await checkbat().then((batinfo)=>{
		const batinfostr=JSON.stringify(batinfo)
		if(batinfostr!=store.bat){
			store.bat=batinfostr;
			giveavibrate();
			sendtoserver(batinfostr);
		}
		else{
			console.log('last same');
			console.log(batinfostr);
			console.log(store.bat);
		}

	   })
	   .catch((err)=>{
		console.log(err);
	   });

	wait(waitime);
  }
}
doloop(20);
