Welcome to Turn Tracker!

This application is a work in progress.

I am currently working on adding a function that allows a selected campaign to only to display the player characters and non player characters that are associated with the selected campaign to be displayed and edited.

To run this application:

--Back-end server--

First, after cloning to your machine, you will want to run <$ npm install> (This makes sure that all of the dependencies for the app are available on your machine).

Second, run <$ pipenv install && pipenv shell> (This installs the files needed to run the backend server ). Then cd into the server folder <$ cd server>.

Third, from the server folder, run <$ python app.py> (this will start the back-end server).

--Front-end server--

First, you will need open a second terminal and navigate to the app location.
Second, cd into the client folder <$ cd client>.
Third, from the client folder, run <$ npm start> (this will start the front-end server and open the application in a web page).

From here you will have to sign up/login to get into the app.

The Home tab is a little about the app and where you create a new Campaign as well as select from an existing campaign.

The PC tab is where you can add new player characters to the tracker, as well as edit the names of existing characters.

The NPC tab is where you can add new non player characters to the tracker, as well as edit the names of existing characters.

The TurnTracker tab is the heart of the application. This is where you add in the initiative(a number generated from a dice roll along with any modifiers) that was rolled for each character into the initiative column input box.

You are also allowed to delete any characters from the list that may not be participating in this encounter, be it combat or a simple conversation(upon refreshing the page, any deleted characters are repopulated).

Once the initiative numbers are entered, click the Start Combat button and it will set the characters with their initiative in a descending order list with a highlight on the current character.

Clicking the Next Character button will move the highlight to the next character to take their turn.
    Once the highlight reaches the bottom of the list, clicking Next Character will return it to the top and all for the encounter to continue without interruption.

Clicking the End Combat button will return you to the screen where you entered the initiative numbers and the characters in that encounter, to start with.

Refreshing the page will repopulate the entire list of characters that are in the campaign.

--Other Notes--

This application is currently running node version 16.19.1.
I will be looking into updating it in the future.

Current version v1.0.1

Thank you for taking your time to give this a look!