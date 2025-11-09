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

    // Create the scroll-scrubbed animation
    gsap.fromTo(
        chars,
        {
            // Initial state: grey
            color: '#808080'
        },
        {
            // Final state: black
            color: '#000000',

            // Stagger effect - creates the wave of color change
            // Each character starts animating slightly after the previous one
            stagger: 0.1,

            // Perfectly linear easing - no acceleration or deceleration
            ease: 'none',

            // ScrollTrigger configuration
            scrollTrigger: {
                trigger: '.text-container',

                // Animation starts when top of text-container hits 80% of viewport
                start: 'top 80%',

                // Animation ends when top of text-container hits 20% of viewport
                end: 'top 20%',

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
    console.log('Scroll down to see characters turn black, scroll up to see them return to grey');
});
