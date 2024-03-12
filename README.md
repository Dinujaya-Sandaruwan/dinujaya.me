# Dinujaya's Portfolio

![Project Screenshot](https://github.com/Dinujaya-Sandaruwan/dinujaya.me/assets/88492493/dd2d0181-09fa-44b6-aef1-89bf71d7ed1c)

[Live Preview](https://dinujaya.me/)

## About The Project

Dinujaya's Portfolio is an ambitious web application developed using React, TypeScript, and SCSS. It functions as a social media platform, chronicling the creator's life with a full timeline. Users can engage with various features such as sharing posts, adding comments, liking content, and more.

## Used Technologies

Dinujaya's Portfolio leverages the following technologies:

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **SCSS**: A CSS preprocessor that enhances the capabilities of CSS with variables, mixins, and more.
- **Firebase**: A platform that offers various services like authentication, storage, and real-time database.
- **Axios**: A promise-based HTTP client for making requests.
- **Zustand**: A minimalistic state management library for React applications.
- **Other Modules**: The project includes various modules like `react-icons` for incorporating icons, `react-modal-video` for modal videos, and more as listed in the `package.json`.


## Usage

Dinujaya's Portfolio offers an array of features to users:

- **Authentication**: Users can sign in using their Google accounts.
- **Post Management**: Users can add, delete, and share posts, including multimedia content.
- **Interaction**: Features include adding and deleting comments, liking posts, and sharing content on other platforms.
- **Search Functionality**: Users can search through the content available on the platform.
- **Project Showcase**: The platform showcases the creator's projects and offers a marketplace for products.
- **Blog and News Service**: Dinujaya's Portfolio integrates an in-built blog and a news service.
- **Dynamic Todo List**: A dynamic todo list is available, utilizing an external API.
- **Social Interaction**: Users can become friends on the platform and send notifications to each other.
- **Visitor Count**: The platform tracks the number of visitors.
- **GitHub Integration**: Dinujaya's latest GitHub projects are displayed using GitHub API.
- **One-Click Order**: Users can quickly place orders with advertisements.
- **Mentor Display**: The platform displays the creator's mentors and teachers.
- **Portfolio Video Presentation**: Users can include a video presenting themselves.

## Features Overview

Here's a summary of the features with their completion status:

| Feature                                   | Status   |
|-------------------------------------------|----------|
| Sign in using Google                      | Finished |
| Add & delete posts                        | Finished |
| Add & delete comments                     | Finished |
| Add & remove likes                        | Finished |
| Share posts on other platforms            | Not Finished |
| Search through content                    | Not Finished |
| Feature your projects                     | Not Finished |
| Add products through marketplace          | Not Finished |
| In-built blog                             | Not Finished |
| News service                              | Not Finished |
| Feature favorite Facebook groups          | Finished |
| Dynamic todo list using API               | Not Finished |
| Ability to become friends on site         | Not Finished |
| Send notifications to users               | Not Finished |
| Visitors count                            | Finished |
| Feature latest GitHub projects            | Finished |
| 1-click order with ads                    | Finished |
| Display portfolio owner's mentors/teachers| Finished |
| Portfolio video presenting                | Finished |

## How to Use

### Cloning the Repository

1. Clone the repository from [GitHub](https://github.com/Dinujaya-Sandaruwan/dinujaya.me).

### Installing Dependencies

2. Run `npm install` to install all dependencies listed in the `package.json`.

### Running the Development Server

3. Run `npm run dev` to start the development server. Access the local environment via [http://localhost:5173/](http://localhost:5173/).


## Environment Variables (.env)

Environment variables are essential configurations needed for your project to function properly. Ensure you have the following environment variables properly set up in your `.env` file:

- **Firebase Project Data**:
  - VITE_API_KEY
  - VITE_AUTH_DOMAIN
  - VITE_PROJECT_ID
  - VITE_STORAGE_BUCKET
  - VITE_MESSAGING_SENDER_ID
  - VITE_APP_ID
  - MEASUREMENT_ID
- **Admin User ID**:
  - VITE_USER_ID
- **GitHub Personal Access Token**:
  - VITE_PERSONAL_ACCESS_TOKEN

### Firebase Project Data

These variables are required for Firebase services such as authentication, storage, and real-time database. You can obtain these values from your Firebase project settings.

### Admin User ID

This variable identifies the admin user of the portfolio website. Ensure that you have the correct user ID configured to enable admin privileges.

### GitHub Personal Access Token

This token is necessary if your project interacts with GitHub, such as fetching data from repositories or performing other GitHub-related operations. You can generate a personal access token from your GitHub account settings with appropriate permissions.

Ensure that you keep your `.env` file secure and do not expose it publicly, as it may contain sensitive information necessary for the proper functioning of your project.


Enable Authentication, Storage, and Firestore Database for your Firebase project.

## Contributing

Contributions to Dinujaya's Portfolio are welcome! Feel free to submit pull requests for any improvements or bug fixes.

## License

This project is licensed under the MIT License. You can find the license information in the LICENSE file.

## Contact

- [FaceBook](https://www.facebook.com/dinujaya.sandaruwan/)
- [Linkedin](https://www.linkedin.com/in/dinujaya-sandaruwan-23bb09201/)
- [Sololearn](https://www.sololearn.com/profile/28608081)
- [Youtube](https://www.youtube.com/channel/UCVwXuCDRdBjzNUOWYOCO_xg)
- Email: info.dinujaya@gmail.com

## Acknowledgments

- **Idea**: by the project creator
- **Inspired**: Mosh Hamedani with his React lessons

Mosh Hamedani's React lessons provided valuable insights and inspiration for the development of this project.
