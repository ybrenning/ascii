const displayImage = document.getElementById("uploaded-img");
const inputFile = document.getElementById("current-input");


inputFile.onchange = function() {
	const maxWidth = document.getElementById("img-size").value;
	const maxHeight = maxWidth;

	displayImage.src = URL.createObjectURL(inputFile.files[0]);

	displayImage.onload = function() {
		const canvas = document.createElement('canvas');
		canvas.style.display="none";
		const context = canvas.getContext('2d');

		let width = displayImage.width;
		let height = displayImage.height;

		if (width > height) {
			if (width > maxWidth) {
				height *= maxWidth / width;
				width = maxWidth;
			}
		} else {
			if (height > maxHeight) {
				width *= maxHeight / height;
				height = maxHeight;
			}
		}

		console.log(width);
		console.log(height);
		canvas.width = width;
		canvas.height = height;

		context.drawImage(displayImage, 0, 0, width, height);

		displayImage.width = width;
		displayImage.height = height;

		const theData = context.getImageData(0, 0, width, height);

		let pixels = theData.data
		let grayPixels = [];
		
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
		console.log(grayPixels.length);
		let downloadText = "";
		let displayText = "";

		console.log(displayImage.height);
		for (let y = 0; y < displayImage.height; y++) {
			let text = "";
			for (let x = 0; x < displayImage.width; x++) {
				text = text + grayPixels[y*displayImage.width+x];
			}
			downloadText = downloadText + text + "\n";
			displayText = displayText + text + "<br></br>";
		}

		console.log(displayText.length);
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
