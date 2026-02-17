import { initIntro } from './intro.js';
import { initPortfolio } from './portfolio.js';
import { initGallery } from './gallery.js';

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
    // Start with Intro
    initIntro(() => {
        // Callback when intro finishes
        console.log("Intro finished. Initializing Portfolio.");
        initPortfolio();
        initGallery();

        // Refresh ScrollTrigger to ensure pin positions are correct after intro hides
        ScrollTrigger.refresh();
    });
});
