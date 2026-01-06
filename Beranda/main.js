// animasi navigasi menu
const nav = document.querySelector('nav');
const links = document.querySelector('.header-links');
const navMobile = document.querySelector('.mobile-nav');
const mobilenCon = document.querySelector('.mobile-menu-container');
const body = document.body;
const navOffsettop = nav.offsetTop;

let isSticky = false;

window.addEventListener('scroll', () => {
    const shouldBeSticky = window.pageYOffset > navOffsettop;

    if (shouldBeSticky && !isSticky) {
        nav.classList.add('sticky');
        navMobile.classList.add('stickyMobile');
        mobilenCon.classList.add('stickyMobileContainer');
        body.style.marginTop = "100px";
        links.style.opacity = '0';
        isSticky = true;
    } 
    else if (!shouldBeSticky && isSticky) {
        nav.classList.remove('sticky');
        navMobile.classList.remove('stickyMobile');
        mobilenCon.classList.remove('stickyMobileContainer');
        body.style.marginTop = "0";
        links.style.opacity = '100';
        isSticky = false;
    }
});

// slide gambar
let list = document.querySelector('.picture-beranda .hero-picture');
let items = document.querySelectorAll('.picture-beranda .hero-picture .gambar-container');
let dots = document.querySelectorAll('.picture-beranda .dots li');
let prev = document.querySelector('#prev');
let next = document.querySelector('#next');

let active = 0;
let lengthItem = items.length - 1;

let refreshSlider = setInterval(() => { next.click() }, 5000);

function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.transform = `translateX(-${checkLeft}px)`;

    document.querySelector('.picture-beranda .dots li.aktif')?.classList.remove('aktif');
    dots[active].classList.add('aktif');

    document.querySelector('.gambar-container.aktif')?.classList.remove('aktif');
    items[active].classList.add('aktif');
    
    clearInterval(refreshSlider);
    refreshSlider = setInterval(() => { next.click() }, 5000);
}

next.onclick = function() {
    active = (active + 1 > lengthItem) ? 0 : active + 1;
    reloadSlider();
}

prev.onclick = function() {
    active = (active - 1 < 0) ? lengthItem : active - 1;
    reloadSlider();
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    })
});

window.addEventListener('resize', () => {
    reloadSlider();
});

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

// mobile menu icon
const menuIcon = document.querySelector('.menu-icon');
const switcher = document.querySelector('.switcher');
const mobileMenuContainer = document.querySelector ('.mobile-menu-container');
let mobileMenuContainerSticky = document.querySelector('.mobile-menu-container.stickyMobileContainer')

switcher.addEventListener('change', function() {
    if (this.checked){
        mobileMenuContainer.classList.add('active');
        mobileMenuContainerSticky.classList.add('active');
    }
    else{
        mobileMenuContainer.classList.remove('active');
        mobileMenuContainerSticky.classList.remove('active');
    }

})

// scroll down animationa
const observerOptions = {
    threshold: 0.4
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aktif');
            observer.unobserve(entry.target); 
        } 
    });
}, observerOptions);

const elemenAnimasi = document.querySelectorAll('.scroll-anim');
elemenAnimasi.forEach((el) => observer.observe(el));

// menambahkan drop down efek untuk mobile
const dropDownLayanan = document.querySelector('.drop-down-mobile .drop-down-head');
const menuDownLayanan = document.querySelector('.sub-menu-mobile');

dropDownLayanan.addEventListener('click', function(e) {
    e.preventDefault();
    menuDownLayanan.classList.toggle('dropAktif');

    const icon = this.querySelector('img');
    if(menuDownLayanan.classList.contains('dropAktif')){
        icon.style.transform = 'rotate(180deg)';
    }
    else{
        icon.style.transform = 'rotate(0deg)';
    }
})

// drop untuk deskop
const dropDownLayananDeskop = document.querySelector('.drop-down .drop-down-head');
const menuDownLayananDeskop = document.querySelector('.drop-down .sub-menu');
const tombolIsiLayanan = document.querySelectorAll('.layanan-button');

function tutupSemuaSubMenu() {
    tombolIsiLayanan.forEach(btn => {
        const subMenu = btn.nextElementSibling;
        const icon = btn.querySelector('svg');
        
        btn.classList.remove('slideAktif'); 
        if (subMenu) subMenu.classList.remove('slideAktif');
        if (icon) icon.classList.remove('panah-aktif');
        
        btn.classList.remove('is-open');
    });
}

dropDownLayananDeskop.addEventListener('click', function(e) {
    e.preventDefault();
    
    const akanMenutup = this.classList.contains('dropAktif');
    
    this.classList.toggle('dropAktif');
    menuDownLayananDeskop.classList.toggle('dropAktif');

    const iconUtama = this.querySelector('img');
    if (menuDownLayananDeskop.classList.contains('dropAktif')) {
        iconUtama.style.transform = 'rotate(180deg)';
    } else {
        iconUtama.style.transform = 'rotate(0deg)';
    }

    if (akanMenutup) {
        tutupSemuaSubMenu();
    }
});

tombolIsiLayanan.forEach(button => {
    button.addEventListener('click', function(e) {
        e.stopPropagation(); 
        
        const subMenuSekarang = this.nextElementSibling;
        const iconSekarang = this.querySelector('svg');
        const sudahTerbuka = this.classList.contains('slideAktif');

        tutupSemuaSubMenu();

        if (!sudahTerbuka) {
            this.classList.add('slideAktif');
            if (subMenuSekarang) subMenuSekarang.classList.add('slideAktif');
            if (iconSekarang) iconSekarang.classList.add('panah-aktif');
            this.classList.add('is-open');
        }
    });
});