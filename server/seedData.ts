import { db } from './db';
import { users, userProfiles, experiences, companies, messages, conversations } from '../shared/schema';
import { eq, or } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

async function seedData() {
  console.log('🌱 Starting seed data...');

  try {
    // Clear existing data for these emails first
    console.log('🧹 Clearing existing data...');
    
    // Find existing users
    const existingDahub = await db.select().from(users).where(eq(users.email, 'dahub.tech@gmail.com'));
    const existingTripcol = await db.select().from(users).where(eq(users.email, 'tripcol.tour@gmail.com'));
    
    // Delete existing data if found
    if (existingDahub.length > 0) {
      const dahubId = existingDahub[0].id;
      // Delete in correct order due to foreign key constraints
      await db.delete(conversations).where(or(eq(conversations.participant1Id, dahubId), eq(conversations.participant2Id, dahubId)));
      await db.delete(messages).where(or(eq(messages.senderId, dahubId), eq(messages.receiverId, dahubId)));
      await db.delete(experiences).where(eq(experiences.userId, dahubId));
      await db.delete(companies).where(eq(companies.userId, dahubId));
      await db.delete(userProfiles).where(eq(userProfiles.userId, dahubId));
      await db.delete(users).where(eq(users.id, dahubId));
    }
    
    if (existingTripcol.length > 0) {
      const tripcolId = existingTripcol[0].id;
      // Delete in correct order due to foreign key constraints
      await db.delete(conversations).where(or(eq(conversations.participant1Id, tripcolId), eq(conversations.participant2Id, tripcolId)));
      await db.delete(messages).where(or(eq(messages.senderId, tripcolId), eq(messages.receiverId, tripcolId)));
      await db.delete(experiences).where(eq(experiences.userId, tripcolId));
      await db.delete(companies).where(eq(companies.userId, tripcolId));
      await db.delete(userProfiles).where(eq(userProfiles.userId, tripcolId));
      await db.delete(users).where(eq(users.id, tripcolId));
    }
    
    console.log('✅ Existing data cleared');
    
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
        location: JSON.stringify({
          address: 'Eje Cafetero, Colombia',
          lat: 4.5339,
          lng: -75.6811,
          city: 'Armenia',
          region: 'Quindío'
        }),
        category: 'cultura' as const,
        adultPricePvp: '120000',
        duration: '4 horas',
        languages: ['Español', 'Inglés'],
        included: 'Tablet con AR, Degustación de café, Transporte, Guía especializado',
        notIncluded: 'Almuerzo, Souvenirs',
        wheelchairAccessible: 'yes',
        cancellationPolicy: 'Cancelación gratuita hasta 24h antes',
        minimumAge: '12',
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: dahubUser.id,
        title: 'Smart City Tour Bogotá',
        description: 'Recorrido por los proyectos de innovación urbana y sostenibilidad de Bogotá',
        type: 'Tour Urbano',
        location: JSON.stringify({
          address: 'Bogotá, Colombia',
          lat: 4.7110,
          lng: -74.0721,
          city: 'Bogotá',
          region: 'Cundinamarca'
        }),
        category: 'educativo' as const,
        adultPricePvp: '85000',
        duration: '3 horas',
        languages: ['Español', 'Inglés'],
        included: 'Transporte eléctrico, App guía, Refrigerio',
        notIncluded: 'Almuerzo',
        wheelchairAccessible: 'yes',
        minimumPeople: '5',
        cancellationPolicy: 'Cancelación 48h antes',
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: dahubUser.id,
        title: 'Hackathon Turismo Sostenible',
        description: 'Evento de innovación para crear soluciones tecnológicas al turismo responsable',
        type: 'Evento Tech',
        location: JSON.stringify({
          address: 'Centro de Innovación, Bogotá',
          lat: 4.6097,
          lng: -74.0817,
          city: 'Bogotá',
          region: 'Cundinamarca'
        }),
        category: 'educativo' as const,
        adultPricePvp: '150000',
        duration: '2 días',
        languages: ['Español', 'Inglés'],
        included: 'Materiales, Alimentación, Premios, Certificado',
        notIncluded: 'Alojamiento, Transporte',
        wheelchairAccessible: 'yes',
        cancellationPolicy: 'Inscripción previa obligatoria',
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
        location: JSON.stringify({
          address: 'Leticia, Amazonas',
          lat: -4.2153,
          lng: -69.9406,
          city: 'Leticia',
          region: 'Amazonas'
        }),
        category: 'naturaleza' as const,
        adultPricePvp: '1500000',
        duration: '5 días',
        languages: ['Español', 'Inglés', 'Portugués'],
        included: 'Alojamiento eco-lodge, Todas las comidas, Guías locales, Actividades',
        notIncluded: 'Vuelos, Seguro de viaje',
        wheelchairAccessible: 'no',
        cancellationPolicy: 'Reserva con 30 días anticipación',
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: tripcolUser.id,
        title: 'Cartagena Cultural',
        description: 'Tour gastronómico y cultural por el centro histórico de Cartagena',
        type: 'Tour Cultural',
        location: JSON.stringify({
          address: 'Cartagena, Colombia',
          lat: 10.3910,
          lng: -75.4794,
          city: 'Cartagena',
          region: 'Bolívar'
        }),
        category: 'gastronomia' as const,
        adultPricePvp: '180000',
        duration: '6 horas',
        languages: ['Español', 'Inglés', 'Francés'],
        included: '8 degustaciones, Bebidas, Guía historiador',
        notIncluded: 'Propinas, Compras personales',
        foodIncluded: true,
        foodDetails: '8 paradas gastronómicas con degustaciones típicas',
        wheelchairAccessible: 'partial',
        cancellationPolicy: 'Cancelación hasta 24h antes',
        status: 'aprobado' as const,
        isActive: true
      },
      {
        userId: tripcolUser.id,
        title: 'Páramo de Sumapaz Trek',
        description: 'Caminata ecológica por el páramo más grande del mundo',
        type: 'Trekking',
        location: JSON.stringify({
          address: 'Páramo de Sumapaz, Bogotá',
          lat: 4.3166,
          lng: -74.3833,
          city: 'Bogotá',
          region: 'Cundinamarca'
        }),
        category: 'aventura' as const,
        adultPricePvp: '250000',
        duration: '1 día',
        languages: ['Español', 'Inglés'],
        included: 'Transporte 4x4, Almuerzo campesino, Guía especializado, Seguro',
        notIncluded: 'Equipo personal de trekking',
        wheelchairAccessible: 'no',
        minimumAge: '14',
        cancellationPolicy: 'Sujeto a condiciones climáticas',
        activeTourismData: JSON.stringify({
          difficulty: 'moderate',
          altitude: '3500m',
          distance: '15km',
          restrictions: 'Requiere buena condición física'
        }),
        status: 'aprobado' as const,
        isActive: true
      }
    ];

    // Create Festival NATUR event at Centro de Felicidad
    const festivalExperience = {
      userId: dahubUser.id, // Assigned to DaHub as organizer
      title: '🎯 Festival NATUR 2025 - Centro de Felicidad Chapinero',
      description: 'El evento más importante de turismo sostenible y regenerativo en Latinoamérica. 3 días de conferencias, talleres, networking y experiencias inmersivas en el nuevo Centro de Felicidad Chapinero. 50+ speakers internacionales, 20+ talleres prácticos, zona de exhibición y premiación de startups sostenibles. Fechas: 15-17 de Marzo 2025.',
      type: 'Festival',
      location: JSON.stringify({
        address: 'Centro de Felicidad Chapinero, Cl. 82 #10-69, Bogotá',
        lat: 4.6682,
        lng: -74.0576,
        city: 'Bogotá',
        region: 'Cundinamarca'
      }),
      category: 'educativo' as const,
      adultPricePvp: '350000',
      childPricePvp: '175000', // 50% discount for students
      duration: '3 días',
      languages: ['Español', 'Inglés', 'Portugués'],
      included: 'Acceso a todas las conferencias, Talleres prácticos, Networking sessions, Almuerzo sostenible diario, Kit de bienvenida eco-friendly, Certificado de participación, App del evento',
      notIncluded: 'Alojamiento, Transporte, Cena',
      wheelchairAccessible: 'yes',
      meetingPoint: 'Centro de Felicidad Chapinero - Entrada principal',
      operationDays: '15, 16 y 17 de Marzo 2025',
      operationHours: '8:00 AM - 7:00 PM',
      cancellationPolicy: 'Reembolso completo hasta 15 días antes del evento',
      additionalQuestions: 'Este es el evento principal de Festival NATUR. El Centro de Felicidad es el primer parque vertical de Colombia con 10 pisos de espacios culturales y recreativos.',
      status: 'aprobado' as const,
      isActive: true
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