/* global TrelloPowerUp */

var GREY_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717';
var WHITE_ROCKET_ICON = 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182';


var Promise = TrelloPowerUp.Promise;

var BLACK_ROCKET_ICON = 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421';

// TrelloPowerUp.initialize({
  // Start adding handlers for your capabilities here!
	// 'card-buttons': function(t, options) {
	// return t.set("member", "shared", "hello", "world")
	// .then(function(){
	// 	  return [{
	// icon: BLACK_ROCKET_ICON,
	// 		  text: 'Estimate Size',
	//       callback: function(t) {
	//         return t.popup({
	//           title: "Estimation",
	//           url: 'estimate.html',
	//         });
	//       }
	// 	  }];
	// })
	// },
// });

window.TrelloPowerUp.initialize({
  // "card-badges": function (t, opts) {
  //   let cardAttachments = opts.attachments; // Trello passes you the attachments on the card
  //   return t
  //     .card("name")
  //     .get("name")
  //     .then(function (cardName) {
  //       console.log("We just loaded the card name for fun: " + cardName);
  //       return [
  //         {
  //           // Dynamic badges can have their function rerun
  //           // after a set number of seconds defined by refresh.
  //           // Minimum of 10 seconds.
  //           dynamic: function () {
  //             // we could also return a Promise that resolves to
  //             // this as well if we needed to do something async first
  //             return {
  //               text: "Dynamic " + (Math.random() * 100).toFixed(0).toString(),
  //               icon: "./images/icon.svg",
  //               color: "green",
  //               refresh: 10, // in seconds
  //             };
  //           },
  //         },
  //         {
  //           // It's best to use static badges unless you need your
  //           // badges to refresh.
  //           // You can mix and match between static and dynamic
  //           text: "Static",
  //           // icon: HYPERDEV_ICON, // for card front badges only
  //           color: null,
  //         },
  //       ];
  //     });
  // },
  
  'card-buttons': function(t, options){
    return [{
      icon: 'https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421',
      text: 'Estimate Size',
      callback: function(t){
        return t.popup({
          title: "Estimation",
          url: 'estimate.html'
        });
      }
    }];
  },
  
  'card-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
    return [{
      // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
      icon: estimate ? GREY_ROCKET_ICON : null,
      text: estimate,
      color: estimate ? "blue" : null,
    }];
});
  },
  
  'card-detail-badges': function(t, options) {
    return t.get('card', 'shared', 'estimate')
    .then(function(estimate) {
    return [{
      title: 'Estimate',
      color: estimate ? "blue" : null,
      text: estimate,
      callback: function(t) {
        return t.popup({
          title: "Estimation",
          url: 'estimate.html',
             });
      }
    }]
  });
  }

});

