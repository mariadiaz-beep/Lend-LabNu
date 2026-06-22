import fs from 'fs';

let content = fs.readFileSync('src/app/components/profile/ProfileScreen.tsx', 'utf-8');

// We need to replace values like "COP 110.400" with 110400
content = content.replace(/"COP ([0-9.]+)"/g, (match, p1) => {
    return p1.replace(/\./g, '');
});

fs.writeFileSync('src/app/components/profile/ProfileScreen.tsx', content);
