# AudioVerse

A premium, production-ready landing page for the AudioVerse audiobook application.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- next-intl (i18n)
- next-themes (dark/light mode)

## Features

- Full English & Arabic (RTL) localization
- Dark/Light mode with system preference
- WCAG accessible
- SEO optimized (metadata, Open Graph, Twitter Cards, JSON-LD ready)
- Premium animations with Framer Motion
- Responsive design
- Legal pages (Privacy, Terms, Delete Account)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
audioverse/
├── app/
│   ├── [locale]/          # Localized routes
│   │   ├── page.tsx        # Landing page
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── delete-account/
│   ├── layout.tsx          # Root layout
│   └── globals.css
├── components/             # React components
├── messages/               # Translation files
│   ├── en.json
│   └── ar.json
├── lib/
│   ├── i18n.ts
│   └── utils.ts
├── middleware.ts           # next-intl middleware
├── tailwind.config.ts
└── next.config.js
```

## License

MIT
