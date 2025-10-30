"use client";
import { Story, Scene, Character, Menu, Image, FadeIn } from "narraleaf-react";

export function storyWithCharacter(activeCharacter) {
  const { name, race, class: charClass, avatar } = activeCharacter;

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

    narrator.say(` ${name} of the ${race} race ${charClass} journeys into the evil forrest.`, {
      fontSize: 28,
      color: "white",
    }),
    narrator.say(`& ${name} starts to hear the voices of bats squeaking and a small whisper`, {
      fontSize: 28,
      color: "white",
    }),

    hero.say(`I can hear a voice calling my name ${name} ${name} ${name}`, {
      fontSize: 26,
      color: "white",
    }),
    hero.say("The voice is getting closer and clearer", {
      fontSize: 26,
      color: "white",
    }),
    narrator.say("Truly, the voice is getting closer... suddenly an unknown witch appears", {
      fontSize: 28,
      color: "white",
    }),
    strangerImg.show(new FadeIn(800)),
    stranger.say("Traveler... you shouldn’t be here.", {
      fontSize: 26,
      color: "white",
    }),
    hero.say("A witch!... why do you call my name witch?", {
      fontSize: 26,
      color: "white",
    }),
    stranger.say("That doesn’t matter... since you have entered this forest you must be cursed", {
      fontSize: 26,
      color: "white",
    }),
    narrator.say("The witch begins to mutter some spells", {
      fontSize: 28,
      color: "white",
    }),

    // Menu with larger font
    Menu.prompt("What will you do?", {
      fontSize: 32,
      fontColor: "#111827",
      position: { xalign: 0.5, yalign: 0.9 },
    })
      .choose("Stop the witch to ask a question.", [
        hero.say("If I be cursed how can it be broken", {
          fontSize: 32,
          color: "white",
        }),
        stranger.say("Good question... But you have to be cursed for you to know how to break it.", {
          fontSize: 32,
          color: "white",
        }),
        narrator.say(
          `${name} steps forward, ready to face whatever comes next.`,
          { fontSize: 28, color: "white" }
        ),
        heroImg.hide({ duration: 600 }),
        strangerImg.hide({ duration: 600 }),
        scene_intro.jumpTo(scene_confront),
      ])
      .choose("Runs into the woods to hide from the witch.", [
        narrator.say(`${name} keeps running as the witch watchs and screams!!!.`, {
          fontSize: 28,
          color: "white",
        }),
        hero.say("Am just here to get a herb, I cannot be cursed.", {
          fontSize: 28,
          color: "white",
        }),
        stranger.say("NEVER!!! You must be cursed!", {
          fontSize: 28,
          color: "white",
        }),
        narrator.say(` and ${name} runs deep into the dark forest.`, {
          fontSize: 28,
          color: "white",
        }),
        heroImg.hide({ duration: 600 }),
        strangerImg.hide({ duration: 600 }),
        scene_intro.jumpTo(scene_hide),
      ]),
  ]);

  scene_confront.action([
    heroImg.show(new FadeIn(800)),
    strangerImg.show(new FadeIn(800)),

    narrator.say("The stranger ", {
      fontSize: 28,
      color: "white",
    }),
  ]);

  story.entry(scene_intro);
  return story;
}
