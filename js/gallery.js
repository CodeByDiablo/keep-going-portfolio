import { animate, scroll, stagger, cubicBezier } from 'https://cdn.jsdelivr.net/npm/motion@11.11.16/+esm';

export function initGallery() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('Reduced motion preference detected - skipping animations');
        return;
    }

    let image = document.querySelector('.scaler img');
    // Ensure we scope to gallery logic
    let firstSection = document.querySelector('.gallery-spacer');
    let layers = document.querySelectorAll('.gallery-grid > .layer');

    if (!image || !firstSection) {
        console.warn("Gallery elements not found");
        return;
    }

    // Measure the natural size before animating
    const naturalWidth = image.offsetWidth;
    const naturalHeight = image.offsetHeight;

    // Get viewport dimensions in pixels
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Animate image on scroll - shrink from full screen to natural size
    scroll(
        animate(image, {
            width: [viewportWidth, naturalWidth], // px values
            height: [viewportHeight, naturalHeight] // px values
        }, {
            width: { easing: cubicBezier(0.65, 0, 0.35, 1) },   // GSAP power2.inOut
            height: { easing: cubicBezier(0.42, 0, 0.58, 1) }   // GSAP power1.inOut
        }),
        {
            target: firstSection,
            offset: ['start start', '80% end end']
        }
    );

    // Animate each layer with staggered timing
    const scaleEasings = [
        cubicBezier(0.42, 0, 0.58, 1),  // Layer 1: GSAP power1.inOut
        cubicBezier(0.76, 0, 0.24, 1),  // Layer 2: GSAP power3.inOut
        cubicBezier(0.87, 0, 0.13, 1)   // Layer 3: GSAP power4.inOut
    ];

    layers.forEach((layer, index) => {
        const endOffset = `${1 - (index * 0.05)} end`;

        // fade: opacity
        scroll(
            animate(layer, {
                opacity: [0, 0, 1]
            }, {
                offset: [0, 0.55, 1],
                easing: cubicBezier(0.61, 1, 0.88, 1)
            }),
            {
                target: firstSection,
                offset: ['start start', endOffset]
            }
        );

        // reveal: scale
        scroll(
            animate(layer, {
                scale: [0, 0, 1]
            }, {
                offset: [0, 0.3, 1],
                easing: scaleEasings[index]
            }),
            {
                target: firstSection,
                offset: ['start start', endOffset]
            }
        );
    });
}
