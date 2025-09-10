// One-page website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Update copyright year
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Set up navigation for one-page site
    setupNavigation();
    
    // Set up form handlers
    setupFormHandlers();
});

// Set up navigation for one-page scrolling
function setupNavigation() {
    // Handle nav link clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // Scroll to the section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                // Calculate position (accounting for fixed header)
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
            
            // Update active navigation link
            updateActiveNavLink(targetId);
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100; // Offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                updateActiveNavLink(sectionId);
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(sectionId) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });
}

// Close mobile menu
function closeMobileMenu() {
    const mobileNav = document.querySelector('.mobile-nav');
    if (mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        document.querySelector('.mobile-nav-toggle i').classList.remove('fa-times');
        document.querySelector('.mobile-nav-toggle i').classList.add('fa-bars');
    }
}
