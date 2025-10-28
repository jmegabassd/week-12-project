"use client";
 
import { GameProviders, Player } from "narraleaf-react";
import { story1 } from "../stories/page";
 
export default function Page() {
    return (
        <GameProviders>
            <Player story={story1} onReady={({ liveGame }) => {
                liveGame.newGame();
            }}
                width="100vw"
                height="100vh"
            />
        </GameProviders>
    );
}