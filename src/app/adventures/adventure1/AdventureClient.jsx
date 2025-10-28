"use client";

import { GameProviders, Player } from "narraleaf-react";
import { storyWithCharacter } from "../stories/page";
import adventuresId from "@/styles/adventuresId.module.css";

export default function AdventureClient({ activeCharacter }) {
  const story = storyWithCharacter(activeCharacter);

  return (
    <div className={adventuresId.maincontainer}>
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
