document.getElementById("upiForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get UPI details
    const amount = document.getElementById("amount").value.trim();

    if (!amount) {
        alert("Please enter amount.");
        return;
    }

    // Generate UPI link
    const upiLink = `upi://pay?pa=7319187102@okbizaxis&am=${amount}&cu=INR`;

    // Clear any previous QR Code
    const qrContainer = document.getElementById("qrCode");
    qrContainer.innerHTML = ""; // Clear any existing content

    // Generate QR Code
    const canvas = document.createElement("canvas"); // Create a canvas
    qrContainer.appendChild(canvas); // Append canvas to the container

    QRCode.toCanvas(canvas, upiLink, { width: 200 }, function (error) {
        if (error) {
            console.error(error);
            alert("Error generating QR code");
        } else {
            document.getElementById("printBtn").style.display = "inline-block";
        }
    });
});


// Print functionality
document.getElementById("printBtn").addEventListener("click", function () {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
        <head><title>HotPicks QR Code</title></head>
        <body>
            <div style="text-align:center;">
                <canvas id="printableCanvas"></canvas>
                <p>Scan to Pay</p>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();

    const qrCanvas = document.getElementById("qrCode").querySelector("canvas");
    const printableCanvas = printWindow.document.getElementById("printableCanvas");
    const context = printableCanvas.getContext("2d");
    printableCanvas.width = qrCanvas.width;
    printableCanvas.height = qrCanvas.height;
    context.drawImage(qrCanvas, 0, 0);

    printWindow.focus();
    printWindow.print();
    printWindow.close();
});
