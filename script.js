window.onload = function() {
    Swal.fire({
        title: 'Welcome to Rehman School Student Card Genrater Web App !',
        text: 'We are excited to have you here. Explore our features and resources to enhance your learning experience.',
        icon: 'success',
        confirmButtonText: 'Okay',
        background: '#f8f8f8', // Off-white background
        color: '#373737', // Dark Gray text
        customClass: {
            confirmButton: 'swal-button',
        },
        // Adding some 3D effect with shadow
        backdrop: `
            rgba(0, 0, 0, 0.5)
            url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cfilter id='f' x='-50%' y='-50%' width='200%' height='200%' filterUnits='userSpaceOnUse'%3E%3CfeGaussianBlur in='SourceAlpha' stdDeviation='10'/%3E%3CfeOffset dx='0' dy='10' result='offsetblur'/%3E%3CfeFlood flood-color='rgba(0,0,0,0.5)'/%3E%3CfeComposite in2='offsetblur' operator='in'/%3E%3CfeMerge%3E%3CfeMergeNode/%3E%3CfeMergeNode in='SourceGraphic'/%3E%3C/feMerge%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%' height='100%' fill='url(#f)'/%3E%3C/svg%3E") 
            center top / contain no-repeat
        `
    });
};


function generateCard() {
    const schoolName = document.getElementById('schoolName').value;
    const studentName = document.getElementById('studentName').value;
    const address = document.getElementById('address').value;
    const className = document.getElementById('class').value;
    const phone = document.getElementById('phone').value;
    const imageInput = document.getElementById('studentImage');

    // Custom Colors
    const bgColorStart = document.getElementById('bgColorStart').value;
    const bgColorEnd = document.getElementById('bgColorEnd').value;
    const textColor = document.getElementById('textColor').value;

    // Set Card Details
    document.getElementById('cardSchoolName').innerText = schoolName;
    document.getElementById('cardStudentName').innerText = studentName;
    document.getElementById('cardAddress').innerText = address;
    document.getElementById('cardClass').innerText = className;
    document.getElementById('cardPhone').innerText = phone;

    // Apply Custom Styles
    const card = document.getElementById('card-container');
    card.style.background = `linear-gradient(135deg, ${bgColorStart}, ${bgColorEnd})`;
    card.style.color = textColor;

    // Display Uploaded Image
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('cardImage').src = e.target.result;
        };
        reader.readAsDataURL(imageInput.files[0]);
    }
}

function downloadCardImage() {
    html2canvas(document.getElementById('card-container')).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'student-card.png';
        link.click();
    });
}

function printCard() {
    const card = document.getElementById('card-container');

    html2canvas(card, { scale: 2 }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const newWindow = window.open("", "_blank");
        newWindow.document.write('<html><head><title>Print Card</title></head><body>');
        newWindow.document.write(`<img src="${image}" style="width:100%;height:auto;">`);
        newWindow.document.write('</body></html>');
        newWindow.document.close();
        
        // Wait for the image to load before printing
        newWindow.onload = () => {
            newWindow.print();
            newWindow.close();
        };
    });
}

