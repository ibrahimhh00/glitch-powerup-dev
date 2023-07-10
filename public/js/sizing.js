const API_URL = "https://jsonplaceholder.typicode.com/users/";

var t = window.TrelloPowerUp.iframe();

$(document).ready(function () {
  fetchMembers();
});

function fetchMembers() {
  $.ajax({
    url: API_URL,
    type: "GET",
    success: function (data) {
      console.log(data);
      populateMembers(data);
    },
    error: function (error) {
      console.error("Error fetching members", error);
    },
  });
}

function populateMembers(members) {
  const membersList = $("#members");
  members.forEach(function (member) {
    const option = `<option value="${member.id}">${member.name}</option>`;
    membersList.append(option);
  });
}

$("#estimate").submit(function (event) {
  event.preventDefault();

  const selectedMemberId = $("#members").val();
  const sizing = $("#estimation-size").val();
  const selectedMemberName = $("#members option:selected").text();
  console.log(selectedMemberId, sizing);
  t.get("card", "shared", "memberSizing", [])
    .then(function (memberSizing) {
      // memberSizing will be an empty array if it's not set yet.
      // Now add the new member to it
      memberSizing.push({
        memberId: selectedMemberId,
        memberName: selectedMemberName,
        sizing: sizing,
      });

      // Now save it back
      return t.set("card", "shared", "memberSizing", memberSizing);
    })
    .then(() => {
      console.log("New member stored.");
      return t.closePopup();
    });
  // t.closePopup();
});
