import { nanoid } from 'nanoid';

// HEAD DATA
export const headData = {
  title: "Frida's Portfolio", // e.g: 'Name | Developer'
  lang: '', // e.g: en, es, fr, jp
  description: 'Welcome to my portfolio', // e.g: Welcome to my website
};

// HERO DATA
export const heroData = {
  title: 'Hi there : ), my name is',
  name: 'Frida',
  subtitle: "I'm an Embedded Systems Developer.",
  cta: '',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    'Thanks for dropping by : ). I am passionate about engineering and technology in general and, in particular, I love mobile robotics topics.',
  paragraphTwo: '',
  paragraphThree: '',
  resume: 'https://www.resumemaker.online/es.php', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img: 'project.jpg',
    title: 'Output Feedback Linear Control for an Air-based Levitator',
    info: "During my bachelor's degree",
    info2: ' ',
    url: 'https://www.youtube.com/watch?v=dgmX2sGMyIk',
    repo: '', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'bachelor_1.png',
    title: 'Instrumentation and control of a wheeled mobile robot type (2,0)',
    info:
      "For my Bachelor's thesis, I designed and programmed in C a low level PID speed control for the wheels velocities using only encoder readings to generate open loop trajectories on a skid-steered vehicle.",
    info2: ' ',
    url: 'https://www.youtube.com/watch?v=JtLYsUKMTZ8',
    repo: '', // if no repo, the button will not show up
  },
  {
    id: nanoid(),
    img: 'msc1.jpg',
    title: 'Continuous sliding mode control of differential drive robot',
    info:
      "For my Master's thesis, I designed and programmed a trajectory tracking algorithm on a differential drive robot using a closed loop scheme based on sliding modes control technique using Super-Twisting algorithm.",
    info2: ' ',
    url: 'https://www.youtube.com/watch?v=bPUWZJW4Bnk',
    repo: '', // if no repo, the button will not show up
  },
];

// CONTACT DATA
export const contactData = {
  cta: 'Would you like to work with me?',
  btn: '',
  email: 'gailroco@gmail.com',
};

// FOOTER DATA
export const footerData = {
  title: 'Page customized by',
  subtitle: 'Frida Rojas',
  base: '',
  networks: [
    {
      id: nanoid(),
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/gailroco/',
    },
    {
      id: nanoid(),
      name: 'github',
      url: 'https://github.com/gailroco1',
    },
    {
      id: nanoid(),
      name: 'hackerrank',
      url: 'https://www.hackerrank.com/gailroco',
    },
  ],
};

// Github start/fork buttons
export const githubButtons = {
  isEnabled: false, // set to false to disable the GitHub stars/fork buttons
};
