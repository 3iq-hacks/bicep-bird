'use client'

import React, { useEffect, useRef } from 'react'

const Canvas: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);

    // initialize
    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current; // Assigning to a temp variable
            ctx!.beginPath(); // Note the Non Null Assertion
            ctx!.arc(95, 50, 40, 0, 2 * Math.PI);
            ctx!.stroke();
        }
    })
    
    // useEffect(() => {
        
    //     const canvas = canvasRef.current.getContext('2d')
    //     if (context == null) throw new Error('Could not get context');
    //     let frameCount = 0
    //     let animationFrameId
        
    //     const render = () => {
    //     frameCount++
    //     draw(context, frameCount)
    //     animationFrameId = window.requestAnimationFrame(render)
    //     }
    //     render()
        
    //     return () => {
    //     window.cancelAnimationFrame(animationFrameId)
    //     }
    // }, [draw])

    return <canvas ref={canvasRef}></canvas>
}

export default Canvas
