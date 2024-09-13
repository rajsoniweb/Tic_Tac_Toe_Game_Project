const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    hideMessage();
};

const boxClickHandler = (box) => {
    if (turnO) {
        box.innerText = "O";
        turnO = false;
        box.style.color = '#2532ad'
    } else {
        box.innerText = "X";
        box.style.color = '#b0413e'
        turnO = true;
    }
    box.disabled = true;
    count++;

    let isWinner = checkWinner();

    console.log(count)
    console.log(isWinner)

    if (count === 9 && !isWinner) {
        announceDraw();
    }
};

const announceDraw = () => {
    showMessage(`Game was a Draw.`);
    disableBoxes();
};

const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showMessage = (message) => {
    msg.innerText = message;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const hideMessage = () => {
    msgContainer.classList.add("hide");
};

const checkWinner = () => {
    for (const pattern of winPatterns) {
        const pos1Val = boxes[pattern[0]].innerText;
        const pos2Val = boxes[pattern[1]].innerText;
        const pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
};

const showWinner = (winner) => {
    showMessage(`Congratulations, Winner is ${winner}`);
};

// Event listeners
boxes.forEach((box) => {
    box.addEventListener("click", () => boxClickHandler(box));
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
