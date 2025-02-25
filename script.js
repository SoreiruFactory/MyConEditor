document.addEventListener("DOMContentLoaded", function () {
    const heightInput = document.getElementById("height");
    const widthInput = document.getElementById("width");
    const cornerInput = document.getElementById("corner");
    const colorInput = document.getElementById("color");
    const btn24Input = document.getElementById("btn24");
    const btn30Input = document.getElementById("btn30");
    const btnColorInput = document.getElementById("btnColor");
    const controller = document.getElementById("controller");

    function updateController() {
        controller.style.width = widthInput.value + "px";
        controller.style.height = heightInput.value + "px";
        controller.style.borderRadius = cornerInput.value + "px";
        controller.style.backgroundColor = colorInput.value;
        drawButtons();
    }

    function drawButtons() {
        controller.innerHTML = ""; // ボタンをクリア
        const btn24Count = parseInt(btn24Input.value);
        const btn30Count = parseInt(btn30Input.value);
        const btnColor = btnColorInput.value;

        // 24mmボタン配置
        for (let i = 0; i < btn24Count; i++) {
            let button = document.createElement("div");
            button.className = "button";
            button.style.width = "24px";
            button.style.height = "24px";
            button.style.backgroundColor = btnColor;
            button.style.left = `${(i % 4) * 30 + 50}px`;
            button.style.top = `${Math.floor(i / 4) * 30 + 40}px`;
            controller.appendChild(button);
        }

        // 30mmボタン配置
        for (let i = 0; i < btn30Count; i++) {
            let button = document.createElement("div");
            button.className = "button";
            button.style.width = "30px";
            button.style.height = "30px";
            button.style.backgroundColor = btnColor;
            button.style.left = "100px";
            button.style.top = "120px";
            controller.appendChild(button);
        }
    }

    // 数値の増減
function changeValue(target, step) {
    const span = document.getElementById(`${target}Value`);
    let value = parseInt(span.textContent.replace("mm", ""));
    value += step;
    span.textContent = value + "mm";
}

// ドラッグによる変更
let isDragging = false;
let startX = 0;
let targetValue = "";
function startDrag(event, target) {
    isDragging = true;
    startX = event.clientX;
    targetValue = document.getElementById(`${target}Value`);
    document.addEventListener("mousemove", dragValue);
    document.addEventListener("mouseup", stopDrag);
}

function dragValue(event) {
    if (!isDragging) return;
    let diff = Math.floor((event.clientX - startX) / 5);
    let value = parseInt(targetValue.textContent.replace("mm", ""));
    targetValue.textContent = (value + diff) + "mm";
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener("mousemove", dragValue);
    document.removeEventListener("mouseup", stopDrag);
}


    // イベントリスナーを追加
    heightInput.addEventListener("input", updateController);
    widthInput.addEventListener("input", updateController);
    cornerInput.addEventListener("input", updateController);
    colorInput.addEventListener("input", updateController);
    btn24Input.addEventListener("input", updateController);
    btn30Input.addEventListener("input", updateController);
    btnColorInput.addEventListener("input", updateController);

    updateController(); // 初期表示
});
