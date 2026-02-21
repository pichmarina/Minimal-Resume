const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine({
  defaultLayout: 'main',
  extname: '.handlebars',
  partialsDir: ['views/partials/'],
  helpers: {
    section: function(name, options) {
      if (!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
    },

    skillBarWidth: function(level) {
      return (level / 5) * 100 + '%';
    },

    yearRange: function(start, end) {
      return end ? `${start} – ${end}` : `${start} – Present`;
    },

    eq: function(a, b) {
      return a === b;
    }
  }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

const resumeData = {
  name: 'Pichmarina El',
  title: 'Front-End Developer',
  email: 'pichmarina.el@email.com',
  github: 'github.com/pichmarina',
  linkedin: 'linkedin.com/in/pichmarinael',
  location: 'Phnom Penh, Cambodia',
  bio: 'Passionate developer building scalable web apps and clean user experiences. I love turning complex problems into elegant solutions.',

  skills: [
    { name: 'JavaScript', level: 5, category: 'frontend' },
    { name: 'React', level: 4, category: 'frontend' },
    { name: 'Node.js', level: 4, category: 'backend' },
    { name: 'Express.js', level: 4, category: 'backend' },
    { name: 'PostgreSQL', level: 3, category: 'backend' },
    { name: 'CSS / Tailwind', level: 5, category: 'frontend' },
    { name: 'Python', level: 3, category: 'backend' },
  ],

  experience: [
    {
      company: 'AUPP',
      role: 'Junior Frontend Developer',
      startYear: 2025,
      endYear: null,
      current: true,
      description: 'Working on a team to develop and maintain the university’s main website and student portal. Focused on improving accessibility and mobile responsiveness.',
      highlights: ['React', 'Tailwind CSS', 'Git']
    },
    {
      company: 'FHSU',
      role: 'Software Engineer',
      startYear: 2024,
      endYear: 2025,
      current: false,
      description: 'Led development of a campus event management system used by students and staff. Integrated calendar APIs and implemented user authentication.',
      highlights: ['Node.js', 'Express', 'MongoDB']
    }
  ],

  education: [
    {
      school: 'AUPP',
      degree: 'B.S. Computer Science',
      year: 2025,
      honors: true
    },
    {
      school: 'Sovannaphumi School',
      degree: 'Highschool Diploma',
      year: 2023,
      honors: false
    }
  ],

  projects: [
    {
      name: 'My Portfolio',
      description: 'A responsive portfolio website showcasing my projects and skills.',
      url: 'my-portfolio-sigma-fawn-14.vercel.app',
      featured: true
    },

    {
      name: 'React Weather App',
      description: 'A responsive weather application built with React and the OpenWeather API.',
      url: 'react-weather-app-ivory-kappa.vercel.app',
      featured: true
    },
  
    {
      name: 'Fitness Tracker',
      description: 'A fitness tracking application with workout logging and progress visualization.',
      url: 'fitness-ten-xi.vercel.app',
      featured: false
    }
  ],

  openToWork: true,
  availableForFreelance: false
};

app.get('/', (req, res) => {
  res.render('home', {
    ...resumeData,
    pageTitle: `${resumeData.name} — Developer`,
    activePage: 'home'
  });
});

app.get('/experience', (req, res) => {
  res.render('experience', {
    ...resumeData,
    pageTitle: 'Experience — Pichmarina El',
    activePage: 'experience'
  });
});

app.get('/skills', (req, res) => {
  res.render('skills', {
    ...resumeData,
    pageTitle: 'Skills — Pichmarina El',
    activePage: 'skills',
    hasSkills: resumeData.skills.length > 0
  });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    ...resumeData,
    pageTitle: 'Homework6 — Pichmarina El',
    activePage: 'projects',
    featuredProjects: resumeData.projects.filter(p => p.featured),
    otherProjects: resumeData.projects.filter(p => !p.featured)
  });
});

app.use((req, res) => {
  res.status(404).render('home', {
    ...resumeData,
    pageTitle: '404 — Not Found',
    activePage: 'home',
    error404: true
  });
});

app.listen(PORT, () => {
  console.log(`Resume app running at http://localhost:${PORT}`);
});