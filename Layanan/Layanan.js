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
    "sondir": {
        category: "SOIL INVESTIGATION",
        title: "Sondir/Cone Penetration Test (CPT)",
        description: `
            <p><strong>Sondir / Cone Penetration Test (CPT)</strong> merupakan metode penyelidikan tanah in-situ yang digunakan untuk mengetahui kondisi dan karakteristik tanah bawah permukaan secara cepat, akurat, dan berkesinambungan. Pengujian ini dilakukan dengan menekan konus baja berstandar ke dalam tanah secara vertikal dengan kecepatan konstan, sehingga diperoleh data tahanan tanah terhadap penetrasi. Dari hasil tersebut, dapat diinterpretasikan jenis lapisan tanah, tingkat kepadatan atau kekerasan tanah, serta estimasi daya dukung dan potensi penurunan tanah yang sangat penting dalam perencanaan pondasi, stabilitas lereng, dan pekerjaan geoteknik lainnya.</p>
            <p>Pelaksanaan pengujian dilakukan langsung di lapangan dengan peralatan khusus yang diposisikan tegak dan distabilkan menggunakan sistem reaksi. Konus kemudian ditekan secara kontinu ke dalam tanah hingga kedalaman yang direncanakan atau sampai mencapai batas kemampuan alat. Selama proses penekanan, data tahanan ujung dan hambatan selimut tanah dicatat secara berkelanjutan, baik menggunakan sistem manual maupun digital, sehingga menghasilkan profil tanah yang detail terhadap kedalaman. Metode ini sangat efektif karena tidak memerlukan pengambilan contoh tanah, waktu pelaksanaan relatif singkat, dan memberikan gambaran kondisi tanah yang representatif.</p>
            <p>Peralatan yang digunakan dalam pekerjaan sondir meliputi mesin sondir atau CPT rig (manual maupun hidrolik), konus baja standar, batang sondir, sistem beban atau reaksi, serta alat ukur tekanan dan perlengkapan keselamatan kerja. Seluruh pekerjaan dilaksanakan oleh personel berpengalaman dengan memperhatikan aspek keselamatan dan ketelitian pengukuran.</p>
            <p>Pelaksanaan dan interpretasi pengujian Sondir/Cone Penetration Test mengacu pada standar dan pedoman berikut:</p>
        `,
        // Pastikan selalu gunakan Array [] dan forward slash /
        images: [
            "../Elemen/Gambar/foto bersama.webp",
            "../Elemen/Gambar/soil-investigation/sodir-2.webp",
            "../Elemen/Gambar/soil-investigation/sodir-3.webp"
        ],
        sni: [
            { judul: "SNI 2827:2018", isi: "Cara Uji Penetrasi Lapangan dengan Alat Sondir" },
            { judul: "SNI 8460:2017", isi: "Persyaratan Perancangan Geoteknik" }
        ]
    },
    "boring": {
        category: "SOIL INVESTIGATION",
        title: "Boring & Standard Penetration Test (SPT)",
        description: `
            <p><strong>Boring & Standard Penetration Test (SPT)</strong> merupakan metode penyelidikan tanah yang dilakukan melalui pengeboran untuk mengetahui kondisi lapisan tanah secara langsung serta memperoleh data teknis yang diperlukan dalam perencanaan geoteknik. Metode ini digunakan secara luas untuk mendukung desain pondasi, analisis daya dukung tanah, evaluasi penurunan (settlement), serta penilaian stabilitas tanah pada berbagai jenis proyek bangunan dan infrastruktur.</p>
            <p>Pelaksanaan pekerjaan dilakukan dengan pengeboran tanah hingga kedalaman yang direncanakan sambil melakukan pengamatan visual terhadap jenis dan susunan lapisan tanah. Pada interval kedalaman tertentu, dilakukan <strong>Standard Penetration Test (SPT)</strong> dengan metode pemukulan palu standar untuk mendapatkan nilai pukulan (N-SPT). Nilai ini menjadi parameter penting dalam menentukan tingkat kepadatan tanah pasir, konsistensi tanah lempung, serta sebagai dasar estimasi parameter geoteknik untuk kebutuhan desain. Selain itu, selama proses boring dapat diambil contoh tanah terganggu maupun tidak terganggu untuk pengujian laboratorium lebih lanjut.</p>
            <p>Pekerjaan Boring & SPT dilaksanakan menggunakan mesin bor geoteknik beserta perlengkapan standar seperti mata bor, batang bor, tabung contoh, dan palu SPT. Seluruh kegiatan dilakukan oleh personel berpengalaman dengan memperhatikan aspek keselamatan kerja dan kualitas data. Hasil penyelidikan disajikan dalam bentuk <strong>bor log</strong> yang sistematis dan informatif, memuat deskripsi lapisan tanah, nilai N-SPT, serta informasi pendukung lainnya yang relevan dengan kebutuhan proyek.</p>
            <p>Pelaksanaan dan interpretasi hasil Boring & Standard Penetration Test mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: [
            "../Elemen/Gambar/soil-investigation/boring-1.webp",
            "../Elemen/Gambar/soil-investigation/boring-2.webp",
            "../Elemen/Gambar/soil-investigation/boring-3.webp",
            "../Elemen/Gambar/soil-investigation/boring-4.webp"
        ],
        sni: [
            { judul: "SNI 4153:2008 ", isi: "Tata cara pelaksanaan Standard Penetration Test (SPT)"},
            { judul: "ASTM D1586 ", isi: "Standard Test Method for Standard Penetration Test (SPT) and Split-Barrel Sampling of Soils"},
            { judul: "SNI 8460:2017 ", isi: "Persyaratan Perancangan Geoteknik"},
            { judul: "Pedoman dan praktik umum geoteknik yang berlaku dalam industri konstruksi", isi: ""}
        ]
    },
    "lab-test": {
        category: "SOIL INVESTIGATION",
        title: "Laboratorium Test",
        description: `
            <p><strong>Pengujian Laboratorium Tanah</strong> merupakan bagian penting dalam penyelidikan geoteknik untuk memperoleh parameter teknis tanah secara kuantitatif dan terkontrol. Pengujian ini dilakukan terhadap contoh tanah yang diambil dari lapangan melalui pekerjaan boring atau sampling, dengan tujuan untuk memahami sifat fisik dan mekanis tanah sebagai dasar analisis dan perencanaan konstruksi yang aman serta efisien.</p>
            <p>Jenis pengujian yang dilakukan meliputi <strong>berat jenis tanah (specific gravity)</strong> untuk mengetahui karakteristik mineral tanah, <strong>kadar air alami (natural moisture content)</strong> sebagai indikator kondisi eksisting tanah di lapangan, serta <strong>Atterberg Limits</strong> yang mencakup liquid limit, plastic limit, dan plasticity index guna mengklasifikasikan perilaku plastisitas tanah berbutir halus. Selain itu, dilakukan pengujian <strong>bobot isi tanah (unit weight)</strong> untuk menentukan berat tanah per satuan volume yang berpengaruh langsung terhadap perhitungan tegangan tanah dan stabilitas struktur.</p>
            <p>Untuk mengetahui kekuatan tanah, dilakukan pengujian kuat <strong>tekan bebas (Unconfined Compression Test)</strong> yang umum digunakan pada tanah lempung jenuh, serta <strong>uji Triaxial UU (Unconsolidated Undrained)</strong> untuk mendapatkan parameter kuat geser tanah dalam kondisi pembebanan cepat tanpa drainase. Sementara itu, <strong>uji konsolidasi (Consolidation Test)</strong> dilakukan untuk mengevaluasi perilaku penurunan tanah akibat beban, termasuk besarnya settlement dan laju konsolidasi yang sangat penting dalam perencanaan pondasi dan struktur di atas tanah lunak.</p>
            <p>Seluruh pengujian laboratorium dilaksanakan di lingkungan terkontrol oleh tenaga teknis berpengalaman dengan prosedur standar, sehingga hasil yang diperoleh representatif dan dapat digunakan secara langsung dalam analisis geoteknik. Data hasil pengujian disajikan secara sistematis dalam laporan teknis dan digunakan sebagai input utama untuk perhitungan daya dukung, stabilitas, serta evaluasi kinerja tanah terhadap beban struktur.</p>
            <p>Pelaksanaan dan interpretasi pengujian laboratorium tanah mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: ["../Elemen/Gambar/soil-investigation/lab-1.webp"],
        sni: [
            { judul: "ASTM D854", isi: "Standard Test Methods for Specific Gravity of Soil Solids" },
            { judul: "ASTM D2216", isi: "Standard Test Methods for Laboratory Determination of Water (Moisture) Content" },
            { judul: "ASTM D4318", isi: "Standard Test Methods for Liquid Limit, Plastic Limit, and Plasticity Index" },
            { judul: "ASTM D7263", isi: "Standard Test Methods for Laboratory Determination of Density (Unit Weight)" },
            { judul: "ASTM D2166", isi: "Standard Test Method for Unconfined Compressive Strength of Cohesive Soil" },
            { judul: "ASTM D2850", isi: "Standard Test Method for Unconsolidated-Undrained Triaxial Compression Test" },
            { judul: "ASTM D2435 / ASTM D4546", isi: "Standard Test Methods for One-Dimensional Consolidation Properties" },
            { judul: "SNI 8460:2017", isi: "Persyaratan Perancangan Geoteknik" }
        ]
    },
    "geo_listrik": {
        category: "SOIL INVESTIGATION",
        title: "Geolistrik / Electrical Resistivity Tomography (ERT) ",
        description: `
            <p><strong>Geolistrik / Electrical Resistivity Tomography (ERT)</strong> merupakan metode investigasi geofisika non-destruktif yang digunakan untuk memetakan kondisi bawah permukaan berdasarkan perbedaan nilai tahanan jenis listrik (resistivitas) material tanah dan batuan. Metode ini sangat efektif untuk mengidentifikasi variasi lapisan tanah, kedalaman batuan dasar, zona lemah, rongga, rekahan, serta kondisi kejenuhan air tanah, sehingga banyak digunakan sebagai pendukung studi geoteknik, stabilitas lereng, pondasi, dan mitigasi risiko geologi.</p>
            <p>Pengujian ERT dilakukan dengan mengalirkan arus listrik ke dalam tanah melalui elektroda yang dipasang di permukaan tanah, kemudian mengukur respon tegangan yang dihasilkan. Susunan dan konfigurasi elektroda tertentu memungkinkan pemetaan resistivitas secara dua dimensi (2D) maupun tiga dimensi (3D). Data hasil pengukuran kemudian diolah menggunakan perangkat lunak inversi untuk menghasilkan penampang bawah permukaan yang menggambarkan variasi resistivitas terhadap kedalaman dan jarak. Interpretasi dilakukan dengan mengaitkan nilai resistivitas terhadap kondisi geologi dan geoteknik setempat, sehingga memberikan gambaran yang komprehensif tanpa perlu penggalian atau pengeboran intensif.</p>
            <p>Pelaksanaan survei ERT dilakukan oleh tenaga berpengalaman dengan peralatan khusus, meliputi resistivity meter, elektroda, kabel multi-core, serta sistem akuisisi data digital. Metode ini relatif cepat, minim gangguan terhadap lingkungan sekitar, dan sangat berguna untuk melengkapi data hasil penyelidikan tanah lainnya seperti boring, SPT, atau CPT. Hasil pengujian disajikan dalam bentuk penampang resistivitas yang informatif dan digunakan sebagai dasar pendukung dalam pengambilan keputusan desain dan mitigasi risiko geoteknik.</p>
            <p>Pelaksanaan dan interpretasi survei Geolistrik / Electrical Resistivity Tomography mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: [
            "../Elemen/Gambar/soil-investigation/geo_listrik-1.webp",
            "../Elemen/Gambar/soil-investigation/geo_listrik-2.webp",
            "../Elemen/Gambar/soil-investigation/geo_listrik-3.webp"
        ],
        sni: [
            { judul: "ASTM D643", isi: "Standard Guide for Using the Direct Current Resistivity Method for Subsurface Investigation" },
            { judul: "BS 5930 ", isi: "Code of Practice for Ground Investigations (sebagai referensi integrasi data geofisika)" },
            { judul: "ISO 22476 8", isi: "Geotechnical Investigation and Testing (sebagai acuan umum investigasi lapangan)" },
            { judul: "Pedoman dan praktik umum survei geofisika dangkal untuk keperluan geoteknik", isi: " " },
            { judul: "SNI 8460 ", isi: "Persyaratan Perancangan Geoteknik (penggunaan data sebagai pendukung desain)" }
        ]
    },
    "ground_penet": {
        category: "SOIL INVESTIGATION",
        title: "Ground Penetrating Radar (GPR)",
        description: `
            <p><strong>Ground Penetrating Radar (GPR)</strong> merupakan metode investigasi bawah permukaan non-destruktif yang menggunakan gelombang elektromagnetik frekuensi tinggi untuk mendeteksi dan memetakan objek, lapisan, serta anomali di bawah permukaan tanah secara cepat dan akurat. Metode ini sangat efektif untuk mengidentifikasi utilitas tertanam, lapisan perkerasan, rongga, rekahan, serta perubahan material tanah dan struktur tanpa perlu penggalian atau pembongkaran, sehingga banyak digunakan pada area eksisting, fasilitas aktif, dan lingkungan dengan keterbatasan akses.</p>
            <p>Pelaksanaan survei GPR dilakukan dengan menggerakkan antena radar di atas permukaan tanah atau struktur yang akan diperiksa. Gelombang elektromagnetik dipancarkan ke dalam tanah dan akan dipantulkan kembali ketika mengenai batas antar material dengan sifat listrik yang berbeda. Sinyal pantulan tersebut direkam secara kontinu dan diolah menjadi penampang radar (radargram) yang menggambarkan kondisi bawah permukaan terhadap kedalaman dan posisi. Interpretasi data dilakukan oleh tenaga ahli dengan mempertimbangkan kondisi tanah, jenis material, serta hasil investigasi pendukung lainnya untuk menghasilkan informasi yang relevan dan aplikatif bagi kebutuhan proyek.</p>
            <p>Peralatan utama yang digunakan dalam survei GPR meliputi unit kontrol radar, antena dengan variasi frekuensi sesuai kebutuhan kedalaman dan resolusi, sistem perekam data digital, serta perlengkapan pendukung lainnya. Metode GPR bersifat cepat, presisi tinggi untuk kedalaman dangkal hingga menengah, dan minim gangguan terhadap lingkungan sekitar. Hasil pengujian disajikan dalam bentuk penampang radar dan peta interpretasi yang digunakan sebagai dasar perencanaan pekerjaan konstruksi, evaluasi kondisi eksisting, serta mitigasi risiko sebelum pelaksanaan pekerjaan lapangan.</p>
            <p>Pelaksanaan dan interpretasi survei Ground Penetrating Radar mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: [
            "../Elemen/Gambar/soil-investigation/ground-penet-1.webp",
            "../Elemen/Gambar/soil-investigation/ground-penet-2.webp"
        ],
        sni: [
            { judul: "ASTM D6432 ", isi: "Standard Guide for Using the Surface Ground Penetrating Radar Method for Subsurface Investigation" },
            { judul: "ASTM D4748", isi: "Standard Test Method for Determining the Thickness of Bound Pavement Layers Using GPR" },
            { judul: "BS 5930 ", isi: "Code of Practice for Ground Investigations (sebagai referensi integrasi data investigasi)" },
            { judul: "Pedoman dan praktik umum survei geofisika non-destruktif", isi: " " },
            { judul: "SNI 8460:2017", isi: "Persyaratan Perancangan Geoteknik (sebagai acuan penggunaan data pendukung desain)" }
        ]
    },
    "geo_inst": {
        category: "SOIL INVESTIGATION",
        title: "Instrumen Monitoring Geoteknik",
        description: `s
            <p><strong>Instrumen Monitoring Geoteknik</strong> merupakan sistem pemantauan yang digunakan untuk mengamati perilaku tanah dan struktur secara berkelanjutan selama tahap konstruksi maupun operasional. Monitoring ini berperan penting dalam mendeteksi pergerakan tanah, perubahan tekanan air pori, serta respons struktur terhadap beban dan kondisi lingkungan, sehingga potensi risiko dapat diidentifikasi sejak dini dan tindakan mitigasi dapat dilakukan secara tepat waktu.</p>
            <p>Pelaksanaan monitoring geoteknik dilakukan melalui pemasangan instrumen khusus pada lokasi dan kedalaman yang telah ditentukan berdasarkan hasil investigasi dan analisis desain. Instrumen yang umum digunakan meliputi <strong>inclinometer</strong> untuk memantau pergerakan lateral tanah dan lereng, <strong>piezometer</strong> untuk mengukur tekanan air pori dan muka air tanah, <strong>settlement marker atau settlement plate</strong> untuk memantau penurunan tanah, serta instrumen pendukung lainnya sesuai kebutuhan proyek. Data hasil pengukuran dapat diperoleh secara manual maupun melalui sistem <strong>monitoring real-time</strong> yang terintegrasi dengan data logger dan platform pemantauan, sehingga kondisi lapangan dapat dipantau secara periodik maupun kontinu.</p>
            <p>Seluruh sistem monitoring dirancang untuk mendukung verifikasi asumsi desain, pengendalian risiko selama konstruksi, serta evaluasi kinerja tanah dan struktur dalam jangka panjang. Hasil pemantauan disajikan dalam bentuk grafik, tren pergerakan, dan laporan interpretatif yang mudah dipahami oleh pemilik proyek, konsultan, maupun kontraktor. Dengan pendekatan ini, keputusan teknis dapat diambil berdasarkan data aktual lapangan, bukan sekadar asumsi.</p>
            <p>Pelaksanaan dan interpretasi instrumen monitoring geoteknik mengacu pada standar dan pedoman yang berlaku, antara lain:</p>
        `,
        images: ["../Elemen/Gambar/soil-investigation/geo_inst-1.webp"],
        sni: [
            { judul: "ASTM D6230 ", isi: "Standard Practices for Monitoring Horizontal Movements Using Inclinometers " },
            { judul: "ASTM D4750 ", isi: "Standard Test Method for Determining Subsurface Liquid Levels Using Piezometers " },
            { judul: "ASTM D1556 / ASTM D4914  ", isi: "Pedoman pemantauan pergerakan dan kondisi tanah " },
            { judul: "ISO 18674  ", isi: "Geotechnical Investigation and Testing – Geotechnical Monitoring by Field Instrumentation " },
            { judul: "BS 5930  ", isi: "Code of Practice for Ground Investigations " },
            { judul: "SNI 8460:2017  ", isi: "Persyaratan Perancangan Geoteknik " },
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

    container.innerHTML = `<img id="slider-img" src="${currentImages[0]}" alt="Service Image" style="transition: opacity 0.3s ease;">`;

    if (currentImages.length > 1) {
        container.innerHTML += `
            <button class="slider-btn prev" onclick="manualChange(-1)" aria-label="Previous">&#10094;</button>
            <button class="slider-btn next" onclick="manualChange(1)" aria-label="Next">&#10095;</button>
            <div class="slider-dots" id="dots-container"></div>
        `;
        renderDots();
        startAutoSlide();
        
        // TAMBAHKAN: Event Listener untuk Swipe (Mobile)
        addSwipeListeners(container);
    }
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