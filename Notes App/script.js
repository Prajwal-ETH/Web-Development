// Selecting the notes container and the create button
const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

// Function to display notes from local storage
function showNotes() {
    notesContainer.innerHTML = localStorage.getItem("notes");
}
showNotes();

// Function to update local storage with notes
function updateStorage() {
    localStorage.setItem("notes", notesContainer.innerHTML);
}

// Event listener for the create button
createBtn.addEventListener("click", () => {
    // Creating a new paragraph element for the note input
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    
    // Setting class names and attributes for the input box and delete button
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "images/delete.png";
    img.className = "delete-btn";
    
    // Appending the delete button to the input box
    inputBox.appendChild(img);
    
    // Appending the input box to the notes container
    notesContainer.appendChild(inputBox);
    
    // Moving the cursor to the end of the input box
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(inputBox);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
});

// Event listener for clicks within the notes container
notesContainer.addEventListener("click", function(e) {
    // Handling click events on the delete button
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateStorage();
    } 
    // Handling keyup events within the note input boxes
    else if (e.target.tagName === "P") {
        notes = document.querySelectorAll(".input-box");
        notes.forEach(nt => {
            nt.onkeyup = function() {
                updateStorage();
            }
        });
    }
});

// Event listener for keyboard events (handling Enter key)
document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
