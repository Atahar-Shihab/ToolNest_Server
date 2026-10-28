import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';
import Tool from './models/Tool';
import Review from './models/Review';

dotenv.config();

const toolsData = [
  {
    "title": "ChatGPT",
    "shortDescription": "Flagship conversational AI by OpenAI for reasoning, writing, and coding.",
    "fullDescription": "ChatGPT is OpenAI's industry-defining conversational AI platform. Powered by GPT-4o and OpenAI o1 reasoning models, it delivers advanced problem-solving, live voice interaction, code generation, data analysis, and multimodal vision understanding.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://chatgpt.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128",
    "tags": [
      "AI",
      "Chatbot",
      "Writing",
      "Coding",
      "OpenAI"
    ],
    "features": [
      "GPT-4o multimodal reasoning",
      "Advanced Voice Mode",
      "Canvas for coding & writing",
      "Custom GPT creation",
      "Code execution & data analysis"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "GPT-4o / OpenAI o1",
    "company": "OpenAI",
    "foundedYear": 2022,
    "history": "ChatGPT was launched by OpenAI in November 2022 and became the fastest consumer app to reach 100 million users. It catalyzed the global generative AI revolution, progressing from GPT-3.5 to GPT-4, GPT-4o, and reasoning-centric o1 models."
  },
  {
    "title": "Claude",
    "shortDescription": "State-of-the-art AI assistant by Anthropic renowned for nuanced reasoning and coding.",
    "fullDescription": "Claude is Anthropic's frontier AI assistant built with Constitutional AI principles. Powered by Claude 3.5 Sonnet, it sets industry benchmarks in coding proficiency, complex document synthesis, multi-step logical reasoning, and artifact previews.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://claude.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=claude.ai&sz=128",
    "tags": [
      "AI",
      "Assistant",
      "Reasoning",
      "Coding",
      "Anthropic"
    ],
    "features": [
      "Claude 3.5 Sonnet frontier intelligence",
      "200K token context window",
      "Interactive Artifacts workspace",
      "Visual code & document inspection",
      "Constitutional AI safety guardrails"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet / Opus",
    "company": "Anthropic",
    "foundedYear": 2021,
    "history": "Anthropic was founded in 2021 by former OpenAI research executives Dario and Daniela Amodei. Claude debuted in March 2023, and with Claude 3.5 Sonnet in 2024, it became widely regarded as the premier model for software development and long-context comprehension."
  },
  {
    "title": "Midjourney",
    "shortDescription": "Generative AI art model producing photorealistic imagery from natural language prompts.",
    "fullDescription": "Midjourney is an independent research lab producing leading-edge image synthesis models. Operating through Discord and its dedicated web app, Midjourney v6.1 creates cinematic lighting, hyper-detailed textures, and artistic aesthetics for creators worldwide.",
    "category": "Design",
    "pricing": "Paid",
    "website": "https://midjourney.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=midjourney.com&sz=128",
    "tags": [
      "Art",
      "Design",
      "Image Generation",
      "Creative",
      "Text-to-Image"
    ],
    "features": [
      "Photorealistic image generation",
      "Fine-grained parameter controls (--ar, --v, --stylize)",
      "Web editor with inpainting & outpainting",
      "Vary region & style reference",
      "High-definition upscaling"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Midjourney v6.1",
    "company": "Midjourney Inc.",
    "foundedYear": 2022,
    "history": "Founded by David Holz, co-founder of Leap Motion, Midjourney opened its open beta in July 2022. It quickly dominated digital art creation, powering award-winning magazine covers, concept art, and high-fashion visual campaigns."
  },
  {
    "title": "Cursor",
    "shortDescription": "AI-first code editor with deep codebase understanding and multi-file editing.",
    "fullDescription": "Cursor is a high-performance VS Code fork re-architected from the ground up for AI-native software engineering. It indexes full codebases locally to enable smart multi-file diff generation, intelligent command-K edits, and proactive bug fixing.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://cursor.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=cursor.com&sz=128",
    "tags": [
      "Code",
      "IDE",
      "Developer",
      "Productivity",
      "VS Code"
    ],
    "features": [
      "Full codebase indexing & semantic search",
      "Multi-file edits with Composer",
      "Copilot++ predictive cursor autocomplete",
      "Inline terminal error fixing",
      "Seamless 1-click VS Code extension import"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet / GPT-4o",
    "company": "Anysphere",
    "foundedYear": 2023,
    "history": "Created by MIT researchers Aman Sanger, Michael Truell, Sualeh Asif, and Arvid Lunnemark at Anysphere, Cursor exploded in popularity throughout 2023-2024, becoming the gold standard code editor for thousands of engineering teams."
  },
  {
    "title": "GitHub Copilot",
    "shortDescription": "Industry-standard AI pair programmer integrated across major IDEs.",
    "fullDescription": "GitHub Copilot transforms natural language prompts into working code across dozens of languages. Integrated with VS Code, JetBrains, and Visual Studio, Copilot offers in-editor chat, PR summarization, and CLI guidance.",
    "category": "Coding",
    "pricing": "Paid",
    "website": "https://github.com/features/copilot",
    "thumbnail": "https://www.google.com/s2/favicons?domain=github.com&sz=128",
    "tags": [
      "Code",
      "Developer",
      "Autocomplete",
      "GitHub",
      "Microsoft"
    ],
    "features": [
      "Real-time code completions",
      "Copilot Chat in editor",
      "Pull request summarization",
      "Security vulnerability filtering",
      "Copilot Workspace agent workflows"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "GPT-4o / Claude 3.5 Sonnet",
    "company": "GitHub (Microsoft)",
    "foundedYear": 2021,
    "history": "Launched in June 2021 by GitHub in collaboration with OpenAI, Copilot was the first widespread AI coding assistant. Today it supports over 1.8 million developers and over 77,000 enterprise organizations."
  },
  {
    "title": "Perplexity",
    "shortDescription": "Conversational answer engine delivering real-time research with cited web sources.",
    "fullDescription": "Perplexity AI replaces traditional search engine link lists with synthesized, cited answers. Powered by internal Sonar models as well as Claude 3.5 Sonnet and GPT-4o, Perplexity provides deep Pro Search with multi-step reasoning.",
    "category": "Research",
    "pricing": "Free Plan",
    "website": "https://perplexity.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=perplexity.ai&sz=128",
    "tags": [
      "Search",
      "Research",
      "Citations",
      "Knowledge",
      "Fact-Checked"
    ],
    "features": [
      "Live web source citations",
      "Pro Search multi-step research",
      "File & document analysis",
      "Perplexity Spaces for team knowledge",
      "Focus filters (Academic, Writing, Math)"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Sonar / Claude 3.5 / GPT-4o",
    "company": "Perplexity AI",
    "foundedYear": 2022,
    "history": "Perplexity was founded in 2022 by Aravind Srinivas, Denis Yarats, Johnny Ho, and Andy Konwinski. Backed by Jeff Bezos and NVIDIA, Perplexity has grown into the leading AI-native answer engine processing hundreds of millions of queries monthly."
  },
  {
    "title": "Notion AI",
    "shortDescription": "Connected AI assistant integrated directly into your Notion workspace docs and wikis.",
    "fullDescription": "Notion AI augments notes, projects, and team wikis. It answers questions based on your connected docs, drafts action items, writes summaries, and automatically populates database properties without switching contexts.",
    "category": "Productivity",
    "pricing": "Free Trial",
    "website": "https://notion.so",
    "thumbnail": "https://www.google.com/s2/favicons?domain=notion.so&sz=128",
    "tags": [
      "Notes",
      "Productivity",
      "Workspace",
      "Collaboration",
      "Docs"
    ],
    "features": [
      "Q&A over entire team workspace",
      "AI autofill for database properties",
      "Automatic meeting summaries & action items",
      "Tone revision & translation",
      "Integrated Slack and Google Drive connectors"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet / GPT-4o",
    "company": "Notion Labs",
    "foundedYear": 2023,
    "history": "Notion Labs integrated AI into its flagship all-in-one productivity suite in early 2023. By connecting LLMs directly to private team workspaces and databases, Notion AI established itself as an essential knowledge companion for over 35 million users."
  },
  {
    "title": "Jasper",
    "shortDescription": "Enterprise AI marketing platform built for on-brand content and campaign execution.",
    "fullDescription": "Jasper is tailored for marketing departments and agencies. It learns company brand voice, style guidelines, and knowledge assets to produce multi-channel campaigns, blog posts, ad variants, and SEO content at scale.",
    "category": "Marketing",
    "pricing": "Paid",
    "website": "https://jasper.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=jasper.ai&sz=128",
    "tags": [
      "Marketing",
      "Copywriting",
      "Brand Voice",
      "Content",
      "Enterprise"
    ],
    "features": [
      "Custom Brand Voice & Style Guides",
      "End-to-end Campaign Generator",
      "Company Knowledge Base sync",
      "SEO mode with Surfer SEO integration",
      "Enterprise governance & security"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Jasper Multi-Model Engine (GPT-4 / Claude / Mistral)",
    "company": "Jasper AI",
    "foundedYear": 2021,
    "history": "Founded in Austin, Texas in 2021 by Dave Rogenmoser, John Phillip Morgan, and Chris Hull, Jasper rapidly raised a $125M Series A and evolved from a prompt writer into a full-scale enterprise AI marketing platform."
  },
  {
    "title": "Copy.ai",
    "shortDescription": "AI-driven GTM platform automating sales outreach and marketing operations.",
    "fullDescription": "Copy.ai enables Go-To-Market teams to automate content workflows. From prospecting emails and LinkedIn content to product descriptions and programmatic SEO articles, Copy.ai coordinates multiple LLMs inside structured automated pipelines.",
    "category": "Marketing",
    "pricing": "Free Plan",
    "website": "https://copy.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=copy.ai&sz=128",
    "tags": [
      "GTM",
      "Marketing",
      "Sales",
      "Automation",
      "Workflows"
    ],
    "features": [
      "Workflow builder for GTM automation",
      "Infobase brand knowledge repository",
      "CRM data enrichment integrations",
      "Pre-built marketing & sales templates",
      "Multi-model orchestration"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "GPT-4o / Claude 3.5 Sonnet",
    "company": "Copy.ai Inc.",
    "foundedYear": 2020,
    "history": "Founded by Paul Yacoubian and Chris Lu in 2020, Copy.ai pioneered generative AI copywriting before expanding into automated Go-To-Market workflow engines serving over 15 million users."
  },
  {
    "title": "Writesonic",
    "shortDescription": "AI writing suite specialized in ranking SEO articles, ad copies, and Chatsonic bots.",
    "fullDescription": "Writesonic helps digital creators and agencies generate search-engine-optimized articles and ad copy. Its Article Writer 6 incorporates real-time competitor research, keyword density optimization, and fact-checking into automated long-form articles.",
    "category": "Writing",
    "pricing": "Free Plan",
    "website": "https://writesonic.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=writesonic.com&sz=128",
    "tags": [
      "Writing",
      "SEO",
      "Blogging",
      "Ads",
      "Content"
    ],
    "features": [
      "AI Article Writer 6 with competitor research",
      "Chatsonic with real-time Google Search data",
      "Botsonic no-code AI agent builder",
      "Audience-targeted tone adjustment",
      "One-click export to WordPress & Webflow"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "GPT-4o / Claude 3.5 / Custom Fine-tunes",
    "company": "Writesonic Inc.",
    "foundedYear": 2021,
    "history": "Created by Samanyou Garg in 2021 and backed by Y Combinator, Writesonic grew into an all-in-one AI content platform trusted by over 5 million creators and marketing agencies worldwide."
  },
  {
    "title": "Synthesia",
    "shortDescription": "Leading video creation platform turning scripts into videos with expressive AI avatars.",
    "fullDescription": "Synthesia removes the need for cameras, actors, and physical studios. Users type scripts to generate high-definition video presentations with over 230 realistic AI avatars speaking across 140+ languages with synchronized lip movement.",
    "category": "Video",
    "pricing": "Paid",
    "website": "https://synthesia.io",
    "thumbnail": "https://www.google.com/s2/favicons?domain=synthesia.io&sz=128",
    "tags": [
      "Video",
      "Avatars",
      "Localization",
      "Training",
      "Enterprise"
    ],
    "features": [
      "230+ hyper-realistic AI avatars",
      "Expressive voices in 140+ languages",
      "Custom digital twin avatar creation",
      "Screen recorder & media asset library",
      "Enterprise SCORM training export"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Synthesia Expressive Neural Avatar Engine",
    "company": "Synthesia Ltd.",
    "foundedYear": 2017,
    "history": "Founded in London in 2017 by researchers Victor Riparbelli, Steffen Tjerrild, Matthias Niessner, and Lourdes Agapito. Synthesia reached unicorn status in 2023, serving 50,000+ businesses including Fortune 100 corporate training teams."
  },
  {
    "title": "Runway Gen-2",
    "shortDescription": "Next-generation creative suite pioneering generative video and cinematic effects.",
    "fullDescription": "Runway provides cutting-edge generative media tools for artists, film directors, and visual creators. Powered by Gen-3 Alpha and Gen-2 models, it converts text, images, and video clips into photorealistic cinematic footage with precise camera motion.",
    "category": "Video",
    "pricing": "Free Plan",
    "website": "https://runwayml.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=runwayml.com&sz=128",
    "tags": [
      "Video",
      "VFX",
      "Filmmaking",
      "Gen-3",
      "Creative"
    ],
    "features": [
      "Gen-3 Alpha photorealistic video generation",
      "Motion Brush for selective object animation",
      "Director Mode with advanced camera controls",
      "Image-to-Video and Video-to-Video styling",
      "Background removal & generative audio fx"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Gen-3 Alpha / Gen-2",
    "company": "Runway AI",
    "foundedYear": 2018,
    "history": "Founded in 2018 by Cristóbal Valenzuela, Alejandro Matamala, and Anastasis Germanidis. Runway co-created Stable Diffusion and built the leading AI video suite used in Oscar-winning films such as \"Everything Everywhere All at Once\"."
  },
  {
    "title": "Suno AI",
    "shortDescription": "Breakthrough music generation AI composing full radio-ready songs from prompts.",
    "fullDescription": "Suno produces complete musical compositions with multi-part instrumentation, catchy melodies, and expressive human-like vocals from simple text descriptions. Suno v3.5 and v4 produce broadcast-grade audio across every musical genre.",
    "category": "Music",
    "pricing": "Free Plan",
    "website": "https://suno.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=suno.com&sz=128",
    "tags": [
      "Music",
      "Audio",
      "Songs",
      "Vocals",
      "Creative"
    ],
    "features": [
      "Full song creation (lyrics, vocals, instruments)",
      "Multi-genre support (rock, hip-hop, pop, jazz, classical)",
      "Custom lyric insertion or auto-generation",
      "Song extension & stem separation",
      "High-fidelity audio exports"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Suno v3.5 / v4",
    "company": "Suno Inc.",
    "foundedYear": 2023,
    "history": "Founded in Cambridge, MA by former Kensho machine learning musicians and researchers Mikey Shulman, Keenan Freyberg, Georg Kucsko, and Martin Camacho. Suno democratized music creation, enabling millions of non-musicians to compose original music."
  },
  {
    "title": "ElevenLabs",
    "shortDescription": "World-leading AI voice generator delivering hyper-realistic text-to-speech and cloning.",
    "fullDescription": "ElevenLabs sets the standard for expressive, emotion-aware speech synthesis. It renders text into human-like audio with nuanced intonation, accents, and pacing, alongside instant voice cloning and real-time conversational agents.",
    "category": "Music",
    "pricing": "Free Plan",
    "website": "https://elevenlabs.io",
    "thumbnail": "https://www.google.com/s2/favicons?domain=elevenlabs.io&sz=128",
    "tags": [
      "Audio",
      "Voice",
      "TTS",
      "Voice Cloning",
      "Podcasts"
    ],
    "features": [
      "Hyper-realistic Text-to-Speech in 32+ languages",
      "Instant & Professional Voice Cloning",
      "Sound Effects generator from text prompts",
      "Dubbing Studio with automated voice translation",
      "Conversational AI Agent SDK for live apps"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Eleven Multilingual v2 / Flash / Turbo v2.5",
    "company": "ElevenLabs",
    "foundedYear": 2022,
    "history": "Founded in 2022 by ex-Google engineer Piotr Dabkowski and ex-Palantir strategist Mati Staniszewski. ElevenLabs became a tech unicorn in 2024, powering audiobooks, gaming voices, automated journalism, and movie dubbing."
  },
  {
    "title": "Grammarly",
    "shortDescription": "Ubiquitous AI writing partner providing grammar correction, tone tuning, and revision.",
    "fullDescription": "Grammarly operates seamlessly across browsers, desktop apps, and office suites. Beyond spelling and punctuation, Grammarly AI provides contextual rewrites, tone detection, citation generation, and prompt-driven composition.",
    "category": "Writing",
    "pricing": "Free Plan",
    "website": "https://grammarly.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=grammarly.com&sz=128",
    "tags": [
      "Writing",
      "Grammar",
      "Productivity",
      "Editor",
      "Spelling"
    ],
    "features": [
      "Real-time grammar & spelling correction",
      "Tone detection & adjustment slider",
      "Full-sentence clarity rewrites",
      "Generative drafting & text summaries",
      "Plagiarism & citation checker"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Proprietary NLP + Foundation LLMs",
    "company": "Grammarly Inc.",
    "foundedYear": 2009,
    "history": "Founded in 2009 by Alex Shevchenko, Max Lytvyn, and Dmytro Lider. Grammarly scaled from a grammar checker into an indispensable daily AI communications assistant used by over 30 million people and 70,000 teams."
  },
  {
    "title": "Descript",
    "shortDescription": "Intuitive video and podcast editing platform that edits media just like a text document.",
    "fullDescription": "Descript revolutionizes video editing by automatically transcribing footage and allowing creators to edit video by editing text. Delete words to trim footage, remove filler words with one click, and clone voices using AI Overdub.",
    "category": "Video",
    "pricing": "Free Plan",
    "website": "https://descript.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=descript.com&sz=128",
    "tags": [
      "Video Editing",
      "Podcasts",
      "Audio",
      "Transcription",
      "Overdub"
    ],
    "features": [
      "Script-based video & audio editing",
      "1-click filler word removal (ums, ahs)",
      "Studio Sound studio-grade noise reduction",
      "Overdub voice regeneration for typos",
      "AI Eye Contact correction"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Descript Underlord AI / Whisper / Custom TTS",
    "company": "Descript Inc.",
    "foundedYear": 2017,
    "history": "Founded in 2017 by Groupon founder Andrew Mason. Descript raised over $100M from OpenAI Startup Fund and Andreessen Horowitz, radically simplifying podcast and video production for millions of creators."
  },
  {
    "title": "Beautiful.ai",
    "shortDescription": "Generative presentation maker applying automated design principles to every slide.",
    "fullDescription": "Beautiful.ai eliminates tedious PowerPoint formatting by using Smart Slides that automatically adapt layouts, typography, and spacing as content is added or modified, ensuring professional slide decks every time.",
    "category": "Design",
    "pricing": "Paid",
    "website": "https://beautiful.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=beautiful.ai&sz=128",
    "tags": [
      "Presentations",
      "Design",
      "Slides",
      "Productivity",
      "Business"
    ],
    "features": [
      "Smart Slides auto-formatting engine",
      "DesignerBot text-to-presentation AI",
      "Corporate brand asset locking",
      "Interactive charts & infographic blocks",
      "Export to PowerPoint & PDF"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "DesignerBot + Proprietary Layout AI",
    "company": "Beautiful.ai",
    "foundedYear": 2018,
    "history": "Founded in 2018 by Mitch Grasso, founder of SlideRocket. Beautiful.ai applied algorithmic design rules to pitch decks, saving knowledge workers hundreds of hours compared to manual PowerPoint alignment."
  },
  {
    "title": "Phind",
    "shortDescription": "Intelligent search engine optimized for software developers and technical problem-solving.",
    "fullDescription": "Phind is an answer engine purpose-built for coders. It scrapes technical documentation, Stack Overflow threads, and codebases in real time to generate verified code snippets with step-by-step architectural explanations.",
    "category": "Research",
    "pricing": "Free Plan",
    "website": "https://phind.com",
    "thumbnail": "https://raw.githubusercontent.com/lobehub/lobe-icons/master/packages/static-png/dark/phind.png",
    "tags": [
      "Coding",
      "Search",
      "Developer",
      "Research",
      "Programming"
    ],
    "features": [
      "Real-time technical web search",
      "Phind-70B high-speed coding model",
      "VS Code extension integration",
      "Deep Dive multi-step debugging mode",
      "Code snippet verification & terminal output"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Phind-70B / Claude 3.5 Sonnet",
    "company": "Phind Inc.",
    "foundedYear": 2022,
    "history": "Founded in San Francisco in 2022 by Michael Royzen. Phind was selected into Y Combinator and rapidly gained a passionate following among software engineers by outperforming generic search engines on complex coding tasks."
  },
  {
    "title": "Gamma App",
    "shortDescription": "AI-first medium for crafting polished presentations, webpages, and visual documents.",
    "fullDescription": "Gamma generates visually engaging presentations, documents, and interactive webpages from simple text outlines. It formats flexible cards with live embeds, animations, and custom styling without slide template friction.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://gamma.app",
    "thumbnail": "https://www.google.com/s2/favicons?domain=gamma.app&sz=128",
    "tags": [
      "Presentations",
      "Webpages",
      "Docs",
      "Design",
      "Productivity"
    ],
    "features": [
      "One-click generation from outlines or notes",
      "Fluid card-based layouts replacing static slides",
      "Live web & app component embeds",
      "Interactive analytics for viewers",
      "Export to PDF and PPTX"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet / GPT-4o + Layout Engine",
    "company": "Gamma Tech Inc.",
    "foundedYear": 2022,
    "history": "Founded in 2022 by Grant Lee, Jon Noronha, and James Fox. Gamma raised $12M from Accel and became a breakout viral tool in 2023-2024 with over 10 million users creating visual docs in seconds."
  },
  {
    "title": "Tome",
    "shortDescription": "AI storytelling format creating pitch decks, microsites, and visual narratives.",
    "fullDescription": "Tome combines fluid layouts with generative AI to build multimedia pitch decks, executive summaries, and interactive business proposals. It auto-generates text and images from a single prompt with clean modern typography.",
    "category": "Design",
    "pricing": "Free Plan",
    "website": "https://tome.app",
    "thumbnail": "https://www.google.com/s2/favicons?domain=mytome.com&sz=128",
    "tags": [
      "Storytelling",
      "Presentations",
      "Pitch Decks",
      "Design",
      "Mobile"
    ],
    "features": [
      "Prompt-to-presentation generation",
      "Dynamic mobile-responsive canvas",
      "Interactive prototype & Figma embeds",
      "AI image generation integration",
      "Real-time viewer engagement analytics"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "GPT-4o + Generative Imagery",
    "company": "Magical Tome Inc.",
    "foundedYear": 2020,
    "history": "Founded in 2020 by former Meta product leaders Keith Peiris and Henri Liriani. Tome achieved the fastest 1 million user milestone among generative tools in early 2023, raising $43M from Lightspeed and Greylock."
  },
  {
    "title": "DALL·E 3",
    "shortDescription": "OpenAI's highly accurate image generation model with nuanced prompt comprehension.",
    "fullDescription": "DALL·E 3 translates intricate text descriptions into detailed, faithful images. Built natively on top of ChatGPT, DALL·E 3 faithfully adheres to complex composition, legible in-image text, and diverse artistic styles.",
    "category": "Design",
    "pricing": "Paid",
    "website": "https://openai.com/dall-e-3",
    "thumbnail": "https://www.google.com/s2/favicons?domain=openai.com&sz=128",
    "tags": [
      "Image Generation",
      "Text-to-Image",
      "OpenAI",
      "Creative",
      "Design"
    ],
    "features": [
      "Native ChatGPT prompt refinement",
      "High fidelity in-image text rendering",
      "Detailed multi-character scene composition",
      "Inpainting & image modification canvas",
      "Direct API access for developers"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "DALL·E 3",
    "company": "OpenAI",
    "foundedYear": 2023,
    "history": "Announced in September 2023, DALL·E 3 represented a monumental leap over DALL·E 2 by eliminating the need for \"prompt engineering\" and integrating directly into ChatGPT Plus and OpenAI's developer APIs."
  },
  {
    "title": "Stable Diffusion",
    "shortDescription": "Pioneering open-weights image model running on consumer GPUs and cloud workflows.",
    "fullDescription": "Stable Diffusion is the flagship open-access image synthesis foundation model by Stability AI. Supporting thousands of community checkpoints, LoRAs, and ControlNets, it offers unrestricted creative freedom and local privacy.",
    "category": "Design",
    "pricing": "Free Plan",
    "website": "https://stability.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=stability.ai&sz=128",
    "tags": [
      "Open Source",
      "Image Generation",
      "Local AI",
      "Creative",
      "ControlNet"
    ],
    "features": [
      "Runs locally on consumer GPUs",
      "Unrestricted open-weights architecture",
      "Massive ecosystem of LoRAs & checkpoints",
      "ControlNet pose & composition guidance",
      "ComfyUI & WebUI workflow automation"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Stable Diffusion 3.5 / SDXL",
    "company": "Stability AI",
    "foundedYear": 2022,
    "history": "Released in August 2022 by Stability AI alongside researchers from Ludwig Maximilian University of Munich and Runway. Stable Diffusion democratized visual AI by allowing anyone with an NVIDIA GPU to generate high-resolution art offline."
  },
  {
    "title": "Gemini",
    "shortDescription": "Google's flagship multimodal AI model family powering reasoning across text, code, audio, and video.",
    "fullDescription": "Gemini is Google DeepMind's premier frontier AI model. Natively multimodal from inception, Gemini 1.5 Pro and 2.0 Flash boast a 1-million to 2-million token context window, deep Google Workspace integration, and live groundings.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://gemini.google.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=gemini.google.com&sz=128",
    "tags": [
      "Google",
      "Multimodal",
      "Reasoning",
      "Workspace",
      "Research"
    ],
    "features": [
      "Up to 2M token context window",
      "Native text, code, image, video & audio processing",
      "Deep Google Workspace sync (Gmail, Docs, Drive)",
      "Live Google Search grounding",
      "Code execution in Python sandbox"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Gemini 1.5 Pro / 2.0 Flash",
    "company": "Google DeepMind",
    "foundedYear": 2023,
    "history": "Unveiled in December 2023 under Sundar Pichai and Demis Hassabis, Gemini merged Google Research and DeepMind into a unified AI force. Its breakthrough long-context capability revolutionized document and video understanding."
  },
  {
    "title": "Canva AI",
    "shortDescription": "Comprehensive creative suite featuring Magic Studio for automated graphics and videos.",
    "fullDescription": "Canva Magic Studio embeds AI across graphic design, video editing, and presentations. It enables one-click background removal, generative fill, instant design translation, and text-to-graphics creation for non-designers.",
    "category": "Design",
    "pricing": "Free Plan",
    "website": "https://canva.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=canva.com&sz=128",
    "tags": [
      "Design",
      "Graphics",
      "Social Media",
      "Magic Studio",
      "Templates"
    ],
    "features": [
      "Magic Design text-to-template generator",
      "Magic Eraser & Background Remover",
      "Magic Switch for multi-format redesigns",
      "Leonardo AI & Runway integrations",
      "Brand Kit consistency locking"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Canva Magic Studio + Leonardo AI",
    "company": "Canva Pty Ltd",
    "foundedYear": 2013,
    "history": "Founded in Sydney in 2013 by Melanie Perkins, Cliff Obrecht, and Cameron Adams. In 2023-2024, Canva acquired Leonardo AI and launched Magic Studio, cementing its position as the world's most popular design platform with 180M+ users."
  },
  {
    "title": "Figma AI",
    "shortDescription": "AI-assisted design tools embedded natively inside the Figma UI/UX workspace.",
    "fullDescription": "Figma AI empowers product designers by generating first-draft layouts, populating realistic placeholder content, intelligently renaming messy layers, and executing visual similarity searches across enterprise design systems.",
    "category": "Design",
    "pricing": "Free Plan",
    "website": "https://figma.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=figma.com&sz=128",
    "tags": [
      "UI/UX",
      "Product Design",
      "Prototyping",
      "Figma",
      "Collaboration"
    ],
    "features": [
      "First Draft prompt-to-UI generator",
      "Intelligent layer auto-renaming",
      "Visual search across design systems",
      "Contextual content & translation filler",
      "Auto-generated interactive prototype connections"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Figma Native ML Models",
    "company": "Figma Inc.",
    "foundedYear": 2016,
    "history": "Founded by Dylan Field and Evan Wallace in 2016. Figma introduced Figma AI at Config 2024 to accelerate product design workflows, maintaining its lead as the industry-standard UI/UX platform."
  },
  {
    "title": "Replit AI",
    "shortDescription": "Collaborative cloud environment with autonomous Replit Agent for building full-stack apps.",
    "fullDescription": "Replit pairs an instant cloud development environment with autonomous AI agents. Replit Agent can scaffold databases, write frontend and backend code, install dependencies, and deploy live full-stack apps from conversational prompts.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://replit.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=replit.com&sz=128",
    "tags": [
      "Cloud IDE",
      "Agent",
      "Fullstack",
      "Deployment",
      "Coding"
    ],
    "features": [
      "Autonomous Replit Agent builder",
      "Instant cloud hosting & PostgreSQL databases",
      "Multi-user collaborative code editing",
      "Mobile app for on-the-go development",
      "Instant custom domain deployment"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Replit Agent (Claude 3.5 Sonnet / Custom)",
    "company": "Replit Inc.",
    "foundedYear": 2016,
    "history": "Founded in 2016 by Amjad Masad, Faris Masad, and Haya Odeh. Replit revolutionized beginner and professional cloud development, launching Replit Agent in late 2024 to enable zero-setup software creation."
  },
  {
    "title": "v0 by Vercel",
    "shortDescription": "Generative UI builder creating production-ready React and Tailwind components from prompts.",
    "fullDescription": "v0 by Vercel generates accessible, responsive React components using shadcn/ui and Tailwind CSS. Developers can iterate on designs conversationally, inspect the code in real-time, and copy-paste or push directly to GitHub repositories.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://v0.dev",
    "thumbnail": "https://www.google.com/s2/favicons?domain=v0.dev&sz=128",
    "tags": [
      "React",
      "Next.js",
      "Tailwind CSS",
      "UI Components",
      "Vercel"
    ],
    "features": [
      "Generates clean React + Tailwind code",
      "shadcn/ui component integration",
      "Interactive visual and code editor",
      "Instant live preview in browser",
      "1-click npm install & Vercel deployment"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "v0 Custom Fine-Tuned Model",
    "company": "Vercel Inc.",
    "foundedYear": 2023,
    "history": "Built by Vercel and launched in late 2023 by Guillermo Rauch and team, v0 rapidly transformed frontend web development by converting conversational prompts into pixel-perfect, copy-pasteable React code."
  },
  {
    "title": "Bolt.new",
    "shortDescription": "In-browser AI web development sandbox that prompts, runs, and deploys full-stack apps.",
    "fullDescription": "Bolt.new is StackBlitz's in-browser AI development environment powered by WebContainers. It allows developers to prompt, build, debug, and deploy complete Node.js, Next.js, and Vite web applications entirely in the browser without local setup.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://bolt.new",
    "thumbnail": "https://www.google.com/s2/favicons?domain=bolt.new&sz=128",
    "tags": [
      "WebContainers",
      "Fullstack",
      "Browser IDE",
      "StackBlitz",
      "Deployment"
    ],
    "features": [
      "Full Node.js runtime inside the browser via WebContainers",
      "Full-stack package installation (npm packages)",
      "Real-time terminal execution & error auto-fixing",
      "1-click Netlify & Vercel deployment",
      "Interactive live split preview"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet",
    "company": "StackBlitz",
    "foundedYear": 2024,
    "history": "Created by StackBlitz CEO Eric Simons and team in October 2024. Leveraging their WebContainers technology, Bolt.new became a viral sensation as the first platform able to execute full-stack npm dependencies entirely in the browser."
  },
  {
    "title": "Tabnine",
    "shortDescription": "Privacy-focused AI code assistant with zero data retention for security-minded enterprises.",
    "fullDescription": "Tabnine delivers context-aware code completions and conversational coding assistance. Unlike public cloud tools, Tabnine guarantees that your proprietary code is never stored or trained on, offering on-premise and air-gapped deployments.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://tabnine.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=tabnine.com&sz=128",
    "tags": [
      "Coding",
      "Privacy",
      "Enterprise",
      "Security",
      "On-Premise"
    ],
    "features": [
      "Zero data retention & enterprise compliance",
      "On-premise, VPC, or SaaS deployment",
      "Whole-line and full-function completion",
      "Tabnine Chat for codebase refactoring",
      "Support for 80+ programming languages"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Tabnine Protected Models / Custom LLMs",
    "company": "Tabnine Ltd.",
    "foundedYear": 2018,
    "history": "Originally created by Canadian developer Jacob Jackson in 2018 and acquired by Codota, Tabnine was the pioneer in deep-learning code completion, growing to protect thousands of enterprise engineering organizations."
  },
  {
    "title": "Otter.ai",
    "shortDescription": "Automated meeting assistant transcribing conversations and distilling key action items.",
    "fullDescription": "Otter.ai joins Zoom, Google Meet, and Microsoft Teams calls to provide live transcription, automated speaker attribution, slide capture, and executive summaries with assigned follow-up items.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://otter.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=otter.ai&sz=128",
    "tags": [
      "Meetings",
      "Transcription",
      "Notes",
      "Collaboration",
      "Audio"
    ],
    "features": [
      "OtterPilot automatic meeting joiner",
      "Live interactive transcription & search",
      "Automated executive summary generation",
      "Automated slide capture in notes",
      "Direct Slack, Zoom, and Google Calendar sync"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Proprietary Deep Speech Recognition + LLM",
    "company": "Otter.ai Inc.",
    "foundedYear": 2016,
    "history": "Founded in Mountain View in 2016 by Liang Chen and Sam Liang. Otter has transcribed over 1 billion meeting minutes for universities, startups, and Fortune 500 corporations."
  },
  {
    "title": "Zapier AI",
    "shortDescription": "AI orchestration for automating cross-platform tasks across 7,000+ business applications.",
    "fullDescription": "Zapier AI combines natural language automation building with AI orchestration. Users can describe complex workflows in plain English, and Zapier will automatically configure triggers, data transformations, and multi-app actions across 7,000+ apps.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://zapier.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=zapier.com&sz=128",
    "tags": [
      "Automation",
      "Integration",
      "No-Code",
      "Workflows",
      "Productivity"
    ],
    "features": [
      "Natural language Zap workflow builder",
      "Zapier Central autonomous AI bots",
      "AI actions across 7,000+ SaaS apps",
      "Custom AI Canvas diagramming",
      "Conditional logic & data formatting"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "GPT-4o + Zapier Integration Mesh",
    "company": "Zapier Inc.",
    "foundedYear": 2011,
    "history": "Founded in 2011 by Wade Foster, Bryan Helmig, and Mike Knoop. Zapier established itself as the backbone of business automation, embedding AI in 2023-2024 to make multi-app orchestration instant."
  },
  {
    "title": "Loom AI",
    "shortDescription": "AI video messaging assistant generating automatic titles, summaries, and action items.",
    "fullDescription": "Loom AI transforms quick video recordings into structured documentation. It auto-generates descriptive titles, bulleted summaries, timestamped chapters, and action items, while eliminating awkward pauses and filler words.",
    "category": "Video",
    "pricing": "Free Plan",
    "website": "https://loom.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=loom.com&sz=128",
    "tags": [
      "Video Messaging",
      "Productivity",
      "Async Communication",
      "Summaries",
      "Atlassian"
    ],
    "features": [
      "Auto-generated video summaries & chapters",
      "Filler word & silence removal",
      "Automated message drafting from video",
      "Instant shareable links & permissions",
      "Integrated with Jira and Confluence"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Atlassian Intelligence + Speech Models",
    "company": "Loom Inc. (Atlassian)",
    "foundedYear": 2015,
    "history": "Founded in 2015 by Joe Thomas, Shahed Khan, and Vinay Hiremath. Acquired by Atlassian for $975M in 2023, Loom integrated AI to pioneer asynchronous, low-meeting workplace communication."
  },
  {
    "title": "Leonardo AI",
    "shortDescription": "Production-ready creative asset generation platform with fine-tuned model control.",
    "fullDescription": "Leonardo AI gives digital artists, game developers, and marketers granular control over visual asset production. Featuring Leonardo Phoenix and custom model training, users can control style, composition, and canvas inpainting.",
    "category": "Design",
    "pricing": "Free Plan",
    "website": "https://leonardo.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=leonardo.ai&sz=128",
    "tags": [
      "Game Assets",
      "Art",
      "Design",
      "Generative AI",
      "Canva"
    ],
    "features": [
      "Leonardo Phoenix foundation model",
      "Custom model fine-tuning with own assets",
      "Real-Time Canvas sketching to photorealism",
      "Universal Upscaler & motion animation",
      "Color palette & prompt weighting control"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Leonardo Phoenix / Diffusion XL",
    "company": "Leonardo Interactive (Canva)",
    "foundedYear": 2022,
    "history": "Founded in Sydney in 2022 by JJ Fiore, Jachin Bhasme, and team. Leonardo became one of the fastest growing generative platforms with 19 million creators, leading to its landmark acquisition by Canva in 2024."
  },
  {
    "title": "Codeium (Windsurf)",
    "shortDescription": "Blazing-fast AI developer platform featuring the innovative Windsurf IDE.",
    "fullDescription": "Codeium provides enterprise-grade AI code completion and conversational assistance. Its flagship Windsurf IDE features Cascade Flows, allowing developers to collaborate seamlessly with an AI that plans, executes, and modifies code in real time.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://codeium.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=codeium.com&sz=128",
    "tags": [
      "Coding",
      "Windsurf",
      "IDE",
      "Developer",
      "Autocomplete"
    ],
    "features": [
      "Cascade collaborative agent flows in Windsurf",
      "Unlimited fast autocomplete for individuals",
      "Deep repository-wide context reasoning",
      "Support for 70+ languages & 40+ IDEs",
      "SOC 2 Type II compliance & privacy assurance"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Codeium Cascade / Custom In-House LLMs",
    "company": "Codeium (Exafunction)",
    "foundedYear": 2022,
    "history": "Founded in 2022 by Varun Mohan and Douglas Chen at Exafunction. Codeium raised a $150M Series C at a $1.25B valuation in 2024, launching Windsurf as the primary competitor to Cursor."
  },
  {
    "title": "HeyGen",
    "shortDescription": "Studio-quality AI video generator creating conversational avatars and voice translations.",
    "fullDescription": "HeyGen transforms text and audio into high-impact corporate videos. It offers over 100 diverse avatars, custom studio-grade digital avatars, and automated video translation that matches your original voice and realistic lip-syncing.",
    "category": "Video",
    "pricing": "Free Trial",
    "website": "https://heygen.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=heygen.com&sz=128",
    "tags": [
      "Video",
      "Avatars",
      "Translation",
      "Marketing",
      "Sales"
    ],
    "features": [
      "100+ realistic commercial AI avatars",
      "Video Translate with native voice cloning & lip-sync",
      "Custom Instant Avatar creation in 2 minutes",
      "Streaming Interactive Avatar API",
      "Template library for marketing & onboarding"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "HeyGen Generative Video Synthesis",
    "company": "HeyGen Inc.",
    "foundedYear": 2020,
    "history": "Founded in 2020 by Joshua Xu (former Snap engineer) and Wayne Liang. HeyGen went viral worldwide with its video translation technology, reaching a $500M valuation in 2024."
  },
  {
    "title": "Lovable",
    "shortDescription": "Full-stack software builder transforming natural language into deployed production web apps.",
    "fullDescription": "Lovable enables anyone to build, iterate, and deploy full-stack web applications using everyday language. Powered by Claude 3.5 Sonnet, it designs clean UI components, sets up Supabase backends, and pushes code to GitHub.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://lovable.dev",
    "thumbnail": "https://www.google.com/s2/favicons?domain=lovable.dev&sz=128",
    "tags": [
      "No-Code",
      "Fullstack",
      "Web Apps",
      "Supabase",
      "React"
    ],
    "features": [
      "Full-stack app creation from natural language",
      "Automated Supabase database & auth integration",
      "Direct GitHub synchronization with clean code",
      "Visual component editor with click-to-edit",
      "Instant custom domain deployment"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet",
    "company": "Lovable (GPT Engineer AB)",
    "foundedYear": 2023,
    "history": "Created by Anton Osika and team behind the viral open-source project GPT Engineer. Lovable launched in late 2024 to allow non-technical founders and developers to ship production web applications in hours."
  },
  {
    "title": "Ahrefs",
    "shortDescription": "Leading SEO intelligence platform with integrated AI content and keyword tools.",
    "fullDescription": "Ahrefs pairs its petabyte-scale web crawler with generative AI capabilities. It powers keyword research, competitor backlink analysis, AI content generation, and technical site audits to help businesses maximize organic Google traffic.",
    "category": "Marketing",
    "pricing": "Paid",
    "website": "https://ahrefs.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=ahrefs.com&sz=128",
    "tags": [
      "SEO",
      "Keywords",
      "Backlinks",
      "Marketing",
      "Analytics"
    ],
    "features": [
      "Site Explorer competitor audit & traffic analysis",
      "Keywords Explorer with multi-billion database",
      "AI Content Master writing & outline assistant",
      "Site Audit for technical SEO health",
      "Rank Tracker for daily SERP positions"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Ahrefs Search Intelligence + Custom LLMs",
    "company": "Ahrefs Pte. Ltd.",
    "foundedYear": 2010,
    "history": "Founded in Singapore in 2010 by Dmitry Gerasimenko. Ahrefs became an iconic bootstrapped SaaS titan, integrating AI across its suite to power search marketing for millions of businesses."
  },
  {
    "title": "Surfer SEO",
    "shortDescription": "Content optimization tool analyzing top-ranking SERP factors to guide article writing.",
    "fullDescription": "Surfer SEO takes the guesswork out of ranking articles on search engines. It reverse-engineers top Google results in real time, calculating ideal word counts, NLP keyword frequency, header structure, and internal linking strategies.",
    "category": "Marketing",
    "pricing": "Paid",
    "website": "https://surferseo.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=surferseo.com&sz=128",
    "tags": [
      "SEO",
      "Content Optimization",
      "SERP",
      "Copywriting",
      "Marketing"
    ],
    "features": [
      "Real-time Content Score editor",
      "SERP Analyzer comparing 500+ ranking signals",
      "Surfer AI 1-click SEO article writer",
      "Internal linking recommendations",
      "Integrates with Google Docs, WordPress & Jasper"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Surfer AI + Custom Search NLP",
    "company": "Surfer SEO",
    "foundedYear": 2017,
    "history": "Founded in Poland in 2017 by Slawek Czajkowski, Michal Suski, and team. Surfer established the modern standard for data-driven SEO content writing, trusted by top marketing agencies worldwide."
  },
  {
    "title": "Murf AI",
    "shortDescription": "Voice generation platform creating natural-sounding voiceovers for videos and training.",
    "fullDescription": "Murf AI empowers creators to produce studio-quality voiceovers from text. Featuring over 120 voices across 20+ languages, Murf provides pitch modulation, custom emphasis, background music sync, and video timeline integration.",
    "category": "Music",
    "pricing": "Free Plan",
    "website": "https://murf.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=murf.ai&sz=128",
    "tags": [
      "Voiceover",
      "Audio",
      "TTS",
      "Podcasts",
      "E-Learning"
    ],
    "features": [
      "120+ natural voice profiles across 20+ languages",
      "Custom pitch, speed, and emphasis controls",
      "Voice cloning for custom enterprise voices",
      "Built-in video and background music editor",
      "Commercial usage rights included"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Murf Neural TTS Engine",
    "company": "Murf Inc.",
    "foundedYear": 2020,
    "history": "Founded in 2020 by IIT Kharagpur alumni Sneha Roy, Ankur Edkie, and Divyanshu Shikhar. Murf AI democratized voiceover production for e-learning creators, marketers, and video editors."
  },
  {
    "title": "Anthropic Console",
    "shortDescription": "Developer workbench and enterprise API gateway for building with the Claude model family.",
    "fullDescription": "Anthropic Console provides engineers with direct API access to Claude 3.5 Sonnet, Claude 3.5 Haiku, and Claude 3 Opus. It features an interactive Workbench, automated prompt optimizer, system prompt generator, and precise latency controls.",
    "category": "Coding",
    "pricing": "Paid",
    "website": "https://console.anthropic.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=anthropic.com&sz=128",
    "tags": [
      "API",
      "Developer",
      "Claude",
      "LLM",
      "Anthropic"
    ],
    "features": [
      "Direct API access to all Claude 3.5 models",
      "Interactive prompt testing Workbench",
      "Automated prompt evaluator & optimizer",
      "Batch API for cost-effective bulk processing",
      "Enterprise usage billing & rate limit controls"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Claude 3.5 Sonnet / Opus / Haiku",
    "company": "Anthropic",
    "foundedYear": 2023,
    "history": "Launched by Anthropic in 2023 to provide enterprise developers with secure, high-throughput access to the Claude intelligence suite with industry-leading context windows and tool use capabilities."
  },
  {
    "title": "Pika",
    "shortDescription": "Idea-to-video AI platform generating cinematic clips with physics and style effects.",
    "fullDescription": "Pika transforms prompts, images, and video clips into imaginative animated shorts. With features like Pikaffects (inflate, melt, crush, explode) and precise camera motion controls, Pika is a favorite for digital storytelling.",
    "category": "Video",
    "pricing": "Free Plan",
    "website": "https://pika.art",
    "thumbnail": "https://www.google.com/s2/favicons?domain=pika.art&sz=128",
    "tags": [
      "Video",
      "Animation",
      "Special Effects",
      "Creative",
      "Text-to-Video"
    ],
    "features": [
      "Pika 1.5 high-definition video generation",
      "Pikaffects physical transformation engine",
      "Lip-sync and sound effects generation",
      "Camera pan, tilt, zoom controls",
      "Inpainting to modify specific video regions"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Pika 1.5",
    "company": "Pika Labs",
    "foundedYear": 2023,
    "history": "Founded in 2023 by Stanford AI lab PhDs Demi Guo and Chenlin Meng. Pika quickly attracted over 500,000 creators and top venture backing from Lightspeed Venture Partners."
  },
  {
    "title": "Hugging Face",
    "shortDescription": "The central open-source ecosystem hosting over 1 million models, datasets, and AI Spaces.",
    "fullDescription": "Hugging Face is the GitHub of artificial intelligence. It hosts over 1 million open-source AI models, 200,000 datasets, and interactive Spaces demos, enabling machine learning researchers and engineers to share and deploy AI collaboratively.",
    "category": "Research",
    "pricing": "Free Plan",
    "website": "https://huggingface.co",
    "thumbnail": "https://www.google.com/s2/favicons?domain=huggingface.co&sz=128",
    "tags": [
      "Open Source",
      "Models",
      "Machine Learning",
      "Datasets",
      "Transformers"
    ],
    "features": [
      "Repository of 1M+ open-source models & datasets",
      "Transformers & Diffusers python libraries",
      "Hugging Face Spaces for instant cloud demo hosting",
      "Inference Endpoints for production scaling",
      "Open LLM Leaderboard benchmark"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Hosts 1M+ Open Foundation Models",
    "company": "Hugging Face Inc.",
    "foundedYear": 2016,
    "history": "Founded in 2016 by Clément Delangue, Julien Chaumond, and Thomas Wolf. Originally started as a chatbot company, it pivoted to open-source Transformers, becoming the indispensable open platform for the global AI community valued at $4.5B."
  },
  {
    "title": "Vercel AI SDK",
    "shortDescription": "Unified TypeScript library for building AI-powered web applications and streaming UIs.",
    "fullDescription": "The Vercel AI SDK is an open-source library that unifies model providers (OpenAI, Anthropic, Google, Mistral) under a standard TypeScript interface. It features seamless streaming hooks, structured JSON output with Zod, and serverless edge compatibility.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://sdk.vercel.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=vercel.com&sz=128",
    "tags": [
      "TypeScript",
      "SDK",
      "React",
      "Next.js",
      "Streaming"
    ],
    "features": [
      "Provider-agnostic API (OpenAI, Anthropic, Google, Cohere)",
      "useChat and useCompletion React streaming hooks",
      "Type-safe structured data generation via Zod schemas",
      "Tool calling & agentic execution support",
      "Zero-config edge and serverless runtime support"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Multi-Provider Abstraction Layer",
    "company": "Vercel Inc.",
    "foundedYear": 2023,
    "history": "Developed by Vercel in 2023 to solve fragmentation in building AI web interfaces. It has become the standard open-source framework powering modern generative web applications."
  },
  {
    "title": "Warp",
    "shortDescription": "Modern AI-powered terminal featuring natural language commands and collaborative workflows.",
    "fullDescription": "Warp is a reimagined terminal built from the ground up in Rust with GPU acceleration. Its built-in Warp AI allows engineers to describe tasks in plain English to get working bash commands, explain error outputs, and share terminal sessions with teams.",
    "category": "Coding",
    "pricing": "Free Plan",
    "website": "https://warp.dev",
    "thumbnail": "https://www.google.com/s2/favicons?domain=warp.dev&sz=128",
    "tags": [
      "Terminal",
      "CLI",
      "Developer",
      "Rust",
      "Productivity"
    ],
    "features": [
      "Natural language to terminal command generation",
      "AI debugger for failed shell commands",
      "Modern text editor input with full cursor support",
      "Warp Drive for sharing team scripts & workflows",
      "Native GPU hardware acceleration"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Warp AI (GPT-4o / Claude 3.5)",
    "company": "Warp Technologies",
    "foundedYear": 2020,
    "history": "Founded in 2020 by former Google Docs engineering lead Zach Lloyd. Warp modernized the 40-year-old CLI interface, earning widespread praise and millions of daily developer users."
  },
  {
    "title": "Scribe",
    "shortDescription": "Automated documentation tool turning any digital process into visual step-by-step guides.",
    "fullDescription": "Scribe captures your screen while you work and automatically generates illustrated step-by-step Standard Operating Procedures (SOPs), how-to guides, and training manuals complete with annotated screenshots and instructions.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://scribehow.com",
    "thumbnail": "https://www.google.com/s2/favicons?domain=scribehow.com&sz=128",
    "tags": [
      "Documentation",
      "SOP",
      "Productivity",
      "Guides",
      "Training"
    ],
    "features": [
      "Automatic step-by-step process recording",
      "Auto-generated screenshots with click indicators",
      "Smart redaction of sensitive customer data",
      "Easy sharing via URL, PDF, or Confluence embed",
      "AI-generated comprehensive process manuals"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Scribe AI Computer Vision & NLP",
    "company": "Scribe (Colony Labs)",
    "foundedYear": 2019,
    "history": "Founded in 2019 by Jennifer Smith and Aaron Podolny in San Francisco. Scribe saves teams countless hours of manual screenshot-taking, serving millions of users across 100+ countries."
  },
  {
    "title": "Krisp",
    "shortDescription": "AI noise-canceling app that eliminates background noises, echoes, and accents on live calls.",
    "fullDescription": "Krisp runs locally on your machine to filter out crying babies, barking dogs, keyboard clatter, and room echo on live Zoom, Teams, and Meet calls, while enhancing voice clarity and transcribing meetings securely.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://krisp.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=krisp.ai&sz=128",
    "tags": [
      "Audio",
      "Noise Cancellation",
      "Meetings",
      "Voice",
      "Privacy"
    ],
    "features": [
      "Bi-directional AI background noise removal",
      "Room & acoustic echo cancellation",
      "Voice Clarity accent & loudness enhancement",
      "On-device local audio processing for privacy",
      "Automated meeting bot-free transcription"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Krisp Deep Neural Network (DNN)",
    "company": "Krisp Technologies",
    "foundedYear": 2017,
    "history": "Founded in 2017 by Davit Baghdasaryan and Artavazd Minasyan. Krisp became an essential remote work utility, winning TIME's Best Inventions and processing billions of audio minutes annually."
  },
  {
    "title": "Pictory",
    "shortDescription": "Automated video generator converting long-form articles, blogs, and scripts into short videos.",
    "fullDescription": "Pictory turns written content and webinars into short, branded video snippets ideal for TikTok, Reels, YouTube Shorts, and LinkedIn. It automatically selects relevant B-roll footage, subtitles, and voiceovers.",
    "category": "Video",
    "pricing": "Free Plan",
    "website": "https://pictory.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=pictory.ai&sz=128",
    "tags": [
      "Video",
      "Shorts",
      "Reels",
      "Summarization",
      "Content Repurposing"
    ],
    "features": [
      "Script-to-Video and Article-to-Video generation",
      "Automatic captioning with high accuracy",
      "Auto-highlight extraction from long zoom recordings",
      "Library of 10M+ licensed royalty-free media clips",
      "Realistic AI voiceover integration"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Pictory Video Summarization Engine",
    "company": "Pictory AI Ltd.",
    "foundedYear": 2020,
    "history": "Founded in 2020 by Vikram Chalana, Abid Mumtaz, and Vishal Chalana. Pictory pioneered automated long-to-short video repurposing, helping marketers scale social video presence without dedicated editors."
  },
  {
    "title": "Mem",
    "shortDescription": "Self-organizing AI workspace that connects notes, emails, and meetings automatically.",
    "fullDescription": "Mem is an AI-powered personal knowledge management app. Instead of requiring manual folder organization or tagging, Mem uses vector embeddings and LLMs to index your notes, meeting transcripts, and messages into an interconnected second brain.",
    "category": "Productivity",
    "pricing": "Free Plan",
    "website": "https://mem.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=mem.ai&sz=128",
    "tags": [
      "Knowledge Base",
      "Notes",
      "Second Brain",
      "Search",
      "Productivity"
    ],
    "features": [
      "Self-organizing note database without folders",
      "Conversational AI Q&A over all personal notes",
      "Smart search synthesizing insights across documents",
      "Automated meeting summaries & contact timelines",
      "Native iOS app and browser extension"
    ],
    "isFeatured": false,
    "status": "approved" as const,
    "aiModel": "Mem AI (Custom Embeddings + GPT-4o)",
    "company": "Mem Labs Inc.",
    "foundedYear": 2020,
    "history": "Founded in 2020 by Stanford graduates Dennis Xu and Kevin Moody. Backed by OpenAI Startup Fund, Mem demonstrated how AI embeddings could eliminate tedious manual filing in knowledge work."
  },
  {
    "title": "Ideogram",
    "shortDescription": "Generative image model excelling in coherent typography, logo design, and graphic art.",
    "fullDescription": "Ideogram solves the hardest challenge in AI imagery: rendering crisp, legible typography inside creative illustrations. Version 2.0 generates typography for posters, t-shirt designs, logos, and digital marketing banners with high fidelity.",
    "category": "Design",
    "pricing": "Free Plan",
    "website": "https://ideogram.ai",
    "thumbnail": "https://www.google.com/s2/favicons?domain=ideogram.ai&sz=128",
    "tags": [
      "Typography",
      "Graphic Design",
      "Logos",
      "Image Generation",
      "Posters"
    ],
    "features": [
      "Industry-leading in-image typography accuracy",
      "Magic Prompt for detailed creative expansion",
      "Realistic, Design, Anime, and 3D style presets",
      "Color palette customization",
      "Remix & inpainting controls"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Ideogram 2.0",
    "company": "Ideogram Inc.",
    "foundedYear": 2022,
    "history": "Founded in Toronto in 2022 by former Google Brain researchers Mohammad Norouzi, William Chan, Chitwan Saharia, and Jonathan Ho. Ideogram raised $80M from Andreessen Horowitz and Index Ventures, quickly becoming the go-to tool for graphic typography."
  },
  {
    "title": "Consensus",
    "shortDescription": "Evidence-based academic search engine synthesizing conclusions across 200M+ research papers.",
    "fullDescription": "Consensus uses LLMs to search over 200 million peer-reviewed scientific papers. It extracts evidence-based conclusions, provides consensus meters showing scientific agreement on controversial topics, and cites academic journals directly.",
    "category": "Research",
    "pricing": "Free Plan",
    "website": "https://consensus.app",
    "thumbnail": "https://www.google.com/s2/favicons?domain=consensus.app&sz=128",
    "tags": [
      "Research",
      "Science",
      "Academic",
      "Evidence-Based",
      "Citations"
    ],
    "features": [
      "Search across 200M+ peer-reviewed papers",
      "Consensus Meter showing scientific agreement level",
      "Instant evidence synthesis with journal citations",
      "Study Quality indicators & sample size metrics",
      "Direct integration with Zotero and reference managers"
    ],
    "isFeatured": true,
    "status": "approved" as const,
    "aiModel": "Consensus AI + Semantic Scholar Search Mesh",
    "company": "Consensus NLP Inc.",
    "foundedYear": 2021,
    "history": "Founded in Boston in 2021 by Christian Salem and Eric Cohen. Consensus was created to make scientific literature accessible and counter misinformation by directly extracting conclusions from peer-reviewed studies."
  }
];

async function seed() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Tool.deleteMany({});
    await Review.deleteMany({});

    // Create Admin User
    const adminPasswordHash = await bcrypt.hash('Admin123!', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@toolnest.com',
      password: adminPasswordHash,
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
      role: 'admin',
      isPro: true,
      authProvider: 'local'
    });

    // Create Standard User
    const userPasswordHash = await bcrypt.hash('User123!', 10);
    const regularUser = await User.create({
      name: 'Jane Doe',
      email: 'user@toolnest.com',
      password: userPasswordHash,
      photoURL: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
      role: 'user',
      isPro: false,
      authProvider: 'local'
    });

    console.log('Users created.');

    // Create Tools
    const createdTools = await Promise.all(
      toolsData.map(tool => Tool.create({ ...tool, submittedBy: admin._id }))
    );
    console.log(`${createdTools.length} Tools created.`);

    // Add initial reviews
    if (createdTools.length >= 3) {
      await Review.create([
        {
          toolId: createdTools[0]._id,
          userId: regularUser._id,
          userName: regularUser.name,
          userEmail: regularUser.email,
          userPhoto: regularUser.photoURL,
          rating: 5,
          comment: 'ChatGPT is my daily driver for writing and coding. Essential tool!'
        },
        {
          toolId: createdTools[1]._id,
          userId: regularUser._id,
          userName: regularUser.name,
          userEmail: regularUser.email,
          userPhoto: regularUser.photoURL,
          rating: 5,
          comment: 'Claude 3.5 Sonnet is mind-blowing for coding and reading huge files.'
        },
        {
          toolId: createdTools[2]._id,
          userId: regularUser._id,
          userName: regularUser.name,
          userEmail: regularUser.email,
          userPhoto: regularUser.photoURL,
          rating: 5,
          comment: 'Midjourney v6 generates the best photorealistic images bar none.'
        }
      ]);

      for (const t of createdTools.slice(0, 3)) {
        await Tool.findByIdAndUpdate(t._id, { avgRating: 5, totalReviews: 1 });
      }

      console.log('Reviews created.');
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
