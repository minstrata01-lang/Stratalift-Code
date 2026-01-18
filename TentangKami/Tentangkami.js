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

// navigation bar untuk mobile
const menuData = {
    'Layanan': {
        title: 'Layanan Kami',
        items: [
            { text: 'Soil Investigation', subKey: 'soil_sub' },
            { text: 'Geotechnical Engineering', subKey: 'geo_sub' },        
            { text: 'Lifting & Rigging Engineering', subKey: 'lift_sub' }
        ]
    },
    'soil_sub': {
        title: 'Soil Investigation',
        items: [
            { text: 'Sondir/Core Penetration Test (CPT)', url: '../Soil_investigation/Soil_Investigation.html?id=sondir' },
            { text: 'Boring & Standard Penetration Test (SPT)', url: '../Soil_investigation/Soil_Investigation.html?id=boring'},
            { text: 'Laboratorium Test', url: '../Soil_investigation/Soil_Investigation.html?id=lab-test'},
            { text: 'Geolistrik/Electrical Resistivity Tomography (ERT)', url: '../Soil_investigation/Soil_Investigation.html?id=geo_listrik'},
            { text: 'Ground Penetrating Radar (GPR)', url: '../Soil_investigation/Soil_Investigation.html?id=ground_penet'},
            { text: 'Geotechnical Instruments', url: '../Soil_investigation/Soil_Investigation.html?id=geo_inst'}
        ]
    },
    'geo_sub' : {
        title : 'Geotechnical Engineering',
        items: [
            {text: 'Slope Stability Anlaysis', url: '../Geo_engineer/Geo_eng.html?id=slope'},
            {text: 'Ground Analysis', url: '../Geo_engineer/Geo_eng.html?id=ground'},
            {text: 'Soft Ground Anlaysiis', url: '../Geo_engineer/Geo_eng.html?id=soft-ground'},
            {text: 'Foundation Analysis', url: '../Geo_engineer/Geo_eng.html?id=foundation'}
        ]
    },
    'lift_sub' : {
        title : 'Lifting and Rigging Engineering',
        items : [
            { text: 'Lifting Management System', url: '../Lifting_Ringging/Lifting.html?id=manage'},
            { text: 'Lifting Operation Plan', url: '../Lifting_Ringging/Lifting.html?id=operration'},
            { text: 'Lifting Equipment Design', url: '../Lifting_Ringging/Lifting.html?id=design'},
            { text: 'Lifting Equipment Inspection', url: '../Lifting_Ringging/Lifting.html?id=inspection'},
            { text: 'Residual Life Assessment', url: '../Lifting_Ringging/Lifting.html?id=residual'},
            { text: 'Training', url: '../Lifting_Ringging/Lifting.html?id=training'}
        ]
    }
};

// Fungsi ke Level 2
function openL2(key) {
    const data = menuData[key];
    if(!data) return;

    document.getElementById('title-l2').innerText = data.title;
    const container = document.getElementById('links-l2');
    container.innerHTML = '';

    data.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `<span>${item.text}</span> ${item.subKey ? '<span>&rsaquo;</span>' : ''}`;
        
        div.onclick = () => {
            if (item.subKey) openL3(item.subKey); // Panggil Level 3 jika ada subKey
            else window.location.href = item.url;
        };
        container.appendChild(div);
    });

    document.getElementById('main-panel').classList.add('exit');
    document.getElementById('sub-panel').classList.add('active');
}

// Fungsi ke Level 3
function openL3(key) {
    const data = menuData[key];
    if(!data) return;

    document.getElementById('title-l3').innerText = data.title;
    const container = document.getElementById('links-l3');
    container.innerHTML = '';

    data.items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerText = item.text;
        div.onclick = () => window.location.href = item.url;
        container.appendChild(div);
    });

    document.getElementById('sub-panel').classList.add('exit');
    document.getElementById('second-sub-panel').classList.add('active');
}

// Navigasi Balik
function closeL2() {
    document.getElementById('main-panel').classList.remove('exit');
    document.getElementById('sub-panel').classList.remove('active');
}

function closeL3() {
    document.getElementById('sub-panel').classList.remove('exit');
    document.getElementById('second-sub-panel').classList.remove('active');
}

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
