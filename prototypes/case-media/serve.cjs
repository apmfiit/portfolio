const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.png':'image/png','.woff2':'font/woff2','.mp4':'video/mp4','.webm':'video/webm'};
http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const existing = pathname === '/existing/pickup.png';
  const file = existing ? path.resolve(root,'../../public/images/cases/ykt-pickup/img-2.png') : path.resolve(root,'.'+(pathname === '/'?'/index.html':pathname));
  if (!existing && !file.startsWith(root+path.sep)) { res.writeHead(403).end(); return; }
  fs.stat(file,(err,stat)=>{
    if(err || !stat.isFile()){res.writeHead(404).end();return;}
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':stat.size,'Cache-Control':'no-store'});
    fs.createReadStream(file).pipe(res);
  });
}).listen(4175,'127.0.0.1',()=>console.log('http://127.0.0.1:4175/'));
