var serialport  = require("serialport");
var SerialPort = serialport.SerialPort;
var osutils = require('os-utils');
var _ = require('lodash');
var ps = require('current-processes');
var serialPort;
var delay=100;


serialPort = new SerialPort("COM4", {
    baudrate: 57600,
    parser: serialport.parsers.readline("\r\n")
});

serialPort.on('data', function(data) {
	console.log(data);
});

serialPort.on("open", function () {
    console.log('open');
    init();
});

function init(){
  	setTimeout(function(){ 
  		console.log("sys reset"); 
  		serialPort.write("sys reset\r\n");
  	}, 0);
  	
  	setTimeout(function(){ 
  		console.log("sys get ver"); 
  		serialPort.write("sys get ver\r\n");
  	}, 200);
  	
  	setTimeout(function(){ 
  		console.log("mac get deveui");
  		serialPort.write("mac get deveui\r\n");
  	}, 300);
  	
  	setTimeout(function(){ 
  		console.log("mac set devaddr 001A66D6");
  		serialPort.write("mac set devaddr 001A66D6\r\n");
  	}, 400);
  	
  	setTimeout(function(){ 
  		console.log("mac set appskey CAFECAFECAFECAFECAFECAFECAFE0000");
  		serialPort.write("mac set appskey CAFECAFECAFECAFECAFECAFECAFE0000\r\n");
  	}, 500);
  	
  	setTimeout(function(){ 
  		console.log("mac set nwkskey CAFECAFECAFECAFECAFECAFECAFECAFE"); 
  		serialPort.write("mac set nwkskey CAFECAFECAFECAFECAFECAFECAFECAFE\r\n");
  	}, 600);

  	setTimeout(function(){ 
  		console.log("mac save");
  		serialPort.write("mac save\r\n")
  	}, 700);
  	//0004A30B001A66D6
	setTimeout(function(){ 
		console.log("mac join abp");
		serialPort.write("mac join abp\r\n");
	}, 2000);

  //MESSAGE FORMAT: MSGNUMBER;
	/*setTimeout(function(){ 
		console.log("mac tx cnf 1 CAFECAFECAFE")
		serialPort.write("mac tx cnf 1 CAFECAFECAFE\r\n")
	}, 3000);*/

  setTimeout(function(){ 
    getData();
  }, 3000);
  	
  var interval = setInterval(function() {
    getData();
  }, 60*1000);
  
}

function getData() {
  var uptime = (osutils.sysUptime()/100/60).toFixed(0);
  var proc = {};
  ps.get(function(err, processes) {
    processes.forEach(function(process) {
      if(proc[process.name] === undefined) {
        proc[process.name] = process.cpu;
      }
    });
    var processText = "";
    Object.keys(proc).forEach(function(procT) {
      processText+=procT+";";
    });
    //Add uptime
    var sendData = uptime+";"+processText;
    sendDataLora(sendData);
    console.log("SENDING DATA...");
  });
}

function sendDataLora(data) {
  var messagesCount = Math.ceil(data.length/100);
  console.log("Messages Count: "+messagesCount);
  for(var i = 0; i < messagesCount; i++) {
    var add = "";
    var addM = "";
    if(i/10 < 1) {add = "0";}
    if(messagesCount/10 < 1) {addM = "0";}
    var messageId = addM+messagesCount+add+i;
    var messageMessage = data.substring(i*100, (i*100)+100);
    //console.log(toHex(messageId+messageMessage).length);
    sendDataUART(toHex(messageId+messageMessage), messageId, i);
  }
}

function sendDataUART(data, id, i) {
  setTimeout(function() {
      console.log("mac tx uncnf 1 "+id);
      serialPort.write("mac tx uncnf 1 "+data+"\r\n");
    }, 3000*i);
} 

function toHex(str,hex){
  try{
    hex = unescape(encodeURIComponent(str))
    .split('').map(function(v){
      return v.charCodeAt(0).toString(16)
    }).join('')
  }
  catch(e){
    hex = str
    console.log('invalid text input: ' + str)
  }
  return hex
}