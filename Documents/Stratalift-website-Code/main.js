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

let refreshSlider = setInterval(() => {next.click()}, 5000);

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

// slide mitra
let listMitra = document.querySelector('.mitra-slider .mitra-logo');
let nextMitra = document.querySelector('#nextMitra'); 
let prevMitra = document.querySelector('#prevMitra');

let isAnimating = false;

function showSlider(type) {
    let itemsMitra = document.querySelectorAll('.mitra-slider .mitra-logo .logo');
    
    if (itemsMitra.length === 0 || isAnimating) return;
    isAnimating = true;

    let itemWidth = itemsMitra[0].offsetWidth;

    if (type === 'next') {
        listMitra.style.transition = 'transform 0.5s ease-in-out';
        listMitra.style.transform = `translateX(-${itemWidth}px)`;

        setTimeout(() => {
            listMitra.style.transition = 'none';
            listMitra.appendChild(itemsMitra[0]); 
            listMitra.style.transform = 'translateX(0)';
            isAnimating = false;
        }, 500);

    } else {
        listMitra.style.transition = 'none';
        let lastItem = itemsMitra[itemsMitra.length - 1];
        listMitra.prepend(lastItem);
        
        listMitra.style.transform = `translateX(-${itemWidth}px)`;

        setTimeout(() => {
            listMitra.style.transition = 'transform 0.5s ease-in-out';
            listMitra.style.transform = 'translateX(0)';
            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, 20);
    }
}

// Event Listener
nextMitra.onclick = function() {
    showSlider('next');
    resetAutoSlide();
}

prevMitra.onclick = function() {
    showSlider('prev');
    resetAutoSlide();
}

// Auto Slide
let refreshSliderMitra = setInterval(() => {
    nextMitra.click();
}, 5000);

function resetAutoSlide() {
    clearInterval(refreshSliderMitra);
    refreshSliderMitra = setInterval(() => {
        nextMitra.click();
    }, 5000);
}