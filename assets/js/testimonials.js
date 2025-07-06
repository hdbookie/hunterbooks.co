/* ===========================
   Testimonials Carousel
   =========================== */

let currentTestimonialIndex = 1;

function changeTestimonial(direction) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (!testimonials.length || !dots.length) return;
    
    testimonials[currentTestimonialIndex - 1].classList.remove('active');
    dots[currentTestimonialIndex - 1].classList.remove('active');
    
    currentTestimonialIndex += direction;
    
    if (currentTestimonialIndex > testimonials.length) {
        currentTestimonialIndex = 1;
    } else if (currentTestimonialIndex < 1) {
        currentTestimonialIndex = testimonials.length;
    }
    
    testimonials[currentTestimonialIndex - 1].classList.add('active');
    dots[currentTestimonialIndex - 1].classList.add('active');
}

function currentTestimonial(index) {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    
    if (!testimonials.length || !dots.length) return;
    
    testimonials[currentTestimonialIndex - 1].classList.remove('active');
    dots[currentTestimonialIndex - 1].classList.remove('active');
    
    currentTestimonialIndex = index;
    
    testimonials[currentTestimonialIndex - 1].classList.add('active');
    dots[currentTestimonialIndex - 1].classList.add('active');
}

// Auto-rotate testimonials
setInterval(() => {
    changeTestimonial(1);
}, 5000);

// Initialize first testimonial as active
document.addEventListener('DOMContentLoaded', () => {
    const firstTestimonial = document.querySelector('.testimonial-card');
    const firstDot = document.querySelector('.dot');
    
    if (firstTestimonial) firstTestimonial.classList.add('active');
    if (firstDot) firstDot.classList.add('active');
});