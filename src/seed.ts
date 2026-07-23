import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User';
import Tool from './models/Tool';
import Review from './models/Review';

dotenv.config();

const toolsData = [
  {
    title: 'ChatGPT',
    shortDescription: 'Advanced conversational AI by OpenAI for writing, coding, and problem-solving.',
    fullDescription: 'ChatGPT is a highly advanced conversational AI model developed by OpenAI. Built on the GPT-4 architecture, it can answer complex questions, write production-quality code, draft compelling emails, translate languages, and assist with creative writing.',
    category: 'Productivity',
    pricing: 'Free Trial',
    website: 'https://chat.openai.com',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    tags: ['AI', 'Chatbot', 'Writing', 'Coding'],
    features: ['Conversational AI', 'Code generation', 'Language translation', 'Plugin ecosystem', 'Image understanding'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'GPT-4o',
    company: 'OpenAI',
    foundedYear: 2022,
    history: 'ChatGPT was launched by OpenAI in November 2022 and became the fastest-growing consumer application in history, reaching 100 million users in just two months. It evolved from GPT-3.5 to GPT-4 and now GPT-4o, each iteration dramatically improving reasoning, coding, and multimodal capabilities.'
  },
  {
    title: 'Claude',
    shortDescription: 'Next-generation AI assistant by Anthropic with superior reasoning.',
    fullDescription: 'Claude is a helpful, honest, and harmless AI assistant developed by Anthropic. It excels at reasoning, analysis, coding, math, and creative writing. With its industry-leading 200K token context window, Claude can process entire codebases and complex documents.',
    category: 'Productivity',
    pricing: 'Free Trial',
    website: 'https://claude.ai',
    thumbnail: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=80',
    tags: ['AI', 'Assistant', 'Reasoning', 'Analysis'],
    features: ['200K context window', 'Safe AI responses', 'Advanced reasoning', 'Code analysis', 'Document processing'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    foundedYear: 2023,
    history: 'Claude was created by Anthropic, founded in 2021 by former OpenAI researchers Dario and Daniela Amodei. The first Claude model launched in March 2023, with Claude 3.5 Sonnet (2024) becoming widely regarded as one of the best coding and reasoning models available.'
  },
  {
    title: 'Midjourney',
    shortDescription: 'AI art generator creating stunning images from text descriptions.',
    fullDescription: 'Midjourney is a groundbreaking AI program that generates breathtaking images from natural language descriptions called prompts. Known for its artistic quality and aesthetic appeal, Midjourney has become the preferred tool for digital artists and designers.',
    category: 'Design',
    pricing: 'Paid',
    website: 'https://midjourney.com',
    thumbnail: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=600&auto=format&fit=crop&q=80',
    tags: ['Art', 'Design', 'Image Generation', 'Creative'],
    features: ['Photorealistic images', 'Artistic styles', 'Variation control', 'Upscaling', 'Discord integration'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'Midjourney v6.1',
    company: 'Midjourney Inc.',
    foundedYear: 2022,
    history: 'Founded by David Holz (co-founder of Leap Motion), Midjourney launched its open beta in July 2022 via Discord. It rapidly became the most popular AI art generator, with v6 introducing photorealistic quality that rivaled professional photography.'
  },
  {
    title: 'Cursor',
    shortDescription: 'AI-first code editor built for speed and software engineering.',
    fullDescription: 'Cursor is a revolutionary AI-first code editor designed to help engineers build software 10x faster. Built on VS Code, it offers native AI features like intelligent autocomplete, codebase-aware chat, and multi-file editing.',
    category: 'Coding',
    pricing: 'Free Trial',
    website: 'https://cursor.com',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=80',
    tags: ['Code', 'IDE', 'Developer', 'Productivity'],
    features: ['AI autocomplete', 'Codebase-aware chat', 'Multi-file editing', 'Error fixing', 'VS Code compatible'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'GPT-4 / Claude 3.5',
    company: 'Anysphere',
    foundedYear: 2023,
    history: 'Cursor was built by Anysphere, a small team of MIT graduates who believed the future of coding required AI-native tooling. Launched in 2023, it quickly gained massive traction among developers by integrating multiple frontier AI models directly into the editing workflow.'
  },
  {
    title: 'GitHub Copilot',
    shortDescription: 'Your AI pair programmer that suggests code in real-time.',
    fullDescription: 'GitHub Copilot uses OpenAI Codex to suggest individual lines and whole functions in real-time right inside your editor. Trained on billions of lines of public code, Copilot turns natural language prompts into coding suggestions.',
    category: 'Coding',
    pricing: 'Paid',
    website: 'https://github.com/features/copilot',
    thumbnail: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=80',
    tags: ['Code', 'AI', 'Developer', 'Autocomplete'],
    features: ['Real-time code suggestions', 'Multi-language support', 'IDE integration', 'Chat in IDE', 'CLI assistance'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'OpenAI Codex / GPT-4',
    company: 'GitHub (Microsoft)',
    foundedYear: 2021,
    history: 'GitHub Copilot was announced in June 2021 as a collaboration between GitHub and OpenAI. It was the first major AI coding assistant, pioneering the concept of an "AI pair programmer." By 2024, it had over 1.8 million paid subscribers.'
  },
  {
    title: 'Perplexity',
    shortDescription: 'AI-powered answer engine providing instant answers with cited sources.',
    fullDescription: 'Perplexity AI is a conversational search engine that delivers accurate, up-to-date answers to complex queries backed by live web sources and inline citations.',
    category: 'Research',
    pricing: 'Free Trial',
    website: 'https://perplexity.ai',
    thumbnail: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=80',
    tags: ['Search', 'Research', 'AI', 'Citations'],
    features: ['Real-time search', 'Inline citations', 'Pro Search reasoning', 'File upload analysis', 'Collection organization'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'Sonar (Custom) + GPT-4 / Claude',
    company: 'Perplexity AI',
    foundedYear: 2022,
    history: 'Perplexity AI was founded in August 2022 by former Google AI researchers. It reimagined web search by combining large language models with real-time web indexing, providing sourced answers instead of link lists. Valued at over $9 billion by 2024.'
  },
  {
    title: 'Notion AI',
    shortDescription: 'Connected AI assistant integrated directly into your Notion workspace.',
    fullDescription: 'Notion AI brings artificial intelligence directly into your workspace. Write faster, summarize long documents, brainstorm creative ideas, and extract key action items from notes automatically.',
    category: 'Productivity',
    pricing: 'Free Trial',
    website: 'https://notion.so',
    thumbnail: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    tags: ['Notes', 'Productivity', 'Writing', 'Docs'],
    features: ['Auto-summarization', 'Q&A over workspace', 'Drafting & rewriting', 'Action item extraction', 'Translation'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'GPT-4 / Claude (via API)',
    company: 'Notion Labs',
    foundedYear: 2023,
    history: 'Notion was founded in 2013 as a workspace productivity tool. In February 2023, Notion AI launched as an integrated writing assistant, leveraging OpenAI and Anthropic models to add AI capabilities directly into the note-taking and project management experience.'
  },
  {
    title: 'Jasper',
    shortDescription: 'Enterprise AI copywriter for marketing teams and brand content.',
    fullDescription: 'Jasper is an enterprise AI marketing platform that helps teams create high-converting copy, blog posts, social media updates, and email campaigns in their brand voice.',
    category: 'Marketing',
    pricing: 'Paid',
    website: 'https://jasper.ai',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&auto=format&fit=crop&q=80',
    tags: ['Marketing', 'Copywriting', 'SEO', 'Content'],
    features: ['Brand voice memory', '50+ marketing templates', 'SEO integration', 'Multi-language copy', 'Team collaboration'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'GPT-4 (Fine-tuned)',
    company: 'Jasper AI',
    foundedYear: 2021,
    history: 'Originally launched as Jarvis in January 2021, the company rebranded to Jasper AI in 2022 after a trademark dispute with Marvel. It became one of the first AI marketing platforms, raising $125 million at a $1.5 billion valuation.'
  },
  {
    title: 'Copy.ai',
    shortDescription: 'AI-powered GTM platform for automated marketing and sales content.',
    fullDescription: 'Copy.ai is an AI-powered Go-to-Market platform that automates sales copy, blog creation, product descriptions, and email sequences. Designed to streamline marketing workflows.',
    category: 'Marketing',
    pricing: 'Free Plan',
    website: 'https://copy.ai',
    thumbnail: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=600&auto=format&fit=crop&q=80',
    tags: ['Marketing', 'Copywriting', 'Sales', 'Automation'],
    features: ['Blog post wizard', 'Social content generator', 'Email sequence builder', 'Workflow automation', '90+ templates'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'GPT-4',
    company: 'Copy.ai Inc.',
    foundedYear: 2020,
    history: 'Copy.ai was founded in 2020 by Paul Yacoubian and Chris Lu. It was among the earliest GPT-3-powered consumer products, focused on making AI copywriting accessible to small businesses and marketers worldwide.'
  },
  {
    title: 'Writesonic',
    shortDescription: 'AI writer for SEO-optimized articles, ads, and landing pages.',
    fullDescription: 'Writesonic provides AI tools to write SEO-optimized blog posts, Google ads, landing pages, and product descriptions in seconds. Features Chatsonic with live search integration.',
    category: 'Writing',
    pricing: 'Free Plan',
    website: 'https://writesonic.com',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&auto=format&fit=crop&q=80',
    tags: ['Writing', 'SEO', 'Articles', 'Ads'],
    features: ['Article Writer 5.0', 'Chatsonic AI search', 'SEO checker', '1-click WordPress export', 'Audience targeting'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'GPT-4 + Custom Models',
    company: 'Writesonic Inc.',
    foundedYear: 2021,
    history: 'Writesonic was founded in 2021 by Samanyou Garg. Starting as a Y Combinator-backed startup, it grew into a comprehensive AI writing platform with Chatsonic — its ChatGPT alternative featuring real-time Google search integration.'
  },
  {
    title: 'Synthesia',
    shortDescription: 'Turn text into professional videos with photorealistic AI avatars.',
    fullDescription: 'Synthesia is the leading AI video creation platform. Create professional videos from text scripts in over 120 languages using 140+ photorealistic AI avatars without cameras or studios.',
    category: 'Video',
    pricing: 'Paid',
    website: 'https://synthesia.io',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80',
    tags: ['Video', 'Avatar', 'Text-to-Video', 'Presentation'],
    features: ['140+ AI avatars', '120+ languages', 'Custom avatar creation', 'Screen recorder', 'Closed captions'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'Proprietary Neural Video Synthesis',
    company: 'Synthesia Ltd.',
    foundedYear: 2017,
    history: 'Synthesia was founded in 2017 by a team of AI researchers from UCL, Stanford, and TUM. It gained global attention in 2020 when it partnered with David Beckham for a malaria awareness campaign using AI-generated video in 9 languages.'
  },
  {
    title: 'Runway Gen-2',
    shortDescription: 'Multi-modal AI system for text-to-video and video editing.',
    fullDescription: 'Runway Gen-2 is a multi-modal AI generation system that synthesizes new videos from text prompts, images, or existing video clips. Used by filmmakers worldwide.',
    category: 'Video',
    pricing: 'Free Trial',
    website: 'https://runwayml.com',
    thumbnail: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&auto=format&fit=crop&q=80',
    tags: ['Video', 'Generative', 'VFX', 'Filmmaking'],
    features: ['Text-to-Video', 'Image-to-Video', 'Motion brush', 'Inpainting & removal', 'Style transfer'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'Gen-3 Alpha',
    company: 'Runway AI',
    foundedYear: 2018,
    history: 'Runway was co-founded in 2018 by Cristóbal Valenzuela and other NYU researchers. The team contributed to the original Stable Diffusion research. Gen-2 (2023) pioneered consumer text-to-video AI and was used in the Oscar-winning film "Everything Everywhere All at Once."'
  },
  {
    title: 'Suno AI',
    shortDescription: 'Generate full songs with vocals and instruments from simple prompts.',
    fullDescription: 'Suno AI allows anyone to create full-length musical tracks complete with lyrics, instruments, and vocals in any style or genre simply by describing the song in plain English.',
    category: 'Music',
    pricing: 'Free Plan',
    website: 'https://suno.com',
    thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
    tags: ['Music', 'Audio', 'Songs', 'Creative'],
    features: ['Full song generation', 'Custom lyrics support', 'Multi-genre synthesis', 'Vocal harmony', 'High-quality export'],
    isFeatured: true,
    status: 'approved' as const,
    aiModel: 'Suno v3.5 (Bark + Chirp)',
    company: 'Suno Inc.',
    foundedYear: 2023,
    history: 'Suno was founded in 2023 by former Meta and Kensho engineers. Within months of launch, its viral music generation capabilities attracted millions of users and $125M in funding. Suno v3 (2024) enabled studio-quality 2-minute songs from text prompts.'
  },
  {
    title: 'ElevenLabs',
    shortDescription: 'Ultra-realistic AI voice generator and text-to-speech engine.',
    fullDescription: 'ElevenLabs offers the most realistic AI voice generator and text-to-speech model. Create natural sounding voices with emotional tone across 29 languages.',
    category: 'Music',
    pricing: 'Free Plan',
    website: 'https://elevenlabs.io',
    thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80',
    tags: ['Voice', 'Audio', 'Text-to-Speech', 'Dubbing'],
    features: ['Voice cloning', '29 languages', 'Emotion control', 'Dubbing studio', 'API access'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'Eleven Multilingual v2',
    company: 'ElevenLabs',
    foundedYear: 2022,
    history: 'ElevenLabs was co-founded in 2022 by Piotr Dąbkowski (ex-Google) and Mati Staniszewski (ex-Palantir). Their breakthrough TTS model achieved near-human speech quality, attracting $80M in Series B funding and partnerships with major publishers and media companies.'
  },
  {
    title: 'Grammarly',
    shortDescription: 'AI writing assistant for grammar, clarity, and tone adjustments.',
    fullDescription: 'Grammarly goes beyond spell checking to analyze writing style, tone, conciseness, and clarity. Offers real-time AI suggestions across browser extensions and desktop apps.',
    category: 'Writing',
    pricing: 'Free Plan',
    website: 'https://grammarly.com',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    tags: ['Writing', 'Grammar', 'Editing', 'Productivity'],
    features: ['Grammar & spell check', 'Tone detector', 'Plagiarism checker', 'Generative AI rewrite', 'App integrations'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'Proprietary NLP + LLM',
    company: 'Grammarly Inc.',
    foundedYear: 2009,
    history: 'Grammarly was founded in 2009 by Ukrainian developers Max Lytvyn and Alex Shevchenko. Starting as a simple grammar checker, it evolved into a comprehensive AI writing assistant used by over 30 million daily active users. In 2023, it introduced GrammarlyGO, its generative AI feature.'
  },
  {
    title: 'Descript',
    shortDescription: 'All-in-one video and podcast editor that works like a doc.',
    fullDescription: 'Descript simplifies podcasting and video editing by transcribing audio into text so you can edit video simply by editing text.',
    category: 'Video',
    pricing: 'Free Plan',
    website: 'https://descript.com',
    thumbnail: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=600&auto=format&fit=crop&q=80',
    tags: ['Podcast', 'Video', 'Transcript', 'Editing'],
    features: ['Text-based video edit', 'Studio sound cleanup', 'Filler word removal', 'AI eye contact correction', 'Overdub voice'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'Whisper + Custom ASR',
    company: 'Descript Inc.',
    foundedYear: 2017,
    history: 'Descript was founded in 2017 by Andrew Mason, co-founder of Groupon. Its revolutionary approach of editing video through text transcription disrupted traditional video editing. Acquired by Spotify in 2024 to power podcast creation tools.'
  },
  {
    title: 'Beautiful.ai',
    shortDescription: 'Generative AI presentation maker with smart design layouts.',
    fullDescription: 'Beautiful.ai is an intelligent presentation software that automatically designs slides as you add content. Adapts layout, typography, and spacing dynamically.',
    category: 'Design',
    pricing: 'Paid',
    website: 'https://beautiful.ai',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80',
    tags: ['Presentation', 'Slides', 'Design', 'Business'],
    features: ['Smart slide templates', 'Auto-formatting', 'Brand consistency', 'Analytics', 'PowerPoint export'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'Proprietary Design AI',
    company: 'Beautiful.ai',
    foundedYear: 2018,
    history: 'Beautiful.ai was founded in 2018 with the mission of making great design accessible to everyone. Its patented "DesignerBot" AI automatically adjusts layout rules as content is added, eliminating manual slide formatting.'
  },
  {
    title: 'Phind',
    shortDescription: 'AI search engine tuned specifically for software developers.',
    fullDescription: 'Phind is an AI search engine optimized for developer questions. Generates detailed explanations and executable code snippets directly from technical documentation.',
    category: 'Research',
    pricing: 'Free Plan',
    website: 'https://phind.com',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80',
    tags: ['Developer', 'Search', 'Code', 'Documentation'],
    features: ['Developer search focus', 'Code snippet answers', 'Live doc synthesis', 'VS Code extension', 'Fast responses'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'Phind-70B (Fine-tuned CodeLlama)',
    company: 'Phind Inc.',
    foundedYear: 2022,
    history: 'Phind was founded in 2022 to solve the problem of developers spending hours searching Stack Overflow and documentation. Their custom Phind-70B model, fine-tuned from CodeLlama, achieved GPT-4-level coding performance at much faster inference speeds.'
  },
  {
    title: 'Gamma App',
    shortDescription: 'Generate presentations, webpages, and documents in seconds with AI.',
    fullDescription: 'Gamma is a new medium for presenting ideas. Powered by AI, generate engaging presentations, memos, and interactive webpages in seconds.',
    category: 'Productivity',
    pricing: 'Free Plan',
    website: 'https://gamma.app',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    tags: ['Presentation', 'Docs', 'Webpage', 'Productivity'],
    features: ['1-click AI generation', 'Flexible card layout', 'Interactive embeds', 'Analytics', 'Export to PDF/PPT'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'GPT-4 + Custom Layout AI',
    company: 'Gamma Tech Inc.',
    foundedYear: 2022,
    history: 'Gamma was founded in 2022 by former Google and Uber engineers Jon Noronha and Grant Lee. It reimagined presentations as interactive web experiences rather than static slides, growing to over 20 million users within its first year.'
  },
  {
    title: 'Tome',
    shortDescription: 'AI-powered storytelling format for presentations and pitches.',
    fullDescription: 'Tome uses AI to help founders, creators, and executives build compelling stories, pitch decks, and visual presentations effortlessly.',
    category: 'Design',
    pricing: 'Free Plan',
    website: 'https://tome.app',
    thumbnail: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    tags: ['Presentation', 'Pitch Deck', 'Storytelling', 'Design'],
    features: ['Generative storytelling', 'AI image creation', 'Figma & Web embeds', 'Mobile responsive slides', 'Export options'],
    isFeatured: false,
    status: 'approved' as const,
    aiModel: 'GPT-4 + DALL·E 3',
    company: 'Magical Tome Inc.',
    foundedYear: 2020,
    history: 'Tome was co-founded in 2020 by Keith Peiris (ex-Instagram) and Henri Liriani (ex-Meta). It raised $75M to build an AI-native storytelling platform. Tome generates entire presentations including text, images, and layout from a single prompt.'
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
