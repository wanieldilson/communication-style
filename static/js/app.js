// Quiz state
let currentQuestion = null;
let totalQuestions = 24;

// Screen management
function showScreen(screenId) {
    document.getElementById('welcome-screen').classList.add('hidden');
    document.getElementById('quiz-screen').classList.add('hidden');
    document.getElementById('results-screen').classList.add('hidden');
    document.getElementById(screenId).classList.remove('hidden');
}

// Start the quiz
async function startQuiz() {
    try {
        const response = await fetch('/api/start', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        
        if (data.success) {
            totalQuestions = data.total_questions;
            currentQuestion = data.question;
            displayQuestion(data.question, data.question_number, data.total_questions);
            showScreen('quiz-screen');
        } else {
            alert('Error starting quiz: ' + data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to start quiz. Please try again.');
    }
}

// Display a question
function displayQuestion(question, questionNumber, totalQuestions) {
    // Update progress
    const progress = (questionNumber / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementById('progress-text').textContent = `${questionNumber} / ${totalQuestions}`;
    
    // Create option buttons
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    const options = [
        { key: 'driver', label: question.driver },
        { key: 'expressive', label: question.expressive },
        { key: 'amiable', label: question.amiable },
        { key: 'analytical', label: question.analytical }
    ];
    
    // Randomize the order of options to prevent bias
    const shuffledOptions = shuffleArray([...options]);
    
    shuffledOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = `option-btn w-full text-left p-5 rounded-xl border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500`;
        button.innerHTML = `
            <div class="flex items-center">
                <span class="flex-shrink-0 w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                    ${index + 1}
                </span>
                <span class="text-lg font-medium text-gray-800">${option.label}</span>
            </div>
        `;
        button.onclick = () => submitAnswer(option.key);
        
        // Add slight delay for staggered animation
        setTimeout(() => {
            button.classList.add('slide-in');
            optionsContainer.appendChild(button);
        }, index * 50);
    });
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Submit an answer
async function submitAnswer(answer) {
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ answer: answer })
        });
        
        const data = await response.json();
        
        if (data.success) {
            if (data.complete) {
                // Quiz is complete, show results
                await loadResults();
            } else {
                // Show next question
                currentQuestion = data.question;
                displayQuestion(data.question, data.question_number, data.total_questions);
            }
        } else {
            alert('Error submitting answer');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to submit answer. Please try again.');
    }
}

// Load and display results
async function loadResults() {
    try {
        const response = await fetch('/api/results');
        const data = await response.json();
        
        if (data.success) {
            displayResults(data.results);
            showScreen('results-screen');
        } else {
            alert('Error loading results');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to load results. Please try again.');
    }
}

// Display results
function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';
    
    const styles = [
        { 
            key: 'driver', 
            label: 'Driver', 
            color: 'red',
            description: 'Direct, decisive, and results-oriented'
        },
        { 
            key: 'expressive', 
            label: 'Expressive', 
            color: 'yellow',
            description: 'Enthusiastic, optimistic, and people-oriented'
        },
        { 
            key: 'amiable', 
            label: 'Amiable', 
            color: 'green',
            description: 'Supportive, patient, and relationship-focused'
        },
        { 
            key: 'analytical', 
            label: 'Analytical', 
            color: 'blue',
            description: 'Logical, systematic, and detail-oriented'
        }
    ];
    
    styles.forEach((style, index) => {
        const result = results[style.key];
        const resultDiv = document.createElement('div');
        resultDiv.className = 'bg-gray-50 rounded-xl p-6';
        
        resultDiv.innerHTML = `
            <div class="flex justify-between items-center mb-3">
                <div>
                    <h3 class="text-xl font-bold text-gray-800">${style.label}</h3>
                    <p class="text-sm text-gray-600">${style.description}</p>
                </div>
                <span class="text-2xl font-bold text-${style.color}-600">${result.percentage}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div class="result-bar bg-${style.color}-500 h-4 rounded-full" style="width: 0%"></div>
            </div>
        `;
        
        resultsContainer.appendChild(resultDiv);
        
        // Animate the bar after a short delay
        setTimeout(() => {
            const bar = resultDiv.querySelector('.result-bar');
            bar.style.width = result.percentage + '%';
        }, 100 + (index * 150));
    });
}

// Restart the quiz
function restartQuiz() {
    showScreen('welcome-screen');
}

