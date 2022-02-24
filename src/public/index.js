const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const selectSideInput = document.getElementById("select-side");
const rightSeriesInput = document.getElementById("right-series");
const leftSeriesInput = document.getElementById("left-series");
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
const rightSeriesEdit = document.getElementById("right-series-edit");
const leftSeriesEdit = document.getElementById("left-series-edit");
const colorEdit = document.getElementById("color-edit");
const selectStateEdit = document.getElementById("select-state-edit");
const editSubmit = document.getElementById("submit-edit");
const filterTypeSelect = document.getElementById("filter-type-select");
const filterSelectInput = document.getElementById("filter-select");
const filterSubmit = document.getElementById("filter-submit");
const sortTypeSelect = document.getElementById("sort-type-select");
const sortSelect = document.getElementById("sort-select");
const sortSubmit = document.getElementById("sort-submit");

const IP = "192.168.1.138";

const postOnClick = () => {
  const name = nameInput.value;
  const phone = phoneInput.value;
  const selectSide = selectSideInput.value;
  const rightSeries = rightSeriesInput.value;
  const leftSeries = leftSeriesInput.value;
  const color = colorInput.value;
  const selectState = selectStateInput.value;
  $.ajax({
    type: "POST",
    url: "/post",
    data: {
      name: name,
      phone: phone,
      side: selectSide,
      right: rightSeries,
      left: leftSeries,
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
    getOnClick(`http://${IP}:8080/api/users`);
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
        addColumn();
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
    getOnClick(`http://${IP}:8080/api/users`);
  }, 500);
};

const patchOnClick = (url) => {
  const name = nameEdit.value;
  const phone = phoneEdit.value;
  const selectSide = selectSideEdit.value;
  const rightSeries = rightSeriesEdit.value;
  const leftSeries = leftSeriesEdit.value;
  const color = colorEdit.value;
  const selectState = selectStateEdit.value;
  $.ajax({
    url: url,
    type: "PATCH",
    data: {
      name: name,
      phone: phone,
      side: selectSide,
      right: rightSeries,
      left: leftSeries,
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
    getOnClick(`http://${IP}:8080/api/users`);
  }, 500);
};

getOnClick(`http://${IP}:8080/api/users`);
submit.onclick = () => postOnClick();
searchSubmit.onclick = () =>
  getOnClick(`http://${IP}:8080/api/users/${searchInput.value}`);

editSubmit.onclick = () =>
  patchOnClick(`http://${IP}:8080/api/users/${idToEditInput.value}`);

searchInput.addEventListener("change", () => {
  if (searchInput.value === "") {
    getOnClick(`http://${IP}:8080/api/users`);
  }
});

filterSubmit.onclick = () => {
  getOnClick(
    `http://${IP}:8080/api/users?${filterTypeSelect.value}=${filterSelectInput.value}`
  );
};

sortSubmit.onclick = () => {
  getOnClick(
    `http://${IP}:8080/api/users?${sortTypeSelect.value}=${sortSelect.value}`
  );
};

window.onload = () => {
  let deleteButton = document.querySelectorAll(".delete-button");
  deleteButton.forEach(item => {
    item.onclick = () => {
      let firstChildText = item.parentElement.parentElement.firstChild.innerText;
      deleteOnClick(`http://${IP}:8080/api/users/${firstChildText}`)
    }
  })
}