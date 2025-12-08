document.addEventListener('DOMContentLoaded', () => {
    // Create Lightbox Elements
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';

    const img = document.createElement('img');
    img.className = 'lightbox-img';

    const closeBtn = document.createElement('span');
    closeBtn.className = 'lightbox-close';
    closeBtn.innerHTML = '&times;';

    // Navigation Arrows
    const prevBtn = document.createElement('span');
    prevBtn.className = 'lightbox-prev';
    prevBtn.innerHTML = '&#10094;'; // Left arrow entity

    const nextBtn = document.createElement('span');
    nextBtn.className = 'lightbox-next';
    nextBtn.innerHTML = '&#10095;'; // Right arrow entity

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);

    // Zoomable Images Logic
    const zoomableImages = Array.from(document.querySelectorAll('.zoomable'));
    let currentIndex = 0;

    const showImage = (index) => {
        if (index >= 0 && index < zoomableImages.length) {
            img.src = zoomableImages[index].src;
            currentIndex = index;
            // Hide arrows if at ends
            prevBtn.style.display = index === 0 ? 'none' : 'block';
            nextBtn.style.display = index === zoomableImages.length - 1 ? 'none' : 'block';
        }
    };

    zoomableImages.forEach((image, index) => {
        image.addEventListener('click', () => {
            showImage(index);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    // Navigation and Close Logic
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (currentIndex < zoomableImages.length - 1) {
            showImage(currentIndex + 1);
        }
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (currentIndex > 0) {
            showImage(currentIndex - 1);
        }
    };

    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage(e);
        if (e.key === 'ArrowLeft') prevImage(e);
    });
});
