# NewYorkSnowData

ReadMe:
npm packages used - axios

This is a javascript class that interacts with a web api.  
The class contains a cache to prevent repeat api calls.
Within the class, methods are added to get desired data from the api.
Currently, there is only one method - One which extracts snowfall data
for the city of New York over a two year period.

By using a class, we can cache results without global variables and we
can have methods to return the desired information with ease.  

I have also separated the code into modules so that the user can interact solely with
the runScript in order to make calls to the api without any undesired
changes to the class which is coded to make the actual api calls and log information.

Within the api script, you will see that errors are handled and custom messages
are sent along with the actual error message that is returned.  I have also
left in additional error logging options that can be uncommented for more information
should the need arise.

Code in the api method logs information:
-For every day in which it snowed in NY.
-For Total Days Returned by the api.
-For Total Number of Days on Which it Snowed.
-For Average Snowfall on Snow Days.
-And for Maximum Snow Received on a Single Day.

In order to run script:
First clone repo.
Run 'npm i' to install dependencies (axios).
Then run 'node runScript.js'

Results should then be logged to the console.

With more time, I would have liked to add unit testing via Mocha / Chai or Jest.
I would also have liked to implement React and provide a clean UI experience to display
the returned information.
