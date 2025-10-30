"use client";

import { useEffect } from "react";
import {
  GameProviders,
  Player,
  Dialog,
  Nametag,
  Texts,
  useGame,
} from "narraleaf-react";
import { storyWithCharacter } from "../stories2/page";
import adventuresId from "@/styles/adventuresId.module.css";

// Custom Dialog component
function GameDialog() {
  return (
    <Dialog
      style={{
        backgroundColor: "black",
        height: "15rem",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
      }}
    >
      <Nametag className="text-white font-bold" />
      <Texts className="text-white text-lg" />
    </Dialog>
  );
}

// This component runs inside GameProviders, so useGame is safe here
function GamePlayer({ story }) {
  const game = useGame();

  useEffect(() => {
    if (game) {
      game.configure({
        dialog: GameDialog,
      });
    }
  }, [game]);

  return (
    <Player
      story={story}
      onReady={({ liveGame }) => liveGame.newGame()}
      width="100%"
      height="100%"
    />
  );
}

export default function AdventureClient({ activeCharacter }) {
  const story = storyWithCharacter(activeCharacter);

  return (
    <div className={adventuresId.maincontainer}>
      <GameProviders>
        <GamePlayer story={story} />
      </GameProviders>
    </div>
  );
}
