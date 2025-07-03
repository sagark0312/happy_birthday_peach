document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createHearts();
    
    // Initialize countdown
    initializeCountdown();
    
    // Check for memory elements to animate
    animateMemories();
    
    // Animate gallery items on scroll
    animateGallery();
});

function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 5 + 5) + 's';
        heart.style.animationDelay = (Math.random() * 5) + 's';
        heartsContainer.appendChild(heart);
    }
}

function initializeCountdown() {
    // Set the date we're counting down to (next time you'll see each other)
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 7); // Example: 7 days from now
    
    // Update the countdown every 1 second
    const countdownTimer = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Display the result
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        
        // If the countdown is finished
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }, 1000);
}

function animateMemories() {
    const memories = document.querySelectorAll('.memory');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    memories.forEach(memory => {
        observer.observe(memory);
    });
}

function animateGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = 'all 0.5s ease';
        observer.observe(item);
    });
}

function showMessage() {
    document.querySelector('.birthday-message').classList.add('show');
}

function hideMessage() {
    document.querySelector('.birthday-message').classList.remove('show');
}