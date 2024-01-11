// Selectors

const app = document.querySelector("#app");
const inputForm = app.querySelector(".inputForm");
const productSelect = app.querySelector("#productSelect");
const quantityInput = app.querySelector("#quantityInput");
const recordGroup = app.querySelector("#recordGroup");
const recordTotal = app.querySelector("#recordTotal");
const printBtn = app.querySelector("#printBtn");
const manageProductBtn = app.querySelector("#manageProductBtn");
const productDrawer = app.querySelector("#productDrawer");
const productGroup = app.querySelector("#productGroup");
const closeDrawer = app.querySelector("#closeDrawer");
const productTemplate = app.querySelector("#productTemplate");
const newProductForm = app.querySelector("#newProductForm");

// Data

const Products = [
  {
    id: 1,
    name: "Apple",
    price: 500,
  },
  {
    id: 2,
    name: "Orange",
    price: 800,
  },
  {
    id: 3,
    name: "Banana",
    price: 400,
  },
  {
    id: 4,
    name: "Lemon",
    price: 300,
  },
  {
    id: 5,
    name: "Lime",
    price: 100,
  },
];

// Functions

// const productOption = (id, name) => {
//   const option = document.createElement("option");
//   option.innerText = name;
//   option.value = id;
//   return option;
// };

const productUi = ({ name, price }) => {
  const dProduct = productTemplate.content.cloneNode(true);
  dProduct.querySelector(".dProduct-name").innerText = name;
  dProduct.querySelector(".dProduct-price").innerText = price;
  return dProduct;
};

const productRender = (items) => {
  items.forEach((item) => {
    productSelect.append(new Option(item.name, item.id));
    productGroup.append(productUi(item));
  });
};

const calculateRecordTotal = () => {
  // let total = 0;
  // const els = app.querySelectorAll(".product-cost");
  // els.forEach((el) => (total += parseFloat(el.innerText)));

  const total = [...document.querySelectorAll(".product-cost")].reduce(
    (pv, cv) => pv + parseFloat(cv.innerText),
    0
  );

  recordTotal.innerText = total;
  return total;
};

const recordUi = (productId, productName, productPrice, quantity) => {
  const cost = productPrice * quantity;
  const tr = document.createElement("tr");
  tr.setAttribute("productId", `${productId}`);
  tr.className =
    " group odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";
  tr.innerHTML = `
    <td class="px-6 py-4 td-counter"></td>

     <td
       scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      ${productName}
    </td>
    <td class="px-6 py-4 text-end product-price">${productPrice}</td>
    <td class="px-6 py-4 text-end">
    <button class=" q-sub -translate-x-5 duration-200 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-x-0 bg-gray-100 rounded">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
     class="w-3 h-3 pointer-events-none">
     <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
     </svg>
    </button>
    <span class=" min-w-10 product-q"> ${quantity} </span>
    <button class=" q-add translate-x-5 duration-200 opacity-0 pointer-events-none group-hover:pointer-events-auto group-hover:opacity-100 group-hover:translate-x-0 bg-gray-100 rounded">
     <svg xmlns="http://www.w3.org/2000/svg" fill="none" 
     viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
     class="w-3 h-3 pointer-events-none">
     <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
     </svg>
    </button>
    </td>
    <td class="px-6 py-4 text-end relative">
    <span class=" product-cost">${cost}</span>
    <button 
    class="product-del mx-3 duration-200 pointer-events-none group-hover:pointer-events-auto opacity-0 group-hover:opacity-100 bg-gray-200 rounded absolute left-full group-hover:left-3/4">
     <svg xmlns="http://www.w3.org/2000/svg" 
     fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" 
     class="w-4 h-4 pointer-events-none active:scale-50">
     <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
     </svg>
    </button>
    </td>
            
    `;
  return tr;
};

// InitialRenders

productRender(Products);

// Handlers

const inputFormHandler = (event) => {
  event.preventDefault();
  // id => product => name,value
  const currentProduct = Products.find(
    (product) => product.id == productSelect.value
  );
  //   console.log(currentProduct);
  //   console.log(productSelect.value);
  //   console.log(quantityInput.valueAsNumber);

  const isExist = document.querySelector(
    `[productId = '${currentProduct.id}']`
  );

  if (isExist) {
    const existProductQ = isExist.querySelector(".product-q");
    const existProductPrice = isExist.querySelector(".product-price");
    const existProductCost = isExist.querySelector(".product-cost");
    existProductQ.innerText =
      parseInt(existProductQ.innerText) + quantityInput.valueAsNumber;
    existProductCost.innerText =
      existProductPrice.innerText * existProductQ.innerText;
    inputForm.reset();
    calculateRecordTotal();
  } else {
    recordGroup.append(
      recordUi(
        currentProduct.id,
        currentProduct.name,
        currentProduct.price,
        quantityInput.valueAsNumber
      )
    );

    inputForm.reset();
    calculateRecordTotal();
  }
};

const recordGroupHandler = (event) => {
  if (event.target.classList.contains("product-del")) {
    if (confirm("Are U sure to delete?")) {
      event.target.closest("tr").remove();
      calculateRecordTotal();
    }
  } else if (event.target.classList.contains("q-add")) {
    const currentRow = event.target.closest("tr");
    const currentRowQ = currentRow.querySelector(".product-q");
    const currentRowPrice = currentRow.querySelector(".product-price");
    const currentRowCost = currentRow.querySelector(".product-cost");
    currentRowQ.innerText = parseInt(currentRowQ.innerText) + 1;
    currentRowCost.innerText =
      currentRowPrice.innerText * currentRowQ.innerText;
    calculateRecordTotal();
  } else if (event.target.classList.contains("q-sub")) {
    const currentRow = event.target.closest("tr");
    const currentRowQ = currentRow.querySelector(".product-q");
    const currentRowPrice = currentRow.querySelector(".product-price");
    const currentRowCost = currentRow.querySelector(".product-cost");
    if (currentRowQ.innerText > 1) {
      currentRowQ.innerText = parseInt(currentRowQ.innerText) - 1;
      currentRowCost.innerText =
        currentRowPrice.innerText * currentRowQ.innerText;
      calculateRecordTotal();
    }
  }
};

const printBtnHandler = () => {
  print();
};

const productDrawerHandler = () => {
  productDrawer.classList.toggle("translate-x-full");
  productDrawer.classList.add("duration-200");
};

const newProductFormHandler = (event) => {
  event.preventDefault();
  const formData = new FormData(newProductForm);
  // console.log(formData.get("new_product_name"));
  // console.log(formData.get("new_product_price"));
  const newProduct = {
    id: Date.now(),
    name: formData.get("new_product_name"),
    price: formData.get("new_product_price"),
  };
  productGroup.append(productUi(newProduct));
  productSelect.append(new Option(newProduct.name, newProduct.id));
  Products.push(newProduct);
};

// Listeners

inputForm.addEventListener("submit", inputFormHandler);
recordGroup.addEventListener("click", recordGroupHandler);
printBtn.addEventListener("click", printBtnHandler);
manageProductBtn.addEventListener("click", productDrawerHandler);
closeDrawer.addEventListener("click", productDrawerHandler);
newProductForm.addEventListener("submit", newProductFormHandler);
