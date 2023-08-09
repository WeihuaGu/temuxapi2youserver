var { smslist , batteryStatus ,vibrate } = require('./termuxapi')
vibrate.duration(1000)
	.run()
batteryStatus.run()
   .then(function (text) {
     // ...
	console.log(text)
   })
