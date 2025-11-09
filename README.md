# GSAP Scroll-Scrubbed Text Animation

A smooth, bidirectional scroll-linked text animation where characters transition from grey to black as you scroll down, and reverse back to grey as you scroll up.

## Features

- **Bidirectional Animation**: Scroll down to reveal text in black, scroll up to return to grey
- **Character-by-Character Reveal**: Each character animates independently with a stagger effect
- **Perfectly Linear**: Animation progress is directly tied to scroll position
- **Smooth Scrubbing**: Uses GSAP's `scrub` feature for fluid animation control
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How It Works

### Technical Implementation

1. **Character Splitting**: The text is split into individual characters, each wrapped in a `<span>` element
2. **Initial State**: All characters start with grey color (#808080)
3. **ScrollTrigger Setup**:
   - Trigger zone: from 80% viewport to 20% viewport
   - `scrub: 1` enables smooth, bidirectional animation with 1-second smoothing
   - `stagger: 0.1` creates a wave effect across characters
4. **Animation**: Characters transition from grey (#808080) to black (#000000)
5. **Easing**: `ease: 'none'` ensures perfectly linear transitions

### Key GSAP Features Used

- **ScrollTrigger Plugin**: Links animation progress to scroll position
- **Scrub**: Makes animation bidirectional and scroll-speed-dependent
- **Stagger**: Creates sequential timing for each character
- **fromTo**: Defines explicit start and end states

## Files

- `index.html` - Main HTML structure with text container
- `style.css` - Styling for layout and responsive design
- `script.js` - GSAP animation logic with character splitting and ScrollTrigger

## Usage

1. Open `index.html` in a web browser
2. Scroll down to see characters turn from grey to black
3. Scroll up to see the animation reverse smoothly
4. The animation responds instantly to scroll speed and direction

## Customization

### Adjust Animation Speed
In `script.js`, modify the `stagger` value:
```javascript
stagger: 0.1  // Lower = faster wave, Higher = slower wave
```

### Change Scroll Distance
In `script.js`, modify the ScrollTrigger start/end values:
```javascript
start: 'top 80%',  // When animation starts
end: 'top 20%',    // When animation ends
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
color: '#808080'  // Initial grey
color: '#000000'  // Final black
```

### Change Text
In `index.html`, modify the text content inside the `<h1 id="animated-text">` element.

## Browser Compatibility

Works in all modern browsers that support:
- ES6 JavaScript
- CSS Flexbox
- GSAP 3.12.5+

## Dependencies

- GSAP 3.12.5 (loaded via CDN)
- ScrollTrigger plugin (loaded via CDN)

## Development Notes

The `markers: true` option in ScrollTrigger shows visual indicators for the animation zone. Remove this in production:
```javascript
markers: false  // or remove the line entirely
```

## License

Free to use for personal and commercial projects.
