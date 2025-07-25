import { db } from './db';
import { users, userProfiles, experiences, companies } from '../shared/schema';
import bcrypt from 'bcryptjs';

async function seedData() {
  console.log('🌱 Starting seed data...');

  try {
    // Create business users
    const dahubPassword = await bcrypt.hash('dahub123', 10);
    const tripcolPassword = await bcrypt.hash('tripcol123', 10);

    // Insert DaHub user
    const [dahubUser] = await db.insert(users).values({
      email: 'dahub.tech@gmail.com',
      password: dahubPassword,
      role: 'empresa'
    }).returning();

    // Insert TripCol user
    const [tripcolUser] = await db.insert(users).values({
      email: 'tripcol.tour@gmail.com', 
      password: tripcolPassword,
      role: 'empresa'
    }).returning();

    // Create user profiles
    await db.insert(userProfiles).values([
      {
        userId: dahubUser.id,
        name: 'DaHub Tech',
        userCategory: 'emprendimiento',
        subcategory: 'startup_tecnologia',
        bio: 'Innovación digital para el turismo sostenible en Colombia',
        location: 'Bogotá, Colombia',
        website: 'https://dahub.tech',
        phone: '+57 320 1234567'
      },
      {
        userId: tripcolUser.id,
        name: 'TripCol Tours',
        userCategory: 'emprendimiento',
        subcategory: 'operador_turistico',
        bio: 'Experiencias auténticas y sostenibles por toda Colombia',
        location: 'Bogotá, Colombia',
        website: 'https://tripcol.com',
        phone: '+57 315 9876543'
      }
    ]);

    // Create companies
    await db.insert(companies).values([
      {
        userId: dahubUser.id,
        companyName: 'DaHub Tech',
        businessType: 'startup_tecnologia',
        description: 'Plataforma tecnológica para conectar viajeros conscientes con experiencias sostenibles',
        website: 'https://dahub.tech',
        phone: '+57 320 1234567',
        city: 'Bogotá',
        department: 'Cundinamarca',
        isVerified: true
      },
      {
        userId: tripcolUser.id,
        companyName: 'TripCol Tours',
        businessType: 'operador_turistico',
        description: 'Operador turístico especializado en experiencias culturales y ecológicas',
        website: 'https://tripcol.com',
        phone: '+57 315 9876543',
        city: 'Bogotá',
        department: 'Cundinamarca',
        isVerified: true
      }
    ]);

    // Create DaHub experiences
    const dahubExperiences = [
      {
        userId: dahubUser.id,
        title: 'Ruta Digital del Café Colombiano',
        description: 'Experiencia inmersiva que combina tecnología AR con visitas a fincas cafeteras tradicionales',
        type: 'Tour Tecnológico',
        location: 'Eje Cafetero, Colombia',
        latitude: 4.5339,
        longitude: -75.6811,
        subtitle: 'Descubre el café con realidad aumentada',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800',
        category: 'cultura' as const,
        price: 120000,
        duration: '4 horas',
        maxGuests: 15,
        languages: ['Español', 'Inglés'],
        included: ['Tablet con AR', 'Degustación de café', 'Transporte', 'Guía especializado'],
        notIncluded: ['Almuerzo', 'Souvenirs'],
        accessibility: ['Senderos accesibles', 'Contenido visual y auditivo'],
        policies: ['Cancelación gratuita hasta 24h antes', 'Edad mínima 12 años'],
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: dahubUser.id,
        title: 'Smart City Tour Bogotá',
        description: 'Recorrido por los proyectos de innovación urbana y sostenibilidad de Bogotá',
        type: 'Tour Urbano',
        location: 'Bogotá, Colombia',
        latitude: 4.7110,
        longitude: -74.0721,
        subtitle: 'El futuro sostenible de las ciudades',
        image: 'https://images.unsplash.com/photo-1573108037329-37aa135a142e?w=800',
        category: 'educativo' as const,
        price: 85000,
        duration: '3 horas',
        maxGuests: 20,
        languages: ['Español', 'Inglés'],
        included: ['Transporte eléctrico', 'App guía', 'Refrigerio'],
        notIncluded: ['Almuerzo'],
        accessibility: ['Totalmente accesible', 'Intérprete LSC disponible'],
        policies: ['Grupos mínimo 5 personas', 'Cancelación 48h'],
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: dahubUser.id,
        title: 'Hackathon Turismo Sostenible',
        description: 'Evento de innovación para crear soluciones tecnológicas al turismo responsable',
        type: 'Evento Tech',
        location: 'Centro de Innovación, Bogotá',
        latitude: 4.6097,
        longitude: -74.0817,
        subtitle: 'Innova para un turismo mejor',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800',
        category: 'educativo' as const,
        price: 150000,
        duration: '2 días',
        maxGuests: 100,
        languages: ['Español', 'Inglés'],
        included: ['Materiales', 'Alimentación', 'Premios', 'Certificado'],
        notIncluded: ['Alojamiento', 'Transporte'],
        accessibility: ['Espacio accesible', 'Streaming disponible'],
        policies: ['Inscripción previa obligatoria', 'Equipos de 3-5 personas'],
        status: 'aprobado' as const,
        isActive: true
      }
    ];

    // Create TripCol experiences
    const tripcolExperiences = [
      {
        userId: tripcolUser.id,
        title: 'Amazonas Consciente',
        description: 'Expedición sostenible por el Amazonas con comunidades indígenas',
        type: 'Expedición',
        location: 'Leticia, Amazonas',
        latitude: -4.2153,
        longitude: -69.9406,
        subtitle: 'Conecta con la selva de forma responsable',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800',
        category: 'naturaleza' as const,
        price: 1500000,
        duration: '5 días',
        maxGuests: 12,
        languages: ['Español', 'Inglés', 'Portugués'],
        included: ['Alojamiento eco-lodge', 'Todas las comidas', 'Guías locales', 'Actividades'],
        notIncluded: ['Vuelos', 'Seguro de viaje'],
        accessibility: ['Requiere condición física moderada'],
        policies: ['Reserva con 30 días anticipación', 'Vacunas requeridas'],
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: tripcolUser.id,
        title: 'Cartagena Cultural',
        description: 'Tour gastronómico y cultural por el centro histórico de Cartagena',
        type: 'Tour Cultural',
        location: 'Cartagena, Colombia',
        latitude: 10.3910,
        longitude: -75.4794,
        subtitle: 'Sabores e historias del Caribe',
        image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800',
        category: 'gastronomia' as const,
        price: 180000,
        duration: '6 horas',
        maxGuests: 15,
        languages: ['Español', 'Inglés', 'Francés'],
        included: ['8 degustaciones', 'Bebidas', 'Guía historiador'],
        notIncluded: ['Propinas', 'Compras personales'],
        accessibility: ['Recorrido a pie por calles empedradas'],
        policies: ['No apto para alergias severas', 'Cancelación 24h'],
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: tripcolUser.id,
        title: 'Páramo de Sumapaz Trek',
        description: 'Caminata ecológica por el páramo más grande del mundo',
        type: 'Trekking',
        location: 'Páramo de Sumapaz, Bogotá',
        latitude: 4.3166,
        longitude: -74.3833,
        subtitle: 'El páramo más grande del planeta',
        image: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800',
        category: 'aventura' as const,
        price: 250000,
        duration: '1 día',
        maxGuests: 10,
        languages: ['Español', 'Inglés'],
        included: ['Transporte 4x4', 'Almuerzo campesino', 'Guía especializado', 'Seguro'],
        notIncluded: ['Equipo personal de trekking'],
        accessibility: ['Requiere buena condición física', 'Altitud 3500m'],
        policies: ['Edad mínima 14 años', 'Sujeto a condiciones climáticas'],
        status: 'aprobado' as const,
        isActive: true
      }
    ];

    // Create Festival NATUR event at Centro de Felicidad
    const festivalExperience = {
      userId: dahubUser.id, // Assigned to DaHub as organizer
      title: 'Festival NATUR 2025',
      description: 'El evento más importante de turismo sostenible y regenerativo en Latinoamérica. 3 días de conferencias, talleres, networking y experiencias inmersivas en el nuevo Centro de Felicidad Chapinero.',
      type: 'Festival',
      location: 'Centro de Felicidad Chapinero, Cl. 82 #10-69, Bogotá',
      latitude: 4.6682, // Chapinero area coordinates
      longitude: -74.0576,
      subtitle: '¡El corazón del turismo sostenible late en Bogotá!',
      image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800',
      category: 'educativo' as const,
      price: 350000,
      duration: '3 días',
      maxGuests: 1000,
      languages: ['Español', 'Inglés', 'Portugués'],
      included: [
        'Acceso a todas las conferencias',
        'Talleres prácticos',
        'Networking sessions',
        'Almuerzo sostenible',
        'Kit de bienvenida eco-friendly',
        'Certificado de participación',
        'App del evento'
      ],
      notIncluded: ['Alojamiento', 'Transporte', 'Cena'],
      accessibility: [
        'Instalaciones 100% accesibles',
        'Intérprete LSC',
        'Material en braille disponible'
      ],
      policies: [
        'Entrada con código QR',
        'Política zero waste',
        'Descuento 30% estudiantes'
      ],
      highlights: [
        '50+ speakers internacionales',
        '20+ talleres prácticos',
        'Zona de exhibición',
        'Premiación startups sostenibles'
      ],
      status: 'aprobado' as const,
      isActive: true,
      isFeatured: true, // Special flag for the festival
      eventDates: ['2025-03-15', '2025-03-16', '2025-03-17']
    };

    // Insert all experiences
    await db.insert(experiences).values([
      ...dahubExperiences,
      ...tripcolExperiences,
      festivalExperience
    ]);

    console.log('✅ Seed data completed successfully!');
    console.log('📧 Users created:');
    console.log('   - dahub.tech@gmail.com (password: dahub123)');
    console.log('   - tripcol.tour@gmail.com (password: tripcol123)');
    console.log('🎯 7 experiences created (3 per company + Festival NATUR)');
    console.log('📍 Festival NATUR location: Centro de Felicidad Chapinero');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
    throw error;
  }
}

// Run the seed function
seedData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });