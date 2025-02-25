document.addEventListener("DOMContentLoaded", function () {
    const ids = ["height", "width", "corner", "btn24", "btn30"];
    ids.forEach(id => {
        const element = document.getElementById(`${id}Value`);
        if (element) {
            element.addEventListener("mousedown", function(event) {
                startDrag(event, id);
            });
        }
    });
});

// 数値の増減
function changeValue(target, step) {
    const span = document.getElementById(`${target}Value`);
    if (!span) return;
    let value = parseInt(span.textContent.replace("mm", ""));
    value += step;
    span.textContent = value + "mm";
}

// ドラッグによる変更
let isDragging = false;
let startX = 0;
let targetValue = null;

function startDrag(event, target) {
    isDragging = true;
    startX = event.clientX;
    targetValue = document.getElementById(`${target}Value`);
    if (!targetValue) return;

    document.addEventListener("mousemove", dragValue);
    document.addEventListener("mouseup", stopDrag);
}

function dragValue(event) {
    if (!isDragging || !targetValue) return;
    let diff = Math.floor((event.clientX - startX) / 5);
    let value = parseInt(targetValue.textContent.replace("mm", ""));
    targetValue.textContent = (value + diff) + "mm";
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", dragValue);
    document.removeEventListener("mouseup", stopDrag);
}
