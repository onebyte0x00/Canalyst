// Enhanced Quiz functionality
function initializeQuiz(config) {
    const quizForm = document.getElementById(config.quizId);
    const submitBtn = document.getElementById('submit-quiz');
    const resultDiv = document.getElementById('quiz-result');
    
    if (!quizForm || !submitBtn || !resultDiv) return;
    
    submitBtn.addEventListener('click', function() {
        const results = checkQuizAnswers(quizForm, config.correctAnswers);
        displayQuizResults(results, config.feedback, resultDiv);
        
        // Store quiz results in localStorage
        localStorage.setItem(`quiz-${config.quizId}-score`, `${results.score}/${results.total}`);
        localStorage.setItem(`quiz-${config.quizId}-percentage`, results.percentage);
    });
    
    // Load previous results if they exist
    const previousScore = localStorage.getItem(`quiz-${config.quizId}-score`);
    const previousPercentage = localStorage.getItem(`quiz-${config.quizId}-percentage`);
    
    if (previousScore && previousPercentage) {
        resultDiv.innerHTML = `<p>Your previous score: ${previousScore} (${previousPercentage}%)</p>`;
        resultDiv.className = 'result info';
        resultDiv.style.display = 'block';
    }
}

function checkQuizAnswers(quizForm, correctAnswers) {
    const formData = new FormData(quizForm);
    const userAnswers = {};
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;
    
    // Get user answers
    for (const [name, value] of formData.entries()) {
        userAnswers[name] = value;
    }
    
    // Check answers
    const questionResults = {};
    for (const question in correctAnswers) {
        const isCorrect = userAnswers[question] === correctAnswers[question];
        questionResults[question] = {
            correct: isCorrect,
            userAnswer: userAnswers[question] || 'Not answered',
            correctAnswer: correctAnswers[question]
        };
        
        if (isCorrect) {
            score++;
        }
    }
    
    return {
        score: score,
        total: totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100),
        questionResults: questionResults
    };
}

function displayQuizResults(results, feedback, resultDiv) {
    // Calculate percentage
    const percentage = results.percentage;
    let message = '';
    let resultClass = '';
    
    // Determine result message
    if (percentage >= 80) {
        message = `Excellent! You scored ${results.score} out of ${results.total} (${percentage}%).`;
        resultClass = 'success';
    } else if (percentage >= 50) {
        message = `Good effort! You scored ${results.score} out of ${results.total} (${percentage}%). Keep practicing!`;
        resultClass = 'success';
    } else {
        message = `You scored ${results.score} out of ${results.total} (${percentage}%). Review the material and try again!`;
        resultClass = 'error';
    }
    
    // Add feedback for each question
    let feedbackHtml = '<div class="feedback-details"><h4>Question Feedback:</h4><ul>';
    
    for (const question in results.questionResults) {
        const qResult = results.questionResults[question];
        feedbackHtml += `<li><strong>Question ${question.substring(1)}:</strong> `;
        
        if (qResult.correct) {
            feedbackHtml += '<span style="color: var(--success-color)">Correct!</span>';
        } else {
            feedbackHtml += `<span style="color: var(--accent-color)">Incorrect. You answered ${qResult.userAnswer}, correct answer is ${qResult.correctAnswer}.</span>`;
        }
        
        if (feedback[question]) {
            feedbackHtml += `<br>${feedback[question]}`;
        }
        
        feedbackHtml += '</li>';
    }
    
    feedbackHtml += '</ul></div>';
    
    // Display results
    resultDiv.innerHTML = `<p>${message}</p>${feedbackHtml}`;
    resultDiv.className = `result ${resultClass}`;
    resultDiv.style.display = 'block';
    
    // Scroll to results
    resultDiv.scrollIntoView({ behavior: 'smooth' });
}

// Add info style to CSS
const infoStyle = `
.result.info {
    background-color: rgba(52, 152, 219, 0.1);
    border: 1px solid var(--secondary-color);
    color: var(--secondary-color);
}
`;

const styleElement = document.createElement('style');
styleElement.innerHTML = infoStyle;
document.head.appendChild(styleElement);
