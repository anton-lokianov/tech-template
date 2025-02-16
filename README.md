# AL Tech Stack Template

Welcome to the **AL Tech Stack Template**! This repository serves as a starter template for building modern web applications using Next.js alongside a curated list of tools and technologies. It comes pre-configured with environment variable validation, Prisma integration, React Query support, and many more goodies.

---

## Table of Contents

- [Features](#features)
- [Repository Structure](#repository-structure)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [CI & Linting](#ci--linting)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Next.js 15** with the new app directory structure supporting both server- and client-side components.
- **Tailwind CSS** for rapid and responsive design.
- **TypeScript** for improved developer experience with static typing.
- **Zod & Custom Environment Validation:** Ensures that both server- and client-side environment variables are validated at build time.
- **React Query (Tanstack Query) Integration:** Provides smart caching and SSR support for data fetching.
- **React Hook Form** integrated with Zod via a custom hook (`useZodForm`) for streamlined form validation.
- **Prisma ORM** for type-safe database access (configured for PostgreSQL).
- **Clerk** for authentication management.
- **Interactive CLI Setup Script:**
  - Reinitializes the Git repository (removing previous history for a clean slate).
  - Installs initial project dependencies.
  - Optionally installs additional packages (e.g., framer-motion, zustand, shadcn UI) based on user input.
- **GitHub Actions CI Workflow:** Automatically handles type checking, linting, and testing on every push.
- **Jest:** Integrated for unit testing to ensure code quality and help maintain robust test coverage.

---

## Repository Structure

```
.
├── app
│   ├── layout.tsx          # Global layout wraps with Clerk and ReactQueryProvider; includes Google fonts.
│   └── page.tsx            # Home page displaying the tech stack.
├── cli
│   ├── installers.js       # Contains functions to install dependencies and reinitialize Git.
│   └── questions.js        # Simplifies user prompts via the terminal.
├── hooks
│   └── use-zod-form.ts     # Custom hook integrating react-hook-form with Zod for form validation.
├── lib
│   ├── get-query-client.ts # Provides a QueryClient instance for React Query.
│   ├── config
│   │   └── db.ts           # Prisma client configuration using environment variables.
│   └── helpers
│       └── env-helper.ts   # Environment variable helper that validates with Zod.
├── prisma
│   └── schema.prisma       # Prisma schema file for PostgreSQL.
├── providers
│   └── react-query.tsx     # Wraps the app in Tanstack Query's QueryClientProvider.
├── env.ts                  # Sets up environment variable validation using a custom helper.
├── setup.js                # Interactive CLI setup script to reinitialize Git, install dependencies, and more.
└── .github
    └── workflow
        └── ci.yaml         # GitHub Actions workflow for CI: installs dependencies, typechecks, and lints.
```

---

## Installation & Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anton-lokianov/AL-tech-template.git
   cd AL-tech-template
   ```

2. **Run the Interactive Setup**

   The repository comes with an interactive setup script (`setup.js`) that performs the following tasks:

   - **Reinitialize Git:**  
     Removes any existing `.git` directory and initializes a new Git repository
   - **Install Dependencies:**  
     Runs `npm install` to install all required dependencies.
   - **Optional Package Installation:**  
     Prompts you with options to install additional packages such as:

     - **framer-motion**
     - **zustand**
     - **shadcn UI**

     You can choose whether or not to install each of these packages during the setup.

   To run the setup script, simply use:

   ```bash
   node setup.js
   ```

   _Tip: If you prefer not to update file permissions on a script, running it with `node setup.js` avoids the need to run `chmod +x setup.js`._

---

## Environment Variables

The project uses a custom environment variable management module to validate both server- and client-side variables using Zod.

- **Server Variables** are defined in `env.ts`:

  - For example, the required `NODE_ENV` is validated against the allowed values: `development`, `production`, or `test`.

- **Client Variables** must be prefixed with `NEXT_PUBLIC_`.

- **Skipping Validation:**  
  If you need to bypass the validation (e.g., during Docker builds), run the build with the `SKIP_ENV_VALIDATION` environment variable set:

  ```bash
  SKIP_ENV_VALIDATION=true npm run dev
  ```

---

## Usage

### Running the Development Server

Start the Next.js development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

### Building the Project for Production

Build the project with:

```bash
npm run build
```

And then start the production server:

```bash
npm start
```

### Running Tests / Linting

- **Typecheck:**

  ```bash
  npm run typecheck
  ```

- **Lint:**

  ```bash
  npm run lint
  ```

---

## CI & Linting

The repository includes a **GitHub Actions** workflow (`.github/workflow/ci.yaml`) which performs the following steps on every push:

- Checks out the repository.
- Installs dependencies.
- Copies `.env.example` files to their corresponding `.env` files.
- Runs TypeScript typechecking.
- Runs ESLint for code quality.

This ensures your codebase remains robust and error-free.

---

## License

[MIT](LICENSE)

---

Enjoy building your project with **AL Tech Stack Template**!
