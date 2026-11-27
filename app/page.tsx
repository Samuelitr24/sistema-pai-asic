"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "./lib/supabase";
import { DIVISION_TERRITORIAL_VENEZUELA } from "./data/venezuela";


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

const CLAVE_COLA_OFFLINE_PAI = "pai_asic_cola_offline_v1";

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

  const [descartablesASIC, setDescartablesASIC] = useState<any[]>([]);
const [nuevoNombreDescartable, setNuevoNombreDescartable] = useState("");
const [nuevoBiologicoDescartable, setNuevoBiologicoDescartable] = useState("BCG (Tuberculosis)");
const [nuevaCantidadDescartable, setNuevaCantidadDescartable] = useState("");

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

  // Inventario ASIC: Frío, Lotes y Descartables
  const [equiposFrioASIC, setEquiposFrioASIC] = useState<any[]>([]);
  const [nuevoTipoFrio, setNuevoTipoFrio] = useState("Refrigerador Vertical");
  const [nuevoModeloFrio, setNuevoModeloFrio] = useState("");
  const [nuevoSerialFrio, setNuevoSerialFrio] = useState("");

  const [stockDescartables, setStockDescartables] = useState({
    jeringas01ml: 0,
    jeringas05ml: 0,
    jeringas5ml: 0,
    cajasBioseguridad: 0,
  });

  const [inventarioLotesASIC, setInventarioLotesASIC] = useState<any[]>([]);
  const [nuevoBiologicoLote, setNuevoBiologicoLote] = useState("BCG");
  const [nuevoCodigoLote, setNuevoCodigoLote] = useState("");
  const [nuevaCantidadLote, setNuevaCantidadLote] = useState("");
  const [nuevoVencimientoLote, setNuevoVencimientoLote] = useState("");
  const [tipoInsumoCargar, setTipoInsumoCargar] = useState<"jeringas01ml" | "jeringas05ml" | "jeringas5ml" | "cajasBioseguridad">("jeringas05ml");
  const [cantidadInsumoCargar, setCantidadInsumoCargar] = useState("");

  const [fotoPacienteUrl, setFotoPacienteUrl] = useState<string>("");
  const [esquemaExistente, setEsquemaExistente] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Libro Físico Histórico
  const [esInclusion, setEsInclusion] = useState<boolean>(false);
  const [paisInclusion, setPaisInclusion] = useState<string>("");
  const [libroForm, setLibroForm] = useState({
    nombres: "",
    apellidos: "",
    tipoCedula: "propia",
    cedula: "",
    sufijoFamiliar: "H1",
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

  // Filtros avanzados
  const [filtroFechaDesde, setFiltroFechaDesde] = useState("");
  const [filtroFechaHasta, setFiltroFechaHasta] = useState("");
  const [filtroBiologico, setFiltroBiologico] = useState("TODOS");
  const [filtroSexo, setFiltroSexo] = useState<"TODOS" | "Masculino" | "Femenino">("TODOS");
  const [filtroGrupoEtario, setFiltroGrupoEtario] = useState("TODOS");
  const [filtroParroquia, setFiltroParroquia] = useState("TODAS");
  const [filtroBusqueda, setFiltroBusqueda] = useState("");

  // Cola offline
  const [estaOnline, setEstaOnline] = useState<boolean>(
    typeof window !== "undefined" ? window.navigator.onLine : true
  );
  const [pendientesOffline, setPendientesOffline] = useState<any[]>([]);
  const [sincronizandoOffline, setSincronizandoOffline] = useState<boolean>(false);

  // Jerarquía de roles: Regional hereda ASIC + Vacunador; ASIC hereda Vacunador; no inversa.
  const rolActual = usuarioAutenticado?.rol || "";
  const esCoordinadorRegional = rolActual === "Coordinador Regional PAI";
  const esCoordinadorASIC = rolActual === "Coordinador Municipal / ASIC";
  const esVacunador = rolActual === "Vacunador de Campo";

  const puedeVerOperacionVacunador = esVacunador || esCoordinadorASIC || esCoordinadorRegional;
  const puedeVerGestionASIC = esCoordinadorASIC || esCoordinadorRegional;
  const puedeVerGestionRegional = esCoordinadorRegional;

  const claveInventarioASIC = `pai_inventario_${usuarioAutenticado?.estado || "general"}_${usuarioAutenticado?.municipio || "asic"}`;

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
      const nombreBio = loteObj.vacuna || loteObj.biologico || "BIOLOGICO";
      const codLote = loteObj.lote || loteObj.codigo || "SIN-LOTE";
      const cantDisp = Number(loteObj.cantidad ?? loteObj.dosis ?? 0);
      const idLote = `LOTE-${nombreBio}-${codLote}`.replace(/\s+/g, "_");
      await supabase.from("inventarios_biologicos_asic").upsert({
        id: idLote,
        categoria: "biologico",
        nombre: nombreBio,
        lote: codLote,
        fecha_vencimiento: loteObj.vencimiento || "",
        cantidad_disponible: cantDisp,
        estado_lote: cantDisp > 0 ? "activo" : "agotado",
        payload: { ...loteObj, vacuna: nombreBio, lote: codLote, cantidad: cantDisp },
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

  const guardarInventarioLocal = (equipos: any[], lotes: any[], descartables: any) => {
    try {
      localStorage.setItem(
        claveInventarioASIC,
        JSON.stringify({ equipos, lotes, descartables })
      );
    } catch (e) {
      console.error("Error guardando inventario local:", e);
    }
  };

useEffect(() => {
  if (!usuarioAutenticado) return;
  try {
    const guardado = localStorage.getItem(claveInventarioASIC);
    if (guardado) {
      const data = JSON.parse(guardado);
      setEquiposFrioASIC(Array.isArray(data.equipos) ? data.equipos : []);
      setInventarioLotesASIC(Array.isArray(data.lotes) ? data.lotes : []);
      setDescartablesASIC(Array.isArray(data.descartables) ? data.descartables : []);
    } else {
      setEquiposFrioASIC([]);
      setInventarioLotesASIC([]);
      setDescartablesASIC([]);
    }
  } catch (e) {
    console.error("Error leyendo inventario local:", e);
  }
}, [usuarioAutenticado, claveInventarioASIC]);

useEffect(() => {
    const personal = localStorage.getItem("pai_lista_personal");
    if (personal) {
      try { setListaPersonal(JSON.parse(personal)); } catch (e) {}
    }

    const registros = localStorage.getItem("pai_registros_vacunacion");
    if (registros) {
      try { setRegistrosRealizados(JSON.parse(registros)); } catch (e) {}
    }

    const invLotes = localStorage.getItem("pai_lotes_vacunas");
    if (invLotes) {
      try { setLoteInventarioVacunas(JSON.parse(invLotes)); } catch (e) {}
    } else {
      setLoteInventarioVacunas([]);
      localStorage.setItem("pai_lotes_vacunas", JSON.stringify([]));
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

        if (resFunc.data) {
          const mappedFunc = resFunc.data.map((row: any) =>
            row.payload && Object.keys(row.payload).length > 0
              ? row.payload
              : {
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
                }
          );
          setListaPersonal(mappedFunc);
          localStorage.setItem("pai_lista_personal", JSON.stringify(mappedFunc));
        }

        if (resVac.data) {
          const mappedVac = resVac.data.map((row: any) =>
            row.payload && Object.keys(row.payload).length > 0
              ? row.payload
              : {
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
                }
          );
          setRegistrosRealizados(mappedVac);
          localStorage.setItem("pai_registros_vacunacion", JSON.stringify(mappedVac));
        }

        if (resInv.data) {
          const lotesCloud = resInv.data
            .filter((r: any) => r.categoria === "biologico")
            .map((r: any) => ({
              vacuna: r.nombre,
              lote: r.lote,
              vencimiento: r.fecha_vencimiento,
              cantidad: Number(r.cantidad_disponible ?? 0)
            }));
          setLoteInventarioVacunas(lotesCloud);
          localStorage.setItem("pai_lotes_vacunas", JSON.stringify(lotesCloud));

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

        if (resFrio.data) {
          const mappedFrio = resFrio.data.map((r: any) =>
            r.payload && Object.keys(r.payload).length > 0
              ? r.payload
              : {
                  id: r.id,
                  tipo: r.tipo_equipo,
                  modelo: r.marca_modelo,
                  serial: r.codigo_equipo,
                  estado: r.estado_operativo
                }
          );
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
      const correlativoDoc = `REP-${representanteCedula.trim().toUpperCase()}-H${numeroHijoCorrelativo}-${fechaNum.slice(-4)}`;
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
      if (previo.pacienteSexo === "Masculino" || previo.pacienteSexo === "Femenino") {
        setPacienteSexo(previo.pacienteSexo);
      }
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
    const nac = new Date(`${fechaNacimiento}T00:00:00`);
    const diffDias = Math.floor((hoy.getTime() - nac.getTime()) / (1000 * 3600 * 24));

    let edadAnios = hoy.getFullYear() - nac.getFullYear();
    const cumpleMes = hoy.getMonth() - nac.getMonth();
    if (cumpleMes < 0 || (cumpleMes === 0 && hoy.getDate() < nac.getDate())) {
      edadAnios -= 1;
    }

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
    const cedulaLimpia = cedula.trim().toUpperCase();
    if (!cedulaLimpia || !nombre.trim() || !claveRegistro.trim() || !telefono.trim()) return;

    // Validar unicidad de cédula en lista local y en Supabase
    const existeLocal = listaPersonal.some(
      (p) => String(p.cedula || "").trim().toUpperCase() === cedulaLimpia
    );
    if (existeLocal) {
      setErrorMensaje("⚠️ Ya existe un funcionario registrado con esa cédula. Inicia sesión con tu cuenta.");
      return;
    }

    try {
      const { data: existenteCloud } = await supabase
        .from("pai_funcionarios")
        .select("cedula")
        .ilike("cedula", cedulaLimpia)
        .limit(1);

      if (existenteCloud && existenteCloud.length > 0) {
        setErrorMensaje("⚠️ Esa cédula ya está registrada en el sistema PAI. Inicia sesión con tu cédula y clave.");
        return;
      }
    } catch {
      // Si no hay conexión, se respeta la validación local previa
    }

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
      id: Date.now(),
      codigo,
      nombre: nombre.trim(),
      cedula: cedulaLimpia,
      telefono: telefono.trim(),
      estado: estadoUser,
      municipio: municipioUser,
      parroquia: parroquiaUser,
      clave: claveRegistro.trim(),
      rol: rolTexto
    };

    const actualizada = [nuevo, ...listaPersonal];
    setListaPersonal(actualizada);
    localStorage.setItem("pai_lista_personal", JSON.stringify(actualizada));
    await syncFuncionarioCloud(nuevo);

    setUsuarioAutenticado({
      cedula: cedulaLimpia,
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      estado: estadoUser,
      municipio: municipioUser,
      parroquia: parroquiaUser,
      rol: rolTexto,
      codigoOficial: codigo
    });

    if (rol === "REGIONAL") setPestañaActiva("regional");
    else if (rol === "COOR") setPestañaActiva("coordinacion");
    else setPestañaActiva("registro");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMensaje("");
    const cedulaBuscada = loginCedula.trim().toUpperCase();
    const f = listaPersonal.find(
      (p) => String(p.cedula || "").trim().toUpperCase() === cedulaBuscada && p.clave === loginClave.trim()
    );
    if (!f) {
      setErrorMensaje("⚠️ Cédula o contraseña incorrectas.");
      return;
    }
    setUsuarioAutenticado({
      cedula: f.cedula,
      nombre: f.nombre,
      telefono: f.telefono,
      estado: f.estado,
      municipio: f.municipio,
      parroquia: f.parroquia,
      rol: f.rol,
      codigoOficial: f.codigo
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

const nuevosDescartables = descartablesASIC.map((item: any) => {
  const coincide =
    item.biologicoAsociado &&
    vacunaSeleccionada &&
    vacunaSeleccionada.toLowerCase().includes(String(item.biologicoAsociado).split(" ")[0].toLowerCase());
  return coincide
    ? { ...item, cantidad: Math.max(0, Number(item.cantidad || 0) - 1) }
    : item;
});
setDescartablesASIC(nuevosDescartables);
guardarInventarioLocal(equiposFrioASIC, inventarioLotesASIC, nuevosDescartables);

    const docFinal = busquedaDoc.trim().toUpperCase() || "SIN-CEDULA";

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
      esHistorico: false,
      fecha: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const nuevosRegs = [nuevoReg, ...registrosRealizados];
    setRegistrosRealizados(nuevosRegs);
    localStorage.setItem("pai_registros_vacunacion", JSON.stringify(nuevosRegs));

    await syncRegistroVacunaCloud(nuevoReg);
    if (loteActualizadoObj) await syncLoteCloud(loteActualizadoObj);
const resumenDescartables = {
  jeringas01ml: nuevosDescartables
    .filter((d: any) => String(d.nombre || "").toLowerCase().includes("0.05") || String(d.nombre || "").toLowerCase().includes("0.1") || String(d.biologicoAsociado || "").toLowerCase().includes("bcg"))
    .reduce((acc: number, d: any) => acc + Number(d.cantidad || 0), 0),
  jeringas05ml: nuevosDescartables
    .filter((d: any) => String(d.nombre || "").toLowerCase().includes("0.5"))
    .reduce((acc: number, d: any) => acc + Number(d.cantidad || 0), 0),
  jeringas5ml: nuevosDescartables
    .filter((d: any) => String(d.nombre || "").toLowerCase().includes("5 ml") || String(d.nombre || "").toLowerCase().includes("dilu"))
    .reduce((acc: number, d: any) => acc + Number(d.cantidad || 0), 0),
  cajasBioseguridad: nuevosDescartables
    .filter((d: any) => String(d.nombre || "").toLowerCase().includes("bioseguridad") || String(d.biologicoAsociado || "").toLowerCase().includes("bioseguridad"))
    .reduce((acc: number, d: any) => acc + Number(d.cantidad || 0), 0),
};
await syncDescartablesCloud(resumenDescartables);

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
          : r.esHistorico
          ? `<span style="background:#f3e8ff;color:#6b21a8;padding:2px 6px;border-radius:4px;font-weight:700;font-size:10px;">Libro Físico</span>`
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
          @page { size: letter landscape; margin: 10mm; }
          body { font-family: Arial, Helvetica, sans-serif; margin: 16px; color: #0f172a; }
          .header { border-bottom: 2px solid #1e293b; padding-bottom: 10px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: flex-end; }
          h1 { font-size: 18px; margin: 0 0 4px 0; }
          .meta { font-size: 11px; color: #475569; }
          table { width: 100%; border-collapse: collapse; font-size: 11px; }
          th { background: #1e293b; color: #ffffff; text-align: left; padding: 7px 8px; }
          td { border-bottom: 1px solid #cbd5e1; padding: 6px 8px; vertical-align: middle; }
          tr:nth-child(even) { background: #f8fafc; }
          .footer { margin-top: 14px; font-size: 10px; color: #64748b; display: flex; justify-content: space-between; }
          @media print { .no-print { display: none; } body { margin: 0; } }
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

  // Transcripción de Libro Físico Histórico (no altera stock en vivo ni se cuenta como dosis activa)
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
          ? `REP-${cedulaLimpia}-${libroForm.sufijoFamiliar || "H1"}`
          : cedulaLimpia;

      const nuevoReg = {
        id: Date.now(),
        vacunadorCedula: "",
        vacunadorNombre: `Transcripción (${usuarioAutenticado?.nombre || "Sistema"})`,
        municipioJurisdiccion: usuarioAutenticado?.municipio || municipioUser,
        parroquiaJurisdiccion: usuarioAutenticado?.parroquia || parroquiaUser,
        estadoJurisdiccion: usuarioAutenticado?.estado || estadoUser,
        esNuevoPaciente: libroForm.tipoCedula === "representante",
        representante:
          libroForm.tipoCedula === "representante"
            ? { cedula: cedulaLimpia, nombre: "", hijo: libroForm.sufijoFamiliar || "H1" }
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
          ? `Guardado histórico sin conexión (pendiente por subir): ${libroForm.nombres.trim()} ${libroForm.apellidos.trim()} — ${libroForm.biologico} (Dosis ${libroForm.numeroDosis}).`
          : `Guardado histórico: ${libroForm.nombres.trim()} ${libroForm.apellidos.trim()} — ${libroForm.biologico} (Dosis ${libroForm.numeroDosis}).`,
      });

      setLibroForm((prev) => ({
        ...prev,
        lote: "",
        fechaColocacion: "",
      }));
    } catch (err: any) {
      setMensajeLibro({
        tipo: "error",
        texto: err?.message || "Error al guardar registro histórico en Supabase.",
      });
    } finally {
      setGuardandoLibro(false);
    }
  };

  // Registros clínicos activos (excluye transcripciones históricas de libro físico)
  const registrosClinicosActivos = registrosRealizados.filter((r) => !r.esHistorico);
  const misRegistros = usuarioAutenticado
    ? registrosClinicosActivos.filter((r) => r.vacunadorCedula === usuarioAutenticado.cedula)
    : [];
  const registrosJurisdiccionASIC = usuarioAutenticado
    ? registrosClinicosActivos.filter((r) => r.municipioJurisdiccion === usuarioAutenticado.municipio)
    : [];
  const equipoVacunadoresASIC = usuarioAutenticado
    ? listaPersonal.filter((p) => p.municipio === usuarioAutenticado.municipio && p.rol === "Vacunador de Campo")
    : [];
  const registrosEstadales = usuarioAutenticado
    ? registrosClinicosActivos.filter((r) => r.estadoJurisdiccion === usuarioAutenticado.estado)
    : [];

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

  // Agrupa todas las dosis del paciente por documento para la tarjeta
  const historialTarjeta = tarjetaPacienteDoc
    ? registrosRealizados.filter(r => r.pacienteDocumento === tarjetaPacienteDoc)
    : [];
  const cabeceraTarjeta = historialTarjeta[0] || null;

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
      try {
        await syncRegistroVacunaCloud(item.payload);
      } catch {
        restantes.push(item);
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
          <div className="flex flex-wrap items-center gap-3">
            <div className="text-right">
              <span className="text-xs font-bold text-white block">{usuarioAutenticado.nombre}</span>
              <span className="text-[10px] text-cyan-400 font-mono block">
                {usuarioAutenticado.rol} &bull; {usuarioAutenticado.municipio} ({usuarioAutenticado.estado})
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
                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">Adscripción Territorial</span>
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

      {/* MODAL TARJETA DE VACUNACIÓN CONSOLIDADA POR PACIENTE */}
      {tarjetaPacienteDoc && cabeceraTarjeta && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 print:static print:bg-transparent print:p-0">
          <div className="bg-slate-900 border border-cyan-700/80 p-6 rounded-2xl max-w-3xl w-full space-y-4 shadow-2xl print:bg-white print:text-black print:border-black print:shadow-none print:max-w-full">
            <div className="flex justify-between items-start border-b border-slate-800 pb-3 print:border-slate-300">
              <div className="flex items-center gap-3">
                {cabeceraTarjeta.fotoPacienteUrl && (
                  <img src={cabeceraTarjeta.fotoPacienteUrl} alt="Paciente" className="w-14 h-14 rounded-xl object-cover border border-cyan-500 print:hidden" />
                )}
                <div>
                  <span className="text-[10px] font-bold uppercase text-cyan-400 print:text-cyan-800 block">Tarjeta Consolidada de Inmunización PAI</span>
                  <h3 className="text-lg font-extrabold text-white print:text-black">{cabeceraTarjeta.pacienteNombre}</h3>
                  <span className="text-xs font-mono text-slate-300 print:text-slate-700 block">ID / Cédula: {cabeceraTarjeta.pacienteDocumento}</span>
                </div>
              </div>
              <button onClick={() => setTarjetaPacienteDoc(null)} className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg print:hidden">
                Cerrar
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-950 p-3 rounded-xl border border-slate-800 print:bg-slate-50 print:border-slate-300">
              <div><span className="text-slate-400 print:text-slate-600">Nacimiento:</span> <strong className="font-mono">{cabeceraTarjeta.fechaNacimiento || "N/A"}</strong></div>
              <div><span className="text-slate-400 print:text-slate-600">Grupo Etario:</span> <strong>{cabeceraTarjeta.grupoEtario}</strong></div>
              <div className="sm:col-span-2">
                <span className="text-slate-400 print:text-slate-600">Jurisdicción:</span>{" "}
                <strong>{cabeceraTarjeta.direccion?.estado} &bull; {cabeceraTarjeta.direccion?.municipio} &bull; {cabeceraTarjeta.direccion?.parroquia}</strong>
              </div>
              {cabeceraTarjeta.representante && (
                <div className="sm:col-span-2 text-purple-300 print:text-purple-900">
                  Representante: <strong>{cabeceraTarjeta.representante.nombre}</strong> (C.I: {cabeceraTarjeta.representante.cedula} &bull; Hijo {cabeceraTarjeta.representante.hijo})
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-emerald-400 print:text-emerald-800">Esquema Consolidado ({historialTarjeta.length} dosis)</h4>
              <div className="max-h-56 overflow-y-auto space-y-2 print:max-h-none print:overflow-visible">
                {historialTarjeta.map((item) => (
                  <div key={item.id} className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-center print:bg-white print:border-slate-300">
                    <div>
                      <div className="font-bold text-white print:text-black">
                        {item.vacuna} &mdash; <span className="text-emerald-400 print:text-emerald-700">{item.dosis}</span>
                        {item.esHistorico && <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-purple-950 text-purple-300">Libro Físico</span>}
                      </div>
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
                📄 Descargar / Guardar como PDF (Horizontal)
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
                    className="absolute right-3 top-9 text-[11px] font-semibold text-slate-300 hover:text-white"
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
            {/* BARRA DE NAVEGACIÓN JERÁRQUICA (Regional > ASIC > Vacunador) */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {puedeVerGestionRegional && (
                  <button
                    type="button"
                    onClick={() => setPestañaActiva("regional")}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "regional" ? "bg-indigo-600 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                  >
                    🏛️ Tablero Estadal
                  </button>
                )}

                {puedeVerGestionASIC && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPestañaActiva("coordinacion")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "coordinacion" ? "bg-cyan-600 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                    >
                      📋 Consolidado ASIC & ESAVI
                    </button>
                    <button
                      type="button"
                      onClick={() => setPestañaActiva("inventario")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "inventario" ? "bg-amber-600 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                    >
                      📦 Frío, Lotes y Descartables
                    </button>
                  </>
                )}

                {puedeVerOperacionVacunador && (
                  <>
                    <button
                      type="button"
                      onClick={() => setPestañaActiva("registro")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "registro" ? "bg-emerald-600 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                    >
                      💉 Registro Inteligente
                    </button>
                    <button
                      type="button"
                      onClick={() => setPestañaActiva("libro")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "libro" ? "bg-purple-600 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                    >
                      📖 Transcribir Libro Físico
                    </button>
                    <button
                      type="button"
                      onClick={() => setPestañaActiva("reportePersonal")}
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${pestañaActiva === "reportePersonal" ? "bg-cyan-700 text-white shadow-lg" : "bg-slate-950 text-slate-400 hover:text-white"}`}
                    >
                      📊 Mis Dosis Aplicadas
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* VISTA: REGISTRO INTELIGENTE EN TERRENO */}
            {puedeVerOperacionVacunador && pestañaActiva === "registro" && (
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
                      <select value={tipoActividad} onChange={(e) => setTipoActividad(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-cyan-300 font-semibold">
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
                        <input type="text" placeholder="Ej: Las Casitas / Sector Sur" value={sectorManual} onChange={(e) => setSectorManual(e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan-300 font-semibold" required />
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

            {/* VISTA: TRANSCRIBIR LIBRO FÍSICO (HISTÓRICO) */}
            {puedeVerOperacionVacunador && pestañaActiva === "libro" && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-purple-800 shadow-xl max-w-2xl mx-auto space-y-4">
                <h3 className="text-lg font-bold text-purple-300">📖 Transcripción Rápida de Libro Físico</h3>
                <form onSubmit={handleGuardarLibro} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-xl">
                  <div>
                    <h4 className="text-base font-bold text-white">Registro de Libro Físico (Histórico)</h4>
                    <p className="text-xs text-slate-400">Carga histórica por paciente y biológico aplicado (no modifica inventario en vivo)</p>
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

                  <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
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
                      {guardandoLibro ? "Guardando datos..." : "Guardar registro histórico"}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setLibroForm({
                          nombres: "",
                          apellidos: "",
                          tipoCedula: "propia",
                          cedula: "",
                          sufijoFamiliar: "H1",
                          fechaNacimiento: "",
                          biologico: "Pentavalente (DPT+HB+Hib)",
                          numeroDosis: "1",
                          lote: "",
                          fechaColocacion: "",
                          condicionEsquema: "Al dia",
                        });
                        setEsInclusion(false);
                        setPaisInclusion("");
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
            {puedeVerOperacionVacunador && pestañaActiva === "reportePersonal" && (
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

            {/* VISTA: INVENTARIO ASIC (FRÍO, LOTES Y DESCARTABLES) */}
            {puedeVerGestionASIC && pestañaActiva === "inventario" && (
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl max-w-5xl mx-auto space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-base font-bold text-amber-400">
                      📦 Inventario Operativo ASIC — Frío, Lotes y Descartables
                    </h2>
                    <p className="text-xs text-slate-400">
                      {usuarioAutenticado.estado} • Municipio / ASIC: {usuarioAutenticado.municipio}
                    </p>
                  </div>
                </div>

                {/* 1. EQUIPOS DE CADENA DE FRÍO */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    ❄️ Equipos de Cadena de Frío ({equiposFrioASIC.length})
                  </h3>

                  {equiposFrioASIC.length === 0 ? (
                    <p className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                      Sin equipos cargados. Registra abajo los refrigeradores, congeladores o termos reales de este ASIC.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {equiposFrioASIC.map((eq: any, idx: number) => (
                        <div key={eq.id || idx} className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs flex justify-between items-start gap-2">
                          <div className="space-y-1">
                            <div className="font-bold text-white">{eq.tipo} — {eq.modelo}</div>
                            <div className="text-slate-400 font-mono">Serial / Código: {eq.serial || eq.id}</div>
                            <div className="text-emerald-400">{eq.estado || "Operativo"}</div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const nuevos = equiposFrioASIC.filter((_, i) => i !== idx);
                              setEquiposFrioASIC(nuevos);
                              guardarInventarioLocal(nuevos, inventarioLotesASIC, stockDescartables);
                            }}
                            className="text-rose-400 hover:text-rose-300 text-[11px] font-bold px-2 py-1 rounded bg-rose-950/40"
                          >
                            Quitar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                    <select
                      value={nuevoTipoFrio}
                      onChange={(e) => setNuevoTipoFrio(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="Refrigerador Vertical">Refrigerador Vertical</option>
                      <option value="Refrigerador Horizontal / Ice-Lined">Refrigerador Horizontal / Ice-Lined</option>
                      <option value="Congelador">Congelador</option>
                      <option value="Cava Térmica">Cava Térmica</option>
                      <option value="Termo Portavacunas">Termo Portavacunas</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Marca / Modelo real del equipo"
                      value={nuevoModeloFrio}
                      onChange={(e) => setNuevoModeloFrio(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Serial / Bien Nacional"
                        value={nuevoSerialFrio}
                        onChange={(e) => setNuevoSerialFrio(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          if (!nuevoModeloFrio.trim() || !nuevoSerialFrio.trim()) return;
                          const itemEquipo = {
                            id: `EQ-${nuevoSerialFrio.trim()}-${Date.now()}`,
                            tipo: nuevoTipoFrio,
                            modelo: nuevoModeloFrio.trim(),
                            serial: nuevoSerialFrio.trim(),
                            ubicacion: `ASIC ${usuarioAutenticado?.municipio || ""}`,
                            estado: "Operativo",
                          };
                          const nuevos = [...equiposFrioASIC, itemEquipo];
                          setEquiposFrioASIC(nuevos);
                          guardarInventarioLocal(nuevos, inventarioLotesASIC, stockDescartables);
                          await syncEquipoFrioCloud(itemEquipo);
                          setNuevoModeloFrio("");
                          setNuevoSerialFrio("");
                        }}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl text-xs whitespace-nowrap"
                      >
                        + Cargar
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. LOTES DE BIOLÓGICOS / VACUNAS */}
                <div className="space-y-3 pt-4 border-t border-slate-800">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    🧬 Lotes de Biológicos en Existencia ({inventarioLotesASIC.length})
                  </h3>

                  {inventarioLotesASIC.length === 0 ? (
                    <p className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
                      Sin lotes cargados. Agrega abajo cada biológico con su número de lote, dosis disponibles y fecha de vencimiento.
                    </p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {inventarioLotesASIC.map((lote: any, idx: number) => (
                        <div key={lote.id || idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center gap-2">
                          <div>
                            <div className="font-bold text-white">{lote.biologico}</div>
                            <div className="text-slate-400 font-mono">
                              Lote: {lote.codigo} {lote.vencimiento ? `• Vence: ${lote.vencimiento}` : ""}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-emerald-300">{lote.dosis} dosis</span>
                            <button
                              type="button"
                              onClick={() => {
                                const nuevos = inventarioLotesASIC.filter((_, i) => i !== idx);
                                setInventarioLotesASIC(nuevos);
                                guardarInventarioLocal(equiposFrioASIC, nuevos, stockDescartables);
                              }}
                              className="text-rose-400 hover:text-rose-300 text-[11px] font-bold px-2 py-1 rounded bg-rose-950/40"
                            >
                              Quitar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 pt-1">
                    <select
                      value={nuevoBiologicoLote}
                      onChange={(e) => setNuevoBiologicoLote(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="BCG">BCG</option>
                      <option value="Antihepatitis B">Antihepatitis B</option>
                      <option value="Pentavalente">Pentavalente</option>
                      <option value="Polio IPV">Polio IPV</option>
                      <option value="Polio Oral (bOPV)">Polio Oral (bOPV)</option>
                      <option value="Antirrotavirus">Antirrotavirus</option>
                      <option value="Antineumococo 13V">Antineumococo 13V</option>
                      <option value="SRP (Trivalente Viral)">SRP (Trivalente Viral)</option>
                      <option value="SR (Doble Viral)">SR (Doble Viral)</option>
                      <option value="Antiamarílica (Fiebre Amarilla)">Antiamarílica (Fiebre Amarilla)</option>
                      <option value="Toxoide Tetánico Diftérico (Td)">Toxoide Tetánico Diftérico (Td)</option>
                      <option value="Antiinfluenza">Antiinfluenza</option>
                      <option value="VPH">VPH</option>
                    </select>
                    <input
                      type="text"
                      placeholder="N° de Lote"
                      value={nuevoCodigoLote}
                      onChange={(e) => setNuevoCodigoLote(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                    <input
                      type="date"
                      value={nuevoVencimientoLote}
                      onChange={(e) => setNuevoVencimientoLote(e.target.value)}
                      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        min="1"
                        placeholder="Dosis"
                        value={nuevaCantidadLote}
                        onChange={(e) => setNuevaCantidadLote(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                      />
                      <button
                        type="button"
                        onClick={async () => {
                          const cant = Number(nuevaCantidadLote);
                          if (!nuevoCodigoLote.trim() || !cant || cant <= 0) return;
                          const codUpper = nuevoCodigoLote.trim().toUpperCase();
                          const itemLote = {
                            id: `${Date.now()}`,
                            biologico: nuevoBiologicoLote,
                            vacuna: nuevoBiologicoLote,
                            codigo: codUpper,
                            lote: codUpper,
                            vencimiento: nuevoVencimientoLote,
                            dosis: cant,
                            cantidad: cant,
                          };
                          const nuevos = [...inventarioLotesASIC, itemLote];
                          setInventarioLotesASIC(nuevos);
                          guardarInventarioLocal(equiposFrioASIC, nuevos, stockDescartables);
                          await syncLoteCloud(itemLote);
                          setNuevoCodigoLote("");
                          setNuevaCantidadLote("");
                          setNuevoVencimientoLote("");
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs whitespace-nowrap"
                      >
                        + Cargar
                      </button>
                    </div>
                  </div>
                </div>

{/* 3. INSUMOS Y MATERIAL DESCARTABLE (DESDE CERO) */}
<div className="space-y-3 pt-4 border-t border-slate-800">
  <div className="flex items-center justify-between">
    <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
      💉 Insumos y Material Descartable ({descartablesASIC.length})
    </h3>
    {descartablesASIC.length > 0 && (
      <button
        type="button"
        onClick={() => {
          setDescartablesASIC([]);
          guardarInventarioLocal(equiposFrioASIC, inventarioLotesASIC, []);
        }}
        className="text-[11px] text-slate-400 hover:text-rose-300 underline"
      >
        Vaciar lista
      </button>
    )}
  </div>

  {descartablesASIC.length === 0 ? (
    <p className="text-xs text-slate-400 bg-slate-950/70 p-3 rounded-xl border border-slate-800">
      Sin descartables cargados. Agrega abajo el nombre del insumo, el biológico asociado y la cantidad.
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
      {descartablesASIC.map((item: any, idx: number) => (
        <div
          key={item.id || idx}
          className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center gap-2"
        >
          <div className="space-y-0.5">
            <div className="font-bold text-white">{item.nombre}</div>
            <div className="text-cyan-300 font-mono text-[11px]">
              Biológico: {item.biologicoAsociado}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-amber-300">{item.cantidad} und</span>
            <button
              type="button"
              onClick={() => {
                const nuevos = descartablesASIC.filter((_, i) => i !== idx);
                setDescartablesASIC(nuevos);
                guardarInventarioLocal(equiposFrioASIC, inventarioLotesASIC, nuevos);
              }}
              className="text-rose-400 hover:text-rose-300 text-[11px] font-bold px-2 py-1 rounded bg-rose-950/40"
            >
              Quitar
            </button>
          </div>
        </div>
      ))}
    </div>
  )}

  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
    <input
      type="text"
      placeholder="Nombre (Ej: Jeringa 0.5 ml retráctil)"
      value={nuevoNombreDescartable}
      onChange={(e) => setNuevoNombreDescartable(e.target.value)}
      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
    />
    <select
      value={nuevoBiologicoDescartable}
      onChange={(e) => setNuevoBiologicoDescartable(e.target.value)}
      className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
    >
      <option value="General / Múltiples Biológicos">General / Múltiples Biológicos</option>
      <option value="Bioseguridad (Caja / Recipiente)">Bioseguridad (Caja / Recipiente)</option>
      {CATALOGO_BIOLOGICOS_PAI.map((bio: any) => (
        <option key={bio.nombre} value={bio.nombre}>
          {bio.nombre}
        </option>
      ))}
    </select>
    <div className="flex gap-2">
      <input
        type="number"
        min="1"
        placeholder="Cantidad"
        value={nuevaCantidadDescartable}
        onChange={(e) => setNuevaCantidadDescartable(e.target.value)}
        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
      />
      <button
        type="button"
        onClick={async () => {
          const cant = Number(nuevaCantidadDescartable);
          if (!nuevoNombreDescartable.trim() || !cant || cant <= 0) return;
          const nuevoItem = {
            id: `DESC-${Date.now()}`,
            nombre: nuevoNombreDescartable.trim(),
            biologicoAsociado: nuevoBiologicoDescartable,
            cantidad: cant,
          };
          const nuevos = [...descartablesASIC, nuevoItem];
          setDescartablesASIC(nuevos);
          guardarInventarioLocal(equiposFrioASIC, inventarioLotesASIC, nuevos);
          try {
            await supabase.from("inventarios_biologicos_asic").upsert({
              id: nuevoItem.id,
              categoria: "jeringa",
              nombre: `${nuevoItem.nombre} (${nuevoItem.biologicoAsociado})`,
              lote: "DESCARTABLE",
              fecha_vencimiento: "2028-12-31",
              cantidad_disponible: cant,
              estado_lote: "activo",
              payload: nuevoItem,
              updated_at: new Date().toISOString(),
            }, { onConflict: "id" });
          } catch (e) {
            console.error("Error sync descartable:", e);
          }
          setNuevoNombreDescartable("");
          setNuevaCantidadDescartable("");
        }}
        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs whitespace-nowrap"
      >
        + Cargar
      </button>
    </div>
  </div>
</div>
</div>
)}

            {/* VISTA: CONSOLIDADO ASIC */}
            {puedeVerGestionASIC && pestañaActiva === "coordinacion" && (
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
                    <div className="flex flex-wrap gap-2">
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
                      <button
                        type="button"
                        onClick={() =>
                          exportarReportePDF(
                            registrosASICFiltrados,
                            `Reporte PAI ASIC — ${usuarioAutenticado?.municipio || "Municipal"}`
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
            {puedeVerGestionRegional && pestañaActiva === "regional" && (
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
                    <div className="flex flex-wrap gap-2">
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
