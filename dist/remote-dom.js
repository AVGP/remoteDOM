;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
var token = require('token.js');

window.remoteDOM = (function() {
    var peerId = token(4);
    var peer = new Peer(peerId, {key: 'bn1hhst9slymbo6r'});
    var self = {};
    
    self.createDisplay = function(container) {
        peer.on('connection', function(client) {
            client.on('data', function(data) {
                console.log("GOT DATA", data);
                if(data.type && data.type === "initContent") {
                    container.innerHTML = data.content;
                } else {
                    var e = new DOMNodeInserted();
                    e.target = data;
                    container.dispatchEvent(e);
                }
            });
        });
    };
    
    var launchOnChromecast = function(receiver) {
    //AppID f5839d2f-c2c5-46c9-9b5e-f2e1fe6a1ebd
      var request = new cast.LaunchRequest("f5839d2f-c2c5-46c9-9b5e-f2e1fe6a1ebd", receiver);
      request.description = new cast.LaunchDescription();
      request.description.text = "RemoteDOM Display!";
      cast_api.launch(request, function(activity) {
        var remoteDOMElement = document.querySelector("[data-screen]");
        cast_api.sendMessage(activity.activityId, "remotedom", remoteDOMElement.innerHTML);
        var observer = new MutationObserver(function(mutations) {
            //Missing a way of converting DOM nodes to JSON right now :(
            cast_api.sendMessage(activity.activityId, "remotedom", remoteDOMElement.innerHTML);
        });    
        observer.observe(remoteDOMElement, {attributes: true, childList: true, characterData: true});        
          
      });
    };
    
    var initializeChromecast = function() {
        console.log("Initializing Chromecast API...");        
        cast_api = new cast.Api();
        window.cast_api = cast_api;
        cast_api.addReceiverListener("f5839d2f-c2c5-46c9-9b5e-f2e1fe6a1ebd", function(list) {
          launchOnChromecast(list[0]);
        });    
    };
    
    
    self.connectChromecastDisplay = function() {
        if (window.cast && window.cast.isAvailable) {
            // Cast is known to be available
            initializeChromecast();
        } else {
          // Wait for API to post a message to us
          window.addEventListener("message", function(event) {
            if (event.source == window && event.data && 
                event.data.source == "CastApi" &&
                event.data.event == "Hello")
              initializeChromecast();
          });
        }
        
    };
    
    self.connectDisplay = function(displayId) {
        console.log(displayId, displayId === '', displayId == false);
        if((!displayId) || displayId === '') {
          self.connectChromecastDisplay();
          return;
        }
        
        var connection = peer.connect(displayId);
        var remoteDOMElement = document.querySelector("[data-screen]");
        connection.on('open', function() {
            connection.send({
                type: "initContent",
                content: remoteDOMElement.innerHTML
            });
            
            var observer = new MutationObserver(function(mutations) {
                //Missing a way of converting DOM nodes to JSON right now :(
                connection.send({type: "initContent", content: remoteDOMElement.innerHTML});
            });    
            observer.observe(remoteDOMElement, {attributes: true, childList: true, characterData: true});        
        });
    };
    
    self.getId = function() {
        return peerId;
    };
    
    return self;
})();
},{"token.js":2}],2:[function(require,module,exports){
function token(n){
  var salt = 'abcdefghijklmnopqrstuvwxyz0123456789', key = '', len = n || 6, length = salt.length, i = 0;
  if (length < len) {
    while(salt.length < len) {
      salt += salt;
    }
    length = salt.length;
  }
  for (; i<len; key+=salt.charAt(Math.floor(Math.random()*length)), i++);
  return key;
}

if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = token;
  }
  exports.token = token;
} else {
  this.token = token;
}
},{}]},{},[1])
;