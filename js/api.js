const getData = async(search) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data)
  displayData(data.drinks);
}
const displayData = (displayValue) => {
  const getDiv = document.getElementById('main-container');
  getDiv.innerHTML = '';
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
              <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
          </div>
      </div>
    `;
    getDiv.appendChild(createDiv);
  })
}
function searchData () {
  const inputField = document.getElementById('search-navbar');
  const getInputValue = inputField.value;
  getData(getInputValue);
}
document.getElementById('search-navbar').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    searchData();
  }
}) 