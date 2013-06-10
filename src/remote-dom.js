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