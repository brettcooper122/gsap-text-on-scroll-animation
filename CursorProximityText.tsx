import { useRef, useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"

// IMPORTANT: Add GSAP to your Framer project
// 1. Go to Assets panel in Framer
// 2. Click the + button and add Custom Code
// 3. Add: https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js
// Or install via npm: npm install gsap

// @ts-ignore - GSAP is loaded via CDN or npm
declare const gsap: any

interface CursorProximityTextProps {
    text: string
    fontSize: number
    minWeight: number
    maxWeight: number
    proximityRadius: number
    easingPower: number
    transitionDuration: number
    backgroundColor: string
    textColor: string
    width: number | string
    height: number | string
}

export default function CursorProximityText({
    text = "LET'S CHAT",
    fontSize = 100,
    minWeight = 300,
    maxWeight = 900,
    proximityRadius = 250,
    easingPower = 2,
    transitionDuration = 0.3,
    backgroundColor = "#0a0a0a",
    textColor = "#f7f7f7",
    width = "100%",
    height = "100%",
}: Partial<CursorProximityTextProps>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const textWrapperRef = useRef<HTMLDivElement>(null)
    const [responsiveFontSize, setResponsiveFontSize] = useState(fontSize)
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })
    const lettersRef = useRef<
        Array<{
            element: HTMLSpanElement
            weightSetter: any
            centerX: number
            centerY: number
        }>
    >([])
    const animationFrameRef = useRef<number | null>(null)

    // Initialize letters
    useEffect(() => {
        if (!textWrapperRef.current || typeof gsap === "undefined") {
            console.warn("GSAP not loaded. Please add GSAP to your Framer project.")
            return
        }

        // Clear previous content
        textWrapperRef.current.innerHTML = ""
        lettersRef.current = []

        // Create letter elements
        text.split("").forEach((char, index) => {
            const span = document.createElement("span")
            span.className = "letter"
            span.textContent = char === " " ? "\u00A0" : char
            span.style.display = "inline-block"
            span.style.fontWeight = minWeight.toString()
            span.style.fontVariationSettings = `'wght' ${minWeight}`
            span.style.willChange = "font-variation-settings"
            textWrapperRef.current?.appendChild(span)

            // Create GSAP quickTo for smooth updates
            const weightSetter = gsap.quickTo(span, "fontVariationSettings", {
                duration: transitionDuration,
                ease: "power2.out",
            })

            lettersRef.current.push({
                element: span,
                weightSetter,
                centerX: 0,
                centerY: 0,
            })
        })

        // Calculate initial positions
        updateLetterPositions()
    }, [text, minWeight, transitionDuration])

    // Calculate responsive font size
    useEffect(() => {
        if (!containerRef.current || !textWrapperRef.current) return

        const calculateFontSize = () => {
            if (!containerRef.current || !textWrapperRef.current) return

            const viewportWidth = containerRef.current.offsetWidth
            const targetWidth = viewportWidth * 0.9 // 90% of container width

            let minSize = 10
            let maxSize = Math.min(fontSize * 2, 800)
            let iterations = 0

            // Binary search for optimal font size
            while (iterations < 25 && maxSize - minSize > 1) {
                const midSize = (minSize + maxSize) / 2
                textWrapperRef.current.style.fontSize = `${midSize}px`
                const actualWidth = textWrapperRef.current.scrollWidth

                if (actualWidth < targetWidth) {
                    minSize = midSize
                } else {
                    maxSize = midSize
                }
                iterations++
            }

            // Apply with safety margin
            const finalSize = Math.min(minSize * 0.98, fontSize)
            setResponsiveFontSize(finalSize)
            textWrapperRef.current.style.fontSize = `${finalSize}px`

            // Update letter positions after resize
            setTimeout(updateLetterPositions, 100)
        }

        calculateFontSize()

        // Debounced resize handler
        let resizeTimeout: NodeJS.Timeout
        const handleResize = () => {
            clearTimeout(resizeTimeout)
            resizeTimeout = setTimeout(calculateFontSize, 150)
        }

        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
            clearTimeout(resizeTimeout)
        }
    }, [fontSize, text])

    // Update letter positions
    const updateLetterPositions = () => {
        lettersRef.current.forEach((letter) => {
            const rect = letter.element.getBoundingClientRect()
            letter.centerX = rect.left + rect.width / 2
            letter.centerY = rect.top + rect.height / 2
        })
    }

    // Mouse event handlers
    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
        setMousePos({ x: -9999, y: -9999 })
    }

    // Animation loop
    useEffect(() => {
        if (typeof gsap === "undefined") return

        const animate = () => {
            lettersRef.current.forEach((letter) => {
                if (mousePos.x === -9999) {
                    // Reset to default weight
                    letter.weightSetter(`'wght' ${minWeight}`)
                    return
                }

                // Calculate distance from mouse to letter center
                const dx = letter.centerX - mousePos.x
                const dy = letter.centerY - mousePos.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                let weight = minWeight

                if (distance < proximityRadius) {
                    // Normalize distance (0 at cursor, 1 at radius edge)
                    const normalized = distance / proximityRadius

                    // Apply easing curve
                    const eased = 1 - Math.pow(normalized, easingPower)

                    // Calculate final weight
                    weight = minWeight + eased * (maxWeight - minWeight)
                }

                // Update font weight smoothly
                letter.weightSetter(`'wght' ${Math.round(weight)}`)
            })

            animationFrameRef.current = requestAnimationFrame(animate)
        }

        animate()

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
            }
        }
    }, [
        mousePos,
        minWeight,
        maxWeight,
        proximityRadius,
        easingPower,
    ])

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width,
                height,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor,
                overflow: "hidden",
                cursor: "default",
                position: "relative",
            }}
        >
            <div
                ref={textWrapperRef}
                style={{
                    color: textColor,
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    whiteSpace: "nowrap",
                    display: "flex",
                    letterSpacing: "-0.04em",
                    maxWidth: "100%",
                    width: "100%",
                    justifyContent: "center",
                    fontSize: `${responsiveFontSize}px`,
                }}
            />
        </div>
    )
}

// Framer Property Controls
addPropertyControls(CursorProximityText, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "LET'S CHAT",
        displayTextArea: false,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Font Size",
        defaultValue: 100,
        min: 20,
        max: 500,
        step: 10,
        unit: "px",
        displayStepper: true,
    },
    minWeight: {
        type: ControlType.Number,
        title: "Min Weight",
        defaultValue: 300,
        min: 100,
        max: 900,
        step: 100,
        displayStepper: true,
    },
    maxWeight: {
        type: ControlType.Number,
        title: "Max Weight",
        defaultValue: 900,
        min: 100,
        max: 900,
        step: 100,
        displayStepper: true,
    },
    proximityRadius: {
        type: ControlType.Number,
        title: "Proximity Radius",
        defaultValue: 250,
        min: 50,
        max: 500,
        step: 10,
        unit: "px",
        displayStepper: true,
    },
    easingPower: {
        type: ControlType.Number,
        title: "Easing Power",
        defaultValue: 2,
        min: 1,
        max: 5,
        step: 0.5,
        displayStepper: true,
    },
    transitionDuration: {
        type: ControlType.Number,
        title: "Transition Speed",
        defaultValue: 0.3,
        min: 0.1,
        max: 1,
        step: 0.1,
        unit: "s",
        displayStepper: true,
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#0a0a0a",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text Color",
        defaultValue: "#f7f7f7",
    },
})
