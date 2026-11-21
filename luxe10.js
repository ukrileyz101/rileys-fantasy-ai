/* LUXE 10.0 Theme Studio. Preserves the original site's chat and saved-data schema. */
(()=>{'use strict';
const KEY='riley-luxe10-appearance';
const palettes={purple:'#ac64fa',blue:'#448dff',red:'#f15b72',green:'#27c79d',pink:'#ef75c8',gold:'#dba94c',teal:'#21c8d5'};
const defaults={style:'fantasy',accent:palettes.purple};
let state={...defaults};try{const s=JSON.parse(localStorage.getItem(KEY)||'{}');if(['fantasy','cyber','enchanted'].includes(s.style))state.style=s.style;if(/^#[0-9a-fA-F]{6}$/.test(s.accent))state.accent=s.accent}catch(e){}
const open=document.createElement('button');open.id='l10-open';open.type='button';open.textContent='✦ Theme Studio';open.setAttribute('aria-haspopup','dialog');
const overlay=document.createElement('div');overlay.id='l10-dialog';overlay.hidden=true;overlay.innerHTML=`<div class="l10-panel" role="dialog" aria-modal="true" aria-labelledby="l10-title"><div class="l10-head"><div><h2 id="l10-title">✦ Theme Studio</h2><p>Make your universe yours. Choose a style and colours.</p></div><button class="l10-close" type="button" id="l10-close">✕ Close</button></div><div class="l10-label">Appearance style</div><div class="l10-styles"><button type="button" class="l10-style" data-style="fantasy"><span>🌌</span>Futuristic Fantasy</button><button type="button" class="l10-style" data-style="cyber"><span>⚡</span>Cyber LUXE</button><button type="button" class="l10-style" data-style="enchanted"><span>🦋</span>Enchanted LUXE</button></div><div class="l10-label">Accent colour</div><div class="l10-swatches" id="l10-swatches"></div><div class="l10-custom"><input type="color" id="l10-picker" aria-label="Custom accent colour"><label for="l10-picker">Pick any colour</label></div><div class="l10-actions"><button class="l10-save" id="l10-save" type="button">Save my theme</button><button id="l10-reset" type="button">Restore default</button></div><div class="l10-status" id="l10-status" role="status">Your theme is saved on this device. Account sync will be added later.</div></div>`;
document.body.append(overlay);
const picker=overlay.querySelector('#l10-picker');const swatches=overlay.querySelector('#l10-swatches');const status=overlay.querySelector('#l10-status');
Object.entries(palettes).forEach(([name,hex])=>{const b=document.createElement('button');b.type='button';b.className='l10-swatch';b.style.backgroundColor=hex;b.title=name;b.setAttribute('aria-label',name+' theme');b.dataset.color=hex;b.addEventListener('click',()=>{state.accent=hex;apply()});swatches.append(b)});
function rgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16))}
function mix(hex,base,ratio){const a=rgb(hex),b=rgb(base);return '#'+a.map((v,i)=>Math.round(v*ratio+b[i]*(1-ratio)).toString(16).padStart(2,'0')).join('')}
function apply(){
 const root=document.documentElement,accent=state.accent,channels=rgb(accent);
 document.body.classList.toggle('l10-cyber',state.style==='cyber');
 document.body.classList.toggle('l10-enchanted',state.style==='enchanted');
 const vars={
 '--accent':accent,'--accent-rgb':channels.join(','),'--accent-soft':mix(accent,'#ffffff',.48),
 '--accent-deep':mix(accent,'#10051a',.51),'--l10-glow':`rgba(${channels.join(',')},.22)`,
 '--bg':mix(accent,'#090811',.065),'--panel':mix(accent,'#17131e',.16),
 '--line':mix(accent,'#463b51',.48),
 '--l10-surface':mix(accent,'#15111e',.20),
 '--l10-surface-raised':mix(accent,'#21182d',.27),
 '--l10-border':`rgba(${channels.join(',')},.42)`,
 '--l10-wash':`rgba(${channels.join(',')},.14)`,
 '--l10-wash-strong':`rgba(${channels.join(',')},.24)`
 };
 for(const [k,v] of Object.entries(vars))root.style.setProperty(k,v,'important');
 picker.value=accent;
 overlay.querySelectorAll('[data-style]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.style===state.style)));
 overlay.querySelectorAll('[data-color]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.color.toLowerCase()===accent.toLowerCase())));
}

function save(){try{localStorage.setItem(KEY,JSON.stringify(state));status.textContent='✓ Your appearance has been saved on this device.'}catch(e){status.textContent='Could not save appearance: browser storage unavailable.'}}
function close(){overlay.hidden=true;(lastFocus?.isConnected?lastFocus:open).focus()}let lastFocus;
function openStudio(){lastFocus=document.activeElement;overlay.hidden=false;apply();overlay.querySelector('#l10-close').focus()}
document.getElementById('l10-settings-open')?.addEventListener('click',openStudio);overlay.querySelector('#l10-close').addEventListener('click',close);overlay.addEventListener('click',e=>{if(e.target===overlay)close()});document.addEventListener('keydown',e=>{if(!overlay.hidden&&e.key==='Escape')close()});
overlay.querySelectorAll('[data-style]').forEach(b=>b.addEventListener('click',()=>{state.style=b.dataset.style;apply()}));picker.addEventListener('input',()=>{state.accent=picker.value;apply()});overlay.querySelector('#l10-save').addEventListener('click',save);overlay.querySelector('#l10-reset').addEventListener('click',()=>{state={...defaults};apply();save()});
// Existing app theme code may run after startup; reapply once after all scripts execute.
window.addEventListener('load',apply);apply();
})();
