// Valentine's Card JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const envelope = document.getElementById('envelope');
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const cardContainer = document.getElementById('cardContainer');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const celebrationOverlay = document.getElementById('celebrationOverlay');
    const heartsBg = document.getElementById('heartsBg');
    const petalsContainer = document.getElementById('petalsContainer');
    const fireworks = document.getElementById('fireworks');

    // Initialize background effects
    createFloatingHearts();
    createRosePetals();

    // Envelope click handler
    envelope.addEventListener('click', openEnvelope);

    // Yes button click handler
    yesBtn.addEventListener('click', celebrate);

    // No button - runs away from cursor
    noBtn.addEventListener('mouseover', runAway);
    noBtn.addEventListener('touchstart', runAway);
    noBtn.addEventListener('focus', runAway);

    // Track mouse position for no button
    let mouseX = 0;
    let mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Open envelope animation
    function openEnvelope() {
        envelope.classList.add('opened');

        setTimeout(() => {
            envelopeWrapper.classList.add('hidden');
            cardContainer.classList.add('visible');
        }, 800);
    }

    // No button runs away from cursor
    function runAway(e) {
        e.preventDefault();

        const btn = noBtn;
        const container = btn.parentElement;
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();

        // Calculate new position
        const maxX = containerRect.width - btnRect.width;
        const maxY = containerRect.height - btnRect.height;

        // Generate random position away from cursor
        let newX, newY;
        let attempts = 0;

        do {
            newX = Math.random() * maxX;
            newY = Math.random() * maxY;
            attempts++;
        } while (
            attempts < 10 &&
            Math.abs(containerRect.left + newX - mouseX) < 100 &&
            Math.abs(containerRect.top + newY - mouseY) < 100
        );

        // Apply new position
        btn.style.left = newX + 'px';
        btn.style.top = newY + 'px';

        // Make yes button grow slightly each time
        const currentScale = parseFloat(yesBtn.dataset.scale) || 1;
        const newScale = Math.min(currentScale + 0.05, 1.5);
        yesBtn.dataset.scale = newScale;
        yesBtn.style.transform = `scale(${newScale})`;

        // Add some playful messages
        const messages = [
            "Come on! 😊",
            "Please? 🥺",
            "Think again! 💕",
            "Are you sure? 🌹",
            "Really? 💖",
            "But I love you! 💗",
            "Just say yes! ❤️"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        btn.textContent = randomMessage;

        // Reset to "No" after a moment
        setTimeout(() => {
            btn.textContent = "No";
        }, 1000);
    }

    // Celebration when Yes is clicked
    function celebrate() {
        celebrationOverlay.classList.add('visible');

        // Create fireworks
        createFireworks();

        // Create confetti
        createConfetti();

        // Play celebration sound (optional - uncomment if you add audio)
        // playSound('celebration.mp3');
    }

    // Create floating hearts in background
    function createFloatingHearts() {
        const hearts = ['💕', '❤️', '💖', '💗', '💓', '💝', '💘'];

        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'floating-heart';
                heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDuration = (4 + Math.random() * 4) + 's';
                heart.style.animationDelay = Math.random() * 2 + 's';
                heart.style.fontSize = (15 + Math.random() * 20) + 'px';
                heartsBg.appendChild(heart);

                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 10000);
            }, i * 300);
        }

        // Continuously create new hearts
        setInterval(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (4 + Math.random() * 4) + 's';
            heart.style.fontSize = (15 + Math.random() * 20) + 'px';
            heartsBg.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 10000);
        }, 500);
    }

    // Create rose petals falling
    function createRosePetals() {
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createPetal();
            }, i * 400);
        }

        // Continuously create petals
        setInterval(createPetal, 800);
    }

    function createPetal() {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.left = Math.random() * 100 + '%';
        petal.style.animationDuration = (6 + Math.random() * 4) + 's';
        petal.style.animationDelay = Math.random() + 's';

        // Random petal colors
        const colors = [
            'linear-gradient(135deg, #ff6b6b, #ee5a5a)',
            'linear-gradient(135deg, #ff8e8e, #ff6b6b)',
            'linear-gradient(135deg, #ffb6c1, #ff69b4)',
            'linear-gradient(135deg, #ff1493, #c71585)'
        ];
        petal.style.background = colors[Math.floor(Math.random() * colors.length)];

        petalsContainer.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 12000);
    }

    // Create fireworks effect
    function createFireworks() {
        const colors = ['#ff6b9d', '#ffd700', '#ff69b4', '#fff', '#c71585', '#ff1493'];

        setInterval(() => {
            if (!celebrationOverlay.classList.contains('visible')) return;

            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.background = colors[Math.floor(Math.random() * colors.length)];
            fireworks.appendChild(firework);

            setTimeout(() => {
                firework.remove();
            }, 1000);
        }, 300);
    }

    // Create confetti
    function createConfetti() {
        const colors = ['#ff6b9d', '#ffd700', '#ff69b4', '#c71585', '#ff1493', '#fff', '#ffb6c1'];
        const shapes = ['❤️', '💕', '💖', '🌹', '✨', '💗'];

        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';

                // Randomly choose between shape emoji or colored square
                if (Math.random() > 0.5) {
                    confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                    confetti.style.fontSize = (15 + Math.random() * 15) + 'px';
                } else {
                    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
                    confetti.style.width = (8 + Math.random() * 8) + 'px';
                    confetti.style.height = (8 + Math.random() * 8) + 'px';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                }

                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
                confetti.style.animationDelay = Math.random() * 0.5 + 's';

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }, i * 30);
        }

        // Continuous confetti
        setInterval(() => {
            if (!celebrationOverlay.classList.contains('visible')) return;

            for (let i = 0; i < 5; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.textContent = shapes[Math.floor(Math.random() * shapes.length)];
                confetti.style.fontSize = (15 + Math.random() * 15) + 'px';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.animationDuration = (2 + Math.random() * 2) + 's';

                document.body.appendChild(confetti);

                setTimeout(() => {
                    confetti.remove();
                }, 4000);
            }
        }, 500);
    }

    // ==========================================
    // Photo Album Flipbook (supports 20-25 photos)
    // ==========================================
    // Add your photo URLs and optional captions here:
    const photos = [
        // { src: 'photos/photo1.jpg', caption: 'Our first date' },
        // { src: 'photos/photo2.jpg', caption: 'Beach day' },
        // Or just use strings for no caption:
        // 'photos/photo3.jpg',
    ];

    const TOTAL_PAGES = 25; // total album slots
    initPhotoAlbum(photos, TOTAL_PAGES);

    function initPhotoAlbum(photoList, totalSlots) {
        const albumPages = document.getElementById('albumPages');
        const prevBtn = document.getElementById('albumPrev');
        const nextBtn = document.getElementById('albumNext');
        const pageNum = document.getElementById('albumPageNum');

        if (!albumPages) return;

        let currentPage = 0;
        let isFlipping = false;

        const cornerDecos = ['💕', '🌹', '✨', '💖'];

        // Build pages
        const pageCount = Math.max(totalSlots, photoList.length);
        for (let i = 0; i < pageCount; i++) {
            const photo = photoList[i];
            const page = document.createElement('div');
            page.className = 'album-page' + (i === 0 ? ' active' : '');
            page.dataset.index = i;

            // Corner decorations
            cornerDecos.forEach((deco, di) => {
                const corner = document.createElement('span');
                corner.className = 'album-page-deco ' + ['top-left', 'top-right', 'bottom-left', 'bottom-right'][di];
                corner.textContent = deco;
                page.appendChild(corner);
            });

            // Inner frame
            const inner = document.createElement('div');
            inner.className = 'album-page-inner';

            if (photo) {
                const src = typeof photo === 'string' ? photo : photo.src;
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Memory ' + (i + 1);
                img.loading = 'lazy';
                img.draggable = false;
                inner.appendChild(img);
            } else {
                const placeholder = document.createElement('div');
                placeholder.className = 'placeholder-content';
                placeholder.innerHTML = '<span>📷</span><p>Photo ' + (i + 1) + '</p>';
                inner.appendChild(placeholder);
            }

            page.appendChild(inner);

            // Caption
            const caption = document.createElement('div');
            caption.className = 'album-page-caption';
            if (photo && typeof photo === 'object' && photo.caption) {
                caption.textContent = photo.caption;
            }
            page.appendChild(caption);

            albumPages.appendChild(page);
        }

        const pages = albumPages.querySelectorAll('.album-page');
        updateNav();

        function goToPage(newIndex, direction) {
            if (isFlipping || newIndex < 0 || newIndex >= pages.length || newIndex === currentPage) return;
            isFlipping = true;

            const oldPage = pages[currentPage];
            const newPage = pages[newIndex];

            // Flip animation on the old page
            const flipClass = direction === 'next' ? 'flip-left' : 'flip-right';
            oldPage.classList.add(flipClass);

            setTimeout(() => {
                oldPage.classList.remove('active', flipClass);
                newPage.classList.add('active');
                currentPage = newIndex;
                updateNav();
                isFlipping = false;
            }, 450);
        }

        function updateNav() {
            prevBtn.disabled = currentPage === 0;
            nextBtn.disabled = currentPage === pages.length - 1;
            pageNum.textContent = (currentPage + 1) + ' / ' + pages.length;
        }

        prevBtn.addEventListener('click', () => goToPage(currentPage - 1, 'prev'));
        nextBtn.addEventListener('click', () => goToPage(currentPage + 1, 'next'));

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Only navigate when album is visible
            const album = document.getElementById('photoAlbum');
            if (!album || album.closest('.card-container:not(.visible)')) return;
            if (e.key === 'ArrowLeft') goToPage(currentPage - 1, 'prev');
            if (e.key === 'ArrowRight') goToPage(currentPage + 1, 'next');
        });

        // Touch / swipe support
        let touchStartX = 0;
        let touchStartY = 0;
        albumPages.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });

        albumPages.addEventListener('touchend', (e) => {
            const dx = e.changedTouches[0].clientX - touchStartX;
            const dy = e.changedTouches[0].clientY - touchStartY;
            // Only trigger if horizontal swipe > 40px and mostly horizontal
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                if (dx < 0) goToPage(currentPage + 1, 'next');
                else goToPage(currentPage - 1, 'prev');
            }
        }, { passive: true });
    }

    // Touch support for mobile devices (No button)
    let touchTimeout;
    noBtn.addEventListener('touchmove', (e) => {
        e.preventDefault();
        clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => runAway(e), 50);
    }, { passive: false });
});

// Instructions for adding photos to the album:
// =============================================
// The album supports up to 25 photo slots. Add entries to the photos array:
//
// Option 1 - Simple (no caption):
//   const photos = ['photos/photo1.jpg', 'photos/photo2.jpg', ...];
//
// Option 2 - With captions:
//   const photos = [
//       { src: 'photos/photo1.jpg', caption: 'Our first date' },
//       { src: 'photos/photo2.jpg', caption: 'Beach day' },
//   ];
//
// Option 3 - Online URLs:
//   const photos = ['https://example.com/photo1.jpg', ...];
//
// To change the total number of album slots, edit TOTAL_PAGES (default: 25).
