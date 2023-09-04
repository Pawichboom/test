// สร้างฟังก์ชันสุ่มเลขจำนวนเต็มในช่วง 1-10
function getRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

// สร้างฟังก์ชันสุ่มเครื่องหมายการคำนวณ (+, -, *, /)
function getRandomOperator() {
    const operators = ['+', '-', '*', '/'];
    const randomIndex = Math.floor(Math.random() * operators.length);
    return operators[randomIndex];
}


// คำนวณคำตอบของสมการรวมการหาร
function calculateAnswer(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            // ตรวจสอบว่าหารไม่ด้วยศูนย์
            if (num2 !== 0) {
                return num1 / num2;
            } else {
                return 'ไม่สามารถหารด้วยศูนย์ได้';
            }
    }
}

const num1Element = document.getElementById('num1');
const operatorElement = document.getElementById('operator');
const num2Element = document.getElementById('num2');
const answerElement = document.getElementById('answer');
const checkButton = document.getElementById('check');
const messageElement = document.getElementById('message');
const timeLeftElement = document.getElementById('time-left');

let score = 0;
let timeLeft = 60;
let timer;

// สร้างฟังก์ชันเริ่มเกมใหม่
function startGame() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const operator = getRandomOperator();

    num1Element.textContent = num1;
    operatorElement.textContent = operator;
    num2Element.textContent = num2;
    answerElement.value = '';
    messageElement.textContent = '';
    answerElement.focus();

    const correctAnswer = calculateAnswer(num1, operator, num2);

    // เมื่อกดปุ่ม "ตรวจสอบ"
    checkButton.addEventListener('click', () => {
        const userAnswer = parseFloat(answerElement.value); // ใช้ parseFloat ในกรณีที่ตอบเป็นทศนิยม
        if (userAnswer === correctAnswer) {
            messageElement.textContent = 'คำตอบถูกต้อง!';
            score++;
            startGame(); // ถ้าตอบถูกให้ไปข้อถัดไป
        } else {
            messageElement.textContent = 'คำตอบไม่ถูกต้อง! โปรดลองใหม่';
        }
    });

    // เริ่มนับถอยหลัง 1 นาที
    clearInterval(timer);
    timeLeft = 60;
    timeLeftElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            messageElement.textContent = `เกมสิ้นสุด คะแนนรวม: ${score}`;
            checkButton.disabled = true;
        }
    }, 1000);
}

// เริ่มเกมครั้งแรก
startGame();
