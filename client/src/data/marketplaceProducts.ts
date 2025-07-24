
import { Product } from '@/types/marketplace';

export const marketplaceProducts: Product[] = [
  {
    id: 1,
    nombre: "Mochila Wayúu Tradicional",
    descripcion: "Mochila artesanal tejida a mano por mujeres de la comunidad Wayúu. Cada pieza es única y refleja historias ancestrales a través de sus colores y patrones.",
    precio: 180000,
    imagen: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    region: "La Guajira",
    comunidad: "Artesanas Wayúu",
    tipo: "artesania",
    tipoNombre: "Artesanía",
    impactos: ["mujeres", "indigenas"]
  },
  {
    id: 2,
    nombre: "Café Orgánico de la Sierra Nevada",
    descripcion: "Café de especialidad cultivado bajo sombra por familias campesinas e indígenas. Cuenta con certificación orgánica y de comercio justo.",
    precio: 45000,
    imagen: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    region: "Magdalena",
    comunidad: "Cooperativa Caficultores Minca",
    tipo: "alimentacion",
    tipoNombre: "Alimentación",
    impactos: ["reforestacion", "agua"]
  },
  {
    id: 3,
    nombre: "Experiencia Ecoturismo en Amazonas",
    descripcion: "Travesía de 3 días con comunidades indígenas donde aprenderás sobre plantas medicinales y conservación en selva amazónica.",
    precio: 650000,
    imagen: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    region: "Amazonas",
    comunidad: "Comunidad Ticuna",
    tipo: "experiencias",
    tipoNombre: "Experiencias",
    impactos: ["indigenas", "reforestacion"]
  },
  {
    id: 4,
    nombre: "Jabón Artesanal de Cacao",
    descripcion: "Jabones naturales elaborados con cacao orgánico del Pacífico colombiano. Libres de químicos dañinos y empacados en materiales biodegradables.",
    precio: 25000,
    imagen: "https://images.unsplash.com/photo-1607006957648-c8f8bf7b4e36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    region: "Chocó",
    comunidad: "Mujeres del Pacífico",
    tipo: "cosmetica",
    tipoNombre: "Cosmética Natural",
    impactos: ["mujeres", "residuos"]
  },
  {
    id: 5,
    nombre: "Kit Solar Portátil",
    descripcion: "Cargador solar portátil diseñado para viajeros responsables. Alimenta tus dispositivos con energía limpia durante tus aventuras.",
    precio: 215000,
    imagen: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    region: "Bogotá D.C.",
    comunidad: "EcoTech Colombia",
    tipo: "experiencias",
    tipoNombre: "Experiencias",
    impactos: ["energia"]
  },
  {
    id: 6,
    nombre: "Conservas de Frutas Nativas",
    descripcion: "Deliciosas conservas elaboradas con frutas silvestres recolectadas sosteniblemente por comunidades campesinas del Eje Cafetero.",
    precio: 38000,
    imagen: "https://images.unsplash.com/photo-1564493799747-3260312cfde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    region: "Caldas",
    comunidad: "Red de Mujeres Cafeteras",
    tipo: "alimentacion",
    tipoNombre: "Alimentación",
    impactos: ["mujeres", "reforestacion"]
  }
];
