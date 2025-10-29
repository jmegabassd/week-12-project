"use client";
import { Story, Scene, Character, Menu, Image, FadeIn } from "narraleaf-react";

export function storyWithCharacter(activeCharacter) {
  const { name, race, class: charClass, avatar } = activeCharacter;

  const story = new Story(`${name}'s First Adventure`);

  const scene_intro = new Scene("The Beginning", { background: { src: "" } });
  const scene_confront = new Scene("The Confrontation", {
    background: { src: "" },
  });
  const scene_hide = new Scene("The Watcher", { background: { src: "" } });

  const hero = new Character(name);
  const stranger = new Character("Mysterious Stranger");
  const narrator = new Character("Narrator");

  const heroImg = new Image({
    src: avatar || "/pictures/default-avatar.png",
    zoom: 1,
    position: { xalign: 0.2, yalign: 0.3 },
  });
  const strangerImg = new Image({
    src: "",
    zoom: 0.5,
    position: { xalign: 0.8, yalign: 0.3 },
  });

  scene_intro.action([
    heroImg.show(new FadeIn(800)),
    strangerImg.show(new FadeIn(800)),

    narrator.say(`Our story begins with ${name}, the ${race} ${charClass}.`, {
      fontSize: 28,
    }),
    narrator.say("A gentle breeze rustles through the ancient forest...", {
      fontSize: 28,
    }),

    hero.say("It feels like something is calling to me.", { fontSize: 26 }),
    narrator.say("Suddenly, a figure emerges from the mist.", { fontSize: 28 }),
    stranger.say("Traveler... you shouldn’t be here.", { fontSize: 26 }),
    hero.say("Who are you? And how do you know my name?", { fontSize: 26 }),
    stranger.say("That doesn’t matter now. What matters is your choice...", {
      fontSize: 26,
    }),

    // Menu with larger font
    Menu.prompt("What will you do?", {
      fontSize: 32,
      fontColor: "#111827",
      position: { xalign: 0.5, yalign: 0.9 },
    })
      .choose("Step forward and confront the stranger.", [
        hero.say("I don’t back down from a challenge.", { fontSize: 32 }),
        stranger.say("Brave words... let’s see if your courage matches them.", {
          fontSize: 32,
        }),
        narrator.say(
          `${name} steps forward, ready to face whatever comes next.`,
          { fontSize: 28 }
        ),
        heroImg.hide({ duration: 600 }),
        strangerImg.hide({ duration: 600 }),
        scene_intro.jumpTo(scene_confront),
      ])
      .choose("Retreat into the woods and observe from afar.", [
        narrator.say(`${name} hides among the trees, watching the stranger.`, {
          fontSize: 28,
        }),
        hero.say("Something about them feels... off.", { fontSize: 28 }),
        stranger.say("Cowardice can be wise — for a time.", { fontSize: 28 }),
        narrator.say("The stranger disappears into the mist.", {
          fontSize: 28,
        }),
        heroImg.hide({ duration: 600 }),
        strangerImg.hide({ duration: 600 }),
        scene_intro.jumpTo(scene_hide),
      ]),
  ]);

  story.entry(scene_intro);
  return story;
}
