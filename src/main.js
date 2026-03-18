import './style.css'

// NAVBAR 
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - (window.innerHeight / 2);
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.classList.remove('text-purple-500', 'scale-105');
    if (current && a.getAttribute('href').includes(current)) {
      a.classList.add('text-purple-500', 'scale-105');
    }
  });
  if (window.pageYOffset > 150) {
    navbar.classList.add('sticky-nav');
  } else {
    navbar.classList.remove('sticky-nav');
  }
});

// REVEAL ANIMATION
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));

// SMOOTH SCROLL 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Offset for the sticky navbar
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// COPY TO CLIPBOARD
window.copytoClipboard = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Mobile number copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// PROJ MODAL
const projData = {
  'lumina': {
    title: "Lumina Alert Website",
    role: "Group Project",
    images: ["src/lumina-welcome.jpg","src/lumina.jpg"],
    desc: "A website for Lumina Alert, allowing admins or operators to register their contact information to be alerted when prototype detects driver drowsiness.",
    contrib: ["XX", "XX", "XX"],
    tags: ["HTML", "CSS", "JS"],
    github: "https://github.com/tijeyy/lumisim",
    live: "https://lumisim.netlify.app"
  },
  'irrigation': {
    title: "IoT Smart Irrigation System",
    role: "Solo Project",
    images: ["src/iot.jpg","src/iot-aboutPage.jpg","src/iot-systemOFF.jpg","src/iot-systemON.jpg"],
    desc: "A mobile application prototype for remote soil monitoring and irrigation control.",
    contrib: ["XX", "XX", "XX"],
    tags: ["MIT App Inventor", "IoT", "Firebase"],
    github: "https://drive.google.com/drive/folders/1oFvON7l7Whnxi9DGHtBkhnRyGEVNwmtl?usp=sharing",
    live: "https://drive.google.com/file/d/1G0w-7qnGVvQzGc_6EnI7DWZwM40Nv5Ne/view?usp=drive_link"
  },
  'bastorage': {
    title: "Bastorage: Laboratory Inventory System",
    role: "Group Project",
    images: ["src/bastorage.jpg","src/bastorage-gallery.jpg","src/bastorage-table.jpg"],
    desc: "A full-stack web application for managing laboratory inventory and equipment.",
    contrib: ["XX", "XX", "XX"],
    tags: ["HTML", "CSS", "JS"],
    github: "https://github.com/tijeyy/bastorage",
    live: "https://bastorage.netlify.app"
  },
  'plugwise': {
    title: "Plugwise: Smart Home Automation",
    role: "Group Project",
    images: ["src/plugwise.jpg","src/plugwise1.jpg","src/plugwise2.jpg","src/plugwise3.jpg"],
    desc: "A smart outlet system that allows users to control the power for multiple sockets—either manually or automatically (timed)—and monitor outlet status (active/inactive)",
    contrib: ["XX", "XX", "XX"],
    tags: ["HTML", "CSS", "JS"],
    github: "https://github.com/tijeyy/plugWise",
    live: "https://plugwise.netlify.app"
  },
};
function openProject(id) {
  const data = projData[id];
  if (!data) return;

  document.getElementById('modal-projTitle').innerText = data.title;
  document.getElementById('modal-role').innerText = `ROLE: ${data.role}`;
  document.getElementById('modal-desc').innerText = data.desc;
  const mainImg = document.getElementById('modal-mainImage'); 
  mainImg.src = data.images[0];

  document.getElementById('proj-gitLink').href = data.github;
  document.getElementById('proj-liveLink').href = data.live;

  document.getElementById('modal-contrib').innerHTML = data.contrib.map(item => `<li>${item}</li>`).join('');
  document.getElementById('modal-tags').innerHTML = data.tags.map(tag => 
    `<span class="bg-purple-500/20 text-[#C77DFF] px-2 py-1 rounded-lg border border-purple-500/30">${tag}</span>`
  ).join(' ');

  const thumbContainer = document.getElementById('modal-otherImages');
  thumbContainer.innerHTML = data.images.map((imgSrc, index) => `
    <img src="${imgSrc}" onclick="changeModalImg('${imgSrc}')" alt="Thumbnail ${index + 1}" 
    class="h-16 w-full object-cover rounded-md border border-white/50 cursor-pointer hover:border-purple-500 transition-all opacity-60 hover:opacity-100">
  ` ).join('');

  document.getElementById('proj-modal').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('proj-modal').classList.add('hidden');
  document.body.style.overflow = 'auto';
}
function changeModalImg(src) {
  const mainImg = document.getElementById('modal-mainImage');
  mainImg.style.opacity = 0;
  setTimeout(() => {
    mainImg.src = src;
    mainImg.style.opacity = '1';
  }, 200)
}


window.openProject = openProject;
window.closeModal = closeModal;
window.changeModalImg = changeModalImg;
