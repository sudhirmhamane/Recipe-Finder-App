// const search_Box = document.querySelector(".searchBox");
// const search_Btn = document.querySelector(".searchBtn");
// const recipe_Container = document.querySelector(".recipe-container");
// const recipe_Close_Btn = document.querySelector(".recipeCloseBtn");
// const recipe_Details_Content = document.querySelector(".recipe-details-content");


// const fetchRecipe = async (query) => {
//     recipe_Container.innerHTML ="<h2>Hey wait,Recipes are Started to Fetching...</h2>";
//     try {

//     const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
//     const responce = await data.json();

//     recipe_Container.innerHTML ="";
//     responce.meals.forEach(meal => {
//         const recipeDiv = document.createElement('div');
//         recipeDiv.classList.add('recipe');
//         recipeDiv.innerHTML = `
//             <img src= "${meal.strMealThumb}">
//             <h3>${meal.strMeal}</h3>
//             <p><span>${meal.strArea}</span> Dish</p>
//             <p>Belongs To <span>${meal.strCategory}</span> Category</p>
//         `

//         const button = document.createElement('button');
//         button.textContent = "View Recipe";
//         recipeDiv.appendChild(button);

//         button.addEventListener('click', () => {
//             openRecipePopup(meal);
//         });

//         recipe_Container.appendChild(recipeDiv);
//     });

//     } catch (error) {
//         recipe_Container.innerHTML ="<h2>Hey Sorry,Error in Fetching the Recipes.Please provide correct Recipe Name.</h2>";
//     }
// }


// const fetchIngredents = (meal) => {

//     let ingredientsList  = "";
//     for (let i=1; i<=20; i++){
//         const ingredient = meal[`strIngredient${i}`];

//         if(ingredient){
//             const measure = meal[`strMeasure${i}`];
//             ingredientsList += `<li>${measure} ${ingredient}</li>`
//         } else {
//             break;
//         }
//     }
//     return ingredientsList;
    
// }

// const openRecipePopup = (meal) => {

//     recipe_Details_Content.innerHTML = `
//         <h2 class="recipeName">${meal.strMeal}</h2>
//         <h3 class="racipeh3">Ingredients:</h3>
//         <ul class="ingredientList">${fetchIngredents(meal)}</ul>

//         <div class="recipeInstructions">
//             <h3>Instructions:</h3>
//             <p>${meal.strInstructions}</p>
//         </div>


//     `
//     recipe_Details_Content.parentElement.style.display = "block";

// };


// recipe_Close_Btn.addEventListener('click', () => {
//     recipe_Details_Content.parentElement.style.display = "none";
// });

// search_Btn.addEventListener('click', (e) =>{
//     e.preventDefault();
//     const searchInput = search_Box.value.trim();
//     if(!searchInput){
//         recipe_Container.innerHTML = `<h2>!!Type the Recipe Name in the search box.</h2>`;
//         return;
//     }
//     fetchRecipe(searchInput);
// });



const search_Box = document.querySelector(".searchBox");
const search_Btn = document.querySelector(".searchBtn");
const recipe_Container = document.querySelector(".recipe-container");
const recipe_Close_Btn = document.querySelector(".recipeCloseBtn");
const recipe_Details_Content = document.querySelector(".recipe-details-content");
const introSection = document.querySelector('.intro');
const mixed_Documentation = document.querySelector('.mixed-documentation');

const fetchRecipe = async (query) => {
    recipe_Container.innerHTML = "<h2>Hey wait,Recipes are Starting to Fetch...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();

        recipe_Container.innerHTML = "";
        
        // Hiding intro section once recipes are displayed
        if (response.meals) {
            introSection.style.display = 'none';
            mixed_Documentation.style.display = "none";

            response.meals.forEach(meal => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <img src="${meal.strMealThumb}">
                    <h3>${meal.strMeal}</h3>
                    <p><span>${meal.strArea}</span> Dish</p>
                    <p>Belongs To <span>${meal.strCategory}</span> Category</p>
                `;

                const button = document.createElement('button');
                button.textContent = "View Recipe";
                recipeDiv.appendChild(button);

                button.addEventListener('click', () => {
                    openRecipePopup(meal);
                });

                recipe_Container.appendChild(recipeDiv);
            });
        } else {
            recipe_Container.innerHTML = "<h2>Recipe not found. Please try another name.</h2>";
        }
    } catch (error) {
        recipe_Container.innerHTML = "<h2>Error fetching recipes. Please check the recipe name.</h2>";
    }
};


const fetchIngredents = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) => {
    recipe_Details_Content.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3 class="racipeh3">Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredents(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `;
    recipe_Details_Content.parentElement.style.display = "block";
};

// Close button and outside click listener
recipe_Close_Btn.addEventListener('click', () => {
    recipe_Details_Content.parentElement.style.display = "none";
});

document.addEventListener('click', (e) => {
    if (e.target === recipe_Details_Content.parentElement) {
        recipe_Details_Content.parentElement.style.display = "none";
    }
});

// Search button click event
search_Btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = search_Box.value.trim();
    if (!searchInput) {
        recipe_Container.innerHTML = "<h2>Type the recipe name in the search box.</h2>";
        return;
    }
    fetchRecipe(searchInput);
    search_Box.value = "";
});