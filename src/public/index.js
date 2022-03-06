// const IP = "localhost";
const URL = "joycon-list.herokuapp.com";

const postOnClick = () => {
  $.ajax({
    type: "POST",
    url: "/post",
    data: {
      name: $("#name")[0].value,
      phone: $("#phone")[0].value,
      side: $("#select-side")[0].value,
      right: $("#right-series")[0].value,
      left: $("#left-series")[0].value,
      color: $("#color")[0].value,
      state: $("#select-state")[0].value,
    },
    success: (data) => {
      console.log(data.message);
      alert("Elemento agregado");
    },
    error: (jqXHR, textStatus, err) => {
      // alert(`text status ${textStatus} err ${err}`);
      alert("Error al enviar, por favor intentar nuevamente");
    },
  });
  // setTimeout(() => {
  //   getOnClick(`https://${IP}:8080/api/users`);
  // }, 500);
  setTimeout(() => {
    getOnClick(`https://${URL}/api/users/`);
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
      alert("No se pudo encontrar el registro");
    },
  });
};

const deleteOnClick = (url) => {
  $.ajax({
    url: url,
    type: "DELETE",
    success: (res) => {
      console.log("Element successfully removed");
      alert("Elemento eliminado exitosamente");
    },
    error: (jqXHR, textStatus, err) => {
      // alert(`text status ${textStatus} err ${err}`);
      alert("Error al eliminar, por favor intentar nuevamente");
    },
  });
  // setTimeout(() => {
  //   getOnClick(`https://${IP}:8080/api/users`);
  // }, 500);
  setTimeout(() => {
    getOnClick(`https://${URL}/api/users/`);
  }, 500);
};

const patchOnClick = (url) => {
  $.ajax({
    url: url,
    type: "PATCH",
    data: {
      name: $("#name-edit")[0].value,
      phone: $("#phone-edit")[0].value,
      side: $("#select-side-edit")[0].value,
      right: $("#right-series-edit")[0].value,
      left: $("#left-series-edit")[0].value,
      color: $("#color-edit")[0].value,
      state: $("#select-state-edit")[0].value,
    },
    success: (data) => {
      console.log(data.message);
      alert("Elemento editado exitosamente");
    },
    error: (jqXHR, textStatus, err) => {
      // alert(`text status ${textStatus} err ${err}`);
      alert("Error al editar, por favor intentar nuevamente");
    },
  });
  // setTimeout(() => {
  //   getOnClick(`https://${IP}:8080/api/users`);
  // }, 500);
  setTimeout(() => {
    getOnClick(`https://${URL}/api/users/`);
  }, 500);
};

// getOnClick(`https://${IP}:8080/api/users`);
getOnClick(`https://${URL}/api/users/`);

// $("#submit").click(() => {
//   postOnClick();
// });

// $("#search-submit").click(() => {
//   getOnClick(`https://${IP}:8080/api/users/${$("#search-input")[0].value}`);
// });

// $("#submit-edit").click(() => {
//   patchOnClick(`https://${IP}:8080/api/users/${$("#edit-input")[0].value}`);
// });

// $("#filter-submit").click(() => {
//   getOnClick(
//     `https://${IP}:8080/api/users?${$("#filter-type-select")[0].value}=${
//       $("#filter-select")[0].value
//     }`
//   );
// });

// $("#sort-submit").click(() => {
//   getOnClick(
//     `https://${IP}:8080/api/users?${$("#sort-type-select")[0].value}=${
//       $("#sort-select")[0].value
//     }`
//   );
// });

// function removeRow(oButton) {
//   let idToRemove = oButton.parentNode.parentNode.firstChild.innerText;
//   deleteOnClick(`https://${IP}:8080/api/users/${idToRemove}`);
// }

$("#search-submit").click(() => {
  getOnClick(`https://${URL}/api/users/${$("#search-input")[0].value}/`);
});

$("#submit-edit").click(() => {
  patchOnClick(`https://${URL}/api/users/${$("#edit-input")[0].value}/`);
});

$("#filter-submit").click(() => {
  getOnClick(
    `https://${URL}/api/users?${$("#filter-type-select")[0].value}=${
      $("#filter-select")[0].value
    }/`
  );
});

$("#sort-submit").click(() => {
  getOnClick(
    `https://${URL}/api/users?${$("#sort-type-select")[0].value}=${
      $("#sort-select")[0].value
    }/`
  );
});

function removeRow(oButton) {
  let idToRemove = oButton.parentNode.parentNode.firstChild.innerText;
  deleteOnClick(`https://${URL}/api/users/${idToRemove}/`);
}