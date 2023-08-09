const api = require('termux')
if (!api.hasTermux) process.exit(1)

var smslist = api.smsInbox();
smslist.cmd='termux-sms-list';
var toast = api.toast();
var batteryStatus = api.batteryStatus();
var vibrate =api.vibrate();

module.exports = {
	smslist:smslist,
	toast:toast,
	batteryStatus:batteryStatus,
	vibrate:vibrate
}
