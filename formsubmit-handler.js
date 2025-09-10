// FormSubmit handling for both forms
document.addEventListener('DOMContentLoaded', function() {
    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Show success message after a short delay
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
        bookingForm.addEventListener('submit', function() {
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Show success message after a short delay
            setTimeout(() => {
                alert('Thank you for your booking request! We will confirm shortly.');
                button.textContent = originalText;
                button.disabled = false;
            }, 1000);
        });
    }

    // Review form handling
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('review-name').value;
        const rating = parseInt(document.getElementById('review-rating').value);
        const text = document.getElementById('review-text').value;
        
        if (name && rating && text) {
            reviewManager.addReview(name, rating, text);
            alert('Thank you for your review!');
            this.reset();
        }
    });
}s
});