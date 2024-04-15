## Doctor Appointment Tracker

Welcome to the Doctor Appointment Tracker! This application helps users manage their doctor appointments efficiently. Below, you'll find instructions on how to use, install, test, and deploy the app, along with information on security measures, third-party APIs used, and deployment details.

### How to Use the App

The Doctor Appointment Tracker allows normal end-users to view their upcoming appointments and create new appointments. Administrators have additional privileges, such as canceling or editing appointments and patient information.

### Installation Instructions

To install and run the Doctor Appointment Tracker on your local machine, follow these steps:

1. Clone the repository from GitHub: [link-to-repo](https://github.com/your-username/doctor-appointment-tracker).
2. Navigate to the project directory.
3. Install dependencies by running `npm install`.
4. Configure MongoDB URI:
   - Update the MongoDB URI in the `server.js` file located in the `backend/my-server` directory.
5. Start the development server:
   - Navigate to the `backend/my-server` directory.
   - Run `npm start` to start the app.
6. Open your browser and navigate to `http://localhost:3000` to access the application.

### Security Measures

- User authentication: Users are required to log in to access the application, ensuring that only authorised users can manage appointments.
- Secure storage: User data is securely stored in the database, and sensitive information like passwords is encrypted using bcrypt.
- HTTPS: All data transmitted between the client and server is encrypted using HTTPS to prevent eavesdropping and tampering.
- Role-based access control: Administrators have elevated privileges compared to normal end-users, ensuring that sensitive actions like editing patient information are restricted to authorised personnel.

### Third-Party Integrations

The Doctor Appointment Tracker utilises Google and Facebook OAuth authentication provided by Firebase Authentication. This integration allows users to log in securely using their Google or Facebook accounts, enhancing the authentication process and user experience.

### Third-Party APIs

The Doctor Appointment Tracker leverages Firebase Authentication for OAuth integration with Google and Facebook. This allows users to sign in using their existing Google or Facebook accounts, streamlining the authentication process and providing a seamless login experience. Additionally, Firebase Authentication offers robust security features, ensuring that user credentials are securely handled and authenticated.

### Deployment

The application is deployed using a platform-as-a-service (PaaS) provider like Heroku. Both the back-end server and front-end client are deployed together to simplify the deployment process and ensure seamless integration between the two components.

### Deployed App

Access the deployed Doctor Appointment Tracker here: https://final-project-doctor-app-2b7c0468a3bc.herokuapp.com/

Feel free to explore the app and manage your doctor appointments with ease! If you encounter any issues or have feedback, please don't hesitate to reach out.
