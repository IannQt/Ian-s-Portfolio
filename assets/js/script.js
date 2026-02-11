'use strict';

// ===================================
// THEME TOGGLE (LIGHT MODE / DARK MODE)
// ===================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply the saved theme on page load
if (currentTheme === 'light') {
  document.body.classList.add('light-mode');
  themeIcon.setAttribute('name', 'sunny');
} else {
  document.body.classList.remove('light-mode');
  themeIcon.setAttribute('name', 'moon');
}

// Theme toggle button event listener
themeToggle.addEventListener('click', () => {
  const isLightMode = document.body.classList.toggle('light-mode');
  
  if (isLightMode) {
    localStorage.setItem('theme', 'light');
    themeIcon.setAttribute('name', 'sunny');
  } else {
    localStorage.setItem('theme', 'dark');
    themeIcon.setAttribute('name', 'moon');
  }
});



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// ===================================
// BARANGAY DOCUMENTATION MODAL
// ===================================

const barangayTriggers = document.querySelectorAll('.barangay-trigger');
const barangayModal = document.getElementById('barangayDocsModal');
const closeBarangayBtn = document.getElementById('closeBarangayModal');

barangayTriggers.forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.preventDefault();
    barangayModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeBarangayModal() {
  barangayModal.classList.remove('active');
  document.body.style.overflow = '';
}

if (closeBarangayBtn) {
  closeBarangayBtn.addEventListener('click', closeBarangayModal);
}

if (barangayModal) {
  barangayModal.addEventListener('click', (e) => {
    if (e.target === barangayModal) {
      closeBarangayModal();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && barangayModal.classList.contains('active')) {
    closeBarangayModal();
  }
});

// ===================================
// VIEW FULL PAGE BUTTON HANDLER
// ===================================

const viewDocBtns = document.querySelectorAll('.view-doc-btn');
const fullPageModal = document.createElement('div');
fullPageModal.className = 'full-page-modal';
fullPageModal.innerHTML = `
  <div class="full-page-content">
    <button class="full-page-close">✕</button>
    <button class="full-page-prev" id="fullPagePrev">❮</button>
    <button class="full-page-next" id="fullPageNext">❯</button>
    <img id="fullPageImg" src="" alt="">
    <div class="full-page-counter">
      <span id="fullPageCounter">1 / 15</span>
    </div>
  </div>
`;
document.body.appendChild(fullPageModal);

const fullPageImg = document.getElementById('fullPageImg');
const fullPageClose = fullPageModal.querySelector('.full-page-close');
const fullPagePrev = document.getElementById('fullPagePrev');
const fullPageNext = document.getElementById('fullPageNext');
const fullPageCounter = document.getElementById('fullPageCounter');

let currentDocIndex = 0;
const allDocIndices = Array.from(viewDocBtns).map(btn => parseInt(btn.getAttribute('data-doc-index')));
const maxDocIndex = Math.max(...allDocIndices);

function updateFullPageModal(docIndex) {
  const docItem = document.querySelector(`[data-doc-index="${docIndex}"]`);
  
  if (docItem) {
    currentDocIndex = docIndex;
    const imgSrc = docItem.querySelector('img').src;
    fullPageImg.src = imgSrc;
    fullPageCounter.textContent = `${docIndex + 1} / ${maxDocIndex + 1}`;
    
    // Update button states
    fullPagePrev.disabled = docIndex === 0;
    fullPageNext.disabled = docIndex === maxDocIndex;
  }
}

viewDocBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const docIndex = parseInt(btn.getAttribute('data-doc-index'));
    updateFullPageModal(docIndex);
    fullPageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

fullPagePrev.addEventListener('click', () => {
  if (currentDocIndex > 0) {
    updateFullPageModal(currentDocIndex - 1);
  }
});

fullPageNext.addEventListener('click', () => {
  if (currentDocIndex < maxDocIndex) {
    updateFullPageModal(currentDocIndex + 1);
  }
});

fullPageClose.addEventListener('click', () => {
  fullPageModal.classList.remove('active');
  document.body.style.overflow = '';
});

fullPageModal.addEventListener('click', (e) => {
  if (e.target === fullPageModal) {
    fullPageModal.classList.remove('active');
    document.body.style.overflow = '';
  }
});

document.addEventListener('keydown', (e) => {
  if (fullPageModal.classList.contains('active')) {
    if (e.key === 'Escape') {
      fullPageModal.classList.remove('active');
      document.body.style.overflow = '';
    } else if (e.key === 'ArrowLeft') {
      fullPagePrev.click();
    } else if (e.key === 'ArrowRight') {
      fullPageNext.click();
    }
  }
});



// ===================================
// AVATAR IMAGE HOVER EFFECT
// ===================================

const avatarImg = document.querySelector('.avatar-box img');

if (avatarImg) {
  const defaultImage = avatarImg.getAttribute('data-default-image');
  const hoverImage = avatarImg.getAttribute('data-hover-image');

  avatarImg.addEventListener('mouseenter', () => {
    avatarImg.src = hoverImage;
  });

  avatarImg.addEventListener('mouseleave', () => {
    avatarImg.src = defaultImage;
  });
}

