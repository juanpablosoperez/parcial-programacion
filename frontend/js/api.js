/*
  Cliente API del frontend
  ------------------------
  - Define funciones para cada endpoint del backend.
  - Maneja parseo JSON y errores HTTP de forma uniforme.
  - Expone utilidades de parseo básico: S (string) y N (number).
*/
const API = (() => {
  // Base URL configurable desde config.js (quito el slash final si viene)
  const base = () => (window.APP_CONFIG?.baseUrl || '').replace(/\/$/, '');

  // Normalizo respuestas: si no es ok, lanzo Error con cuerpo o status
  const json = (res) => {
    if (!res.ok) {
      return res.text().then(t => {
        const err = new Error(t || `HTTP ${res.status}`);
        err.status = res.status;
        throw err;
      });
    }
    if (res.status === 204) return null;
    return res.json();
  };

  // Encabezados comunes para requests con cuerpo JSON
  const headers = { 'Content-Type': 'application/json' };

  // ---------------- Sorteos ----------------
  const getSorteos = () => fetch(`${base()}/sorteos`).then(json);
  const getSorteo = (id) => fetch(`${base()}/sorteos/${id}`).then(json);
  const createSorteo = (payload) => fetch(`${base()}/sorteos`, { method: 'POST', headers, body: JSON.stringify(payload) }).then(json);
  const updateSorteo = (id, payload) => fetch(`${base()}/sorteos/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) }).then(json);
  const deleteSorteo = (id) => fetch(`${base()}/sorteos/${id}`, { method: 'DELETE' }).then(json);

  // ---------------- Premios ----------------
  const getPremios = () => fetch(`${base()}/premios`).then(json);
  const getPremio = (id) => fetch(`${base()}/premios/${id}`).then(json);
  const createPremio = (payload) => fetch(`${base()}/premios`, { method: 'POST', headers, body: JSON.stringify(payload) }).then(json);
  const updatePremio = (id, payload) => fetch(`${base()}/premios/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) }).then(json);
  const deletePremio = (id) => fetch(`${base()}/premios/${id}`, { method: 'DELETE' }).then(json);

  // ---------------- Cartones ---------------
  const getCartones = () => fetch(`${base()}/cartones`).then(json);
  const getCartonBySerie = (serie) => fetch(`${base()}/cartones/${encodeURIComponent(serie)}`).then(json);
  const getCartonById = (id) => fetch(`${base()}/cartones/id/${id}`).then(json);
  const createCarton = (payload) => fetch(`${base()}/cartones`, { method: 'POST', headers, body: JSON.stringify(payload) }).then(json);
  const updateCarton = (serie, payload) => fetch(`${base()}/cartones/${encodeURIComponent(S(serie))}`, { method: 'PUT', headers, body: JSON.stringify(payload) }).then(json);
  const updateCartonEstado = (serie, estado) => fetch(`${base()}/cartones/${encodeURIComponent(S(serie))}/estado`, { method: 'PUT', headers, body: JSON.stringify({ estado }) }).then(json);
  const deleteCarton = (serie) => fetch(`${base()}/cartones/${encodeURIComponent(S(serie))}`, { method: 'DELETE' }).then(json);

  // ---------------- Ganadores --------------
  const getGanadores = () => fetch(`${base()}/ganadores`).then(json);
  const getGanador = (id) => fetch(`${base()}/ganadores/${id}`).then(json);
  const createGanador = (payload) => fetch(`${base()}/ganadores`, { method: 'POST', headers, body: JSON.stringify(payload) }).then(json);
  const updateGanador = (id, payload) => fetch(`${base()}/ganadores/${id}`, { method: 'PUT', headers, body: JSON.stringify(payload) }).then(json);
  const deleteGanador = (id) => fetch(`${base()}/ganadores/${id}`, { method: 'DELETE' }).then(json);

  // ------------ Helpers de parseo ----------
  const S = (v) => (v ?? '').toString().trim();
  const N = (v) => Number(v);

  return {
    // sorteos
    getSorteos, getSorteo, createSorteo, updateSorteo, deleteSorteo,
    // premios
    getPremios, getPremio, createPremio, updatePremio, deletePremio,
    // cartones
    getCartones, getCartonBySerie, getCartonById, createCarton, updateCarton, updateCartonEstado, deleteCarton,
    // ganadores
    getGanadores, getGanador, createGanador, updateGanador, deleteGanador,
    // util
    S, N
  };
})();



