var productInputName = document.getElementById("productName");
var productInputPrice = document.getElementById("productPrice");
var productInputCategory = document.getElementById("productCategory");
var productInputDescription = document.getElementById("productDescription");
var productInputImage = document.getElementById("productImage");
var searchInput = document.getElementById("searchItem");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");
var index = 0;

var productList = [];

if (localStorage.getItem("productsContainer") !== null) {
  productList = JSON.parse(localStorage.getItem("productsContainer"));
  displayData();
}
// Add Prouduct
function addProduct() {
  if (
    validationInputs(productInputName, "msgName") &&
    validationInputs(productInputPrice, "msgPrice") &&
    validationInputs(productInputCategory, "msgCategory") &&
    validationInputs(productInputDescription, "msgDescription") 
    // validationInputs(productInputImage, "msgImage")
  ) {
    var Product = {
      name: productInputName.value,
      price: productInputPrice.value,
      category: productInputCategory.value,
      description: productInputDescription.value,
      image: productInputImage.files[0]?.name 
        ? `images/${productInputImage.files[0]?.name}` // ternary operation
        : "images/1.jpg"
    };
    productList.push(Product);
    localStorage.setItem("productsContainer", JSON.stringify(productList));

    clearForm();
    displayData();
  }
}
// Clear Form
function clearForm() {
  (productInputName.value = null),
    (productInputPrice.value = null),
    (productInputCategory.value = null),
    (productInputDescription.value = null),
    (productInputImage.value = null);

  productInputName.classList.remove("is-valid");
  productInputPrice.classList.remove("is-valid");
  productInputCategory.classList.remove("is-valid");
  productInputDescription.classList.remove("is-valid");
  productInputImage.classList.remove("is-valid");
}
// Delete Item
function deleteItem(indexItem) {
  productList.splice(indexItem, 1);
  localStorage.setItem("productsContainer", JSON.stringify(productList));
  displayData();
}
// Display Data & SearchItem
function displayData() {
  var term = searchInput.value;

  var container = "";
  for (i = 0; i < productList.length; i++) {
    if (
      productList[i].name.toLowerCase().includes(term.toLowerCase()) == true
    ) {
      container += `
          <tr>
          <td>${i + 1}</td>
          <td>${productList[i].name}</td>
          <td>${productList[i].price}</td>
          <td>${productList[i].category}</td>
          <td>${productList[i].description}</td>
          <td>
            <img width="80px" src="${productList[i].image}" alt="Product">
          </td>
          <td>
            <button onClick="setformUpdate(${i})" class="btn btn-outline-warning btn-sm">Update</button>
            <button onClick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
          </td>
          </tr>
    `;
    }
  }
  document.getElementById("tableData").innerHTML = container;
}

// validationInputs    {Advanced}
function validationInputs(element, msgId) {
  var text = element.value;
  var regex = {
    productName: /^[A-Z]?[a-z]{3,9}[1-9]?[0-9]?$/gim,
    productPrice: /^[1-9]{3,8}$/gim,
    productCategory: /^(Tv|Mobile|Screens|Electronic)$/gim,
    productDescription: /^.{3,}$/m
    // productImage: /^.{1,}\.(jpg|png|avif|jpeg|svg)$/m
  };
  var msg = document.getElementById(msgId);
  if (regex[element.id].test(text) == true) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}

function setformUpdate(indexElement) {
  productInputName.value = productList[indexElement].name
  productInputPrice.value = productList[indexElement].price
  productInputCategory.value = productList[indexElement].category
  productInputDescription.value = productList[indexElement].description

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");

  index = indexElement;
}

function updateData() {
  var Product = {
    name: productInputName.value,
    price: productInputPrice.value,
    category: productInputCategory.value,
    description: productInputDescription.value,
    image: productInputImage.files[0]?.name
        ? `images/${productInputImage.files[0]?.name}`
        : "images/1.jpg"
  };
  productList.splice(index , 1 , Product);

  localStorage.setItem("productsContainer", JSON.stringify(productList));
  clearForm();
  displayData();

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add ("d-none");

}

// // validationName
// function validationName() {
//   var text = productInputName.value;
//   var regex = /^[A-Z]?[a-z]{3,9}[1-9]?[0-9]?$/gim;
//   var msgNameElement = document.getElementById("msgName");
//   if (regex.test(text) == true) {
//     productInputName.classList.add("is-valid");
//     productInputName.classList.remove("is-invalid");
//     msgNameElement.classList.add("d-none");
//     return true;
//   } else {
//     productInputName.classList.add("is-invalid");
//     productInputName.classList.remove("is-valid");
//     msgNameElement.classList.remove("d-none");
//     return false;
//   }
// }

// // validationPrice
// function validationPrice() {
//   var text = productInputPrice.value;
//   var regex = /^[1-9]{3,8}$/gim;
//   var msgPriceElement = document.getElementById("msgPrice");
//   if (regex.test(text) == true) {
//     productInputPrice.classList.add("is-valid");
//     productInputPrice.classList.remove("is-invalid");
//     msgPriceElement.classList.add("d-none");
//     return true;
//   } else {
//     productInputPrice.classList.add("is-invalid");
//     productInputPrice.classList.remove("is-valid");
//     msgPriceElement.classList.remove("d-none");
//     return false;
//   }
// }

// // validationCategory
// function validationCategory() {
//   var text = productInputCategory.value;
//   var regex = /^(Tv|Mobile|Screens|Electronic)$/gim;
//   var msgCategoryElement = document.getElementById("msgCategory");
//   if (regex.test(text) == true) {
//     productInputCategory.classList.add("is-valid");
//     productInputCategory.classList.remove("is-invalid");
//     msgCategoryElement.classList.add("d-none");
//     return true;
//   } else {
//     productInputCategory.classList.add("is-invalid");
//     productInputCategory.classList.remove("is-valid");
//     msgCategoryElement.classList.remove("d-none");
//     return false;
//   }
// }

// // validationDescription
// function validationDescription() {
//   var text = productInputDescription.value;
//   var regex = /^.{3,}$/m;
//   var msgDescriptionElement = document.getElementById("msgDescription");
//   if (regex.test(text) == true) {
//     productInputDescription.classList.add("is-valid");
//     productInputDescription.classList.remove("is-invalid");
//     msgDescriptionElement.classList.add("d-none");
//     return true;
//   } else {
//     productInputDescription.classList.add("is-invalid");
//     productInputDescription.classList.remove("is-valid");
//     msgDescriptionElement.classList.remove("d-none");
//     return false;
//   }
// }

// //validationImage
// function validationImage() {
//   var text = productInputImage.value;
//   var regex = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/m;
//   var msgImageElement = document.getElementById("msgImage");
//   if (regex.test(text) == true) {
//     productInputImage.classList.add("is-valid");
//     productInputImage.classList.remove("is-invalid");
//     msgImageElement.classList.add("d-none");
//     return true;
//   } else {
//     productInputImage.classList.add("is-invalid");
//     productInputImage.classList.remove("is-valid");
//     msgImageElement.classList.remove("d-none");
//     return false;
//   }
// }

// // Display Data Only
// function displayData() {
//   var container = "";
//   for (i = 0; i < productList.length; i++) {
//     container += `
//           <tr>
//           <td>${i + 1}</td>
//           <td>${productList[i].name}</td>
//           <td>${productList[i].price}</td>
//           <td>${productList[i].category}</td>
//           <td>${productList[i].description}</td>
//           <td>
//             <img width="80px" src="${productList[i].image}" alt="Product">
//           </td>
//           <td>
//             <button class="btn btn-outline-warning btn-sm">Update</button>
//             <button onClick="deleteItem(${i})" class="btn btn-outline-danger btn-sm">Delete</button>
//           </td>
//           </tr>
//     `;
//   }
//   document.getElementById("tableData").innerHTML = container;
// }
