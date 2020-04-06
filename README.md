DOCHAT
====

# Business need

The main goal is to create a simple chat app where users can communicate with eachother. 


# Features

- The user shall be able to:
  - View chats in an initial overview page which gives a better UX than just just accessing the chat room on first load
  - Clicking on the list of chat(s) will open up the chat interface itself
  - To chat between two users, open a new tab and launch the app. Go to settings chnage the username for the other tab and go back to the chat page to send messages between users.
  - You can type in smileys like ;) :) :( and they'll show up in the chat interface.
  - The app also parses your links inclusing those for images with the png/jpg file formats and Youtube videos
  - When a message comes in while the user is on the settings page, the notification will start blinking on the chat navigation tab or pill
  - You can change the settings of the app including the theme (light and dark), display on chat messages (12hour or 24hour), sending messages using Ctrl+Enter (i omitted this functionality from chat page the mobile version because users don't have access to Ctrl key on their mobile phones). You can also chnage the app's language between English and Luxembourgish.
  - You can reset all settings to default.
  - All state was managed using Redux.

### Extra features

- The chat overview interface including a unique UI for both mobile and desktop versions of the app

Things omitted
----

- Unread messages count

FAQ
----

### How do I start the app?

Start with `npm i`. It will install all dependencies for the app to run smoothly.

Run `npm run api`to start small JSON server that stores chat room information and backs up messages

Open another terminal tab and run `npm run dev` to start the development version of the app on the front end. It'll launch the DoChat app at port 1234 in the browser.

Open a new terminal, navigate into the server folder using `cd server`on Mac/Linux. Run `npm start` to start the server.

Also run from your command line `npm run dev`. It'll launch the FreightHub web app at port 1234.

### What libraries/frameworks, packages, tools did I use?

This app was built using React, TypeScript, SASS, Socket.io, Redux and bundled with Parcel

### How do I run the tests

Run `npm test`. It will display all tests and results.

To show test coverage, run `npm test -- --coverage --watchAll`. It will show current code coverage

### Additional information

I named it DoChat after Docler and used a shade of red as the primary color in the light mode based on the companies colors. Hope you like it

### Screenshots
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/chat-overview-web.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/dark-mode-chat-overview.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/mobile-home.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/mobile-chat.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/mobile-settings.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/settings-language-web.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/settings-language-web.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/mobile-settings-dark.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/mobile-chat-dark.png)
![screenshot](https://github.com/thepseudomind/dochat/blob/master/screenshots/chatting-dark-web.png)

