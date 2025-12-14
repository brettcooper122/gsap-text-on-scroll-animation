# Cursor Proximity Text - Framer Setup Guide

Two versions available for Framer:

1. **CursorProximityText-FramerMotion.tsx** (RECOMMENDED) - Uses Framer Motion (built-in, no dependencies)
2. **CursorProximityText.tsx** - Uses GSAP (requires adding GSAP to your project)

## Quick Start (Recommended: Framer Motion Version)

### 1. Add Component to Framer

1. Open your Framer project
2. Click on **Assets** panel (left sidebar)
3. Click the **+** button → **Code File**
4. Name it `CursorProximityText`
5. Copy the contents of `CursorProximityText-FramerMotion.tsx` into the editor
6. Save

### 2. Add Inter Font (Required for Variable Font Weights)

1. In Framer, go to **Assets** → **Fonts**
2. Click **+** → **Google Fonts**
3. Search for "Inter"
4. Select **Variable** option (important!)
5. Add to project

### 3. Use the Component

1. On your canvas, press **Cmd/Ctrl + K** to insert a component
2. Search for "CursorProximityText"
3. Add to your frame

### 4. Customize in Properties Panel

All settings are available in the right panel:
- **Text** - Change the displayed text
- **Font Size** - Base font size (auto-scales to fit)
- **Min Weight** - Lightest font weight (100-900)
- **Max Weight** - Boldest font weight (100-900)
- **Proximity Radius** - Distance cursor affects letters (px)
- **Spring Stiffness** - Animation bounce (higher = snappier)
- **Spring Damping** - Animation smoothness (higher = less bounce)
- **Background** - Background color
- **Text Color** - Text color

## Alternative: GSAP Version (More Performance)

If you need maximum performance or prefer GSAP animations:

### 1. Add GSAP to Your Project

**Option A: Via CDN (Recommended for quick testing)**
1. Go to **Project Settings** → **Head Code**
2. Add this script tag:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
```

**Option B: Via NPM (Better for production)**
1. Open terminal in your Framer project folder
2. Run: `npm install gsap`
3. The component will automatically detect and use it

### 2. Add Component

1. **Assets** → **+** → **Code File**
2. Name it `CursorProximityText`
3. Copy contents of `CursorProximityText.tsx`
4. Save and use on canvas

### 3. Property Controls

Same as Framer Motion version, except:
- **Transition Speed** instead of Spring controls (0.1-1.0 seconds)
- **Easing Power** controls falloff curve sharpness (1-5)

## Performance Tips

### For Best Performance:

1. **Use Framer Motion version** - Built-in, optimized for Framer
2. **Limit text length** - Shorter text = better performance
3. **Adjust Spring settings** - Higher stiffness/damping = less calculation
4. **Use on hero sections** - One instance per page recommended

### Performance Comparison:

- **Framer Motion**: ~60fps, no dependencies, native to Framer ✅
- **GSAP**: ~60fps, requires external library, slightly smoother

## Customization Examples

### Example 1: Subtle Effect
```
Text: "Hello World"
Font Size: 80
Min Weight: 400
Max Weight: 600
Proximity Radius: 150
```

### Example 2: Dramatic Effect (like the demo)
```
Text: "LET'S CHAT"
Font Size: 120
Min Weight: 300
Max Weight: 900
Proximity Radius: 250
```

### Example 3: Fast & Snappy
```
Spring Stiffness: 500
Spring Damping: 40
Proximity Radius: 200
```

### Example 4: Slow & Smooth
```
Spring Stiffness: 150
Spring Damping: 25
Proximity Radius: 300
```

## Responsive Behavior

Both components automatically:
- Scale font size to fit 90% of container width
- Maintain aspect ratio on resize
- Recalculate letter positions on window resize
- Handle mobile/tablet viewports

## Troubleshooting

### Text overflows container
- Reduce **Font Size** value
- Shorten text content
- Ensure container has defined width

### Animation feels sluggish
**Framer Motion version:**
- Increase **Spring Stiffness** (try 400-600)
- Increase **Spring Damping** (try 35-45)

**GSAP version:**
- Decrease **Transition Speed** (try 0.15-0.2)
- Check if GSAP loaded correctly (see console)

### Font weight not changing smoothly
- Verify you're using **Inter Variable** font
- Check that font weights 100-900 are available
- Make sure Min/Max weights are different (e.g., 300-900)

### Component not appearing
- Check that container has height set
- Verify background/text colors have contrast
- Ensure text is not empty

### GSAP version errors
```
"GSAP is not defined"
```
- Add GSAP via CDN (see setup step 1)
- Or install via npm: `npm install gsap`
- Refresh Framer preview

## Advanced Customization

### Change Font Family

Edit the component code, find this line:
```typescript
fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
```

Change to your font:
```typescript
fontFamily: "'Your Font', sans-serif"
```

### Add More Property Controls

In the `addPropertyControls` section, add new controls:
```typescript
addPropertyControls(CursorProximityText, {
    // ... existing controls
    letterSpacing: {
        type: ControlType.Number,
        title: "Letter Spacing",
        defaultValue: -0.04,
        min: -0.1,
        max: 0.2,
        step: 0.01,
    },
})
```

Then use it in the style:
```typescript
letterSpacing: `${letterSpacing}em`
```

### Multiple Text Lines

For multi-line support, modify the container styles:
```typescript
whiteSpace: "normal", // instead of "nowrap"
textAlign: "center",
maxWidth: "90%",
```

## Integration with Framer Features

### Variants
You can add variants to control the component state:
```typescript
// Add to component props
variants?: {
    initial: { opacity: 0 }
    animate: { opacity: 1 }
}
```

### Scroll Animations
Combine with Framer's scroll animations:
1. Wrap component in a frame
2. Add scroll animation to parent frame
3. Cursor effect works independently

### Responsive Breakpoints
Use Framer's breakpoint system:
- Set different font sizes per breakpoint
- Adjust proximity radius for mobile (smaller = better performance)

## Browser Compatibility

Works in all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari (desktop & iOS)
- Mobile browsers (iOS Safari, Chrome Mobile)

Requires:
- CSS Font Variation support
- ES6 JavaScript
- Framer Motion (built into Framer)

## Need Help?

- Check the browser console for errors
- Verify Inter Variable font is loaded
- Test with default values first
- Reduce complexity (shorter text, smaller radius) to isolate issues

## License

Free to use in personal and commercial Framer projects.
