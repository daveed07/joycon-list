const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const selectSideInput = document.getElementById("select-side");
const colorInput = document.getElementById("color");
const selectStateInput = document.getElementById("select-state");
const submit = document.getElementById("submit");
const searchInput = document.getElementById("search-input");
const searchSubmit = document.getElementById("search-submit");
const removeInput = document.getElementById("remove-input");
const removeSubmit = document.getElementById("remove-submit");
const idToEditInput = document.getElementById("edit-input");
const nameEdit = document.getElementById("name-edit");
const phoneEdit = document.getElementById("phone-edit");
const selectSideEdit = document.getElementById("select-side-edit");
const colorEdit = document.getElementById("color-edit");
const selectStateEdit = document.getElementById("select-state-edit");
const editSubmit = document.getElementById("submit-edit");


const postOnClick = () => {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const selectSide = selectSideInput.value;
  const color = colorInput.value;
  const selectState = selectStateInput.value;
  $.ajax({
    type: "POST",
    url: "/send",
    data: {
      name: name,
      phone: phone,
      side: selectSide,
      color: color,
      state: selectState,
    },
    success: (data) => {
      console.log("message", data.message);
    },
    error: (jqXHR, textStatus, err) => {
      alert(`text status ${textStatus} err ${err}`);
    },
  });
  setTimeout(() => {
    getOnClick("http://localhost:8080/api/users");
  }, 500);
};

const getOnClick = (url) => {
  $.ajax({
    url: url,
    dataType: "json",
    type: "GET",
    success: (res) => {
      if (!res.users) {
        let arr = [res];
        CreateTableFromJSON(arr);
      } else {
        let arr = res.users;
        CreateTableFromJSON(arr);
      }
    },
    error: (jqXHR, textStatus, err) => {
      alert("Cannot find register");
    },
  });
};

const deleteOnClick = (url) => {
  $.ajax({
    url: url,
    type: "DELETE",
    success: (res) => {
      console.log("Element successfully removed");
    },
    error: (jqXHR, textStatus, err) => {
      alert(`text status ${textStatus} err ${err}`);
    },
  });
  setTimeout(() => {
    getOnClick("http://localhost:8080/api/users");
  }, 500);
};

const patchOnClick = (url) => {
  const name = nameEdit.value;
  const phone = phoneEdit.value;
  const selectSide = selectSideEdit.value;
  const color = colorEdit.value;
  const selectState = selectStateEdit.value;
  $.ajax({
    url: url,
    type: "PATCH",
    data: {
      name: name,
      phone: phone,
      side: selectSide,
      color: color,
      state: selectState,
    },
    success: (data) => {
      console.log("message", data.message);
    },
    error: (jqXHR, textStatus, err) => {
      alert(`text status ${textStatus} err ${err}`);
    },
  });
  setTimeout(() => {
    getOnClick("http://localhost:8080/api/users");
  }, 500);
};

getOnClick("http://localhost:8080/api/users");
submit.onclick = () => postOnClick();
searchSubmit.onclick = () =>
  getOnClick(`http://localhost:8080/api/users/${searchInput.value}`);
removeSubmit.onclick = () =>
  deleteOnClick(`http://localhost:8080/api/users/${removeInput.value}`);

editSubmit.onclick = () => patchOnClick(`http://localhost:8080/api/users/${idToEditInput.value}`)


searchInput.addEventListener('change', () => {
  if (searchInput.value === "") {
    getOnClick("http://localhost:8080/api/users");
  }
})