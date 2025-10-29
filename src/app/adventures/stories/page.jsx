"use client";

import { Story, Scene, Character, Menu, Image, FadeIn } from "narraleaf-react";

export function storyWithCharacter(activeCharacter) {
  const { name, race, class: charClass, avatar } = activeCharacter;

  // 🎭 Create story
  const story = new Story(`${name}'s First Adventure`);

  // 🏞️ Scenes
  const scene_intro = new Scene("The Beginning", { background: { src: "" } });
  const scene_confront = new Scene("The Confrontation", {
    background: { src: "" },
  });
  const scene_hide = new Scene("The Watcher", { background: { src: "" } });

  // 👤 Characters
  const hero = new Character(name);
  const stranger = new Character("Mysterious Stranger");
  const narrator = new Character("Narrator");

  // 🖼️ Images
  const heroImg = new Image({
    src: avatar || "/pictures/default-avatar.png",
    zoom: 0.5,
    position: { xalign: 0.2, yalign: 0.3 },
  });
  const strangerImg = new Image({
    src: "",
    zoom: 0.5,
    position: { xalign: 0.8, yalign: 0.3 },
  });

  // 🌅 Intro Scene
  scene_intro.action([
    narrator.say(`Our story begins with ${name}, the ${race} ${charClass}.`),
    heroImg.show(new FadeIn(800)),
    narrator.say("A gentle breeze rustles through the ancient forest..."),
    hero.say("It feels like something is calling to me."),
    strangerImg.show(new FadeIn(800)),
    narrator.say("Suddenly, a figure emerges from the mist."),
    stranger.say("Traveler... you shouldn’t be here."),
    hero.say("Who are you? And how do you know my name?"),
    stranger.say("That doesn’t matter now. What matters is your choice..."),
    Menu.prompt("What will you do?")
      .choose("Step forward and confront the stranger.", [
        hero.say("I don’t back down from a challenge."),
        stranger.say("Brave words... let’s see if your courage matches them."),
        narrator.say(
          `${name} steps forward, ready to face whatever comes next.`
        ),
        heroImg.hide({ duration: 600 }),
        strangerImg.hide({ duration: 600 }),
        scene_intro.jumpTo(scene_confront),
      ])
      .choose("Retreat into the woods and observe from afar.", [
        narrator.say(`${name} hides among the trees, watching the stranger.`),
        hero.say("Something about them feels... off."),
        stranger.say("Cowardice can be wise — for a time."),
        narrator.say("The stranger disappears into the mist."),
        heroImg.hide({ duration: 600 }),
        strangerImg.hide({ duration: 600 }),
        scene_intro.jumpTo(scene_hide),
      ]),
  ]);

  // ⚔️ Confrontation Scene
  scene_confront.action([
    heroImg.show(new FadeIn(600)),
    strangerImg.show(new FadeIn(600)),
    narrator.say("The clearing opens under a pale moon."),
    hero.say("This ends now."),
    stranger.say("You may not like how it ends."),
    narrator.say(`${name} braces for what’s to come...`),
    heroImg.hide({ duration: 400 }),
    strangerImg.hide({ duration: 400 }),
  ]);

  // 🌲 Watcher Scene
  scene_hide.action([
    heroImg.show(new FadeIn(600)),
    narrator.say("You remain hidden as silence falls over the forest."),
    hero.say("They vanished... but I’ll find them again."),
    narrator.say(
      "The forest holds many secrets, and tonight it has claimed one more."
    ),
    heroImg.hide({ duration: 400 }),
  ]);

  story.entry(scene_intro);

  return story;
}
