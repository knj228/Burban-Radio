The content below is an example project proposal / requirements document. Replace the text below the lines marked "__TODO__" with details specific to your project. Remove the "TODO" lines.

# Internet Radio  

## Overview



I really love music, have since I was little and my love has only gotten stronger since I grew older. Because of my passion for music, I think it would be really cool to program a internet radio station. I have many playlists that I make for myself or for certain occasions and I think that if I shared those playlists by broadcasting them online that people may take interest. I also have been interested in possibly starting a podcast and if I made my own internet radio station, I would have a medium to do that. The radio station would at first have a schedule that would run from 10 am to 3 am and could possibly become 24 hrs. I also create music myself and have friends who are musical artists so this could be a good tool to use to promote our art.


## Data Model



The application will store Users, broadcast Program object and Links to audio

* users will log into the site be able to listen to a real time audio stream
* The stream will be based off of a list of songs which will be links to youtube accessing just the audio and not video,
*The links will be links to audio either uploaded to youtube or uploaded to the server itself(have not decided where I should store the data yet)


An Example User:

```javascript
{
  username: "MusicLover23",
  hash: // a password hash,
  Favorites: Favorite songs that the user bookmarked while they were listening
}
```

An Example broadcast block with Embedded Characteristics:

```javascript
{
  name: "Morning Rise ",
  timeToStart : 10:00 am
  timeToEnd : 12:00 pm
  Songs: [
    { id = 1 , name: "Livvin", artist: "NxWorries", length: 2:45, block = "Morning Rise", played = false},
  ],
}
```


## [Link to Commented First Draft Schema](db.js)

https://github.com/nyu-csci-ua-0480-007-fall-2017/knj228-final-project/blob/master/db.js

## Wireframes
https://app.moqups.com/spatium23/u6BvtLEUTv/view

/radio/login - page for logging in or creating a account

/radio/create - page for creating an account

/radio/specialRadio - page for a specialized radio station

/radio - page for listening to radio

/contact - page for explaining the radio station


/user/favorites - page for user song favorites

/user/ - home page for user

/radio/schedule - page for seeing the radio station schedule

/user/createplaylist - page for adding a new playlist to be played



## Site map

https://creately.com/diagram/j9iyopea1/WI3dREWYDUWyMuN6NgvF7IlsJSM%3D


## User Stories

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can listen to the radio station
4. as a user, I can create a favorite list of my favorite songs I heard on the radio

## Research Topics

* (5 points) Integrate user authentication
    * Using passport for user authentication
    * email the password
* (4 points) Perform client side form validation using a JavaScript library
    * Used for Account Creation and Playlist making
*  (2 points) Use a CSS framework throughout your site, use a reasonable of customization of the framework
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points
*  (5 points) - Per external API used, Icecast: http://icecast.org/download/
        * Used for Live Streaming
*  (6 points) - Use an external JavaScript library, Angular: https://angularjs.org/
        * Using angular to cut down the amount of pages needed
        * For built in search feature
        * For Animations
*  (5 points) - Use an external JavaScript library, Howler: https://howlerjs.com/
        * Manage Audio Library  
        * Uses Simple HTML5 audio



10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js)

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs)
