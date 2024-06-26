import{a as w,i as n}from"./assets/vendor-1c96f17f.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))a(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function o(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(r){if(r.ep)return;r.ep=!0;const t=o(r);fetch(r.href,t)}})();const b="16340491-42d6a19746059c85d486dedcd",p=async(e,s,o)=>{try{const a=await w.get("https://pixabay.com/api/",{params:{key:b,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:o}});if(!a.data.hits.length)throw new Error("Sorry, there are no images matching your search query. Please try again.");const r=a.data.hits.map(t=>({webformatURL:t.webformatURL,largeImageURL:t.largeImageURL,tags:t.tags,likes:t.likes,views:t.views,comments:t.comments,downloads:t.downloads}));return{totalHits:a.data.totalHits,hits:r}}catch(a){throw new Error(a.message)}},m=40;let i=1,l=0,d="";const u=document.querySelector(".load-more"),L=document.getElementById("search-form"),y=document.querySelector(".gallery"),v=e=>{e.classList.remove("visually-hidden")},f=e=>{e.classList.add("visually-hidden")},E=e=>`
    <div class="photo-card">
      <img src="${e.webformatURL}" alt="${e.tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b> ${e.likes}
        </p>
        <p class="info-item">
          <b>Views</b> ${e.views}
        </p>
        <p class="info-item">
          <b>Comments</b> ${e.comments}
        </p>
        <p class="info-item">
          <b>Downloads</b> ${e.downloads}
        </p>
      </div>
    </div>
  `,g=e=>{const s=e.map(E).join("");y.insertAdjacentHTML("beforeend",s)},h=()=>{const e=document.querySelector(".load-more");i*m>=l?(f(e),n.info({title:"Info",message:"We're sorry, but you've reached the end of search results"})):v(e)};L.addEventListener("submit",async e=>{e.preventDefault(),y.innerHTML="",f(u);const s=e.target.elements.searchQuery.value.trim();if(s===""){n.error({title:"Error",message:"Please enter a search query"});return}d=s,i=1;try{const o=await p(d,i,m);l=o.totalHits,n.info({message:`Hooray! We found ${l} images`}),g(o.hits),h()}catch(o){n.error({title:"Error",message:o.message})}});u.addEventListener("click",async()=>{i+=1;try{const e=await p(d,i,m);g(e.hits),h()}catch(e){n.error({title:"Error",message:e.message})}});f(u);
//# sourceMappingURL=commonHelpers.js.map
