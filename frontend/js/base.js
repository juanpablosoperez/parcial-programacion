/*
  Base de utilidades de UI
  -------------------------
  - Expone helpers DOM (`UI.$`, `UI.$$`).
  - Provee `UI.notify` para mensajes flotantes de éxito/error.
  - Incluye `UI.toDateTimeLocal` para formatear fechas a input datetime-local.
  - Controla el cambio de pestañas con `UI.show` y recuerda la última activa.
*/
(() => {
  // Selección rápida de elementos. Uso: UI.$('#id') / UI.$$('.clase')
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Muestra un mensaje temporal al usuario (tipo: 'success' | 'error')
  function notify(type, msg) {
    const el = document.createElement('div');
    el.className = type;
    el.textContent = msg;
    document.querySelector('.container').prepend(el);
    setTimeout(() => el.remove(), 2500);
  }

  // Convierte una fecha a formato aceptado por inputs datetime-local
  const toDateTimeLocal = (d) => {
    if (!d) return '';
    const dt = new Date(d);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
  };

  // Cambia la vista activa por id y actualiza la pestaña activa
  function show(id) {
    $$('.view').forEach(v => v.classList.remove('active'));
    const sec = document.getElementById(id);
    if (sec) sec.classList.add('active');
    $$('.nav-btn').forEach(b => b.classList.toggle('active', b.dataset.target === id));
    try { localStorage.setItem('activeTab', id); } catch {}
  }

  // Wire de eventos de las pestañas
  $$('.nav-btn').forEach(btn => btn.addEventListener('click', () => show(btn.dataset.target)));

  // Al cargar, vuelvo a la última pestaña abierta o 'sorteos'
  const initial = (() => { try { return localStorage.getItem('activeTab') || 'sorteos'; } catch { return 'sorteos'; } })();
  show(initial);

  // Expongo utilidades globalmente para que las usen los módulos por entidad
  window.UI = { $, $$, notify, toDateTimeLocal, show };
})();


