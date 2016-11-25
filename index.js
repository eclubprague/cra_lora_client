var serialport = require("serialport");
var SerialPort = serialport.SerialPort;
var serialPort;
var delay=100;


serialPort = new SerialPort("COM5", {
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

	setTimeout(function(){ 
		console.log("mac tx cnf 1 CAFECAFECAFE")
		serialPort.write("mac tx cnf 1 CAFECAFECAFE\r\n")
	}, 3000);
  	

  	//https://api.pripoj.me/message/get/0004A30B001A66D6?token=84YTv1eXGqfwcZikLYkqWzR4aoMAyqDZ

  
}
