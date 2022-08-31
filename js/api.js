// By Default Product Display 
let spinner = document.getElementById('spinner');
const loadData = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(res => res.json())
    .then(data => displayData(data.drinks))
}
const displayData = displayAll =>{
    const amountOfDisplayData = displayAll;
    let showItems;
    if(amountOfDisplayData.length > 10) {
      showItems = amountOfDisplayData.slice(0, 10) 
    } else {
      displayAll
    }
    const getDiv = document.getElementById('product-div');
    getDiv.innerHTML = '';
    showItems.map(items =>{ 
      const createDiv = document.createElement('div');
      createDiv.innerHTML = `
      <div class="flex justify-center">
          <div class="rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <img class="rounded-t-lg" src="${items.strDrinkThumb}" alt=""/>
            </a>
            <div class="p-6">
              <h5 class="text-gray-900 text-xl font-medium mb-2">${items.strGlass}</h5>
              <p class="text-gray-700 text-base mb-4">
                ${items.strInstructions.slice(0, 100)}
              </p>
              <button type="button" class=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
            </div>
          </div>
      </div>
    `;
    getDiv.appendChild(createDiv);
    spinner.classList.add('hidden');
    }) 
}
loadData();
// Search Drinks By Name 
const searchData = () => {
  const getSearchField = document.getElementById('search-navbar');
  const getValue = getSearchField.value;
  getSearchField.value = '';
   const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${getValue}`
   fetch(url)
   .then(res => res.json())
   .then(data => displayData(data.drinks))
}
document.getElementById('search-navbar').addEventListener('keypress', function (e) {
    if(e.key === "Enter") {
      spinner.classList.remove('hidden');
      searchData()
    }
})
// See All Button Function 
document.getElementById('see-all').addEventListener('click', function() {
  fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a')
    .then(res => res.json())
    .then(data => displayData(data.drinks.slice(0, 100)))
  let count = 0;
  count++;
  if(count === 1) {
    const button = document.getElementById('hide-btn')
    button.classList.add('hidden')
  }
})