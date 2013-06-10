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
    
    self.connectDisplay = function(displayId) {
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