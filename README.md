⚠️ Note: This project was built for a hackathon. The .env file contains non-sensitive, disposable keys and is left public intentionally. Do not reuse these values.
# MigrantConnect Web Application

MigrantConnect is a web-based platform developed to support internal migrant workers across India by providing a portable digital identity system. This enables secure access to essential services including job listings, accommodation, emergency support, and document management — anywhere, anytime, in any language.

This repository contains the web application version of the MigrantConnect platform, created as part of the Global Hackathon organized by Infosys on July 11–12, 2025, by Team Rocket. A parallel mobile application was developed using Flutter with a broader set of features.

## Project Background

India is home to over 450 million internal migrant workers, many of whom face difficulties in accessing public services due to:

- Lack of a portable digital identity across state borders  
- Language and literacy barriers limiting the use of digital platforms  
- Inconsistent service eligibility and verification rules between states  
- Poor offline access in rural or remote areas  
- Fragmented welfare systems that require repeated re-enrollment and verification  

These challenges often result in migrant families being excluded from crucial services, reinforcing cycles of poverty and vulnerability.

**Our solution:** A portable digital identity platform that facilitates access to essential services for migrants, irrespective of location or language barriers.

## Features (Web Application)

- Email-based login using Magic.link with one-time password (OTP)
- Aadhaar upload for digital identity verification using Multer and IPFS
- Secure document wallet for storing essential documents
- Google Maps integration for location-based services
- Google Calendar integration for managing appointments
- Notes section for quick personal reminders
- Sidebar navigation with categorized service access
- Emergency service contact information and notifications

*Note: Due to time constraints, the web application includes a limited set of features compared to the mobile application.*

## Features (Mobile Application)

The mobile application, built using Flutter, includes:

- Multilingual support for major Indian languages
- Interactive map with geolocation and service discovery
- Voice assistant with speech-to-text and text-to-speech capabilities
- Job matching features for employers and job seekers
- Accommodation discovery and booking support
- Emergency contact directory
- Real-time updates on laws and public services
- Smart document translator for scanned documents, images, and text

## Technical Architecture

### Frontend

- React.js
- Responsive UI design
- Google Maps and Calendar API integration

### Backend

- Node.js with Express framework
- CORS for secure cross-origin requests
- Multer for handling file uploads
- Axios for HTTP requests to third-party APIs (e.g., Pinata/IPFS)

### Blockchain Infrastructure

- Smart contract development using Hardhat
- Deployment on the Amoy Testnet
- Alchemy as the blockchain RPC provider
- IPFS and Pinata for decentralized file and metadata storage
- Magic.link for:
  - Non-custodial wallet creation
  - Email-based, passwordless authentication
  - Seamless onboarding for users

*Note: Magic.link is integrated for identity and wallet management at the infrastructure level and is not a simple frontend library.*

## Screenshots

**Dashboard and Navigation**

![Dashboard](./assets/dashboard.png)

**User Registration Form**

![Registration](./assets/registration.png)

## Development Timeline

This project was developed over two days during the Global Hackathon hosted by Infosys on July 11–12, 2025.

## Future Enhancements

- Add multilingual support to the web application
- Integrate the document translation module using OCR and natural language processing
- Extend the web interface to support job listings and accommodation features
- Implement voice assistant and speech functionalities
- Add offline-first capabilities using service workers

## License

This project is licensed under the MIT License.

## Team

**Team Rocket**  
Contributors to both the mobile and web versions of MigrantConnect during the Infosys Hackathon 2025.

Members: Vidya S R, Amrita Reji, Meera R S
