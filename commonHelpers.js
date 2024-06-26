import{i}from"./assets/vendor-ad859c2f.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))l(r);new MutationObserver(r=>{for(const t of r)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const t={};return r.integrity&&(t.integrity=r.integrity),r.referrerPolicy&&(t.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?t.credentials="include":r.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(r){if(r.ep)return;r.ep=!0;const t=s(r);fetch(r.href,t)}})();const L="16340491-42d6a19746059c85d486dedcd",y=(e,o,s)=>new Promise((l,r)=>{fetch(`https://pixabay.com/api/?key=${L}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${o}&per_page=${s}`).then(t=>{if(!t.ok)throw new Error(`Failed to fetch images. Status code ${t.status}`);return t.json()}).then(t=>{if(t.hits.length===0)r(new Error("Sorry, there are no images matching your search query. Please try again."));else{const n=t.hits.map(a=>({webformatURL:a.webformatURL,largeImageURL:a.largeImageURL,tags:a.tags,likes:a.likes,views:a.views,comments:a.comments,downloads:a.downloads}));l({totalHits:t.totalHits,hits:n})}}).catch(t=>r(new Error(`Error fetching images: ${t.message}`)))}),f=40;let c=1,d=0,m="";const g=document.querySelector(".load-more"),b=document.getElementById("search-form"),u=document.querySelector(".gallery"),v=e=>{e.classList.remove("visually-hidden")},p=e=>{e.classList.add("visually-hidden")},E=e=>`
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
  `,h=(e,o=!1)=>{const s=e.map(E).join("");o?u.insertAdjacentHTML("beforeend",s):u.innerHTML=s},w=()=>{const e=document.querySelector(".load-more");c*f>=d?(p(e),i.info({title:"Info",message:"We're sorry, but you've reached the end of search results"})):v(e)};b.addEventListener("submit",async e=>{e.preventDefault(),u.innerHTML="",p(g);const o=e.target.elements.searchQuery.value.trim();if(o===""){i.error({title:"Error",message:"Please enter a search query"});return}m=o,c=1;try{const s=await y(m,c,f);d=s.totalHits,i.info({message:`Hooray! We found ${d} images`}),h(s.hits),w()}catch(s){i.error({title:"Error",message:s.message})}});g.addEventListener("click",async()=>{c+=1;try{const e=await y(m,c,f);h(e.hits,!0),w()}catch(e){i.error({title:"Error",message:e.message})}});p(g);
//# sourceMappingURL=commonHelpers.js.map
