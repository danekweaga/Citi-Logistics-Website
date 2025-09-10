// FormSubmit handling
document.addEventListener('DOMContentLoaded', function() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Let the form submit normally, then show message
            setTimeout(() => {
                alert('Thank you for your message! We will contact you soon.');
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    }

    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Let the form submit normally, then show message
            setTimeout(() => {
                alert('Thank you for your booking request! We will confirm shortly.');
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    }
});