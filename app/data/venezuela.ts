// data/venezuela.ts

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
      { nombre: "Alto Orinoco", parroquias: ["La Esmeralda", "Huachamacare", "Marueta", "Mavaca", "Sierra Parima"] },
      { nombre: "Atabapo", parroquias: ["San Fernando de Atabapo", "Ucata", "Yavita", "Canaima"] },
      { nombre: "Atures", parroquias: ["Puerto Ayacucho", "Fernando Girón Tovar", "Luis Alberto Gómez", "Pahueña", "Platanillal"] },
      { nombre: "Autana", parroquias: ["Isla Ratón", "Guayapo", "Munduapo", "Samariapo", "Sipapo"] },
      { nombre: "Manapiare", parroquias: ["San Juan de Manapiare", "Alto Ventuari", "Bajo Ventuari", "Medio Ventuari"] },
      { nombre: "Maroa", parroquias: ["Maroa", "Victorino"] },
      { nombre: "Río Negro", parroquias: ["San Carlos de Río Negro", "Casiquiare", "Cocui", "Solano"] }
    ]
  },
  {
    estado: "Anzoátegui",
    municipios: [
      { nombre: "Carvajal (Valle Guanape)", parroquias: ["Valle Guanape", "Santa Bárbara"] },
      { nombre: "Bolívar (Barcelona)", parroquias: ["Barcelona", "El Carmen", "San Cristóbal", "Naricual", "Bergantín"] },
      { nombre: "Sotillo (Puerto La Cruz)", parroquias: ["Puerto La Cruz", "Pozuelos"] },
      { nombre: "Anaco", parroquias: ["Anaco", "San Joaquín"] },
      { nombre: "Freites (Cantaura)", parroquias: ["Cantaura", "Santa Rosa", "Urica"] },
      { nombre: "Miranda (Pariaguán)", parroquias: ["Pariaguán", "Atapirire", "Boca del Pao"] },
      { nombre: "Guanipa", parroquias: ["San José de Guanipa"] },
      { nombre: "Píritu", parroquias: ["Píritu", "San Miguel"] },
      { nombre: "Peñalver", parroquias: ["Puerto Píritu", "Sucre", "San Miguel"] },
      { nombre: "Aragua de Barcelona", parroquias: ["Aragua de Barcelona", "Cachipo"] },
      { nombre: "Bruzual (Clarines)", parroquias: ["Clarines", "Guanape", "Sabana de Uchire"] },
      { nombre: "Cajigal (Onoto)", parroquias: ["Onoto", "San Pablo"] },
      { nombre: "Independencia (Soledad)", parroquias: ["Soledad", "Mamo"] },
      { nombre: "Libertad (San Mateo)", parroquias: ["San Mateo", "El Carito"] },
      { nombre: "McGregor (El Chaparro)", parroquias: ["El Chaparro"] },
      { nombre: "Monagas (Mapire)", parroquias: ["Mapire", "Piar", "Santa Clara", "San Diego de Cabrutica"] },
      { nombre: "Santa Ana", parroquias: ["Santa Ana", "Pueblo Nuevo"] },
      { nombre: "Capistrano (Boca de Uchire)", parroquias: ["Boca de Uchire", "Boca del Píritu"] },
      { nombre: "Guanta", parroquias: ["Guanta", "Chorrerón"] },
      { nombre: "Urbaneja (Lechería)", parroquias: ["Lechería", "El Morro"] }
    ]
  },
  {
    estado: "Apure",
    municipios: [
      { nombre: "Achaguas", parroquias: ["Achaguas", "Apurito", "El Yagual", "Guachara", "Mantecal", "San Rafael de Atamaica"] },
      { nombre: "Biruaca", parroquias: ["Biruaca"] },
      { nombre: "Muñoz", parroquias: ["Bruzual", "Mucuritas", "San Vicente"] },
      { nombre: "Páez (Guasdualito)", parroquias: ["Guasdualito", "Aramendi", "El Amparo", "San Camilo", "Urdaneta"] },
      { nombre: "Pedro Camejo (San Juan de Payara)", parroquias: ["San Juan de Payara", "Codazzi", "Cunaviche"] },
      { nombre: "Rómulo Gallegos (Elorza)", parroquias: ["Elorza", "La Trinidad"] },
      { nombre: "San Fernando", parroquias: ["San Fernando de Apure", "El Recreo", "Peñalver", "San Rafael de Atamaica"] }
    ]
  },
  {
    estado: "Aragua",
    municipios: [
      { nombre: "Girardot (Maracay)", parroquias: ["Madre María de San José", "Joaquín Crespo", "José Casanova Godoy", "Andrés Eloy Blanco", "Los Tacariguas", "Las Delicias", "Choroní"] },
      { nombre: "Bolívar (San Mateo)", parroquias: ["San Mateo"] },
      { nombre: "Camatagua", parroquias: ["Camatagua", "Carmen de Cura"] },
      { nombre: "José Ángel Lamas (Santa Cruz)", parroquias: ["Santa Cruz"] },
      { nombre: "José Félix Ribas (La Victoria)", parroquias: ["Castor Nieves Ríos", "Las Guacamayas", "Pao de Zárate", "Zuata"] },
      { nombre: "José Rafael Revenga (El Consejo)", parroquias: ["El Consejo"] },
      { nombre: "Libertador (Palo Negro)", parroquias: ["Palo Negro", "San Martin de Porres"] },
      { nombre: "Mario Briceño Iragorry (El Limón)", parroquias: ["El Limón", "Caña de Azúcar"] },
      { nombre: "Ocumare de la Costa de Oro", parroquias: ["Ocumare de la Costa"] },
      { nombre: "San Casimiro", parroquias: ["San Casimiro", "Güiripa", "Ollas de Caramacate", "Valle Morín"] },
      { nombre: "San Sebastián", parroquias: ["San Sebastián"] },
      { nombre: "Santiago Mariño (Turmero)", parroquias: ["Palo Anao", "Turmero", "Arevalo Aponte", "Chuao", "Samán Tarazonero"] },
      { nombre: "Sucre (Cagua)", parroquias: ["Cagua", "Bella Vista"] },
      { nombre: "Tovar (Colonia Tovar)", parroquias: ["Colonia Tovar"] },
      { nombre: "Urdaneta (Barbacoas)", parroquias: ["Barbacoas", "San Francisco de Cara", "Taguay", "Las Peñitas"] },
      { nombre: "Zamora (Villa de Cura)", parroquias: ["Villa de Cura", "Magdalena", "San Francisco de Asís", "Valles de Tucutunemo"] }
    ]
  },
  {
    estado: "Barinas",
    municipios: [
      { nombre: "Barinas", parroquias: ["Barinas", "Alto Barinas", "Corazón de Jesús", "Rómulo Betancourt", "San Silvestre", "Santa Inés", "Santa Lucía"] },
      { nombre: "Alberto Arvelo Torrealba (Sabaneta)", parroquias: ["Sabaneta", "Juan Antonio Rodríguez Domínguez"] },
      { nombre: "Andrés Eloy Blanco (El Cantón)", parroquias: ["El Cantón", "Santa Cruz de Guacas", "Puerto Vivas"] },
      { nombre: "Antonio José de Sucre (Socopó)", parroquias: ["Ticoporo", "Andrés Bello", "Nicolas Pulido"] },
      { nombre: "Arismendi", parroquias: ["Arismendi", "Guadarrama", "La Union", "San Antonio"] },
      { nombre: "Bolívar (Barinitas)", parroquias: ["Barinitas", "Altamira de Cáceres", "Calderas"] },
      { nombre: "Cruz Paredes (Barrancas)", parroquias: ["Barrancas", "El Socorro", "Masparro"] },
      { nombre: "Ezequiel Zamora (Santa Bárbara)", parroquias: ["Santa Bárbara", "Pedro Briceño Méndez", "Ramón Ignacio Méndez"] },
      { nombre: "Obispos", parroquias: ["Obispos", "El Real", "La Luz", "Los Guasimitos"] },
      { nombre: "Pedraza (Ciudad Bolivia)", parroquias: ["Ciudad Bolivia", "Ignacio Briceño", "Páez", "José Félix Ribas"] },
      { nombre: "Rojas (Libertad)", parroquias: ["Libertad", "Dolores", "Santa Rosa", "Palacio Fajardo"] },
      { nombre: "Sosa (Ciudad de Nutrias)", parroquias: ["Ciudad de Nutrias", "El Nula", "Puerto Nutrias", "Santa Catalina"] }
    ]
  },
  {
    estado: "Bolívar",
    municipios: [
      { nombre: "Caroní (Ciudad Guayana)", parroquias: ["Cachamay", "Chirica", "Dalla Costa", "Unare", "Simón Bolívar", "Universidad", "Yocoima", "Pozo Verde"] },
      { nombre: "Angostura del Orinoco (Ciudad Bolívar)", parroquias: ["Catedral", "Zea", "Orinoco", "Agua Salada", "La Sabanita", "Panapana", "Marhuanta", "Santa Inés"] },
      { nombre: "Cedeño (Caicara del Orinoco)", parroquias: ["Caicara del Orinoco", "Ascensión Farreras", "Guaniamo", "Pijiguaos"] },
      { nombre: "El Callao", parroquias: ["El Callao"] },
      { nombre: "Gran Sabana (Santa Elena de Uairén)", parroquias: ["Santa Elena de Uairén", "Ikabarú"] },
      { nombre: "Piar (Upata)", parroquias: ["Upata", "Andrés Eloy Blanco", "Pedro Cova"] },
      { nombre: "Padre Pedro Chien (El Palmar)", parroquias: ["El Palmar"] },
      { nombre: "Roscio (Guasipati)", parroquias: ["Guasipati", "Salóm"] },
      { nombre: "Sifontes (Tumeremo)", parroquias: ["Tumeremo", "Dalla Costa", "San Isidro"] },
      { nombre: "Sucre (Maripa)", parroquias: ["Maripa", "Aripao", "Guarataro", "Las Majadas", "Moitaco"] },
      { nombre: "Angostura (Ciudad Piar)", parroquias: ["Ciudad Piar", "San Francisco", "Guri"] }
    ]
  },
  {
    estado: "Carabobo",
    municipios: [
      { nombre: "Valencia", parroquias: ["Candelaria", "Catedral", "El Socorro", "Miguel Peña", "San Blas", "San José", "Santa Rosa", "Rafael Urdaneta", "Negro Primero"] },
      { nombre: "Bejuma", parroquias: ["Bejuma", "Canoabo", "Simón Bolívar"] },
      { nombre: "Carlos Arvelo (Güigüe)", parroquias: ["Güigüe", "Carabobo", "Tacarigua"] },
      { nombre: "Diego Ibarra (Mariara)", parroquias: ["Mariara", "Aguas Calientes"] },
      { nombre: "Guacara", parroquias: ["Guacara", "Ciudad Alianza", "Yagua"] },
      { nombre: "Juan José Mora (Morón)", parroquias: ["Morón", "Urama"] },
      { nombre: "Libertador (Tocuyito)", parroquias: ["Tocuyito", "Independencia"] },
      { nombre: "Los Guayos", parroquias: ["Los Guayos"] },
      { nombre: "Miranda", parroquias: ["Miranda"] },
      { nombre: "Montalbán", parroquias: ["Montalbán"] },
      { nombre: "Naguanagua", parroquias: ["Naguanagua"] },
      { nombre: "Puerto Cabello", parroquias: ["Puerto Cabello", "Patanemo", "Democracia", "Fraternidad", "Goaigoaza", "Bartolomé Salom", "Juan José Flores"] },
      { nombre: "San Diego", parroquias: ["San Diego"] }
    ]
  },
  {
    estado: "Cojedes",
    municipios: [
      { nombre: "Ezequiel Zamora (San Carlos)", parroquias: ["San Carlos de Cojedes", "Juan de Mata Suárez", "El Amparo"] },
      { nombre: "Anzoátegui", parroquias: ["Cojedes", "Juan Ignacio de Tovar"] },
      { nombre: "Falcón (El Baúl)", parroquias: ["El Baúl", "La Aguadita"] },
      { nombre: "Girardot (El Pao)", parroquias: ["El Pao", "Sucre"] },
      { nombre: "Lima Blanco (Macapo)", parroquias: ["Macapo", "La Pica"] },
      { nombre: "Pao de San Juan Bautista", parroquias: ["El Pao"] },
      { nombre: "Ricaurte (Libertad)", parroquias: ["Libertad", "El Amparo"] },
      { nombre: "Rómulo Gallegos (Las Vegas)", parroquias: ["Las Vegas"] },
      { nombre: "Tinaco", parroquias: ["Tinaco", "General en Jefe José Laurencio Silva"] }
    ]
  },
  {
    estado: "Delta Amacuro",
    municipios: [
      { nombre: "Tucupita", parroquias: ["Tucupita", "San José", "San Rafael", "Monseñor Argimiro García", "Punta Culebra", "Imataca"] },
      { nombre: "Antonio Díaz (Curiapo)", parroquias: ["Curiapo", "Almirante Luis Brión", "Francisco Aniceto Lugo", "Manuel Renaud", "Padre Barral"] },
      { nombre: "Casacoima", parroquias: ["Sierra Imataca", "Acuema", "Jiménez", "Rómulo Gallegos"] },
      { nombre: "Pedernales", parroquias: ["Pedernales", "Luis Beltrán Prieto Figueroa"] }
    ]
  },
  {
    estado: "Distrito Capital",
    municipios: [
      { 
        nombre: "Libertador (Caracas)", 
        parroquias: [
          "Antímano", "Coche", "El Caricuao", "El Cují", "El Paraíso", "El Recreo", "El Valle", "La Candelaria", 
          "La Pastora", "La Vega", "Macarao", "San Bernardino", "San José", "San Juan", "San Pedro", "Santa Rosalía", 
          "Santa Teresa", "Sucre (Catia)", "23 de Enero"
        ] 
      }
    ]
  },
  {
    estado: "Falcón",
    municipios: [
      { nombre: "Miranda (Coro)", parroquias: ["Garantía Coro", "San Antonio", "Río Seco", "Sabaneta", "Mitare", "San Gabriel"] },
      { nombre: "Carirubana (Punto Fijo)", parroquias: ["Norte", "Carirubana", "Punta Cardón", "Santa Ana"] },
      { nombre: "Acosta (San Juan de los Cayos)", parroquias: ["San Juan de los Cayos", "Capadare", "La Pastora"] },
      { nombre: "Bolívar (San Luis)", parroquias: ["San Luis", "Aracua", "La Peña"] },
      { nombre: "Buchivacoa (Capatárida)", parroquias: ["Capatárida", "Bariro", "Borojó", "Guajiro", "Zazárida"] },
      { nombre: "Cacique Manaure (Yaracal)", parroquias: ["Yaracal"] },
      { nombre: "Colina (La Vela)", parroquias: ["La Vela de Coro", "Acurigua", "Las Calderas"] },
      { nombre: "Dabajuro", parroquias: ["Dabajuro"] },
      { nombre: "Democracia (Pedregal)", parroquias: ["Pedregal", "Agua Clara", "Piedra Grande"] },
      { nombre: "Falcón", parroquias: ["Pueblo Nuevo", "Adaure", "Adícora", "Baraived", "Buena Vista", "Jadacaquiva", "El Vínculo"] },
      { nombre: "Federación (Churuguara)", parroquias: ["Churuguara", "Agua Larga", "El Paují", "Mapararí"] },
      { nombre: "Los Taques", parroquias: ["Santa Cruz de Los Taques", "Judibana"] },
      { nombre: "Monseñor Iturriza (Chichiriviche)", parroquias: ["Boca de Aroa", "Chichiriviche"] },
      { nombre: "Silva (Tucacas)", parroquias: ["Tucacas", "Boca de Aroa"] },
      { nombre: "Zamora (Puerto Cumarebo)", parroquias: ["Puerto Cumarebo", "La Ciénaga", "Pueblo Cumarebo"] }
    ]
  },
  {
    estado: "Guárico",
    municipios: [
      { nombre: "Roscio (San Juan de los Morros)", parroquias: ["San Juan de los Morros", "Cantagallo", "Parapara"] },
      { nombre: "Infante (Valle de la Pascua)", parroquias: ["Valle de la Pascua", "Espino"] },
      { nombre: "Miranda (Calabozo)", parroquias: ["Calabozo", "El Calvario", "El Paragüito", "Guayabal"] },
      { nombre: "Monagas (Altagracia de Orituco)", parroquias: ["Altagracia de Orituco", "Lezama", "Libertad de Orituco", "San Francisco de Macaira"] },
      { nombre: "Camaguán", parroquias: ["Camaguán", "Puerto Miranda", "Uverito"] },
      { nombre: "Chaguaramas", parroquias: ["Chaguaramas"] },
      { nombre: "El Socorro", parroquias: ["El Socorro"] },
      { nombre: "Las Mercedes", parroquias: ["Las Mercedes", "Cabruta", "Santa Rita"] },
      { nombre: "Ortiz", parroquias: ["Ortiz", "San Francisco de Tiznados", "San José de Tiznados"] },
      { nombre: "Ribas (Tucupido)", parroquias: ["Tucupido", "San Rafael de Laya"] },
      { nombre: "Zaraza", parroquias: ["Zaraza", "San José de Unare"] }
    ]
  },
  {
    estado: "Lara",
    municipios: [
      { nombre: "Iribarren (Barquisimeto)", parroquias: ["Catedral", "Concepción", "El Cují", "Juares", "Aguedo Felipe Alvarado", "Buena Vista", "Ana Soto"] },
      { nombre: "Palavecino (Cabudare)", parroquias: ["Cabudare", "José Gregorio Bastidas", "Agua Viva"] },
      { nombre: "Torres (Carora)", parroquias: ["Carora", "Altagracia", "Chiquinquirá", "El Blanco", "Lara", "Manuel Morillo", "Trinidad Samuel"] },
      { nombre: "Crespo (Duaca)", parroquias: ["Freitez", "José María Blanco"] },
      { nombre: "Jiménez (Quíbor)", parroquias: ["Juan Bautista Rodríguez", "Cuara", "Diego de Lozada", "Paraíso de Charaima", "Tintorero"] },
      { nombre: "Morán (El Tocuyo)", parroquias: ["Bolívar", "Anzoátegui", "Guárico", "Hilario Luna y Luna", "La Candelaria"] },
      { nombre: "Simón Planas (Sarare)", parroquias: ["Sarare", "Buría", "Gustavo Vega"] },
      { nombre: "Urdaneta (Siquisique)", parroquias: ["Siquisique", "Moroturo", "Xaguas", "San Miguel"] }
    ]
  },
  {
    estado: "Mérida",
    municipios: [
      { nombre: "Libertador (Mérida)", parroquias: ["El Sagrario", "Milla", "Osuna Rodríguez", "Sagrario", "Gonzalo Picón Febres", "Mariano Picón Salas", "Jacinto Plaza", "Domingo Peña"] },
      { nombre: "Alberto Adriani (El Vigía)", parroquias: ["Rómulo Betancourt", "Presidente Betancourt", "Presidente Páez", "Gabriel Picón González", "Pulido Méndez"] },
      { nombre: "Campo Elías (Ejido)", parroquias: ["Montalbán", "Fernández Peña", "Acequias", "Jají", "La Mesa", "San José del Sur"] },
      { nombre: "Sucre (Lagunillas)", parroquias: ["Lagunillas", "Chiguará", "Estanques", "San Juan"] },
      { nombre: "Tovar", parroquias: ["Tovar", "El Llano", "San Francisco", "Limoncitos"] },
      { nombre: "Rangel (Mucuchíes)", parroquias: ["Mucuchíes", "Cacute", "La Toma", "San Rafael"] },
      { nombre: "Andrés Bello (La Azulita)", parroquias: ["La Azulita"] }
    ]
  },
  {
    estado: "Miranda",
    municipios: [
      { nombre: "Guaicaipuro (Los Teques)", parroquias: ["Los Teques", "Altagracia de la Montaña", "Cecilio Acosta", "El Jarillo", "Paracotos", "San Pedro", "Tácata"] },
      { nombre: "Sucre (Petare)", parroquias: ["Petare", "Caucagüita", "Fila de Mariches", "La Dolorita", "Leoncio Martínez"] },
      { nombre: "Baruta", parroquias: ["Nuestra Señora del Rosario", "El Cafetal", "Las Minas de Baruta"] },
      { nombre: "Chacao", parroquias: ["Chacao"] },
      { nombre: "El Hatillo", parroquias: ["El Hatillo"] },
      { nombre: "Plaza (Guarenas)", parroquias: ["Guarenas"] },
      { nombre: "Zamora (Guatire)", parroquias: ["Guatire", "Bolívar"] },
      { nombre: "Carrizal", parroquias: ["Carrizal"] },
      { nombre: "Los Salias", parroquias: ["San Antonio de los Altos"] },
      { nombre: "Cristóbal Rojas (Charallave)", parroquias: ["Charallave", "Las Brisas"] },
      { nombre: "Independencia (Santa Teresa)", parroquias: ["Santa Teresa del Tuy", "El Cartanal"] },
      { nombre: "Lander (Ocumare)", parroquias: ["Ocumare del Tuy", "La Democracia", "Bruzual"] },
      { nombre: "Paz Castillo (Santa Lucía)", parroquias: ["Santa Lucía"] },
      { nombre: "Urdaneta (Cúa)", parroquias: ["Cúa", "Nueva Cúa"] },
      { nombre: "Brión (Higuerote)", parroquias: ["Higuerote", "Curiepe", "Tacarigua de Brión"] },
      { nombre: "Acevedo (Caucagua)", parroquias: ["Caucagua", "Aragüita", "Capaya", "Panaquire", "El Café"] }
    ]
  },
  {
    estado: "Monagas",
    municipios: [
      { nombre: "Maturín", parroquias: ["Alto de Los Godos", "Boquerón", "Las Cocuizas", "El Corozo", "El Furrial", "Jusepín", "La Pica", "San Simón", "Santa Cruz"] },
      { nombre: "Caripe", parroquias: ["Caripe", "El Guácharo", "La Guanota", "Sabana de Piedra", "San Agustín"] },
      { nombre: "Cedeño (Caicara)", parroquias: ["Caicara de Maturín", "Areo", "Guanaguana", "Viento Fresco"] },
      { nombre: "Ezequiel Zamora (Punta de Mata)", parroquias: ["Punta de Mata", "El Tejero"] },
      { nombre: "Libertador (Temblador)", parroquias: ["Temblador", "Chaguaramas", "Las Alhuacas", "Tabasca"] },
      { nombre: "Piar", parroquias: ["Aragua de Maturín", "Aparicio", "Chaguaramas", "El Pinto"] },
      { nombre: "Punceres (Quiriquire)", parroquias: ["Cachipo", "Quiriquire"] },
      { nombre: "Sotillo (Barrancas)", parroquias: ["Barrancas del Orinoco", "Los Barrancos de Fajardo"] },
      { nombre: "Uracoa", parroquias: ["Uracoa"] }
    ]
  },
  {
    estado: "Nueva Esparta",
    municipios: [
      { nombre: "Mariño (Porlamar)", parroquias: ["Porlamar"] },
      { nombre: "Maneiro (Pampatar)", parroquias: ["Pampatar", "Aguirre"] },
      { nombre: "Arismendi (La Asunción)", parroquias: ["La Asunción"] },
      { nombre: "García", parroquias: ["El Valle del Espíritu Santo", "Francisco Fajardo"] },
      { nombre: "Gómez (Santa Ana)", parroquias: ["Santa Ana", "Guayacán", "Bolívar", "El Maco"] },
      { nombre: "Marcano (Juan Griego)", parroquias: ["Juan Griego", "Adrian"] },
      { nombre: "Díaz", parroquias: ["San Juan Bautista", "Zabala"] },
      { nombre: "Tubores (Punta de Piedras)", parroquias: ["Punta de Piedras", "Los Barales"] },
      { nombre: "Península de Macanao", parroquias: ["Boca de Río", "San Francisco"] },
      { nombre: "Villalba (Isla de Coche)", parroquias: ["San Pedro de Coche", "Vicente Fuentes"] }
    ]
  },
  {
    estado: "Portuguesa",
    municipios: [
      { nombre: "Guanare", parroquias: ["Guanare", "Coronel Cedeño", "La Misión", "San José de la Montaña"] },
      { nombre: "Páez (Acarigua)", parroquias: ["Acarigua", "Payara", "Pimpinela"] },
      { nombre: "Araure", parroquias: ["Araure", "Río Acarigua"] },
      { nombre: "Esteller (Píritu)", parroquias: ["Píritu", "Urdaneta"] },
      { nombre: "Guanarito", parroquias: ["Guanarito", "Trinidad de la Capilla", "Godoy"] },
      { nombre: "Ospino", parroquias: ["Ospino", "Aparición", "La Estación"] },
      { nombre: "San Genaro de Boconoíto", parroquias: ["Boconoíto", "Antolín Tovar Anzola"] },
      { nombre: "Turén", parroquias: ["Villa Bruzual", "Canelones", "Santa Cruz", "San Pablo"] }
    ]
  },
  {
    estado: "Sucre",
    municipios: [
      { nombre: "Sucre (Cumaná)", parroquias: ["Altagracia", "Ayacucho", "Santa Inés", "Valentín Valiente", "Raúl Leoni", "San Juan"] },
      { nombre: "Bermúdez (Carúpano)", parroquias: ["Santa Catalina", "Santa Rosa", "Bolívar", "Macarapana"] },
      { nombre: "Arismendi (Río Caribe)", parroquias: ["Río Caribe", "Antonio José de Sucre", "El Morro de Puerto Santo"] },
      { nombre: "Benítez (El Pilar)", parroquias: ["El Pilar", "El Rincón", "Guaraunos"] },
      { nombre: "Cruz Salmerón Acosta (Araya)", parroquias: ["Araya", "Chacopata", "Manicuare"] },
      { nombre: "Montes (Cumanacoa)", parroquias: ["Cumanacoa", "Aricagua", "San Lorenzo"] },
      { nombre: "Ribero (Cariaco)", parroquias: ["Cariaco", "Casanay", "Santa María"] }
    ]
  },
  {
    estado: "Táchira",
    municipios: [
      { nombre: "San Cristóbal", parroquias: ["La Concordia", "San Juan Bautista", "Pedro María Morantes", "San Sebastián", "Catedral"] },
      { nombre: "Ayacucho (Colón)", parroquias: ["San Juan de Colón", "Rivas Berti", "San Pedro del Río"] },
      { nombre: "Bolívar (San Antonio)", parroquias: ["San Antonio del Táchira", "El Palotal", "Peribeca"] },
      { nombre: "Cárdenas (Táriba)", parroquias: ["Táriba", "Amenodoro Ángel Rangel", "La Florida"] },
      { nombre: "García de Hevia (La Fría)", parroquias: ["La Fría", "Boca de Grita", "José Antonio Páez"] },
      { nombre: "Jáuregui (La Grita)", parroquias: ["La Grita", "Emilio Constantino Guerrero"] },
      { nombre: "Junín (Rubio)", parroquias: ["Rubio", "Bramón", "Quinimarí"] },
      { nombre: "Pedro María Ureña", parroquias: ["Ureña", "Nueva Rosa Inés"] },
      { nombre: "Torbes", parroquias: ["San Josecito"] }
    ]
  },
  {
    estado: "Trujillo",
    municipios: [
      { nombre: "Trujillo", parroquias: ["Matriz", "Chiquinquirá", "Andrés Linares", "Cruz Carrillo", "El Carmen", "San Luis"] },
      { nombre: "Valera", parroquias: ["Mercedes Díaz", "La Beatriz", "Juan Ignacio Montilla", "San Luis", "La Puerta", "Mendoza del Valle del Momboy"] },
      { nombre: "Boconó", parroquias: ["Boconó", "El Carmen", "Mosquey", "Ayacucho", "Burbusay", "General Rivas", "Guaramacal"] },
      { nombre: "Escuque", parroquias: ["Escuque", "La Sabana", "Saban de La Cruz", "El Baño"] },
      { nombre: "Rafael Rangel (Betijoque)", parroquias: ["Betijoque", "Bolivia", "Guevara", "San José"] },
      { nombre: "San Rafael de Carvajal", parroquias: ["Carvajal", "Campo Alegre", "Antonio José de Sucre", "José Leonardo Suárez"] },
      { nombre: "Sucre (Sabana de Mendoza)", parroquias: ["Sabana de Mendoza", "El Paraíso", "Junín", "Valmore Rodríguez"] }
    ]
  },
  {
    estado: "La Guaira (Vargas)",
    municipios: [
      { 
        nombre: "Vargas", 
        parroquias: ["Caraballeda", "Caruao", "Catia La Mar", "Cercado", "El Junko", "La Guaira", "Macuto", "Maiquetía", "Naiguatá", "Urimare"] 
      }
    ]
  },
  {
    estado: "Yaracuy",
    municipios: [
      { nombre: "San Felipe", parroquias: ["San Felipe", "Albarico", "San Javier"] },
      { nombre: "Bruzual (Chivacoa)", parroquias: ["Chivacoa", "Campo Elías"] },
      { nombre: "Nirgua", parroquias: ["Nirgua", "Salom", "Temerla"] },
      { nombre: "Peña (Yaritagua)", parroquias: ["Yaritagua", "San Andrés"] },
      { nombre: "Independencia", parroquias: ["Independencia"] },
      { nombre: "Cocorote", parroquias: ["Cocorote"] },
      { nombre: "Urachiche", parroquias: ["Urachiche"] }
    ]
  },
  {
    estado: "Zulia",
    municipios: [
      { nombre: "Maracaibo", parroquias: ["Bolívar", "Cojedes", "Idelfonso Vásquez", "Juana de Ávila", "Luis Hurtado Higuera", "Manuel Dagnino", "Olegario Villalobos", "Chiquinquirá", "Venancio Pulgar", "San Isidro", "Antonio Borjas Romero"] },
      { nombre: "San Francisco", parroquias: ["San Francisco", "El Bajo", "Domitila Flores", "Francisco Ochoa", "Los Cortijos", "Marcial Hernández"] },
      { nombre: "Cabimas", parroquias: ["Ambrosio", "Carmen Herrera", "La Rosa", "Germán Ríos Linares", "San Benito", "Rómulo Betancourt", "Jorge Hernández", "Punta Gorda"] },
      { nombre: "Lagunillas (Ciudad Ojeda)", parroquias: ["Avenida Venezuela", "Libertad", "Venezuela", "Campo Lara", "Eleazar López Contreras"] },
      { nombre: "Mara (El Moján)", parroquias: ["San Rafael del Moján", "Tamare", "Luis de Vicente", "Ricaurte", "La Sierrita"] },
      { nombre: "Machiques de Perijá", parroquias: ["Diógenes Arrieta", "Río Negro", "San José de Perijá"] },
      { nombre: "Rosario de Perijá", parroquias: ["El Rosario", "Don Apicio", "Sixto Zambrano"] },
      { nombre: "Santa Rita", parroquias: ["Santa Rita", "El Mene", "Pedro Lucas Urribarrí"] },
      { nombre: "Baralt (Mene Grande)", parroquias: ["San Timoteo", "General Urdaneta", "Libertador", "Pueblo Nuevo", "Mene Grande"] },
      { nombre: "Colón (San Carlos del Zulia)", parroquias: ["San Carlos del Zulia", "Santa Bárbara", "Moralito"] }
    ]
  }
];