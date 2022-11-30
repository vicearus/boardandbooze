var drinksKey = "1";
var drinksUrl =
  "https://www.thecocktaildb.com/api/json/v2/" + drinksKey + "/random.php";
var gamesKey = "ev1uDl61ro";
var numPlayers;
var gamesUrl;
var favedGame
var savedGameUrl =
  "https://api.boardgameatlas.com/api/search?list_name=" +
  favedGame +
  "&client_id=" +
  gamesKey;
var favedDrink
var savedDrinkUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + favedDrink

// Function to fetch drink API
function fetchDrink(drinksUrl) {
  fetch(drinksUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      drinkData = [data.drinks[0]];
      // Place drink image
      var drinkPic = document.getElementById("drinkpic");
      drinkPic.style.display =  "inline-block";
      drinkPic.setAttribute("src", data.drinks[0].strDrinkThumb);
      // Place drink instructions
      var drinkInstruc = document.getElementById("drinkdscrpt");
      drinkInstruc.textContent = data.drinks[0].strInstructions;
      //Fetch ingredients
      ingredientArray = [
        drinkData[0].strIngredient1,
        drinkData[0].strIngredient2,
        drinkData[0].strIngredient3,
        drinkData[0].strIngredient4,
        drinkData[0].strIngredient5,
        drinkData[0].strIngredient6,
        drinkData[0].strIngredient7,
        drinkData[0].strIngredient8,
        drinkData[0].strIngredient9,
        drinkData[0].strIngredient10,
        drinkData[0].strIngredient11,
        drinkData[0].strIngredient12,
        drinkData[0].strIngredient13,
        drinkData[0].strIngredient14,
        drinkData[0].strIngredient15,
      ];
      measureArray = [
        drinkData[0].strMeasure1,
        drinkData[0].strMeasure2,
        drinkData[0].strMeasure3,
        drinkData[0].strMeasure4,
        drinkData[0].strMeasure5,
        drinkData[0].strMeasure6,
        drinkData[0].strMeasure7,
        drinkData[0].strMeasure8,
        drinkData[0].strMeasure9,
        drinkData[0].strMeasure10,
        drinkData[0].strMeasure11,
        drinkData[0].strMeasure12,
        drinkData[0].strMeasure13,
        drinkData[0].strMeasure14,
        drinkData[0].strMeasure15,
      ];
      ingredientList = document.getElementById("ingredList");
      ingredients = [];
      for (i = 0; i < ingredientArray.length; i++) {
        if (ingredientArray[i] == null) {
          break;
        } else {
          ingredients.push(ingredientArray[i] + ": " + "\n" + measureArray[i]);
        }
        string = ingredients.join("<br />");
        ingredientList.innerHTML = string;
      }
      drinkId = data.drinks[0].idDrink;
      drinkName = data.drinks[0].strDrink;

       //display btns
       var drinkDBtn = document.getElementById("drinkBtnD");
       drinkDBtn.style.display = "inline-block";
       var savedrinkBtn = document.getElementById("saveDrink");
       savedrinkBtn.style.display = "inline-block";

      // Display drink name
      document.getElementById("drink-title").textContent =
        data.drinks[0].strDrink;
    });
}
//global variables for storage
var gameName;
var gameId;
function fetchGame(gamesUrl) {
  fetch(gamesUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
      // Place board game image
      var gamePic = document.getElementById("gamepic");
      gamePic.style.display = "inline-block";
      gamePic.setAttribute("src", data.games[0].image_url);
      // Place board game description
      var gameDescrip = document.getElementById("gamedscrpt");
      gameDescrip.textContent = data.games[0].description_preview;
      gameName = data.games[0].name
      gameId = data.games[0].id
      // Display game name
      document.getElementById("board-game-title").textContent = data.games[0].name
      //display btns
      var gameDBtn = document.getElementById("gameBtnD");
      gameDBtn.style.display = "inline-block";
      var saveGameBtn = document.getElementById("saveGame");
      saveGameBtn.style.display = "inline-block";
    })
}

// Push savegame into array, save that to local storage, then pull those on page load, and use fetch requests to make favorites list
var gamesStorage
if (localStorage.getItem("Saved Games") !== null) {
  random = localStorage.getItem("Saved Games");
  gamesStorage = random.split(",")
  loadFavoriteGames()
} else {
var gamesStorage = []
}

function saveGame() {
  if (gamesStorage.includes(gameName) === true) {
    return
  }
  else {
    gamesStorage.push(gameName)
    localStorage.setItem("Saved Games", JSON.stringify(gamesStorage))
    favoriteGame = document.createElement("li")
    document.getElementById("savedGames").append(favoriteGame)
    favoriteGame.textContent = gameName
    favoriteGame.setAttribute("id", gameName)
    var clearSpan = document.createElement("span");
    clearSpan.textContent = "ⓧ  "
    clearSpan.setAttribute("class", "clear-btn")
    favoriteGame.prepend(clearSpan)
  }
}

function loadFavoriteGames() {
  gamesStorage = JSON.parse(localStorage.getItem("Saved Games"))
  for (i = 0; i < gamesStorage.length; i++) {
    favoriteGame = document.createElement("li")
    document.getElementById("savedGames").append(favoriteGame)
    favoriteGame.textContent = gamesStorage[i]
    favoriteGame.setAttribute("id", gamesStorage[i])
    var clearSpan = document.createElement("span");
    clearSpan.textContent = "ⓧ  "
    clearSpan.setAttribute("class", "clear-btn")
    favoriteGame.prepend(clearSpan)
  }
}

function fetchSavedGame() {
  fetchGame(savedGameUrl);
}

// Define variable for use in storing drinks in local storage and under favorites
var drinkStorage;
if (localStorage.getItem("Drink Name") !== null) {
  drinkStorage = JSON.parse(localStorage.getItem("Drink Name"));
} else {
  drinkStorage = [];
}

// Function to save drinks to local storage and favorites list
function saveDrink() {
  if (drinkStorage.includes(drinkName)) {
    return
  } else {
    drinkStorage.push(drinkName);
    localStorage.setItem("Drink Name", JSON.stringify(drinkStorage))
    favoriteDrink = document.createElement("li")
    document.getElementById("savedDrinks").append(favoriteDrink)
    favoriteDrink.textContent = drinkName;
    favoriteDrink.setAttribute("id", drinkName);
    var clearSpan = document.createElement("span");
    clearSpan.textContent = "ⓧ  "
    clearSpan.setAttribute("class", "clear-btn")
    favoriteDrink.prepend(clearSpan)
  }
}

// Populate favorites drink on page load
if (localStorage.getItem("Drink Name") !== null) {
  drinkStorage = JSON.parse(localStorage.getItem("Drink Name"));
  for (var i = 0; i < drinkStorage.length; i++) {
    favoriteDrink = document.createElement("li");
    document.getElementById("savedDrinks").append(favoriteDrink);
    favoriteDrink.textContent = drinkStorage[i];
    favoriteDrink.setAttribute("id", drinkStorage[i]);
    var clearSpan = document.createElement("span");
    clearSpan.textContent = "ⓧ  "
    clearSpan.setAttribute("class", "clear-btn")
    favoriteDrink.prepend(clearSpan)
  }
}

function fetchSavedDrink() {
  fetchDrink(savedDrinkUrl)
}

