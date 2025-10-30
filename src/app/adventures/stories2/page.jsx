"use client";
import { Story, Scene, Character, Menu, Image, FadeIn } from "narraleaf-react";

export function storyWithCharacter(activeCharacter) {
  const {
    name,
    race,
    class: charClass,
    avatar,
    health,
    strength,
    intelligence,
    speed,
  } = activeCharacter;

  const story = new Story(`${name}'s Second Adventure`);

  const scene_intro = new Scene("The Encounter", {
    background: { src: "/images/backgrounds/forest.jpg" },
  });
  const scene_confront = new Scene("The Confrontation", {
    background: { src: "" },
  });
  const scene_hide = new Scene("The Spellbook", { background: { src: "" } });

  const hero = new Character(name, { color: "white" });
  const stranger = new Character("Unknown Witch", { color: "white" });
  const narrator = new Character("Narrator", { color: "white" });

  let diceRoll = 0;

  const heroImg = new Image({
    src: avatar || "/pictures/default-avatar.png",
    zoom: 1,
    position: { xalign: 0.1, yalign: 0.4 },
  });
  const strangerImg = new Image({
    src: "/images/avatars/witch.jpg",
    zoom: 1,
    position: { xalign: 0.5, yalign: 0.4 },
  });

  scene_intro.action([
    heroImg.show(new FadeIn(800)),

    narrator.say(
      ` ${name}, the ${race} ${charClass}, journeys into the evil forest...`,
      {
        fontSize: 37,
        color: "white",
      }
    ),
    narrator.say(`${name} starts to hear bats squeaking, and a low whisper.`, {
      fontSize: 37,
      color: "white",
    }),

    hero.say(
      `I can hear someone calling my name... "${name}", "${name}", "${name}"`,
      {
        fontSize: 37,
        color: "white",
      }
    ),
    hero.say("The voice is getting closer and clearer.", {
      fontSize: 37,
      color: "white",
    }),
    narrator.say("Suddenly, an unknown witch appears!", {
      fontSize: 37,
      color: "white",
    }),
    strangerImg.show(new FadeIn(800)),
    stranger.say("Traveler... You shouldn’t be here.", {
      fontSize: 37,
      color: "white",
    }),
    hero.say("A witch! How do you know my name? Why are you calling me?", {
      fontSize: 37,
      color: "white",
    }),
    stranger.say(
      "That doesn’t matter... Since you have entered this forest, then you must be cursed.",
      {
        fontSize: 37,
        color: "white",
      }
    ),
    narrator.say("The witch begins to mutter some spells under her breath.", {
      fontSize: 37,
      color: "white",
    }),

    // Menu with larger font
    Menu.prompt("What will you do?", {
      fontSize: 50,
      fontColor: "#111827",
      position: { xalign: 0.5, yalign: 0.9 },
    })
      .choose("Stop the witch to ask a question.", [
        hero.say("How can I break the curse?", {
          fontSize: 37,
          color: "white",
        }),
        stranger.say(
          "Good question... But you have to be cursed first for you to learn how to break it.",
          {
            fontSize: 37,
            color: "white",
          }
        ),
        narrator.say(
          `${name} frowns, unhappy with the witch's unfair reasoning.`,
          { fontSize: 37, color: "white" }
        ),
        hero.say("I refuse!", {
          fontSize: 37,
          color: "white",
        }),
        stranger.say("Then accept the consequences of your actions!", {
          fontSize: 37,
          color: "white",
        }),
        narrator.say(
          `The witch raises her hand, and a blinding light rushes at ${name}. It's a hit!`,
          { fontSize: 37, color: "white" }
        ),
        narrator.say(
          `${name}'s health lowers from ${
            activeCharacter.health
          } to ${(activeCharacter.health -= 15)}!`,
          { fontSize: 37, color: "white" }
        ),
        narrator.say(
          `${name} winces in pain. Then quickly charges at the witch.`,
          { fontSize: 37, color: "white" }
        ),
        narrator.say(
          `${name} rolls the dice and gets a ${(diceRoll =
            Math.round(Math.random() * 9) + 1)}!`,
          {
            fontSize: 37,
            color: "white",
          }
        ),
        narrator.say(
          `${name} charges at the witch and inflicts ${
            activeCharacter.strength * diceRoll
          } damage!`,
          { fontSize: 37, color: "white" }
        ),
        narrator.say(
          `The witch screeches in rage, then in a puff of black smoke, she disappears.`,
          { fontSize: 37, color: "white" }
        ),
        strangerImg.hide({ duration: 600 }),
        narrator.say(
          `${name} heaves a sigh of relief. Alive to see another day...`,
          { fontSize: 37, color: "white" }
        ),
        heroImg.hide({ duration: 600 }),
      ])
      .choose("Runs into the woods to hide from the witch.", [
        narrator.say(`${name} keeps running as the witch glares and screams!`, {
          fontSize: 37,
          color: "white",
        }),
        hero.say("I'm just here to get some herbs, I cannot be cursed!", {
          fontSize: 37,
          color: "white",
        }),
        stranger.say("ACCEPT YOUR FATE!!", {
          fontSize: 37,
          color: "white",
        }),
        strangerImg.hide({ duration: 600 }),
        narrator.say(
          `${name} keeps running deep into the dark forest, whilst the witch's loud cackle echoes through the trees.`,
          {
            fontSize: 37,
            color: "white",
          }
        ),
        narrator.say(
          `${name} rolls the dice and gets a ${(diceRoll =
            Math.round(Math.random() * 9) + 1)}!`,
          {
            fontSize: 37,
            color: "white",
          }
        ),
        narrator.say(
          `${name} rushes with ${activeCharacter.strength * diceRoll} speed!`,
          { fontSize: 37, color: "white" }
        ),
        narrator.say(
          `${name} manages to escape, leaving the evil witch far, far away...`,
          { fontSize: 37, color: "white" }
        ),
        heroImg.hide({ duration: 600 }),

        scene_intro.jumpTo(scene_hide),
      ]),
  ]);

  story.entry(scene_intro);
  return story;
}
