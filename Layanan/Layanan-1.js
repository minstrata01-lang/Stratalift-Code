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
    "slope": {
        category: "GEOTECHNICAL ENGINEERING",
        title: "Slope Stability Analysis",
        description: `
            <p><strong>Slope Stability Analysis</strong> merupakan layanan rekayasa geoteknik yang bertujuan untuk mengevaluasi tingkat keamanan dan kestabilan lereng alami maupun lereng buatan terhadap potensi longsor. Analisis ini sangat penting pada area perbukitan, galian (cut slope), timbunan (fill slope), serta lereng di sekitar bangunan, jalan, tangki, dan infrastruktur kritis lainnya, khususnya pada wilayah dengan kondisi tanah kompleks dan pengaruh air tanah yang signifikan.</p>
            <p>Analisis stabilitas lereng dilakukan dengan mengintegrasikan data investigasi lapangan, hasil pengujian laboratorium, serta kondisi geometri dan lingkungan lereng. Parameter tanah yang representatif digunakan untuk mengevaluasi potensi bidang gelincir dan menghitung <strong>faktor keamanan (safety factor)</strong> terhadap berbagai kondisi pembebanan, baik kondisi statis, pengaruh muka air tanah, maupun kondisi dinamis seperti gempa. Evaluasi dilakukan menggunakan metode analisis yang telah teruji, baik metode kesetimbangan batas maupun pemodelan numerik, sehingga hasil analisis mampu merepresentasikan perilaku lereng secara realistis.</p>
            <p>Hasil analisis tidak hanya digunakan untuk menilai kondisi eksisting, tetapi juga sebagai dasar dalam merancang solusi perkuatan lereng yang efektif dan efisien, seperti perubahan geometri lereng, sistem drainase, perkuatan struktural, atau kombinasi metode stabilisasi lainnya. Seluruh rekomendasi disusun secara aplikatif dengan mempertimbangkan aspek keselamatan, konstruktabilitas, dan keberlanjutan jangka panjang.</p>
            <p>Pelaksanaan analisis stabilitas lereng mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        // Pastikan selalu gunakan Array [] dan forward slash /
        images: [
            "../Elemen/Gambar/Lifting_and_Rigging/slop(1).webp",
            "../Elemen/Gambar/Lifting_and_Rigging/slop(2).webp",
            "../Elemen/Gambar/Lifting_and_Rigging/slop(3).webp",
            "../Elemen/Gambar/Lifting_and_Rigging/slop(4).webp",
        ],
        sni: [
            { judul: "SNI 8460:2017 ", isi: "Persyaratan Perancangan Geoteknik" },
            { judul: "FHWA NHI-14-007 ", isi: "Slope Stability Reference Guide" },
            { judul: "Pedoman dan praktik umum analisis stabilitas lereng dalam rekayasa geoteknik", isi: " " }
        ]
    },
    "ground": {
        category: "GEOTECHNICAL ENGINEERING",
        title: "Ground Analysis",
        description: `
            <p><strong>Ground Analysis</strong> merupakan layanan rekayasa geoteknik yang bertujuan untuk mengevaluasi kondisi dan perilaku tanah sebagai media pendukung struktur. Analisis ini menjadi dasar utama dalam pengambilan keputusan desain pondasi, perkuatan tanah, serta penilaian risiko geoteknik seperti penurunan, daya dukung, dan deformasi tanah. Dengan pemahaman kondisi tanah yang menyeluruh, potensi permasalahan geoteknik dapat diidentifikasi sejak tahap awal perencanaan. </p>
            <p>Pelaksanaan Ground Analysis dilakukan dengan mengintegrasikan data hasil investigasi lapangan, pengujian laboratorium, serta kondisi pembebanan dan lingkungan proyek. Parameter tanah dianalisis untuk menilai kapasitas dukung tanah, distribusi tegangan, perilaku deformasi, serta interaksi tanah–struktur. Evaluasi dilakukan untuk berbagai kondisi, baik jangka pendek maupun jangka panjang, sehingga hasil analisis dapat digunakan secara langsung dalam desain yang aman dan efisien. </p>
            <p>Hasil Ground Analysis digunakan sebagai dasar dalam pemilihan jenis pondasi, penentuan kedalaman dan dimensi pondasi, serta evaluasi kebutuhan perbaikan tanah apabila diperlukan. Seluruh hasil disajikan dalam bentuk laporan teknis yang sistematis, dilengkapi dengan interpretasi yang jelas dan rekomendasi desain yang aplikatif sesuai kebutuhan proyek. </p>
            <p>Pelaksanaan Ground Analysis mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: [
            "../Elemen/Gambar/Lifting_and_Rigging/g-analis-1.webp",
            "../Elemen/Gambar/Lifting_and_Rigging/g-analis-2.webp",
            "../Elemen/Gambar/Lifting_and_Rigging/g-analis-3.webp",
            "../Elemen/Gambar/Lifting_and_Rigging/g-analis-4.webp",
            "../Elemen/Gambar/Lifting_and_Rigging/g-analis-5.webp"
        ],
        sni: [
            { judul: "SNI 8460:2017 ", isi: "Persyaratan Perancangan Geoteknik"},
            { judul: "Eurocode 7 (EN 1997)", isi: "Geotechnical Design"},
            { judul: "Bowles, J.E.", isi: "Foundation Analysis and Design"},
            { judul: "Pedoman dan praktik umum analisis tanah dalam rekayasa geoteknik", isi: ""}
        ]
    },
    "soft-ground": {
        category: "GEOTECHNICAL ENGINEERING",
        title: "Soft Ground Analysis",
        description: `
            <p><strong>Soft Ground Analysis</strong> merupakan layanan rekayasa geoteknik yang difokuskan pada evaluasi perilaku tanah lunak yang memiliki daya dukung rendah dan tingkat kompresibilitas tinggi. Kondisi tanah lunak sering dijumpai pada area rawa, pesisir, reklamasi, dan endapan aluvial, yang berpotensi menimbulkan permasalahan serius seperti penurunan berlebihan, ketidakstabilan, dan kegagalan struktur apabila tidak dianalisis secara tepat sejak tahap perencanaan.</p>
            <p>Analisis tanah lunak dilakukan dengan mengintegrasikan data investigasi lapangan, hasil pengujian laboratorium, serta parameter konsolidasi tanah untuk mengevaluasi besarnya dan laju penurunan tanah akibat pembebanan. Evaluasi mencakup analisis penurunan primer dan sekunder, stabilitas selama dan pasca konstruksi, serta pengaruh beban bertahap terhadap kinerja tanah. Analisis ini menjadi dasar dalam menentukan kelayakan desain dan strategi konstruksi yang aman pada tanah lunak.</p>
            <p>Hasil Soft Ground Analysis digunakan untuk merumuskan rekomendasi teknis yang aplikatif, termasuk penentuan jenis pondasi yang sesuai, kebutuhan perbaikan tanah, metode percepatan konsolidasi, serta pengendalian risiko selama pelaksanaan konstruksi. Seluruh hasil analisis disajikan secara sistematis dan mudah dipahami, sehingga dapat digunakan sebagai dasar pengambilan keputusan oleh pemilik proyek, konsultan, maupun kontraktor.</p>
            <p>Pelaksanaan Soft Ground Analysis mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: [
            "../Elemen/Gambar/Lifting_and_Rigging/soft(1).webp",
            "../Elemen/Gambar/Lifting_and_Rigging/soft(2).webp"
        ],
        sni: [
            { judul: "•	SNI 8460;2017 ", isi: "Persyaratan Perancangan Geoteknik" },
            { judul: "•	Terzaghi, Peck & Mesri ", isi: "Geotechnical Design" },
            { judul: "•	Terzaghi, Peck & Mesri ", isi: "Soil Mechanics in Engineering Practice" },
            { judul: "•	Pedoman dan praktik umum analisis tanah lunak dalam rekayasa geoteknik", isi: " " }
        ]
    },
    "foundation": {
        category: "GEOTECHNICAL ENGINEERING",
        title: "Foundation Analysis ",
        description: `
            <p><strong>Foundation Analysis</strong> merupakan layanan rekayasa geoteknik yang bertujuan untuk memastikan pondasi mampu menyalurkan beban struktur ke tanah secara aman dan terkendali. Analisis ini menjadi tahapan krusial dalam perencanaan bangunan, infrastruktur, dan fasilitas industri, karena kegagalan pondasi dapat berdampak langsung terhadap keselamatan struktur dan operasional jangka panjang.</p>
            <p>Analisis pondasi dilakukan dengan mengintegrasikan data investigasi tanah, hasil pengujian laboratorium, serta karakteristik beban dan tipe struktur yang akan didukung. Evaluasi mencakup analisis daya <strong>dukung tanah, penurunan (settlement)</strong>, serta interaksi tanah–struktur untuk berbagai jenis pondasi, baik <strong>pondasi dangkal</strong> maupun <strong>pondasi dalam</strong>. Analisis dilakukan untuk kondisi jangka pendek dan jangka panjang, termasuk pengaruh muka air tanah, konsolidasi, serta beban dinamis apabila diperlukan. </p>
            <p>Hasil Foundation Analysis digunakan sebagai dasar dalam menentukan jenis pondasi yang paling sesuai, dimensi pondasi, kedalaman penanaman, serta kebutuhan perkuatan atau perbaikan tanah apabila kondisi tanah eksisting tidak memenuhi persyaratan desain. Seluruh rekomendasi disusun secara aplikatif dengan mempertimbangkan aspek keselamatan, efisiensi konstruksi, serta keberlanjutan kinerja struktur selama masa layan.</p>
            <p>Pelaksanaan Foundation Analysis mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: [
            "../Elemen/Gambar/Lifting_and_Rigging/foundation-1.webp",
            "../Elemen/Gambar/Lifting_and_Rigging/foundation-2.webp",
            "../Elemen/Gambar/Lifting_and_Rigging/foundation-3.webp",
        ],
        sni: [
            { judul: "SNI 8460:2017 ", isi: "Persyaratan Perancangan Geoteknik" },
            { judul: "SNI 1726 ", isi: "Tata cara perencanaan ketahanan gempa untuk struktur bangunan dan non-bangunan" },
            { judul: "Eurocode 7 (EN 1997) ", isi: "Geotechnical Design" },
            { judul: "Bowles, J.E. ", isi: "Foundation Analysis and Design" },
            { judul: "Tomlinson & Woodward ", isi: "Pile Design and Construction Practice" }
        ]
    }
};

// State Slider
let currentIndex = 0;
let currentImages = [];
let autoSlideTimer;

// Variabel untuk Swipe
let touchStartX = 0;
let touchEndX = 0;

function getServiceId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id') || 'slope';
}

function renderPage() {
    const id = getServiceId();
    const data = dataLayanan[id];
    if (!data) return;

    document.getElementById('category-title').innerText = data.category;
    document.getElementById('service-title').innerText = data.title;
    document.getElementById('service-description').innerHTML = data.description;
    document.title = `${data.title} - Stratalift Solutions`;

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

    currentImages = data.images;
    currentIndex = 0;
    stopAutoSlide();
    setupSlider();
}

function setupSlider() {
    const container = document.querySelector('.main-gambar-slide');
    if (!container) return;

    // 1. Buat seluruh HTML dalam satu variabel string (Atomic Update)
    let content = `<img id="slider-img" src="${currentImages[0]}" alt="Service Image" style="transition: opacity 0.3s ease;">`;

    if (currentImages.length > 1) {
        content += `
            <button class="slider-btn prev" onclick="manualChange(-1)" aria-label="Previous">&#10094;</button>
            <button class="slider-btn next" onclick="manualChange(1)" aria-label="Next">&#10095;</button>
            <div class="slider-dots" id="dots-container"></div>
        `;
    }

    container.innerHTML = content;

    if (currentImages.length > 1) {
        renderDots();
        startAutoSlide();
        addSwipeListeners(container);
        
        // 2. Gunakan Event Delegation pada container
        // Ini jauh lebih stabil untuk mobile
        setupMobileFeedback(container);
    }
}

function setupMobileFeedback(container) {
    const handlePress = (e) => {
        const btn = e.target.closest('.slider-btn');
        if (!btn) return;
        
        if (e.type === 'touchstart') {
            // Hapus class dari tombol lain dulu untuk memastikan kebersihan
            document.querySelectorAll('.slider-btn').forEach(b => b.classList.remove('is-pressed'));
            btn.classList.add('is-pressed');
        } else {
            // Berikan delay sangat singkat agar transisi CSS sempat terlihat
            setTimeout(() => {
                btn.classList.remove('is-pressed');
            }, 100);
        }
    };

    container.addEventListener('touchstart', handlePress, { passive: true });
    container.addEventListener('touchend', handlePress, { passive: true });
    container.addEventListener('touchcancel', handlePress, { passive: true });
    
    // Tambahan: Jika pengguna mulai men-swipe, hilangkan efek tekan
    container.addEventListener('touchmove', () => {
        document.querySelectorAll('.slider-btn').forEach(b => b.classList.remove('is-pressed'));
    }, { passive: true });
}

// Fungsi deteksi Swipe
function addSwipeListeners(container) {
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
}

function handleSwipe() {
    const swipeThreshold = 50; // Jarak minimal geser (pixel)
    if (touchStartX - touchEndX > swipeThreshold) {
        manualChange(1); // Swipe Kiri -> Next
    } else if (touchEndX - touchStartX > swipeThreshold) {
        manualChange(-1); // Swipe Kanan -> Prev
    }
}

function changeSlide(direction) {
    currentIndex += direction;
    if (currentIndex >= currentImages.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = currentImages.length - 1;
    updateSliderView();
}

function updateSliderView() {
    const imgElement = document.getElementById('slider-img');
    if (imgElement) {
        imgElement.style.opacity = 0.4; // Efek transisi halus
        setTimeout(() => {
            imgElement.src = currentImages[currentIndex];
            imgElement.style.opacity = 1;
        }, 150);
    }
    updateDots();
}

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
    if (currentImages.length > 1) {
        autoSlideTimer = setInterval(() => changeSlide(1), 5000);
    }
}

function stopAutoSlide() {
    clearInterval(autoSlideTimer);
}

window.onload = renderPage;