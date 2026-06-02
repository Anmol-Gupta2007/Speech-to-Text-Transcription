const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const output = document.getElementById("output");
const statusText = document.getElementById("status");

const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;

if (!SpeechRecognition) {
    alert("Speech Recognition is not supported in this browser.");
}

const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

startBtn.addEventListener("click", () => {
    recognition.start();
    statusText.textContent = "Status: Listening...";
});

stopBtn.addEventListener("click", () => {
    recognition.stop();
    statusText.textContent = "Status: Stopped";
});

recognition.onresult = (event) => {

    let transcript = "";

    for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript + " ";
    }

    output.value = transcript;
};

recognition.onerror = (event) => {
    statusText.textContent =
        "Error: " + event.error;
};

recognition.onend = () => {
    statusText.textContent = "Status: Idle";
};
