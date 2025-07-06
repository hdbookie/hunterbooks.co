/* ===========================
   Animations JavaScript
   =========================== */

// Create particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        particlesContainer.appendChild(particle);
    }
}


// Cursor trail effect
function createCursorTrail() {
    const trail = [];
    const trailLength = 10;
    
    document.addEventListener('mousemove', (e) => {
        const trailElement = document.createElement('div');
        trailElement.style.position = 'fixed';
        trailElement.style.width = '4px';
        trailElement.style.height = '4px';
        trailElement.style.background = 'var(--accent)';
        trailElement.style.borderRadius = '50%';
        trailElement.style.pointerEvents = 'none';
        trailElement.style.zIndex = '9999';
        trailElement.style.left = e.clientX + 'px';
        trailElement.style.top = e.clientY + 'px';
        trailElement.style.opacity = '0.6';
        trailElement.style.transition = 'opacity 0.5s ease-out';
        
        document.body.appendChild(trailElement);
        
        trail.push(trailElement);
        
        if (trail.length > trailLength) {
            const oldElement = trail.shift();
            if (oldElement.parentNode) {
                oldElement.parentNode.removeChild(oldElement);
            }
        }
        
        setTimeout(() => {
            trailElement.style.opacity = '0';
            setTimeout(() => {
                if (trailElement.parentNode) {
                    trailElement.parentNode.removeChild(trailElement);
                }
            }, 500);
        }, 100);
    });
}