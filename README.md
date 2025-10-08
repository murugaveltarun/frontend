# TaskWiser Frontend

A modern, role-based task management web application built with React. TaskWiser provides intuitive dashboards for both users and administrators to efficiently manage tasks, users, and analytics.

![TaskWiser Demo](frontend-demo.png)

## 🚀 Overview

TaskWiser is a comprehensive task management solution that empowers teams and individuals to organize, track, and manage their work effectively. The frontend delivers a seamless user experience with role-based access control, real-time updates, and comprehensive analytics.

### Key Features

- **🔐 Secure Authentication**: JWT-based authentication with OAuth2 integration (Google Login)
- **👥 Role-Based Access**: Separate dashboards for Users and Administrators
- **📊 Advanced Analytics**: Comprehensive statistics and data visualization
- **🎨 Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **⚡ Real-time Updates**: Instant feedback with toast notifications
- **📱 Mobile Responsive**: Optimized for all device sizes
- **🔍 Advanced Filtering**: Powerful task filtering and sorting capabilities
- **📈 Data Visualization**: Interactive charts and graphs using Recharts

## 🛠️ Technologies Used

### Core Technologies
- **React 19.1.1** - Modern React with hooks and context
- **Vite 7.1.2** - Fast build tool and development server
- **React Router DOM 7.8.2** - Client-side routing
- **Tailwind CSS 4.1.12** - Utility-first CSS framework

### State Management & API
- **Context API** - Built-in React state management
- **Axios 1.11.0** - HTTP client for API communication
- **JWT Decode 4.0.0** - JWT token handling

### UI Components & Visualization
- **Lucide React 0.542.0** - Beautiful icon library
- **React Hot Toast 2.6.0** - Toast notifications
- **Recharts 3.2.1** - Data visualization library
- **React Datepicker 8.7.0** - Date selection components
- **Date-fns 4.1.0** - Date manipulation utilities

### Development Tools
- **ESLint** - Code linting and formatting
- **Vite Plugin React** - React development support

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── context/         # React Context providers
│   │   ├── AuthContext.jsx      # Authentication state management
│   │   ├── UsersContext.jsx     # User data management
│   │   └── StatsProvider.jsx    # Statistics data provider
│   ├── error/           # Error page components
│   │   ├── Forbidden.jsx
│   │   ├── NotFound.jsx
│   │   └── Unauthorized.jsx
│   ├── model/           # Modal components
│   │   ├── ConfirmModel.jsx
│   │   └── Loading.jsx
│   ├── navigation/      # Navigation components
│   │   ├── AdminSidebar.jsx
│   │   ├── AdminNavbar.jsx
│   │   ├── UserSidebar.jsx
│   │   └── [other navigation components]
│   ├── protected/       # Route protection
│   │   └── ProtectedRoute.jsx
│   └── toast/           # Toast notification components
│       └── PublicToast.jsx
├── pages/               # Page components
│   ├── admin/           # Admin dashboard pages
│   │   ├── AdminDashboard.jsx
│   │   ├── components/  # Admin-specific components
│   │   │   ├── AllStats.jsx
│   │   │   ├── AllTasksAdmin.jsx
│   │   │   ├── AllUsers.jsx
│   │   │   └── charts/  # Analytics charts
│   │   └── pages/       # Admin page layouts
│   ├── auth/            # Authentication pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── ResetPassword.jsx
│   │   ├── OauthCallBack.jsx
│   │   └── AuthContext.jsx
│   ├── user/            # User dashboard pages
│   │   ├── components/  # User-specific components
│   │   │   ├── AddTask.jsx
│   │   │   ├── AllTasks.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── ViewTask.jsx
│   │   └── pages/       # User page layouts
│   └── home/            # Landing page
│       └── Home.jsx
├── utils/               # Utility functions
│   ├── api.js           # API configuration and interceptors
│   ├── checkTokenOrRefresh.js  # Token validation
│   └── sort.js          # Sorting utilities
├── App.jsx              # Main application component
├── App.css              # Global styles
├── index.css            # CSS imports and global styles
└── main.jsx             # Application entry point
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory:
   ```env
   # Backend API Configuration
   VITE_BACKEND_URL=http://localhost:8080/api
   
   # OAuth Configuration (Google)
   VITE_GOOGLE_CLIENT_ID=your_google_client_id
   VITE_GOOGLE_CLIENT_SECRET=your_google_client_secret
   
   # Application Configuration
   VITE_APP_NAME=TaskWiser
   VITE_APP_VERSION=1.0.0
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   
   Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐳 Docker Setup

### Development with Docker

Create a `Dockerfile` in the root directory:

```dockerfile
# Use Node.js 18 Alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "3000"]
```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - VITE_BACKEND_URL=http://backend:8080/api
      - VITE_GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
      - VITE_GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
    depends_on:
      - backend
    networks:
      - taskwiser-network

  backend:
    # Your backend service configuration
    image: taskwiser-backend:latest
    ports:
      - "8080:8080"
    networks:
      - taskwiser-network

networks:
  taskwiser-network:
    driver: bridge
```

### Docker Commands

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d

# Stop services
docker-compose down
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_BACKEND_URL` | Backend API base URL | Yes | `http://localhost:8080/api` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | Yes | - |
| `VITE_GOOGLE_CLIENT_SECRET` | Google OAuth client secret | Yes | - |
| `VITE_APP_NAME` | Application name | No | `TaskWiser` |
| `VITE_APP_VERSION` | Application version | No | `1.0.0` |

### API Configuration

The application uses Axios for HTTP requests with automatic token injection:

```javascript
// API base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true
});

// Automatic JWT token injection
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🔍 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading

**Problem**: Environment variables are undefined or not loading properly.

**Solution**:
- Ensure `.env` file is in the root directory (same level as `package.json`)
- Restart the development server after adding new variables
- Variables must start with `VITE_` to be accessible in the frontend
- Check for typos in variable names

#### 2. CORS Errors

**Problem**: CORS (Cross-Origin Resource Sharing) errors when making API requests.

**Solution**:
- Ensure backend is configured to allow requests from your frontend URL
- Check that `VITE_BACKEND_URL` is correctly set
- For development, ensure backend allows `http://localhost:5173`

#### 3. Authentication Issues

**Problem**: Users cannot log in or are redirected unexpectedly.

**Solution**:
- Clear browser localStorage and cookies
- Verify JWT token is being stored correctly
- Check backend authentication endpoints are accessible
- Ensure OAuth credentials are correctly configured

#### 4. Build Errors

**Problem**: Application fails to build for production.

**Solution**:
- Run `npm run lint` to check for code issues
- Ensure all environment variables are properly set
- Check for any missing dependencies
- Verify all imports are correct

#### 5. Hot Module Replacement (HMR) Issues

**Problem**: Changes not reflecting in development mode.

**Solution**:
- Restart the development server
- Clear browser cache
- Check for syntax errors in the code
- Ensure file paths are correct

### Performance Optimization

- **Code Splitting**: Routes are automatically code-split by Vite
- **Bundle Analysis**: Use `npm run build -- --analyze` to analyze bundle size
- **Image Optimization**: Optimize images before adding to the project
- **Lazy Loading**: Components are loaded on-demand

## 📊 Features Overview

### User Dashboard
- ✅ Create, edit, and delete personal tasks
- ✅ Advanced filtering and sorting
- ✅ Task progress tracking
- ✅ Profile management
- ✅ Responsive design for mobile devices

### Admin Dashboard
- ✅ User management and analytics
- ✅ Task oversight across all users
- ✅ Comprehensive statistics and charts
- ✅ User activity monitoring
- ✅ Data export capabilities

### Security Features
- ✅ JWT-based authentication
- ✅ OAuth2 integration (Google)
- ✅ Role-based access control
- ✅ Protected routes
- ✅ Automatic token refresh
- ✅ Secure API communication

## 🤝 Contributing

We welcome contributions to TaskWiser! Please follow these guidelines:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Run tests and linting**
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Code Style Guidelines

- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design
- Test on multiple browsers and devices

### Reporting Issues

When reporting issues, please include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite Team** - For the fast build tool
- **Contributors** - All contributors who help improve TaskWiser

---

**Built with ❤️ by the TaskWiser Team**

For more information, visit our [documentation](docs/) or contact us at [support@taskwiser.com](mailto:support@taskwiser.com).