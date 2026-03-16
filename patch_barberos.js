const fs = require('fs');
let content = fs.readFileSync('C:/Users/Paulc/OneDrive/Documentos/disenoWeb/barberia99-admin/src/pages/dashboard/barberos/index.astro', 'utf8');

content = content.replace(
    /return \(\s*<tr class="hover:bg-white\/\[0\.02\] transition-colors group">([\s\S]*?)<\/tr>\s*\)/,
    `return (
        <tr class="hover:bg-white/[0.02] transition-colors group">
            $1
        </tr>
    )`
);
console.log('patched');
