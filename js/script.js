let text;
let size;
let color = "coral";

$(document).ready(function () {
    size = $('#logo-size').val();
    text = $('#logo-text').val();
    changeLogo(text, size, color);
});

$('.color-select').click(function () {
    $('.color-select').removeClass('active');
    $(this).addClass('active');
    color = $(this).attr('color');
    $('.logo-result').css('color', color);
});

$('#logo-size').on('input', function () {
    size = $(this).val();
    $('#logo-size-text').html(`${size}px`);
    $('#generated-text').children().css({ "font-size": `${size}px` });
    $('.logo-result').css('font-size', `${size}px`);
});

$('#logo-text').keyup(function () {
    text = $(this).val();
    changeLogo(text, size, color);
});

$('#button-save').click(function () {
    html2canvas(document.querySelector("#logo-canvas")).then(canvas => {
        let imageDataUrl = canvas.toDataURL('image/jpg');
        let imageContainer = document.getElementById("image-download");

        let imageElement = document.createElement('img');
        imageElement.src = imageDataUrl;
        imageElement.alt = "Logo Result"
        imageContainer.replaceChildren(imageElement);
    });
});

function changeLogo(text, size, color) {
    $('#logo-canvas').html('');
    for (let i = 0; i < text.length; i++) {
        if (text[i] == " ") {
            $('#logo-canvas').append(`<span class="logo-result" style="font-size: ${size}px; color: ${color}" id="logo-${i}"> &nbsp;</span>`);
        } else {
            $('#logo-canvas').append(`<span class="logo-result" style="font-size: ${size}px; color: ${color}" id="logo-${i}">${text[i]}</span>`);
        }
        dragElement(document.getElementById(`logo-${i}`));
    }
}

function dragElement(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;
    element.ontouchstart = dragTouchStart;

    function dragMouseDown(event) {
        event.preventDefault();
        pos3 = event.clientX - pos1;
        pos4 = event.clientY - pos2;

        document.onmousemove = dragMouseMove;
        document.onmouseup = dragMouseUp;
    }

    function dragMouseMove(event) {
        event.preventDefault();
        pos1 = event.clientX - pos3;
        pos2 = event.clientY - pos4;
        element.style.transform = `translate3d(${pos1}px, ${pos2}px, 0)`;
    }

    function dragMouseUp() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function dragTouchStart(event) {
        event.preventDefault();
        let touch = event.touches[0];
        pos3 = touch.clientX - pos1;
        pos4 = touch.clientY - pos2;

        document.ontouchmove = dragTouchMove;
        document.ontouchend = dragTouchEnd;
    }

    function dragTouchMove(event) {
        event.preventDefault();
        let touch = event.touches[0];
        pos1 = touch.clientX - pos3;
        pos2 = touch.clientY - pos4;
        element.style.transform = `translate3d(${pos1}px, ${pos2}px, 0)`;
    }

    function dragTouchEnd() {

        document.ontouchmove = null;
        document.ontouchend = null;
    }
}