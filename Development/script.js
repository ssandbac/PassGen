// Assignment Code
var generateBtn = document.querySelector("#generate");

//Create list of available keys. Keep the list seperated by password requirements, AKA {uppers}, {lowers}, {numbers}, {specials}.
//Generate an empty string that we will add our available keys to later.
var passKeys = ("");
var passLength = ("");
var password = [""];

//create a string of each char type that we will combine based on user input.
var keyList = {
  lowerKeys: "abcdefghijklmnopqrstuvwxyz",
  upperKeys: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numKeys: "1234567890",
  specKeys: "!@#$%^&*()_+=-`~,./?<>",
}

//create an object with variables denoting the password requirements
var passRequirements = {
  passLength: "length", 
  passLower: false,
  passUpper: false, 
  passNum: false, 
  passSpec: false,
};

//write a prompt to ask the user for those variables
var passPrompt = function(){
  
 //ask for password length
  passLength = window.prompt("How long would you like your password? (Must Be Between 8-128 characters)");
  //check that it is a number, and only proceed if it is a number
    if (isNaN(passLength)) {
      window.alert( 'Not a Valid Number!');
      passPrompt();
    }
    if (passLength>128){
      window.alert( 'Password is too long!');
      passPrompt();
    }
    //cancel if user uses ESC
    if (!passLength) {
      window.alert( 'No password generated! Goodbye.');
     return;
    }
    if (passLength<8 ){
     window.alert( 'Password is too short!');
     passPrompt();
    }
  //confirming user character choices by updating the boolean
  passRequirements.passLower = window.confirm("Do you want Lower-Case Characters?");
  passRequirements.passUpper = window.confirm("Do you want Upper-Case Characters?");
  passRequirements.passNum = window.confirm("Do you want Number Characters?");
  passRequirements.passSpec = window.confirm("Do you want Special Characters?");

  if ( 
    passRequirements.passLower==false & 
    passRequirements.passUpper == false &
    passRequirements.passNum == false&
    passRequirements.passSpec == false){
      window.alert( 'You must select some characters!');
      passPrompt();
    }
  
 // create the super string of possible characters

 for(var i = 1; i < Object.keys(passRequirements).length; i++){

  if (passRequirements[Object.keys(passRequirements)[i]] == true){

    //keeps a running string of all posible passowrd keys by referencing the keyList object
    passKeys += keyList[Object.keys(keyList)[i-1]];
  }
 }
}
//split the possible password keys into an array that we will then use in our generation.
passKeys = passKeys.split("");

//Genertate password based on criteria collected.
//Run a for loop using RNG for the length of the user's selected password length, 
//selecting chars from the possible characters list.
function generatePassword(){
  for (i=0; i<passLength; i++){
    password += passKeys[Math.floor(Math.random()* passKeys.length)]
  
  };
};
// Write password to the #password input
function writePassword() {
  generatePassword();
  var passwordText = document.querySelector("#password");
  
  passwordText.value = password;
//Reset the saved password so that it can be regerated by clicking again.
  password = [""];
}
//call the code.
passPrompt();
//put the first password on the page.
writePassword();

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

