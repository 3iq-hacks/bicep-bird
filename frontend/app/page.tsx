import Image from 'next/image'
import Canvas from './Canvas'

export default function Home() {
    return (
        <main>
            <h1>Fish Game</h1>
            <p>Inspired by the rowing machine game at the gym</p>
            <Canvas />
        </main>
    )
}
