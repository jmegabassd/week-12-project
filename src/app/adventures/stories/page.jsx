//
import { Story, Scene, Character } from "narraleaf-react";

//
export function storyWithCharacter(activeCharacter) {
  const { name, race, class: charClass, avatar, background } = activeCharacter;

  // Create story and scene
  const story = new Story(`${name}'s First Adventure`);
  const scene1 = new Scene("The Beginning", {
    background: {
      src: "",
    },
  });

  // Define character
  const hero = new Character(name, {
    avatar: { src: avatar || "/pictures/default-avatar.png" },
  });

  const narrator = new Character("Narrator");

  // Dialogue
  scene1.action([
    narrator.say(`Our story begins with ${name}, the ${race} ${charClass}.`),
    hero.say(`I've been waiting for this moment.`),
    narrator.say("The air is thick with magic and possibility..."),
    hero.say(`Time to see what fate has in store for me.`),
  ]);

  // Add the scene to the story
  story.entry(scene1);

  return story;
}
