const API_URL = "http://localhost:9000/api/v1/public/trello/members";

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
      populateMembers(data.data);
    },
    error: function (error) {
      console.error("Error fetching members", error);
    },
  });
}

function populateMembers(members) {
  t.get("card", "shared", "memberSizing").then(function (memberSizing = []) {
    // memberSizing now contains the sizing data for members
    let memberIdsWithSizing = memberSizing.map((ms) => ms.memberId);
    console.log("memberIdsWithSizing", memberIdsWithSizing)

    const membersList = $("#members");
    members.forEach(function (member) {
      // Exclude members that have sizing data
      console.log(member.id)
      if (!memberIdsWithSizing.includes(String(member.id))) {
        const option = `<option value="${member.id}">${member.name}</option>`;
        membersList.append(option);
      }
    });
  });
}

$("#estimate").submit(function (event) {
  event.preventDefault();

  const selectedMemberId = $("#members").val();
  const sizing = $("#estimation-size").val();
  const selectedMemberName = $("#members option:selected").text();
  if(!sizing || !selectedMemberName) {
    return
  }
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
