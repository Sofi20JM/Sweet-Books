
// Dark Mode Button 

document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.getElementById('themeButton');
    const body = document.body; 

    const savedTheme = localStorage.getItem('darkmode'); 

    if (savedTheme === 'active') {
        body.classList.add('DarkMode');
    }

    if (themeButton) {
        themeButton.addEventListener('click', () => {
            body.classList.toggle('DarkMode');

            if (body.classList.contains('DarkMode')) {
                localStorage.setItem('darkmode', 'active');
            } else {
                localStorage.removeItem('darkmode'); 
            }
        });
    } else {
        console.error("Error: The button with ID 'themeButton' was not found in the HTML.");
    }
});


// RSVP Form

document.addEventListener('DOMContentLoaded', () => {
    const rsvpForm = document.getElementById('rsvpForm');
    const dynamicParticipantList = document.getElementById('participantList'); 
    const rsvpCountElement = document.getElementById('rsvp-count'); 

    let participants = []; 
    let count = 0;

    // --- Function: Creates a participant <p> element and appends it ---
    function createAndAppendParticipantElement(name, state) {
        const participantParagraph = document.createElement('p');
        participantParagraph.textContent = `💝 ${name} from ${state} has RSVP'd!`;
        dynamicParticipantList.appendChild(participantParagraph);
    }

    // --- FUNCTION: Update the display of the RSVP count ---
    function updateRsvpCountDisplay() {
        if (rsvpCountElement) {
            rsvpCountElement.textContent = `⭐️ ${count} people have RSVP'd to this event!`;
        }
    }

    // --- Function: Loads participants from localStorage and displays them ---
    function loadParticipants() {
        const storedParticipants = localStorage.getItem('rsvpParticipants');

        if (storedParticipants) {
            participants = JSON.parse(storedParticipants);
            dynamicParticipantList.innerHTML = '';

            participants.forEach(p => {
                createAndAppendParticipantElement(p.name, p.state);
            });
        } else {
            participants = [];
        }

        count = participants.length + 3; 
        updateRsvpCountDisplay();
    }

    // --- Form Validation Function ---
    const validateForm = () => {
        let containsErrors = false;

        const nameInput = document.getElementById('pName');
        const stateInput = document.getElementById('pState');
        const emailInput = document.getElementById('pEmail');

        const rsvpInputs = [nameInput, stateInput, emailInput];

        for (let i = 0; i < rsvpInputs.length; i++) {
            const currentInput = rsvpInputs[i];

            currentInput.classList.remove('error');
            if (currentInput.value.trim().length < 2) {
                containsErrors = true;
                currentInput.classList.add('error');
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailInput.value.trim() === '' || !emailRegex.test(emailInput.value.trim())) {
            containsErrors = true;
            emailInput.classList.add('error');

            if (emailInput.value.trim() === '') {
                 emailInput.value = 'Not an Email'; // Set value if empty
            } else {
                 emailInput.value = 'Not an Email'; 
            }

        } else {
            emailInput.classList.remove('error');
        }

        if (containsErrors === false) {
            processValidSubmission(nameInput.value.trim(), stateInput.value.trim(), emailInput.value.trim());

            for (let i = 0; i < rsvpInputs.length; i++) {
                rsvpInputs[i].value = "";
            }
        }
    }; 

    // --- Function: Handles the logic for a valid submission ---
    function processValidSubmission(name, state, email) {
        const newParticipant = {
            name: name,
            state: state,
        };

        participants.push(newParticipant);
        count++;
        localStorage.setItem('rsvpParticipants', JSON.stringify(participants));
        createAndAppendParticipantElement(name, state);
        updateRsvpCountDisplay();

        // *** AÑADE ESTA LÍNEA AQUÍ ***
        toggleModal(name);
    }

    // --- Event Listener for Form Submission ---
    if (rsvpForm) {
        rsvpForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
            validateForm(); 
        });
    } else {
        console.error("Error: The form with ID 'rsvpForm' was not found.");
    }

    loadParticipants();

    if (!dynamicParticipantList || !rsvpCountElement) {
        console.error("Error: One or more critical elements (dynamicParticipantList, rsvp-count) not found.");
    }
});

// Pop Up Modal

let participants = [];
let count = 0;
// Variable para la funcionalidad de "Reduce Motion"
let isReducedMotion = false;
// Variables para la animación del modal
let modalImage = document.getElementById('PopUpImage');
let RotateFactor = 0;

const animateImage = () => {
  if (RotateFactor === 0) {
    RotateFactor = -10;
  } else {
    RotateFactor = 0;
  }
  modalImage.style.transform = `rotate(${RotateFactor}deg)`;
};

const toggleModal = (person) => {
  const modal = document.querySelector('.modal');
  const messageElement = document.querySelector('.message p:first-child');
  const close = document.getElementById('CloseButton');

  modal.style.display = 'grid';
  modal.classList.add('scaleIn');
  messageElement.textContent = `¡Gracias, ${person}, por confirmar tu asistencia!`;

  let animationInterval = null;
  // Solo inicia la animación si "Reduce Motion" no está activado
  if (!isReducedMotion) {
    animationInterval = setInterval(animateImage, 250);
  }

  // Temporizador para ocultar el modal
  setTimeout(() => {
    modal.classList.remove('scaleIn');
    modal.style.display = 'none';
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    modalImage.style.transform = `rotate(0deg)`;
  }, 5000);

  // Event listener para el botón de cierre manual
  const closeModalManually = () => {
    modal.classList.remove('scaleIn');
    modal.style.display = 'none';
    if (animationInterval) {
      clearInterval(animationInterval);
    }
    modalImage.style.transform = `rotate(0deg)`;
  };
  
  // Para evitar múltiples listeners, usa una función de un solo uso
  close.removeEventListener('click', closeModalManually);
  close.addEventListener('click', closeModalManually, { once: true });
};


// Book Recomendations Section

const carousel1 = document.getElementById('carousel1');
const btnLeft1 = document.getElementById('btn-left1');
const btnRight1 = document.getElementById('btn-right1');
const carousel2 = document.getElementById('carousel2');
const btnLeft2 = document.getElementById('btn-left2');
const btnRight2 = document.getElementById('btn-right2');
const carousel3 = document.getElementById('carousel3');
const btnLeft3 = document.getElementById('btn-left3');
const btnRight3 = document.getElementById('btn-right3');

// First Carousel 

btnLeft1.addEventListener('click', () => {
  carousel1.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
});

btnRight1.addEventListener('click', () => {
  carousel1.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
});

// Second Carousel 

btnLeft2.addEventListener('click', () => {
  carousel2.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
});

btnRight2.addEventListener('click', () => {
  carousel2.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
});

// Third Carousel

btnLeft3.addEventListener('click', () => {
  carousel3.scrollBy({
    left: -200,
    behavior: 'smooth'
  });
});

btnRight3.addEventListener('click', () => {
  carousel3.scrollBy({
    left: 200,
    behavior: 'smooth'
  });
});








