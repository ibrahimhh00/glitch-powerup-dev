const API_URL = "http://localhost:9000/api/v1";

var t = window.TrelloPowerUp.iframe();

//call the function fetchMembers on UI form load
$(document).ready(function () {
  fetchMembers();
});

//fetch members from backend
function fetchMembers() {
  $.ajax({
    url: `${API_URL}/public/trello/members`,
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

//populate the members into the UI
function populateMembers(members) {
  t.get("card", "shared", "memberSizing").then(function (memberSizing = []) {
    // memberSizing now contains the sizing data for members
    let memberIdsWithSizing = memberSizing.map((ms) => ms.memberId);
    console.log("memberIdsWithSizing", memberIdsWithSizing);

    const membersList = $("#members");
    members.forEach(function (member) {
      // Exclude members that have sizing data
      console.log(member.id);
      if (!memberIdsWithSizing.includes(String(member.id))) {
        const option = `<option value="${member.id}">${member.name}</option>`;
        membersList.append(option);
      }
    });
  });
}

//handle submit sizing form
$("#estimate").submit(function (event) {
  event.preventDefault();

  const selectedMemberId = $("#members").val();
  const sizing = $("#estimation-size").val();
  const selectedMemberName = $("#members option:selected").text();
  if (!sizing || !selectedMemberName) {
    return;
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

      // Now save it back and send data to backend
      return t.set("card", "shared", "memberSizing", memberSizing).then(() => {
        const data = {
          memberId: selectedMemberId,
          sizing: sizing,
          date: new Date(), // Assuming you want to send the current date
        };
        return fetch("/your-endpoint", {
          // Replace '/your-endpoint' with the actual endpoint
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      });
    })
    .then((response) => response.json()) // Assuming the server responds with JSON
    .then((data) => {
      console.log("Success:", data);
      return t.closePopup();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
