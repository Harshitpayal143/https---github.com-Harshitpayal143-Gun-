document.addEventListener('DOMContentLoaded', () => {
    const gun = document.getElementById('gun');
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const ammoElement = document.getElementById('ammo');
    const reloadButton = document.getElementById('reload');
    const gameContainer = document.querySelector('.game-container');
    
    let score = 0;
    let ammo = 10;
    let gameActive = true;
    
    // Initialize target position
    moveTarget();
    
    // Mouse movement handler for gun rotation
    document.addEventListener('mousemove', (e) => {
        if (!gameActive) return;
        
        const gunRect = gun.getBoundingClientRect();
        const gunCenterX = gunRect.left + gunRect.width / 2;
        const gunCenterY = gunRect.top + gunRect.height / 2;
        
        const angle = Math.atan2(e.clientY - gunCenterY, e.clientX - gunCenterX) * 180 / Math.PI;
        gun.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    });
    
    // Click handler for shooting
    document.addEventListener('click', (e) => {
        if (!gameActive || ammo <= 0) return;
        
        // Reduce ammo
        ammo--;
        ammoElement.textContent = ammo;
        
        // Add recoil animation
        gun.classList.add('recoil');
        setTimeout(() => gun.classList.remove('recoil'), 200);
        
        // Create bullet hole at click position
        const bulletHole = document.createElement('div');
        bulletHole.className = 'bullet-hole';
        bulletHole.style.left = `${e.clientX - 5}px`;
        bulletHole.style.top = `${e.clientY - 5}px`;
        gameContainer.appendChild(bulletHole);
        
        // Check if target was hit
        const targetRect = target.getBoundingClientRect();
        if (
            e.clientX >= targetRect.left &&
            e.clientX <= targetRect.right &&
            e.clientY >= targetRect.top &&
            e.clientY <= targetRect.bottom
        ) {
            // Target hit!
            score += 10;
            scoreElement.textContent = score;
            
            // Create explosion effect
            const explosion = document.createElement('div');
            explosion.className = 'explosion';
            explosion.style.left = `${targetRect.left}px`;
            explosion.style.top = `${targetRect.top}px`;
            gameContainer.appendChild(explosion);
            
            // Remove explosion after animation
            setTimeout(() => {
                explosion.remove();
            }, 500);
            
            // Move target to new position
            moveTarget();
        }
        
        // Check if out of ammo
        if (ammo === 0) {
            gameActive = false;
        }
    });
    
    // Reload button handler
    reloadButton.addEventListener('click', () => {
        ammo = 10;
        ammoElement.textContent = ammo;
        gameActive = true;
    });
    
    // Move target to random position
    function moveTarget() {
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        
        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);
        
        target.style.left = `${randomX}px`;
        target.style.top = `${randomY}px`;
    }
});