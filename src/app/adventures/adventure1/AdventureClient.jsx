"use client";

import { GameProviders, Player } from "narraleaf-react";
import { storyWithCharacter } from "../stories/page";

export default function AdventureClient({ activeCharacter }) {
  const story = storyWithCharacter(activeCharacter);

  return (
    <div className="w-screen h-screen bg-white flex items-center justify-center">
      <GameProviders>
        <Player
          story={story}
          onReady={({ liveGame }) => liveGame.newGame()}
          width="100%"
          height="100%"
        />
      </GameProviders>
    </div>
  );
}
