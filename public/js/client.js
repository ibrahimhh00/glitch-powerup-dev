/* global TrelloPowerUp */

var GREY_ROCKET_ICON =
  "https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717";
var WHITE_ROCKET_ICON =
  "https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182";
var BLACK_ROCKET_ICON =
  "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421";

var BACKEND_ICON =
  "https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fworksheet-number-monochrome-b-classroom.jpg?v=1616731943091";
// var FRONTEND_ICONn
var ROCKET_ICON =
  "https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fc69415fd-f70e-4e03-b43b-98b8960cd616_white-rocket-ship.png?v=1616729876518";

var DISRUPTEM_ICON1 = "https://cdn.glitch.com/bcb67d52-05a1-4b6e-a315-f5bae36b69eb%2FIcon-Color%403x.png?v=1625811265010"
var DISRUPTEM_ICON2 = "https://cdn.glitch.com/bcb67d52-05a1-4b6e-a315-f5bae36b69eb%2F1.png?v=1625811412559"
var DISRUPTEM_ICON3 = "https://cdn.glitch.com/bcb67d52-05a1-4b6e-a315-f5bae36b69eb%2Fdisruptem-Icon_White.png?v=1625811831046"

var onBtnClick = function(t, opts) {
  // console.log('Someone clicked the button');
  var cardEstimateArr = new Array();
  var obj2 = [];

  // t.cards return a set of values,
  //values are in object of nested array,
  //values of outer array assign to tempArray
  //then values of inner array assigned to an array of card IDs as keys
  return t.cards("id", "idList", "name").then(function(cards) {
    //cardID array created with all IDs in on the board
    // var tempArray = Object.values(cards);
    console.log("Cards values :", cards);

    var listEstimateArr = [];
    var backendEstimate = 0;
    var result = [];

    var promises = [];
    var cArr = [];

    cards.map(
      key =>
        promises.push(
          t.get(key.id, "shared").then(function(data) {
            listEstimateArr.push({
              idList: key.idList,
              backendEstimate: data.backend_estimate
                ? data.backend_estimate
                : 0,
              frontendEstimate: data.frontend_estimate
                ? data.frontend_estimate
                : 0
            });
            // });
          })
        )
      // .then(() =>console.log("listEstimateArr: ", listEstimateArr))
    );

    //Pass listEstimateArr to promise caller, merge idList that are equal and sum the their backendEstimate values
    Promise.all(promises, t).then(() => {
      var holder = {}; // holds the merged lists of backend_estimate
      var holder2 = {}; // holds the merged lists of frontend_estimate

      console.log("listEstimateArr...2:", listEstimateArr);
      // Combine same idList and add their values
      listEstimateArr.forEach(function(d) {
        if (holder.hasOwnProperty(d.idList)) {
          holder[d.idList] =
            holder[d.idList] +
            (parseFloat(d.backendEstimate) ? parseFloat(d.backendEstimate) : 0);

          holder2[d.idList] =
            holder2[d.idList] +
            (parseFloat(d.frontendEstimate)
              ? parseFloat(d.frontendEstimate)
              : 0);
        } else {
          holder[d.idList] = parseFloat(d.backendEstimate)
            ? parseFloat(d.backendEstimate)
            : 0;
          holder2[d.idList] = parseFloat(d.frontendEstimate)
            ? parseFloat(d.frontendEstimate)
            : 0;
        }
      });


      console.log("listEstimateArr...3:", listEstimateArr);

      console.log("holder: ", holder);
      console.log("holder2: ", holder2);

      return t.lists("id", "name").then(function(lists) {
        //retrieve list name from list id
        lists.map(key => {
          for (var prop in holder) {
            console.log("holder[prop]: ", holder[prop]);
            if (key.id == prop) {
              console.log("holder2[prop]: ", holder2[prop]);
              obj2.push({
                nameList: key.name,
                value: holder[prop],
                value2: holder2[prop]
              });
            }
          }
        });
        console.log("obj2:", obj2);
        // t.set('board', 'shared','obj2size', obj2);
        return t.boardBar({
          title: "Calculated Points",
          url: "./results.html",
          args: { message: obj2 }
        });
      });
    });
  });
};


window.TrelloPowerUp.initialize({
  "board-buttons": function(t, opts) {
    
    console.log(opts);
    
    return [
      {
        // we can either provide a button that has a callback function
        icon: {
          dark: DISRUPTEM_ICON3,
          light: DISRUPTEM_ICON3
        },
        text: "Disrupt'em",
        condition: "always",
        callback: function(t) {
          return onBtnClick(t);
        }
      }
    ];
  },

  "card-buttons": function(t, options) {
    return [
      {
        icon:
          "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421",
        text: "Estimate Size",
        callback: function(t) {
          return t.popup({
            title: "Estimation",
            url: "estimate.html"
          });
        }
      }
    ];
  },

  //   didn't need it
  // 1. use t.set(board, shared, estimate-ListID_cardID,value) instead of t.set(card,shared,key)
  // 2. use t.get(board, shared ) to get all listIDs on the board-button level
  // 3. add all values for each estimate-listID_ match
  // 4. display the added value for each list with list name and value addition
  "card-badges": function(t, options) {
    // return t.get('card', 'shared', 'backend_estimate')
    return t.getAll().then(function(estimates) {
      
      console.log(estimates);
      
      var backend_estimate =   estimates["card"]["shared"]["backend_estimate"];
      var frontend_estimate =   estimates["card"]["shared"]["frontend_estimate"];

      return [
        {
          // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
          icon:
            backend_estimate == null || backend_estimate == 0
              ? null
              : BLACK_ROCKET_ICON,
          text:
            backend_estimate == null || backend_estimate == 0
              ? null
              : "B: " + backend_estimate,
          color:
            backend_estimate == null || backend_estimate == 0 ? null : "blue"
        },
        {
          // icon: 'https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717',
          icon:
            frontend_estimate == null || frontend_estimate == 0
              ? null
              : BLACK_ROCKET_ICON,
          text:
            frontend_estimate == null || frontend_estimate == 0
              ? null
              : "F: " + frontend_estimate,
          color:
            frontend_estimate == null || frontend_estimate == 0
              ? null
              : "orange"
        }
      ];
    });
  },

  "card-detail-badges": function(t, options) {
    // return t.get('card', 'shared', 'backend_estimate')
    return t.getAll().then(function(estimates) {
      var backend_estimate = estimates["card"]["shared"]["backend_estimate"];
      var frontend_estimate = estimates["card"]["shared"]["frontend_estimate"];
      return [
        {
          title: "Backend Estimate",
          color:
            backend_estimate == null || backend_estimate == 0 ? null : "blue",
          text:
            backend_estimate == null || backend_estimate == 0
              ? null
              : backend_estimate,
          callback: function(t) {
            return t.popup({
              title: "Backend Estimation",
              url: "estimate.html"
            });
          }
        },
        {
          title: "Frontend Estimate",
          color:
            frontend_estimate == null || frontend_estimate == 0
              ? null
              : "orange",
          text:
            frontend_estimate == null || frontend_estimate == 0
              ? null
              : frontend_estimate,
          callback: function(t) {
            return t.popup({
              title: "Frontend Estimation",
              url: "estimate.html"
            });
          }
        }
      ];
    });
  }
});
