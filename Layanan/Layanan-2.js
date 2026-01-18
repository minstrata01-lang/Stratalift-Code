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
            { text: 'Sondir/Core Penetration Test (CPT)', url: '/Soil_investigation/Soil_Investigation.html?id=sondir' },
            { text: 'Boring & Standard Penetration Test (SPT)', url: '/Soil_investigation/Soil_Investigation.html?id=boring'},
            { text: 'Laboratorium Test', url: '/Soil_investigation/Soil_Investigation.html?id=lab-test'},
            { text: 'Geolistrik/Electrical Resistivity Tomography (ERT)', url: '/Soil_investigation/Soil_Investigation.html?id=geo_listrik'},
            { text: 'Ground Penetrating Radar (GPR)', url: '/Soil_investigation/Soil_Investigation.html?id=ground_penet'},
            { text: 'Geotechnical Instruments', url: '/Soil_investigation/Soil_Investigation.html?id=geo_inst'}
        ]
    },
    'geo_sub' : {
        title : 'Geotechnical Engineering',
        items: [
            {text: 'Slope Stability Anlaysis', url: '/Geo_engineer/Geo_eng.html?id=slope'},
            {text: 'Ground Analysis', url: '/Geo_engineer/Geo_eng.html?id=ground'},
            {text: 'Soft Ground Anlaysiis', url: '/Geo_engineer/Geo_eng.html?id=soft-ground'},
            {text: 'Foundation Analysis', url: '/Geo_engineer/Geo_eng.html?id=foundation'}
        ]
    },
    'lift_sub' : {
        title : 'Lifting and Rigging Engineering',
        items : [
            { text: 'Lifting Management System', url: '/Lifting_Ringging/Lifting.html?id=manage'},
            { text: 'Lifting Operation Plan', url: '/Lifting_Ringging/Lifting.html?id=operration'},
            { text: 'Lifting Equipment Design', url: '/Lifting_Ringging/Lifting.html?id=design'},
            { text: 'Lifting Equipment Inspection', url: '/Lifting_Ringging/Lifting.html?id=inspection'},
            { text: 'Residual Life Assessment', url: '/Lifting_Ringging/Lifting.html?id=residual'},
            { text: 'Training', url: '/Lifting_Ringging/Lifting.html?id=training'},
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

// Tambahan untuk layanan
// 1. Data Konten Semua Layanan
const dataLayanan = {
    "manage": {
        category: "Lifting & Rigging Engineering",
        title: "Lifting Management System",
        description: `
            <p><strong>Lifting Management System</strong> adalah pendekatan sistematis untuk memastikan seluruh aktivitas pengangkatan beban dilakukan secara <strong>aman, terkontrol, dan sesuai standar internasional</strong>. Sistem ini mengintegrasikan aspek <strong>engineering, operasional, dan keselamatan kerja</strong> ke dalam satu kerangka kerja yang terstruktur.</p>
            <p>Layanan kami mencakup penyusunan <strong>kebijakan dan prosedur lifting</strong>, klasifikasi tingkat risiko (basic, standard, critical lift), pengendalian kompetensi personel, hingga verifikasi dokumen teknis seperti <strong>lifting plan, rigging study, dan risk assessment</strong>. Dengan Lifting Management System yang tepat, potensi kecelakaan, kegagalan alat, dan downtime proyek dapat diminimalkan secara signifikan.</p>
        `,
        // Pastikan selalu gunakan Array [] dan forward slash /
        images: [
            "../Elemen/Gambar/Geotechnical/manage-1.webp",
        ],
        sni: [
            
        ]
    },
    "operration": {
        category: "LIFTING & RIGGING ENGINEERING ",
        title: "Lifting Operation Plan",
        description: `
            <p><strong>Lifting Operation Plan</strong> adalah dokumen teknis yang menjabarkan secara rinci <strong>bagaimana suatu aktivitas pengangkatan beban akan dilaksanakan dengan aman dan terkendali</strong>. Dokumen ini menjadi acuan utama bagi seluruh pihak yang terlibat, mulai dari engineer, supervisor, hingga tim operasional di lapangan. </p>
            <p>Lifting Operation Plan kami disusun berbasis <strong>engineering calculation dan risk-based approach</strong>, mencakup penentuan metode angkat, perhitungan beban (gross load & center of gravity), verifikasi kapasitas crane, desain dan pemilihan rigging, serta analisis kondisi tanah dan area kerja. Setiap rencana dilengkapi dengan <strong>risk assessment, sequence of work, lifting drawing, dan emergency consideration</strong>, serta mengacu pada standar internasional seperti <strong>BS 7121 dan ASME B30</strong>.</p>
            <p>Dengan Lifting Operation Plan yang komprehensif, pelaksanaan lifting dapat dilakukan secara <strong>lebih aman, efisien, dan dapat dipertanggungjawabkan secara teknis</strong>, sekaligus meminimalkan risiko kecelakaan dan kegagalan peralatan.</p>
            <p> </p>
        `,
        images: [
            "../Elemen/Gambar/Geotechnical/oper-1.webp",
            "../Elemen/Gambar/Geotechnical/oper-2.webp",
            "../Elemen/Gambar/Geotechnical/oper-3.webp",
        ],
        sni: [
            
        ]

    },
    "design": {
        category: "LIFTING & RIGGING ENGINEERING ",
        title: "Lifting Equipment Design",
        description: `
            <p>Kami menyediakan layanan <strong>perancangan peralatan lifting khusus (engineered lifting devices) </strong> yang disesuaikan dengan kebutuhan proyek dan kondisi lapangan. Desain dilakukan berbasis perhitungan teknik, bukan asumsi, untuk memastikan <strong>kekuatan, stabilitas, dan faktor keselamatan </strong>terpenuhi.</p>
            <p>Ruang lingkup desain meliputi <strong> spreader beam, lifting beam, pad eye, lug plate, temporary steel support, dan custom lifting frame</strong>. Seluruh desain divalidasi melalui analisis tegangan, defleksi, dan sambungan, serta mengacu pada standar internasional seperti ASME, BS 7121, dan DNV. Hasil desain siap digunakan untuk fabrikasi dan pelaksanaan lifting di lapangan.</p>
        `,
        images: [
            "../Elemen/Gambar/Geotechnical/desain-1.webp",
            "../Elemen/Gambar/Geotechnical/desain-2.webp",
            "../Elemen/Gambar/Geotechnical/desain-3.webp",
            "../Elemen/Gambar/Geotechnical/desain-4.webp",
            "../Elemen/Gambar/Geotechnical/desain-5.webp"
        ],
        sni: [
            
        ]
    },
    "inspection": {
        category: "LIFTING & RIGGING ENGINEERING",
        title: "Lifting Equipment Inspection ",
        description: `
            <p>Lifting Equipment Inspection bertujuan untuk memastikan seluruh peralatan angkat berada dalam kondisi <strong>layak operasi dan aman digunakan</strong>. Inspeksi dilakukan secara sistematis untuk mengidentifikasi potensi cacat, degradasi material, maupun ketidaksesuaian terhadap standar keselamatan.</p>
            <p>Layanan inspeksi kami meliputi <strong>visual inspection, dimensional check, load identification, serta Non-Destructive Test (NDT)</strong> seperti magnetic particle atau ultrasonic test bila diperlukan. Inspeksi dilakukan pada sling, shackle, lifting beam, pad eye, hingga aksesoris rigging lainnya, disertai laporan teknis dan rekomendasi kelayakan penggunaan.</p>
        `,
        images: [
            "../Elemen/Gambar/Geotechnical/insp-1.webp",
            "../Elemen/Gambar/Geotechnical/insp-2.webp",
            "../Elemen/Gambar/Geotechnical/insp-3.webp"
        ],
        sni: [
            
        ]
    },
    "residual": {
        category: "LIFTING & RIGGING ENGINEERING ",
        title: "Residual Life Assessment",
        description: `
            <p>Residual Life Assessment (RLA) adalah kajian teknik untuk menentukan <strong>sisa umur pakai (residual life)</strong> peralatan lifting berdasarkan kondisi aktual, histori penggunaan, dan mekanisme degradasi material. Layanan ini berperan penting dalam memastikan peralatan tetap <strong>aman, andal, dan layak operasi</strong> sepanjang siklus hidupnya.</p>
            <p>Analisis dilakukan melalui evaluasi <strong>beban kerja aktual, jumlah dan spektrum siklus lifting, kelelahan material (fatigue), korosi, serta hasil inspeksi dan Non-Destructive Test (NDT)</strong>. Pendekatan ini memungkinkan penilaian objektif terhadap tingkat risiko kegagalan, serta rekomendasi teknis apakah peralatan masih dapat digunakan, memerlukan perbaikan, atau harus dipensiunkan.</p>
            <p>Dengan Residual Life Assessment, klien dapat mengambil keputusan berbasis <strong>engineering judgment</strong>, mengoptimalkan pemanfaatan aset, serta menghindari risiko keselamatan dan biaya tak terduga akibat kegagalan peralatan lifting. </p>
        `,
        sni: [
            
        ]
    },
    "training": {
        category: "LIFTING & RIGGING ENGINEERING ",
        title: "Training ",
        description: `
            <p>Kami menyediakan <strong>pelatihan lifting berbasis praktik engineering dan keselamatan kerja</strong>, dirancang untuk meningkatkan kompetensi personel yang terlibat dalam aktivitas pengangkatan beban. Pelatihan tidak hanya fokus pada prosedur, tetapi juga pemahaman <strong>prinsip teknis di balik lifting</strong>.</p>
            <p>Materi pelatihan mencakup <strong>dasar-dasar lifting & rigging, interpretasi load chart crane, pengenalan peralatan lifting, risk assessment, hingga critical lifting operation</strong>. Program dapat disesuaikan untuk operator, rigger, supervisor, maupun engineer, dan disampaikan oleh praktisi berpengalaman di bidang lifting engineering.</p>
        `,
        sni: [
        
        ]
    }
};

// State Slider
let currentIndex = 0;
let currentImages = [];
let autoSlideTimer;

function getServiceId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || 'manage';
}

function renderPage() {
    const id = getServiceId();
    const data = dataLayanan[id];

    if (!data) return;

    // 1. Update Konten Teks & Header
    document.getElementById('category-title').innerText = data.category;
    document.getElementById('service-title').innerText = data.title;
    document.getElementById('service-description').innerHTML = data.description;
    document.title = `${data.title} - Stratalift Solutions`;

    // 2. Update SNI
    const sniContainer = document.getElementById('service-sni');
    sniContainer.innerHTML = ''; 
    data.sni.forEach(item => {
        const liJudul = document.createElement('li');
        liJudul.className = 'SNI-judul';
        liJudul.innerText = item.judul;
        const liIsi = document.createElement('li');
        liIsi.className = 'SNI-isi';
        liIsi.innerText = item.isi;
        sniContainer.appendChild(liJudul);
        sniContainer.appendChild(liIsi);
    });

    // 3. Setup Slider
    currentImages = data.images;
    currentIndex = 0;
    stopAutoSlide();
    setupSlider();
}

function setupSlider() {
    const container = document.querySelector('.main-gambar-slide');
    if (!container) return;

    // Bersihkan container dan masukkan gambar pertama
    container.innerHTML = `<img id="slider-img" src="${currentImages[0]}" alt="Service Image">`;

    // Jika gambar lebih dari satu, munculkan navigasi
    if (currentImages.length > 1) {
        container.innerHTML += `
            <button class="slider-btn prev" onclick="manualChange(-1)">&#10094;</button>
            <button class="slider-btn next" onclick="manualChange(1)">&#10095;</button>
            <div class="slider-dots" id="dots-container"></div>
        `;
        renderDots();
        startAutoSlide();
    }
}

// Logika Perubahan Slide
function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateSliderView();
}

function updateSliderView() {
    const imgElement = document.getElementById('slider-img');
    if (imgElement) {
        imgElement.style.opacity = 0;
        setTimeout(() => {
            imgElement.src = currentImages[currentIndex];
            imgElement.style.opacity = 1;
        }, 200);
    }
    updateDots();
}

// Navigasi Manual
function manualChange(direction) {
    stopAutoSlide();
    changeSlide(direction);
    startAutoSlide();
}

function manualGoTo(index) {
    stopAutoSlide();
    currentIndex = index;
    updateSliderView();
    startAutoSlide();
}

// Dots & AutoSlide
function renderDots() {
    const dotsContainer = document.getElementById('dots-container');
    if (dotsContainer) {
        dotsContainer.innerHTML = currentImages.map((_, i) => 
            `<span class="dot ${i === 0 ? 'active' : ''}" onclick="manualGoTo(${i})"></span>`
        ).join('');
    }
}

function updateDots() {
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function startAutoSlide() {
    autoSlideTimer = setInterval(() => changeSlide(1), 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

// Jalankan saat load
window.onload = renderPage;