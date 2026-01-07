const nav = document.querySelector('nav');
const links = document.querySelector('.header-links');
const navOffsettop =  nav.offsetTop;
const navMobile = document.querySelector('.mobile-nav');
const mobilenCon = document.querySelector('.mobile-menu-container')

const body = document.body

window.addEventListener('scroll', () => {
    if(window.pageYOffset > navOffsettop){
        nav.classList.add('sticky');
        navMobile.classList.add('stickyMobile');
        mobilenCon.classList.add('stickyMobileContainer');
        body.style.marginTop = "100px";
        links.style.opacity = '0';
    }
    else{
        nav.classList.remove('sticky');
        navMobile.classList.remove('stickyMobile');
        mobilenCon.classList.remove('stickyMobileContainer');
        body.style.marginTop = "0";
        links.style.opacity = '100';
    }
})

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

// scroll down animation
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

// Hover untuk core-service
const coreService = document.querySelectorAll('.servicebox');
const isMobilePad = window.matchMedia("(max-width: 1100px)").matches;
const isMobilePadMini = window.matchMedia("(max-width: 800px)").matches;
const isPhone = window.matchMedia("(max-width: 450px)").matches;

if(isMobilePad){
    coreService.forEach((kotakCore) => {
        kotakCore.classList.remove('core-aktif');
    })
}
else{
    coreService.forEach((kotakCore) => {

        kotakCore.addEventListener('mouseenter', () => {
        kotakCore.classList.add('core-aktif');
        })

        kotakCore.addEventListener('mouseleave', () => {
        kotakCore.classList.remove('core-aktif');
        })
    })
}

//Hover untuk core value
const coreValue = document.querySelectorAll('.kotak');

if(isPhone){
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "-370px 0px -400px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('core-value-aktif');
            } else {
                entry.target.classList.remove('core-value-aktif')
            }
        });
    }, observerOptions);

    coreValue.forEach((kotakValue) => observer.observe(kotakValue));
}

else if(isMobilePadMini){
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "-400px 0px -500px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('core-value-aktif');
            } else {
                entry.target.classList.remove('core-value-aktif')
            }
        });
    }, observerOptions);

    coreValue.forEach((kotakValue) => observer.observe(kotakValue));
}

else if(isMobilePad){
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "-500px 0px -700px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting){
                entry.target.classList.add('core-value-aktif');
            } else {
                entry.target.classList.remove('core-value-aktif')
            }
        });
    }, observerOptions);

    coreValue.forEach((kotakValue) => observer.observe(kotakValue));
}

else{
    coreValue.forEach((kotakValue) => {
    kotakValue.addEventListener('mouseenter', () =>{
        kotakValue.classList.add('core-value-aktif');
    })

    kotakValue.addEventListener('mouseleave', () => {
        kotakValue.classList.remove('core-value-aktif')
    })
})
}

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

// drop down deskop
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
