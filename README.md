# Sticky Note App

A simple sticky note web application built with React, TypeScript, Tailwind CSS, and tailwind-variants. The project follows the Atomic Design pattern for component structure and a feature-based naming convention for files.

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at the local address shown in your terminal (typically http://localhost:5173).

## Tech Stack

- **React** – UI library for building interactive interfaces
- **TypeScript** – Strongly typed JavaScript
- **Tailwind CSS** – Utility-first CSS framework
- **tailwind-variants** – Utility for managing Tailwind CSS variants and creating reusable, composable class sets for components
- **Vite** – Fast build tool and dev server

## Project Structure

- **Atomic Design Pattern**: Components are organized into `atoms`, `molecules`, and `organisms` folders for scalability and reusability. Using atomic design also makes it easier to write unit tests for small, focused components in the future.
- **Feature-based Naming**: Files and folders are named according to their feature or responsibility, making the codebase easy to navigate and maintain.
- **Barrel Imports**: Each folder (e.g., `atoms`, `molecules`, `organisms`) contains an `index.ts` file that re-exports all components in that folder. This allows you to import components from a single entry point, making imports cleaner and easier to manage.
- **Tailwind Variants for Styling**: The project uses tailwind-variants to manipulate component styling, enabling the creation of flexible and maintainable class sets for different component states and variants.

```
src/
  components/
    atoms/
      index.ts   # barrel file
    molecules/
      index.ts   # barrel file
    organisms/
      index.ts   # barrel file
  hooks/
  contexts/
  configs/
  types/
  utils/
```

## License

MIT
