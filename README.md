# 🎮 Angular Project - World of Warcraft Guild and Member Management

This is a web application built with **Angular 19** that helps manage information about a WoW guild and its members. It provides features like character viewing, dynamic translations, and raid rankings.

## 🚀 Main Features

- **Guild and Character Management**: View detailed information about a guild and its members, including data such as classes, roles, and statistics.
- **Dynamic Translation System**: Display information in multiple languages with a built-in translation system.
- **Raid Encounter Rankings**: Access guild raid rankings and encounter details.
- **Cache Optimization**: Improves performance by caching data, reducing the load on requests.
- **Optimized Interface**: Clean and responsive design using **Tailwind CSS** for better user experience.
- **Flexible Configuration**: Customize the content and connect to external data sources using environment variables.
- **Netlify Deployment**: Easily deploy the project to Netlify, with dynamic routing redirects set up.

## 📦 Installation and Usage

### 1. Clone the repository

```bash
git clone https://github.com/DonOtame/WowGuildApp.git
cd proyecto-angular
```

### 2. Install dependencies

```bash
npm install
```
## 3. Run the development server

```bash
ng serve
```

## 4. Deployment on Netlify

For proper production deployment, ensure that the following rule is included in the `_redirects` file:

```sh
/* /index.html 200
```



