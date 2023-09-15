// Enregistremen
// Validation du formulaire de contact

const form = document.getElementById('contact-form');
const prenom = document.getElementById('prenom');
const nom = document.getElementById('nom');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const message = document.getElementById('message');
const radioOptions = document.querySelectorAll('input[type="radio"]');
const errorMessages = document.querySelectorAll('.error-message');

const validateForm = () => {
    let noError = true;
    const prenomValue = prenom.value.trim();
    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();
    const messageValue = message.value.trim();
    let radioSelected = false;

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const setError = (element, message) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
      
        errorDisplay.innerText = message;
        inputControl.classList.add('border-red-500'); // Classe Tailwind pour bordure rouge
        inputControl.classList.remove('border-green-500'); // Classe Tailwind pour bordure verte
    }

    const setErrorRadio = (errorMessage) => {
        errorMessage.innerText = 'Veuillez sélectionner une option';
    }

    const setSuccess = (element) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error-message');
      
        errorDisplay.innerText = ''; // Efface le message d'erreur
        inputControl.classList.remove('border-red-500'); // Supprime la bordure rouge
        inputControl.classList.add('border-green-500'); // Ajoute la bordure verte
    }

    // Vérification du champ de prénom
    if (prenomValue === '') {
        setError(prenom, 'Veuillez mettre votre prénom');
        noError = false;
    } else {
        setSuccess(prenom);
    }

    // Vérification du champ de nom
    if (nomValue === '') {
        setError(nom, 'Veuillez mettre votre nom');
        noError = false;
    } else {
        setSuccess(nom);
    }

    // Vérification du champ d'email
    if (emailValue === '') {
        setError(email, 'Veuillez mettre votre email');
        noError = false;
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Email non valide');
        noError = false;
    } else {
        setSuccess(email);
    }

    // Vérification du champ de téléphone
    if (phoneValue === '') {
        setError(phone, 'Veuillez mettre votre numéro de téléphone');
        noError = false;
    } else {
        setSuccess(phone);
    }

    // Vérification du champ de message
    if (messageValue === '') {
        setError(message, 'Veuillez mettre votre message');
        noError = false;
    } else {
        setSuccess(message);
    }

    // Vérification des boutons radio
    radioOptions.forEach((radio) => {
        if (radio.checked) {
            radioSelected = true;
        }
    });

    if (!radioSelected) {
        radioOptions.forEach((radio, index) => {
            setErrorRadio(errorMessages[index]);
        });
        noError = false;
    } else {
        errorMessages.forEach((errorMessage) => {
            errorMessage.innerText = '';
        });
    }

    return noError;
}

form.addEventListener('submit', (e) => {
    if (!validateForm()) {
        e.preventDefault(); // Empêche l'envoi du formulaire si des erreurs existent
    }
});