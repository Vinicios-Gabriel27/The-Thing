// snow
(function(){var c=document.getElementById('snow'),x=c.getContext('2d'),f=[],W,H;
function r(){W=c.width=innerWidth;H=c.height=innerHeight}r();addEventListener('resize',r);
for(var i=0;i<150;i++)f.push({x:Math.random()*2000,y:Math.random()*1200,s:Math.random()*2+.5,v:Math.random()+.4});
(function d(){x.clearRect(0,0,W,H);x.fillStyle='rgba(220,240,255,.65)';
f.forEach(function(p){p.y+=p.v;p.x+=Math.sin(p.y/50)*.6+.5;if(p.y>H){p.y=-5;p.x=Math.random()*W}if(p.x>W)p.x=0;x.beginPath();x.arc(p.x,p.y,p.s,0,6.3);x.fill()});requestAnimationFrame(d)})()})();
// flashlight
var D=document.getElementById('dark');
function mv(e){var p=e.touches?e.touches[0]:e;D.style.setProperty('--x',p.clientX+'px');D.style.setProperty('--y',p.clientY+'px')}
addEventListener('mousemove',mv);addEventListener('touchmove',mv,{passive:true});
// typing
var L='> OUTPOST 31 ... SIGNAL LOST\n> TEMPERATURE: -40°C\n> 1 UNKNOWN LIFEFORM DETECTED\n> WHO IS THE THING?',T=document.getElementById('term'),k=0;
(function ty(){T.innerHTML=L.slice(0,k)+'<i></i>';if(k++<L.length)setTimeout(ty,45)})();
// reveal + temperature
var io=new IntersectionObserver(function(a){a.forEach(function(e){if(e.isIntersecting)e.target.classList.add('on')})},{threshold:.15});
document.querySelectorAll('.rv').forEach(function(e){io.observe(e)});
var tt=document.getElementById('t');
addEventListener('scroll',function(){var s=scrollY/(document.body.scrollHeight-innerHeight||1);tt.textContent=Math.round(-40-s*30)});
// blood test
var names=['MacReady','Childs','Blair','Bennings','Palmer','Norris','Clark','Copper'],crew=document.getElementById('crew'),out=document.getElementById('out'),els=[],fl=document.getElementById('flash'),st=document.getElementById('st');
names.forEach(function(n){var d=document.createElement('div');d.className='m';d.textContent=n.toUpperCase();crew.appendChild(d);els.push(d)});
function scream(){try{var a=new(window.AudioContext||window.webkitAudioContext)(),o=a.createOscillator(),g=a.createGain();o.type='sawtooth';o.frequency.setValueAtTime(900,a.currentTime);o.frequency.exponentialRampToValueAtTime(120,a.currentTime+.6);g.gain.value=.15;o.connect(g);g.connect(a.destination);o.start();o.stop(a.currentTime+.6)}catch(e){}}
var busy=false;
document.getElementById('test').onclick=function(){if(busy)return;busy=true;
els.forEach(function(e){e.className='m'});out.textContent='Testing...';st.textContent='TESTING';
var i=0,bad=Math.floor(Math.random()*els.length);
(function step(){els[i].className='m '+(i===bad?'hot':'safe');
if(i===bad){out.textContent=names[bad]+' is the Thing. BURN IT.';st.textContent='INFECTED';scream();fl.style.opacity=.7;setTimeout(function(){fl.style.opacity=0},250);document.body.classList.add('shake');setTimeout(function(){document.body.classList.remove('shake')},500);busy=false;return}
i++;setTimeout(step,450)})()};
// poll
var pv=[3,2,2,1],po=['MacReady','Childs','Blair','Nobody. Trust no one.'],pd=document.getElementById('poll');
function draw(){var s=pv.reduce(function(a,b){return a+b});pd.innerHTML='';po.forEach(function(n,i){var b=document.createElement('button');b.className='vote';b.innerHTML=n+' — '+Math.round(pv[i]/s*100)+'%<div class="bar"><i style="width:'+pv[i]/s*100+'%"></i></div>';b.onclick=function(){pv[i]++;draw()};pd.appendChild(b)})}draw();
