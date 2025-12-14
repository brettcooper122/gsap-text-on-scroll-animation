# GSAP Text Animations & Cursor Proximity Effects

A collection of smooth text animations including scroll-triggered effects and interactive cursor proximity font weight transitions. Available as standalone HTML/JavaScript demos and optimized Framer components.

## 🎯 Quick Links

- **Using Framer?** → See [FRAMER-SETUP.md](FRAMER-SETUP.md) for complete integration guide
- **Want the demo?** → Open `cursor-proximity.html` in your browser
- **Need customization?** → All parameters documented below

## Scroll-Scrubbed Text Animation

A smooth, bidirectional scroll-linked text animation where characters transition from dark grey (#444444) to nearly black (#1a1a1a) as you scroll. The text pins at the viewport center and animates character-by-character.

### Features

- **Pin Functionality**: Text becomes fixed at viewport center during animation
- **Bidirectional Animation**: Scroll down to darken text, scroll up to lighten it
- **Character-by-Character Reveal**: Each character animates independently with a stagger effect
- **Perfectly Linear**: Animation progress is directly tied to scroll position
- **Smooth Scrubbing**: Uses GSAP's `scrub` feature for fluid animation control
- **Editor's Note Font**: Custom Google Font for elegant typography
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How It Works

### Technical Implementation

1. **Character Splitting**: The text is split into individual characters, each wrapped in a `<span class="char">` element
2. **Initial State**: All characters start with dark grey color (#444444) - set explicitly with `gsap.set()`
3. **ScrollTrigger Setup**:
   - Text pins when it reaches viewport center (`start: 'center center'`)
   - Animation continues for 100vh while pinned (`end: '+=100%'`)
   - `scrub: 1` enables smooth, bidirectional animation with 1-second smoothing
   - `pin: true` fixes the text in place during animation
   - `stagger: 0.1` creates a wave effect across characters
4. **Animation**: Characters transition from #444444 to #1a1a1a
5. **Easing**: `ease: 'none'` ensures perfectly linear transitions

### Key GSAP Features Used (Best Practices)

- **Timeline Approach**: Uses `gsap.timeline()` with ScrollTrigger attached - recommended pattern
- **ScrollTrigger Plugin**: Links animation progress to scroll position
- **Pin**: Fixes element in place during scroll animation
- **Scrub**: Makes animation bidirectional and scroll-speed-dependent
- **Stagger**: Creates sequential timing for each character
- **gsap.set()**: Explicitly sets initial state to avoid cached value issues
- **gsap.to()**: Used instead of fromTo for simpler, more reliable scrub animations
- **window.load**: Ensures GSAP scripts are fully loaded before initialization

## Files

### HTML/JavaScript Demos
- `index.html` - Main HTML structure with text container and Google Font link
- `style.css` - Styling for layout, Editor's Note font, and responsive design
- `script.js` - GSAP animation logic with character splitting and ScrollTrigger
- `demo.html` - Self-contained single-file version for easy sharing/hosting
- `cursor-proximity.html` - Interactive cursor proximity font weight effect (vanilla JS)

### Framer Components
- `CursorProximityText-FramerMotion.tsx` - **RECOMMENDED** Framer component using Framer Motion (no dependencies)
- `CursorProximityText.tsx` - Framer component using GSAP (requires GSAP library)
- `FRAMER-SETUP.md` - Complete Framer integration guide

### Documentation
- `README.md` - This file - Documentation and best practices

## Usage

1. Open `index.html` or `demo.html` in a web browser
2. Scroll down until text reaches the center of your viewport
3. Text will pin in place and begin animating character-by-character from #444444 to #1a1a1a
4. Continue scrolling to complete the animation
5. Scroll back up to see the animation reverse smoothly
6. Check browser console for debugging information and progress updates

## Customization

### Adjust Animation Speed
In `script.js`, modify the `stagger` value:
```javascript
stagger: 0.1  // Lower = faster wave, Higher = slower wave
```

### Change Pin Position and Animation Duration
In `script.js`, modify the ScrollTrigger start/end values:
```javascript
start: 'center center',  // When text pins (center of element hits center of viewport)
end: '+=100%',           // Animation duration (100vh of scrolling)
// Try: end: '+=200%' for slower animation, end: '+=50%' for faster
```

### Adjust Smoothing
In `script.js`, modify the `scrub` value:
```javascript
scrub: 1      // 1 second smoothing
scrub: true   // Instant response
scrub: 0.5    // 0.5 second smoothing
```

### Change Colors
In `script.js`, modify the color values:
```javascript
gsap.set(chars, { color: '#444444' });  // Initial dark grey

tl.to(chars, {
    color: '#1a1a1a',  // Final nearly black
    // ...
});
```

Also update the CSS initial color in `style.css`:
```css
#animated-text span {
    color: #444444;  /* Match the gsap.set() value */
}
```

### Change Text
In `index.html`, modify the text content inside the `<h1 id="animated-text">` element.

## Cursor Proximity Font Weight Effect

The `cursor-proximity.html` file demonstrates an interactive font weight effect where letters become bolder based on cursor distance. This creates a dynamic, engaging typography experience.

### Features

- **Smooth Transitions**: Uses GSAP's `quickTo()` method for ultra-smooth 60fps animations
- **Variable Font**: Leverages Inter variable font (weights 100-900) for seamless weight transitions
- **Responsive Scaling**: Automatically calculates font size to fit 90% of viewport width
- **Performance Optimized**: Uses `requestAnimationFrame` and efficient distance calculations
- **Natural Easing**: Power2 easing creates smooth, organic falloff from cursor position
- **Viewport Constrained**: Text never exceeds viewport width, even with weight changes

### How It Works

1. **Proximity Detection**: Calculates distance between cursor and each letter's center
2. **Weight Calculation**: Letters within 250px radius increase weight based on inverse distance
3. **Smooth Updates**: GSAP's `quickTo()` provides butter-smooth transitions without lag
4. **Font Variation**: Uses `font-variation-settings` for smoother rendering than `font-weight`

### Customization Options

**Proximity Radius** - Adjust how far the cursor effect reaches:
```javascript
const PROXIMITY_RADIUS = 250; // Default: 250px
```

**Weight Range** - Change minimum and maximum font weights:
```javascript
const MIN_WEIGHT = 300; // Default: 300 (light)
const MAX_WEIGHT = 900; // Default: 900 (black)
```

**Easing Power** - Control how sharply weight falls off with distance:
```javascript
const EASING_POWER = 2; // Higher = sharper falloff, Lower = gentler gradient
```

**Animation Speed** - Adjust transition smoothness:
```javascript
duration: 0.3, // In quickTo() call - lower = faster, higher = smoother but slower
```

**Text Content** - Change the displayed text:
```javascript
const TEXT = "LET'S CHAT"; // Any text you want
```

### Technical Implementation

- **GSAP quickTo()**: Creates reusable, ultra-fast animation updaters for each letter
- **Font Variation Settings**: Uses CSS font-variation-settings for smoother rendering
- **Binary Search**: Efficiently calculates optimal font size to fit viewport
- **RequestAnimationFrame**: Ensures 60fps animation loop synced with browser repaints
- **Power Easing**: Mathematical curve creates natural-feeling weight transitions

### Performance Notes

- Pre-calculates letter positions for efficiency
- Uses `will-change` CSS property to optimize browser rendering
- GSAP's `quickTo()` is specifically designed for high-frequency updates
- Minimal DOM manipulation during animation loop

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Flexbox
- GSAP 3.12.5+

## Dependencies

- GSAP 3.12.5 (loaded via CDN)
- ScrollTrigger plugin (loaded via CDN)

## Development Notes

### Debug Markers
The `markers: true` option in ScrollTrigger shows visual indicators for the animation zone. Remove this in production:
```javascript
markers: false  // or remove the line entirely
```

### Console Logging
The code includes extensive console logging for debugging:
- Initialization messages
- Character count
- ScrollTrigger callbacks (enter, leave, enterBack, leaveBack)
- Real-time progress percentage

Remove or comment out console.log statements in production for better performance.

## GSAP Best Practices Applied

This project follows official GSAP recommendations:

1. **Timeline Pattern**: Use `gsap.timeline()` with ScrollTrigger for complex animations
2. **Explicit Initial State**: Use `gsap.set()` before animations to avoid cached value issues
3. **Simple Animations**: Use `gsap.to()` instead of `fromTo()` when using scrub for better reliability
4. **Proper Loading**: Wait for `window.load` event to ensure GSAP scripts are fully loaded
5. **Single ScrollTrigger**: Avoid creating multiple ScrollTriggers for the same element
6. **Performance**: Animate color properties with `ease: 'none'` for smooth linear transitions
7. **Pin Order**: Create ScrollTriggers in the correct order when using pin functionality

### Common Mistakes Avoided

- ❌ Using `fromTo()` with scrub (can cause cached value issues)
- ❌ Using `DOMContentLoaded` (may fire before GSAP scripts load)
- ❌ Creating multiple ScrollTriggers on nested animations
- ❌ Not setting explicit initial states

### Resources

- [GSAP ScrollTrigger Documentation](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [Common ScrollTrigger Mistakes](https://gsap.com/resources/st-mistakes/)
- [GSAP Learning Center](https://gsap.com/resources/get-started/)

## License

Free to use for personal and commercial projects.
