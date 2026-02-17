export function initPortfolio() {
    gsap.set("#portfolio-section", { opacity: 1 });

    // 1. Calculate Heights
    const contentHolder = document.querySelector('.content-holder');
    const contentHeight = contentHolder.offsetHeight;
    const introScrollDuration = window.innerHeight * 2; // Distance to scroll for intro animation
    const extraScroll = window.innerHeight * 0.5; // Little buffer

    // Total height = intro scroll + content scroll
    // Content scroll needs to cover the contentHeight
    const totalHeight = introScrollDuration + contentHeight + extraScroll;

    const portSection = document.querySelector('#portfolio-section');
    portSection.style.height = `${totalHeight}px`;

    // 2. Intro Animation (Letters & Image)
    // We lock this animation once it completes to prevent scrolling back
    const tlIntro = gsap.timeline({
        scrollTrigger: {
            trigger: "#portfolio-section",
            start: "top top",
            end: `+=${introScrollDuration}`,
            scrub: 1,
            onLeave: (self) => {
                // LOCK state: Kill the trigger so it doesn't reverse on scroll up
                // keep properties at their final state ("false" for reset)
                self.kill(false, true);
            }
        }
    });

    // Letters fly out
    tlIntro.to(".port-header .letters:first-child", { x: () => -window.innerWidth * 3, scale: 10, ease: "power2.inOut" }, 0);
    tlIntro.to(".port-header .letters:last-child", { x: () => window.innerWidth * 3, scale: 10, ease: "power2.inOut" }, 0);

    // Image expands
    tlIntro.to(".img-holder", { rotation: 0, clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', ease: "power2.inOut" }, 0);
    tlIntro.to(".img-holder img", { scale: 1, ease: "power2.inOut" }, 0);


    // 3. About Section Animation
    // Moves the content up over the fixed image
    // Starts exactly where the intro ends

    // Initial position of content-holder is below the 100vh image.
    // We want to move it up to cover the image.

    gsap.to(".content-holder", {
        y: () => -(contentHeight + 100), // Scroll up entire content height
        ease: "none",
        scrollTrigger: {
            trigger: "#portfolio-section",
            // Start when the *intro scroll* is finished.
            // i.e., when portSection top is 'introScrollDuration' above viewport top
            start: `top top-=${introScrollDuration}`,
            end: "bottom bottom",
            scrub: 1
        }
    });
}
