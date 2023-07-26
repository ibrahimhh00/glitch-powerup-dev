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

var DISRUPTEM_ICON1 =
  "https://cdn.glitch.com/bcb67d52-05a1-4b6e-a315-f5bae36b69eb%2FIcon-Color%403x.png?v=1625811265010";
var DISRUPTEM_ICON2 =
  "https://cdn.glitch.com/bcb67d52-05a1-4b6e-a315-f5bae36b69eb%2F1.png?v=1625811412559";
var DISRUPTEM_ICON3 =
  "https://cdn.glitch.com/bcb67d52-05a1-4b6e-a315-f5bae36b69eb%2Fdisruptem-Icon_White.png?v=1625811831046";
var ENDPOINT_URL =
  "https://uxperts-powerup-node-staging-6notf.ondigitalocean.app/api/v1/public/trello/all";
async function fetchFeatures() {
  const response = await fetch(ENDPOINT_URL, { method: "GET" });
  return await response.json();
}

function onBtnClickTwo(t) {
  return t.lists("all").then(function (lists) {
    let results = []; // Array to collect all the results
    let listPromises = lists.map(function (list) {
      return t.cards("all").then(function (cards) {
        var cardList = cards.filter(function (card) {
          return card.idList === list.id;
        });
        let totalSizeAll = 0;
        let categories = {};
        let promises = cardList.map(function (card) {
          return Promise.all([
            t.get(card.id, "shared", "memberSizing"),
            t.get(card.id, "shared", "category"),
          ]).then(function ([memberSizing, category]) {
            let totalSize = 0; // This is the total size for this card
            if (memberSizing) {
              totalSize = memberSizing.reduce(
                (acc, element) => Number(acc) + Number(element.sizing),
                0
              );
            }
            totalSizeAll += totalSize;

            if (category) {
              if (category.categoryName in categories) {
                categories[category.categoryName] += totalSize;
              } else {
                categories[category.categoryName] = totalSize;
              }
            }
          });
        });
        return Promise.all(promises).then(() => {
          results.push({
            listName: list.name,
            totalPoints: totalSizeAll,
            categoryPoints: categories,
          });
        });
      });
    });
    return Promise.all(listPromises).then(() => {
      showResults(t, results); // Call the showResults function once all the results have been collected
    });
  });
}

function showResults(t, obj2) {
  return t.boardBar({
    url: "./results.html",
    height: 300,
    args: { message: obj2 },
  });
}

function removeMemberBadge(t, indexToRemove) {
  return t.get("card", "shared", "memberSizing").then(function (memberSizing) {
    // Remove the element at indexToRemove from memberSizing
    const updatedMemberSizing = memberSizing.filter(
      (_, index) => index !== indexToRemove
    );
    // Update the memberSizing data in Trello
    return t.set("card", "shared", "memberSizing", updatedMemberSizing);
  });
}
function removeAccountBadge(t) {
  return t.get("card", "shared", "account").then(function () {
    return t.remove("card", "shared", "account");
  });
}
function removeCategoryBadge(t) {
  return t.get("card", "shared", "category").then(function () {
    return t.remove("card", "shared", "category");
  });
}
window.TrelloPowerUp.initialize({
  "board-buttons": function (t, opts) {
    console.log(opts);
    return [
      {
        // we can either provide a button that has a callback function
        icon: {
          dark: DISRUPTEM_ICON3,
          light: DISRUPTEM_ICON3,
        },
        text: "Report",
        condition: "always",
        callback: function (t) {
          return onBtnClickTwo(t);
        },
      },
    ];
  },

  "card-buttons": async function (t, options) {
    return [
      {
        // icon is the URL to an image to be used as the button's icon.
        // The image should be 24x24 pixels.
        icon: "https://cdn.glitch.global/bcb67d52-05a1-4b6e-a315-f5bae36b69eb/Add-Button-PNG.png?v=1688645933100",

        // text is the name of the button.
        text: "Estimate",

        // callback is a function that is called when the button is clicked.
        callback: function (t) {
          // Popup an iframe when the button is clicked.
          // The iframe will load the URL provided and display it in a modal.
          return t.popup({
            // Title of the popup
            title: "Sizing Details",

            // URL of the page to load into the iframe
            url: "./sizing.html",

            // Height of the popup in pixels
            height: 184,
          });
        },
      },
      {
        // icon is the URL to an image to be used as the button's icon.
        // The image should be 24x24 pixels.
        icon: "https://icons.veryicon.com/png/o/commerce-shopping/icon-of-lvshan-valley-mobile-terminal/home-category.png",

        // text is the name of the button.
        text: "Category",

        // callback is a function that is called when the button is clicked.
        callback: function (t) {
          // Popup an iframe when the button is clicked.
          // The iframe will load the URL provided and display it in a modal.
          return t.popup({
            // Title of the popup
            title: "Categories",

            // URL of the page to load into the iframe
            url: "./category.html",

            // Height of the popup in pixels
            height: 184,
          });
        },
      },
      {
        // icon is the URL to an image to be used as the button's icon.
        // The image should be 24x24 pixels.
        icon: "https://icons.veryicon.com/png/o/miscellaneous/administration/account-25.png",

        // text is the name of the button.
        text: "Accounts",

        // callback is a function that is called when the button is clicked.
        callback: function (t) {
          // Popup an iframe when the button is clicked.
          // The iframe will load the URL provided and display it in a modal.
          return t.popup({
            // Title of the popup
            title: "Account",

            // URL of the page to load into the iframe
            url: "./account.html",

            // Height of the popup in pixels
            height: 184,
          });
        },
      },
    ];
  },

  "card-badges": async function (t, options) {
    const featuresData = await fetchFeatures();
    console.log(featuresData);
    // Use t.get to retrieve the stored data
    return Promise.all([
      t.get("card", "shared", "account"),
      t.get("card", "shared", "category"),
      t.get("card", "shared", "memberSizing"),
    ]).then(function ([account, category, memberSizing]) {
      console.log("categoryyyyy", category);
      const badges = [];
      const finalMembers = [];
      memberSizing.forEach(function (ms) {
        console.log(ms);
        featuresData.data.members.forEach((member) => {
          if (member._id === ms.memberId) {
            finalMembers.push({
              text: `${member.name} ${ms.sizing}`,
              color: "red",
            });
          }
        });
      });

      // Check if "category" data is available and add the badge if yes
      if (category) {
        let deleteIt = true
        console.log("ASDASDASDASDASD")
        featuresData.data.categories.forEach((cat) => {
          console.log(cat._id == category.categoryId, cat._id, category.categoryId)
          if (cat._id === category.categoryId) {
            deleteIt = false
            console.log("TREUEEEEEEEEEEEEEEEEE")
            badges.push({
              text: cat.name,
              color: cat.color,
            });
            t.set("card", "shared", "category", {
              categoryId: cat._id,
              categoryName: cat.name,
              categoryColor: cat.color,
            }).then(() => console.log("Cat Added"));
          }
          if(deleteIt) {
            t.set("card", "shared", "category", {
              
            }).then(() => console.log("Category Deleted"));
          }
        });
      }
      // Check if "account" data is available and add the badge if yes
      if (account) {
        for (let i = 0; i < featuresData.data.accounts.length; i++) {
          let acc = featuresData.data.accounts[i];
          if (acc._id === account.accountId) {
            badges.push({
              text: acc.name,
              color: "yellow",
            });
            t.set("card", "shared", "account", {
              accountId: acc._id,
              accountName: acc.name,
            }).then(() => console.log("Added Account"));
          }
        }
      }
      if (finalMembers) {
        badges.push(...finalMembers);
      }

      // Add the member badges
      
      // Return the badges
      return badges;
    });
  },

  "card-detail-badges": function (t, options) {
    // Use t.get to retrieve the stored data
    return Promise.all([
      t.get("card", "shared", "memberSizing"),
      t.get("card", "shared", "account"),
      t.get("card", "shared", "category"),
    ]).then(function ([memberSizing, account, category]) {
      console.log(memberSizing, account);
      // memberSizing is an array of member sizing objects
      // Map each member sizing to a badge
      const members = memberSizing
        ? memberSizing.map(function (ms, index) {
            return {
              // Display the member ID and sizing as the badge text
              title: ms.memberName,
              text: ms.sizing,
              color: "red",
              callback: function (t, opts) {
                return removeMemberBadge(t, index);
              },
              // You could also set color and icon properties
            };
          })
        : [];
      const result = [
        ...members,
        account && {
          // Display the member ID and sizing as the badge text
          title: "Account",
          text: account.accountName,
          color: "yellow",
          callback: function (t, opts) {
            return removeAccountBadge(t);
          },
        },
        category && {
          // Display the member ID and sizing as the badge text
          title: "Category",
          text: category.categoryName,
          color: category.categoryColor,
          callback: function (t, opts) {
            return removeCategoryBadge(t);
          },
        },
      ];
      return result;
    });
  },
  // "card-detail-badges": function (t, options) {
  //   // return t.get('card', 'shared', 'backend_estimate')
  //   return t.getAll().then(function (estimates) {
  //     var backend_estimate = estimates["card"]["shared"]["backend_estimate"];
  //     var frontend_estimate = estimates["card"]["shared"]["frontend_estimate"];
  //     return [
  //       {
  //         title: "Backend Estimate",
  //         color:
  //           backend_estimate == null || backend_estimate == 0 ? null : "blue",
  //         text:
  //           backend_estimate == null || backend_estimate == 0
  //             ? null
  //             : backend_estimate,
  //         callback: function (t) {
  //           return t.popup({
  //             title: "Backend Estimation",
  //             url: "estimate.html",
  //           });
  //         },
  //       },
  //       {
  //         title: "Frontend Estimate",
  //         color:
  //           frontend_estimate == null || frontend_estimate == 0
  //             ? null
  //             : "orange",
  //         text:
  //           frontend_estimate == null || frontend_estimate == 0
  //             ? null
  //             : frontend_estimate,
  //         callback: function (t) {
  //           return t.popup({
  //             title: "Frontend Estimation",
  //             url: "estimate.html",
  //           });
  //         },
  //       },
  //     ];
  //   });
  // },
});
