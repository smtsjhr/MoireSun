const enable_interaction = true;

var moire_fade = 12;
var idle_fade = 0;
var idle_time = 0;
var moire_rate = 1;
var hold_time = 0;
var hold_rate = .002;

var sun_idle = true;
var sun_touch = false;

var W;
var H;
var D;

var t = 5;
const t_rate = .005;

const fps = 60;
var fpsInterval, startTime, now, then, elapsed;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

W = window.innerWidth;
H = window.innerHeight;
D = Math.min(W,H);
D = Math.max(400, Math.min(600, D))
canvas.width = D;
canvas.height = D;
canvas.style = `border-radius: ${D/2}px`;


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode(t) {
    q=(l,u,v,w)=>{x.fillStyle=R(l*255,l*200,l*90,.06+l); x.fillRect(u,v,w,2e3)};
    q(1,0,0,W)
    x.translate(D/2, D/2);
    for(f=F=128;f--;) {
        x.rotate(g=f*2*Math.PI/F);
        for(i=G=60;i--;) {
            q(0,(2*S(g+moire_rate*t)+ moire_fade+ 1*S(2*t))*(G/2-i+(4*t/(2*Math.PI))%1),125,10,2e3); 
        }
    }
}

startAnimating(fps);

window.onresize = function(e) {
    W = window.innerWidth;
    H = window.innerHeight;
    D = Math.min(W,H);
    D = Math.max(400, Math.min(600, D))
    canvas.width = D;
    canvas.height = D;
    canvas.style = `border-radius: ${D/2}px`;    
}

function draw() {

    canvas.width = D;
    canvas.height = D;

    //DwitterCode(t);

    x.fillStyle=R(255,200,90,1);
    x.fillRect(0,0,D,D);

    x.translate(D/2, D/2);

    x.fillStyle=R(0,0,0,.06);
    for(f=128; f--;) {
        g=f*2*Math.PI/128;
        x.rotate(g);
        for(i=60; i--;) {
            x.fillRect((2*S(g+2*t)+ moire_fade+ 1*S(2*t))*(60/2-i+(4*t/(2*Math.PI))%1),100,10,2e3); 
        }
    }
     
    t += t_rate;
        
    if (sun_idle) {
        
        hold_time = hold_time + .002*(.5-.5*C(idle_time/2));
        idle_time += t_rate;
    }

    if (sun_touch) {
        hold_time += hold_rate;
        hold_time = Math.min(1, hold_time);        
    }
    else {
        hold_time -= hold_rate;
        hold_time = Math.max(0, hold_time);
    }

    moire_fade = 12 + 20*(.5-.5*C(Math.PI*hold_time));

    ctx.restore();
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
    requestAnimationFrame(animate);

    now = newtime;
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        
        draw();       
    }

    if(enable_interaction) {
        canvas.addEventListener('mousedown', e => {
            sun_touch = true;
            sun_idle = false;
        });
            
        canvas.addEventListener('mouseup', e => {
            sun_touch = false;
            sun_idle = true;
            idle_time = 0
        });
        
        canvas.addEventListener('touchstart', function(e) {
            event.preventDefault();
            sun_touch = true;
            sun_idle = false;
            
        }, false);
            
        canvas.addEventListener('touchend', function(e) {
            sun_touch = false;
            sun_idle = true;
            idle_time = 0
        }, false);         
    }   
 }