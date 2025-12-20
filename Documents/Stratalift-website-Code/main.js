// animasi navigasi menu
const nav = document.querySelector('nav');
const links = document.querySelector('.header-links')
const navOffsettop =  nav.offsetTop;
const navOffsetdown = nav.off

const body = document.body

window.addEventListener('scroll', () => {
    if(window.pageYOffset >= navOffsettop){
        nav.classList.add('sticky');
        body.style.marginTop = "100px";
        links.style.opacity = '0';
    }
    else{
        nav.classList.remove('sticky');
        body.style.marginTop = "0";
        links.style.opacity = '100';
    }
})

// slice gambar
let list = document.querySelector('.picture-beranda .hero-picture');
let items = document.querySelectorAll('.picture-beranda .hero-picture .gambar');
let dots = document.querySelectorAll('.picture-beranda .dots li');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');

let active = 0;
let lengthItem = items.length - 1;


next.onclick = function(){
    if(active + 1 > lengthItem){
        active = 0;
    }
    else{
        active = active + 1;
    }
    reloadSlider()
}

prev.onclick = function(){
    if(active - 1 < 0){
        active = lengthItem;
    } else {
        active = active - 1;
    }
    reloadSlider();
}

let refreshSlider = setInterval(() => {next.click()}, 3000)

function reloadSlider(){
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';
    let lastActiveDot = document.querySelector('.picture-beranda .dots li.aktif');
    lastActiveDot.classList.remove('aktif');
    dots[active].classList.add('aktif');
}

dots.forEach((li, key) => {
    li.addEventListener('click', function(){
        active = key;
        reloadSlider();
    })
})