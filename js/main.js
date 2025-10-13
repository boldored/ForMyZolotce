// Навигация с плавным затуханием
document.addEventListener('DOMContentLoaded', function(){
  const links = document.querySelectorAll('a[href$=".html"], a[href="index.html"]');
  links.forEach(a=>{
    a.addEventListener('click', function(e){
      // если внешняя ссылка или пустой href — пропускаем
      const href = a.getAttribute('href');
      if(!href || href.startsWith('http')) return;
      e.preventDefault();
      document.getElementById('page').classList.remove('fade-in');
      document.getElementById('page').classList.add('fade-out');
      setTimeout(()=> window.location.href = href, 400);
    });
  });

  // Gallery auto-slider
  const gallery = document.getElementById('gallery');
  if(gallery){
    const imgs = Array.from(gallery.querySelectorAll('img'));
    if(imgs.length > 1){
      let idx = 0;
      // hide all except first
      imgs.forEach((im,i)=> im.style.opacity = i===0? '1' : '0');
      setInterval(()=>{
        imgs[idx].style.transition = 'opacity 800ms ease';
        imgs[idx].style.opacity = '0';
        idx = (idx+1) % imgs.length;
        imgs[idx].style.transition = 'opacity 800ms ease';
        imgs[idx].style.opacity = '1';
      }, 3000);
    } else {
      // if only one or zero images, show placeholder message (placeholder present by default)
    }
  }

  // Heart canvas
  const canvas = document.getElementById('heartCanvas');
  if(canvas){
    const ctx = canvas.getContext('2d');
    function resize(){ canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    let hearts = [];
    function Heart(){
      this.x = Math.random()*canvas.width;
      this.y = canvas.height + Math.random()*200;
      this.size = Math.random()*12 + 8;
      this.speed = Math.random()*0.6 + 0.3;
      this.opacity = Math.random()*0.6 + 0.3;
      this.color = 'rgba(77,163,255,'+this.opacity+')';
      this.draw = function(){
        const s = this.size;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x - s/2, this.y - s/2, this.x - s, this.y + s/3, this.x, this.y + s);
        ctx.bezierCurveTo(this.x + s, this.y + s/3, this.x + s/2, this.y - s/2, this.x, this.y);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      this.update = function(){
        this.y -= this.speed;
        if(this.y < -20){ this.y = canvas.height + Math.random()*200; this.x = Math.random()*canvas.width; }
        this.draw();
      }
    }
    function init(){
      hearts = [];
      for(let i=0;i<50;i++) hearts.push(new Heart());
    }
    function anim(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      hearts.forEach(h=>h.update());
      requestAnimationFrame(anim);
    }
    init(); anim();
  }
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector(".gallery");
  const track = document.querySelector(".gallery-track");

  // Дублируем содержимое, чтобы вторая половина шла следом за первой
  gallery.appendChild(track.cloneNode(true));
});
