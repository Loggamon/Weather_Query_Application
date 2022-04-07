# Weather_Query_Application

For this assignment, we have been tasked with creating a website (browser?) that displays the current weather/the forcast for the next five days, at the desired city the user chooses

## Day One

Today, I figured the first step would be just to set up the HTML and CSS files that I'll be working with. Since the first of my two HTML's are pretty plain, it would make a good jumping-off point to start!

## Day Two

Today I've been working on the fetching aspect of the page. It was a little confusing, but i was able to make it so that:

    --Through one API (Geocoding via openweathermap.org), I was able to get a set of coordinates via city input.
    --I then take those values and run them through another openwethermap.org API (One Call API), which then spits out all of the weather data.

Now, I need to figure out a way to append this information to my webpage, as well as save some weather info for persistent data...

## Day Three

I've been working on the page that the user will be redirected to after submitting the weather query. After coming up with a mock-display (so i can fine-tune my stylesheet), I now know that console logs do not persist after document redirect. That means tomorrow I will be focusing on setting up a local storage that houses objects with all the necessary data.

## Day Four

After a couple days of trouble, i was able to display all of my necessary weather-data in my cards, and it updates them automatically when i search another city in the query-box. Unfortunately, I was unable to implement the search-history option in my browser; I will have to return at a later date and try to add one retroactively. I also had to axe my other HTML page; as the transition between the two was negating the display of weather-data.

Overall, I think the page turned out pretty well, for what i managed to include in the span of time i had.

Screenshot located in(./assets/Untitled-(2).png)
