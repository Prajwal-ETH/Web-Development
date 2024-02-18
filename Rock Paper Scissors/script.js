// Select the necessary elements from the DOM
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image");

// Iterate over each option image
optionImages.forEach((image, index) => {
  // Add a click event listener to each image
  image.addEventListener("click", (e) => {
    // Add the "active" class to the clicked image
    image.classList.add("active");

    // Set initial images and result text
    userResult.src = cpuResult.src = "images/rock.png";
    result.textContent = "Wait...";

    // Remove the "active" class from other option images
    optionImages.forEach((image2, index2) => {
      if (index !== index2) {
        image2.classList.remove("active");
      }
    });

    // Add the "start" class to the game container
    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      // Remove the "start" class from the game container
      gameContainer.classList.remove("start");

      // Set the user image to the clicked option image
      userResult.src = e.target.querySelector("img").src;

      // Generate a random number between 0 and 2 for CPU choice
      let randomNumber = Math.floor(Math.random() * 3);
      let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
      // Set the CPU image to a random option from the array
      cpuResult.src = cpuImages[randomNumber];

      // Assign letter values to user and CPU choices
      let cpuValue = ["R", "P", "S"][randomNumber];
      let userValue = ["R", "P", "S"][index];

      // Define all possible outcomes in an object
      let outcomes = {
        RR: "Draw",
        RP: "Cpu",
        RS: "User",
        PP: "Draw",
        PR: "User",
        PS: "Cpu",
        SS: "Draw",
        SR: "Cpu",
        SP: "User",
      };

      // Determine the outcome based on user and CPU choices
      let outComeValue = outcomes[userValue + cpuValue];

      // Display the result
      result.textContent = userValue === cpuValue ? "Match Draw" : outComeValue === "User" ? "You Won!!" : "Cpu Won!!";

    }, 2500); // Delay the result display by 2.5 seconds
  });
});
