function previewImage() {
    let input = document.getElementById("injuryImage");
    let preview = document.getElementById("preview");

    if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };
        reader.readAsDataURL(input.files[0]);
    } else {
        preview.style.display = "none";
    }
}

function uploadImage() {
    let file = document.getElementById("injuryImage").files[0];
    if (!file) {
        alert("Please upload an image.");
        return;
    }

    let formData = new FormData();
    formData.append("image", file);

    document.getElementById("result").innerHTML = "<p>🔄 Analyzing Image... Please wait.</p>";

    fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerHTML = `
            <h3>🩹 Analysis Result:</h3>
            <p><strong>Injury Detected:</strong> ${data.injury}</p>
            <p><strong>Prevention Tips:</strong> ${data.tips}</p>
            <p><strong>Recovery Advice:</strong> ${data.recovery}</p>
        `;
    })
    .catch(error => {
        console.error("Error:", error);
        document.getElementById("result").innerHTML = "<p style='color:red;'>❌ Error analyzing image. Please try again.</p>";
    });
}
