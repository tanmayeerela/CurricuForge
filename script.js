// Theme Toggle
document.getElementById("themeToggle").addEventListener("click", function() {
    document.body.classList.toggle("light");
    const isDark = !document.body.classList.contains("light");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.innerText = isDark ? "🌙" : "☀️";
});

// Load theme from localStorage
window.addEventListener("DOMContentLoaded", function() {
    const theme = localStorage.getItem("theme") || "dark";
    if (theme === "light") {
        document.body.classList.add("light");
        document.getElementById("themeToggle").innerText = "☀️";
    }
});

function generate() {
    const subject = document.getElementById("subject").value.trim();
    const level = document.getElementById("level").value.trim();
    const duration = document.getElementById("duration").value.trim();
    const resultBox = document.getElementById("result");

    if (subject === "" || level === "" || duration === "") {
        resultBox.innerHTML = "<span class='error'>❌ Please fill all fields!</span>";
        return;
    }

    resultBox.innerHTML = "<span class='loading'>⏳ Generating curriculum...</span>";

    // Try localhost:8000 first
    const backendUrl = "http://localhost:8000/generate";

    fetch(backendUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            subject: subject,
            level: level,
            duration: duration
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.curriculum) {
            resultBox.innerHTML = `<div class='success'><strong>${data.subject} - ${data.level} (${data.duration})</strong></div>\n` + data.curriculum;
        } else {
            resultBox.innerHTML = "<span class='error'>❌ No curriculum generated. Try again.</span>";
        }
    })
    .catch(error => {
        console.error("Error:", error);
        resultBox.innerHTML = `<span class='error'>❌ Backend Error:</span><br>${error.message}<br><br>Make sure:<br>1. Backend is running on http://localhost:8000<br>2. Check browser console for details`;
    });
}

