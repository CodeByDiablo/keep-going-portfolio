export function initIntro(onComplete) {
    let tl = gsap.timeline({
        delay: 0,
        onComplete: () => {
            // Trigger global nav fade in
            if (onComplete) onComplete();
        }
    });

    tl.to(".intro-col", {
        top: "0",
        duration: 3,
        ease: "power4.inOut"
    });

    tl.to(".c-1 .item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
    }, "-=2");

    tl.to(".c-2 .item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-3 .item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-4 .item", {
        top: "0",
        stagger: -0.25,
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".c-5 .item", {
        top: "0",
        stagger: 0.25,
        duration: 3,
        ease: "power4.inOut"
    }, "-=4");

    tl.to(".intro-container", {
        scale: 6,
        duration: 4,
        ease: "power4.inOut"
    }, "-=2");

    // Fade out intro at the end
    tl.to("#intro-section", {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        pointerEvents: "none"
    });
}
