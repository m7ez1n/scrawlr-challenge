<div align="center">
  <img src="public/assets/scrawlr-logo.png" alt="Scrawlr Logo" width="200"/>
</div>

Create a React upvote system where each list works independently - clicking any upvote toggles the ENTIRE list.

"+" button adds new upvotes that inherit the list's current state.

Use Context + useReducer, persist in localStorage, specific colors:
- Default background color #F4F6F8 with arrow #343A40 
- Selected background color #E5E8FD with arrow #253CF2

Reusable components.

🎯 Essence: Grouped upvote lists + persistence + tests.

<div align="center">
<img width="400" alt="desktop-image" src="./.github/assets/desktop-image.png" />
<img width="200" alt="mobile-image" src="./.github/assets//mobile-image.png" />
</div>

## 🚀 Features

- Modern and responsive UI with Tailwind CSS
- Type-safe development with TypeScript
- Fast development experience with Vite
- State management with React Context and Reducer
- Comprehensive testing with Vitest
- Code quality tools with Biome

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended), npm, or yarn

## 🛠️ Installation

### Option 1: Local Development

1. Clone the repository:
```bash
git clone https://github.com/m7ez1n/scrawlr-assessment
cd scrawlr
```

2. Install dependencies:
```bash
# Recommended
pnpm install

# Alternative
npm install
# or
yarn install
```

3. Start the development server:
```bash
# Recommended
pnpm dev

# Alternative
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Option 2: GitHub Codespaces

1. **Open in Codespaces:**
   - Go to the repository on GitHub
   - Click the green "Code" button
   - Select "Codespaces" tab
   - Click "Create codespace on main"

2. **Wait for Setup:**
   - The devcontainer will automatically:
     - Install Node.js LTS
     - Install PNPM globally
     - Install project dependencies
     - Configure VS Code extensions (Biome, Tailwind, TypeScript)

3. **Start Development:**
   ```bash
   pnpm dev
   ```

4. **Access the App:**
   - Codespaces will automatically forward port 5173
   - Click on the "Open in Browser" notification or
   - Go to the "Ports" tab in VS Code and click the globe icon

**Benefits of Codespaces:**
- ✅ No local setup required
- ✅ Pre-configured development environment
- ✅ Consistent environment across team members
- ✅ Automatic dependency installation
- ✅ Built-in code formatting with Biome

## 🧪 Testing

Run the test suite:
```bash
# Recommended
pnpm test

# Alternative
npm run test
# or
yarn test
```

## 📚 Documentation

For more details about the project's architecture, technologies, and development timeline, check out our [Roadmap](./roadmap.md).

## 🛠️ Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vitest](https://vitest.dev/)
- [Biome](https://biomejs.dev/)
- [Lucide React](https://lucide.dev/)


