let address = 'http://127.0.0.1';
let secret = '/secret';
var http = require('http');
var io = require('socket.io')(http);
const process = require('process');
var ioClient = require('socket.io-client')
var port = process.env.PORT || 5000;
let fs = require('fs');

console.log(`


███████╗████████╗███████╗ ██████╗  █████╗ ███╗   ██╗ ██████╗ 
██╔════╝╚══██╔══╝██╔════╝██╔════╝ ██╔══██╗████╗  ██║██╔═══██╗
███████╗   ██║   █████╗  ██║  ███╗███████║██╔██╗ ██║██║   ██║
╚════██║   ██║   ██╔══╝  ██║   ██║██╔══██║██║╚██╗██║██║   ██║
███████║   ██║   ███████╗╚██████╔╝██║  ██║██║ ╚████║╚██████╔╝
╚══════╝   ╚═╝   ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ 
                                                             
        ╦ ╦╔═╗╦ ╦  ╔═╗╦═╗╔═╗  ╦ ╦╔═╗╦  ╔═╗╔═╗╔╦╗╔═╗
        ╚╦╝║ ║║ ║  ╠═╣╠╦╝║╣   ║║║║╣ ║  ║  ║ ║║║║║╣ 
         ╩ ╚═╝╚═╝  ╩ ╩╩╚═╚═╝  ╚╩╝╚═╝╚═╝╩═╝╚═╝╩ ╩╚═╝

`);
let date = '';
let resultString = '';
let check = 0;
let help1,help2,help3,help5,help6,help7;

var client = ioClient.connect( "http://localhost:" + port );
console.log('Trying to connect... ' + address+ ":"+port);
client.once( "connect", function () {
    console.log( 'Successfully connected to the server');
    console.log('Awaiting for sending secret message...');
    setTimeout(function() {
        http.get(address + ":" + port + secret,()=>{
            console.log('Message sended. Waiting for secrets');
            date = new Date;
            let tmpDate = date.getSeconds().toString();
            date = date.getMinutes().toString();
            if(date === '59' || date === '00' || tmpDate > '56' || tmpDate < '4'){
                date = '38';
            } else if (date < 10){
                date = '0' + date;
            }
            //console.log(date);
            letHelp();
        });
    }, 1000);
    let tmp = ["#first","#second",'#third'];
    let counterTmp = 0;
    client.on('gif_color', function (data) {
        console.log(data)
        let color = data.toString();
        //console.log(tmp + '|' + counterTmp);
        switch (counterTmp) {
            case 0:
                tmp[counterTmp] = color[2]+color[4]+color[6];
                counterTmp++;
                break;
            case 1:
                tmp[counterTmp] = color[2]+color[4]+color[6];
                counterTmp++;
                break;
            case 2:
                tmp[counterTmp] = color[2]+color[4]+color[6]; //#123456
                counterTmp = 0;
                break;
            default:
                console.log('Error! In Switch case');
        }
        if(check === 1){
            colorsToString(color);
        }
        if(tmp.indexOf(help1) !== -1 && tmp.indexOf(help2) !== -1 && tmp.indexOf(help3) !== -1 && check ===0){
            console.log('Getting secrets...');
            if(resultString !== '') resultString = '';
            check = 1;
        }

        if(tmp.indexOf(help5) !== -1 && tmp.indexOf(help6) !== -1 && tmp.indexOf(help7) !== -1 && check ===1){
            console.log('Here is your secret. Do you satisfied?');
            console.log('Hex ' + resultString);
            console.log(hex_to_windows1251(resultString.slice(0,-9))); // Последний символ может отобразиться некорректно если в исходном сообщении длина не кратна 3

            fs.writeFile('outputStegano.txt',resultString,function (err) {
                if (err) console.log('Some Error...');
                process.exit(0);
            });
            check = 0;
            //process.exit(0);
        }

    })

} );

function colorsToString(color) {
    //console.log('Color = ' +  color);
    let tmp2 = (color[2]+color[4]+color[6]).toString();

    resultString = resultString + tmp2;
}

function hex_to_windows1251(number)
{
    let win1251 = {"10":"\u0010","11":"\u0011","12":"\u0012","13":"\u0013","14":"\u0014","15":"\u0015","16":"\u0016","17":"\u0017","18":"\u0018","19":"\u0019","20":" ","21":"!","22":"\"","23":"#","24":"$","25":"%","26":"&","27":"'","28":"(","29":")","30":"0","31":"1","32":"2","33":"3","34":"4","35":"5","36":"6","37":"7","38":"8","39":"9","40":"@","41":"A","42":"B","43":"C","44":"D","45":"E","46":"F","47":"G","48":"H","49":"I","50":"P","51":"Q","52":"R","53":"S","54":"T","55":"U","56":"V","57":"W","58":"X","59":"Y","60":"`","61":"a","62":"b","63":"c","64":"d","65":"e","66":"f","67":"g","68":"h","69":"i","70":"p","71":"q","72":"r","73":"s","74":"t","75":"u","76":"v","77":"w","78":"x","79":"y","80":"Ђ","81":"Ѓ","82":"‚","83":"ѓ","84":"„","85":"…","86":"†","87":"‡","88":"€","89":"‰","90":"ђ","91":"‘","92":"’","93":"“","94":"”","95":"•","96":"–","97":"—","98":"","99":"™","00":"\u0000","01":"\u0001","02":"\u0002","03":"\u0003","04":"\u0004","05":"\u0005","06":"\u0006","07":"\u0007","08":"\b","09":"\t","0A":"\n","0B":"\u000b","0C":"\f","0D":"\r","0E":"\u000e","0F":"\u000f","1A":"\u001a","1B":"\u001b","1C":"\u001c","1D":"\u001d","1E":"\u001e","1F":"\u001f","2A":"*","2B":"+","2C":",","2D":"-","2E":".","2F":"/","3A":":","3B":";","3C":"<","3D":"=","3E":">","3F":"?","4A":"J","4B":"K","4C":"L","4D":"M","4E":"N","4F":"O","5A":"Z","5B":"[","5C":"\\","5D":"]","5E":"^","5F":"_","6A":"j","6B":"k","6C":"l","6D":"m","6E":"n","6F":"o","7A":"z","7B":"{","7C":"|","7D":"}","7E":"~","7F":"","8A":"Љ","8B":"‹","8C":"Њ","8D":"Ќ","8E":"Ћ","8F":"Џ","9A":"љ","9B":"›","9C":"њ","9D":"ќ","9E":"ћ","9F":"џ","A0":" ","A1":"Ў","A2":"ў","A3":"Ј","A4":"¤","A5":"Ґ","A6":"¦","A7":"§","A8":"Ё","A9":"©","AA":"Є","AB":"«","AC":"¬","AD":"­","AE":"®","AF":"Ї","B0":"°","B1":"±","B2":"І","B3":"і","B4":"ґ","B5":"µ","B6":"¶","B7":"·","B8":"ё","B9":"№","BA":"є","BB":"»","BC":"ј","BD":"Ѕ","BE":"ѕ","BF":"ї","C0":"А","C1":"Б","C2":"В","C3":"Г","C4":"Д","C5":"Е","C6":"Ж","C7":"З","C8":"И","C9":"Й","CA":"К","CB":"Л","CC":"М","CD":"Н","CE":"О","CF":"П","D0":"Р","D1":"С","D2":"Т","D3":"У","D4":"Ф","D5":"Х","D6":"Ц","D7":"Ч","D8":"Ш","D9":"Щ","DA":"Ъ","DB":"Ы","DC":"Ь","DD":"Э","DE":"Ю","DF":"Я","E0":"а","E1":"б","E2":"в","E3":"г","E4":"д","E5":"е","E6":"ж","E7":"з","E8":"и","E9":"й","EA":"к","EB":"л","EC":"м","ED":"н","EE":"о","EF":"п","F0":"р","F1":"с","F2":"т","F3":"у","F4":"ф","F5":"х","F6":"ц","F7":"ч","F8":"ш","F9":"щ","FA":"ъ","FB":"ы","FC":"ь","FD":"э","FE":"ю"};
    //var number = "cff0e8e2e5f2";
    let hexarr = number.toUpperCase().match(/[0-9A-F]{2}/g)
    let win1251arr = hexarr.map(el=> win1251[el]);
    return win1251arr.join("");
    console.log(win1251arr.join(""))
}
function letHelp() {
    help1 = (((date[0])*10)%16).toString(16) +
        (((date[1]))%16).toString(16) +
        (((date[0])+8)%16).toString(16);
    help2 = (((date[1])*10)%16).toString(16) +
        (((date[1])*9)%16).toString(16) +
        (((date[1])*4)%16).toString(16);
    help3 = (((date[0])**3)%16).toString(16) +
        (((date[1]))%16).toString(16) +
        (((date[1])**4)%16).toString(16);
    help5 = (((date[1])+6)%16).toString(16) +
        (((date[1])+8)%16).toString(16) +
        (((date[0])+3)%16).toString(16);
    help6 = (((date[1])+9)%16).toString(16) +
        (((date[0])+7)%16).toString(16) +
        (((date[1])**3)%16).toString(16);
    help7 = (((date[1])+1)%16).toString(16) +
        (((date[0])+5)%16).toString(16) +
        (((date[0])*7)%16).toString(16);

}