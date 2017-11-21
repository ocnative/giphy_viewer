// From learn.jquery.com:
  // A page can't be manipulated safely until the document is "ready." jQuery detects this state of readiness for you.
  //  Code included inside $(document ).ready() will only run once the page DOM is ready for JavaScript code to execute.
  // This is an anonymous function because there is no valur inside the () of function()
  // callback function will call back .ready
$(document).ready(function() {

// Create your array of animals already on the HTML page when it loads.
  var animals = [
    "dog", "cat", "kitten", "puppy", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla", "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara",
// BIG QUESTIONS:
//When I add "teacup pig", etc. after "serval", the items after serval are white, not green. This is also true if I switch places between serval and teacup pig.
    "serval",
    "teacup pig", "salamander", "frog"
  ];

// Create buttons, add them to HTML page.
  //  Parameters:
    //  arrayToUse: The array of your animals.
    //  classToAdd: The class used for event handlers. In this case, it links the code to any button clicks through any element using class = classToAdd.
    //  areaToAddTo:  Defines where on the page to place newly created buttons.
    function populateButtons(arrayToUse, classToAdd, areaToAddTo) {
    // $(areaToAddTo) is a jQuery method.
    // Here we use it to define where on the page to place newly created buttons.
    // Each time tthe next line runs, it clears the child elements from the element with ID equal to areaToAddTo.
    $(areaToAddTo).empty();

    // arrayToUse gets defined as the variable "animals".
      for (var i = 0; i < arrayToUse.length; i++) {
    // var a is jQuery shorthand for document.createElement ("button")
        var a = $("<button>");
    // These methods("a.addClass", etc.) are jQuery shorthand methods available on object "a" because we used the $ syntax when creating var a above.
        a.addClass(classToAdd);
        // Sets new attribute "data-type" to "animals", which is the "arrayToUse".
        a.attr("data-type", arrayToUse[i]);
        // Sets new attribute "text" to the current index value of "animals", which is the "arrayToUse".
        a.text(arrayToUse[i]);
        // This appends a new button (value of var a) into the element specified by areaToAddTo.
        $(areaToAddTo).append(a);
      }

  }
  // In ".animal-button" the . denotes that "animal button" is a class.
  $(document).on("click", ".animal-button", function() {
    // #animals tells us that "animals" is a unique element ID.
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    // "$(this)" is the currently clicked button.
    var type = $(this).attr("data-type");
    // You can type http://api.giphy.com/v1/gifs/search?q=squirrel&api_key=dc6zaTOxFJmzC&limit=12 into a browser address bar and it will return the data for your GIFs instead of the GIFs themselves.
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=12";

// jQuery shorthand for the ajax method to request for the URL that is the vaue of the var queryURL defined above.
    $.ajax({
      url: queryURL,
      method: "GET"
    })

// ".done" is a jQuery method. It allows you to attach multiple handlers before or after it's processed and they will all execute. This prevents you from having to squeeze everything into a single function.
    .done(function(response) {
      var results = response.data;
      console.log(results)
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div class=\"animal-item\">");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var animated = results[i].images.fixed_height.url;
        var still = results[i].images.fixed_height_still.url;

        var animalImage = $("<img>");
        animalImage.attr("src", still);
        animalImage.attr("data-still", still);
        animalImage.attr("data-animate", animated);
        animalImage.attr("data-state", "still");
        animalImage.addClass("animal-image");

        animalDiv.append(p);
        animalDiv.append(animalImage);

        $("#animals").append(animalDiv);
      }
    });
  });

  // Change from Still to Animate or vice versa.
  $(document).on("click", ".animal-image", function() {

    var state = $(this).attr("data-state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
    else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

  // QUESTIONS: How do I delete an animal?
  $("#add-animal").on("click", function(event) {
    event.preventDefault();
    var newAnimal = $("input").eq(0).val();

    if (newAnimal.length > 2) {
      animals.push(newAnimal);
    }
// Reflls the buttons on the page. (We called "empty" on $(areaToAddTo) way at the top.
    populateButtons(animals, "animal-button", "#animal-buttons");

  });
// QUESTIONS:I know that this is the same command as above, and I know that they are in different scopes. Why?
  populateButtons(animals, "animal-button", "#animal-buttons");
});
