(()=>{var c=class{ver;type;finished;paged;genre_list;subjects;genre;baseAPI="https://node.wpista.com/v1/outer/";token;constructor(){this.ver="1.0.1",this.type="movie",this.finished=!1,this.paged=1,this.genre_list=[],this.genre=[],this.subjects=[],this._create()}on(e,s,t){var a=document.querySelectorAll(s);a.forEach(r=>{r.addEventListener(e,t)})}_fetchGenres(){fetch(this.baseAPI+"genres?token="+this.token).then(e=>e.json()).then(e=>{e.data.length&&(this.genre_list=e.data,this._renderGenre())})}_handleGenreClick(){this.on("click",".db--genreItem",e=>{let s=e.currentTarget;if(s.classList.contains("is-active")){let t=this.genre.indexOf(s.innerText);s.classList.remove("is-active"),this.genre.splice(t,1),this.paged=1,this.finished=!1,this.subjects=[],this._fetchData();return}document.querySelector(".db--list").innerHTML="",document.querySelector(".lds-ripple").classList.remove("u-hide"),s.classList.add("is-active"),this.genre.push(s.innerText),this.paged=1,this.finished=!1,this.subjects=[],this._fetchData()})}_renderGenre(){document.querySelector(".db--genres").innerHTML=this.genre_list.map(e=>`<span class="db--genreItem${this.genre_list.includes(e.name)?" is-active":""}">${e.name}</span>`).join(""),this._handleGenreClick()}_fetchData(){fetch(this.baseAPI+"faves?token="+this.token+"&type="+this.type+"&paged="+this.paged+"&genre="+JSON.stringify(this.genre)).then(e=>e.json()).then(e=>{e.data.length?(document.querySelector(".db--list").classList.contains("db--list__card")?(this.subjects=[...this.subjects,...e.data],this._randerDateTemplate()):(this.subjects=[...this.subjects,...e.data],this._randerListTemplate()),document.querySelector(".lds-ripple").classList.add("u-hide")):(this.finished=!0,document.querySelector(".lds-ripple").classList.add("u-hide"))})}_randerDateTemplate(){let e=this.subjects.reduce((t,a)=>{let r=new Date(a.create_time),i=r.getFullYear(),n=r.getMonth()+1,l=`${i}-${n.toString().padStart(2,"0")}`;return Object.prototype.hasOwnProperty.call(t,l)?t[l].push(a):t[l]=[a],t},{}),s="";for(let t in e){let a=t.split("-");s+=`<div class="db--listBydate"><div class="db--titleDate "><div class="db--titleDate__day">${a[1]}</div><div class="db--titleDate__month">${a[0]}</div></div><div class="db--dateList__card">`,s+=e[t].map(r=>`<div class="db--item">${r.is_top250?'<span class="top250">Top 250</span>':""}<img src="${r.poster}" referrerpolicy="no-referrer" class="db--image"><div class="db--score ">${r.douban_score>0?'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>'+r.douban_score:""}${r.year>0?" \xB7 "+r.year:""}</div><div class="db--title"><a href="${r.link}" target="_blank">${r.name}</a></div></div>`).join(""),s+="</div></div>"}document.querySelector(".db--list").innerHTML=s}_randerListTemplate(){document.querySelector(".db--list").innerHTML=this.subjects.map(e=>`<div class="db--item">${e.is_top250?'<span class="top250">Top 250</span>':""}<img src="${e.poster}" referrerpolicy="no-referrer" class="db--image"><div class="ipc-signpost ">${e.create_time}</div><div class="db--score ">${e.douban_score>0?'<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" ><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>'+e.douban_score:""}${e.year>0?" \xB7 "+e.year:""}</div><div class="db--title"><a href="${e.link}" target="_blank">${e.name}</a></div>
                </div>
                </div>`).join("")}_handleScroll(){window.addEventListener("scroll",()=>{var e=window.scrollY||window.pageYOffset;document.querySelector(".block-more").offsetTop+-window.innerHeight<e&&document.querySelector(".lds-ripple").classList.contains("u-hide")&&!this.finished&&(document.querySelector(".lds-ripple").classList.remove("u-hide"),this.paged++,this._fetchData())})}_handleNavClick(){this.on("click",".db--navItem",e=>{if(e.currentTarget.classList.contains("current"))return;this.genre=[],this.type=e.target.dataset.type,this.type=="movie"?(document.querySelector(".db--genres").classList.remove("u-hide"),this._renderGenre()):document.querySelector(".db--genres").classList.add("u-hide"),document.querySelector(".db--list").innerHTML="",document.querySelector(".lds-ripple").classList.remove("u-hide"),document.querySelector(".db--navItem.current").classList.remove("current"),e.target.classList.add("current"),this.paged=1,this.finished=!1,this.subjects=[],this._fetchData()})}_create(){if(document.querySelector(".db--container")){let e=document.querySelector(".db--container");if(e.dataset.token)this.token=e.dataset.token;else return;let s=document.querySelector(".db--navItem.current");s instanceof HTMLElement&&(this.type=s.dataset.type);let t=document.querySelector(".db--list");t.dataset.type&&(this.type=t.dataset.type),this.type=="movie"&&document.querySelector(".db--genres").classList.remove("u-hide"),this._fetchGenres(),this._fetchData(),this._handleScroll(),this._handleNavClick()}document.querySelector(".db--collection")&&document.querySelectorAll(".db--collection").forEach(e=>{this._fetchCollection(e)})}_fetchCollection(e){let s=e.dataset.style?e.dataset.style:"card";fetch(obvInit.api+"v1/movies?type="+e.dataset.type+"&paged=1&genre=&start_time="+e.dataset.start+"&end_time="+e.dataset.end).then(t=>t.json()).then(t=>{if(t.length)if(s=="card")e.innerHTML+=t.map(a=>`<div class="doulist-item">
                            <div class="doulist-subject">
                            <div class="db--viewTime ">Marked ${a.create_time}</div>
                            <div class="doulist-post"><img referrerpolicy="no-referrer" src="${a.poster}"></div><div class="doulist-content"><div class="doulist-title"><a href="${a.link}" class="cute" target="_blank" rel="external nofollow">${a.name}</a></div><div class="rating"><span class="allstardark"><span class="allstarlight" style="width:75%"></span></span><span class="rating_nums">${a.douban_score}</span></div><div class="abstract">${a.remark||a.card_subtitle}</div></div></div></div>`).join("");else{let a=t.reduce((i,n)=>(Object.prototype.hasOwnProperty.call(i,n.create_time)?i[n.create_time].push(n):i[n.create_time]=[n],i),{}),r="";for(let i in a)r+=`<div class="db--date">${i}</div><div class="db--dateList">`,r+=a[i].map(n=>`<div class="db--card__list"">
                                    <img referrerpolicy="no-referrer" src="${n.poster}">
                                    <div>
                                    <div class="title"><a href="${n.link}" class="cute" target="_blank" rel="external nofollow">${n.name}</a></div>
                                    <div class="rating"><span class="allstardark"><span class="allstarlight" style="width:75%"></span></span><span class="rating_nums">${n.douban_score}</span></div>
                                    ${n.remark||n.card_subtitle}
                                    </div>
                                    </div>`).join(""),r+="</div>";e.innerHTML=r}})}};new c;})();
