var characterLimit = 10000;
var characterCount = 0;
var morningPages = "";
const wrapper = document.querySelector(".input-wrapper"),
  textInput = document.querySelector("input[type='text']");

document.getElementById(
  "characterCount"
).innerHTML = characterLimit.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

// Move the cursor to the end whenever the text field is focused
var moveToEnd = function() {
  var fieldInput = $("#user-input");
  var fldLength = fieldInput.val().length;
  fieldInput.focus();
  fieldInput[0].setSelectionRange(fldLength, fldLength);
};


// Toggle Theme using jquery
// Problem to solve: prevent stylesheet from changing when user clicks within the form field

$("body").click(function(e) {
  if ($("link[id='theme']").attr("href") == "css/lighttheme.css" && !(e.target.tagName=="form")) {
    $("link[id='theme']").attr("href", "css/darktheme.css");
  } else if (!(e.target.id=="myForm")) {
    $("link[id='theme']").attr("href", "css/lighttheme.css");
  }
});


// Set state of window to focus on the text-input field
window.focus = true;
window.onblur = function() {
  focus = false;
};
window.onfocus = function() {
  focus = true;
};
document.onblur = window.onblur;
document.focus = window.focus;
// document.onclick = changeTheme();

// Define variables for ease of DOM manipulation
var input = document.querySelector("#user-input");
var textarea = document.querySelector("textInput");
var body = document.querySelector("body");
var container = document.querySelector(".vertical-center");
var inputWrapper = document.querySelector(".input-wrapper");

// Reset the text field
var reset = function() {
  var len = this.value.length;
  this.setSelectionRange(len, len);
};

// Event listeners to reset cursor to end of input when user clicks away then clicks back in
input.addEventListener("focus", reset, false);
input.addEventListener("click", reset, false);
input.addEventListener("mousedown", moveToEnd, false);
textInput.addEventListener("focus", reset, false);
textInput.addEventListener("click", reset, false);
textInput.addEventListener("mousedown", reset, false);

// Hide progress bar
function hideProgressBar() {
  var x = document.querySelector("progress");
  var z = document.getElementById("hideProgressBar");
  if (x.style.visibility == "hidden") {
    x.style.visibility = "visible";
    z.innerHTML = "hide progress bar";
  } else {
    x.style.visibility = "hidden";
    z.innerHTML = "show progress bar";
  }
}

// Define the resetButton, with which user can reset progress and start over by refreshing webpage
var resetButton = function() {
  location.reload();
};

// Hide statistics such as word count and most common words
document.getElementById("stats").className = "hide";

// Define what happens when the user clicks "Done" before hitting characterLimit
var clickDone = function() {
  document.getElementById("stats").className = "show";
  document.getElementById("done").style.display = "none";
  console.log("clicked");
};

// Create a timer by setting a START time and END time, then subtracting START from END
var formInitializationTime;
$("form input").bind("keydown change click", function() {
  // Set start time
  if (!formInitializationTime) {
    formInitializationTime = new Date();
  }

  // Set end time
  var myTime;
  $("#done").click(function() {
    myTime = new Date() - formInitializationTime;
  });

  // Ignore the 'enter' key when pressed so the user doesn't accidentally end the morning pages too soon.
  $("html").bind("keypress", function(e) {
    if ((e.keyCode == 224 || e.keyCode == 91) && e.keyCode == 13) {
      console.log("test is true");
      return clickDone;
    }
    if (e.keyCode == 13) {
      console.log("user clicked 'enter'");
      return false;
    }
  });

  // Create character count by repeatedly finding the length of the value of the .mp text field
  textInput.addEventListener("keyup", event => {
    wrapper.setAttribute("data-text", event.target.value);
    var myCount = document.getElementById("characterCount").innerHTML;
    characterCount = document.querySelector(".mp").value.length;
    morningPages = event.target.value;
    console.log("Morning pages: " + morningPages);
    var wordCount = morningPages.trim().split(/\s+/).length;
    // For some reason,  value.length doesn't like 0, so set that manually
    if (morningPages.length == 0) {
      wordCount = 0;
    }

    // Check to see if the character count has reached the character limit
    if (characterCount >= characterLimit) {
      document.getElementById("prompt").innerHTML = "Morning pages completed.";
      document.getElementById("done").style.backgroundColor = "gray";
      document.getElementById("done").style.backgroundColor = "white";
      document.getElementById("characterCount").style.color = "white";
    }

    // Print the word count to the console
    console.log("Word count: " + wordCount);

    // Set the HTML of character count to the number of characters remaining, but add commas to the numbers look more friendly
    document.getElementById("characterCount").innerHTML = (
      characterLimit - characterCount
    )
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // Set the progress bar value to characterCount
    document.querySelector("progress").value = characterCount;

    // Sort morning pages by most commonly used words
    function mode(arr) {
      arr = arr.sort(
        (a, b) =>
          arr.filter(v => v === b).length - arr.filter(v => v === a).length
      );
      return arr;
    }
    // Define an array of boring words that will be excluded from the mostCommonWords element
    var boringWords = [
      "the",
      "be",
      "to",
      "of",
      "and",
      "a",
      "in",
      "that",
      "have",
      "I",
      "it",
      "for",
      "not",
      "on",
      "with",
      "he",
      "as",
      "you",
      "do",
      "at",
      "this",
      "but",
      "his",
      "by",
      "from",
      "they",
      "we",
      "say",
      "her",
      "she",
      "or",
      "will",
      "an",
      "my",
      "one",
      "all",
      "would",
      "there",
      "their",
      "what",
      "so",
      "up",
      "out",
      "if",
      "about",
      "who",
      "get",
      "which",
      "go",
      "when",
      "me",
      "make",
      "can",
      "like",
      "time",
      "no",
      "just",
      "him",
      "know",
      "take",
      "person",
      "into",
      "year",
      "your",
      "good",
      "some",
      "could",
      "them",
      "see",
      "other",
      "than",
      "then",
      "now",
      "look",
      "only",
      "come",
      "its",
      "over",
      "think",
      "also",
      "back",
      "after",
      "use",
      "two",
      "how",
      "our",
      "work",
      "first",
      "well",
      "way",
      "even",
      "new",
      "want",
      "because",
      "any",
      "these",
      "give",
      "day",
      "most",
      "us"
    ];

    // Define mostCommonWords by splitting the array and filtering out the boringWords using an indexOf function.
    mostCommonWords = morningPages.split(" ").filter(function(item) {
      mostCommonWords = boringWords.indexOf(item) === -1;
      return mostCommonWords;
    });

    // Get rid of non-unique words
    var uniqueWords = mostCommonWords.filter(function(elem, index, self) {
      return index === self.indexOf(elem);
    });
    uniqueWords = uniqueWords.slice(0, 10);
    mostCommonWords = uniqueWords.join(" ").split();

    // Render the above variables to the DOM
    document.getElementById(
      "finalWordCount"
    ).innerHTML = wordCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById(
      "finalCharCount"
    ).innerHTML = characterCount
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    document.getElementById("mostCommonWords").innerHTML = mostCommonWords;
  });

  // Convert milliseconds to seconds and return myTime in minutes and seconds.
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);
    if (minutes == 0) {
      return seconds + " seconds";
    }
    return minutes + " minutes, " + seconds + " seconds";
  }
  myTime = msToTime(myTime);
  document.getElementById("timeElapsed").innerHTML = myTime;
});

// Attach clickDone to #done and resetButton to #resetButton
document.getElementById("done").addEventListener("click", clickDone);
document.getElementById("resetButton").addEventListener("click", resetButton);

// Set wordCount variable to the final word count
var wordCount = document.getElementById("finalWordCount").innerHTML;

// Define what happens when user clicks the download button using Blob
$("#downloadButton").click(function() {
  var text = $("#user-input").val();
  text =
    text +
    "\n \n Word count: " +
    document.getElementById("finalWordCount").innerHTML +
    "\n Character count: " +
    document.getElementById("characterCount").innerHTML +
    "\n Time elapsed: " +
    document.getElementById("timeElapsed").innerHTML +
    "\n Ten most frequently used words: " +
    document.getElementById("mostCommonWords").innerHTML;
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  today = mm + "-" + dd + "-" + yyyy;
  var filename = today + " Morning pages";
  var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  saveAs(blob, filename + ".txt");
});
