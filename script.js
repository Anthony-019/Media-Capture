let video = document.getElementById('video');
let canvas = document.getElementById('canvas');
let photoPreview = document.getElementById('photo-preview');
let photo = document.getElementById('photo');
let downloadLink = document.getElementById('download');
let whatsappLink = document.getElementById('whatsapp-link');
let currentStream = null;
let isUsingFrontCamera = true;

const constraints = {
    video: { facingMode: "user" }, // Default to front camera
};

// Start the camera
async function startCamera() {
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = stream;
        currentStream = stream;
    } catch (error) {
        alert('Error accessing camera: ' + error.message);
    }
}

// Capture photo
document.getElementById('capture').addEventListener('click', () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    photo.src = imageData;
    photoPreview.classList.remove('hidden');

    // Create a downloadable link
    downloadLink.href = imageData;
    downloadLink.download = 'captured_photo.png';
    downloadLink.classList.remove('hidden');

    // Pre-fill WhatsApp message with link
    const message = encodeURIComponent(
        'Here is the photo I captured!'
    );
    whatsappLink.href = `https://wa.me/?text=${message}`;
    whatsappLink.classList.remove('hidden');
});

// Switch camera
document.getElementById('switch').addEventListener('click', () => {
    isUsingFrontCamera = !isUsingFrontCamera;
    constraints.video.facingMode = isUsingFrontCamera ? "user" : "environment";
    startCamera();
});

// Initialize
startCamera();
