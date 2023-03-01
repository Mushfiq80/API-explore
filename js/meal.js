const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeals(data.meals))
}

const displayMeals = meals => {
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        console.log(meal)
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col');
        mealDiv.innerHTML = `
        <div class="col">
              <div class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${meal.strMeal}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  
                    <button onclick="loadMealDetail(${meal.idMeal})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetails">
                    Details
                    </button>
                </div>
              </div>
            </div>
        `
        mealContainer.appendChild(mealDiv);
    });
}

// const loadMealDetail = idMeal => {
//     const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
//     // console.log(idMeal)
//     fetch(url)
//     .then(res => res.json())
//     .then(data => displayMealDetails(data.meals[0]))
//     .catch(error => console.log(error))
// }

const loadMealDetail = async(idMeal) => {
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayMealDetails(data.meals[0]);
    }
    catch(error){
        console.log(error);
    }
}

const displayMealDetails = meal => {
    document.getElementById('mealDetailsLabel').innerText = meal.strMeal;
    const mealDetailsBody = document.getElementById('mealDetailsBody');
    mealDetailsBody.innerHTML = `
    <img class="img-fluid" src="${meal.strMealThumb}">
    `
}

const searchMeal = () => {
    // console.log('btn clicked')
    const searchText = document.getElementById('search-field').value;
    // search meal 
    console.log(searchText);
    loadMeals(searchText);
}

loadMeals('fish');