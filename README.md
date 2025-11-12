# Communication Style Quiz

A modern web application to discover your communication style. Find out whether you lean towards being a Driver, Expressive, Amiable, or Analytical communicator.

## Features

- 🎨 Modern, responsive UI with Tailwind CSS
- 📊 Visual progress tracking
- 📈 Animated results with percentage breakdowns
- 💻 Single-page application experience
- 📱 Mobile-friendly design

## Setup Instructions

### Prerequisites

- Python 3.7 or higher
- pip (Python package installer)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd communication-style
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running the Application

#### Option 1: Run with Python (Development)

1. Start the Flask server:
```bash
python app.py
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

#### Option 2: Run with Docker (Production-Ready)

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

2. Open your web browser and navigate to:
```
http://localhost:5000
```

3. To stop the application:
```bash
docker-compose down
```

#### Option 3: Build Docker Image Manually

1. Build the Docker image:
```bash
docker build -t communication-style-quiz .
```

2. Run the container:
```bash
docker run -p 5000:5000 communication-style-quiz
```

## How It Works

The quiz presents 24 sets of words, each representing four different communication styles:
- **Driver**: Direct, decisive, and results-oriented
- **Expressive**: Enthusiastic, optimistic, and people-oriented
- **Amiable**: Supportive, patient, and relationship-focused
- **Analytical**: Logical, systematic, and detail-oriented

After completing all questions, you'll receive a percentage breakdown showing your tendencies across all four styles.

## Deployment

### Deploy to Cloud Platforms

This application is Docker-ready and can be easily deployed to:

- **Render**: Connect your GitHub repo and deploy as a Docker container
- **Railway**: Push and deploy with automatic Docker detection
- **Google Cloud Run**: Deploy with `gcloud run deploy`
- **AWS ECS/Fargate**: Deploy using the Docker image
- **DigitalOcean App Platform**: Connect repo and deploy
- **Heroku**: Use the Docker deployment method

### Environment Variables

- `SECRET_KEY`: Set a secure secret key for production (optional, auto-generated if not set)
- `PORT`: Port to run the application (default: 5000)
- `FLASK_ENV`: Set to `production` for production deployment

## Project Structure

```
communication-style/
├── app.py                 # Flask application with API routes
├── data.py               # Quiz questions data
├── requirements.txt      # Python dependencies
├── Dockerfile            # Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── .dockerignore         # Docker ignore file
├── templates/
│   └── index.html       # Main HTML template
└── static/
    └── js/
        └── app.js       # Frontend JavaScript logic
```

## Legacy Terminal Version

The original terminal-based version is still available in `main.py`. To run it:
```bash
python main.py
```
