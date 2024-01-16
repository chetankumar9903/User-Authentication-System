# Secure User Registration and Login System

![Website Logo](https://github.com/chetankumar9903/User-Authentication-System/assets/126199153/7ac6a75e-2cb5-4ac4-99f2-5c4416dc9d29)

[Website URL](https://user-authenication-system.onrender.com/)

A secure user registration and login system with features like password hashing, JWT-based authentication, cookie management, and more.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Code Snippets](#code-snippets)
- [Improvements](#improvements)
- [References](#references)
- [Contributing](#contributing)
- [License](#license)

## Features

- User registration and login
- Secure password hashing using bcrypt
- JWT-based authentication
- Cookie management for user sessions
- Multi-device sign-out
- Fine-grained authorization procedures

## Description : 
### Secure User Registration and Login System -- July 2023

A user-centric authentication and registration solution prioritizing ease and data security.

## Overview

- Developed a user-centric authentication and registration solution.
- Utilizes bcrypt for password hashing to ensure data security.
- Implements JSON Web Tokens (JWT) for seamless user session management.
- Enhances security through the usage of OAuth tokens.
- Emphasizes best practices in security with dotenv for managing sensitive data.
- Enables complete user control, including registration, login, multi-device sign-out, and fine-grained authorization procedures.

## Technologies Used

The project was developed using the following technologies:

- **HTML, CSS, JavaScript**: Front-end technologies for creating the user interface and interactivity.

- **Node.js with Express.js**: Back-end framework and runtime for building the server and API.

- **MongoDB with Mongoose**: NoSQL database management system for data storage and modeling.

- **bcrypt**: Library used for secure password hashing.

- **JSON Web Tokens (JWT)**: A token-based authentication system for user sessions and authorization.

- **dotenv**: Library for managing sensitive data like environment variables.

- **cookie-parser**: Middleware for handling cookies and managing user sessions.

## Updating User Profile Overview

The `/update-profile` route is a critical part of our application's functionality. It enables users to update their profile information, including modifying existing details and adding new information. Here's how it works:

1. **User Authentication:** To access the profile update feature, users must first log in to their accounts.

2. **Data Validation:** When users submit the profile update form, the server receives the data, including the username, age, phone number, and address. Before proceeding, the server validates that the provided username exists in our database.

3. **Profile Existence Check:** The server also checks if the user already has an existing profile. If a profile is found, it means the user is updating their existing information. If not, a new profile is created for the user.

4. **Updating Existing Profile:** If the user has an existing profile, the server updates the profile with the new information, including age, phone number, and address. This ensures that the user's profile remains up-to-date.

5. **Creating New Profile:** In case the user didn't have a profile previously, a new profile document is created, and the user's information is added to our database.

6. **Success Response:** After successfully updating or creating the profile, the server responds with a success message. The user is then redirected to a view, which in this case is the "secret" view, displaying their updated profile information.

7. **Error Handling:** If any errors occur during this process, such as a user not found or a server error, appropriate error messages are sent as responses to handle these scenarios.

This feature enhances the user experience by allowing them to manage their profile information conveniently. It ensures that their profiles are always accurate and up-to-date.

## Usage

To get started, follow the installation and usage instructions in the [Getting Started](#getting-started) section.

## Getting Started

### Installation

To get started, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/chetankumar9903/User-Authentication-System.git
   cd your-project
2. Install dependencies:
    ```bash
        npm install
3.To run the project, use the following command:
    ```bash```
        npm run dev

## Improvements



## Contributing

Contributions to this project are welcome! 

### Contact Us
If you have any questions, suggestions, or feedback, please reach out to us at Kumarchetan10458@gmail.com.
