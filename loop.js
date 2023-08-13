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
	await Promise.all([checkbat(), checksms()])
  	  .then(results => {
		batinfo=results[0];
		smsinfo=results[1];
		const batinfostr=JSON.stringify(batinfo)
		const smsinfostr=JSON.stringify(smsinfo)
		if(batinfostr!=store.bat | smsinfostr!=store.sms){
			store.bat=batinfostr;
			store.sms=smsinfostr;
			giveavibrate();
			sendtoserver(store);
		}
		else{
			console.log('last same');
		}

  	})
  	.catch(error => {
    		console.error('Error:', error);
  	});

	wait(waitime);
  }
}
doloop(20);
