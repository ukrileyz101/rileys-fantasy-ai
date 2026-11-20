// Deploy as a SEPARATE Cloudflare Worker with a D1 binding named DB.
// Configure CORS_ORIGIN to your exact GitHub Pages origin.
const ORIGIN = 'https://ukrileyz101.github.io';
const cors={'Access-Control-Allow-Origin':ORIGIN,'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Content-Type':'application/json; charset=utf-8'};
const json=(data,status=200)=>new Response(JSON.stringify(data),{status,headers:cors});
export default {async fetch(request,env){
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers:cors});
  const url=new URL(request.url);
  if(url.pathname!=='/messages')return json({status:'online',service:'Riley Community'});
  if(!env.DB)return json({error:'D1 binding DB missing'},503);
  if(request.method==='GET'){
    const {results}=await env.DB.prepare('SELECT id, name, text, created_at FROM messages ORDER BY id DESC LIMIT 80').all();
    return json({messages:results.reverse()});
  }
  if(request.method!=='POST')return json({error:'Method not allowed'},405);
  const len=Number(request.headers.get('content-length')||0);
  if(len>3000)return json({error:'Message too large'},413);
  let body;try{body=await request.json()}catch{return json({error:'Invalid JSON'},400)}
  const name=String(body.name||'').trim().slice(0,24),text=String(body.text||'').trim().slice(0,500);
  if(name.length<2||text.length<1)return json({error:'Enter a nickname and message'},400);
  if(/https?:\/\/|(?:\b\w+@\w+\.\w+\b)/i.test(text))return json({error:'Links and email addresses are not allowed'},400);
  // Basic per-IP rate limit via Cloudflare Rate Limiting binding is recommended before public launch.
  await env.DB.prepare('INSERT INTO messages (name,text,created_at) VALUES (?,?,?)').bind(name,text,new Date().toISOString()).run();
  return json({ok:true},201);
}};
