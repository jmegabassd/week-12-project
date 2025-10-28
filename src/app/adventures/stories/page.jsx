import { Story, Scene, Character } from "narraleaf-react";

// Create a story
const story1 = new Story("Story 1");
const scene1 = new Scene("Scene 1", {
  background: {
    src: "/pictures/park-background.png",
  },
});

// define your characters
const character1 = new Character("Character 1");
const character2 = new Character("Character 2");

// add actions to the scene
scene1.action([
  character1
    .say("Hello World!")
    .say("Welcome to NarraLeaf!")
    .say("This is a Visual Novel framework for React.")
    .say("I hope you enjoy it!"),

  character2
    .say("Start your story by editing this file.")
    .say("We have a lot of features for you."),
]);

// add the scene to the story
story1.entry(scene1);

export { story1 };
