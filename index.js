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
  	setTimeout(function(){ serialPort.write("sys reset\r\n") }, 0);
  	setTimeout(function(){ serialPort.write("sys get ver\r\n") }, 100);
  	setTimeout(function(){ serialPort.write("mac get deveui\r\n") }, 200);
  	setTimeout(function(){ serialPort.write("mac set devaddr 001A66D6\r\n") }, 300);
  	setTimeout(function(){ serialPort.write("mac set appskey CAFECAFECAFECAFECAFECAFECAFE0000\r\n") }, 400);
  	setTimeout(function(){ serialPort.write("mac set nwkskey CAFECAFECAFECAFECAFECAFECAFECAFE\r\n") }, 500);
  	setTimeout(function(){ serialPort.write("mac save\r\n")}, 600);
  	//0004A30B001A66D6

  	//https://api.pripoj.me/message/get/0004A30B001A66D6?token=84YTv1eXGqfwcZikLYkqWzR4aoMAyqDZ

 // 	setTimeout(function(){ serialPort.write("radio set bw 500\r\n") }, 300);
	// setTimeout(function(){ serialPort.write("radio set sf sf7\r\n") }, 400);
	// setTimeout(function(){ serialPort.write("radio set cr 4/8\r\n") }, 500);
	// setTimeout(function(){ serialPort.write("radio set crc on\r\n") }, 600);
	// setTimeout(function(){ serialPort.write("radio set wdt "+delay+"\r\n") }, 700);
	// setTimeout(function(){ serialPort.write("mac pause\r\n") }, 800);  
	// setTimeout(function(){ serialPort.write("radio rx 0\r\n"); console.log("ok"); }, 900);       
}
