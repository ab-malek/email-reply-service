# Email Reply AI Assistant

An AI-powered email reply generator that helps users craft professional responses with customizable tones. Built with Spring Boot backend and React frontend.

## Features

- 🤖 AI-powered email response generation
- 🎭 Customizable tone selection
- 💨 Quick and efficient responses
- 🎨 Modern Material UI interface
- 🔒 Secure API key management

## User Interface



## Tech Stack

### Backend

- Java 17
- Spring Boot
- Spring WebFlux
- Google Gemini AI API
- Lombok

### Frontend

- React
- Material UI
- Axios
- Vite

## Getting Started

### Prerequisites

- Java 17 or higher
- Node.js 16 or higher
- Maven
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/ab-malek/email-reply-service.git
cd email-reply-service
```

2. Backend Setup

```bash
cd email-writer-backend
# Copy the template and configure your API keys
cp src/main/resources/application.properties.template src/main/resources/application.properties
# Edit application.properties with your Gemini API credentials
```

3. Start the Backend

```bash
./mvnw spring-boot:run
```

4. Frontend Setup

```bash
cd ../email-writer-frontend
npm install
```

5. Start the Frontend

```bash
npm run dev
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Usage

1. Open the application in your browser
2. Paste the email you want to reply to
3. Select your desired tone (professional, friendly, formal, etc.)
4. Click "Generate Reply"
5. Copy and use the AI-generated response

## API Endpoints

### Generate Email Reply

```http
POST /api/email/generate
Content-Type: application/json

{
  "emailContent": "Your email content here",
  "tone": "professional"
}
```

## Configuration

### Backend Configuration (application.properties)

```properties
spring.application.name=email-writer-backend
gemini.api.key=YOUR_API_KEY_HERE
gemini.api.url=YOUR_API_URL_HERE
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Gemini AI for providing the AI capabilities
- Material UI for the beautiful components
- Spring Boot for the robust backend framework
