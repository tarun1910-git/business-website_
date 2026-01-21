// Form Validation Module
document.addEventListener('DOMContentLoaded', function() {
    // Form validation functions
    const validateName = (name) => {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!name) return 'Name is required';
        if (name.length < 3) return 'Name must be at least 3 characters';
        if (!nameRegex.test(name)) return 'Name can only contain letters and spaces';
        return '';
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        return '';
    };

    const validateDate = (date) => {
        if (!date) return 'Date is required';
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) return 'Please select a future date';
        return '';
    };

    const clearErrors = () => {
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const dateError = document.getElementById('dateError');
        
        if (nameError) nameError.textContent = '';
        if (emailError) emailError.textContent = '';
        if (dateError) dateError.textContent = '';
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const dateInput = document.getElementById('date');
        
        if (nameInput) nameInput.style.borderColor = '';
        if (emailInput) emailInput.style.borderColor = '';
        if (dateInput) dateInput.style.borderColor = '';
    };

    const displayError = (fieldId, errorId, message) => {
        if (message) {
            const errorElement = document.getElementById(errorId);
            if (errorElement) errorElement.textContent = message;
            const field = document.getElementById(fieldId);
            if (field) field.style.borderColor = '#ff6b6b';
            return false;
        }
        return true;
    };

    const validateForm = () => {
        clearErrors();
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const dateInput = document.getElementById('date');

        if (!nameInput || !emailInput || !dateInput) return false;

        const nameValue = nameInput.value.trim();
        const emailValue = emailInput.value.trim();
        const dateValue = dateInput.value;

        const isNameValid = displayError('name', 'nameError', validateName(nameValue));
        const isEmailValid = displayError('email', 'emailError', validateEmail(emailValue));
        const isDateValid = displayError('date', 'dateError', validateDate(dateValue));

        return isNameValid && isEmailValid && isDateValid;
    };

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const userNameSpan = document.getElementById('user-name');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate form before submission
            if (!validateForm()) {
                return; // Stop submission if validation fails
            }

            // Get the name entered by the user
            const nameInput = document.getElementById('name').value;

            // Hide the form
            contactForm.style.display = 'none';

            // Show the success message and insert the name
            if (successMessage && userNameSpan) {
                userNameSpan.textContent = nameInput;
                successMessage.classList.add('show');
            }
            
            // Log to console
            console.log("Reservation form submitted successfully.");
        });

        // Real-time validation as user types
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const dateField = document.getElementById('date');

        if (nameField) {
            nameField.addEventListener('blur', function() {
                const error = validateName(this.value.trim());
                displayError('name', 'nameError', error);
            });
        }

        if (emailField) {
            emailField.addEventListener('blur', function() {
                const error = validateEmail(this.value.trim());
                displayError('email', 'emailError', error);
            });
        }

        if (dateField) {
            dateField.addEventListener('blur', function() {
                const error = validateDate(this.value);
                displayError('date', 'dateError', error);
            });
        }
    }
});
