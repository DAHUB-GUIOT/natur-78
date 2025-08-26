import { storage } from './storage';

async function createTestUserBogota() {
  try {
    console.log('🔧 Creating test user for Bogotá...');
    
    // Create test user with Bogotá location
    const userData = {
      email: 'jedomingueza@unal.edu.co',
      password: 'festival123456',
      firstName: 'Julián Eduardo',
      lastName: 'Domínguez',
      companyName: 'EcoTours Bogotá',
      companyDescription: 'Agencia de turismo sostenible especializada en experiencias urbanas ecológicas en Bogotá. Promovemos el turismo responsable a través de recorridos que conectan a los visitantes con la biodiversidad urbana, los humedales de la capital y las iniciativas de agricultura urbana.',
      companyCategory: 'Agencias u Operadores Turísticos',
      companySubcategory: 'Turismo Urbano Sostenible',
      coordinates: {
        lat: 4.6097, // Centro de Bogotá - La Candelaria
        lng: -74.0817
      },
      address: 'Calle 11 #5-51, La Candelaria',
      city: 'Bogotá',
      country: 'Colombia',
      website: 'www.ecotoursbogota.co',
      phone: '+57 1 342 7890',
      facebookUrl: 'https://facebook.com/ecotoursbogota',
      twitterUrl: 'https://twitter.com/ecotoursbogota',
      instagramUrl: 'https://instagram.com/ecotours_bogota',
      linkedinUrl: 'https://linkedin.com/company/ecotours-bogota',
      businessType: 'Agencia de turismo sostenible especializada en experiencias urbanas',
      foundingYear: '2019',
      numberOfEmployees: '8-15',
      annualRevenue: 'COP $150M - $500M',
      targetMarket: 'Turistas nacionales e internacionales interesados en experiencias urbanas sostenibles',
      servicesOffered: 'Tours urbanos ecológicos, visitas a humedales, recorridos de agricultura urbana, experiencias gastronómicas sostenibles',
      certifications: 'Certificación en Turismo Sostenible - Ministerio de Comercio',
      awards: 'Premio Nacional de Turismo Sostenible 2023',
      isActive: true
    };

    // Get existing user by email
    let user = await storage.getUserByEmail(userData.email);
    
    if (!user) {
      // Create basic user first if doesn't exist
      const basicUserData = {
        email: userData.email,
        password: userData.password,
        firstName: userData.firstName,
        lastName: userData.lastName,
        isVerified: true
      };
      user = await storage.createUser(basicUserData);
    } else {
      console.log('✅ User already exists, updating profile...');
    }
    
    // Update user with company data for Bogotá location
    const updateData = {
      companyName: userData.companyName,
      companyDescription: userData.companyDescription,
      companyCategory: userData.companyCategory,
      companySubcategory: userData.companySubcategory,
      coordinates: userData.coordinates,
      address: userData.address,
      city: userData.city,
      country: userData.country,
      website: userData.website,
      phone: userData.phone,
      facebookUrl: userData.facebookUrl,
      twitterUrl: userData.twitterUrl,
      instagramUrl: userData.instagramUrl,
      linkedinUrl: userData.linkedinUrl,
      businessType: userData.businessType,
      bio: userData.companyDescription,
      role: 'empresa', // Set role to empresa
      registrationComplete: false, // So user can complete manually
      profileCompletion: 35 // Some progress but not complete
    };
    
    const updatedUser = await storage.updateUser(user.id, updateData);
    console.log('✅ User updated successfully with Bogotá company data');
    console.log('📍 Updated user:', updatedUser);
    console.log('📍 Location: Bogotá, Colombia (La Candelaria)');
    console.log('🔑 Credentials: jedomingueza@unal.edu.co / festival123456');
    
  } catch (error) {
    console.error('❌ Error creating test user:', error);
  }
}

createTestUserBogota();