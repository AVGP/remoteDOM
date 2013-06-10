#RemoteDOM

## What's this?

Similarly to how the Shadow DOM paved the way for custom elements using web technologies, a "Remote DOM" could allow display of portions of the web app to be displayed on "remote" (i.e. "external") devices, such as screens, Smart TVs, etc. 

This brings interesting capabilities to web apps, such as leveraging external screens for presentation, supplemental content or second screen experiences.

## Polyfill demo
The code in this repository allows to demo a simple example of a RemoteDOM.
To try this out, start a simple webserver, e.g. with

    $ python -m SimpleHTTPServer
from the root directory of this repository.

Then visit ```display.html``` on that server to get your Display-ID.
On another device, visit the ```index.html``` on the webserver, enter the Display-ID in the popup and see the result.

Clicking the button will add an image to the secondary display page.

## Support the W3 group proposal
Get a (free!) W3 account and support the [proposed RemoteDOM group @ W3C](http://www.w3.org/community/groups/proposed/#remotedom)

## Caveats of the polyfill
Right now the polyfill has two drawbacks:

1. It uses Peer.js and its public peer broker server to connect the two peers.
2. It sends the full ```innerHTML``` property of the remoteDOM container on DOM mutations, because DOM nodes can't be easily converted into JSON yet.

