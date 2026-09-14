const CONFIG = {
  pix: "124.638.074-90",
  instagramVideo: "https://www.instagram.com/reel/DdRcV-ET8hw/?stkn=cmprcjcxdzE3Y2x2",
  instagramProfile: "https://www.instagram.com/ajudeminhamaeasorrir?stkn=MXRkdnlrb2YyNWszcw==",
  tiktok: "https://www.tiktok.com/@ajudeminhamaeasorrir?_r=1&_t=ZS-99jGqKueT3a",
  kwai: "https://k.kwai.com/u/@ajudeminhamaeasorrir/cxSgLmCd"
};

function setLink(id,url){
  const el=document.getElementById(id);
  if(!el) return;
  if(!url || url.startsWith("COLE_AQUI")){
    el.addEventListener("click",e=>{e.preventDefault();alert("Abra script.js e cole este link no bloco CONFIG.");});
  } else {
    el.href=url; el.target="_blank"; el.rel="noopener";
  }
}
setLink("instagramVideoBtn",CONFIG.instagramVideo);
setLink("instagramProfileBtn",CONFIG.instagramProfile);
setLink("tiktokBtn",CONFIG.tiktok);
setLink("kwaiBtn",CONFIG.kwai);

const toast=document.getElementById("toast");
async function copyPix(){
  try{await navigator.clipboard.writeText(CONFIG.pix);}
  catch(e){const t=document.createElement("textarea");t.value=CONFIG.pix;document.body.appendChild(t);t.select();document.execCommand("copy");t.remove();}
  toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),1800);
}
["copyPixBtn","copyPixMini","copyPixBottom","copyFromModal","floatingDonate"].forEach(id=>document.getElementById(id)?.addEventListener("click",e=>{e.preventDefault();copyPix();}));

const modal=document.getElementById("qrModal");
document.getElementById("showQrBtn").addEventListener("click",()=>modal.classList.add("open"));
document.getElementById("closeQr").addEventListener("click",()=>modal.classList.remove("open"));
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("open");});

document.getElementById("shareBtn").addEventListener("click",async()=>{
  const data={title:"Ajude Lourdes | Cirurgia Ortognática",text:"Conheça a história de Lourdes e ajude esta campanha. Qualquer valor ou compartilhamento faz diferença.",url:location.href};
  if(navigator.share){await navigator.share(data);} else {await navigator.clipboard.writeText(location.href);alert("Link copiado!");}
});
