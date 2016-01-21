###BartNow!

##A BART web application that serves up trip information faster than going to bart.gov without needing to download an app

#About
BartNow is a responsive, single page application that sends XMLHttpRequests to the official BART API. It grabs origin and destination points from the user and then sends a QuickPlanner query to BART's official API. Trip information then gets parsed and displayed in real time.

JavaScript cookie strings are also saved and parsed to remember a user's commute information. When a user returns to the website, their commute choices are saved and can be reversed with a single button.
