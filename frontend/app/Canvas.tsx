'use client'

import React, { useEffect, useRef } from 'react'
import Game from '@/game/Game';

const Canvas: React.FC = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);

    // initialize
    useEffect(() => {
        // Initialize
        if (canvasRef.current) {
            canvasCtxRef.current = canvasRef.current.getContext('2d');
            let ctx = canvasCtxRef.current; // Assigning to a temp variable
            if (ctx == null) throw new Error('Could not get context');

            let game = new Game(ctx);
            game.setScreen();
            requestAnimationFrame(game.gameLoop.bind(game));
            window.addEventListener("keydown", game.start.bind(game));
        }
    })

    return <canvas ref={canvasRef}></canvas>
}

export default Canvas
