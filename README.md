# ETailed - Frontend

## Tech Stack Used
- React 19
- Vite
- Tailwind CSS
- Recharts
- React Router DOM

## Setup Instructions

1. **Clone the repository**
   ```sh
   git clone <your-repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the development server**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) by default.

4. **Build for production**
   ```sh
   npm run build
   ```
   The production-ready files will be in the `dist` folder.

5. **Preview the production build**
   ```sh
   npm run preview
   ```

---

### Notes
- Make sure you have Node.js and npm installed.
- For favicon/logo, place your image in `src/assets/Etailed.png`.


### How it works ? 
- 1.	Multi-step Onboarding Wizard (3 Steps)
o	Step 1: Personal Info (Name, Email)
o	Step 2: Business Info (Company Name, Industry, Size)
o	Step 3: Preferences (Theme, Default Dashboard Layout)

- 2. ### Features:
	Progress bar on top
	“Next”, “Back”, and “Submit” buttons
	Input validation for required fields
	Validation messages for invalid inputs
	“Submit” button disabled until all fields are valid

- 3. ### Auto-redirect to dashboard after onboarding
o	Show user info from onboarding
o	Display 3 informative cards:
	 Team Members Count
	 Active Projects
	 Notifications
 

 - 4. ### Optional Features : 
     Also Implemented , like chart for showcasing progress using Rechart. 
  
 - 5. ### Local Storage Usage: 
     The application will remain open on the dashboard with the updated or added user info until logout is triggered. 
     After logout local storage will be cleared. 