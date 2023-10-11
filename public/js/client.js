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
var ENDPOINT_URL = "http://localhost:9000/api/v1";
// async function fetchFeatures() {
//   const response = await fetch(ENDPOINT_URL, { method: "GET" });
//   return await response.json();
// }
async function fetchCards() {
  const response = await fetch(`${ENDPOINT_URL}/cards/`, { method: "GET" });
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
      //       {
      //         // icon is the URL to an image to be used as the button's icon.
      //         // The image should be 24x24 pixels.
      //         icon: "https://icons.veryicon.com/png/o/commerce-shopping/icon-of-lvshan-valley-mobile-terminal/home-category.png",

      //         // text is the name of the button.
      //         text: "Category",

      //         // callback is a function that is called when the button is clicked.
      //         callback: function (t) {
      //           // Popup an iframe when the button is clicked.
      //           // The iframe will load the URL provided and display it in a modal.
      //           return t.popup({
      //             // Title of the popup
      //             title: "Categories",

      //             // URL of the page to load into the iframe
      //             url: "./category.html",

      //             // Height of the popup in pixels
      //             height: 184,
      //           });
      //         },
      //       },
      //       {
      //         // icon is the URL to an image to be used as the button's icon.
      //         // The image should be 24x24 pixels.
      //         icon: "https://icons.veryicon.com/png/o/miscellaneous/administration/account-25.png",

      //         // text is the name of the button.
      //         text: "Accounts",

      //         // callback is a function that is called when the button is clicked.
      //         callback: function (t) {
      //           // Popup an iframe when the button is clicked.
      //           // The iframe will load the URL provided and display it in a modal.
      //           return t.popup({
      //             // Title of the popup
      //             title: "Account",

      //             // URL of the page to load into the iframe
      //             url: "./account.html",

      //             // Height of the popup in pixels
      //             height: 184,
      //           });
      //         },
      //       },
    ];
  },
  "card-badges": function (t, options) {
    return t.get("card", "shared", "badgeData").then(function (badgeData) {
      // If there is badge data stored in pluginData, use it
      // if (badgeData) {
      //   return badgeData;
      // }
      console.log("badgeData", badgeData);
      // Otherwise, fetch the badge data from the backend and store it in pluginData
      return t
        .card("id")
        .get("id")
        .then(function (cardId) {
          return fetch(`${ENDPOINT_URL}/cards/${cardId}`)
            .then((response) => response.json())
            .then((data) => {
              console.log("data", data);
              const membersBadges = data.data.members.map((member) => {
                return {
                  text: `${member.memberId.name} ${member.sizing}`,
                  color: "red",
                  memberId: member.memberId._id,
                  cardId: cardId,
                };
              });

              // const categoriesBadges = data.data.members
              //   .filter(
              //     (member, index, self) =>
              //       index ===
              //       self.findIndex(
              //         (m) =>
              //           m.memberId.category.id === member.memberId.category.id
              //       )
              //   )
              //   .map((member) => {
              //     return {
              //       text: member.memberId.category.name,
              //       color: member.memberId.category.color,
              //       icon: member.memberId.category.icon,
              //     };
              //   });
              const categoriesBadges = data.data.members.reduce(
                (acc, member) => {
                  const category = member.memberId.category;
                  const existingCategoryBadge = acc.find(
                    (badge) => badge.categoryId === category.id
                  );
                  if (existingCategoryBadge) {
                    existingCategoryBadge.memberIds.push(member.memberId._id);
                  } else {
                    acc.push({
                      text: category.name,
                      color: category.color,
                      icon: category.icon,
                      categoryId: category.id,
                      memberIds: [member.memberId._id],
                      cardId: cardId,
                    });
                  }
                  return acc;
                },
                []
              );
              const badges = [...membersBadges, ...categoriesBadges];

              // Store the badge data in pluginData for future use
              return t.set("card", "shared", "badgeData", badges).then(() => {
                return badges;
              });
            });
        });
    });
  },
  "card-detail-badges": function (t, options) {
    return t
      .get("card", "shared", "detailBadgeData")
      .then(function (detailBadgeData) {

        // if (detailBadgeData) {
        //   return detailBadgeData;
        // }

        return t
          .card("id")
          .get("id")
          .then(function (cardId) {
            return fetch(`${ENDPOINT_URL}/cards/${cardId}`)
              .then((response) => response.json())
              .then((data) => {

                const membersBadges = data.data.members.map((member) => {
                  const badge = {
                    title: member.memberId.name,
                    text: member.sizing,
                    color: "red",
                    memberId: member.memberId._id,
                    cardId: cardId,
                    callback: function (t) {
                      let outSideContext = t;
                      return outSideContext.popup({
                        title: "Adjust Member Sizing",
                        items: [
                          // {
                          //   text: "Member: " + member.memberId.name,
                          // },
                          // {
                          //   text: "Current Sizing: " + member.sizing,
                          //   callback: function (t) {
                          //     return t.popup({
                          //       url: "input",
                          //       title: "Adjust Sizing",
                          //       url: `../adjust-size.html?cardId=${cardId.id}&idList=${idList.id}&idBoard=${idBoard.id}&memberId=${member.memberId.id}&memberName=${member.memberId.name}&currentSizing=${member.sizing}`,
                          //     });
                          //   },
                          // },
                          {
                            text: "Delete Member",
                            callback: function (t) {
                              const data = {
                                memberId: member.memberId._id,
                                cardId: cardId.id,
                              };
                              fetch(`${ENDPOINT_URL}/cards/delete-member`, {
                                method: "POST", // Specifying the HTTP method
                                headers: {
                                  "Content-Type": "application/json", // Setting the content type of the request
                                },
                                body: JSON.stringify(data), // Converting the data to a JSON string
                              })
                                .then((response) => response.json()) // Parsing the JSON response from the server
                                .then((data) => {
                                  console.log("Success:", data);
                                  t
                                    .get("card", "shared", "detailBadgeData")
                                    .then(function (badgeData) {
                                    console.log("badgeDatabadgeDatabadgeData", badgeData)
                                      if (!badgeData) return;

                                      badgeData.forEach((badge) => {
                                        console.log(
                                          "badge.memberId",
                                          badge.memberId
                                        );
                                        console.log(
                                          badge.memberId,
                                          badge.cardId
                                        );
                                        console.log(
                                          badge.memberId,
                                          badge.cardId
                                        );
                                        console.log(
                                          badge.memberId,
                                          badge.cardId
                                        );
                                        if (
                                          badge.memberId &&
                                          badge.memberId === data.memberId &&
                                          badge.cardId === data.cardId
                                        ) {
                                          console.log(
                                            badge.memberId,
                                            badge.cardId
                                          );
                                          badgeData = badgeData.filter(
                                            (b) =>
                                              b.memberId !== data.memberId &&
                                              b.cardId !== data.cardId
                                          );
                                        }
                                        if (
                                          badge.memberIds &&
                                          badge.memberIds.includes(
                                            data.memberId
                                          ) &&
                                          badge.cardId === cardId
                                        ) {
                                          // Remove the member ID from the badge's memberIds array
                                          badge.memberIds =
                                            badge.memberIds.filter(
                                              (id) => id !== data.memberId
                                            );

                                          // If the memberIds array is now empty, remove the badge
                                          if (badge.memberIds.length === 0) {
                                            badgeData = badgeData.filter(
                                              (b) =>
                                                b.categoryId !==
                                                  badge.categoryId &&
                                                b.cardId === cardId
                                            );
                                          }
                                        }
                                      });
                                      console.log("badgeData", badgeData);
                                      // Update pluginData with the updated badge data
                                      t.set(
                                        "card",
                                        "shared",
                                        "badgeData",
                                        badgeData
                                      );
                                    });
                                })
                                .catch((error) => {
                                  console.error("Error:", error); // Handling errors
                                })
                                .finally(() => {
                                  console.log(outSideContext); // Log the context to inspect its state
                                  if (outSideContext) {
                                    // Check if the context is defined
                                    // If there’s a method to check if a popup is open, use it here
                                    outSideContext.closePopup();
                                  } else {
                                    console.error("Context is not defined.");
                                  }
                                });

                              console.log(
                                "Deleting member with ID: ",
                                member.memberId._id,
                                cardId.id
                              );
                              // Implement your logic here to delete the member from the card
                            },
                          },
                        ],
                      });
                    },
                  };
                  console.log("badgebadgebadgebadge", badge)
                  // Add a callback if this isn’t a member sizing badge

                  return badge;
                });

                const categoriesBadges = data.data.members.reduce(
                  (acc, member) => {
                    const category = member.memberId.category;
                    const existingCategoryBadge = acc.find(
                      (badge) => badge.categoryId === category.id
                    );

                    if (existingCategoryBadge) {
                      existingCategoryBadge.memberIds.push(member.memberId._id);
                    } else {
                      acc.push({
                        text: category.name,
                        color: category.color,
                        icon: category.icon, // Only if categories have icons
                        categoryId: category.id,
                        memberIds: [member.memberId._id],
                        cardId: cardId,
                      });
                    }
                    return acc;
                  },
                  []
                );

                const detailBadges = [...membersBadges, ...categoriesBadges];
              console.log("detailBadges", detailBadges)

                // Store the badge data in pluginData for future use
                return t
                  .set("card", "shared", "detailBadgeData", detailBadges)
                  .then(() => {
                    return detailBadges;
                  });
              });
          });
      });
  },
});
