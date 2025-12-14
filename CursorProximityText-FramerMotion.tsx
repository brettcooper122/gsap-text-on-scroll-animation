import { useRef, useEffect, useState } from "react"
import { addPropertyControls, ControlType } from "framer"
import { motion, useSpring, useTransform } from "framer-motion"

/**
 * Cursor Proximity Text - Framer Motion Version
 *
 * A performance-optimized component that uses Framer Motion (built into Framer)
 * instead of GSAP. No external dependencies required!
 *
 * @framerSupportedLayoutWidth auto
 * @framerSupportedLayoutHeight auto
 */

interface CursorProximityTextProps {
    text: string
    fontSize: number
    minWeight: number
    maxWeight: number
    proximityRadius: number
    springStiffness: number
    springDamping: number
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
    springStiffness = 300,
    springDamping = 30,
    backgroundColor = "#0a0a0a",
    textColor = "#f7f7f7",
    width = "100%",
    height = "100%",
}: Partial<CursorProximityTextProps>) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [responsiveFontSize, setResponsiveFontSize] = useState(fontSize)
    const [mousePos, setMousePos] = useState({ x: -9999, y: -9999 })

    // Calculate responsive font size
    useEffect(() => {
        const calculateFontSize = () => {
            if (!containerRef.current) return

            const viewportWidth = containerRef.current.offsetWidth
            const targetWidth = viewportWidth * 0.9

            // Estimate character width (roughly 0.6 * fontSize for Inter font)
            const charWidth = fontSize * 0.6
            const textWidth = text.length * charWidth

            if (textWidth > targetWidth) {
                const scale = targetWidth / textWidth
                setResponsiveFontSize(fontSize * scale * 0.95) // 5% safety margin
            } else {
                setResponsiveFontSize(fontSize)
            }
        }

        calculateFontSize()

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

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
        setMousePos({ x: -9999, y: -9999 })
    }

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
                style={{
                    color: textColor,
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                    whiteSpace: "nowrap",
                    display: "flex",
                    letterSpacing: "-0.04em",
                    maxWidth: "100%",
                    fontSize: `${responsiveFontSize}px`,
                    justifyContent: "center",
                }}
            >
                {text.split("").map((char, index) => (
                    <Letter
                        key={index}
                        char={char}
                        index={index}
                        mousePos={mousePos}
                        minWeight={minWeight}
                        maxWeight={maxWeight}
                        proximityRadius={proximityRadius}
                        springStiffness={springStiffness}
                        springDamping={springDamping}
                    />
                ))}
            </div>
        </div>
    )
}

// Individual letter component with Framer Motion spring animation
function Letter({
    char,
    index,
    mousePos,
    minWeight,
    maxWeight,
    proximityRadius,
    springStiffness,
    springDamping,
}: {
    char: string
    index: number
    mousePos: { x: number; y: number }
    minWeight: number
    maxWeight: number
    proximityRadius: number
    springStiffness: number
    springDamping: number
}) {
    const letterRef = useRef<HTMLSpanElement>(null)
    const [weight, setWeight] = useState(minWeight)

    // Smooth spring animation for weight
    const animatedWeight = useSpring(weight, {
        stiffness: springStiffness,
        damping: springDamping,
    })

    const fontVariationSettings = useTransform(
        animatedWeight,
        (w) => `'wght' ${Math.round(w)}`
    )

    // Calculate weight based on mouse position
    useEffect(() => {
        if (!letterRef.current || mousePos.x === -9999) {
            setWeight(minWeight)
            return
        }

        const rect = letterRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2

        const dx = centerX - mousePos.x
        const dy = centerY - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < proximityRadius) {
            const normalized = distance / proximityRadius
            const eased = 1 - Math.pow(normalized, 2)
            const newWeight = minWeight + eased * (maxWeight - minWeight)
            setWeight(newWeight)
        } else {
            setWeight(minWeight)
        }
    }, [mousePos, minWeight, maxWeight, proximityRadius])

    return (
        <motion.span
            ref={letterRef}
            style={{
                display: "inline-block",
                fontVariationSettings,
                willChange: "font-variation-settings",
            }}
        >
            {char === " " ? "\u00A0" : char}
        </motion.span>
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
    springStiffness: {
        type: ControlType.Number,
        title: "Spring Stiffness",
        defaultValue: 300,
        min: 50,
        max: 1000,
        step: 50,
        displayStepper: true,
    },
    springDamping: {
        type: ControlType.Number,
        title: "Spring Damping",
        defaultValue: 30,
        min: 10,
        max: 100,
        step: 5,
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
