The main changes centre around breaking the main `game.js` file into several files. This massively helps with readability as it's really difficult to follow a single huge file of JS which is hundreds of lines long. As we group similar functionality into various files, it's much easier to see what's going on and you can know that, if you have a bug in the timers, you can go to `timers.js` to find it. 

A point to note here is, how do we get access to the code in `timers.js` in the main file `game.js`? For the time being, I've simply imported the helper files above `games.js` in `index.html`. This will ensure they are loaded before the main file executes them. However this is not best practice and you will not see this used in many cases. You will learn about ES Modules and how to import code from other JS files and directories in the future. 

I have made a few suggestions to your code also. Generally, it was really good, I'd be stoked if this was my first JS project! I've prefaced my comments with my initials `POS` so you can see which comments come from me, I've included explanations on why I've suggested updates in each comment.

You may want to compare the origin code versus what's in this repo as I've already made updates to this code. 

I hope this is helpful in some way, just shout if you have any questions