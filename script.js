
// =====================================
// GOOGLE SHEETS DATABASE CONNECTION
// =====================================

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyC1KDfWLUReEe5QFoUi5ZA-lg2w9NEvDGu0sA5TnNTHIRcoD-JJJ_VUk1F1qVUzpCo5Q/exec";


// =====================================
// DOG BREED SEARCH FUNCTIONALITY
// =====================================

function filterBreeds() {

    const searchInput = document.getElementById("breedSearch");
    const filterSelect = document.getElementById("breedFilter");

    if (!searchInput || !filterSelect) return;

    const searchText = searchInput.value.toLowerCase();
    const selectedCategory = filterSelect.value;

    const breedCards = document.querySelectorAll(".breed-card");

    breedCards.forEach(function(card) {

        const breedName = card.querySelector("h3").textContent.toLowerCase();
        const breedDescription = card.querySelector("p").textContent.toLowerCase();
        const category = card.getAttribute("data-category");

        const matchesSearch =
            breedName.includes(searchText) ||
            breedDescription.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

}


// =====================================
// DOG BREED SEARCH EVENTS
// =====================================

const breedSearch = document.getElementById("breedSearch");
const breedFilter = document.getElementById("breedFilter");

if (breedSearch) {
    breedSearch.addEventListener("input", filterBreeds);
}

if (breedFilter) {
    breedFilter.addEventListener("change", filterBreeds);
}


// =====================================
// ADOPTION FORM MODAL
// =====================================

function adoptDog(dogName) {

    const selectedDog = document.getElementById("selectedDog");
    const adoptionModal = document.getElementById("adoptionModal");

    if (selectedDog) {
        selectedDog.value = dogName;
    }

    if (adoptionModal) {
        adoptionModal.style.display = "flex";
    }

}


function closeAdoptionForm() {

    const adoptionModal = document.getElementById("adoptionModal");

    if (adoptionModal) {
        adoptionModal.style.display = "none";
    }

}


// =====================================
// ADOPTION FORM - GOOGLE SHEETS
// =====================================

const adoptionForm = document.getElementById("adoptionForm");

if (adoptionForm) {

    adoptionForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const submitButton = adoptionForm.querySelector("button[type='submit']");

        const formData = {

            type: "adoption",

            name: document.getElementById("adopterName").value,

            email: document.getElementById("adopterEmail").value,

            phone: document.getElementById("adopterPhone").value,

            dog: document.getElementById("selectedDog").value,

            address: document.getElementById("adopterAddress").value

        };

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(formData)

        })

        .then(function() {

            alert("Application request sent! Please check Google Sheet to confirm it was saved.");

            adoptionForm.reset();

            closeAdoptionForm();

        })

        .catch(function(error) {

            console.error("Adoption Form Error:", error);

            alert("Application could not be sent. Please try again.");

        })

        .finally(function() {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Application";
            }

        });

    });

}


// =====================================
// CHATBOT OPEN / CLOSE
// =====================================

function toggleChatbot() {

    const chatbot = document.getElementById("chatbotBox");

    if (!chatbot) return;

    if (chatbot.style.display === "flex") {

        chatbot.style.display = "none";

    } else {

        chatbot.style.display = "flex";

    }

}


// =====================================
// CHATBOT MESSAGE FUNCTION
// =====================================

function sendMessage() {

    const input = document.getElementById("chatbotInput");
    const messages = document.getElementById("chatbotMessages");

    if (!input || !messages) return;

    const userText = input.value.trim().toLowerCase();

    if (userText === "") return;

    // USER MESSAGE

    const userMessage = document.createElement("p");

    userMessage.className = "user-message";

    userMessage.textContent = input.value;

    messages.appendChild(userMessage);

    input.value = "";

    let reply = "";

    
    // DOG FOOD

    if (
        userText.includes("food") ||
        userText.includes("eat") ||
        userText.includes("diet")
    ) {

        reply = "Dogs need a balanced diet with good quality dog food. Always provide fresh drinking water.";

    }


    // DOG EXERCISE

    else if (
        userText.includes("exercise") ||
        userText.includes("walk") ||
        userText.includes("play")
    ) {

        reply = "Dogs need daily exercise and playtime. Regular walks help keep them healthy and active.";

    }


    // DOG GROOMING

    else if (
        userText.includes("grooming") ||
        userText.includes("bath") ||
        userText.includes("clean")
    ) {

        reply = "Regular brushing, bathing when needed, nail trimming and ear cleaning help keep your dog healthy.";

    }


    // DOG HEALTH

    else if (
        userText.includes("health") ||
        userText.includes("sick") ||
        userText.includes("vet")
    ) {

        reply = "Regular veterinary checkups and vaccinations are important for your dog's health. Contact a veterinarian if your dog is unwell.";

    }


    // DOG ADOPTION

    else if (
        userText.includes("adoption") ||
        userText.includes("adopt") ||
        userText.includes("available")
    ) {

        reply = "You can visit our Adoption section to explore available dogs and submit an adoption application.";

    }


    // DOG BREEDS

    else if (
        userText.includes("breed") ||
        userText.includes("dog type") ||
        userText.includes("dog breeds")
    ) {

        reply = "We have 9 dog breeds: Golden Retriever, German Shepherd, Labrador, Beagle, Poodle, Siberian Husky, Pomeranian, Border Collie and Boxer. Visit our Dog Breeds section to explore them.";

    }


    // GREETING

    else if (
        userText.includes("hello") ||
        userText.includes("hi") ||
        userText.includes("hey")
    ) {

        reply = "Hello! Welcome to Dog Care & Pet Adoption. How can I help you?";

    }


    // THANK YOU

    else if (
        userText.includes("thank") ||
        userText.includes("thanks")
    ) {

        reply = "You're welcome! Feel free to ask me anything about dogs.";

    }


    // DEFAULT RESPONSE

    else {

        reply = "Sorry, I couldn't understand your question. You can ask me about dog food, exercise, grooming, health, adoption or dog breeds.";

    }


    // BOT REPLY

    setTimeout(function() {

        const botMessage = document.createElement("p");

        botMessage.className = "bot-message";

        botMessage.textContent = reply;

        messages.appendChild(botMessage);

        messages.scrollTop = messages.scrollHeight;

    }, 500);

    messages.scrollTop = messages.scrollHeight;

}


// =====================================
// CHATBOT ENTER KEY
// =====================================

const chatbotInput = document.getElementById("chatbotInput");

if (chatbotInput) {

    chatbotInput.addEventListener("keydown", function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();

        }

    });

}


// =====================================
// CONTACT FORM - GOOGLE SHEETS
// =====================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const submitButton = contactForm.querySelector("button[type='submit']");

        const formData = {

            type: "contact",

            name: contactForm.querySelector("input[type='text']").value,

            email: contactForm.querySelector("input[type='email']").value,

            subject: contactForm.querySelectorAll("input[type='text']")[1].value,

            message: contactForm.querySelector("textarea").value

        };

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        fetch(GOOGLE_SCRIPT_URL, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },

            body: JSON.stringify(formData)

        })

        .then(function() {

            alert("Message request sent! Please check Google Sheet to confirm it was saved.");

            contactForm.reset();

        })

        .catch(function(error) {

            console.error("Contact Form Error:", error);

            alert("Message could not be sent. Please try again.");

        })

        .finally(function() {

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send Message";
            }

        });

    });

}
