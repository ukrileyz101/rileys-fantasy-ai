(()=>{'use strict';
const C=window.RILEY_CONFIG||{},KEY='riley-fantasy-private-v1',DATAKEY='riley-account-data';
const style=document.createElement('style');style.textContent=`
#account-open{position:fixed;right:15px;bottom:17px;z-index:9000;background:linear-gradient(120deg,#8142d8,#b366f2);color:white;border:1px solid #d5a4ff;border-radius:30px;padding:11px 16px;font:700 13px system-ui;box-shadow:0 6px 28px #0009;cursor:pointer}
#account-panel{position:fixed;inset:0;z-index:9001;background:#090611d9;display:none;align-items:center;justify-content:center;padding:14px;overflow:auto}
#account-panel.active{display:flex}#account-panel .ac-card{width:min(100%,470px);max-height:94dvh;overflow:auto;background:#1b122c;color:#f5ecff;border:1px solid #8653ad;border-radius:20px;padding:22px;box-shadow:0 18px 60px #000c;font:14px system-ui}
#account-panel h2{font-size:23px;margin:0 0 7px}#account-panel p{line-height:1.5;color:#cfc1e1}#account-panel label{display:block;margin:12px 0 5px;font-weight:650}#account-panel input{width:100%;box-sizing:border-box;background:#0e0a19;color:white;border:1px solid #685080;border-radius:9px;padding:12px;font:inherit}
#account-panel button{cursor:pointer;background:#7443bc;border:1px solid #a276d9;color:white;border-radius:9px;padding:10px 12px;font:650 13px system-ui}#account-panel button.secondary{background:#30223f}#account-panel .ac-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}#account-panel .ac-row>*{flex:1}#account-panel .ac-msg{white-space:pre-wrap;line-height:1.5;margin-top:12px;color:#e5ceff}#account-panel .ac-warning{background:#37223b;border-radius:10px;padding:11px;color:#f6d3e7}#account-panel .ac-close{float:right;background:transparent;border:0;font-size:21px}#account-panel .ac-hide{display:none}#account-panel .ac-small{font-size:12px}
@media(max-width:650px){#account-open{bottom:80px;right:10px;padding:10px 12px}#account-panel .ac-card{padding:16px}}
`;document.head.append(style);
const launch=document.createElement('button');launch.id='account-open';launch.textContent='♙ Account / Cloud';document.body.append(launch);
const panel=document.createElement('div');panel.id='account-panel';panel.setAttribute('role','dialog');panel.setAttribute('aria-modal','true');panel.setAttribute('aria-label','Riley’s Fantasy AI account');panel.innerHTML=`<div class="ac-card"><button class="ac-close secondary" id="ac-close" aria-label="Close account panel">×</button><h2>✦ Your Fantasy AI Account</h2><p id="ac-status">Checking account…</p><div id="ac-auth"><label for="ac-email">Email address</label><input id="ac-email" type="email" autocomplete="email"><label for="ac-pass">Password</label><input id="ac-pass" type="password" autocomplete="current-password" minlength="6"><div class="ac-row"><button id="ac-signin">Sign in</button><button id="ac-signup">Create account</button></div><div class="ac-row"><button class="secondary" id="ac-reset">Forgot password?</button></div><p class="ac-small">Email confirmation may be required. For password recovery, open the link from your email on the same website.</p></div><div id="ac-user" class="ac-hide"><p id="ac-user-email"></p><div class="ac-warning">Your browser creations are not automatically uploaded when you first sign in. Choose which copy to keep before turning on sync. Export a backup first.</div><div class="ac-row"><button id="ac-upload">Upload this device’s data</button><button id="ac-download">Restore cloud data</button></div><div class="ac-row"><button class="secondary" id="ac-backup">Download local backup</button><button class="secondary" id="ac-signout">Sign out</button></div><p class="ac-small" id="ac-sync-status">Sync not started.</p></div><div class="ac-msg" id="ac-msg" aria-live="polite"></div></div>`;document.body.append(panel);
const $=id=>document.getElementById(id),msg=x=>{$('ac-msg').textContent=x},show=()=>{panel.classList.add('active');$('ac-close').focus()},hide=()=>panel.classList.remove('active');launch.onclick=show;$('ac-close').onclick=hide;panel.addEventListener('click',e=>{if(e.target===panel)hide()});document.addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
let client=null,user=null,syncEnabled=false,busy=false,pending=null;
try{if(!window.supabase?.createClient)throw Error('Supabase library could not load. Open this website online.');client=window.supabase.createClient(C.supabaseUrl,C.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}})}catch(e){$('ac-status').textContent='Account connection unavailable';msg(e.message);return}
const raw=()=>localStorage.getItem(KEY)||'{}';const update=()=>{$('ac-auth').classList.toggle('ac-hide',!!user);$('ac-user').classList.toggle('ac-hide',!user);$('ac-status').textContent=user?'Signed in':'Sign in or create an account';$('ac-user-email').textContent=user?.email||'';launch.textContent=user?'☁ My Account':'♙ Sign in';syncEnabled=!!(user&&localStorage.getItem('riley-sync-user')===user.id);$('ac-sync-status').textContent=syncEnabled?'Automatic cloud sync is enabled for this device.':'Cloud sync is paused until you choose Upload or Restore.'};
async function run(task){if(busy)return;busy=true;msg('Working…');try{await task()}catch(e){msg('⚠ '+(e.message||String(e)))}finally{busy=false}}
$('ac-signup').onclick=()=>run(async()=>{const email=$('ac-email').value.trim(),password=$('ac-pass').value;if(!email||password.length<6)throw Error('Enter an email and a password of at least 6 characters.');const {error,data}=await client.auth.signUp({email,password,emailRedirectTo:location.origin+location.pathname});if(error)throw error;msg(data.session?'Account created and signed in.':'Check your inbox for a confirmation email, then return to the website to sign in.')});
$('ac-signin').onclick=()=>run(async()=>{const {error}=await client.auth.signInWithPassword({email:$('ac-email').value.trim(),password:$('ac-pass').value});if(error)throw error;msg('Signed in. Back up your data, then choose Upload or Restore.')});
$('ac-reset').onclick=()=>run(async()=>{const email=$('ac-email').value.trim();if(!email)throw Error('Enter your email address first.');const {error}=await client.auth.resetPasswordForEmail(email,{redirectTo:location.origin+location.pathname});if(error)throw error;msg('If that account exists, a password recovery email has been sent.')});
$('ac-signout').onclick=()=>run(async()=>{syncEnabled=false;localStorage.removeItem('riley-sync-user');const {error}=await client.auth.signOut();if(error)throw error;msg('Signed out. Data on this browser remains available.')});
$('ac-backup').onclick=()=>{const b=new Blob([JSON.stringify({format:'riley-account-local-backup',savedAt:new Date().toISOString(),data:JSON.parse(raw())},null,2)],{type:'application/json'});const a=document.createElement('a'),url=URL.createObjectURL(b);a.href=url;a.download='riley-fantasy-local-backup.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);msg('Backup downloaded. Keep it somewhere safe.')};
async function fetchCloud(){const {data,error}=await client.from('user_chat_data').select('data').eq('user_id',user.id).maybeSingle();if(error)throw error;return data?.data||null}
async function push(){if(!user)return;const content=JSON.parse(raw());const {error}=await client.from('user_chat_data').upsert({user_id:user.id,data:content,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(error)throw error;$('ac-sync-status').textContent='Last uploaded: '+new Date().toLocaleTimeString()}
$('ac-upload').onclick=()=>run(async()=>{if(!confirm('Upload this device’s data to your account? This will REPLACE any cloud copy. Download a backup first.')){msg('Upload cancelled.');return}await push();syncEnabled=true;localStorage.setItem('riley-sync-user',user.id);update();msg('Uploaded successfully. Automatic sync is now on for this device.')});
$('ac-download').onclick=()=>run(async()=>{const cloud=await fetchCloud();if(!cloud){msg('No cloud backup exists yet. On your original device, choose Upload first.');return}if(!confirm('Restore cloud data? This REPLACES the creations stored in this browser. Back up first.')){msg('Restore cancelled.');return}syncEnabled=false;localStorage.setItem(KEY,JSON.stringify(cloud));localStorage.setItem('riley-sync-user',user.id);msg('Cloud data restored. Reloading…');location.reload()});
// Sync local changes after the user explicitly selects a cloud copy. Avoid simultaneous overlapping uploads.
let last=raw();setInterval(()=>{if(!syncEnabled||!user||busy||document.hidden)return;const now=raw();if(now===last)return;last=now;clearTimeout(pending);pending=setTimeout(async()=>{if(!syncEnabled||!user)return;try{await push()}catch(e){$('ac-sync-status').textContent='⚠ Cloud upload failed: '+e.message}},1600)},3500);
let recovering=false;
function showPasswordForm(){
 recovering=true;
 $('ac-auth').classList.add('ac-hide');$('ac-user').classList.add('ac-hide');
 $('ac-status').textContent='Set your new password';
 let wrap=$('ac-change-pass');
 if(!wrap){
  wrap=document.createElement('div');wrap.id='ac-change-pass';
  wrap.innerHTML='<p>Enter a new password to finish recovering your account.</p><label for="ac-new-pass">New password</label><input id="ac-new-pass" type="password" minlength="8" autocomplete="new-password"><label for="ac-confirm-pass">Confirm new password</label><input id="ac-confirm-pass" type="password" minlength="8" autocomplete="new-password"><div class="ac-row"><button id="ac-change-submit">Save new password</button></div>';
  $('ac-msg').before(wrap);
  $('ac-change-submit').onclick=()=>run(async()=>{
   const password=$('ac-new-pass').value,confirmation=$('ac-confirm-pass').value;
   if(password.length<8)throw Error('Choose a password with at least 8 characters.');
   if(password!==confirmation)throw Error('The passwords do not match.');
   const {error}=await client.auth.updateUser({password});if(error)throw error;
   recovering=false;wrap.remove();update();msg('✓ Password changed. You can now use your new password to sign in.');
   if(location.hash.includes('access_token')||location.hash.includes('type=recovery'))history.replaceState(null,'',location.pathname+location.search);
  });
 }
 show();msg('Your recovery link was accepted. Choose a new password below.');
}
client.auth.onAuthStateChange((event,session)=>{
 const next=session?.user||null;
 if(user?.id!==next?.id){syncEnabled=false;last=raw()}
 user=next;
 if(event==='PASSWORD_RECOVERY')showPasswordForm();
 else if(!recovering)update();
});
// A recovery link may be processed before the auth listener sees the event.
// Keep the reset screen visible if the link explicitly contains recovery information.
const url=new URL(location.href);
const recoveryHint=url.searchParams.get('type')==='recovery'||new URLSearchParams(location.hash.slice(1)).get('type')==='recovery';
if(recoveryHint)showPasswordForm();
client.auth.getSession().then(({data,error})=>{if(error)msg(error.message);user=data?.session?.user||null;if(!recovering)update()});
})();