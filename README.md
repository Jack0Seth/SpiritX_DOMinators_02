# SPIRITX DOMINATORS_02

![Node.js](https://img.shields.io/badge/Node.js-v18.x-339933?style=for-the-badge&logo=Node.js)
![React](https://img.shields.io/badge/React-v18.x-61DAFB?style=for-the-badge&logo=React)
![Python](https://img.shields.io/badge/Python-v3.11-3776AB?style=for-the-badge&logo=Python)
![Firebase](https://img.shields.io/badge/Firebase-Firestore-FFCA28?style=for-the-badge&logo=Firebase)
![Gemini](https://img.shields.io/badge/Gemini-v1.5-4285F4?style=for-the-badge&logo=Google)

## Project Description

SPIRITX DOMINATORS_02 is a comprehensive sports analytics and communication platform featuring:

* **Admin Panel:** Manage player data and statistics.
* **Chatbot:** Interact with an AI chatbot for information and analysis.
* **Frontend:** (Potentially) Display player data and interact with the system.

## Features

* **Admin Panel:**
    * Add, view, and edit player data.
    * Track player statistics (runs, wickets, etc.).
* **Chatbot:**
    * Get player statistics and details.
    * Find the best current team based on available data.
    * Engage in general conversations.
* **Frontend:** (To be developed further)
    * Display player data and statistics.
    * Interact with the chatbot.

## Technology Stack

* **Frontend:** React, Material UI
* **Admin Panel Backend:** Node.js, Express
* **Chatbot Backend:** Python, Flask, Firebase (Firestore), Gemini API
* **Database:** Firebase Firestore

## Installation and Setup

### Prerequisites

* **Node.js and npm:** Download and install from [nodejs.org](https://nodejs.org/).
* **Python 3.6+:** Download and install from [python.org](https://www.python.org/).
* **Git:** Install from [git-scm.com](https://git-scm.com/).
* **Firebase Account:** Sign up at [firebase.google.com](https://firebase.google.com/).
* **Text Editor or IDE:** (e.g., VS Code, Sublime Text, PyCharm)

### Steps

1.  **Clone the repository:**

    ```bash
    git clone YOUR_GITHUB_REPO_URL
    cd SPIRITX_DOMINATORS_02
    ```

2.  **Set up Firebase:**

    * Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    * Create a Firestore database in your project.
    * Generate a `serviceAccountKey.json` file and place it in the project's root directory.

3.  **Set up environment variables:**

    * Create a `.env` file in the project's root directory.
    * Add your Gemini API key: `GEMINI_API_KEY=YOUR_GEMINI_API_KEY`

4.  **Install dependencies:**

    * **Python:**
        ```bash
        python3 -m venv chatbot_env
        source chatbot_env/bin/activate  # On macOS/Linux
        pip install -r requirements.txt
        ```

    * **React Frontend:**
        ```bash
        cd frontend-react
        npm install
        ```

    * **Admin Panel Backend:**
        ```bash
        cd ../admin-panel-backend
        npm install
        ```

5.  **Run the application:**

    * **Flask Backend and Chatbot:**
        ```bash
        cd ..
        python backend.py
        ```

    * **React Frontend:**
        ```bash
        cd frontend-react
        npm run dev
        ```

    * **Admin Panel Backend:**
        ```bash
        cd ../admin-panel-backend
        node server.js
        ```

6.  **Populate Firebase data:**

    * Use `import-players.js` in `admin-panel-backend` to import player data.
    * Manually add data through the Firebase console.

## Contributing

Contributions are welcome! Fork the repository, make improvements, and create pull requests.

## License

This project is licensed under the terms of the `LICENSE.md` file.

## Contact

For inquiries or suggestions, please contact [your email address].
