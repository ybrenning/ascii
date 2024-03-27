var displayImage = document.getElementById("uploaded-img");
var inputFile = document.getElementById("current-input");

inputFile.onchange = function() {
	displayImage.src = URL.createObjectURL(inputFile.files[0]);
	console.log(inputFile.files[0]);

	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

	displayImage.onload = function() { // Wait for the image to load
		canvas.width = displayImage.width; // Set canvas dimensions to image dimensions
		canvas.height = displayImage.height;
		context.drawImage(displayImage, 0, 0); // Draw the image onto the canvas

		var theData = context.getImageData(0, 0, displayImage.width, displayImage.height); // Get the image data
		var pixels = theData.data
		var grayPixels = [];
		
		for (let i = 0; i < pixels.length; i+= 4) {
			let sum = pixels[i] + pixels[i + 1] + pixels[i + 2];
			if (sum == 0) {
				grayPixels.push("#");
			} else if (0 < sum && sum <= 100) {
				grayPixels.push("X");
			} else if (100 < sum && sum <= 200) {
				grayPixels.push("%");
			} else if (200 < sum && sum <= 300) {
				grayPixels.push("&");
			} else if (300 < sum && sum <= 400) {
				grayPixels.push("*");
			} else if (400 < sum && sum <= 500) {
				grayPixels.push("+");
			} else if (500 < sum && sum <= 600) {
				grayPixels.push("/");
			} else if (600 < sum && sum <= 700) {
				grayPixels.push(")");
			} else {
				grayPixels.push("'")
			}
		}
		let text = "";

		for (let y = 0; y < displayImage.height; y++) {
			for (let x = 0; x < displayImage.width; x++) {
				text = text + grayPixels[y*displayImage.width+x];
			}
			text = text + "\n";
		}

		console.log(text);
		console.log(text.length);
		var hiddenElement = document.createElement("a");
		hiddenElement.download = "string.txt";
		var blob = new Blob([text], {
			type: "text/plain"
		});

		hiddenElement.href = window.URL.createObjectURL(blob);
		hiddenElement.click();
		// document.getElementById("list").innerHTML = text;
    };
};
