const lessons = [
    { title: 'Asosiy So\'zlar', content: 'Bu bo\'limda siz ingliz tilidagi asosiy so\'zlar bilan tanishishingiz mumkin.' },
    { title: 'Grammatika', content: 'Bu bo\'limda ingliz tilidagi grammatik qoidalarni o\'rganasiz.' },
    { title: 'Fransuzcha Iboralar', content: 'Bu bo\'limda ingliz tilidagi muhim iboralar bilan tanishasiz.' }



];

const questions = [
    { question: 'Ingliz tilida "Kitob" qanday aytiladi?', answer: 'Book' },
    { question: 'Ingliz tilida "Mashina" qanday aytiladi?', answer: 'Car' },
    { question: 'Ingliz tilida "Mushuk" qanday aytiladi?', answer: 'Cat' }



]
//     { question: 'Ingliz tilida "Stul" qanday aytiladi?', answer: 'Chair' }
//     { question: 'Ingliz tilida "Stol" qanday aytiladi?', answer: 'Table' }
//     { question: 'Ingliz tilida "Chiroq" qanday aytiladi?', answer: 'Lamp' }
//     { question: 'Ingliz tilida "Yotoq" qanday aytiladi?', answer: 'Bed' }
// ];

let userProgress = 0;
let loggedInUser = null;

function loadLessons() {
    const container = document.getElementById('lesson-content');
    container.innerHTML = '';
    lessons.forEach(lesson => {
        const lessonDiv = document.createElement('div');
        lessonDiv.className = 'lesson';
        lessonDiv.innerHTML = `
            <h3>${lesson.title}</h3>
            <p>${lesson.content}</p>
        `;
        container.appendChild(lessonDiv);
    });
}

function loadQuiz() {
    const container = document.getElementById('quiz-container');
    container.innerHTML = '';
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            <input type="text" id="answer${index}" placeholder="Javobni kiriting">
        `;
        container.appendChild(questionDiv);
    });
}

function checkAnswers() {
    let score = 0;
    questions.forEach((q, index) => {
        const userAnswer = document.getElementById(`answer${index}`).value.trim();
        if (userAnswer.toLowerCase() === q.answer.toLowerCase()) {
            score++;
        }
    });
    userProgress = Math.round((score / questions.length) * 100);
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.innerHTML = `Natija: ${score} / ${questions.length} <br> Progress: ${userProgress}%`;
    if (loggedInUser) {
        // Saqlash uchun serverga so'rov yuborish (mock)
        console.log(`Foydalanuvchi ${loggedInUser} progress: ${userProgress}%`);
    }
}

function loadProgress() {
    const progressDiv = document.getElementById('progress-content');
    progressDiv.innerHTML = `Sizning umumiy progressingiz: ${userProgress}%`;
}

function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    if (sectionId === 'lessons') {
        loadLessons();
    } else if (sectionId === 'quiz') {
        loadQuiz();
    } else if (sectionId === 'progress') {
        loadProgress();
    }
}

function showPDF(pdfUrl) {
    const container = document.getElementById('pdf-container');
    container.innerHTML = ''; // Odatda bo'sh bo'lishi kerak
    const iframe = document.createElement('iframe');
    iframe.src = pdfUrl;
    iframe.width = '100%';
    iframe.height = '600px';
    iframe.style.border = 'none';
    container.appendChild(iframe);
}
// DOCX faylni yuklab olish
document.getElementById('download-docx').addEventListener('click', function() {
    const link = document.createElement('a');
    link.href = '7.docx';
    link.download = '7.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Load PDF faylni sahifaga yuklash
window.onload = function() {
    showPDF('7.pdf'); // O'z faylingiz yo'lini qo'shing
};

// function login() {
//     const username = document.getElementById('username').value.trim();
//     const password = document.getElementById('password').value.trim();
//     if (username && password) {
//         loggedInUser = username;
//         document.getElementById('login
