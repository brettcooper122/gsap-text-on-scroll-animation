// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Get the text element
    const textElement = document.getElementById('animated-text');
    const text = textElement.textContent;

    // Split text into individual characters and wrap each in a span
    textElement.innerHTML = text
        .split('')
        .map(char => {
            // Preserve spaces properly
            if (char === ' ') {
                return '<span>&nbsp;</span>';
            }
            return `<span>${char}</span>`;
        })
        .join('');

    // Get all character spans
    const chars = textElement.querySelectorAll('span');

    // Create the scroll-scrubbed animation with pinning
    gsap.fromTo(
        chars,
        {
            // Initial state: dark grey
            color: '#444444'
        },
        {
            // Final state: nearly black
            color: '#1a1a1a',

            // Stagger effect - creates the wave of color change
            // Each character starts animating slightly after the previous one
            stagger: 0.1,

            // Perfectly linear easing - no acceleration or deceleration
            ease: 'none',

            // ScrollTrigger configuration
            scrollTrigger: {
                trigger: '.text-container',

                // Pin the text container when it reaches the middle of the viewport
                pin: true,

                // Animation starts when center of text-container hits center of viewport
                start: 'center center',

                // Animation continues for 100% of the viewport height while pinned
                end: '+=100%',

                // CRITICAL: scrub: 1 provides smooth, bidirectional animation
                // The number (1) adds slight smoothing (1 second catch-up)
                // Use scrub: true for instant response, or a number for smoothing
                scrub: 1,

                // Visual markers for development (remove in production)
                markers: true,

                // Optional: add visual feedback
                onUpdate: (self) => {
                    // You can see progress in console (0 to 1)
                    console.log('Animation progress:', self.progress.toFixed(2));
                }
            }
        }
    );

    // Log success message
    console.log('GSAP Scroll-Scrubbed Text Animation initialized!');
    console.log('Total characters animated:', chars.length);
    console.log('Scroll to see the text pin at viewport center, then animate from #444444 to #1a1a1a');
});
