import { UserCategory } from './ProfileHeader';

export interface UserData {
  name: string;
  username: string;
  email?: string;
  bio?: string;
  profileImage?: string;
  coverImage?: string;
  location?: string;
  website?: string;
  foundingYear?: string;
  phase?: string;
  investmentStage?: string;
  stats?: { label: string; value: number }[];
  metrics?: { label: string; value: string | number; change?: string }[];
  subcategory?: string;
  visitedCountries?: number;
  nomadSince?: number;
  workStyle?: string;
  investmentThesis?: string;
  mentorSpecialties?: string[];
  investorType?: string;
  portfolioSize?: number;
  investmentTicket?: string;
  mentoringExperience?: number;
  mentoringSpecialties?: string[];
  currentCountry?: string; // Added for digital nomad profiles
}

// Helper function to generate demo data for user profiles based on category and subcategory
export const getUserData = (userCategory: string = 'ecosystem', profileData?: any): UserData => {
  // Use profile data if available
  if (profileData) {
    return {
      name: profileData.name || 'Usuario NATUR',
      username: profileData.username || 'usuario',
      email: profileData.email,
      bio: profileData.bio || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      profileImage: profileData.profileImage,
      coverImage: profileData.coverImage,
      location: profileData.location || 'Colombia',
      website: profileData.website,
      foundingYear: profileData.foundingYear || '2023',
      phase: profileData.phase || 'Pre-seed',
      investmentStage: profileData.investmentStage || 'Bootstrapping',
      stats: profileData.stats,
      metrics: profileData.metrics,
      subcategory: profileData.subcategory,
      visitedCountries: profileData.visitedCountries,
      nomadSince: profileData.nomadSince,
      workStyle: profileData.workStyle,
      investmentThesis: profileData.investmentThesis,
      mentorSpecialties: profileData.mentorSpecialties,
      investorType: profileData.investorType,
      portfolioSize: profileData.portfolioSize,
      investmentTicket: profileData.investmentTicket,
      mentoringExperience: profileData.mentoringExperience,
      mentoringSpecialties: profileData.mentoringSpecialties,
      currentCountry: profileData.currentCountry
    };
  }

  // Otherwise, generate demo data based on category
  const baseUser: UserData = {
    name: 'Usuario NATUR',
    username: 'usuario',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    location: 'Colombia',
    website: 'www.natur.com',
    stats: [
      { label: 'Eventos', value: 6 },
      { label: 'Conexiones', value: 45 },
      { label: 'Puntos', value: 350 }
    ]
  };

  // Check if we have a subcategory related to investment roles
  const isInvestmentRole = (subcategory?: string) => {
    return ['investor', 'angel', 'mentor', 'venture-capital'].includes(subcategory || '');
  };

  // Specialized user data based on category and subcategory
  switch (userCategory) {
    case 'startup': {
      // For startup subcategories that are investment roles
      if (profileData?.subcategory && isInvestmentRole(profileData.subcategory)) {
        switch (profileData.subcategory) {
          case 'investor': 
            return {
              ...baseUser,
              name: 'Carlos Inversionista',
              username: 'carlosInversionista',
              bio: 'Inversionista especializado en startups de turismo sostenible y tecnologías limpias.',
              profileImage: '/lovable-uploads/c3a75ff8-9113-437d-a3a4-4229e6ee5fcd.png',
              coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
              location: 'Bogotá, Colombia',
              website: 'www.carlosinversiones.co',
              stats: [
                { label: 'Inversiones', value: 12 },
                { label: 'Startups', value: 8 },
                { label: 'Años', value: 5 }
              ],
              metrics: [
                { label: 'Retorno', value: '18%', change: '+3%' },
                { label: 'Portfolio', value: 8, change: '+2' },
                { label: 'Ticket Promedio', value: '$35K', change: '+$5K' }
              ],
              subcategory: 'investor',
              investmentThesis: 'Inversión en startups tempranas con enfoque en sostenibilidad y turismo.',
              investorType: 'Independiente',
              portfolioSize: 8,
              investmentTicket: '$20K - $50K'
            };
          case 'angel':
            return {
              ...baseUser,
              name: 'Laura Ángel',
              username: 'lauraAngel',
              bio: 'Inversionista ángel con experiencia en tecnología y turismo sostenible. Apasionada por impulsar startups innovadoras.',
              profileImage: '/lovable-uploads/81245bdf-c903-4362-b622-c71abf0eb375.png',
              coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
              location: 'Medellín, Colombia',
              website: 'www.lauraangel.co',
              stats: [
                { label: 'Inversiones', value: 15 },
                { label: 'Startups', value: 10 },
                { label: 'Años', value: 7 }
              ],
              metrics: [
                { label: 'Retorno', value: '22%', change: '+5%' },
                { label: 'Portfolio', value: 10, change: '+3' },
                { label: 'Ticket Promedio', value: '$25K', change: '+$10K' }
              ],
              subcategory: 'angel',
              investmentThesis: 'Capital semilla para startups con impacto social y ambiental.',
              investorType: 'Ángel',
              portfolioSize: 10,
              investmentTicket: '$10K - $30K'
            };
          case 'mentor':
            return {
              ...baseUser,
              name: 'Roberto Mentor',
              username: 'robertoMentor',
              bio: 'Mentor con más de 15 años de experiencia en emprendimiento sostenible y ecoturismo.',
              profileImage: '/lovable-uploads/5fa2b81d-c76e-4674-8146-eb35c5acd256.png',
              coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
              location: 'Cartagena, Colombia',
              website: 'www.robertomentor.co',
              stats: [
                { label: 'Mentorados', value: 35 },
                { label: 'Startups', value: 22 },
                { label: 'Años', value: 15 }
              ],
              metrics: [
                { label: 'Satisfacción', value: '9.8/10', change: '+0.3' },
                { label: 'Sesiones', value: 120, change: '+15' },
                { label: 'Startups Exitosas', value: 18, change: '+2' }
              ],
              subcategory: 'mentor',
              mentoringExperience: 15,
              mentoringSpecialties: ['Estrategia de negocio', 'Ecoturismo', 'Levantamiento de capital'],
            };
          case 'venture-capital':
            return {
              ...baseUser,
              name: 'Grupo VC Sostenible',
              username: 'vcSostenible',
              bio: 'Fondo de inversión especializado en startups con impacto positivo en el medio ambiente y comunidades locales.',
              profileImage: '/lovable-uploads/c42792d2-c891-4c5f-9e17-5e10c02dd85c.png',
              coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
              location: 'Bogotá, Colombia',
              website: 'www.vcsostenible.co',
              stats: [
                { label: 'Inversiones', value: 28 },
                { label: 'Portfolio', value: 18 },
                { label: 'Años', value: 9 }
              ],
              metrics: [
                { label: 'AUM', value: '$12M', change: '+$2M' },
                { label: 'Retorno', value: '25%', change: '+5%' },
                { label: 'Ticket Promedio', value: '$250K', change: '+$50K' }
              ],
              subcategory: 'venture-capital',
              investmentThesis: 'Inversión en startups de Series A y B con enfoque en sostenibilidad.',
              investorType: 'Venture Capital',
              portfolioSize: 18,
              investmentTicket: '$150K - $500K'
            };
          default:
            return baseUser;
        }
      }
      
      // Regular startup profile
      return {
        ...baseUser,
        name: 'Eco Aventuras SAS',
        username: 'ecoaventuras',
        bio: 'Startup de turismo sostenible enfocada en experiencias ecoturísticas.',
        profileImage: '/lovable-uploads/c42792d2-c891-4c5f-9e17-5e10c02dd85c.png',
        coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
        location: 'Medellín, Colombia',
        website: 'www.ecoaventuras.co',
        foundingYear: '2021',
        phase: 'Growth',
        investmentStage: 'Series A',
        stats: [
          { label: 'Clientes', value: 1250 },
          { label: 'Destinos', value: 15 },
          { label: 'Empleos', value: 22 }
        ],
        metrics: [
          { label: 'Ingresos', value: '$350K', change: '+25%' },
          { label: 'Crecimiento', value: '35%', change: '+8%' },
          { label: 'Impacto', value: '2.5K', change: '+500' }
        ],
        subcategory: profileData?.subcategory
      };
    }
    
    // Handle other categories
    case 'attendee':
      return {
        ...baseUser,
        name: 'Maria Asistente',
        username: 'mariaAsistente',
        bio: 'Apasionada por el turismo sostenible y la conservación del medio ambiente.',
        profileImage: '/lovable-uploads/81245bdf-c903-4362-b622-c71abf0eb375.png',
        coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
        location: 'Bogotá, Colombia',
        website: 'www.eventosostenible.co',
        stats: [
          { label: 'Eventos', value: 12 },
          { label: 'Conexiones', value: 68 },
          { label: 'Puntos', value: 520 }
        ],
        subcategory: profileData?.subcategory
      };
    case 'sponsor':
      return {
        ...baseUser,
        name: 'Eco Patrocinios SAS',
        username: 'ecoPatrocinios',
        bio: 'Empresa comprometida con el patrocinio de eventos y proyectos sostenibles.',
        profileImage: '/lovable-uploads/c42792d2-c891-4c5f-9e17-5e10c02dd85c.png',
        coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
        location: 'Cali, Colombia',
        website: 'www.ecopatrocinios.co',
        stats: [
          { label: 'Eventos', value: 25 },
          { label: 'Alianzas', value: 42 },
          { label: 'Campañas', value: 15 }
        ],
        subcategory: profileData?.subcategory
      };
    case 'digital-nomad':
      return {
        ...baseUser,
        name: 'Sofia Nómada',
        username: 'sofiaNomada',
        bio: 'Nómada digital explorando destinos sostenibles y promoviendo el turismo responsable.',
        profileImage: '/lovable-uploads/5fa2b81d-c76e-4674-8146-eb35c5acd256.png',
        coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
        location: 'Medellín, Colombia',
        website: 'www.sofianomada.co',
        currentCountry: 'Colombia',
        stats: [
          { label: 'Países', value: 32 },
          { label: 'Destinos', value: 85 },
          { label: 'Experiencias', value: 62 }
        ],
        subcategory: profileData?.subcategory,
        visitedCountries: 32,
        nomadSince: 2018,
        workStyle: 'Freelance'
      };
    case 'ecosystem':
    default:
      return {
        ...baseUser,
        name: 'Andrés Ecosistema',
        username: 'andresEcosistema',
        bio: 'Promotor del turismo sostenible y la conservación del medio ambiente en el ecosistema.',
        profileImage: '/lovable-uploads/c3a75ff8-9113-437d-a3a4-4229e6ee5fcd.png',
        coverImage: '/lovable-uploads/96c8e76d-00c8-4cd5-b263-4b779aa85181.jpg',
        location: 'Bogotá, Colombia',
        website: 'www.ecosistemaverde.co',
        stats: [
          { label: 'Eventos', value: 18 },
          { label: 'Conexiones', value: 95 },
          { label: 'Puntos', value: 780 }
        ],
        subcategory: profileData?.subcategory
      };
  }
};
