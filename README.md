# Meet Patel — Developer Portfolio

A responsive personal portfolio built with React and Vite. It introduces Meet Patel, presents selected projects and technical skills, and provides ways to get in touch.

## Portfolio sections

- **Hero** — introduction, animated developer titles, project/contact links, resume download, and GitHub profile.
- **About** — background and profile.
- **Journey** — development journey.
- **Projects** — project descriptions, technologies, and links.
- **Technical skills** — technologies and areas of expertise.
- **Education and certifications** — academic and certification details.
- **Contact** — contact options.

The layout adapts to phone, tablet, desktop, and large-screen viewports. GSAP powers the page animations and smooth scrolling.

## Tech stack

- React 19
- Vite 8
- GSAP, ScrollTrigger, and ScrollSmoother
- CSS
- Lucide React and React Icons

## Run locally

Install [Node.js](https://nodejs.org/) and npm, then run:

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server. |
| `npm run build` | Create the production build in `dist/`. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint. |

To build and preview the production version:

```bash
npm run build
npm run preview
```

Deploy the contents of `dist/` to a static web host.

## Project structure

```text
public/
  assets/                 Profile image, logo, and project videos
  Meet-Patel-Resume.pdf
src/
  components/             Portfolio sections and shared UI
  data/                   Project, navigation, education, and skills content
  style/index.css         Global styles and responsive layouts
```

## Updating portfolio content

- Edit `src/data/projects.json` to update project descriptions, technologies, videos, and external links.
- Edit the relevant JSON file in `src/data/` to update navigation, education, certifications, journey, or skills.
- Update the React components in `src/components/` to change section content or behavior.
- Replace the profile image, project videos, or resume in `public/` while keeping the referenced paths up to date.
