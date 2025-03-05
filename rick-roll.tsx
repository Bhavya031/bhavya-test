"use client"

import { useState, useEffect, useRef } from "react"

const asciiArt = `
 ____  _                             
| __ )| |__   __ ___   ___   _  __ _ 
|  _ \\| '_ \\ / _\` \\ \\ / / | | |/ _\` |
| |_) | | | | (_| |\\ V /| |_| | (_| |
|____/|_| |_|\\__,_| \\_/  \\__, |\\__,_|
                         |___/        

`

export default function RickRoll() {
  const [animationComplete, setAnimationComplete] = useState(false)
  const [text, setText] = useState("")
  const [glowing, setGlowing] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      setText(asciiArt.slice(0, i))
      i += 3

      if (i > asciiArt.length) {
        clearInterval(timer)

        setTimeout(() => {
          setGlowing(true)

          setTimeout(() => {
            setOpacity(0)
            setTimeout(() => {
              setAnimationComplete(true)
              // Start playing the video once animation is complete
              if (videoRef.current) {
                videoRef.current.play().catch((e) => console.error("Autoplay failed:", e))
              }
            }, 500)
          }, 1000)
        }, 200)
      }
    }, 20)

    return () => clearInterval(timer)
  }, [])

  // Handle unmuting the video when user interacts
  const handleUnmute = () => {
    if (videoRef.current) {
      videoRef.current.muted = false
    }
  }

  return (
    <>
      {!animationComplete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
            opacity: opacity,
            transition: "opacity 0.5s ease-out",
            fontFamily: "monospace",
          }}
        >
          <pre
            style={{
              color: "#4ade80", // green-400 equivalent
              fontSize: "1.25rem",
              whiteSpace: "pre",
              transition: "all 150ms",
              textShadow: glowing ? "0 0 10px #00ff00, 0 0 20px #00ff00" : "none",
            }}
          >
            {text}
          </pre>
        </div>
      )}

      {animationComplete && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 50,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "56rem",
              aspectRatio: "16/9",
            }}
          >
            <video
              ref={videoRef}
              style={{
                width: "100%",
                height: "100%",
              }}
              autoPlay
              playsInline
              controls={false}
              onClick={handleUnmute}
              src="/rickroll.mp4"
            />
            {/* Unmute button */}
            <button
              onClick={handleUnmute}
              style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem",
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                padding: "0.25rem 0.75rem",
                borderRadius: "0.375rem",
                backdropFilter: "blur(4px)",
                transition: "background-color 0.2s",
                cursor: "pointer",
                border: "none",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.3)"
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
              }}
            >
              Unmute
            </button>
          </div>
          <p
            style={{
              color: "white",
              marginTop: "1rem",
              fontSize: "0.875rem",
            }}
          >
            Click video to unmute
          </p>
        </div>
      )}
    </>
  )
}

