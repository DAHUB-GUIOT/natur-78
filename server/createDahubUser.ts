import { db } from './db';
import { users, userProfiles, companies } from '@shared/schema';

async function createDahubUser() {
  try {
    // Create DaHub user
    const [dahubUser] = await db.insert(users).values({
      email: 'dahub.tech@gmail.com',
      password: 'dahub123',
      role: 'empresa',
      isActive: true,
      firstName: 'Daniel',
      lastName: 'Hurtado'
    }).returning();

    console.log('Created DaHub user:', dahubUser);

    // Create user profile
    const [dahubProfile] = await db.insert(userProfiles).values({
      userId: dahubUser.id,
      category: 'tecnologia',
      subcategory: 'Desarrollo de plataformas digitales',
      companyName: 'DaHub',
      description: 'Empresa de tecnología especializada en desarrollo de plataformas digitales para turismo sostenible. Creadores del ecosistema Festival NATUR.',
      website: 'https://dahub.tech',
      phone: '+57 301 234 5678',
      address: 'Centro de Felicidad Chapinero',
      city: 'Bogotá',
      department: 'Cundinamarca',
      country: 'Colombia',
      socialMedia: JSON.stringify({
        linkedin: 'https://linkedin.com/company/dahub',
        twitter: 'https://twitter.com/dahubtech',
        instagram: 'https://instagram.com/dahub.tech'
      }),
      articulation: ['Busco articulación territorial', 'Busco mentorías'],
      skills: ['Desarrollo Web', 'Plataformas Digitales', 'UX/UI Design', 'Base de Datos', 'APIs'],
      interests: ['Turismo Sostenible', 'Tecnología Verde', 'Innovación Social', 'Startups'],
      supportType: ['Desarrollo tecnológico', 'Consultoría digital', 'Diseño de experiencias'],
      isVerified: true
    }).returning();

    console.log('Created DaHub profile:', dahubProfile);

    // Create company profile
    const [dahubCompany] = await db.insert(companies).values({
      userId: dahubUser.id,
      companyName: 'DaHub',
      businessType: 'Tecnología',
      description: 'Empresa de tecnología especializada en desarrollo de plataformas digitales para turismo sostenible. Creadores del ecosistema Festival NATUR que conecta empresas, viajeros y experiencias auténticas.',
      website: 'https://dahub.tech',
      phone: '+57 301 234 5678',
      address: 'Centro de Felicidad Chapinero, Carrera 11 #93-07',
      city: 'Bogotá',
      department: 'Cundinamarca',
      country: 'Colombia',
      coordinates: JSON.stringify({ lat: 4.6782, lng: -74.0495 }),
      certifications: ['ISO 27001', 'Certificación B Corp', 'Google Partner'],
      services: [
        'Desarrollo de plataformas web',
        'Diseño UX/UI',
        'Consultoría tecnológica',
        'Integración de APIs',
        'Análisis de datos'
      ],
      isVerified: true,
      rating: 5,
      totalReviews: 42,
      status: 'active'
    }).returning();

    console.log('Created DaHub company:', dahubCompany);
    console.log('DaHub user creation completed successfully!');

  } catch (error) {
    console.error('Error creating DaHub user:', error);
  }
}

createDahubUser();