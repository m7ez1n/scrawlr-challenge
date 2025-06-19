## 🚀 Chosen Technologies

- [React with Vite](https://vitejs.dev/guide/) 
  - Extremely fast build tool with optimized HMR (Hot Module Replacement)
  - Zero-config for TypeScript, JSX, CSS and more
  - Optimized bundle size with Rollup
  - Native ESM (ECMAScript Modules) support
  - Excellent DX (Developer Experience) with instant feedback

- [TypeScript](https://www.typescriptlang.org/)
  - Static type system that prevents runtime errors
  - Better autocompletion and IntelliSense
  - Interfaces and types that document the code
  - Facilitates refactoring and maintenance

- [Tailwind CSS](https://tailwindcss.com/) 
  - Utility-first approach that eliminates the need to name classes
  - Simplified responsive design
  - Centralized configuration for customization

- [Lucide React](https://lucide.dev/)
  - Optimized SVG icon library
  - Customization via props (size, color, stroke)
  - Tree-shakeable (only imports used icons)
  - Visual consistency throughout the application

- [Biome](https://biomejs.dev/)
  - Linter, formatter and bundler in a single tool
  - Superior performance to ESLint + Prettier
  - Zero configuration required
  - Native TypeScript support
  - Optimized linting rules for React

- [Vitest](https://vitest.dev/) 
  - Compatible with Jest but much faster
  - Native TypeScript and ESM support
  - Interactive UI for testing
  - Intelligent watch mode
  - Perfect integration with Vite

- [React Context and Reducer](https://react.dev/learn/scaling-up-with-reducer-and-context)
 - Native React state management
   - Zero dependencies, smaller bundle, demonstrates React fundamentals over library dependency
  - State Reducer pattern for maximum flexibility 
    - Pure functions easier to test, allows behavior customization, better debugging with React DevTools
  - Avoids prop drilling 
    - Clean data flow, centralized state for all upvote lists without passing props through layers
  - Easy to test and maintain 
    - Pure reducers are straightforward to unit test, standard React patterns any developer understands
  - Clear separation between state logic and UI
    - Business logic isolated in reducers, components focus on presentation
  - Right tool for the scope 
    - Avoids over-engineering a simple system, shows technical maturity in tool selection

## ⌛ Timeline 

### Beginning
1. Understanding project scope and requirements
2. Defining technologies and architecture

### Middle 
1. Creation and configuration of a base UI
2. Creation of context and reducer logic to implement all project requirements
3. Adding components that would be common across the application
4. Adjusting the UI for a more modern and responsive design with new features
5. Adding new functionalities to the reducer (search and reset)

### End 
1. Creating component and store tests
2. Documentation of what was done

## Conclusion 

This was a very interesting project! I was able to review and practice unit testing, which I hadn't been working with for a while. The best part was being able to make technical decisions, choosing the right tools without causing over-engineering, keeping the code simple but ready to grow.