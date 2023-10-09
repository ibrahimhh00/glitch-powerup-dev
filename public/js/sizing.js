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
      populateMembers(data.data.members);
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
    console.log(members)
    let memberIdsWithSizing = members.map((ms) => ms._id);
    console.log("memberIdsWithSizing", memberIdsWithSizing);

    const membersList = $("#members");
    members.forEach(function (member) {
      // Exclude members that have sizing data
      console.log(member.id);
      if (!memberIdsWithSizing.includes(String(member.id))) {
        const option = `<option value="${member._id}">${member.name}</option>`;
        membersList.append(option);
      }
    });
  });
}

//handle submit sizing form
$("#estimate").submit(async function (event) {
  event.preventDefault();

  const selectedMemberId = $("#members").val();
  const sizing = $("#estimation-size").val();
  const selectedMemberName = $("#members option:selected").text();
  if (!sizing || !selectedMemberName) {
    return;
  }
  try {
    // Fetch the card, list, and board IDs
    const card = await t.card("id");
    const list = await t.list("id");
    const board = await t.board("id");

    // Send the data to the backend
    const data = {
      member: {
        memberId: selectedMemberId,
        sizing: sizing,
        date: new Date(), //the current date
      },
      cardId: card.id,
      listId: list.id,
      boardId: board.id,
    };

    const response = await fetch(`${API_URL}/cards/`, {
      // Replace '/your-endpoint' with your actual endpoint
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      console.log("Success:", await response.json());
      t.closePopup();
    } else {
      console.error("Server responded with status", response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
