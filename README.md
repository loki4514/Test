# Enhanced Authentication API

This project aims to enhance an existing backend API for an authentication system to include a new feature allowing users to set their profiles as public or private. Additionally, it implements functionality to allow admin users to view both public and private user profiles, while normal users can only access public profiles. The backend is implemented using Node.js.

## User Stories

- As a user, I can register a new account.
- As a user, I can log in.
- As a user, I can log in or register with at least one of the following services: Google, Facebook, Twitter, or GitHub.
- As a user, I can sign out.
- As a user, I can see my profile details.
- As a user, I can edit my details including: photo, name, bio, phone, email, and password.
- As a user, I can upload a new photo or provide an image URL.
- As a user, I can choose to make my profile public or private.
- As an admin user, I can see both public and private user profiles.
- As a normal user, I can only see public user profiles.

## Requirements

- Use Node.js for the backend.
- Enhance the existing authentication system to include the option for users to set their profiles as public or private.
- Implement authorization checks to allow admin users to access both public and private profiles.
- Normal users should only be able to access public profiles.
- Ensure that private user details remain private to unauthorized users.
- Include endpoints for listing public profiles and retrieving user profiles based on user roles.
- Update the user profile editing functionality to include the option to set the profile as public or private.

## Installation

1. Clone the repository: `git clone https://github.com/loki4514/Test` or fork the directory.
   It's better to make split screen in your terminal
3. Navigate to the project directory of Client Side: `cd client `
4. Install dependencies: `npm install`
5. Navigate to the project directory of Server Side: `cd server `
6. Install dependencies: `npm install`
7. To run project: `npm start` on client and server terminal

## Technologies Used

- Node.js
- ReactJs for frontend part
- Express.js
- MongoDB (or any preferred database)
- GoogleOuth (for authentication)
- JWT (JSON Web Tokens) for token-based authentication


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

