# Description
Utility to make HTTP requests at set intervals, with the option to simulate a browser in cases when the DOM is dynamically manipulated with JavaScript following initial load.  Can be used to keep your application/PaaS instance awake, and in a variety of testing cases involving regular requests to your server.


# Instructions
1.  Install Node
2.  Edit the fields in **config.json**
3.  Open **run.bat**

*Note that all values should be in quotes*


# Field descriptions:
* SimulateBrowser: Set to true if the target site requires DOM content to be dynamically loaded via JavaScript.  In these cases, a standard HTTP request wouldn't cause a "full" load of the page.

* TargetAddress: The target URL you would like to send requests to

* RequestFrequency:  Amount of time (in minutes) between requests





