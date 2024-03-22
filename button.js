// Get references to the buttons
let homeButton = document.getElementById("home_button");
let projectsButton = document.getElementById("projects_button");
let resumeButton = document.getElementById("resume_button");
let aboutMeButton = document.getElementById("about_me_button");

// Add onclick event listeners
homeButton.addEventListener("click", function() {
    window.location.href = "main.html"; 
});

projectsButton.addEventListener("click", function() {
    window.location.href = "projects.html";
});

resumeButton.addEventListener("click", function() {
    window.location.href = "test.html";
});

aboutMeButton.addEventListener("click", function() {
    window.location.href = "about.html";
});
