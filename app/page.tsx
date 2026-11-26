"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";

export interface Municipio {
  nombre: string;
  parroquias: string[];
}

export interface EstadoData {
  estado: string;
  municipios: Municipio[];
}

export const DIVISION_TERRITORIAL_VENEZUELA: EstadoData[] = [
  {
    estado: "Amazonas",
    municipios: [
      { nombre: "Alto Orinoco", parroquias: ["La Esmeralda", "Huachamacare", "Marawaka", "Mavaka", "Sierra Parima"] },
      { nombre: "Atabapo", parroquias: ["San Fernando de Atabapo", "Ucata", "Yapacana", "Caname"] },
      { nombre: "Atures", parroquias: ["Fernando Girón Tovar", "Luis Alberto Gómez", "Pahueña", "Platanillal"] },
      { nombre: "Autana", parroquias: ["Samariapo", "Sipapo", "Munduapo", "Guayapo"] },
      { nombre: "Manapiare", parroquias: ["San Juan de Manapiare", "Alto Ventuari", "Medio Ventuari", "Bajo Ventuari"] },
      { nombre: "Maroa", parroquias: ["Maroa", "Victorino", "Comunidad"] },
      { nombre: "Río Negro", parroquias: ["San Carlos de Río Negro", "Solano", "Casiquiare", "Cocuy"] }
    ]
  },
  {
    estado: "Anzoátegui",
    municipios: [
      { nombre: "Anaco", parroquias: ["Anaco", "San Joaquín"] },
      { nombre: "Aragua", parroquias: ["Aragua de Barcelona", "Cachipo"] },
      { nombre: "Bolívar", parroquias: ["El Carmen", "San Cristóbal", "Bergantín", "Caigua", "El Pilar", "Naricual"] },
      { nombre: "Bruzual", parroquias: ["Clarines", "Guanape", "Sabana de Uchire"] },
      { nombre: "Cajigal", parroquias: ["Onoto", "San Pablo"] },
      { nombre: "Carvajal", parroquias: ["Valle Guanape", "Santa Bárbara"] },
      { nombre: "Diego Bautista Urbaneja", parroquias: ["Lechería", "El Morro"] },
      { nombre: "Freites", parroquias: ["Cantaura", "Libertador", "Santa Rosa", "Urica"] },
      { nombre: "Guanipa", parroquias: ["San José de Guanipa"] },
      { nombre: "Guanta", parroquias: ["Guanta", "Chorrerón"] },
      { nombre: "Independencia", parroquias: ["Soledad", "Mamo"] },
      { nombre: "Libertad", parroquias: ["San Mateo", "El Carito", "Santa Inés"] },
      { nombre: "McGregor", parroquias: ["El Chaparro", "Tomás Alfaro"] },
      { nombre: "Miranda", parroquias: ["Pariaguán", "Atapirire", "Boca del Pao", "El Pao"] },
      { nombre: "Monagas", parroquias: ["Mapire", "Piar", "Santa Clara", "San Diego de Cabrutica", "Uverito", "Zuata"] },
      { nombre: "Peñalver", parroquias: ["Puerto Píritu", "San Miguel", "Sucre"] },
      { nombre: "Píritu", parroquias: ["Píritu", "San Francisco"] },
      { nombre: "San José de Guanipa", parroquias: ["San José de Guanipa"] },
      { nombre: "Santa Ana", parroquias: ["Santa Ana", "Pueblo Nuevo"] },
      { nombre: "Simón Bolívar", parroquias: ["Barcelona", "El Carmen", "San Cristóbal", "Bergantín", "Caigua", "El Pilar", "Naricual"] },
      { nombre: "Sotillo", parroquias: ["Puerto La Cruz", "Pozuelos"] }
    ]
  },
  {
    estado: "Apure",
    municipios: [
      { nombre: "Achaguas", parroquias: ["Achaguas", "Apurito", "El Yagual", "Guachara", "Mucuritas", "Queseras del Medio"] },
      { nombre: "Biruaca", parroquias: ["Biruaca"] },
      { nombre: "Muñoz", parroquias: ["Bruzual", "Mantecal", "Quintero", "Rincón Hondo", "San Vicente"] },
      { nombre: "Páez", parroquias: ["Guasdualito", "Aramendi", "El Amparo", "San Camilo", "Urdaneta"] },
      { nombre: "Pedro Camejo", parroquias: ["San Juan de Payara", "Codazzi", "Cunaviche"] },
      { nombre: "Rómulo Gallegos", parroquias: ["Elorza", "La Trinidad"] },
      { nombre: "San Fernando", parroquias: ["San Fernando", "El Recreo", "Peñalver", "San Rafael de Atamaica"] }
    ]
  },
  {
    estado: "Aragua",
    municipios: [
      { nombre: "Camatagua", parroquias: ["Camatagua", "Carmen de Cura"] },
      { nombre: "Francisco Linares Alcántara", parroquias: ["Santa Rita", "Francisco de Miranda", "Monseñor Feliciano González"] },
      { nombre: "Girardot", parroquias: ["José Casanova Godoy", "Madre María de San José", "Joaquín Crespo", "Pedro José Ovalles", "Andrés Eloy Blanco", "Los Tacariguas", "Las Delicias", "Choroní"] },
      { nombre: "José Ángel Lamas", parroquias: ["Santa Cruz"] },
      { nombre: "José Félix Ribas", parroquias: ["La Victoria", "Castor Nieves Ríos", "Las Guacamayas", "Pao de Zárate", "Zuata"] },
      { nombre: "José Rafael Revenga", parroquias: ["El Consejo"] },
      { nombre: "Libertador", parroquias: ["Palo Negro", "San Martín de Porres"] },
      { nombre: "Mario Briceño Iragorry", parroquias: ["El Limón", "Caña de Azúcar"] },
      { nombre: "Ocumare de la Costa de Oro", parroquias: ["Ocumare de la Costa"] },
      { nombre: "San Casimiro", parroquias: ["San Casimiro", "Güiripa", "Ollas de Caramacate", "Valle Morín"] },
      { nombre: "San Sebastián", parroquias: ["San Sebastián"] },
      { nombre: "Santiago Mariño", parroquias: ["Turmero", "Arévalo Aponte", "Chuao", "Samán de Güere", "Alfredo Pacheco Miranda"] },
      { nombre: "Santos Michelena", parroquias: ["Las Tejerías", "Tiara"] },
      { nombre: "Sucre", parroquias: ["Cagua", "Bella Vista"] },
      { nombre: "Tovar", parroquias: ["Colonia Tovar"] },
      { nombre: "Urdaneta", parroquias: ["Barbacoas", "Las Peñitas", "San Francisco de Cara", "Taguay"] },
      { nombre: "Zamora", parroquias: ["Villa de Cura", "Magdaleno", "San Francisco de Asís", "Valles de Tucutunemo", "Augusto Mijares"] }
    ]
  },
  {
    estado: "Barinas",
    municipios: [
      { nombre: "Alberto Arvelo Torrealba", parroquias: ["Sabaneta", "José Ignacio del Pumar", "Rodríguez Domínguez"] },
      { nombre: "Andrés Eloy Blanco", parroquias: ["El Cantón", "Puerto Vivas", "Santa Cruz de Guacas"] },
      { nombre: "Antonio José de Sucre", parroquias: ["Socopó", "Nicolás Pulido", "Andrés Bello"] },
      { nombre: "Arismendi", parroquias: ["Arismendi", "Guadarrama", "La Unión", "San Antonio"] },
      { nombre: "Barinas", parroquias: ["Barinas", "Alfredo Arvelo Larriva", "San Silvestre", "Santa Inés", "Santa Lucía", "Torunos", "El Carmen", "Rómulo Betancourt", "Corazón de Jesús", "Ramón Ignacio Méndez", "Alto Barinas", "Manuel Palacio Fajardo", "Juan Antonio Rodríguez Domínguez", "Dominga Ortiz de Páez"] },
      { nombre: "Bolívar", parroquias: ["Barinitas", "Altamira", "Calderas"] },
      { nombre: "Cruz Paredes", parroquias: ["Barrancas", "El Socorro", "Masparrito"] },
      { nombre: "Ezequiel Zamora", parroquias: ["Santa Bárbara", "José Ignacio del Pumar", "Pedro Briceño Méndez", "Ramón Ignacio Méndez"] },
      { nombre: "Obispos", parroquias: ["Obispos", "El Real", "La Luz", "Los Guasimitos"] },
      { nombre: "Pedraza", parroquias: ["Ciudad Bolivia", "Ignacio Briceño", "José Félix Ribas", "Páez"] },
      { nombre: "Rojas", parroquias: ["Libertad", "Dolores", "Palacios Fajardo", "Santa Rosa", "Simón Rodríguez"] },
      { nombre: "Sosa", parroquias: ["Ciudad de Nutrias", "El Regalo", "Puerto de Nutrias", "Santa Catalina", "Simón Bolívar"] }
    ]
  },
  {
    estado: "Bolívar",
    municipios: [
      { nombre: "Angostura (Raúl Leoni)", parroquias: ["Santa Bárbara", "Ciudad Piar", "San Francisco", "Barceloneta", "Pedro Cova"] },
      { nombre: "Caroní", parroquias: ["Ciudad Guayana", "Unare", "Universidad", "Vista al Sol", "Pozo Verde", "Chirica", "Dalla Costa", "Once de Abril", "Simón Bolívar", "Yocoima", "Cachamay"] },
      { nombre: "Cedeño", parroquias: ["Caicara del Orinoco", "Altagracia", "Ascensión Farreras", "Guaniamo", "La Urbana", "Pijiguaos"] },
      { nombre: "El Callao", parroquias: ["El Callao"] },
      { nombre: "Gran Sabana", parroquias: ["Santa Elena de Uairén", "Ikabarú"] },
      { nombre: "Heres", parroquias: ["Ciudad Bolívar", "Catedral", "Agua Salada", "Vista Hermosa", "Marhuanta", "José Antonio Páez", "Orinoco", "Panapana", "Zea"] },
      { nombre: "Padre Pedro Chien", parroquias: ["El Palmar"] },
      { nombre: "Piar", parroquias: ["Upata", "Andrés Eloy Blanco", "Pedro Cova"] },
      { nombre: "Roscio", parroquias: ["Guasipati", "Salóm"] },
      { nombre: "Sifontes", parroquias: ["El Dorado", "Dalla Costa", "San Isidro"] },
      { nombre: "Sucre", parroquias: ["Maripa", "Aripao", "Guarataro", "Las Majadas", "Moitaco"] }
    ]
  },
  {
    estado: "Carabobo",
    municipios: [
      { nombre: "Bejuma", parroquias: ["Bejuma", "Canoabo", "Simón Bolívar"] },
      { nombre: "Carlos Arvelo", parroquias: ["Güigüe", "Belén", "Tacarigua"] },
      { nombre: "Diego Ibarra", parroquias: ["Mariara", "Aguas Calientes"] },
      { nombre: "Guacara", parroquias: ["Guacara", "Ciudad Alianza", "Yagua"] },
      { nombre: "Juan José Mora", parroquias: ["Morón", "Urama"] },
      { nombre: "Libertador", parroquias: ["Tocuyito", "Independencia"] },
      { nombre: "Los Guayos", parroquias: ["Los Guayos"] },
      { nombre: "Miranda", parroquias: ["Miranda"] },
      { nombre: "Montalbán", parroquias: ["Montalbán"] },
      { nombre: "Naguanagua", parroquias: ["Naguanagua"] },
      { nombre: "Puerto Cabello", parroquias: ["Bartolomé Salom", "Democracia", "Fraternidad", "Goaigoaza", "Juan José Flores", "Unión", "Borburata", "Patanemo"] },
      { nombre: "San Diego", parroquias: ["San Diego"] },
      { nombre: "San Joaquín", parroquias: ["San Joaquín"] },
      { nombre: "Valencia", parroquias: ["Candelaria", "Catedral", "El Socorro", "Miguel Peña", "Rafael Urdaneta", "San Blas", "San José", "Santa Rosa", "Negro Primero"] }
    ]
  },
  {
    estado: "Cojedes",
    municipios: [
      { nombre: "Anzoátegui", parroquias: ["Cojedes", "Juan de Mata Suárez"] },
      { nombre: "Falcón", parroquias: ["Tinaquillo"] },
      { nombre: "Girardot", parroquias: ["El Baúl", "Sucre"] },
      { nombre: "Lima Blanco", parroquias: ["Macapo", "La Aguadita"] },
      { nombre: "Pao de San Juan Bautista", parroquias: ["El Pao"] },
      { nombre: "Ricaurte", parroquias: ["Libertad de Cojedes", "El Amparo"] },
      { nombre: "Rómulo Gallegos", parroquias: ["Las Vegas"] },
      { nombre: "San Carlos", parroquias: ["San Carlos de Austria", "Juan Ángel Bravo", "Manuel Manrique"] },
      { nombre: "Tinaco", parroquias: ["General en Jefe José Laurencio Silva"] }
    ]
  },
  {
    estado: "Delta Amacuro",
    municipios: [
      { nombre: "Antonio Díaz", parroquias: ["Curiapo", "Almirante Luis Brión", "Francisco Aniceto Lugo", "Manuel Renaud", "Padre Barral", "Santos de Abelgas"] },
      { nombre: "Casacoima", parroquias: ["Sierra Imataca", "Cinco de Julio", "Juan Bautista Arismendi", "Manuel Piar", "Rómulo Gallegos"] },
      { nombre: "Pedernales", parroquias: ["Pedernales", "Luis Beltrán Prieto Figueroa"] },
      { nombre: "Tucupita", parroquias: ["San José", "José Vidal Marcano", "Juan Millán", "Leonardo Ruíz Pineda", "Mariscal Antonio José de Sucre", "Monseñor Argimiro García", "San Rafael", "Virgen del Valle"] }
    ]
  },
  {
    estado: "Distrito Capital",
    municipios: [
      {
        nombre: "Libertador",
        parroquias: [
          "Altagracia", "Antímano", "Candelaria", "Caricuao", "Catedral", "Coche",
          "El Junquito", "El Paraíso", "El Recreo", "El Valle", "La Pastora", "La Vega",
          "Macarao", "San Agustín", "San Bernardino", "San José", "San Juan", "San Pedro",
          "Santa Rosalía", "Santa Teresa", "Sucre", "23 de Enero"
        ]
      }
    ]
  },
  {
    estado: "Falcón",
    municipios: [
      { nombre: "Acosta", parroquias: ["San Juan de los Cayos", "Capadare", "La Pastora", "Libertador"] },
      { nombre: "Bolívar", parroquias: ["San Luis", "Aracua", "La Peña"] },
      { nombre: "Buchivacoa", parroquias: ["Capatárida", "Bariro", "Borojó", "Guajiro", "Seque", "Zazárida"] },
      { nombre: "Cacique Manaure", parroquias: ["Yaracal"] },
      { nombre: "Carirubana", parroquias: ["Punto Fijo", "Carirubana", "North", "Santa Ana"] },
      { nombre: "Colina", parroquias: ["La Vela de Coro", "Acurigua", "Guaibacoa", "Las Calderas", "Macoruca"] },
      { nombre: "Dabajuro", parroquias: ["Dabajuro"] },
      { nombre: "Democracia", parroquias: ["Pedregal", "Agua Clara", "Avaria", "Guaibacoa", "Piedra Grande", "Purureche"] },
      { nombre: "Falcón", parroquias: ["Pueblo Nuevo", "Adaure", "Adícora", "Baraived", "Buena Vista", "Jadacaquiva", "Moruy", "Santa Cruz de Los Taques"] },
      { nombre: "Federación", parroquias: ["Churuguara", "Agua Larga", "El Paují", "Independencia", "Mapararí"] },
      { nombre: "Jacura", parroquias: ["Jacura", "Agua Linda", "Araurima"] },
      { nombre: "Los Taques", parroquias: ["Santa Cruz de Los Taques", "Judibana"] },
      { nombre: "Mauroa", parroquias: ["Mene de Mauroa", "Casigua", "San Félix"] },
      { nombre: "Miranda", parroquias: ["Coro", "Guzmán Guillermo", "Mitare", "Río Seco", "Sabaneta", "San Antonio", "San Gabriel"] },
      { nombre: "Monseñor Iturriza", parroquias: ["Chichiriviche", "Boca de Tocuyo", "Tocuyo de la Costa"] },
      { nombre: "Palmasola", parroquias: ["Palmasola"] },
      { nombre: "Petit", parroquias: ["Cabure", "Colina", "Curimagua"] },
      { nombre: "Píritu", parroquias: ["Píritu", "San José de la Costa"] },
      { nombre: "San Francisco", parroquias: ["Mirimire"] },
      { nombre: "Silva", parroquias: ["Tucacas", "Boca de Aroa"] },
      { nombre: "Sucre", parroquias: ["La Cruz de Taratara", "Sucre"] },
      { nombre: "Tocópero", parroquias: ["Tocópero"] },
      { nombre: "Unión", parroquias: ["Santa Cruz de Bucaral", "El Charal", "Las Vegas del Tuy"] },
      { nombre: "Urumaco", parroquias: ["Urumaco", "Bruzual"] },
      { nombre: "Zamora", parroquias: ["Puerto Cumarebo", "La Ciénaga", "La Soledad", "Pueblo Cumarebo", "Zazárida"] }
    ]
  },
  {
    estado: "Guárico",
    municipios: [
      { nombre: "Camaguán", parroquias: ["Camaguán", "Puerto Miranda", "Uverito"] },
      { nombre: "Chaguaramas", parroquias: ["Chaguaramas"] },
      { nombre: "El Socorro", parroquias: ["El Socorro"] },
      { nombre: "Francisco de Miranda", parroquias: ["Calabozo", "El Calvario", "El Rastro", "Guardatinajas"] },
      { nombre: "José Félix Ribas", parroquias: ["Tucupido", "San Rafael de Laya"] },
      { nombre: "José Tadeo Monagas", parroquias: ["Altagracia de Orituco", "Lezama", "Libertad de Orituco", "Paso Real de Macaira", "San Francisco de Macaira", "San Rafael de Orituco", "Soublette"] },
      { nombre: "Juan Germán Roscio", parroquias: ["San Juan de los Morros", "Cantagallo", "Parapara"] },
      { nombre: "Julián Mellado", parroquias: ["El Sombrero", "Sosa"] },
      { nombre: "Las Mercedes", parroquias: ["Las Mercedes", "Cabruta", "Santa Rita de Manapire"] },
      { nombre: "Leonardo Infante", parroquias: ["Valle de la Pascua", "Espino"] },
      { nombre: "Pedro Zaraza", parroquias: ["Zaraza", "San José de Unare"] },
      { nombre: "Ortiz", parroquias: ["Ortiz", "San Francisco de Tiznados", "San José de Tiznados", "Soublette"] },
      { nombre: "San Gerónimo de Guayabal", parroquias: ["Guayabal", "Cazorla"] },
      { nombre: "San José de Guaribe", parroquias: ["San José de Guaribe"] },
      { nombre: "Santa María de Ipire", parroquias: ["Santa María de Ipire", "Altamira"] }
    ]
  },
  {
    estado: "La Guaira",
    municipios: [
      { nombre: "Vargas", parroquias: ["Caraballeda", "Carayaca", "Carlos Soublette", "Caruao", "Catia La Mar", "El Junko", "La Guaira", "Macuto", "Maiquetía", "Naiguatá", "Urimare"] }
    ]
  },
  {
    estado: "Lara",
    municipios: [
      { nombre: "Andrés Eloy Blanco", parroquias: ["Sanare", "Quebrada Honda de Guache", "Pío Tamayo", "Yacambú"] },
      { nombre: "Crespo", parroquias: ["Duaca", "Freitez"] },
      { nombre: "Iribarren", parroquias: ["Catedral", "Concepción", "El Cují", "Juan de Villegas", "Santa Rosa", "Tamaca", "Unión", "Aguedo Felipe Alvarado", "Buena Vista", "Juárez"] },
      { nombre: "Jiménez", parroquias: ["Quíbor", "Cuara", "Diego de Lozada", "Paraíso de San José", "San Miguel", "Tintorero", "José Bernardo Dorante", "Coronel Mariano Peraza"] },
      { nombre: "Morán", parroquias: ["El Tocuyo", "Anzoátegui", "Bolívar", "Guárico", "Hilario Luna y Luna", "Humocaro Alto", "Humocaro Bajo", "La Concordia", "Morán"] },
      { nombre: "Palavecino", parroquias: ["Cabudare", "José Gregorio Bastidas", "Agua Viva"] },
      { nombre: "Simón Planas", parroquias: ["Sarare", "Buría", "Gustavo Vegas León"] },
      { nombre: "Torres", parroquias: ["Carora", "Altagracia", "Antonio Díaz", "Camacaro", "Castañeda", "Cecilio Zubillaga", "Chiquinquirá", "El Blanco", "Espinoza de los Monteros", "Heriberto Arroyo", "Las Mercedes", "Manuel Morillo", "Montaña Verde", "Montes de Oca", "Reyes Vargas", "Torres", "Trinidad Samuel"] },
      { nombre: "Urdaneta", parroquias: ["Siquisique", "Moroturo", "San Miguel", "Xaguas"] }
    ]
  },
  {
    estado: "Mérida",
    municipios: [
      { nombre: "Alberto Adriani", parroquias: ["El Vigía", "Presidente Betancourt", "Presidente Páez", "Presidente Rómulo Gallegos", "Gabriel Picón González", "Héctor Amable Mora", "Rómulo Betancourt"] },
      { nombre: "Andrés Bello", parroquias: ["La Azulita"] },
      { nombre: "Antonio Pinto Salinas", parroquias: ["Santa Cruz de Mora", "Mesa Bolívar", "Mesa de Las Palmas"] },
      { nombre: "Aricagua", parroquias: ["Aricagua", "San Antonio"] },
      { nombre: "Arzobispo Chacón", parroquias: ["Canaguá", "Capurí", "Chacantá", "El Molino", "Guaimaral", "Mucutuy", "Mucuchachí"] },
      { nombre: "Campo Elías", parroquias: ["Ejido", "Fernández Peña", "Matriz", "Montalbán", "Acequias", "Jají", "La Mesa", "San José del Sur"] },
      { nombre: "Caracciolo Parra y Olmedo", parroquias: ["Tucaní", "Florencio Ramírez"] },
      { nombre: "Cardenal Quintero", parroquias: ["Santo Domingo", "Las Piedras"] },
      { nombre: "Guaraque", parroquias: ["Guaraque", "Mesa de Quintero", "Río Negro"] },
      { nombre: "Julio César Salas", parroquias: ["Arapuey", "Palmira"] },
      { nombre: "Justo Briceño", parroquias: ["Torondoy", "San Cristóbal de Torondoy"] },
      { nombre: "Libertador", parroquias: ["Mérida", "Sagrario", "El Llano", "Juan Rodríguez Suárez", "Jacinto Plaza", "Domingo Peña", "Gonzalo Picón Febres", "Milla", "Osuna Rodríguez", "Lasso de la Vega", "Mariano Picón Salas", "Arias", "Caracciolo Parra Pérez", "Antonio Spinetti Dini", "Morao"] },
      { nombre: "Miranda", parroquias: ["Timotes", "Andrés Eloy Blanco", "La Venta", "Piñango"] },
      { nombre: "Obispo Ramos de Lora", parroquias: ["Santa Elena de Arenales", "Eloy Paredes", "San Rafael de Alcázar"] },
      { nombre: "Padre Noguera", parroquias: ["Santa María de Caparo"] },
      { nombre: "Pueblo Llano", parroquias: ["Pueblo Llano"] },
      { nombre: "Rangel", parroquias: ["Mucuchíes", "Cacute", "La Toma", "Mucurubá", "San Rafael"] },
      { nombre: "Rivas Dávila", parroquias: ["Bailadores", "Gerónimo Maldonado"] },
      { nombre: "Santos Marquina", parroquias: ["Tabay"] },
      { nombre: "Sucre", parroquias: ["Lagunillas", "Chiguará", "Estánques", "La Trampa", "Pueblo Nuevo del Sur", "San Juan"] },
      { nombre: "Tovar", parroquias: ["Tovar", "El Amparo", "San Francisco", "El Llano"] },
      { nombre: "Tulio Febres Cordero", parroquias: ["Nueva Bolivia", "Independencia", "María de la Concepción Palacios Blanco", "Santa Apolonia"] },
      { nombre: "Zea", parroquias: ["Zea", "Caño El Tigre"] }
    ]
  },
  {
    estado: "Miranda",
    municipios: [
      { nombre: "Acevedo", parroquias: ["Caucagua", "Aragüita", "Capaya", "El Café", "Marizapa", "Panaquire", "Ribas", "Yaguapita"] },
      { nombre: "Andrés Bello", parroquias: ["San José de Barlovento", "Cumbo"] },
      { nombre: "Baruta", parroquias: ["El Cafetal", "Las Minas de Baruta", "Nuestra Señora del Rosario de Baruta"] },
      { nombre: "Brión", parroquias: ["Higuerote", "Curiepe", "Tacarigua de Brión"] },
      { nombre: "Buroz", parroquias: ["Mamporal"] },
      { nombre: "Carrizal", parroquias: ["Carrizal"] },
      { nombre: "Chacao", parroquias: ["Chacao"] },
      { nombre: "Cristóbal Rojas", parroquias: ["Charallave", "Las Brisas"] },
      { nombre: "El Hatillo", parroquias: ["El Hatillo"] },
      { nombre: "Guaicaipuro", parroquias: ["Los Teques", "Altagracia de la Montaña", "Cecilio Acosta", "El Jarillo", "Paracotos", "San Pedro", "Tácata"] },
      { nombre: "Independencia", parroquias: ["Santa Teresa del Tuy", "El Cartanal"] },
      { nombre: "Lander", parroquias: ["Ocumare del Tuy", "La Democracia", "Santa Bárbara"] },
      { nombre: "Los Salias", parroquias: ["San Antonio de los Altos"] },
      { nombre: "Páez", parroquias: ["Río Chico", "El Guapo", "Paparo", "San Fernando del Guapo", "Tacarigua de la Laguna"] },
      { nombre: "Paz Castillo", parroquias: ["Santa Lucía", "El Rosario"] },
      { nombre: "Pedro Gual", parroquias: ["Cúpira", "Machurucuto"] },
      { nombre: "Plaza", parroquias: ["Guarenas"] },
      { nombre: "Simón Bolívar", parroquias: ["San Francisco de Yare", "San Antonio de Yare"] },
      { nombre: "Sucre", parroquias: ["Petare", "Caucagüita", "Fila de Mariches", "La Dolorita", "Leoncio Martínez"] },
      { nombre: "Urdaneta", parroquias: ["Cúa", "Nueva Cúa"] },
      { nombre: "Zamora", parroquias: ["Guatire", "Bolívar"] }
    ]
  },
  {
    estado: "Monagas",
    municipios: [
      { nombre: "Acosta", parroquias: ["San Antonio de Capayacuar", "San Francisco"] },
      { nombre: "Aguasay", parroquias: ["Aguasay"] },
      { nombre: "Bolívar", parroquias: ["Caripito"] },
      { nombre: "Caripe", parroquias: ["Caripe", "El Guácharo", "La Guanota", "Sabana de Piedra", "San Agustín", "Teresén"] },
      { nombre: "Cedeño", parroquias: ["Caicara", "Areo", "San Félix de Cantalicio", "Viento Fresco"] },
      { nombre: "Ezequiel Zamora", parroquias: ["Punta de Mata", "El Tejero"] },
      { nombre: "Libertador", parroquias: ["Temblador", "Chaguaramas", "Las Alhuacas", "Tabasca"] },
      { nombre: "Maturín", parroquias: ["Maturín", "Alto de los Godos", "Boquerón", "El Corozo", "El Furrial", "Jusepín", "La Pica", "San Simón", "Santa Cruz", "Las Cocuizas"] },
      { nombre: "Piar", parroquias: ["Aragua de Maturín", "Aparicio", "Chaguaramal", "El Pinto", "Guanaguana", "La Toscana", "Taguaya"] },
      { nombre: "Punceres", parroquias: ["Quiriquire", "Cachipo"] },
      { nombre: "Santa Bárbara", parroquias: ["Santa Bárbara"] },
      { nombre: "Sotillo", parroquias: ["Barrancas", "Los Barrancos de Fajardo"] },
      { nombre: "Uracoa", parroquias: ["Uracoa"] }
    ]
  },
  {
    estado: "Nueva Esparta",
    municipios: [
      { nombre: "Antolín del Campo", parroquias: ["La Plaza de Paraguachí"] },
      { nombre: "Arismendi", parroquias: ["La Asunción"] },
      { nombre: "Díaz", parroquias: ["San Juan Bautista", "Zabala"] },
      { nombre: "García", parroquias: ["El Valle del Espíritu Santo", "Francisco Fajardo"] },
      { nombre: "Gómez", parroquias: ["Santa Ana", "Bolívar", "Guevara", "Matasiete", "Sucre"] },
      { nombre: "Maneiro", parroquias: ["Pampatar", "Aguirre"] },
      { nombre: "Marcano", parroquias: ["Juan Griego", "Adrián"] },
      { nombre: "Mariño", parroquias: ["Porlamar"] },
      { nombre: "Península de Macanao", parroquias: ["Boca de Río", "San Francisco de Macanao"] },
      { nombre: "Tubores", parroquias: ["Punta de Piedras", "Los Barales"] },
      { nombre: "Villalba", parroquias: ["San Pedro de Coche", "Vicente Fuentes"] }
    ]
  },
  {
    estado: "Portuguesa",
    municipios: [
      { nombre: "Agua Blanca", parroquias: ["Agua Blanca"] },
      { nombre: "Araure", parroquias: ["Araure", "Río Acarigua"] },
      { nombre: "Esteller", parroquias: ["Píritu", "Uveral"] },
      { nombre: "Guanare", parroquias: ["Guanare", "Córdoba", "San José de la Montaña", "San Juan de Guanaguanare", "Virgen de Coromoto"] },
      { nombre: "Guanarito", parroquias: ["Guanarito", "Trinidad de la Capilla", "Divina Pastora"] },
      { nombre: "Monseñor José Vicente de Unda", parroquias: ["Paraíso de Chabasquén", "Peña Blanca"] },
      { nombre: "Ospino", parroquias: ["Ospino", "Aparición", "La Estación"] },
      { nombre: "Páez", parroquias: ["Acarigua", "Payara", "Pimpinela", "Ramón Peraza"] },
      { nombre: "Papelón", parroquias: ["Papelón", "Caño Delgadito"] },
      { nombre: "San Genaro de Boconoíto", parroquias: ["Boconoíto", "Antolín Tovar Anqués"] },
      { nombre: "San Rafael de Onoto", parroquias: ["San Rafael de Onoto", "Santa Fe", "Thermo Morles"] },
      { nombre: "Santa Rosalía", parroquias: ["El Playón", "Florida"] },
      { nombre: "Sucre", parroquias: ["Biscucuy", "Concepción", "San José de Saguaz", "San Rafael de Palo Alzado", "Uvías"] },
      { nombre: "Turén", parroquias: ["Villa Bruzual", "Canelones", "Santa Cruz", "San Isidro Labrador"] }
    ]
  },
  {
    estado: "Sucre",
    municipios: [
      { nombre: "Andrés Eloy Blanco", parroquias: ["Casanay", "Mariño", "Rómulo Gallegos", "San José de Aerocuar", "Tavera Acosta"] },
      { nombre: "Andrés Mata", parroquias: ["San José de Areocuar", "Tavera Acosta"] },
      { nombre: "Arismendi", parroquias: ["Río Caribe", "Antonio José de Sucre", "El Morro de Puerto Santo", "Puerto Santo", "San Juan de las Galdonas"] },
      { nombre: "Benítez", parroquias: ["El Pilar", "El Rincón", "General Francisco Antonio Vásquez", "Guaraúnos", "Tunapuicito", "Unión"] },
      { nombre: "Bermúdez", parroquias: ["Carúpano", "Santa Catalina", "Santa Rosa", "Santa Teresa", "Bolívar", "Macarapana"] },
      { nombre: "Bolívar", parroquias: ["Marigüitar"] },
      { nombre: "Cajigal", parroquias: ["Yaguaraparo", "El Paují", "Libertad"] },
      { nombre: "Cruz Salmerón Acosta", parroquias: ["Araya", "Chacopata", "Manicuare"] },
      { nombre: "Libertador", parroquias: ["Tunapuy", "Campo Elías", "Sorocual"] },
      { nombre: "Mariño", parroquias: ["Irapa", "Campo Claro", "Marabal", "San Antonio de Irapa", "Soro"] },
      { nombre: "Mejía", parroquias: ["San Antonio del Golfo"] },
      { nombre: "Montes", parroquias: ["Cumanacoa", "Arenas", "Aricagua", "Cocollar", "San Fernando", "San Lorenzo"] },
      { nombre: "Ribero", parroquias: ["Cariaco", "Catuaro", "Rendón", "Santa Cruz", "Santa María"] },
      { nombre: "Sucre", parroquias: ["Cumaná", "Altagracia", "Ayacucho", "Gran Mariscal", "Raúl Leoni", "Santa Inés", "Valentín Valiente"] },
      { nombre: "Valdez", parroquias: ["Güiria", "Bideau", "Cristóbal Colón", "Punta de Piedras"] }
    ]
  },
  {
    estado: "Táchira",
    municipios: [
      { nombre: "Andrés Bello", parroquias: ["Cordero"] },
      { nombre: "Antonio Rómulo Costa", parroquias: ["Las Mesas"] },
      { nombre: "Ayacucho", parroquias: ["Colón", "Rivas Berti", "San Pedro del Río"] },
      { nombre: "Bolívar", parroquias: ["San Antonio del Táchira", "Isaías Medina Angarita", "Juan Vicente Gómez", "Palo Gordo"] },
      { nombre: "Cárdenas", parroquias: ["Táriba", "Amenodoro Rangel Lamús", "La Florida"] },
      { nombre: "Córdoba", parroquias: ["Santa Ana"] },
      { nombre: "Fernández Feo", parroquias: ["El Piñal", "Alberto Adriani", "Santo Domingo"] },
      { nombre: "Francisco de Miranda", parroquias: ["San José de Bolívar"] },
      { nombre: "García de Hevia", parroquias: ["La Fría", "Boca de Grita", "José Antonio Páez"] },
      { nombre: "Guásimos", parroquias: ["Palmira"] },
      { nombre: "Independencia", parroquias: ["Capacho Nuevo", "Juan Germán Roscio", "Román Cárdenas"] },
      { nombre: "Jáuregui", parroquias: ["La Grita", "Emilio Constantino Guerrero", "Monseñor Miguel Antonio Salas"] },
      { nombre: "José María Vargas", parroquias: ["El Cobre"] },
      { nombre: "Junín", parroquias: ["Rubio", "Bramón", "La Petrólea", "Quinimarí"] },
      { nombre: "Libertad", parroquias: ["Capacho Viejo", "Cipriano Castro", "Manuel Felipe Rugeles"] },
      { nombre: "Libertador", parroquias: ["Abejales", "Doradas", "Emeterio Ochoa", "San Joaquín de Navay"] },
      { nombre: "Lobatera", parroquias: ["Lobatera", "Constitución"] },
      { nombre: "Michelena", parroquias: ["Michelena"] },
      { nombre: "Panamericano", parroquias: ["Coloncito", "La Palmita"] },
      { nombre: "Pedro María Ureña", parroquias: ["Ureña", "Nueva Arcadia"] },
      { nombre: "Rafael Urdaneta", parroquias: ["Delicias"] },
      { nombre: "Samuel Darío Maldonado", parroquias: ["La Tendida", "Boconó", "Hernández"] },
      { nombre: "San Cristóbal", parroquias: ["La Concordia", "Pedro María Morantes", "San Juan Bautista", "San Sebastián", "Francisco Romero Lobo"] },
      { nombre: "Seboruco", parroquias: ["Seboruco"] },
      { nombre: "Simón Rodríguez", parroquias: ["San Rafael del Piñal"] },
      { nombre: "Sucre", parroquias: ["Queniquea", "Eleazar López Contreras", "San Pablo"] },
      { nombre: "Torbes", parroquias: ["San Josecito"] },
      { nombre: "Uribante", parroquias: ["Pregonero", "Cárdenas", "Juan Pablo Peñalosa", "Potrerito"] }
    ]
  },
  {
    estado: "Trujillo",
    municipios: [
      { nombre: "Andrés Bello", parroquias: ["Santa Isabel", "Araguaney", "El Jagüito", "La Esperanza"] },
      { nombre: "Boconó", parroquias: ["Boconó", "Ayacucho", "Burbusay", "El Carmen", "General Ribas", "Guaramacal", "Mosquey", "Rafael Rangel", "San José", "San Miguel", "Timotes", "Tostós"] },
      { nombre: "Bolívar", parroquias: ["Sabana Grande", "Cheregüé", "Granados"] },
      { nombre: "Candelaria", parroquias: ["Chejendé", "Arnoldo Gabaldón", "Bolivia", "Carrillo", "Cegarra", "Manuel Salvador Ulloa", "San José"] },
      { nombre: "Carache", parroquias: ["Carache", "Cuicas", "La Concepción", "Panamericana", "Santa Cruz"] },
      { nombre: "Escuque", parroquias: ["Escuque", "La Unión", "Sabana Libre", "Santa Rita"] },
      { nombre: "José Felipe Márquez Cañizales", parroquias: ["El Paradero", "Antonio José de Sucre", "El Socorro"] },
      { nombre: "Juan Vicente Campo Elías", parroquias: ["Campo Elías", "Arnoldo Gabaldón"] },
      { nombre: "La Ceiba", parroquias: ["Santa Apolonia", "El Progreso", "La Ceiba", "Tres de Febrero"] },
      { nombre: "Miranda", parroquias: ["El Dividive", "Agua Caliente", "Agua Santa", "El Cenizo", "Valerita"] },
      { nombre: "Monte Carmelo", parroquias: ["Santa María del Horcón", "Monte Carmelo", "Buena Vista"] },
      { nombre: "Motatán", parroquias: ["Motatán", "El Baño", "Jalisco"] },
      { nombre: "Pampán", parroquias: ["Pampán", "Flor de Patria", "La Paz", "Santa Ana"] },
      { nombre: "Pampanito", parroquias: ["Pampanito", "La Concepción", "Pampanito II"] },
      { nombre: "Rafael Rangel", parroquias: ["Betijoque", "José Gregorio Hernández", "La Pueblita", "Los Cedros"] },
      { nombre: "San Rafael de Carvajal", parroquias: ["Carvajal", "Antonio Nicolás Briceño", "Campo Alegre", "José Leonardo Suárez"] },
      { nombre: "Sucre", parroquias: ["Sabana de Mendoza", "Junín", "Valmore Rodríguez"] },
      { nombre: "Trujillo", parroquias: ["Matriz", "Chiquinquirá", "Cristóbal Mendoza", "Cruz Carrillo", "Monseñor Carrillo", "Tres Esquinas"] },
      { nombre: "Urdaneta", parroquias: ["La Quebrada", "Cabimbú", "Jajó", "La Mesa de Esnujaque", "Santiago", "Tuñame"] },
      { nombre: "Valera", parroquias: ["Mercedes Díaz", "Juan Ignacio Montilla", "La Beatriz", "La Puerta", "Mendoza", "San Luis"] }
    ]
  },
  {
    estado: "Yaracuy",
    municipios: [
      { nombre: "Arístides Bastidas", parroquias: ["San Pablo"] },
      { nombre: "Bolívar", parroquias: ["Aroa"] },
      { nombre: "Bruzual", parroquias: ["Chivacoa", "Campo Elías"] },
      { nombre: "Cocorote", parroquias: ["Cocorote"] },
      { nombre: "Independencia", parroquias: ["Independencia"] },
      { nombre: "José Antonio Páez", parroquias: ["Sabana de Parra"] },
      { nombre: "La Trinidad", parroquias: ["Boraure"] },
      { nombre: "Manuel Monge", parroquias: ["Yumare"] },
      { nombre: "Nirgua", parroquias: ["Nirgua", "Salom", "Temerla"] },
      { nombre: "Peña", parroquias: ["Yaritagua", "San Andrés"] },
      { nombre: "San Felipe", parroquias: ["San Felipe", "Albarico", "San Javier"] },
      { nombre: "Sucre", parroquias: ["Guama"] },
      { nombre: "Urachiche", parroquias: ["Urachiche"] },
      { nombre: "Veroes", parroquias: ["Farriar", "El Guayabo"] }
    ]
  },
  {
    estado: "Zulia",
    municipios: [
      { nombre: "Almirante Padilla", parroquias: ["Isla de Toas", "Monagas"] },
      { nombre: "Baralt", parroquias: ["San Timoteo", "General Urdaneta", "Libertador", "Marcelino Briceño", "Manuel Guanipa Matos", "Pueblo Nuevo"] },
      { nombre: "Cabimas", parroquias: ["Ambrosio", "Carmen Herrera", "La Rosa", "Rómulo Betancourt", "San Benito", "Arístides Calvani", "Germán Ríos Linares", "Jorge Hernández", "Punta Gorda"] },
      { nombre: "Catatumbo", parroquias: ["Encontrados", "Udón Pérez"] },
      { nombre: "Colón", parroquias: ["San Carlos del Zulia", "Moralito", "Santa Bárbara", "Santa Cruz del Zulia", "Urribarrí"] },
      { nombre: "Francisco Javier Pulgar", parroquias: ["Pueblo Nuevo / El Chivo", "Agustín Codazzi", "Carlos Quevedo", "Francisco Javier Pulgar"] },
      { nombre: "Jesús Enrique Lossada", parroquias: ["La Concepción", "José Ramón Yépez", "Mariano Parra León", "San José"] },
      { nombre: "Jesús María Semprún", parroquias: ["Casigua El Cubo", "Barí"] },
      { nombre: "La Cañada de Urdaneta", parroquias: ["Concepción", "Andrés Bello", "Chiquinquirá", "El Carmelo", "Potreritos"] },
      { nombre: "Lagunillas", parroquias: ["Ciudad Ojeda", "Alonso de Ojeda", "Campo Lara", "Eleazar López Contreras", "Libertad", "Venezuela"] },
      { nombre: "Macaire", parroquias: ["Machiques", "Bartolomé de las Casas", "Libertad", "Río Negro"] },
      { nombre: "Mara", parroquias: ["San Rafael de El Moján", "La Sierrita", "Las Parcelas", "Luis de Vicente", "Mon Marcos Tulio Badillo", "Ricaurte", "Tamare"] },
      { nombre: "Maracaibo", parroquias: ["Antonio Borjas Romero", "Bolívar", "Cacique Mara", "Carracciolo Parra Pérez", "Cecilio Acosta", "Cristo de Aranza", "Coquivacoa", "Chiquinquirá", "Francisco Eugenio Bustamante", "Idelfonso Vásquez", "Juana de Ávila", "Luis Hurtado Higuera", "Manuel Dagnino", "Olegario Villalobos", "Raúl Leoni", "Santa Lucía", "Venancio Pulgar", "San Isidro"] },
      { nombre: "Miranda", parroquias: ["Los Puertos de Altagracia", "Altagracia", "Ana María Campos", "Faría", "San Antonio", "San José"] },
      { nombre: "Rosario de Perijá", parroquias: ["La Villa del Rosario", "Donaldo García", "El Rosario", "Sixto Zambrano"] },
      { nombre: "San Francisco", parroquias: ["San Francisco", "Domitila Flores", "El Bajo", "Francisco Ochoa", "José Domingo Rus", "Los Cortijos", "Marcial Hernández"] },
      { nombre: "Santa Rita", parroquias: ["Santa Rita", "El Mene", "José Cenobio Urribarrí", "Pedro Lucas Urribarrí"] },
      { nombre: "Simón Bolívar", parroquias: ["Tía Juana", "Manuel Manrique", "Rafael María Baralt"] },
      { nombre: "Sucre", parroquias: ["Bobures", "Gibraltar", "Heras", "Monseñor Arturo Celestino Álvarez", "Rómulo Gallegos", "El Batey"] },
      { nombre: "Valmore Rodríguez", parroquias: ["Bachaquero", "La Victoria", "Rafael Urdaneta"] }
    ]
  },
  {
    estado: "Dependencias Federales",
    municipios: [
      { nombre: "Archipiélago Los Roques", parroquias: ["Gran Roque"] },
      { nombre: "Isla La Tortuga", parroquias: ["La Tortuga"] },
      { nombre: "Isla La Blanquilla", parroquias: ["La Blanquilla"] },
      { nombre: "Isla de Aves", parroquias: ["Isla de Aves"] },
      { nombre: "Archipiélago Las Aves", parroquias: ["Las Aves"] },
      { nombre: "Isla La Orchila", parroquias: ["La Orchila"] },
      { nombre: "Isla Los Testigos", parroquias: ["Los Testigos"] },
      { nombre: "Isla Los Frailes", parroquias: ["Los Frailes"] },
      { nombre: "Isla Patos", parroquias: ["Isla Patos"] },
      { nombre: "Archipiélago Los Monjes", parroquias: ["Los Monjes"] }
    ]
  }
];

const CATALOGO_BIOLOGICOS_PAI = [
  { nombre: "BCG (Tuberculosis)", jeringaAsociada: "Jeringa 0.1 ml (Intradérmica)" },
  { nombre: "Hepatitis B Pediátrica", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Rotavirus", jeringaAsociada: "N/A (Oral)" },
  { nombre: "Pentavalente (DPT+HB+Hib)", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Polio IPV (Inyectable)", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Polio OPV (Oral / Sabin)", jeringaAsociada: "N/A (Oral)" },
  { nombre: "Neumococo Conjugado", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "SR / SRP (Triples / Doble Viral)", jeringaAsociada: "Jeringa 0.5 ml + 5 ml (Reconstitución)" },
  { nombre: "Fiebre Amarilla", jeringaAsociada: "Jeringa 0.5 ml + 5 ml (Reconstitución)" },
  { nombre: "Refuerzo Pentavalente", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Refuerzo Polio IPV", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Toxoide Tetánico Diftérico (Td)", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Toxoide Tetánico (TT)", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Hepatitis B Adulto", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "VPH (Papiloma Humano)", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "Influenza Estacional", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" },
  { nombre: "COVID-19 (Refuerzo)", jeringaAsociada: "Jeringa 0.5 ml (Retráctil)" }
];

const BIOLOGICOS_PAI = CATALOGO_BIOLOGICOS_PAI.map((item) => item.nombre);

const PERFILES_VACUNACION: Record<string, string[]> = {
  "Recién Nacido (0-28 días)": ["BCG (Tuberculosis)", "Hepatitis B Pediátrica"],
  "Lactante (< 1 Año)": ["Rotavirus", "Pentavalente (DPT+HB+Hib)", "Polio IPV (Inyectable)", "Polio OPV (Oral / Sabin)", "Neumococo Conjugado"],
  "Niños (1 a 5 Años)": ["SR / SRP (Triples / Doble Viral)", "Fiebre Amarilla", "Refuerzo Pentavalente", "Refuerzo Polio IPV"],
  "Gestante / Embarazada": ["Toxoide Tetánico Diftérico (Td)", "Influenza Estacional", "COVID-19 (Refuerzo)"],
  "Adolescente / Adulto": ["Toxoide Tetánico Diftérico (Td)", "Toxoide Tetánico (TT)", "Hepatitis B Adulto", "VPH (Papiloma Humano)", "Influenza Estacional", "COVID-19 (Refuerzo)"]
};

const TIPOS_ACTIVIDAD_PAI = ["Intramural", "Extramural", "Casa a Casa", "Luciérnagas y Cocuyos", "Fiesta Nacional de Inmunización"];

export default function Home() {
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [cedula, setCedula] = useState("");
  const [claveRegistro, setClaveRegistro] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);

  const [estadoUser, setEstadoUser] = useState("Anzoátegui");
  const [municipioUser, setMunicipioUser] = useState("Carvajal");
  const [parroquiaUser, setParroquiaUser] = useState("Valle Guanape");
  const [rol, setRol] = useState<"VAC" | "COOR" | "REGIONAL">("VAC");

  const [loginCedula, setLoginCedula] = useState("");
  const [loginClave, setLoginClave] = useState("");
  const [errorMensaje, setErrorMensaje] = useState("");
  const [usuarioAutenticado, setUsuarioAutenticado] = useState<any>(null);

  const [pestañaActiva, setPestañaActiva] = useState<string>("registro");

  // Edición de Perfil de Funcionario Completa
  const [editandoPerfil, setEditandoPerfil] = useState(false);
  const [editNombre, setEditNombre] = useState("");
  const [editTelefono, setEditTelefono] = useState("");
  const [editEstado, setEditEstado] = useState("Anzoátegui");
  const [editMunicipio, setEditMunicipio] = useState("Carvajal");
  const [editParroquia, setEditParroquia] = useState("Valle Guanape");
  const [editClave, setEditClave] = useState("");

  // Formulario Vacunación Terreno
  const [esNuevoPaciente, setEsNuevoPaciente] = useState(false);
  const [representanteCedula, setRepresentanteCedula] = useState("");
  const [representanteNombre, setRepresentanteNombre] = useState("");
  const [numeroHijoCorrelativo, setNumeroHijoCorrelativo] = useState("01");

  const [busquedaDoc, setBusquedaDoc] = useState("");
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteSexo, setPacienteSexo] = useState<"Masculino" | "Femenino">("Masculino");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [esEmbarazada, setEsEmbarazada] = useState(false);

  const [estadoPaciente, setEstadoPaciente] = useState("Anzoátegui");
  const [municipioPaciente, setMunicipioPaciente] = useState("Carvajal");
  const [parroquiaPaciente, setParroquiaPaciente] = useState("Valle Guanape");
  const [sectorManual, setSectorManual] = useState("");
  const [calle, setCalle] = useState("");
  const [puntoReferencia, setPuntoReferencia] = useState("");
  const [tipoActividad, setTipoActividad] = useState("Casa a Casa");

  const [grupoEtarioCalculado, setGrupoEtarioCalculado] = useState<string>("Lactante (< 1 Año)");
  const [vacunasDisponibles, setVacunasDisponibles] = useState<string[]>([]);
  const [vacunaSeleccionada, setVacunaSeleccionada] = useState<string>("");
  const [dosis, setDosis] = useState("1ra Dosis");

  const [loteVacuna, setLoteVacuna] = useState("");
  const [vencimientoVacuna, setVencimientoVacuna] = useState("");

  const [esquemaAtrasadoAlerta, setEsquemaAtrasadoAlerta] = useState<string>("");
  const [proximaCita, setProximaCita] = useState("");

  const [tieneEsavi, setTieneEsavi] = useState(false);
  const [sintomasEsavi, setSintomasEsavi] = useState("");
  const [severidadEsavi, setSeveridadEsavi] = useState<"Leve" | "Moderado" | "Grave">("Leve");

  const [loteInventarioVacunas, setLoteInventarioVacunas] = useState<any[]>([]);
  const [vacunaCargarInv, setVacunaCargarInv] = useState(CATALOGO_BIOLOGICOS_PAI[0].nombre);
  const [loteCargar, setLoteCargar] = useState("");
  const [vencCargar, setVencCargar] = useState("");
  const [cantCargar, setCantCargar] = useState<number>(50);
  const [mensajeInvExito, setMensajeInvExito] = useState("");

  const [equiposFrioASIC, setEquiposFrioASIC] = useState<any[]>([
    { id: "REF-V-01", tipo: "Refrigerador Vertical", modelo: "Dometic TCX-200", serial: "REF-V-01", estado: "Operativo (+4°C)" },
    { id: "CAV-04", tipo: "Cava Térmica", modelo: "Coleman 50QT", serial: "CAV-04", estado: "Operativo con 4 P. Fríos" }
  ]);
  const [nuevoTipoFrio, setNuevoTipoFrio] = useState("Refrigerador Vertical");
  const [nuevoModeloFrio, setNuevoModeloFrio] = useState("");
  const [nuevoSerialFrio, setNuevoSerialFrio] = useState("");

  const [stockDescartables, setStockDescartables] = useState({
    jeringas01ml: 300,
    jeringas05ml: 1000,
    jeringas5ml: 400,
    cajasBioseguridad: 25
  });

  const [fotoPacienteUrl, setFotoPacienteUrl] = useState<string>("");
  const [esquemaExistente, setEsquemaExistente] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado y guardado del formulario estructurado del Libro Físico Histórico
  const [libroForm, setLibroForm] = useState({
    nombres: "",
    apellidos: "",
    tipoCedula: "propia",
    cedula: "",
    sufijoFamiliar: "-01",
    fechaNacimiento: "",
    biologico: "Pentavalente (DPT+HB+Hib)",
    numeroDosis: "1",
    lote: "",
    fechaColocacion: "",
    condicionEsquema: "Al dia",
  });
  const [guardandoLibro, setGuardandoLibro] = useState(false);
  const [mensajeLibro, setMensajeLibro] = useState<{ tipo: "ok" | "error"; texto: string } | null>(null);

  const [registrosRealizados, setRegistrosRealizados] = useState<any[]>([]);
  const [mensajeExito, setMensajeExito] = useState(false);
  const [listaPersonal, setListaPersonal] = useState<any[]>([]);
  const [estadoSyncCloud, setEstadoSyncCloud] = useState<"conectado" | "sincronizando" | "local">("sincronizando");

  // Tarjeta de Vacunación para imprimir / extraer en PDF
  const [tarjetaPacienteDoc, setTarjetaPacienteDoc] = useState<string | null>(null);

  // Helpers de sincronización con Supabase
  const syncFuncionarioCloud = async (funcObj: any) => {
    try {
      await supabase.from("pai_funcionarios").upsert({
        id: String(funcObj.id || funcObj.codigo || funcObj.cedula),
        cedula: funcObj.cedula,
        nombre: funcObj.nombre,
        telefono: funcObj.telefono || "",
        rol: funcObj.rol,
        estado: funcObj.estado || "",
        municipio: funcObj.municipio || "",
        parroquia: funcObj.parroquia || "",
        password_hash: funcObj.clave || "",
        payload: funcObj
      }, { onConflict: "cedula" });
    } catch (e) {
      console.error("Error sync funcionario:", e);
    }
  };

  const syncRegistroVacunaCloud = async (regObj: any) => {
    try {
      await supabase.from("pacientes").upsert({
        id: `PAC-${regObj.pacienteDocumento}`,
        documento_identidad: regObj.pacienteDocumento,
        tipo_documento: regObj.esNuevoPaciente ? "CORRELATIVO" : "V",
        nombre_completo: regObj.pacienteNombre,
        fecha_nacimiento: regObj.fechaNacimiento || "",
        sexo: regObj.pacienteSexo || "",
        representante_nombre: regObj.representante?.nombre || "",
        representante_cedula: regObj.representante?.cedula || "",
        telefono: "",
        estado: regObj.direccion?.estado || "",
        municipio: regObj.direccion?.municipio || "",
        parroquia: regObj.direccion?.parroquia || "",
        payload: {
          pacienteNombre: regObj.pacienteNombre,
          pacienteDocumento: regObj.pacienteDocumento,
          pacienteSexo: regObj.pacienteSexo,
          fechaNacimiento: regObj.fechaNacimiento,
          representante: regObj.representante,
          fotoPacienteUrl: regObj.fotoPacienteUrl
        }
      }, { onConflict: "id" });

      await supabase.from("vacunas_aplicadas").upsert({
        id: String(regObj.id),
        paciente_id: `PAC-${regObj.pacienteDocumento}`,
        paciente_documento: regObj.pacienteDocumento,
        paciente_nombre: regObj.pacienteNombre,
        biologico: regObj.vacuna,
        dosis: regObj.dosis,
        lote: regObj.lote || "",
        fecha_aplicacion: regObj.fecha,
        establecimiento: `${regObj.direccion?.parroquia || ""} - ${regObj.direccion?.sector || ""}`,
        vacunador_cedula: regObj.vacunadorCedula || "",
        vacunador_nombre: regObj.vacunadorNombre || "",
        observaciones_esavi: regObj.tieneEsavi ? `${regObj.esaviDetalle?.severidad}: ${regObj.esaviDetalle?.sintomas}` : "",
        payload: regObj
      }, { onConflict: "id" });
    } catch (e) {
      console.error("Error sync vacuna:", e);
    }
  };

  const syncLoteCloud = async (loteObj: any) => {
    try {
      const idLote = `LOTE-${loteObj.vacuna}-${loteObj.lote}`.replace(/\s+/g, "_");
      await supabase.from("inventarios_biologicos_asic").upsert({
        id: idLote,
        categoria: "biologico",
        nombre: loteObj.vacuna,
        lote: loteObj.lote,
        fecha_vencimiento: loteObj.vencimiento || "",
        cantidad_disponible: Number(loteObj.cantidad || 0),
        estado_lote: Number(loteObj.cantidad || 0) > 0 ? "activo" : "agotado",
        payload: loteObj,
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });
    } catch (e) {
      console.error("Error sync lote:", e);
    }
  };

  const syncDescartablesCloud = async (descObj: typeof stockDescartables) => {
    try {
      const items = [
        { id: "DESC-J01", nombre: "Jeringas 0.1 ml (BCG)", cantidad: descObj.jeringas01ml },
        { id: "DESC-J05", nombre: "Jeringas 0.5 ml (Retráctiles)", cantidad: descObj.jeringas05ml },
        { id: "DESC-J5", nombre: "Jeringas 5 ml (Reconstitución)", cantidad: descObj.jeringas5ml },
        { id: "DESC-BIO", nombre: "Cajas de Bioseguridad", cantidad: descObj.cajasBioseguridad }
      ];
      for (const it of items) {
        await supabase.from("inventarios_biologicos_asic").upsert({
          id: it.id,
          categoria: "jeringa",
          nombre: it.nombre,
          lote: "DESCARTABLE",
          fecha_vencimiento: "2028-12-31",
          cantidad_disponible: Number(it.cantidad),
          estado_lote: "activo",
          payload: descObj,
          updated_at: new Date().toISOString()
        }, { onConflict: "id" });
      }
    } catch (e) {
      console.error("Error sync descartables:", e);
    }
  };

  const syncEquipoFrioCloud = async (eqObj: any) => {
    try {
      const idEq = `EQ-${eqObj.serial || eqObj.id || Date.now()}`;
      await supabase.from("equipos_cadena_frio").upsert({
        id: idEq,
        codigo_equipo: eqObj.serial || idEq,
        tipo_equipo: eqObj.tipo,
        marca_modelo: eqObj.modelo,
        ubicacion_establecimiento: eqObj.ubicacion || "ASIC",
        temperatura_actual: 4,
        estado_operativo: eqObj.estado || "Operativo",
        payload: eqObj,
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });
    } catch (e) {
      console.error("Error sync equipo frio:", e);
    }
  };

  useEffect(() => {
    const personal = localStorage.getItem("pai_lista_personal");
    if (personal) { try { setListaPersonal(JSON.parse(personal)); } catch (e) {} }

    const registros = localStorage.getItem("pai_registros_vacunacion");
    if (registros) { try { setRegistrosRealizados(JSON.parse(registros)); } catch (e) {} }

    const invLotes = localStorage.getItem("pai_lotes_vacunas");
    if (invLotes) {
      try { setLoteInventarioVacunas(JSON.parse(invLotes)); } catch (e) {}
    } else {
      const inicial = [
        { vacuna: "Pentavalente (DPT+HB+Hib)", lote: "LOT-PEN-2026-A", vencimiento: "2027-12-31", cantidad: 150 },
        { vacuna: "BCG (Tuberculosis)", lote: "LOT-BCG-2026-B", vencimiento: "2027-06-30", cantidad: 100 }
      ];
      setLoteInventarioVacunas(inicial);
      localStorage.setItem("pai_lotes_vacunas", JSON.stringify(inicial));
    }

    const cargarDesdeSupabase = async () => {
      setEstadoSyncCloud("sincronizando");
      try {
        const [resFunc, resVac, resInv, resFrio] = await Promise.all([
          supabase.from("pai_funcionarios").select("*"),
          supabase.from("vacunas_aplicadas").select("*").order("created_at", { ascending: false }),
          supabase.from("inventarios_biologicos_asic").select("*"),
          supabase.from("equipos_cadena_frio").select("*")
        ]);

        if (resFunc.data && resFunc.data.length > 0) {
          const mappedFunc = resFunc.data.map((row: any) => row.payload && Object.keys(row.payload).length > 0 ? row.payload : {
            id: row.id,
            codigo: row.id,
            nombre: row.nombre,
            cedula: row.cedula,
            telefono: row.telefono,
            estado: row.estado,
            municipio: row.municipio,
            parroquia: row.parroquia,
            clave: row.password_hash,
            rol: row.rol
          });
          setListaPersonal(mappedFunc);
          localStorage.setItem("pai_lista_personal", JSON.stringify(mappedFunc));
        }

        if (resVac.data && resVac.data.length > 0) {
          const mappedVac = resVac.data.map((row: any) => row.payload && Object.keys(row.payload).length > 0 ? row.payload : {
            id: Number(row.id) || Date.now(),
            vacunadorCedula: row.vacunador_cedula,
            vacunadorNombre: row.vacunador_nombre,
            pacienteNombre: row.paciente_nombre,
            pacienteDocumento: row.paciente_documento,
            vacuna: row.biologico,
            dosis: row.dosis,
            lote: row.lote,
            fecha: row.fecha_aplicacion,
            tieneEsavi: Boolean(row.observaciones_esavi)
          });
          setRegistrosRealizados(mappedVac);
          localStorage.setItem("pai_registros_vacunacion", JSON.stringify(mappedVac));
        }

        if (resInv.data && resInv.data.length > 0) {
          const lotesCloud = resInv.data
            .filter((r: any) => r.categoria === "biologico")
            .map((r: any) => ({
              vacuna: r.nombre,
              lote: r.lote,
              vencimiento: r.fecha_vencimiento,
              cantidad: Number(r.cantidad_disponible ?? 0)
            }));
          if (lotesCloud.length > 0) {
            setLoteInventarioVacunas(lotesCloud);
            localStorage.setItem("pai_lotes_vacunas", JSON.stringify(lotesCloud));
          }

          const descRows = resInv.data.filter((r: any) => r.categoria === "jeringa");
          if (descRows.length > 0) {
            setStockDescartables((prev) => {
              const next = { ...prev };
              for (const dr of descRows) {
                if (dr.id === "DESC-J01") next.jeringas01ml = Number(dr.cantidad_disponible ?? prev.jeringas01ml);
                if (dr.id === "DESC-J05") next.jeringas05ml = Number(dr.cantidad_disponible ?? prev.jeringas05ml);
                if (dr.id === "DESC-J5") next.jeringas5ml = Number(dr.cantidad_disponible ?? prev.jeringas5ml);
                if (dr.id === "DESC-BIO") next.cajasBioseguridad = Number(dr.cantidad_disponible ?? prev.cajasBioseguridad);
              }
              return next;
            });
          }
        }

        if (resFrio.data && resFrio.data.length > 0) {
          const mappedFrio = resFrio.data.map((r: any) => r.payload && Object.keys(r.payload).length > 0 ? r.payload : {
            id: r.id,
            tipo: r.tipo_equipo,
            modelo: r.marca_modelo,
            serial: r.codigo_equipo,
            estado: r.estado_operativo
          });
          setEquiposFrioASIC(mappedFrio);
        }

        setEstadoSyncCloud("conectado");
      } catch (e) {
        console.error("Error cargando desde Supabase:", e);
        setEstadoSyncCloud("local");
      }
    };

    cargarDesdeSupabase();
  }, []);

  useEffect(() => {
    if (esNuevoPaciente && representanteCedula && fechaNacimiento) {
      const fechaNum = fechaNacimiento.replaceAll("-", "");
      const correlativoDoc = `REP-${representanteCedula}-H${numeroHijoCorrelativo}-${fechaNum.slice(-4)}`;
      setBusquedaDoc(correlativoDoc);
    }
  }, [esNuevoPaciente, representanteCedula, numeroHijoCorrelativo, fechaNacimiento]);

  useEffect(() => {
    if (!busquedaDoc.trim() || busquedaDoc.length < 4) {
      setEsquemaExistente(false);
      setFotoPacienteUrl("");
      return;
    }
    const previo = registrosRealizados.find(r => r.pacienteDocumento?.toLowerCase() === busquedaDoc.trim().toLowerCase());
    if (previo) {
      setEsquemaExistente(true);
      setPacienteNombre(previo.pacienteNombre);
      setPacienteSexo(previo.pacienteSexo);
      if (previo.fechaNacimiento) setFechaNacimiento(previo.fechaNacimiento);
      if (previo.fotoPacienteUrl) setFotoPacienteUrl(previo.fotoPacienteUrl);
      if (previo.representante) {
        setEsNuevoPaciente(true);
        setRepresentanteCedula(previo.representante.cedula || "");
        setRepresentanteNombre(previo.representante.nombre || "");
        setNumeroHijoCorrelativo(previo.representante.hijo || "01");
      }
    } else {
      setEsquemaExistente(false);
    }
  }, [busquedaDoc, registrosRealizados]);

  useEffect(() => {
    if (pacienteSexo === "Femenino" && esEmbarazada) {
      setGrupoEtarioCalculado("Gestante / Embarazada");
      const vacs = PERFILES_VACUNACION["Gestante / Embarazada"];
      setVacunasDisponibles(vacs);
      setVacunaSeleccionada(vacs[0]);
      setEsquemaAtrasadoAlerta("⚠️ Alerta: Verificar refuerzo de Td y Antigripal según trimestre gestacional.");
      return;
    }

    if (!fechaNacimiento) {
      setGrupoEtarioCalculado("Lactante (< 1 Año)");
      const vacs = PERFILES_VACUNACION["Lactante (< 1 Año)"];
      setVacunasDisponibles(vacs);
      setVacunaSeleccionada(vacs[0]);
      return;
    }

    const hoy = new Date();
    const nac = new Date(fechaNacimiento);
    const diffDias = Math.floor((hoy.getTime() - nac.getTime()) / (1000 * 3600 * 24));
    const edadAnios = hoy.getFullYear() - nac.getFullYear();

    let grupo = "Adolescente / Adulto";
    if (diffDias >= 0 && diffDias <= 28) grupo = "Recién Nacido (0-28 días)";
    else if (diffDias > 28 && edadAnios < 1) grupo = "Lactante (< 1 Año)";
    else if (edadAnios >= 1 && edadAnios <= 5) grupo = "Niños (1 a 5 Años)";

    setGrupoEtarioCalculado(grupo);
    const listaVacs = PERFILES_VACUNACION[grupo] || PERFILES_VACUNACION["Adolescente / Adulto"];
    setVacunasDisponibles(listaVacs);
    setVacunaSeleccionada(listaVacs[0] || "");

    if (edadAnios >= 1 && diffDias > 400) {
      setEsquemaAtrasadoAlerta("⚠️ ATENCIÓN: El paciente presenta retraso en refuerzos de Pentavalente / Polio o SRP.");
    } else {
      setEsquemaAtrasadoAlerta("✓ Esquema al día acorde al grupo etario.");
    }

    const proxima = new Date();
    proxima.setMonth(proxima.getMonth() + 2);
    setProximaCita(proxima.toISOString().split("T")[0]);
  }, [fechaNacimiento, esEmbarazada, pacienteSexo]);

  const handleImagenSeleccionada = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFotoPacienteUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleRegistroTrabajador = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMensaje("");
    if (!cedula.trim() || !nombre.trim() || !claveRegistro.trim() || !telefono.trim()) return;

    const correlativo = Math.floor(Math.random() * 89) + 10;
    const prefijo = municipioUser.substring(0, 3).toUpperCase();

    let codigo = `VAC-${prefijo}-${correlativo}`;
    let rolTexto = "Vacunador de Campo";
    if (rol === "COOR") {
      codigo = `COOR-${prefijo}-01`;
      rolTexto = "Coordinador Municipal / ASIC";
    } else if (rol === "REGIONAL") {
      codigo = `REG-${estadoUser.substring(0, 3).toUpperCase()}-01`;
      rolTexto = "Coordinador Regional PAI";
    }

    const nuevo = {
      id: Date.now(), codigo, nombre: nombre.trim(), cedula: cedula.trim(),
      telefono: telefono.trim(), estado: estadoUser, municipio: municipioUser,
      parroquia: parroquiaUser, clave: claveRegistro.trim(), rol: rolTexto
    };

    const actualizada = [nuevo, ...listaPersonal];
    setListaPersonal(actualizada);
    localStorage.setItem("pai_lista_personal", JSON.stringify(actualizada));
    await syncFuncionarioCloud(nuevo);

    setUsuarioAutenticado({
      cedula: cedula.trim(), nombre: nombre.trim(), telefono: telefono.trim(),
      estado: estadoUser, municipio: municipioUser, parroquia: parroquiaUser,
      rol: rolTexto, codigoOficial: codigo
    });

    if (rol === "REGIONAL") setPestañaActiva("regional");
    else if (rol === "COOR") setPestañaActiva("coordinacion");
    else setPestañaActiva("registro");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const f = listaPersonal.find(p => p.cedula.toLowerCase() === loginCedula.trim().toLowerCase() && p.clave === loginClave.trim());
    if (!f) {
      setErrorMensaje("⚠️ Cédula o contraseña incorrectas.");
      return;
    }
    setUsuarioAutenticado({
      cedula: f.cedula, nombre: f.nombre, telefono: f.telefono,
      estado: f.estado, municipio: f.municipio, parroquia: f.parroquia,
      rol: f.rol, codigoOficial: f.codigo
    });

    if (f.rol === "Coordinador Regional PAI") setPestañaActiva("regional");
    else if (f.rol === "Coordinador Municipal / ASIC") setPestañaActiva("coordinacion");
    else setPestañaActiva("registro");
  };

  const handleGuardarEdicionPerfil = async (e: React.FormEvent) => {
    e.preventDefault();
    const actualizado = {
      ...usuarioAutenticado,
      nombre: editNombre || usuarioAutenticado.nombre,
      telefono: editTelefono || usuarioAutenticado.telefono,
      estado: editEstado,
      municipio: editMunicipio,
      parroquia: editParroquia,
      clave: editClave ? editClave : usuarioAutenticado.clave
    };
    setUsuarioAutenticado(actualizado);
    const listaAct = listaPersonal.map(p => p.cedula === actualizado.cedula ? { ...p, ...actualizado } : p);
    setListaPersonal(listaAct);
    localStorage.setItem("pai_lista_personal", JSON.stringify(listaAct));
    await syncFuncionarioCloud(actualizado);
    setEditandoPerfil(false);
    alert("✓ Ficha y adscripción de ASIC actualizadas correctamente.");
  };

  const handleCargarLoteInventario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loteCargar || !vencCargar || cantCargar <= 0) return;

    const nuevoLote = { vacuna: vacunaCargarInv, lote: loteCargar.trim().toUpperCase(), vencimiento: vencCargar, cantidad: Number(cantCargar) };
    const actualizado = [nuevoLote, ...loteInventarioVacunas];
    setLoteInventarioVacunas(actualizado);
    localStorage.setItem("pai_lotes_vacunas", JSON.stringify(actualizado));
    await syncLoteCloud(nuevoLote);

    setMensajeInvExito(`✓ Lote ${loteCargar} de ${vacunaCargarInv} cargado al inventario.`);
    setLoteCargar("");
    setVencCargar("");
    setTimeout(() => setMensajeInvExito(""), 4000);
  };

  const handleAgregarEquipoFrio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoModeloFrio || !nuevoSerialFrio) return;
    const nuevo = {
      id: `EQ-${nuevoSerialFrio.trim()}-${Date.now()}`,
      tipo: nuevoTipoFrio,
      modelo: nuevoModeloFrio.trim(),
      serial: nuevoSerialFrio.trim(),
      ubicacion: `ASIC ${usuarioAutenticado?.municipio || ""}`,
      estado: "Operativo"
    };
    setEquiposFrioASIC([...equiposFrioASIC, nuevo]);
    await syncEquipoFrioCloud(nuevo);
    setNuevoModeloFrio("");
    setNuevoSerialFrio("");
  };

  const handleGuardarVacunacion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteNombre || !sectorManual.trim() || !calle) return;

    const loteIndex = loteInventarioVacunas.findIndex(l => l.vacuna === vacunaSeleccionada && l.cantidad > 0);
    let loteUsado = loteVacuna || "GENERAL-2026";
    let vencUsado = vencimientoVacuna || "2027-12-31";
    let loteActualizadoObj: any = null;

    const copiaLotes = [...loteInventarioVacunas];
    if (loteIndex !== -1) {
      loteUsado = copiaLotes[loteIndex].lote;
      vencUsado = copiaLotes[loteIndex].vencimiento || vencUsado;
      copiaLotes[loteIndex].cantidad -= 1;
      loteActualizadoObj = copiaLotes[loteIndex];
      setLoteInventarioVacunas(copiaLotes);
      localStorage.setItem("pai_lotes_vacunas", JSON.stringify(copiaLotes));
    }

    const desc = { ...stockDescartables };
    if (vacunaSeleccionada.includes("BCG")) {
      desc.jeringas01ml = Math.max(0, desc.jeringas01ml - 1);
    } else if (vacunaSeleccionada.includes("SR") || vacunaSeleccionada.includes("Fiebre Amarilla")) {
      desc.jeringas05ml = Math.max(0, desc.jeringas05ml - 1);
      desc.jeringas5ml = Math.max(0, desc.jeringas5ml - 1);
    } else {
      desc.jeringas05ml = Math.max(0, desc.jeringas05ml - 1);
    }
    setStockDescartables(desc);

    const docFinal = busquedaDoc.trim() || "SIN-CEDULA";

    const nuevoReg = {
      id: Date.now(),
      vacunadorCedula: usuarioAutenticado.cedula,
      vacunadorNombre: usuarioAutenticado.nombre,
      municipioJurisdiccion: usuarioAutenticado.municipio,
      parroquiaJurisdiccion: usuarioAutenticado.parroquia,
      estadoJurisdiccion: usuarioAutenticado.estado,
      esNuevoPaciente,
      representante: esNuevoPaciente ? { cedula: representanteCedula, nombre: representanteNombre, hijo: numeroHijoCorrelativo } : null,
      pacienteNombre,
      pacienteDocumento: docFinal,
      pacienteSexo,
      fechaNacimiento,
      grupoEtario: grupoEtarioCalculado,
      direccion: { estado: estadoPaciente, municipio: municipioPaciente, parroquia: parroquiaPaciente, sector: sectorManual.trim(), calle, puntoReferencia: puntoReferencia || "Sin referencia" },
      tipoActividad,
      vacuna: vacunaSeleccionada,
      dosis,
      lote: loteUsado,
      vencimiento: vencUsado,
      proximaCita,
      tieneEsavi,
      esaviDetalle: tieneEsavi ? { sintomas: sintomasEsavi, severidad: severidadEsavi } : null,
      fotoPacienteUrl: fotoPacienteUrl || "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150",
      fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nuevosRegs = [nuevoReg, ...registrosRealizados];
    setRegistrosRealizados(nuevosRegs);
    localStorage.setItem("pai_registros_vacunacion", JSON.stringify(nuevosRegs));

    await syncRegistroVacunaCloud(nuevoReg);
    if (loteActualizadoObj) await syncLoteCloud(loteActualizadoObj);
    await syncDescartablesCloud(desc);

    setMensajeExito(true);
    setBusquedaDoc("");
    setPacienteNombre("");
    setSectorManual("");
    setCalle("");
    setPuntoReferencia("");
    setTieneEsavi(false);
    setSintomasEsavi("");
    setFotoPacienteUrl("");
    setTimeout(() => setMensajeExito(false), 3000);
  };
  const escaparHTML = (texto: any) =>
    String(texto ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const exportarReportePDF = (registrosAExportar: any[], tituloReporte = "Reporte Consolidado PAI") => {
    const ventana = window.open("", "_blank", "width=1024,height=768");
    if (!ventana) {
      alert("Permite las ventanas emergentes en tu navegador para generar el PDF.");
      return;
    }

    const filasHTML = registrosAExportar
      .map((r: any, idx: number) => {
        const docMostrado = r.pacienteDocumento || r.documento || "S/D";
        const nombreMostrado = r.pacienteNombre || r.nombre || "Sin nombre";
        const biologicoMostrado = r.vacuna || r.biologico || "N/A";
        const dosisMostrada = r.dosis || r.numeroDosis || "N/A";
        const loteMostrado = r.lote || "N/A";
        const fechaMostrada = r.fechaAplicacion || r.fecha || "N/A";
        const esInc = Boolean(r.esInclusion);
        const paisInc = r.paisInclusion ? ` (${r.paisInclusion})` : "";
        const inclusionBadge = esInc
          ? `<span style="background:#e0e7ff;color:#3730a3;padding:2px 6px;border-radius:4px;font-weight:700;font-size:10px;">INCLUSIÓN${escaparHTML(paisInc)}</span>`
          : `<span style="color:#64748b;font-size:10px;">Regular</span>`;

        return `
          <tr>
            <td>${idx + 1}</td>
            <td style="font-family:monospace;font-weight:600;">${escaparHTML(docMostrado)}</td>
            <td>${escaparHTML(nombreMostrado)}</td>
            <td>${escaparHTML(biologicoMostrado)}</td>
            <td>${escaparHTML(dosisMostrada)}</td>
            <td style="font-family:monospace;">${escaparHTML(loteMostrado)}</td>
            <td>${escaparHTML(fechaMostrada)}</td>
            <td>${inclusionBadge}</td>
          </tr>
        `;
      })
      .join("");

    ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>${escaparHTML(tituloReporte)}</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; margin: 24px; color: #0f172a; }
          .header { border-bottom: 2px solid #1e293b; padding-bottom: 12px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: flex-end; }
          h1 { font-size: 18px; margin: 0 0 4px 0; }
          .meta { font-size: 11px; color: #475569; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; }
          th { background: #1e293b; color: #ffffff; text-align: left; padding: 7px 8px; }
          td { border-bottom: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: middle; }
          tr:nth-child(even) { background: #f8fafc; }
          .footer { margin-top: 18px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
          @media print { .no-print { display: none; } body { margin: 10px; } }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>${escaparHTML(tituloReporte)}</h1>
            <div class="meta">Programa Ampliado de Inmunización (PAI) — ASIC Valle Guanape / Sistema PAI</div>
          </div>
          <div class="meta" style="text-align:right;">
            <div><strong>Total registros:</strong> ${registrosAExportar.length}</div>
            <div><strong>Emitido:</strong> ${escaparHTML(new Date().toLocaleString("es-VE"))}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Documento / ID</th>
              <th>Paciente</th>
              <th>Biológico</th>
              <th>Dosis</th>
              <th>Lote</th>
              <th>Fecha</th>
              <th>Condición</th>
            </tr>
          </thead>
          <tbody>
            ${filasHTML || `<tr><td colspan="8" style="text-align:center;padding:16px;">No hay registros para mostrar.</td></tr>`}
          </tbody>
        </table>
        <div class="footer">
          <span>Generado por Sistema PAI ASIC</span>
          <span class="no-print"><button onclick="window.print()">Guardar / Imprimir PDF</button></span>
        </div>
        <script>
          window.onload = function() { setTimeout(function() { window.print(); }, 250); };
        </script>
      </body>
      </html>
    `);
    ventana.document.close();
  };

  const exportarTarjetaPDF = (registro: any) => {
    const ventana = window.open("", "_blank", "width=720,height=540");
    if (!ventana) {
      alert("Permite las ventanas emergentes en tu navegador para generar la tarjeta en PDF.");
      return;
    }

    const docMostrado = registro.pacienteDocumento || registro.documento || "S/D";
    const nombreMostrado = registro.pacienteNombre || registro.nombre || "Sin nombre";
    const biologicoMostrado = registro.vacuna || registro.biologico || "N/A";
    const dosisMostrada = registro.dosis || registro.numeroDosis || "N/A";
    const loteMostrado = registro.lote || "N/A";
    const fechaMostrada = registro.fechaAplicacion || registro.fecha || "N/A";
    const establecimiento =
      registro.direccion?.parroquia ||
      registro.direccion?.municipio ||
      "ASIC Valle Guanape";

    const bloqueInclusion = registro.esInclusion
      ? `<div style="margin-top:12px;padding:10px 12px;background:#eef2ff;border-left:4px solid #4f46e5;border-radius:6px;font-size:12px;color:#1e1b4b;">
           <strong>REGISTRO POR INCLUSIÓN</strong> — Antecedente / tarjeta extranjera.
           ${registro.paisInclusion ? `<br/><strong>País de dosis previas:</strong> ${escaparHTML(registro.paisInclusion)}` : ""}
         </div>`
      : "";

    ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <title>Tarjeta PAI - ${escaparHTML(nombreMostrado)}</title>
        <style>
          body { font-family: Arial, Helvetica, sans-serif; background: #f1f5f9; padding: 24px; color: #0f172a; }
          .card { max-width: 620px; margin: 0 auto; background: #ffffff; border: 2px solid #1e293b; border-radius: 12px; padding: 20px 24px; }
          .top { display: flex; justify-content: space-between; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px; margin-bottom: 14px; }
          .title { font-size: 16px; font-weight: 700; margin: 0; }
          .sub { font-size: 11px; color: #475569; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px 16px; font-size: 12px; }
          .label { font-size: 10px; text-transform: uppercase; color: #64748b; display: block; }
          .val { font-weight: 600; font-size: 13px; }
          .mono { font-family: monospace; }
          .foot { margin-top: 16px; padding-top: 10px; border-top: 1px dashed #cbd5e1; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
          @media print { body { background: #ffffff; padding: 0; } .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="card">
          <div class="top">
            <div>
              <p class="title">Constancia / Tarjeta de Vacunación PAI</p>
              <div class="sub">Programa Ampliado de Inmunización — ${escaparHTML(establecimiento)}</div>
            </div>
            <div class="sub" style="text-align:right;">
              <div><strong>Fecha emisión:</strong></div>
              <div>${escaparHTML(new Date().toLocaleDateString("es-VE"))}</div>
            </div>
          </div>
          <div class="grid">
            <div><span class="label">Paciente</span><span class="val">${escaparHTML(nombreMostrado)}</span></div>
            <div><span class="label">Documento / Dependiente</span><span class="val mono">${escaparHTML(docMostrado)}</span></div>
            <div><span class="label">Biológico / Vacuna</span><span class="val">${escaparHTML(biologicoMostrado)}</span></div>
            <div><span class="label">Dosis</span><span class="val">${escaparHTML(dosisMostrada)}</span></div>
            <div><span class="label">Lote</span><span class="val mono">${escaparHTML(loteMostrado)}</span></div>
            <div><span class="label">Fecha de aplicación</span><span class="val">${escaparHTML(fechaMostrada)}</span></div>
          </div>
          ${bloqueInclusion}
          <div class="foot">
            <span>Sistema PAI ASIC — Registro válido para control y transcripción</span>
            <span class="no-print"><button onclick="window.print()">Imprimir / Guardar PDF</button></span>
          </div>
        </div>
        <script>
          window.onload = function() { setTimeout(function() { window.print(); }, 250); };
        </script>
      </body>
      </html>
    `);
    ventana.document.close();
  };

  const handleGuardarLibro = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensajeLibro(null);

    if (
      !libroForm.nombres.trim() ||
      !libroForm.apellidos.trim() ||
      !libroForm.cedula.trim() ||
      !libroForm.fechaColocacion
    ) {
      setMensajeLibro({
        tipo: "error",
        texto: "Completa nombres, apellidos, cédula y fecha de colocación.",
      });
      return;
    }

    setGuardandoLibro(true);
    try {
      const cedulaLimpia = libroForm.cedula.trim().toUpperCase();
      const docFinal =
        libroForm.tipoCedula === "representante"
          ? `REP-${cedulaLimpia}${libroForm.sufijoFamiliar || "-01"}`
          : cedulaLimpia;

      const nuevoReg = {
        id: Date.now(),
        vacunadorCedula: usuarioAutenticado?.cedula || "",
        vacunadorNombre: usuarioAutenticado?.nombre || "",
        municipioJurisdiccion: usuarioAutenticado?.municipio || municipioUser,
        parroquiaJurisdiccion: usuarioAutenticado?.parroquia || parroquiaUser,
        estadoJurisdiccion: usuarioAutenticado?.estado || estadoUser,
        esNuevoPaciente: libroForm.tipoCedula === "representante",
        representante:
          libroForm.tipoCedula === "representante"
            ? { cedula: cedulaLimpia, nombre: "", hijo: libroForm.sufijoFamiliar || "-01" }
            : null,
        pacienteNombre: `${libroForm.nombres.trim()} ${libroForm.apellidos.trim()}`,
        pacienteDocumento: docFinal,
        pacienteSexo: "No especificado",
        fechaNacimiento: libroForm.fechaNacimiento || "",
        grupoEtario: "Transcripción Libro Físico",
        direccion: {
          estado: usuarioAutenticado?.estado || estadoUser,
          municipio: usuarioAutenticado?.municipio || municipioUser,
          parroquia: usuarioAutenticado?.parroquia || parroquiaUser,
          sector: "Archivo Libro Físico",
          calle: "Histórico",
          puntoReferencia: "N/A",
        },
        esInclusion,
        paisInclusion: esInclusion ? paisInclusion.trim() : "",
        tipoActividad: "Intramural",
        vacuna: libroForm.biologico,
        dosis: `Dosis ${libroForm.numeroDosis || "1"}`,
        lote: libroForm.lote.trim().toUpperCase() || "HISTORICO",
        vencimiento: "N/A",
        tieneEsavi: false,
        esHistorico: true,
        fecha: libroForm.fechaColocacion,
      };

const nuevosRegs = [nuevoReg, ...registrosRealizados];
      setRegistrosRealizados(nuevosRegs);
      localStorage.setItem("pai_registros_vacunacion", JSON.stringify(nuevosRegs));

      let guardadoOffline = false;
      if (typeof window !== "undefined" && !window.navigator.onLine) {
        encolarRegistroOffline(nuevoReg, "vacunacion");
        guardadoOffline = true;
      } else {
        try {
          await syncRegistroVacunaCloud(nuevoReg);
        } catch {
          encolarRegistroOffline(nuevoReg, "vacunacion");
          guardadoOffline = true;
        }
      }

      setMensajeLibro({
        tipo: "ok",
        texto: guardadoOffline
          ? `Guardado sin conexión (pendiente por subir): ${libroForm.nombres.trim()} ${libroForm.apellidos.trim()} — ${libroForm.biologico} (Dosis ${libroForm.numeroDosis}).`
          : `Guardado: ${libroForm.nombres.trim()} ${libroForm.apellidos.trim()} — ${libroForm.biologico} (Dosis ${libroForm.numeroDosis}).`,
      });

      setLibroForm((prev) => ({
        ...prev,
        lote: "",
        fechaColocacion: "",
      }));
    } catch (err: any) {
      setMensajeLibro({
        tipo: "error",
        texto: err?.message || "Error al guardar en Supabase.",
      });
    } finally {
      setGuardandoLibro(false);
    }
  };

  const misRegistros = usuarioAutenticado ? registrosRealizados.filter(r => r.vacunadorCedula === usuarioAutenticado.cedula) : [];
  const registrosJurisdiccionASIC = usuarioAutenticado ? registrosRealizados.filter(r => r.municipioJurisdiccion === usuarioAutenticado.municipio) : [];
  const equipoVacunadoresASIC = usuarioAutenticado ? listaPersonal.filter(p => p.municipio === usuarioAutenticado.municipio && p.rol === "Vacunador de Campo") : [];
  const registrosEstadales = usuarioAutenticado ? registrosRealizados.filter(r => r.estadoJurisdiccion === usuarioAutenticado.estado) : [];

  const objEstadoUser = DIVISION_TERRITORIAL_VENEZUELA.find(e => e.estado === estadoUser);
  const municipiosDisponiblesUser = objEstadoUser ? objEstadoUser.municipios : [];
  const objMunUser = municipiosDisponiblesUser.find(m => m.nombre === municipioUser);
  const parroquiasDisponiblesUser = objMunUser ? objMunUser.parroquias : [];

  const objEstadoPac = DIVISION_TERRITORIAL_VENEZUELA.find(e => e.estado === estadoPaciente);
  const municipiosDisponiblesPac = objEstadoPac ? objEstadoPac.municipios : [];
  const objMunPac = municipiosDisponiblesPac.find(m => m.nombre === municipioPaciente);
  const parroquiasDisponiblesPac = objMunPac ? objMunPac.parroquias : [];

  const objEditEstado = DIVISION_TERRITORIAL_VENEZUELA.find(e => e.estado === editEstado);
  const editMuns = objEditEstado ? objEditEstado.municipios : [];
  const objEditMun = editMuns.find(m => m.nombre === editMunicipio);
  const editParqs = objEditMun ? objEditMun.parroquias : [];

  const historialTarjeta = tarjetaPacienteDoc
    ? registrosRealizados.filter(r => r.pacienteDocumento === tarjetaPacienteDoc)
    : [];
  const cabeceraTarjeta = historialTarjeta[0] || null;
  // Punto 2: Filtros avanzados (fecha, biológico, demografía) y exportación a Excel
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroBiologico, setFiltroBiologico] = useState("TODOS");
  const [filtroSexo, setFiltroSexo] = useState<"TODOS" | "Masculino" | "Femenino">("TODOS");
  const [filtroGrupoEtario, setFiltroGrupoEtario] = useState("TODOS");
  const [filtroParroquia, setFiltroParroquia] = useState("TODAS");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  const normalizarFechaISO = (valorFecha: any): string => {
    if (!valorFecha) return "";
    const str = String(valorFecha).trim();
    if (/^\d{4}-\d{2}-\d{2}/.test(str)) return str.slice(0, 10);
    const partes = str.split(" ")[0].split("/");
    if (partes.length === 3) {
      const [d, m, y] = partes;
      if (y && y.length === 4) {
        return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      }
    }
    return "";
  };

  const aplicarFiltrosPAI = (baseRegistros: any[]) => {
    const texto = filtroBusqueda.trim().toLowerCase();
    return baseRegistros.filter((r) => {
      const fechaISO = normalizarFechaISO(r.fecha);
      if (filtroFechaDesde && (!fechaISO || fechaISO < filtroFechaDesde)) return false;
      if (filtroFechaHasta && (!fechaISO || fechaISO > filtroFechaHasta)) return false;

      if (filtroBiologico !== "TODOS" && r.vacuna !== filtroBiologico) return false;
      if (filtroSexo !== "TODOS" && r.pacienteSexo !== filtroSexo) return false;
      if (filtroGrupoEtario !== "TODOS" && r.grupoEtario !== filtroGrupoEtario) return false;
      if (filtroParroquia !== "TODAS" && r.direccion?.parroquia !== filtroParroquia) return false;

      if (texto) {
        const campos = [
          r.pacienteNombre,
          r.pacienteDocumento,
          r.direccion?.sector,
          r.direccion?.parroquia,
          r.vacunadorNombre,
          r.lote,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!campos.includes(texto)) return false;
      }
      return true;
    });
  };

  const registrosASICFiltrados = aplicarFiltrosPAI(registrosJurisdiccionASIC);
  const registrosRegionalFiltrados = aplicarFiltrosPAI(registrosEstadales);
  const [esInclusion, setEsInclusion] = useState<boolean>(false);
const [paisInclusion, setPaisInclusion] = useState<string>("");
const [numeroHijoDependiente, setNumeroHijoDependiente] = useState<string>("H1");
const CLAVE_COLA_OFFLINE_PAI = "pai_asic_cola_offline_v1";
  const [estaOnline, setEstaOnline] = useState<boolean>(
    typeof window !== "undefined" ? window.navigator.onLine : true
  );
  const [pendientesOffline, setPendientesOffline] = useState<any[]>([]);
  const [sincronizandoOffline, setSincronizandoOffline] = useState<boolean>(false);

  const leerColaOffline = (): any[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(CLAVE_COLA_OFFLINE_PAI);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const guardarColaOffline = (lista: any[]) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(CLAVE_COLA_OFFLINE_PAI, JSON.stringify(lista));
    setPendientesOffline(lista);
  };

  const encolarRegistroOffline = (registro: any, tablaDestino: string) => {
    const actual = leerColaOffline();
    const itemCola = {
      idLocal:
        registro?.idLocal ||
        `offline-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      tablaDestino,
      payload: { ...registro },
      creadoEn: new Date().toISOString(),
    };
    const actualizada = [...actual, itemCola];
    guardarColaOffline(actualizada);
    return itemCola;
  };

  const sincronizarColaOffline = async () => {
    if (typeof window === "undefined" || !window.navigator.onLine) return;
    const cola = leerColaOffline();
    if (cola.length === 0 || sincronizandoOffline) return;

    setSincronizandoOffline(true);
    const restantes: any[] = [];

    for (const item of cola) {
for (const item of cola) {
      try {
        await syncRegistroVacunaCloud(item.payload);
      } catch {
        restantes.push(item);
      }
    }
    }

    guardarColaOffline(restantes);
    setSincronizandoOffline(false);
  };

  useEffect(() => {
    setPendientesOffline(leerColaOffline());

    const manejarOnline = () => {
      setEstaOnline(true);
      sincronizarColaOffline();
    };
    const manejarOffline = () => {
      setEstaOnline(false);
    };

    window.addEventListener("online", manejarOnline);
    window.addEventListener("offline", manejarOffline);

    if (window.navigator.onLine) {
      sincronizarColaOffline();
    }

    return () => {
      window.removeEventListener("online", manejarOnline);
      window.removeEventListener("offline", manejarOffline);
    };
  }, []);

const construirDocumentoDependiente = (
  nacionalidadRepresentante: "V" | "E",
  cedulaRepresentante: string,
  numeroHijo: string
) => {
  const cedulaLimpia = (cedulaRepresentante || "").replace(/\D/g, "");
  const sufijo = (numeroHijo || "H1").toUpperCase().trim();
  if (!cedulaLimpia) return "";
  return `${nacionalidadRepresentante}-${cedulaLimpia}-${sufijo}`;
};

  const exportarRegistrosExcel = (filas: any[], nombreArchivo: string) => {
    const encabezados = [
      "ID",
      "Fecha",
      "Paciente",
      "Documento / ID",
      "Sexo",
      "Fecha Nacimiento",
      "Grupo Etario",
      "Estado",
      "Municipio / ASIC",
      "Parroquia",
      "Sector",
      "Modalidad",
      "Biologico",
      "Dosis",
      "Lote",
      "Vacunador",
      "ESAVI",
      "Detalle ESAVI",
      "Es Inclusión",
      "País Inclusión",
    ];

    const escaparCSV = (val: any) => {
      const limpio = String(val ?? "").replace(/"/g, '""');
      return `"${limpio}"`;
    };

    const lineas = [
      encabezados.map(escaparCSV).join(";"),
      ...filas.map((r) =>
        [
          r.id,
          r.fecha,
          r.pacienteNombre,
          r.pacienteDocumento,
          r.pacienteSexo,
          r.fechaNacimiento || "",
          r.grupoEtario || "",
          r.direccion?.estado || r.estadoJurisdiccion || "",
          r.direccion?.municipio || r.municipioJurisdiccion || "",
          r.direccion?.parroquia || r.parroquiaJurisdiccion || "",
          r.direccion?.sector || "",
          r.tipoActividad || "",
          r.vacuna || "",
          r.dosis || "",
          r.lote || "",
          r.vacunadorNombre || "",
          r.tieneEsavi ? "SI" : "NO",
          r.tieneEsavi
            ? `${r.esaviDetalle?.severidad || ""}: ${r.esaviDetalle?.sintomas || ""}`
            : "",
            r.esInclusion ? "Sí" : "No",
        r.esInclusion ? (r.paisInclusion || "No especificado") : "—",
        ]
          .map(escaparCSV)
          .join(";")
      ),
    ];

    const blob = new Blob(["\uFEFF" + lineas.join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between p-4 md:p-8 font-sans print:bg-white print:text-black print:p-0">
      <header className="w-full max-w-6xl mx-auto bg-slate-900/90 backdrop-blur shadow-2xl rounded-2xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full animate-ping"></span>
            <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase bg-cyan-950/90 px-3 py-1 rounded-full border border-cyan-800/60">
              Sistema PAI Venezuela &bull; Módulo Oficial Terreno
            </span>
            <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full border ${estadoSyncCloud === "conectado" ? "bg-emerald-950/80 text-emerald-300 border-emerald-800" : estadoSyncCloud === "sincronizando" ? "bg-amber-950/80 text-amber-300 border-amber-800" : "bg-slate-800 text-slate-400 border-slate-700"}`}>
              {estadoSyncCloud === "conectado" ? "☁️ Supabase Activo" : estadoSyncCloud === "sincronizando" ? "↻ Sincronizando..." : "💾 Modo Local"}
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-2">
            Plataforma Integral de Inmunización y Vigilancia
          </h1>
        </div>
        {usuarioAutenticado && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-white block">{usuarioAutenticado.nombre}</span>
              <span className="text-[10px] text-cyan-400 font-mono block">
                ASIC / Municipio: {usuarioAutenticado.municipio} ({usuarioAutenticado.estado})
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                setEditNombre(usuarioAutenticado.nombre);
                setEditTelefono(usuarioAutenticado.telefono);
                setEditEstado(usuarioAutenticado.estado);
                setEditMunicipio(usuarioAutenticado.municipio);
                setEditParroquia(usuarioAutenticado.parroquia);
                setEditandoPerfil(true);
              }} className="text-xs bg-slate-800 hover:bg-cyan-950 text-cyan-300 px-3 py-2 rounded-xl border border-slate-700 transition-all">
                Ficha y ASIC
              </button>
              <button onClick={() => setUsuarioAutenticado(null)} className="text-xs bg-slate-800 hover:bg-rose-950/80 hover:text-rose-300 text-slate-300 px-3 py-2 rounded-xl border border-slate-700 transition-all">
                Salir
              </button>
            </div>
            <div className="flex items-center gap-2 text-xs">
  <span
    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-semibold border ${
      estaOnline
        ? "bg-emerald-950/70 text-emerald-300 border-emerald-700/60"
        : "bg-amber-950/80 text-amber-300 border-amber-700/60"
    }`}
  >
    <span
      className={`h-2 w-2 rounded-full ${
        estaOnline ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
      }`}
    />
    {estaOnline ? "En línea" : "Sin conexión"}
  </span>

  {pendientesOffline.length > 0 && (
    <button
      type="button"
      disabled={!estaOnline || sincronizandoOffline}
      onClick={sincronizarColaOffline}
      className="px-2.5 py-1 rounded-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-semibold transition-all"
    >
      {sincronizandoOffline
        ? "Sincronizando..."
        : `⬆️ Sincronizar (${pendientesOffline.length})`}
    </button>
  )}
</div>
          </div>
        )}
      </header>

      {/* MODAL FICHA Y ASIGNACIÓN DE ASIC COMPLETA */}
      {editandoPerfil && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:hidden">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-cyan-400">⚙️ Ficha Completa y Enlace con ASIC</h3>
            <form onSubmit={handleGuardarEdicionPerfil} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nombre Completo</label>
                  <input type="text" value={editNombre} onChange={(e) => setEditNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 mb-1">Teléfono</label>
                  <input type="text" value={editTelefono} onChange={(e) => setEditTelefono(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
                </div>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Adscripción Territorial (Coordinador de ASIC)</span>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase mb-1">Estado</label>
                  <select value={editEstado} onChange={(e) => {
                    const est = e.target.value;
                    setEditEstado(est);
                    const mList = DIVISION_TERRITORIAL_VENEZUELA.find(x => x.estado === est)?.municipios || [];
                    if (mList.length > 0) {
                      setEditMunicipio(mList[0].nombre);
                      if (mList[0].parroquias.length > 0) setEditParroquia(mList[0].parroquias[0]);
                    }
                  }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                    {DIVISION_TERRITORIAL_VENEZUELA.map(e => <option key={e.estado} value={e.estado}>{e.estado}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Municipio / ASIC</label>
                    <select value={editMunicipio} onChange={(e) => {
                      const mun = e.target.value;
                      setEditMunicipio(mun);
                      const pList = editMuns.find(x => x.nombre === mun)?.parroquias || [];
                      if (pList.length > 0) setEditParroquia(pList[0]);
                    }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                      {editMuns.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Parroquia</label>
                    <select value={editParroquia} onChange={(e) => setEditParroquia(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                      {editParqs.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Nueva Contraseña (Opcional)</label>
                <input type="password" placeholder="Dejar en blanco para mantener" value={editClave} onChange={(e) => setEditClave(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" />
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded-xl text-xs">Guardar Ficha</button>
                <button type="button" onClick={() => setEditandoPerfil(false)} className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2 rounded-xl text-xs">Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TARJETA DE VACUNACIÓN DIGITAL / EXPORTABLE A PDF */}
      {tarjetaPacienteDoc && cabeceraTarjeta && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:static print:bg-transparent print:p-0">
          <div className="bg-slate-900 border border-cyan-700/80 p-6 rounded-2xl max-w-xl w-full space-y-4 shadow-2xl print:bg-white print:text-black print:border-black print:shadow-none print:max-w-full">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3 print:border-slate-300">
              <div className="flex items-center gap-3">
                {cabeceraTarjeta.fotoPacienteUrl && (
                  <img src={cabeceraTarjeta.fotoPacienteUrl} alt="Paciente" className="w-14 h-14 rounded-xl object-cover border border-cyan-500" />
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-400 print:text-cyan-800 block">Tarjeta Oficial de Inmunización PAI</span>
                  <h3 className="text-lg font-extrabold text-white print:text-black">{cabeceraTarjeta.pacienteNombre}</h3>
                  <span className="text-xs font-mono text-slate-300 print:text-slate-700 block">ID / Cédula: {cabeceraTarjeta.pacienteDocumento}</span>
                </div>
              </div>
              <button onClick={() => setTarjetaPacienteDoc(null)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg print:hidden">
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 print:bg-slate-50 print:border-slate-300">
              <div><span className="text-slate-400 print:text-slate-600">Nacimiento:</span> <strong className="font-mono">{cabeceraTarjeta.fechaNacimiento || "N/A"}</strong></div>
              <div><span className="text-slate-400 print:text-slate-600">Grupo Etario:</span> <strong>{cabeceraTarjeta.grupoEtario}</strong></div>
              <div className="col-span-2">
                <span className="text-slate-400 print:text-slate-600">Jurisdicción:</span>{" "}
                <strong>{cabeceraTarjeta.direccion?.estado} &bull; {cabeceraTarjeta.direccion?.municipio} &bull; {cabeceraTarjeta.direccion?.parroquia}</strong>
              </div>
              {cabeceraTarjeta.representante && (
                <div className="col-span-2 text-purple-300 print:text-purple-900">
                  Representante: <strong>{cabeceraTarjeta.representante.nombre}</strong> (C.I: {cabeceraTarjeta.representante.cedula} &bull; Hijo {cabeceraTarjeta.representante.hijo})
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-emerald-400 print:text-emerald-800">Esquema Aplicado ({historialTarjeta.length})</h4>
              <div className="max-h-56 overflow-y-auto space-y-2 print:max-h-none print:overflow-visible">
                {historialTarjeta.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center print:bg-white print:border-slate-300">
                    <div>
                      <div className="font-bold text-white print:text-black">{item.vacuna} &mdash; <span className="text-emerald-400 print:text-emerald-700">{item.dosis}</span></div>
                      <div className="text-[10px] text-slate-400 font-mono print:text-slate-600">
                        Lote: {item.lote} | Vence: {item.vencimiento || "N/A"} | Fecha: {item.fecha}
                      </div>
                    </div>
                    <div className="text-right text-[10px] font-mono text-amber-300 print:text-amber-800">
                      Próx. Cita:<br />{item.proximaCita || "N/A"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2 print:hidden">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-lg"
              >
                📄 Descargar / Guardar como PDF
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="w-full max-w-6xl mx-auto my-6 print:hidden">
        {!usuarioAutenticado ? (
          <div className="max-w-md mx-auto bg-slate-900/80 p-8 rounded-2xl shadow-2xl border border-slate-800">
            <div className="flex bg-slate-950 p-1.5 rounded-xl mb-6 border border-slate-800">
              <button type="button" onClick={() => { setModo("login"); setErrorMensaje(""); }} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${modo === "login" ? "bg-cyan-600 text-white shadow-lg" : "text-slate-400"}`}>Ingreso</button>
              <button type="button" onClick={() => { setModo("registro"); setErrorMensaje(""); }} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${modo === "registro" ? "bg-cyan-600 text-white shadow-lg" : "text-slate-400"}`}>Nuevo Funcionario</button>
            </div>

            {errorMensaje && <div className="mb-4 p-3 bg-rose-950/80 border border-rose-700 rounded-xl text-xs text-rose-300">{errorMensaje}</div>}

            {modo === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Cédula de Identidad</label>
                  <input type="text" placeholder="Ej: V-25123456" value={loginCedula} onChange={(e) => setLoginCedula(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono" required />
                </div>
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Contraseña</label>
                  <input type={mostrarClave ? "text" : "password"} placeholder="••••••••" value={loginClave} onChange={(e) => setLoginClave(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white font-mono" required />
                  <button
                    type="button"
                    onClick={() => setMostrarClave((v) => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-300 hover:text-white"
                  >
                    {mostrarClave ? "Ocultar" : "Ver"}
                  </button>
                </div>
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg">Acceder al Sistema &rarr;</button>
              </form>
            ) : (
              <form onSubmit={handleRegistroTrabajador} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Cédula</label>
                    <input type="text" placeholder="Ej: V-25123456" value={cedula} onChange={(e) => setCedula(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Teléfono</label>
                    <input type="text" placeholder="Ej: 0414-1234567" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" required />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Nombre Completo</label>
                  <input type="text" placeholder="Ej: Samuel Itriago" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Adscripción Oficial a ASIC</span>
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">Estado</label>
                    <select value={estadoUser} onChange={(e) => {
                      const est = e.target.value;
                      setEstadoUser(est);
                      const mList = DIVISION_TERRITORIAL_VENEZUELA.find(x => x.estado === est)?.municipios || [];
                      if (mList.length > 0) {
                        setMunicipioUser(mList[0].nombre);
                        if (mList[0].parroquias.length > 0) setParroquiaUser(mList[0].parroquias[0]);
                      }
                    }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                      {DIVISION_TERRITORIAL_VENEZUELA.map(e => <option key={e.estado} value={e.estado}>{e.estado}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Municipio / ASIC</label>
                      <select value={municipioUser} onChange={(e) => {
                        const mun = e.target.value;
                        setMunicipioUser(mun);
                        const pList = municipiosDisponiblesUser.find(x => x.nombre === mun)?.parroquias || [];
                        if (pList.length > 0) setParroquiaUser(pList[0]);
                      }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                        {municipiosDisponiblesUser.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Parroquia</label>
                      <select value={parroquiaUser} onChange={(e) => setParroquiaUser(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                        {parroquiasDisponiblesUser.map(p => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Perfil Operativo</label>
                  <select value={rol} onChange={(e) => setRol(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                    <option value="VAC">Vacunador de Campo</option>
                    <option value="COOR">Coordinador Municipal / ASIC</option>
                    <option value="REGIONAL">Coordinador Regional PAI</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-300 uppercase mb-1">Contraseña</label>
                  <input type="password" placeholder="••••••••" value={claveRegistro} onChange={(e) => setClaveRegistro(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" required />
                </div>
                <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 rounded-xl text-sm transition-all">Crear Cuenta &rarr;</button>
              </form>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {usuarioAutenticado.rol === "Vacunador de Campo" && (
                  <>
                    <button onClick={() => setPestañaActiva("registro")} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "registro" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-950 text-slate-400"}`}>💉 Registro Inteligente</button>
                    <button onClick={() => setPestañaActiva("libro")} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "libro" ? "bg-purple-600 text-white shadow-lg" : "bg-slate-950 text-slate-400"}`}>📖 Transcribir Libro Físico</button>
                    <button onClick={() => setPestañaActiva("reportePersonal")} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "reportePersonal" ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-950 text-slate-400"}`}>📊 Mis Dosis Aplicadas</button>
                  </>
                )}
                {usuarioAutenticado.rol === "Coordinador Municipal / ASIC" && (
                  <>
                    <button onClick={() => setPestañaActiva("coordinacion")} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "coordinacion" ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-950 text-slate-400"}`}>📋 Consolidado ASIC & ESAVI</button>
                    <button onClick={() => setPestañaActiva("inventario")} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "inventario" ? "bg-amber-600 text-white shadow-lg" : "bg-slate-950 text-slate-400"}`}>📦 Frío, Lotes y Descartables</button>
                  </>
                )}
                {usuarioAutenticado.rol === "Coordinador Regional PAI" && (
                  <button onClick={() => setPestañaActiva("regional")} className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "regional" ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-950 text-slate-400"}`}>🏛️ Tablero Estadal Resumido</button>
                )}
              </div>
            </div>

            {/* VISTA: VACUNADOR DE CAMPO */}
            {usuarioAutenticado.rol === "Vacunador de Campo" && pestañaActiva === "registro" && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl max-w-3xl mx-auto space-y-4 relative">

                <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-xl text-xs flex justify-between items-center">
                  <div>
                    <span className="text-cyan-400 font-bold uppercase block">📍 Jurisdicción Operativa Asignada:</span>
                    <span className="text-white font-semibold">{usuarioAutenticado.estado} &bull; Municipio {usuarioAutenticado.municipio} &bull; Parroquia {usuarioAutenticado.parroquia}</span>
                  </div>
                  <span className="bg-cyan-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold">Activo en Terreno</span>
                </div>

                <div className="absolute top-20 right-6 flex flex-col items-center">
                  <div onClick={() => fileInputRef.current?.click()} className="w-20 h-20 rounded-2xl border-2 border-cyan-500/80 bg-slate-950 overflow-hidden shadow-lg cursor-pointer group relative flex items-center justify-center transition-all hover:border-cyan-400">
                    {fotoPacienteUrl ? (
                      <img src={fotoPacienteUrl} alt="Paciente" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-1">
                        <span className="text-[10px] text-cyan-400 font-bold block">📷 Foto</span>
                        <span className="text-[8px] text-slate-500 block">{esquemaExistente ? "Registrada" : "Apertura"}</span>
                      </div>
                    )}
                  </div>
                  <span className={`text-[9px] font-bold mt-1 px-2 py-0.5 rounded-full ${esquemaExistente ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-amber-950 text-amber-300 border border-amber-800"}`}>
                    {esquemaExistente ? "✓ Con Esquema" : "⚡ Apertura"}
                  </span>
                  <input type="file" ref={fileInputRef} onChange={handleImagenSeleccionada} accept="image/*" capture="environment" className="hidden" />
                </div>

                <div className="border-b border-slate-800 pb-3 pr-28">
                  <h3 className="text-lg font-bold text-emerald-400">📝 Registro de Vacunación en Terreno</h3>
                  <p className="text-xs text-slate-400">Cédula virtual de menor con datos del representante y correlativo de hijo</p>
                </div>

                {mensajeExito && <div className="p-3 bg-emerald-950 border border-emerald-700 rounded-xl text-xs text-emerald-300 font-semibold">✓ Dosis registrada, lote y jeringa descontados del inventario de la ASIC.</div>}

                <form onSubmit={handleGuardarVacunacion} className="space-y-4">

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-900/60 space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input type="checkbox" checked={esNuevoPaciente} onChange={(e) => setEsNuevoPaciente(e.target.checked)} className="accent-cyan-500 rounded" />
                      <span className="font-bold text-cyan-300 uppercase">👶 ¿Nuevo Paciente / Menor sin Cédula Propia? (Generar Cédula Virtual)</span>
                    </label>

                    {esNuevoPaciente && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-slate-800">
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Cédula del Representante</label>
                          <input type="text" placeholder="Ej: V-15123456" value={representanteCedula} onChange={(e) => setRepresentanteCedula(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono" required={esNuevoPaciente} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nombre del Representante</label>
                          <input type="text" placeholder="Ej: María Pérez" value={representanteNombre} onChange={(e) => setRepresentanteNombre(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" required={esNuevoPaciente} />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-slate-400 uppercase mb-1">Nro. de Hijo (Correlativo)</label>
                          <select value={numeroHijoCorrelativo} onChange={(e) => setNumeroHijoCorrelativo(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-2 text-xs text-white font-mono">
                            <option value="01">Hijo 01</option>
                            <option value="02">Hijo 02</option>
                            <option value="03">Hijo 03</option>
                            <option value="04">Hijo 04</option>
                            <option value="05">Hijo 05</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Cédula o Cédula Virtual Generada</label>
                      <input type="text" placeholder="Ej: V-30123456 o autogenerada" value={busquedaDoc} onChange={(e) => setBusquedaDoc(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" required />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Nombre Completo del Paciente</label>
                      <input type="text" placeholder="Ej: Carlos Gómez" value={pacienteNombre} onChange={(e) => setPacienteNombre(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white" required />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Sexo</label>
                      <select value={pacienteSexo} onChange={(e) => setPacienteSexo(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Fecha de Nacimiento</label>
                      <input type="date" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono" required />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Modalidad PAI</label>
                      <select value={tipoActividad} onChange={(e) => setTipoActividad(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-semibold text-cyan-300">
                        {TIPOS_ACTIVIDAD_PAI.map(act => <option key={act} value={act}>{act}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Ubicación Domiciliaria Oficial (Estados, Municipios, Parroquias y Sector Manual)</span>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Estado</label>
                        <select value={estadoPaciente} onChange={(e) => {
                          const est = e.target.value;
                          setEstadoPaciente(est);
                          const mList = DIVISION_TERRITORIAL_VENEZUELA.find(x => x.estado === est)?.municipios || [];
                          if (mList.length > 0) {
                            setMunicipioPaciente(mList[0].nombre);
                            if (mList[0].parroquias.length > 0) setParroquiaPaciente(mList[0].parroquias[0]);
                          }
                        }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                          {DIVISION_TERRITORIAL_VENEZUELA.map(e => <option key={e.estado} value={e.estado}>{e.estado}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Municipio</label>
                        <select value={municipioPaciente} onChange={(e) => {
                          const mun = e.target.value;
                          setMunicipioPaciente(mun);
                          const pList = municipiosDisponiblesPac.find(x => x.nombre === mun)?.parroquias || [];
                          if (pList.length > 0) setParroquiaPaciente(pList[0]);
                        }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                          {municipiosDisponiblesPac.map(m => <option key={m.nombre} value={m.nombre}>{m.nombre}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Parroquia</label>
                        <select value={parroquiaPaciente} onChange={(e) => setParroquiaPaciente(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white">
                          {parroquiasDisponiblesPac.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Sector / Caserío / Comunidad</label>
                        <input type="text" placeholder="Ej: Las Casitas / Sector Sur" value={sectorManual} onChange={(e) => setSectorManual(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-semibold text-cyan-300" required />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Calle / Vereda</label>
                        <input type="text" placeholder="Ej: Calle Principal" value={calle} onChange={(e) => setCalle(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" required />
                      </div>
                      <div>
                        <label className="block text-[10px] text-slate-400 uppercase mb-1">Punto de Referencia</label>
                        <input type="text" placeholder="Ej: Cerca de la bodega" value={puntoReferencia} onChange={(e) => setPuntoReferencia(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" />
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-900/60 space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Grupo Etario Calculado:</span>
                        <span className="text-sm font-extrabold text-white">{grupoEtarioCalculado}</span>
                      </div>
                      {pacienteSexo === "Femenino" && (
                        <label className="flex items-center gap-2 cursor-pointer text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                          <input type="checkbox" checked={esEmbarazada} onChange={(e) => setEsEmbarazada(e.target.checked)} className="accent-cyan-500 rounded" />
                          <span className="font-semibold text-cyan-200">¿Gestante?</span>
                        </label>
                      )}
                    </div>
                    {esquemaAtrasadoAlerta && (
                      <div className={`p-2 rounded-lg text-xs font-semibold ${esquemaAtrasadoAlerta.includes("ATENCIÓN") ? "bg-rose-950/80 text-rose-300 border border-rose-800" : "bg-emerald-950/80 text-emerald-300 border border-emerald-800"}`}>
                        {esquemaAtrasadoAlerta}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-emerald-400 uppercase mb-1">Biológico PAI</label>
                      <select value={vacunaSeleccionada} onChange={(e) => setVacunaSeleccionada(e.target.value)} className="w-full bg-slate-950 border border-emerald-800/80 rounded-xl px-3 py-2 text-xs text-emerald-300 font-semibold">
                        {vacunasDisponibles.map(v => <option key={v} value={v}>{v}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 uppercase mb-1">Dosis</label>
                      <select value={dosis} onChange={(e) => setDosis(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white">
                        <option value="1ra Dosis">1ra Dosis</option>
                        <option value="2da Dosis">2da Dosis</option>
                        <option value="3ra Dosis">3ra Dosis</option>
                        <option value="Refuerzo">Refuerzo</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Lote del Biológico (Asignado)</label>
                      <select value={loteVacuna} onChange={(e) => {
                        const sel = e.target.value;
                        setLoteVacuna(sel);
                        const found = loteInventarioVacunas.find(x => x.lote === sel);
                        if (found?.vencimiento) setVencimientoVacuna(found.vencimiento);
                      }} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono">
                        <option value="">Lote Automático (FIFO disponible)</option>
                        {loteInventarioVacunas.filter(l => l.vacuna === vacunaSeleccionada).map(l => (
                          <option key={l.lote} value={l.lote}>{l.lote} (Disp: {l.cantidad} - Vence: {l.vencimiento})</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">📅 Próxima Cita Programada (Calendario)</label>
                      <input type="date" value={proximaCita} onChange={(e) => setProximaCita(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white font-mono" />
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-950/40 rounded-xl border border-amber-800/70 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs">
                      <input type="checkbox" checked={tieneEsavi} onChange={(e) => setTieneEsavi(e.target.checked)} className="accent-amber-500 rounded" />
                      <span className="font-bold text-amber-300 uppercase">⚠️ Registrar Evento Adverso (ESAVI)</span>
                    </label>
                    {tieneEsavi && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
                        <input type="text" placeholder="Síntomas (Ej: Fiebre, dolor local)" value={sintomasEsavi} onChange={(e) => setSintomasEsavi(e.target.value)} className="bg-slate-900 border border-amber-700 rounded-lg px-3 py-2 text-xs text-white" required />
                        <select value={severidadEsavi} onChange={(e) => setSeveridadEsavi(e.target.value as any)} className="bg-slate-900 border border-amber-700 rounded-lg px-3 py-2 text-xs text-white">
                          <option value="Leve">Severidad: Leve</option>
                          <option value="Moderado">Severidad: Moderado</option>
                          <option value="Grave">Severidad: Grave</option>
                        </select>
                      </div>
                    )}
                  </div>

                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl text-sm transition-all shadow-lg shadow-emerald-950">
                    Guardar Vacunación y Descontar Stock &rarr;
                  </button>
                </form>
              </div>
            )}

            {/* VISTA: LIBRO FÍSICO */}
            {usuarioAutenticado.rol === "Vacunador de Campo" && pestañaActiva === "libro" && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-purple-800 shadow-xl max-w-2xl mx-auto space-y-4">
                <h3 className="text-lg font-bold text-purple-300">📖 Transcripción Rápida de Libro Físico</h3>
                <form onSubmit={handleGuardarLibro} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
                  <div>
                    <h3 className="text-lg font-bold text-white">Registro de Libro Físico (Histórico)</h3>
                    <p className="text-xs text-slate-400">Carga estructurada por paciente y biológico aplicado</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Nombres *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Carlos José"
                        value={libroForm.nombres}
                        onChange={(e) => setLibroForm({ ...libroForm, nombres: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Apellidos *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: Pérez Gómez"
                        value={libroForm.apellidos}
                        onChange={(e) => setLibroForm({ ...libroForm, apellidos: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Tipo de Cédula *</label>
                      <select
                        value={libroForm.tipoCedula}
                        onChange={(e) => setLibroForm({ ...libroForm, tipoCedula: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      >
                        <option value="propia">Cédula Propia</option>
                        <option value="representante">Cédula Representante (Niño/RN)</option>
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Cédula (la que aplique) *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej: V-25123456"
                        value={libroForm.cedula}
                        onChange={(e) => setLibroForm({ ...libroForm, cedula: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>

                    {libroForm.tipoCedula === "representante" ? (
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-300">Sufijo Familiar</label>
                        <select
                          value={libroForm.sufijoFamiliar}
                          onChange={(e) => setLibroForm({ ...libroForm, sufijoFamiliar: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                        >
       <option value="H1">H1 (1er hijo/dependiente)</option>
                <option value="H2">H2 (2do hijo/dependiente)</option>
                <option value="H3">H3 (3er hijo/dependiente)</option>
                <option value="H4">H4 (4to hijo/dependiente)</option>
                <option value="H5">H5 (5to hijo/dependiente)</option>
                <option value="H6">H6 (6to hijo/dependiente)</option>
                        </select>
                      </div>
                    ) : (
                      
                      <div>
                        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3 mt-3">
                <label className="flex items-center gap-2.5 text-xs text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={esInclusion}
                    onChange={(e) => {
                      setEsInclusion(e.target.checked);
                      if (!e.target.checked) setPaisInclusion("");
                    }}
                    className="rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500"
                  />
                  <span className="font-semibold text-indigo-300">
                    🌎 Registro por Inclusión (Transcripción de tarjeta extranjera / antecedente fuera de Venezuela)
                  </span>
                </label>

                {esInclusion && (
                  <div>
                    <label className="block text-[10px] text-slate-400 uppercase mb-1">
                      País donde se aplicaron las dosis previas *
                    </label>
                    <input
                      type="text"
                      required={esInclusion}
                      placeholder="Ej: Colombia, Brasil, Ecuador, Perú, Chile, España..."
                      value={paisInclusion}
                      onChange={(e) => setPaisInclusion(e.target.value)}
                      className="w-full bg-slate-900 border border-indigo-700/60 rounded-xl px-3 py-2 text-white text-xs"
                    />
                  </div>
                )}
              </div>
                        <label className="mb-1 block text-xs font-medium text-slate-300">Fecha de Nacimiento</label>
                        <input
                          type="date"
                          value={libroForm.fechaNacimiento}
                          onChange={(e) => setLibroForm({ ...libroForm, fechaNacimiento: e.target.value })}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                        />
                      </div>
                    )}
                  </div>


                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Biológico Aplicado *</label>
                      <select
                        value={libroForm.biologico}
                        onChange={(e) => setLibroForm({ ...libroForm, biologico: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      >
                        {BIOLOGICOS_PAI.map((bio) => (
                          <option key={bio} value={bio}>
                            {bio}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Número de Dosis *</label>
                      <select
                        value={libroForm.numeroDosis}
                        onChange={(e) => setLibroForm({ ...libroForm, numeroDosis: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      >
                        <option value="1">1ra Dosis / Única</option>
                        <option value="2">2da Dosis</option>
                        <option value="3">3ra Dosis</option>
                        <option value="4">1er Refuerzo (4ta)</option>
                        <option value="5">2do Refuerzo (5ta)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Lote del Biológico</label>
                      <input
                        type="text"
                        placeholder="Ej: LOTE-2026A"
                        value={libroForm.lote}
                        onChange={(e) => setLibroForm({ ...libroForm, lote: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm uppercase text-white outline-none focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">Fecha de Colocación *</label>
                      <input
                        type="date"
                        required
                        value={libroForm.fechaColocacion}
                        onChange={(e) => setLibroForm({ ...libroForm, fechaColocacion: e.target.value })}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-white outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  {mensajeLibro && (
                    <div
                      className={`rounded-xl border px-3 py-2.5 text-xs ${
                        mensajeLibro.tipo === "ok"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                          : "border-rose-500/40 bg-rose-500/10 text-rose-300"
                      }`}
                    >
                      {mensajeLibro.texto}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      type="submit"
                      disabled={guardandoLibro}
                      className="flex-1 rounded-xl bg-purple-600 py-3 text-sm font-bold text-white transition hover:bg-purple-500 disabled:opacity-50"
                    >
                      {guardandoLibro ? "Guardando datos..." : "Guardar datos"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLibroForm({
                          nombres: "",
                          apellidos: "",
                          tipoCedula: "propia",
                          cedula: "",
                          sufijoFamiliar: "-01",
                          fechaNacimiento: "",
                          biologico: "Pentavalente (DPT+HB+Hib)",
                          numeroDosis: "1",
                          lote: "",
                          fechaColocacion: "",
                          condicionEsquema: "Al dia",
                        });
                        setMensajeLibro(null);
                      }}
                      className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-700"
                    >
                      Nuevo paciente
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* VISTA: MIS DOSIS + TARJETA PDF */}
            {usuarioAutenticado.rol === "Vacunador de Campo" && pestañaActiva === "reportePersonal" && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                <h3 className="text-lg font-bold text-white">📊 Dosis Aplicadas por Mí ({misRegistros.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {misRegistros.map((r) => (
                    <div key={r.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 relative flex flex-col justify-between">
                      <div>
                        {r.fotoPacienteUrl && (
                          <div className="float-right ml-2 mb-1 w-11 h-11 rounded-lg overflow-hidden border border-cyan-500">
                            <img src={r.fotoPacienteUrl} alt="Paciente" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="font-bold text-white">{r.pacienteNombre}</div>
                        <div className="text-[10px] text-cyan-400 font-mono">Doc: {r.pacienteDocumento}</div>
{r.representante && (
                      <div className="text-[10px] text-purple-300">Rep: {r.representante.nombre} (C.I: {r.representante.cedula})</div>
                    )}
                    {r.esInclusion && (
                      <div className="text-[10px] text-indigo-300 font-semibold">
                        🌎 Inclusión: {r.paisInclusion || "País no especificado"}
                      </div>
                    )}
                        <div className="text-slate-300 text-[10px]">📍 {r.direccion?.parroquia} - {r.direccion?.sector}</div>
                        <div className="text-emerald-400 font-mono font-semibold mt-1">{r.vacuna} ({r.dosis})</div>
                        <div className="text-amber-300 text-[10px]">🏷️ Lote: {r.lote} | Prox. Cita: {r.proximaCita || "N/A"}</div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTarjetaPacienteDoc(r.pacienteDocumento)}
                        className="mt-2 w-full bg-slate-900 hover:bg-cyan-950 text-cyan-300 border border-cyan-800/60 py-1.5 rounded-lg text-[11px] font-bold transition-all"
                      >
                        🪪 Tarjeta / Exportar PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
{/* VISTA: COORDINADOR ASIC (CONSOLIDADO) */}
            {usuarioAutenticado.rol === "Coordinador Municipal / ASIC" && pestañaActiva === "coordinacion" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase">Dosis Aplicadas en ASIC</span>
                    <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{registrosJurisdiccionASIC.length} Dosis</span>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase">Vacunadores Activos</span>
                    <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">{equipoVacunadoresASIC.length} Funcionarios</span>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase">Alertas ESAVI</span>
                    <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">{registrosJurisdiccionASIC.filter(r => r.tieneEsavi).length} Casos</span>
                  </div>
                </div>
<div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-cyan-400 uppercase">
                        🔎 Filtros Avanzados y Exportación ({registrosASICFiltrados.length} registros)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Filtra por rango de fecha, biológico, sexo, grupo etario, parroquia o palabra clave.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFiltroFechaDesde("");
                          setFiltroFechaHasta("");
                          setFiltroBiologico("TODOS");
                          setFiltroSexo("TODOS");
                          setFiltroGrupoEtario("TODOS");
                          setFiltroParroquia("TODAS");
                          setFiltroBusqueda("");
                        }}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl border border-slate-700"
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          exportarRegistrosExcel(
                            registrosASICFiltrados,
                            `PAI_ASIC_${usuarioAutenticado.municipio || "Consolidado"}`
                          )
                        }
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl transition-all"
                      >
                        📊 Exportar Excel
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Desde</label>
                      <input
                        type="date"
                        value={filtroFechaDesde}
                        onChange={(e) => setFiltroFechaDesde(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Hasta</label>
                      <input
                        type="date"
                        value={filtroFechaHasta}
                        onChange={(e) => setFiltroFechaHasta(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Biológico</label>
                      <select
                        value={filtroBiologico}
                        onChange={(e) => setFiltroBiologico(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODOS">Todos los biológicos</option>
                        {CATALOGO_BIOLOGICOS_PAI.map((b: any) => (
                          <option key={b.nombre} value={b.nombre}>
                            {b.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Sexo</label>
                      <select
                        value={filtroSexo}
                        onChange={(e) => setFiltroSexo(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODOS">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Grupo Etario</label>
                      <select
                        value={filtroGrupoEtario}
                        onChange={(e) => setFiltroGrupoEtario(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODOS">Todos los grupos</option>
                        <option value="Recién Nacido (0-28 días)">Recién Nacido (0-28 días)</option>
                        <option value="Lactante (< 1 Año)">Lactante (&lt; 1 Año)</option>
                        <option value="Niños (1 a 5 Años)">Niños (1 a 5 Años)</option>
                        <option value="Adolescente / Adulto">Adolescente / Adulto</option>
                        <option value="Gestante / Embarazada">Gestante / Embarazada</option>
                        <option value="Transcripción Libro Físico">Transcripción Libro Físico</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Parroquia</label>
                      <select
                        value={filtroParroquia}
                        onChange={(e) => setFiltroParroquia(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODAS">Todas las parroquias</option>
                        {parroquiasDisponiblesUser.map((p: string) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Buscar (Paciente, Cédula, Sector, Lote)</label>
                      <input
                        type="text"
                        placeholder="Ej: Valle Guanape, V-25..., Pentavalente..."
                        value={filtroBusqueda}
                        onChange={(e) => setFiltroBusqueda(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-md font-bold text-cyan-400">👥 Funcionarios a Cargo — ASIC {usuarioAutenticado.municipio}</h3>
                      <p className="text-xs text-slate-400">Equipo registrado y activo bajo tu jurisdicción municipal/ASIC.</p>
                    </div>
                    <span className="text-xs font-mono bg-slate-950 border border-slate-800 text-cyan-300 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                      Total: {equipoVacunadoresASIC.length}
                    </span>
                  </div>

                  {equipoVacunadoresASIC.length === 0 ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                      No hay funcionarios registrados en este ASIC todavía.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-cyan-400 uppercase">
                          <tr>
                            <th className="p-3">Funcionario</th>
                            <th className="p-3">Cédula / Usuario</th>
                            <th className="p-3">Rol / Cargo</th>
                            <th className="p-3">Establecimiento / Punto</th>
                            <th className="p-3">Estado</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {equipoVacunadoresASIC.map((func: any, idx: number) => (
                            <tr key={func.id || idx} className="hover:bg-slate-950/60">
                              <td className="p-3 font-semibold text-white">
                                {func.nombre || func.nombreCompleto || func.nombres || "Funcionario sin nombre"}
                              </td>
                              <td className="p-3 font-mono text-slate-300">
                                {func.cedula || func.documento || func.correo || func.email || "—"}
                              </td>
                              <td className="p-3 text-cyan-300">
                                {func.rol || func.cargo || "Vacunador / Operativo"}
                              </td>
                              <td className="p-3 text-slate-300">
                                {func.establecimiento || func.centro || func.ambulatorio || func.punto || func.municipio || usuarioAutenticado.municipio || "—"}
                              </td>
                              <td className="p-3">
                                <span className="inline-block bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-800 font-bold">
                                  {func.estatus || func.activo === false ? (func.estatus || "Inactivo") : "Activo"}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-md font-bold text-emerald-400">
                        💉 Dosis Registradas en ASIC ({registrosASICFiltrados.length})
                      </h3>
                      <p className="text-xs text-slate-400">
                        Resultados según los filtros activos en la jurisdicción de {usuarioAutenticado.municipio}.
                      </p>
                    </div>
                    <span className="text-xs font-mono bg-slate-950 border border-slate-800 text-emerald-300 px-3 py-1.5 rounded-lg self-start sm:self-auto">
                      Mostrando: {registrosASICFiltrados.length} de {registrosJurisdiccionASIC.length}
                    </span>
                  </div>

                  {registrosASICFiltrados.length === 0 ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                      No hay dosis que coincidan con los filtros seleccionados.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-emerald-400 uppercase">
                          <tr>
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Paciente / ID</th>
                            <th className="p-3">Demografía</th>
                            <th className="p-3">Ubicación</th>
                            <th className="p-3">Biológico / Dosis</th>
                            <th className="p-3">ESAVI</th>
                            <th className="p-3">Tarjeta</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {registrosASICFiltrados.map((r: any) => (
                            <tr key={r.id} className="hover:bg-slate-950/60">
                              <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{r.fecha}</td>
                              <td className="p-3">
                                <div className="font-semibold text-white">{r.pacienteNombre}</div>
                                <div className="text-[10px] font-mono text-cyan-400">{r.pacienteDocumento}</div>
                              </td>
                              <td className="p-3">
                                <div className="text-slate-200">{r.pacienteSexo || "—"}</div>
                                <div className="text-[10px] text-slate-400">{r.grupoEtario || "—"}</div>
                              </td>
                              <td className="p-3">
                                <div className="text-slate-200">{r.direccion?.parroquia || r.parroquiaJurisdiccion || "—"}</div>
                                <div className="text-[10px] text-cyan-300">{r.direccion?.sector || "—"}</div>
                              </td>
                              <td className="p-3">
                                <div className="font-semibold text-emerald-300">{r.vacuna}</div>
                                <div className="text-[10px] font-mono text-slate-400">
                                  {r.dosis} {r.lote ? `• Lote: ${r.lote}` : ""}
                                </div>
                              </td>
                              <td className="p-3">
                                {r.tieneEsavi ? (
                                  <span className="inline-block bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px] border border-amber-700 font-bold">
                                    {r.esaviDetalle?.severidad || "ESAVI"}
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-500">No</span>
                                )}
                              </td>
                              <td className="p-3">
                                <button
                                  type="button"
                                  onClick={() => setTarjetaPacienteDoc(r.pacienteDocumento)}
                                  className="bg-slate-800 hover:bg-cyan-950 text-cyan-300 border border-slate-700 px-2.5 py-1 rounded-lg text-[10px] font-bold"
                                >
                                  🪪 Ver
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
{/* VISTA: COORDINADOR REGIONAL */}
            {usuarioAutenticado.rol === "Coordinador Regional PAI" && pestañaActiva === "regional" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase">Dosis Aplicadas en {usuarioAutenticado.estado}</span>
                    <span className="text-2xl font-bold font-mono text-indigo-400 mt-1 block">{registrosEstadales.length} Dosis</span>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase">Personal Registrado</span>
                    <span className="text-2xl font-bold font-mono text-cyan-400 mt-1 block">{listaPersonal.length} Funcionarios</span>
                  </div>
                  <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                    <span className="text-xs text-slate-400 uppercase">Alertas ESAVI Estadales</span>
                    <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">{registrosEstadales.filter((r: any) => r.tieneEsavi).length} Casos</span>
                  </div>
                </div>

                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-bold text-indigo-400 uppercase">
                        🔎 Filtros Estadales y Exportación ({registrosRegionalFiltrados.length} registros)
                      </h3>
                      <p className="text-xs text-slate-400">
                        Filtra por fecha, biológico, sexo, grupo etario o búsqueda en {usuarioAutenticado.estado}.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setFiltroFechaDesde("");
                          setFiltroFechaHasta("");
                          setFiltroBiologico("TODOS");
                          setFiltroSexo("TODOS");
                          setFiltroGrupoEtario("TODOS");
                          setFiltroParroquia("TODAS");
                          setFiltroBusqueda("");
                        }}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-xl border border-slate-700"
                      >
                        Limpiar
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          exportarRegistrosExcel(
                            registrosRegionalFiltrados,
                            `PAI_REGIONAL_${usuarioAutenticado.estado || "Estadal"}`
                          )
                        }
                        className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3.5 py-2 rounded-xl transition-all"
                      >
                        📊 Exportar Excel
                      </button>
                      <button
  type="button"
  onClick={() =>
    exportarReportePDF(
      registrosRegionalFiltrados,
      `Reporte PAI Regional — ${usuarioAutenticado?.estado || "Estadal"}`
    )
  }
  className="text-xs bg-rose-600 hover:bg-rose-500 text-white font-bold px-3.5 py-2 rounded-xl transition-all"
>
  📄 Exportar PDF
</button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Desde</label>
                      <input
                        type="date"
                        value={filtroFechaDesde}
                        onChange={(e) => setFiltroFechaDesde(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Hasta</label>
                      <input
                        type="date"
                        value={filtroFechaHasta}
                        onChange={(e) => setFiltroFechaHasta(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Biológico</label>
                      <select
                        value={filtroBiologico}
                        onChange={(e) => setFiltroBiologico(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODOS">Todos los biológicos</option>
                        {CATALOGO_BIOLOGICOS_PAI.map((b: any) => (
                          <option key={b.nombre} value={b.nombre}>
                            {b.nombre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Sexo</label>
                      <select
                        value={filtroSexo}
                        onChange={(e) => setFiltroSexo(e.target.value as any)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODOS">Todos</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Grupo Etario</label>
                      <select
                        value={filtroGrupoEtario}
                        onChange={(e) => setFiltroGrupoEtario(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      >
                        <option value="TODOS">Todos los grupos</option>
                        <option value="Recién Nacido (0-28 días)">Recién Nacido (0-28 días)</option>
                        <option value="Lactante (< 1 Año)">Lactante (&lt; 1 Año)</option>
                        <option value="Niños (1 a 5 Años)">Niños (1 a 5 Años)</option>
                        <option value="Adolescente / Adulto">Adolescente / Adulto</option>
                        <option value="Gestante / Embarazada">Gestante / Embarazada</option>
                        <option value="Transcripción Libro Físico">Transcripción Libro Físico</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-[10px] text-slate-400 uppercase mb-1">Buscar (Municipio, Parroquia, Paciente, Biológico)</label>
                      <input
                        type="text"
                        placeholder="Ej: Carvajal, Valle Guanape, BCG..."
                        value={filtroBusqueda}
                        onChange={(e) => setFiltroBusqueda(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-md font-bold text-indigo-400">
                      📋 Consolidado Estadal Filtrado ({registrosRegionalFiltrados.length})
                    </h3>
                    <span className="text-xs font-mono text-slate-400">
                      Total estadal: {registrosEstadales.length}
                    </span>
                  </div>

                  {registrosRegionalFiltrados.length === 0 ? (
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                      No hay registros estadales con los filtros actuales.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-indigo-400 uppercase">
                          <tr>
                            <th className="p-3">Fecha</th>
                            <th className="p-3">Municipio / ASIC</th>
                            <th className="p-3">Paciente / ID</th>
                            <th className="p-3">Biológico / Dosis</th>
                            <th className="p-3">ESAVI</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {registrosRegionalFiltrados.map((r: any) => (
                            <tr key={r.id} className="hover:bg-slate-950/60">
                              <td className="p-3 font-mono text-slate-400 whitespace-nowrap">{r.fecha}</td>
                              <td className="p-3">
                                <div className="font-semibold text-white">{r.municipioJurisdiccion || r.direccion?.municipio || "—"}</div>
                                <div className="text-[10px] text-slate-400">{r.parroquiaJurisdiccion || r.direccion?.parroquia || "—"}</div>
                              </td>
                              <td className="p-3">
                                <div className="font-semibold text-white">{r.pacienteNombre}</div>
                                <div className="text-[10px] font-mono text-cyan-400">{r.pacienteDocumento}</div>
                              </td>
                              <td className="p-3">
                                <div className="text-emerald-300 font-semibold">{r.vacuna}</div>
                                <div className="text-[10px] font-mono text-slate-400">{r.dosis}</div>
                              </td>
                              <td className="p-3">
                                {r.tieneEsavi ? (
                                  <span className="inline-block bg-amber-950 text-amber-300 px-2 py-0.5 rounded text-[10px] border border-amber-700 font-bold">
                                    Sí
                                  </span>
                                ) : (
                                  <span className="text-[10px] text-slate-500">No</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="w-full max-w-6xl mx-auto text-center text-xs text-slate-600 border-t border-slate-900 pt-4 print:hidden">
        Sistema PAI Venezuela &bull; Módulo Oficial con Cédula Virtual, Ficha de ASIC y Cadenas de Frío
      </footer>
    </main>
  );
}
