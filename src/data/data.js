// HEAD DATA
export const headData = {
  title: "Gail's Portfolio",
  lang: 'en',
  description: 'Welcome to my portfolio',
};

// HERO DATA
export const heroData = {
  title: 'Hi there : ), my name is',
  name: 'Frida',
  subtitle: "I'm an Embedded Systems Developer.",
  cta: 'Know more',
};

// ABOUT DATA
export const aboutData = {
  img: 'profile.jpg',
  paragraphOne:
    'Thanks for dropping by! I am passionate about engineering and technology in general and, in particular, I love doing research about mobile robotics.',
  paragraphTwo:
    'I enjoy doing math analysis, defining problem statements and implementing solutions for them. One of my main areas of interest is analyzing to which extent practice meets theory.',
  paragraphThree:
    'My main hobbies are petting my dogs (one of them on the left), playing soccer, watching movies or series and doing yoga.',
  resume: '',
};

// PROJECTS DATA
export const projectsData = [
  {
    id: 'project-levitator',
    img1: 'bsc0_1.jpg',
    img2: 'bsc0_2.jpg',
    title: 'Output Feedback Linear Control for an Air-based Levitator',
    info:
      "During my bachelor's degree, I discovered that I liked control theory when I was taking that subject. Because of this I designed and implemented an output feedback linear control for an air-levitator system using a Luenberger observer to estimate the velocity of a ballon with only distance readings from an ultrasonic sensor.",
    info2: 'Click the images to see their respective videos.',
    link1: 'https://www.youtube.com/watch?v=dgmX2sGMyIk',
    link2: '',
    cap1: "Plot of the balloon's measured and estimated position over time, with the small estimation error",
    cap2: "Plot of the observer's estimated balloon velocity compared with the noisy numerical derivative of position",
    linklabel1: 'Watch the air levitator video',
    linklabel2: '',
    url:
      'https://www.researchgate.net/publication/298341144_Control_por_Retroalimentacion_de_Salida_de_un_Sistema_de_Levitacion_de_Aire',
    urltxt: 'Read more',
    repo: '',
    enableimg1: true,
    enableimg2: false,
  },
  {
    id: 'project-wheeled-robot',
    img1: 'bsc1.jpg',
    img2: 'bsc2.jpg',
    title: 'Instrumentation and control of a wheeled mobile robot type (2,0)',
    info:
      "For my Bachelor's thesis, I designed and programmed in C a low level PID speed control for the wheels velocities using only encoder readings to generate open loop trajectories on a skid-steered vehicle.",
    info2: 'Click the images to see their respective videos.',
    link1: 'https://www.youtube.com/watch?v=i-g88BYBD6c',
    link2: 'https://www.youtube.com/watch?v=JtLYsUKMTZ8',
    cap1: 'Plot of left and right wheel speeds in RPM, each holding steady at its own setpoint',
    cap2: 'Plot of left and right wheel speeds in RPM as the robot switches between turning manoeuvres',
    linklabel1: 'Watch the wheeled robot video 1',
    linklabel2: 'Watch the wheeled robot video 2',
    url: 'https://eventos.itam.mx/es/node/11558',
    urltxt: 'Read more',
    repo: '',
    enableimg1: true,
    enableimg2: true,
  },
  {
    id: 'project-sliding-mode',
    img1: 'msc1.jpg',
    img2: 'msc2.jpg',
    title: 'Continuous sliding mode control of differential drive robot',
    info:
      "For my Master's thesis, I designed and programmed a trajectory tracking algorithm on a differential drive robot using a closed loop scheme based on sliding modes control technique using Super-Twisting algorithm.",
    info2: 'Click the images to see their respective videos.',
    link1: 'https://www.youtube.com/watch?v=bPUWZJW4Bnk',
    link2: 'https://www.youtube.com/watch?v=lp1aQLZVq9M',
    cap1: 'Plot of the robot tracking a figure-eight reference path with the Super-Twisting controller',
    cap2: 'Plot comparing linear, sign-based and Super-Twisting controllers tracking a circular path',
    linklabel1: 'Watch the sliding mode robot video 1',
    linklabel2: 'Watch the sliding mode robot video 2',
    url: 'https://ieeexplore.ieee.org/document/8264571',
    urltxt: 'Read more',
    repo: '',
    enableimg1: true,
    enableimg2: true,
  },
  {
    id: 'project-r2d2',
    img1: 'personal1.jpg',
    img2: 'personal2.jpg',
    title: 'My own R2-D2',
    info:
      "For my own fun, I am building and programming what is going to be a R2-D2 cousin; it's a work in progress. It's a hot mess for now.",
    info2: '',
    link1: '',
    link2: '',
    cap1: 'The R2-D2 build in progress: a wooden base with two geared motors, wheels, an Arduino Mega and wiring',
    cap2: 'Placeholder image reading "Coming soon"',
    linklabel1: '',
    linklabel2: '',
    url: '',
    urltxt: '',
    repo: '',
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
  title: 'Page created by',
  subtitle: 'Frida Rojas',
  base: 'this Gatsby modified template.',
  networks: [
    {
      id: 'network-linkedin',
      name: 'linkedin',
      url: 'https://www.linkedin.com/in/gailroco/',
    },
    {
      id: 'network-github',
      name: 'github',
      url: 'https://github.com/gailroco',
    },
    {
      id: 'network-hackerrank',
      name: 'hackerrank',
      url: 'https://www.hackerrank.com/gailroco',
    },
  ],
};

