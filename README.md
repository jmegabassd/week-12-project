Project name: No Name RPG
Vercel link: [week-12-project-iota.vercel.app] (week-12-project-iota.vercel.app)
Repo link: [https://github.com/jmegabassd/week-12-project ](https://github.com/jmegabassd/week-12-project)

Team members:
Richard Thornton
Joseph Davies
Flavia Shehu
Dare

Project description:
A Text based Adventure website where you can make characters and play a text adventure with them.

Problem domain:
People are inundated with an overwhelming amount of choice when it comes to modern games our, site provides a place to slow down and relax in a text adventure with a character that they have created

User stories:

- I want to be able to make my own character
- I want to be able to comment on my character and make notes
- I want to be able to go on a text adventure
- I want to be able to make a user profile page
- I want be able to view a list of my characters
- I want to see my active character
- I want to know how to play the game

Wireframe:

A list of any libraries, frameworks, or packages that your application requires in order to properly function:
Express.js, pg, cors...

Instructions on how to run your app:
this is a list of the packages we used through out our project
npm install narraleaf-react
npm install @clerk/nextjs
npm i pg
npm i dotenv
npm install @clerk/themes
npm i motion@11

after you have set up your next app and installed the packages listed above we then followed the doccumentation for narraleaf which allowed us to create our app.

# Supabase Clerk Synconise details setup

> navigate to edge functions in Supabase project overview
>
> deploy a new function - Via Editor
>
> delete boilerplate code and add lib/edgeFunction.sql

> Give the function a name i.e.
> Function Name: clerk-webhook
> Add the clerk webhook secret to Edge Function secrets in Supabase
> CLERK_WEBHOOK_SECRET=<clerk webhook Signing Secret> (found in clerk endpoint once created)

On the user side you are presented with the home page with a create characters and adventures page you will be prompted to make an account after you have made you account you will then be prompted to make a character and to set them as active, after you have set them as active you can now navigate to the adventures page and select an adventure to go on with the active character.

Lighthouse report:

Reflections:

Please mention the requirements you met and which goals you achieved for this assignment.
For this project we believe that we hit the requirements for this poject such as having authentication implemented with clerk that allows the user to sign-up an sing in doing so give them access to the create character form which let them create a new character which will redirect them to the users profile page which will display the users details and the characters that they have created, this page also gives them access to delete a character and to be able to edit the user profile.

to create this app we used the next react frame work and then used the narraleaf npm package to to allow us to create the visual novel aspect of your app.
we created a database using supabase which allowed us to store the charaters the user makes as well as their unique user id from clerk which is how we enusred that the users characters where linked to their specific account.

throughout our app we used a mixture of css and tailwind to style our app and to ensure it has a unique look that fits the theme and colour scheme we decided on, doing this helped to improve our over all Ui, we then added a use state to our home page to add a light and dark mode which we were not able to full implement across our site.
we created a dynamic route for our users page which shows the specific users infomation that is logged in and also shows their username in the url.

we used responsive design techniques such as grid and flex and @media queries to allow for the user to be on a wide range of screens and mobile. how ever for the game aspect of our app we ran into an error where the page will not adapt correctly to a smaller phone screen size which seems to be an issue with the narraleaf package and the documentation not being fully up to date.

we intened to return to this and contribute to the narraleaf repo to help improve the doccumentation . We did also find the narraleaf page also suffered from the same issue we encountered

thankfully the planning we made for this project help to guide our work and to help us prioritise what tasks we needed to do for our project.

due to multiple people working on the code at once we had one merge conflict but we managed to resovle this issue with the help of Bertie and where able to quickly move on to the rest of our project.

What went really well and what could have gone better?
Rich:
I feel that overall the group worked well together we all managed to contribute and have being able to produce a good app that I am glad to have made while learning a new package such as narraleaf was difficult and presented a lot of challanges it has goven me a better understanding of next.js and I intend to return to this project and try to further develop it

Detailing useful external sources that helped you complete the assignment (e.g Youtube tutorials).
Describing errors or bugs you encountered while completing your assignment.

References:
Third-party APIs, CSS resets, icons, images...
https://react.narraleaf.com/

https://clerk.com/

https://medium.com/@ismailghallou/how-to-add-dark-mode-easily-with-a-custom-react-hook-5791d96ae9f

https://www.linkedin.com/pulse/light-dark-mode-react-app-oleabhiele-daniel-donald/

https://react.narraleaf.com/documentation/core/animation/transform.en-US#scale

https://react.narraleaf.com/documentation/core/game/live-game.en-US#onwindowevent

https://clerk.com/blog/sync-clerk-user-data-to-supabase
