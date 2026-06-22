const fs = require('fs');
const file = '../src/app/App.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/fontFamily:\s*['"][^'"]*['"]\s*,?/g, '');
content = content.replace(/fontFamily="[^"]*"/g, '');
content = content.replace(/fontFamily=\{[^}]*\}/g, '');
// Also fix any trailing commas or spaces left by removal if needed
// The simplest is just replacing it with empty strings

fs.writeFileSync(file, content, 'utf8');
console.log("Stripped fontFamily");
