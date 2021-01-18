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
    'Thanks for dropping by : ). I am passionate about engineering and technology in general and, in particular, I love doing research about mobile robotics.',
  paragraphTwo:
    'I enjoy doing math analysis, defining problem statements and implementing solutions for them. One of my main areas of interest is analyzing to which extent practice meets theory.',
  paragraphThree:
    'My main hobbies are petting my dogs (one of them on the left), doing yoga and watching movies/series. ',
  resume: '', // if no resume, the button will not show up
};

// PROJECTS DATA
export const projectsData = [
  {
    id: nanoid(),
    img1: 'bsc0_1.jpg',
    img2: 'bsc0_2.jpg',
    title: 'Output Feedback Linear Control for an Air-based Levitator',
    info:
      "During my bachelor's degree, I discovered that I liked control theory when I was taking that subject. Because of this I implemented an output feedback linear control for an air-levitator system using a Luenberger observer to estimate the velocity of a ballon with only distance readings from an ultrasonic sensor.",
    info2: 'Click the images to see their respective videos.',
    link1: 'https://www.youtube.com/watch?v=dgmX2sGMyIk',
    link2: '',
    cap1: '',
    cap2: '',
    url:
      'https://www.researchgate.net/publication/298341144_Control_por_Retroalimentacion_de_Salida_de_un_Sistema_de_Levitacion_de_Aire',
    urltxt: 'Read more',
    repo: '', // if no repo, the button will not show up
    enableimg1: true,
    enableimg2: false,
  },
  {
    id: nanoid(),
    img1: 'bsc1.jpg',
    img2: 'bsc2.jpg',
    title: 'Instrumentation and control of a wheeled mobile robot type (2,0)',
    info:
      "For my Bachelor's thesis, I designed and programmed in C a low level PID speed control for the wheels velocities using only encoder readings to generate open loop trajectories on a skid-steered vehicle.",
    info2: 'Click the images to see their respective videos.',
    link1: 'https://www.youtube.com/watch?v=i-g88BYBD6c',
    link2: 'https://www.youtube.com/watch?v=JtLYsUKMTZ8',
    cap1: '',
    cap2: '',
    url: 'https://eventos.itam.mx/es/node/11558',
    urltxt: 'Read more',
    repo: '', // if no repo, the button will not show up
    enableimg1: true,
    enableimg2: true,
  },
  {
    id: nanoid(),
    img1: 'msc1.jpg',
    img2: 'msc2.jpg',
    title: 'Continuous sliding mode control of differential drive robot',
    info:
      "For my Master's thesis, I designed and programmed a trajectory tracking algorithm on a differential drive robot using a closed loop scheme based on sliding modes control technique using Super-Twisting algorithm.",
    info2: 'Click the images to see their respective videos.',
    link1: 'https://www.youtube.com/watch?v=bPUWZJW4Bnk',
    link2: 'https://www.youtube.com/watch?v=lp1aQLZVq9M',
    cap1: '',
    cap2: '',
    url: 'https://ieeexplore.ieee.org/document/8264571',
    urltxt: 'Read more',
    repo: '', // if no repo, the button will not show up
    enableimg1: true,
    enableimg2: true,
  },
  {
    id: nanoid(),
    img1: 'personal1.jpg',
    img2: 'personal2.jpg',
    title: 'My own R2-D2',
    info:
      "For my own fun, I am building and programming what is going to be a R2-D2 cousin; it's a work in progress. It's a hot mess for now.",
    info2: '',
    link1: '',
    link2: '',
    cap1: '',
    cap2: '',
    url: '',
    urltxt: '',
    repo: '', // if no repo, the button will not show up
    enableimg1: false,
    enableimg2: false,
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
