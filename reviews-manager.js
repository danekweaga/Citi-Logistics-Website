// Reviews Management System
class ReviewManager {
    constructor() {
        this.reviews = [];
        this.loadReviews();
    }

    // Load reviews from localStorage or use default
    loadReviews() {
        const savedReviews = localStorage.getItem('citiLogisticsReviews');
        if (savedReviews) {
            this.reviews = JSON.parse(savedReviews);
        }
        this.displayReviews();
    }

    // Save reviews to localStorage
    saveReviews() {
        localStorage.setItem('citiLogisticsReviews', JSON.stringify(this.reviews));
        this.displayReviews();
    }

    // Add a new review
    addReview(name, rating, text) {
        const review = {
            id: Date.now(), // Unique ID for deletion
            name: name,
            rating: rating,
            text: text,
            date: new Date().toLocaleDateString()
        };
        this.reviews.push(review);
        this.saveReviews();
    }

    // Delete a review by ID
    deleteReview(reviewId) {
        this.reviews = this.reviews.filter(review => review.id !== reviewId);
        this.saveReviews();
    }

    // Display reviews in the container
    displayReviews() {
        const container = document.getElementById('reviews-container');
        if (!container) return;

        if (this.reviews.length === 0) {
            container.innerHTML = `
                <div class="no-reviews-message">
                    <p>We appreciate all our customers' feedback. Your review could be featured here!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.reviews.map(review => `
            <div class="review-card" data-id="${review.id}">
                <div class="rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
                <p>"${review.text}"</p>
                <strong>${review.name}</strong>
                <div class="date">${review.date}</div>
                <button class="delete-review-btn" onclick="reviewManager.deleteReview(${review.id})">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `).join('');
    }
}

// Initialize the review manager
const reviewManager = new ReviewManager();