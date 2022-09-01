// Search By Name 
const getData = async(search, dataLimit) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.drinks, dataLimit);
}
// Button Click By ID 
const modalData = async(idDrink) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`;
  const res = await fetch(url);
  const data = await res.json();
  getModal(data.drinks[0])
}
getData('a', 10)
// Set Inner HTML of Search Data 
const displayData = (displayValue, dataLimit) => {
  const getDiv = document.getElementById('main-container');
  getDiv.innerHTML = '';
  const warningMessage = document.getElementById('warning-message');
  if (!displayValue) {
    warningMessage.classList.remove('hidden');
    spinner(false);
    const button = document.getElementById('show-all-btn');
    button.classList.add('hidden');
    const searchField = document.getElementById('search-navbar');
    searchField.value = '';
  } else {
    warningMessage.classList.add('hidden');
    if (dataLimit && displayValue.length > 10) {
      displayValue = displayValue.slice(0, 12);
      const getShowAllButton = document.getElementById('show-all-btn');
      getShowAllButton.classList.remove('hidden')
    }
    displayValue.forEach(items => {
      const createDiv = document.createElement('div');
      createDiv.innerHTML = `
        <div class="flex justify-center">
            <div class="rounded-lg shadow-lg bg-white max-w-sm">
              <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                <img class="rounded-t-lg" src="${items.strDrinkThumb}" alt=""/>
              </a>
              <div class="p-6">
                <h5 class="text-gray-900 text-xl font-medium mb-2">${items.strGlass}</h5>
                <p class="text-gray-700 text-base mb-4">
                  ${items.strInstructions.slice(0, 80)}
                </p>
                <button type="button" onclick="modalData(${items.idDrink})"
                class="inline-block px-4 py-2.5 bg-red-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-600 hover:shadow-lg focus:bg-red-900 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-700 active:shadow-lg transition duration-150 ease-in-out"
                data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                Get Detail
                </button>
              </div>
            </div>
        </div>
      `;
      getDiv.appendChild(createDiv);
    })
    spinner(false);
  }
}
// Set Inner HTML of Modal Data 
const getModal = items => {
  const modalBody = document.getElementById('modal-body');
  const createModalBody = document.createElement('div');
  modalBody.innerHTML = '';
  createModalBody.innerHTML = `
    <div class="w-3/4">
      <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
            Item ID
          </th>
          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Ingredient 01
          </th>
          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Ingredient 02
          </th>
          <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
          Ingredient 03
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-b">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><span class="text-red-700">${items.idDrink}</span></td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <span class="text-red-700 font-bold">${items.strIngredient1}</span>
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <span class="text-red-700 font-bold">${items.strIngredient2}</span>
          </td>
          <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
            <span class="text-red-700 font-bold">${items.strIngredient3}</span>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
  `;
modalBody.appendChild(createModalBody);
}
// Function of Data Limit 
function searchData (dataLimit) {
  const inputField = document.getElementById('search-navbar');
  const getInputValue = inputField.value;
  getData(getInputValue, dataLimit);
}
// Function of Enter Key 
document.getElementById('search-navbar').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    spinner(true);
    searchData(12);
  }
})
// Show All Button Function 
document.getElementById('show-all-btn').addEventListener('click', () => {
  searchData();
  const fieldValue = document.getElementById('search-navbar');
  fieldValue.value = '';
  let count = 0;
  count++;
  if (count === 1) {
    const button = document.getElementById('show-all-btn');
    button.classList.add('hidden');
  }
})
// Spinner Function 
const spinner = (isSpin) => {
  const spinDiv = document.getElementById('spinner');
  if (isSpin === true) {
    spinDiv.classList.remove('hidden');
  } else {
    spinDiv.classList.add('hidden');
  }
}