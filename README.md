#RemoteDOM

## What's this?

Similarly to how the Shadow DOM paved the way for custom elements using web technologies, a "Remote DOM" could allow display of portions of the web app to be displayed on "remote" (i.e. "external") devices, such as screens, Smart TVs, etc. 

This brings interesting capabilities to web apps, such as leveraging external screens for presentation, supplemental content or second screen experiences.

## Polyfill demo
The code in this repository allows to demo a simple example of a RemoteDOM.
### Install dependencies & requirements
To run the demo, you need to have node.js (at least version 0.8) and npm installed.
Please also install [Grunt.js](http://gruntjs.com).
Run

    $ npm install
to fetch all other dependencies.

**As of June 2013**: To run the demo on a mobile device, make sure you use the Chrome BETA and enable WebRTC.

To run the examples, start a static webserver with

    $ grunt server

Then visit [http://localhost:3000/display.html](http://localhost:3000/display.html) to get a Display-ID.

On another device, visit [http://localhost:3000/index.html](http://localhost:3000/index.html), enter the Display-ID in the popup and see the result.

Clicking the button will add an image to the secondary display page.

## Okay, so what can I do with that?
It's a very basic proof of concept for a RemoteDOM implementation.
You basically add some DOM node into your HTML, like this:

    <div data-screen="remote"></div>
and everything that goes in there (even dynamically created content) gets transferred to the "remote" display but is hidden for the browser displaying this document.
To initialize the remoteDOM-polyfill, call

    remoteDOM.connectDisplay(window.prompt(displayID);
where the ```displayID``` is the ID you get from a call to

    remoteDOM.getId();
and finally, you can create a display with

    remoteDOM.createDisplay(someDOMElement);
where ```someDOMElement``` is some DOM node that will contain the remoteDOM stuff it receives.

You'll need a display document as well to make use of this, you can use the ```display.html``` as a very basic example how such a "display" document could look like.

## Okay, but how would a proper implementation look like in the (near) future?
Well, if this stuff becomes a standard, display devices (think: Apple TVs, Smart TVs, Beamers, …) could provide such a display document for you (or some other means to get your DOM content on them) and browsers could provide display discovery services, so that you can select available displays in your network and "beam" content there.


## Support the W3 group proposal
Get a (free!) W3 account and support the [proposed RemoteDOM group @ W3C](http://www.w3.org/community/groups/proposed/#remotedom)

## Caveats of the polyfill
Right now the polyfill has two drawbacks:

1. It uses Peer.js and its public peer broker server to connect the two peers.
2. It sends the full ```innerHTML``` property of the remoteDOM container on DOM mutations, because DOM nodes can't be easily converted into JSON yet.

