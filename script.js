// Wait for window to fully load (including GSAP scripts)
window.addEventListener('load', function() {
    console.log('Initializing GSAP ScrollTrigger animation...');

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get the text element
    const textElement = document.getElementById('animated-text');
    if (!textElement) {
        console.error('Text element not found!');
        return;
    }

    const originalText = textElement.textContent.trim();
    console.log('Original text:', originalText);

    // Split text into individual characters and wrap each in a span
    textElement.innerHTML = originalText
        .split('')
        .map(char => {
            // Preserve spaces properly
            if (char === ' ') {
                return '<span class="char">&nbsp;</span>';
            }
            return `<span class="char">${char}</span>`;
        })
        .join('');

    // Get all character spans
    const chars = textElement.querySelectorAll('.char');
    console.log('Total characters:', chars.length);

    // Set initial color explicitly
    gsap.set(chars, { color: '#444444' });

    // Create a timeline for the animation
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.text-container',
            pin: true,
            start: 'center center',
            end: '+=100%',
            scrub: 1,
            markers: true,
            onEnter: () => console.log('ScrollTrigger entered'),
            onLeave: () => console.log('ScrollTrigger left'),
            onEnterBack: () => console.log('ScrollTrigger entered back'),
            onLeaveBack: () => console.log('ScrollTrigger left back'),
            onUpdate: (self) => {
                console.log('Progress:', (self.progress * 100).toFixed(1) + '%');
            }
        }
    });

    // Add the color animation to the timeline
    tl.to(chars, {
        color: '#1a1a1a',
        stagger: 0.1,
        ease: 'none',
        duration: 1
    });

    console.log('GSAP ScrollTrigger animation initialized successfully!');
    console.log('Scroll to center of viewport to see animation');
});
