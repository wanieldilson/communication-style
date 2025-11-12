from flask import Flask, render_template, request, jsonify, session
from data import communication_styles
import secrets
import os

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', secrets.token_hex(16))

@app.route('/')
def index():
    """Render the main quiz page"""
    return render_template('index.html')

@app.route('/api/start', methods=['POST'])
def start_quiz():
    """Initialize a new quiz session"""
    session['question_number'] = 0
    session['driver'] = 0
    session['expressive'] = 0
    session['amiable'] = 0
    session['analytical'] = 0
    
    # Return the first question
    if len(communication_styles) > 0:
        question = communication_styles[0]
        return jsonify({
            'success': True,
            'question_number': 1,
            'total_questions': len(communication_styles),
            'question': {
                'driver': question['driver'],
                'expressive': question['expressive'],
                'amiable': question['amiable'],
                'analytical': question['analytical']
            }
        })
    return jsonify({'success': False, 'error': 'No questions available'})

@app.route('/api/submit', methods=['POST'])
def submit_answer():
    """Handle answer submission and return next question or completion status"""
    data = request.get_json()
    answer = data.get('answer')
    
    # Update scores based on answer
    if answer == 'driver':
        session['driver'] = session.get('driver', 0) + 1
    elif answer == 'expressive':
        session['expressive'] = session.get('expressive', 0) + 1
    elif answer == 'amiable':
        session['amiable'] = session.get('amiable', 0) + 1
    elif answer == 'analytical':
        session['analytical'] = session.get('analytical', 0) + 1
    
    # Move to next question
    session['question_number'] = session.get('question_number', 0) + 1
    question_num = session['question_number']
    
    # Check if quiz is complete
    if question_num >= len(communication_styles):
        return jsonify({
            'success': True,
            'complete': True,
            'question_number': question_num,
            'total_questions': len(communication_styles)
        })
    
    # Return next question
    question = communication_styles[question_num]
    return jsonify({
        'success': True,
        'complete': False,
        'question_number': question_num + 1,
        'total_questions': len(communication_styles),
        'question': {
            'driver': question['driver'],
            'expressive': question['expressive'],
            'amiable': question['amiable'],
            'analytical': question['analytical']
        }
    })

@app.route('/api/results', methods=['GET'])
def get_results():
    """Calculate and return final quiz results"""
    total_questions = len(communication_styles)
    
    driver_score = session.get('driver', 0)
    expressive_score = session.get('expressive', 0)
    amiable_score = session.get('amiable', 0)
    analytical_score = session.get('analytical', 0)
    
    # Calculate percentages
    driver_pct = round(driver_score / total_questions * 100, 1)
    expressive_pct = round(expressive_score / total_questions * 100, 1)
    amiable_pct = round(amiable_score / total_questions * 100, 1)
    analytical_pct = round(analytical_score / total_questions * 100, 1)
    
    return jsonify({
        'success': True,
        'results': {
            'driver': {
                'score': driver_score,
                'percentage': driver_pct
            },
            'expressive': {
                'score': expressive_score,
                'percentage': expressive_pct
            },
            'amiable': {
                'score': amiable_score,
                'percentage': amiable_pct
            },
            'analytical': {
                'score': analytical_score,
                'percentage': analytical_pct
            }
        }
    })

if __name__ == '__main__':
    # Use environment variables for configuration
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') != 'production'
    app.run(host='0.0.0.0', port=port, debug=debug)

