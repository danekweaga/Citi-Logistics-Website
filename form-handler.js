// Form handling for SQL backend
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
});

function initializeForms() {
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Booking form handling
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', handleBookingSubmit);
    }
}

async function handleFormSubmit(form, endpoint) {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    try {
        const formData = new FormData(form);
        const formObject = Object.fromEntries(formData.entries());
        
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showNotification(result.message, 'success');
            form.reset();
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showNotification('Failed to submit form. Please try again.', 'error');
    } finally {
        // Restore button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

async function handleContactSubmit(e) {
    e.preventDefault();
    await handleFormSubmit(e.target, '/submit-contact');
}

async function handleBookingSubmit(e) {
    e.preventDefault();
    await handleFormSubmit(e.target, '/submit-booking');
}

function showNotification(message, type) {
    // Your existing notification code
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    // Add to page and auto-remove
}