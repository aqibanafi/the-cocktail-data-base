const getData = async(search, dataLimit) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data)
  displayData(data.drinks, dataLimit);
}
const displayData = (displayValue, dataLimit) => {
  const getDiv = document.getElementById('main-container');
  getDiv.innerHTML = '';
  const warningMessage = document.getElementById('warning-message');
  if (!displayValue) {
    warningMessage.classList.remove('hidden');
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
                  ${items.strInstructions.slice(0, 20)}
                </p>
                <button type="button" onclick="(${items.idDrink})"
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
    // Modal Body 
const modalBody = document.getElementById('modal-body');
const createModalBody = document.createElement('table');
createModalBody.innerHTML = `
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
      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${items.idDrink}</td>
      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        ${items.strIngredient1}
      </td>
      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        ${items.strIngredient2}
      </td>
      <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
        ${items.strIngredient3}
      </td>
    </tr>
  </tbody>
  </table>
`;
modalBody.appendChild(createModalBody);
  }
  
}

function searchData (dataLimit) {
  const inputField = document.getElementById('search-navbar');
  const getInputValue = inputField.value;
  getData(getInputValue, dataLimit);
}
document.getElementById('search-navbar').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchData(12);
  }
}) 
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