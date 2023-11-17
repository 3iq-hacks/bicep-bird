'use client'

import React, { useEffect, useRef } from 'react'
import Game from '@/game/Game';

const Canvas: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    // initialize
    useEffect(() => {
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current; // Assigning to a temp variable
            if (ctx == null) throw new Error('Could not get context');

            const game = new Game(ctx);
            game.setScreen();
            requestAnimationFrame(num => game.gameLoop(num));
            window.addEventListener("keydown", () => game.start());
        }
    })

    return <canvas ref={canvasRef}></canvas>
}

export default Canvas
