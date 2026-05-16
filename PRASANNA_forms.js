// ============================================================
// PRASANNA_forms.js
// CMPSC 3323 – Assignment 5: HTML Forms
// ============================================================


// ── Utility: reveal and fill the output box below a form ──
function showOutput(id, message) {
  var box = document.getElementById(id);
  box.textContent = message;
  box.classList.remove("hidden");
}


// ============================================================
// GRID A – Arithmetic Calculator
// ============================================================
document.getElementById("calcForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var num1     = parseFloat(document.getElementById("num1").value);
  var num2     = parseFloat(document.getElementById("num2").value);
  var operator = document.querySelector('input[name="operator"]:checked').value;

  // Guard against NaN
  if (isNaN(num1) || isNaN(num2)) {
    alert("Please enter valid numbers in both fields.");
    return;
  }

  var result;
  var label;

  switch (operator) {
    case "+":
      result = num1 + num2;
      label  = "Addition";
      break;
    case "-":
      result = num1 - num2;
      label  = "Subtraction";
      break;
    case "*":
      result = num1 * num2;
      label  = "Multiplication";
      break;
    case "/":
      // Protect against division by zero
      if (num2 === 0) {
        alert("Error: Division by zero is undefined!\nPlease enter a non-zero value for Number 2.");
        return;
      }
      result = num1 / num2;
      label  = "Division";
      break;
  }

  var msg = label + ": " + num1 + " " + operator + " " + num2 + " = " + result;

  alert("Arithmetic Result\n\n" + msg);
  showOutput("calcOutput", msg);
});


// ============================================================
// GRID B – Factorial Calculator
// ============================================================

// Recursive factorial helper
function computeFactorial(n) {
  if (n === 0 || n === 1) return 1;
  return n * computeFactorial(n - 1);
}

document.getElementById("factForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var n = parseInt(document.getElementById("factNum").value, 10);

  if (isNaN(n) || n < 0) {
    alert("Please enter a non-negative integer (0 or higher).");
    return;
  }
  if (n > 20) {
    alert("Please enter a number 20 or less to avoid overflow.");
    return;
  }

  var result = computeFactorial(n);

  // Build readable equation: 5! = 5 x 4 x 3 x 2 x 1 = 120
  var equation;
  if (n <= 1) {
    equation = n + "! = 1";
  } else {
    var parts = [];
    for (var i = n; i >= 1; i--) {
      parts.push(i);
    }
    equation = n + "! = " + parts.join(" x ") + " = " + result;
  }

  alert("Factorial Result\n\n" + equation);
  showOutput("factOutput", equation);
});


// ============================================================
// GRID C – Fibonacci Finder
// Transplanted & adapted from prasanna_javascript.js (Script 5)
// ============================================================

// Generates Fibonacci sequence up to index n (0-based array)
function getFibSequence(n) {
  var fibs = [];
  fibs[0] = 0;
  fibs[1] = 1;
  for (var i = 2; i <= n; i++) {
    fibs[i] = fibs[i - 1] + fibs[i - 2];
  }
  return fibs;
}

document.getElementById("fibForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var n = parseInt(document.getElementById("fibN").value, 10);

  if (isNaN(n) || n < 1) {
    alert("Please enter a positive integer (1 or higher).");
    return;
  }
  if (n > 75) {
    alert("Please enter a value of 75 or less to avoid precision issues.");
    return;
  }

  // fibs array is 0-based; F(1) maps to index 1
  var fibs  = getFibSequence(n);
  var result = fibs[n];

  // Show a short preview of the sequence (up to 10 terms)
  var preview = fibs.slice(0, Math.min(n + 1, 11)).join(", ");
  if (n > 10) preview += " ...";

  var msg =
    "F(" + n + ") = " + result + "\n" +
    "Sequence preview: " + preview;

  alert("Fibonacci Result\n\n" + msg);
  showOutput("fibOutput", msg);
});


// ============================================================
// GRID D – Min, Max & Range
// ============================================================
document.getElementById("rangeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var a = parseFloat(document.getElementById("rn1").value);
  var b = parseFloat(document.getElementById("rn2").value);
  var c = parseFloat(document.getElementById("rn3").value);

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    alert("Please enter valid numbers in all three fields.");
    return;
  }

  var maxVal   = Math.max(a, b, c);
  var minVal   = Math.min(a, b, c);
  var rangeVal = maxVal - minVal;

  var msg =
    "Numbers entered: " + a + ", " + b + ", " + c + "\n" +
    "Maximum : " + maxVal + "\n" +
    "Minimum : " + minVal + "\n" +
    "Range   : " + rangeVal;

  alert("Min / Max / Range\n\n" + msg);
  showOutput("rangeOutput", msg);
});


// ============================================================
// GRID E – Mailing List Sign-Up
// ============================================================
document.getElementById("mailingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  var firstName = document.getElementById("firstName").value.trim();
  var lastName  = document.getElementById("lastName").value.trim();
  var email     = document.getElementById("email").value.trim();
  var zipCode   = document.getElementById("zipCode").value.trim();

  // Validate ZIP: must be exactly 5 digits
  if (!/^\d{5}$/.test(zipCode)) {
    alert("Please enter a valid 5-digit ZIP Code (e.g. 12345).");
    return;
  }

  // Remove placeholder text on first real submission
  var placeholder = document.querySelector(".mailing-placeholder");
  if (placeholder) placeholder.remove();

  // Build the new entry div string and append with innerHTML +=
  var timestamp  = new Date().toLocaleTimeString();
  var entryString =
    '<div class="signup-entry">' +
      '<strong>' + firstName + " " + lastName + '</strong><br>' +
      'Email: ' + email + '<br>' +
      'ZIP Code: ' + zipCode + '<br>' +
      '<small style="color:#888;">Subscribed at ' + timestamp + '</small>' +
    '</div>';

  // Append (not replace) each new sign-up below the previous ones
  document.getElementById("mailingOutput").innerHTML += entryString;

  // Reset form fields after successful submission
  document.getElementById("mailingForm").reset();
});