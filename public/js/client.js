/* global TrelloPowerUp */

var GREY_ROCKET_ICON =
  "https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Frocket-ship-grey.png?1496162964717";
var WHITE_ROCKET_ICON =
  "https://cdn.glitch.com/c69415fd-f70e-4e03-b43b-98b8960cd616%2Fwhite-rocket-ship.png?1495811896182";
var BLACK_ROCKET_ICON =
  "https://cdn.glitch.com/1b42d7fe-bda8-4af8-a6c8-eff0cea9e08a%2Frocket-ship.png?1494946700421";

var BACKEND_ICON =
  "https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fworksheet-number-monochrome-b-classroom.jpg?v=1616731943091";
// var FRONTEND_ICON
var ROCKET_ICON =
  "https://cdn.glitch.com/aef55bcb-cec2-438b-98c0-959249969810%2Fc69415fd-f70e-4e03-b43b-98b8960cd616_white-rocket-ship.png?v=1616729876518";

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
            (parseFloat(d.frontendEstimate) ? parseFloat(d.frontendEstimate) : 0);
          
        } else {
          holder[d.idList] = parseFloat(d.backendEstimate)
            ? parseFloat(d.backendEstimate)
            : 0;
              holder2[d.idList] = parseFloat(d.backendEstimate)
            ? parseFloat(d.backendEstimate)
            : 0;
        }})

        
      //         listEstimateArr.forEach(function(d) {
      //   if (holder2.hasOwnProperty(d.idList)) {
      //     holder2[d.idList] =
      //       holder2[d.idList] + parseFloat(d.frontendEstimate)
      //         ? parseFloat(d.frontendEstimate)
      //         : 0;
      //   } else {
      //     holder2[d.idList] = parseFloat(d.frontendEstimate)
      //       ? parseFloat(d.frontendEstimate)
      //       : 0;
      //   }
      // });

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
    return [
      {
        // we can either provide a button that has a callback function
        icon: {
          dark: WHITE_ROCKET_ICON,
          light: BLACK_ROCKET_ICON
        },
        text: "Callback",
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
      var backend_estimate = estimates["card"]["shared"]["backend_estimate"];
      var frontend_estimate = estimates["card"]["shared"]["frontend_estimate"];

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

// var onBtnClick = function (t, opts) {

//   return t.popup({
//     title: 'Snooze Card',
//     items: function(t, options) {

//          // We want to retrieve all of the cards we currently have and all of the fields
//       // on those cards that we will want to use for searching through.
//         return t.cards('id','idList', 'name').then(function (cards) {
//           const searchText = "apility";  // The text the user has input.
//           const matchedCards = cards.filter(function(card){
//           // We need to shrink our list of possible matches to those cards that contain what the
//           // user has input. We'll use a naive approach here and just see if the string entered
//           // is in any of the fields we care about.
//           const textToSearch = card.id + card.idList + card.name;
//           var tempT = textToSearch.toLowerCase().includes(searchText.toLowerCase());
//           console.log("tempT is:", tempT)
//           return textToSearch.toLowerCase().includes(searchText.toLowerCase());
//         })
//         // Once we have all of the cards that match our search criteria, we need to put them into
//         // the array of objects that the t.popup method expects.
//           let items = matchedCards.map(function(card){
//           const cardUrl = `https://trello.com/c/${card.id}`
//           return {
//             text: card.name,
//             url: cardUrl,
//             callback: function(t){
//               // When the user selects one of the cards we've returned in the search, we want
//               // to attach that card via it's URL.
//               return t.attach({ url: cardUrl, name: card.name })
//               .then(function(){
//                 // Once we've attached the card's URL to the current card, we can close
//                 // our search popup.
//                 return t.closePopup();
//               });
//             }
//           }
//         })
//         return items;          //don't forget to return items

//                 });
//     },
//     search: {
//       placeholder: 'Card name, description, or ID',
//       empty: 'Huh, nothing there 🤔',
//       searching: 'Searching your cards...'
//     }
//   });
// };

//inside button var function
// t.cards('id','idList', 'name')

//   t.get('5f53e15a6bb8a9122694687f', 'shared', 'backend_estimate','')
//   .then(function (data) {

//     cardEstimateArr.push({'id':"test",'key':"t2",'value':"t3"})
//     cardEstimateArr.push({'id':"test",'key':"t2",'value':"t3"})
//     console.log("CardEss:", cardEstimateArr)
//                   })

//   .then(() => console.log("CardEss2:", cardEstimateArr))
// }

//   return t.cards('id','idList', 'name').then(function (cards) {

//   // console.log(JSON.stringify(cards, null, 2))
//   // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate'))

//   //cardID array created with all IDs in on the board
//   var tempArray = Object.values(cards)
//   console.log("Cards values :", tempArray)

//   var listEstimateArr =  []
//   var backendEstimate = 0
//   tempArray.map((key) =>
//                     // console.log('test')
//                     // console.log(key["id"]),
//                     // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate','no value')))

//   //retrieve value of backend_estimate for each card and then assign it to cardEstimateArr value

//   t.get(key.id, 'shared', 'backend_estimate','')
//   .then(function (data) {
//                          cardEstimateArr.push({'id':key.id,idList:key.idList,'backendEstimate':data});
//                          // cardEstimateArr.push([key['id'],key['idList'],data]);
//                          listEstimateArr.push({'idList':key.idList,'backendEstimate':data})
//   }))
//   console.log("cardEstimateArr: ", cardEstimateArr)
//   console.log("listEstimateArr: ", listEstimateArr)
//   })}

//                 return t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate','no value')
//                 .then(function (data) {
//                   console.log(JSON.stringify(data, null, 2));
//                 });

//                 tempArray.map(function(key){
//                               // cardEstimateArr.push({'id':"test",'key':"t2",'value':"t3"})
//                               return t.get(key.id, 'shared', 'backend_estimate','')
//                               .then(function (data) {
//                               // backendEstimate = data
//                                 cardEstimateArr.push({'id':"test",'key':"t2",'value':"t3"})
//                 }

//                              )})

//Didn't work
//               Promise.all(promises).then(() =>

//                 result = Object.values(listEstimateArr.reduce((c, {idList,backendEstimate}) => {
//                 console.log("c[idList]:",c[idList])
//                 console.log("idList:",idList)

//                 c[idList] = c[idList] || {idList,backendEstimate: []};
//                 console.log("c[idList].backendEstimate:",c[idList].backendEstimate)
//                 // c[idList].backendEstimate = c[idList].backendEstimate.reduce((total,obj) => parseInt(obj) + total,0)
//                 c[idList].backendEstimate = c[idList].backendEstimate.concat(parseInt(backendEstimate)?parseInt(backendEstimate):0);

//                 // c[idList] = c[idList].backendEstimate.reduce((total,obj) => parseInt(obj.backendEstimate) + total,0)
//                 // console.log("c.backendEstimate: ",c[idList].backendEstimate.reduce((a,b) => a+b))

//                 // cArr = Object.values(c)
//                 // console.log("cArr:",cArr)
//                 // console.log("cArr.backendEstimate",cArr.reduce((a,b) => a+b,0))
//                 // c[idList].backendEstimate = c[idList].backendEstimate.reduce((a,b) => a+b,0);
//                 // console.log("C is:",c)
//                 // console.log("cardEstimateArr: ", cardEstimateArr);
//                 console.log("listEstimateArr: ", listEstimateArr);
//                 // console.log("testt")
//                 return c;
//               }

//              , {}))

//               ).then((c) => {

//                      console.log("C is:",c)
//                      console.log("c.reduce",c.reduce((total,obj) => parseInt(obj.backendEstimate) + total,0))

//               })

//               .catch(err => console.log(err))

// .then(() => console.log("listEstimateArr: ", listEstimateArr))

// var tempArray2 = [];
// tempArray.map((key) => tempArray2.push({'idList':key.idList}));
// console.log("tempArray2:",tempArray2)

//                 var temp = listEstimateArr.filter(key => key.length > 0)
// console.log("temp:",temp)
// console.log("map to array: ",Object.fromEntries(cardEstimateArr))
// var cardEstimateArrTemp = Array.from(cardEstimateArr)
// console.log("cardEstimateArrTemp: ",cardEstimateArrTemp)

//                 var listEstimateArr =  []

//                 cardEstimateArr.map((key) =>
//                                    listEstimateArr.push({'id':key.id,'backendEstimate':key.backendEstimate})
//                                    )

// listEstimateArr.set(key,value))

// cardEstimateArr.map((key, value) => value.map((value1,value2) => listEstimateArr.set(value1,value2)))

// =========

// var onBtnClickX = function(t, opts) {
//   // console.log('Someone clicked the button');
//   var cardEstimateArr = new Array();
//   var listEstimateArr = new Array();
//   var obj2 = [];
//   return t.cards("id", "idList", "name").then(function(cards) {
//     console.log("t.cards is:", cards);

//     var tempArray = Object.values(cards);
//     console.log("Cards values :", tempArray);

//     // console.log('test')
//     // console.log(key["id"]),
//     // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate','no value')))

//     //retrieve value of backend_estimate for each card and then assign it to cardEstimateArr values and listEstimateArr

//     // toCall(t,tempArray,cardEstimateArr,listEstimateArr,callBack)
//     tempArray
//       .map(key =>
//         t.get(key.id, "shared", "backend_estimate", "").then(function(data) {
//           cardEstimateArr.push({
//             id: key.id,
//             idList: key.idList,
//             backendEstimate: data
//           });
//           // cardEstimateArr.push([key['id'],key['idList'],data]);
//           listEstimateArr.push({
//             idList: key.idList,
//             backendEstimate: data
//           });
//         })
//       )
//       .then();
//     // .then(() =>console.log("listEstimateArr: ", listEstimateArr))
//   });
// };

// var Promise = TrelloPowerUp.Promise;

// var onBtnClick3 = new Promise(function(t, opts) {
//   var cardEstimateArr = new Array();
//   var listEstimateArr = new Array();
//   var obj2 = [];
//   return t.cards("id", "idList", "name").then(function(cards) {
//     console.log("t.cards is:", cards);

//     var tempArray = Object.values(cards);
//     console.log("Cards values :", tempArray);

//     // console.log('test')
//     // console.log(key["id"]),
//     // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate','no value')))

//     //retrieve value of backend_estimate for each card and then assign it to cardEstimateArr values and listEstimateArr

//     // toCall(t,tempArray,cardEstimateArr,listEstimateArr,callBack)
//     tempArray.map(key =>
//       t.get(key.id, "shared", "backend_estimate", "").then(function(data) {
//         cardEstimateArr.push({
//           id: key.id,
//           idList: key.idList,
//           backendEstimate: data
//         });
//         // cardEstimateArr.push([key['id'],key['idList'],data]);
//         listEstimateArr.push({
//           idList: key.idList,
//           backendEstimate: data
//         });
//       })
//     );
//   });
// });

// onBtnClick3.then(function successValue(result) {
//   console.log("result:", result);
//   // console.log("cardEstimateArr:",result.cardEstimateArr)
//   // console.log("listEstimateArr:",result.listEstimateArr)
// });

// var onBtnClick4 = function(t, opts) {
//   // console.log('Someone clicked the button');

//   return t.popup({
//     title: "estimated",
//     callback: function(t, opts) {
//       var cardEstimateArr = new Array();
//       var obj2 = [];
//       var obj3 = [3, 3, 3];

//       // t.cards return a set of values,
//       //values are in object of nested array,
//       //values of outer array assign to tempArray
//       //then values of inner array assigned to an array of card IDs as keys

//       //   return t.popup({
//       //         title: "Calculated Points",
//       //         url: "./results.html",
//       //         args: { message: "obj" }
//       //       });

//       return t.cards("id", "idList", "name").then(function(cards) {
//         // console.log(JSON.stringify(cards, null, 2))
//         // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate'))

//         //cardID array created with all IDs in on the board
//         var tempArray = Object.values(cards);
//         console.log("Cards values :", tempArray);

//         var listEstimateArr = [];
//         var backendEstimate = 0;
//         var result = [];

//         var promises = [];
//         var cArr = [];
//         tempArray.map(
//           key =>
//             // console.log('test')
//             // console.log(key["id"]),
//             // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate','no value')))

//             //retrieve value of backend_estimate for each card and then assign it to cardEstimateArr values and listEstimateArr
//             promises.push(
//               t
//                 .get(key.id, "shared", "backend_estimate", "")
//                 .then(function(data) {
//                   cardEstimateArr.push({
//                     id: key.id,
//                     idList: key.idList,
//                     backendEstimate: data
//                   });
//                   // cardEstimateArr.push([key['id'],key['idList'],data]);
//                   listEstimateArr.push({
//                     idList: key.idList,
//                     backendEstimate: data
//                   });
//                 })
//             )
//           // .then(() =>console.log("listEstimateArr: ", listEstimateArr))
//         );

//         //Pass listEstimateArr to promise caller, merge idList that are equal and sum the their backendEstimate values
//         Promise.all(promises, t).then(() => {
//           var holder = {};
//           // console.log(t)
//           listEstimateArr.forEach(function(d) {
//             if (holder.hasOwnProperty(d.idList)) {
//               holder[d.idList] =
//                 holder[d.idList] +
//                 (parseFloat(d.backendEstimate)
//                   ? parseFloat(d.backendEstimate)
//                   : 0);
//             } else {
//               holder[d.idList] = parseFloat(d.backendEstimate)
//                 ? parseFloat(d.backendEstimate)
//                 : 0;
//             }
//           });

//           for (var prop in holder) {
//             obj2.push({ idList: prop, value: holder[prop] });
//           }
//           console.log("obj2:", obj2);
//           return obj2;
//           // t.set('board', 'shared', obj2);
//           // return obj2;
//           //           return t.popup({
//           //            title: 'Change Time',
//           //              url: "./results.html",
//           //             args: { obj2: "You can access these with t.arg()" },
//           //             height: 278 // initial height, can be changed later

//           //           })
//         });
//         // console.log(obj2);
//       });
//       return obj2;
//     },
//     url: "results.html"
//   });
// };

// ======

// var onBtnClick = function(t, opts) {
//   // console.log('Someone clicked the button');
//   var cardEstimateArr = new Array();
//   var obj2 = [];
//   var obj3 = [3,3,3]
//   const mm = "how are you"
//   return t.popup({
//     title: "Calculated Points",
//     url: './results.html',
//     args: { message: "obj" },
//     items: function(t, options) {
//       // t.cards return a set of values,
//       //values are in object of nested array,
//       //values of outer array assign to tempArray
//       //then values of inner array assigned to an array of card IDs as keys

//       return t.cards("id", "idList", "name").then(function(cards) {
//         // console.log(JSON.stringify(cards, null, 2))
//         // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate'))

//         //cardID array created with all IDs in on the board
//         var tempArray = Object.values(cards);
//         console.log("Cards values :", tempArray);

//         var listEstimateArr = [];
//         var backendEstimate = 0;
//         var result = [];

//         var promises = [];
//         var cArr = [];
//         tempArray.map(
//           key =>
//             // console.log('test')
//             // console.log(key["id"]),
//             // console.log('backend_esitmate: ',t.get("5f53e15a6bb8a9122694687f", 'shared', 'backend_estimate','no value')))

//             //retrieve value of backend_estimate for each card and then assign it to cardEstimateArr values and listEstimateArr
//             promises.push(
//               t
//                 .get(key.id, "shared", "backend_estimate", "")
//                 .then(function(data) {
//                   cardEstimateArr.push({
//                     id: key.id,
//                     idList: key.idList,
//                     backendEstimate: data
//                   });
//                   // cardEstimateArr.push([key['id'],key['idList'],data]);
//                   listEstimateArr.push({
//                     idList: key.idList,
//                     backendEstimate: data
//                   });
//                 })
//             )
//           // .then(() =>console.log("listEstimateArr: ", listEstimateArr))
//         );

//         //Pass listEstimateArr to promise caller, merge idList that are equal and sum the their backendEstimate values
//         Promise.all(promises).then(() => {
//           var holder = {};
//           listEstimateArr.forEach(function(d) {
//             if (holder.hasOwnProperty(d.idList)) {
//               holder[d.idList] =
//                 holder[d.idList] +
//                 (parseInt(d.backendEstimate) ? parseInt(d.backendEstimate) : 0);
//             } else {
//               holder[d.idList] = parseInt(d.backendEstimate)
//                 ? parseInt(d.backendEstimate)
//                 : 0;
//             }
//           });

//           for (var prop in holder) {

//             obj2.push({ idList: prop, value: holder[prop] });
//           }
//           console.log(obj2);

//           return obj2;
// //           return t.popup({
// //            title: 'Change Time',
// //              url: "./results.html",
// //             args: { obj2: "You can access these with t.arg()" },
// //             height: 278 // initial height, can be changed later

// //           })

//         });
//         // console.log(obj2);
//       });
//     }

//   });
// };
