const os = require('os')
// console.log(os.EOL);
console.log(os.arch()); // x64
console.log(os.cpus().length); // 12
console.log(os.freemem() / 1024); // 4677312
console.log(os.homedir()); // C:\Users\songjiahui
console.log(os.hostname()); // DESKTOP-2C5DK91
console.log(os.tmpdir()); // C:\Users\SONGJI~1\AppData\Local\Temp