// Project Data Object
const projData = {
    'lumina': {
        title: 'Lumina Alert Website',
        role: 'GROUP - Web Developer',
        desc: 'Developed a responsive website for Lumina Alert using HTML, CSS, and JavaScript. Allows admins/operators to register their contact information to be alerted when prototype detects driver drowsiness.',
        contrib: [
            'Built responsive UI with custom CSS animations',
            'Implemented registration forms with validation',
            'Integrated real-time notification hooks',
            'Optimized system response latency'
        ],
        tags: ['HTML', 'CSS', 'JavaScript'],
        mainImg: 'src/lumina-welcome.jpg',
        otherImgs: ['src/lumina-welcome.jpg','src/lumina.jpg'],
        git: 'https://github.com/tijeyy/lumisim',
        live: 'https://lumisim.netlify.app'
    },
    'irrigation': {
        title: 'IoT Smart Irrigation System',
        role: 'SOLO - Hardware Architect & App Dev',
        desc: 'Mobile application prototype for remote soil monitoring and irrigation control. Integrated sensor data visualization and user-friendly controls to optimize water usage for agriculture. Designed user interface and implemented core features using MIT App Inventor.',
        contrib: [
            'Engineered sensor integration with Arduino firmware',
            'Designed mobile UI for intuitive farm management',
            'Implemented Firebase real-time data sync',
            'Automated irrigation logic based on moisture thresholds'
        ],
        tags: ['MIT App Inventor', 'IoT', 'Arduino', 'Firebase'],
        mainImg: 'src/iot.jpg',
        otherImgs: ['src/iot.jpg',"src/iot-aboutPage.jpg","src/iot-systemOFF.jpg","src/iot-systemON.jpg"],
        git: 'https://drive.google.com/drive/folders/1oFvON7l7Whnxi9DGHtBkhnRyGEVNwmtl?usp=sharing',
        live: 'https://drive.google.com/file/d/1G0w-7qnGVvQzGc_6EnI7DWZwM40Nv5Ne/view?usp=drive_link'
    },
    'bastorage': {
        title: 'Bastorage',
        role: 'GROUP - Full-Stack Developer',
        desc: 'A full-stack web application for managing laboratory inventory and equipment. Features a real-time Firebase backend for data storage and synchronization, allowing users to track inventory levels and manage equipment checkout history.',
        contrib: [
            'XX',
            'XX'
        ],
        tags: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        mainImg: 'src/bastorage.jpg',
        otherImgs: ['src/bastorage.jpg','src/bastorage-gallery.jpg','src/bastorage-table.jpg'],
        git: 'https://github.com/tijeyy/bastorage',
        live: 'https://bastorage.netlify.app'
    },
    'plugwise': {
        title: 'Plugwise',
        role: 'GROUP - IoT System Developer',
        desc: 'IoT-enabled smart outlet system that allows users to control the power for multiple sockets—either manually or automatically (timed)—and monitor outlet status (active/inactive)',
        contrib: [
            'XX',
            'XX'
        ],
        tags: ['HTML', 'JavaScript', 'Firebase', 'IoT'],
        mainImg: 'src/plugwise.jpg',
        otherImgs: ['src/plugwise.jpg','src/plugwise1.jpg',"src/plugwise2.jpg","src/plugwise3.jpg"],
        git: 'https://github.com/tijeyy/plugWise',
        live: 'https://plugwise.netlify.app'
    }
};

// Modal Logic Functions
window.openProject = function(id) {
    const data = projData[id];
    if (!data) return;

    document.getElementById('modal-projTitle').innerText = data.title;
    document.getElementById('modal-role').innerText = `// ${data.role}`;
    document.getElementById('modal-desc').innerText = data.desc;
    document.getElementById('modal-mainImage').src = data.mainImg;
    document.getElementById('modal-gitLink').href = data.git;
    document.getElementById('modal-liveLink').href = data.live;

    const contribList = document.getElementById('modal-contrib');
    contribList.innerHTML = data.contrib.map(c => `
        <li class="flex items-start gap-2">
            <span class="text-primary mt-1 text-xs">></span>
            <span>${c}</span>
        </li>
    `).join('');

    const tagsContainer = document.getElementById('modal-tags');
    tagsContainer.innerHTML = data.tags.map(t => `
        <span class="px-3 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-secondary uppercase">${t}</span>
    `).join('');

    const thumbContainer = document.getElementById('modal-otherImages');
    thumbContainer.innerHTML = data.otherImgs.map((img, idx) => `
        <div class="aspect-square rounded-lg border border-white/10 overflow-hidden cursor-pointer hover:border-primary/50 transition-all" onclick="changeModalImg('${img}')">
            <img src="${img}" class="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" alt="thumbnail ${idx}">
        </div>
    `).join('');

    document.getElementById('proj-modal').classList.remove('hidden');
    document.body.style.overflow = 'hidden';
};

window.closeModal = function() {
    document.getElementById('proj-modal').classList.add('hidden');
    document.body.style.overflow = 'auto';
};

window.changeModalImg = function(src) {
    document.getElementById('modal-mainImage').src = src;
};

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Terminal typing effect
const terminalText = "Building the future of integrated systems...";
let i = 0;
const typingElement = document.querySelector('.typing');
function typeEffect() {
    if (i < terminalText.length) {
        typingElement.textContent += terminalText.charAt(i);
        i++;
        setTimeout(typeEffect, 50);
    }
}
setTimeout(typeEffect, 1000);

// Smooth scroll reveal observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section:not(#splash)').forEach(section => {
    section.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(section);
});

        // COPY TO CLIPBOARD
window.copytoClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Mobile number copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

lucide.createIcons();
let percent = 0;
const percentEl = document.getElementById('percent');
const loadbarEl = document.getElementById('loadbar');
const splash = document.getElementById('splash');
const app = document.getElementById('app');

const interval = setInterval(() => {
percent++;
percentEl.textContent = percent + '%';
loadbarEl.style.width = percent + '%';

if (percent >= 100) {
    clearInterval(interval);
    splash.classList.add("fade-out");

    setTimeout(() => {
        splash.style.display = "none";
        app.style.display = "block";
        document.body.classList.remove("overflow-hidden");
    },600);
}
}, 20); 

// NAVBAR 
const obs = new IntersectionObserver(ents => ents.forEach(e => {
  const a = document.querySelector(`nav a[href="#${e.target.id}"]`);
  if (a) a.classList.toggle('active', e.isIntersecting);
}), { rootMargin: "-40% 0px -50% 0px" });

document.querySelectorAll('section[id]').forEach(s => obs.observe(s));
