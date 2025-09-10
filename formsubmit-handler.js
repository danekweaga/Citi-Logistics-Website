// FormSubmit handling with better user experience
document.addEventListener('DOMContentLoaded', function() {
    // Add loading states to forms
    const forms = document.querySelectorAll('form[action*="formsubmit.io"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            
            // Show loading state
            button.textContent = 'Sending...';
            button.disabled = true;
            
            // Show message after a delay (form will open in new tab)
            setTimeout(() => {
                alert('Thank you for your submission! We will contact you soon.');
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
            }, 1000);
        });
    });
});