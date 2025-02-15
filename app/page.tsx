export default function Home() {
  const techStack = [
    {
      name: "Next.js",
      description:
        "A React framework for building server-side rendered (SSR) web applications.",
      icon: "🚀",
      docs: "https://nextjs.org/docs",
    },
    {
      name: "Tailwind CSS",
      description:
        "A utility-first CSS framework packed with classes like flex, pt-4, that can be composed to build any design, directly in your markup.",
      icon: "🎨",
      docs: "https://tailwindcss.com/docs",
    },
    {
      name: "TypeScript",
      description:
        "A statically typed programming language that builds on JavaScript, giving you better tooling at any scale.",
      icon: "📘",
      docs: "https://www.typescriptlang.org/docs/",
    },

    {
      name: "Zustand",
      description:
        "A simple, scalable, and persistent state management library for React.",
      icon: "🐻",
      docs: "https://docs.pmnd.rs/zustand/getting-started/introduction",
    },
    {
      name: "Zod",
      description:
        "A schema declaration and value parsing library for TypeScript.",
      icon: "✨",
      docs: "https://zod.dev",
    },
    {
      name: "React Hook Form",
      description: "React Hook Form is a library for managing forms in React.",
      icon: "📝",
      docs: "https://react-hook-form.com/docs",
    },
    {
      name: "Clerk",
      description: "Clerk is a library for managing authentication in Nextjs.",
      icon: "🔐",
      docs: "https://clerk.com/docs",
    },
    {
      name: "Tanstack Query",
      description:
        "Tanstack Query is a library for managing data fetching in React.",
      icon: "🔄",
      docs: "https://tanstack.com/query/latest/docs",
    },
    {
      name: "Framer Motion",
      description: "A production-ready motion library for React.",
      icon: "🎥",
      docs: "https://www.framer.com/motion/",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-gray-900 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-4 bg-gradient-to-r from-purple-500 to-pink-600 bg-clip-text text-center text-3xl font-bold text-transparent md:text-6xl">
          AL NEXT.JS TECH STACK
        </h1>
        <p className="mb-8 text-balance text-center text-lg text-gray-400 md:text-2xl">
          A collection of tools and technologies that I use to build for awesome
          products with advanced features.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="group relative rounded-xl border border-gray-700/50 bg-gray-800/50 p-6 backdrop-blur-lg transition-all hover:bg-gray-700/50"
            >
              <a
                href={tech.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full flex-col"
              >
                <div>
                  <div className="mb-4 animate-pulse text-4xl">{tech.icon}</div>
                  <h2 className="text-xl font-bold text-white transition-colors group-hover:text-purple-400">
                    {tech.name}
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {tech.description}
                  </p>
                </div>
                <div className="mt-auto pt-4 text-sm text-purple-500 opacity-0 transition-opacity group-hover:opacity-100">
                  View Documentation →
                </div>
              </a>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-gray-400">
          Made with ❤️ by{" "}
          <a
            href="https://github.com/anton-lokianov"
            className="text-purple-400 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            AL
          </a>
        </p>
      </div>
    </div>
  );
}
