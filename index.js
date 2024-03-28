const displayImage = document.getElementById("uploaded-img");
const inputFile = document.getElementById("current-input");

function handleInputChange() {
	const maxWidth = document.getElementById("img-size").value;

	displayImage.src = URL.createObjectURL(inputFile.files[0]);

	displayImage.onload = function() {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d');

		let width = maxWidth;
		let height = maxWidth * 0.75;

		canvas.width = width;
		canvas.height = height;

		context.drawImage(displayImage, 0, 0, width, height);

		displayImage.width = width;
		displayImage.height = height;

		const imageData = context.getImageData(0, 0, width, height);

		let pixels = imageData.data
		let ascii = [];
		
		for (let i = 0; i < pixels.length; i+= 4) {
			let sum = pixels[i] + pixels[i + 1] + pixels[i + 2];
			if (sum == 0) {
				ascii.push("#");
			} else if (0 < sum && sum <= 100) {
				ascii.push("X");
			} else if (100 < sum && sum <= 200) {
				ascii.push("%");
			} else if (200 < sum && sum <= 300) {
				ascii.push("&");
			} else if (300 < sum && sum <= 400) {
				ascii.push("*");
			} else if (400 < sum && sum <= 500) {
				ascii.push("+");
			} else if (500 < sum && sum <= 600) {
				ascii.push("/");
			} else if (600 < sum && sum <= 700) {
				ascii.push(")");
			} else {
				ascii.push("'")
			}
		}

		let downloadText = "";
		let displayText = "";

		for (let y = 0; y < displayImage.height; y++) {
			let text = "";
			for (let x = 0; x < displayImage.width; x++) {
				text = text + ascii[y * displayImage.width + x];
			}
			downloadText = downloadText + text + "\n";
			displayText = displayText + text + "<br></br>";
		}

		if (document.getElementById("download-txt").checked) {
			var hiddenElement = document.createElement("a");
			hiddenElement.download = "ascii.txt";
			var blob = new Blob([downloadText], {
				type: "text/plain"
			});

			hiddenElement.href = window.URL.createObjectURL(blob);
			hiddenElement.click();
		}

		document.getElementById("ascii").innerHTML = displayText;

    };
};

inputFile.addEventListener("change", handleInputChange);

