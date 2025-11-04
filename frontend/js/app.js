(() => {
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  // Navegación
  $$(".nav-btn").forEach(btn => btn.addEventListener('click', () => show(btn.dataset.target)));
  function show(id) {
    $$(".view").forEach(v => v.classList.remove('active'));
    const sec = document.getElementById(id);
    if (sec) sec.classList.add('active');
  }

  // Mensajes simples
  function notify(type, msg) {
    const el = document.createElement('div');
    el.className = type;
    el.textContent = msg;
    $('.container').prepend(el);
    setTimeout(() => el.remove(), 2500);
  }

  // Utiles
  const toDateTimeLocal = (d) => {
    if (!d) return '';
    const dt = new Date(d);
    const pad = (n) => n.toString().padStart(2, '0');
    return `${dt.getFullYear()}-${pad(dt.getMonth()+1)}-${pad(dt.getDate())}T${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
  };

  // Sorteos
  const tblSorteos = $('#tblSorteos');
  const formSorteo = $('#formSorteo');
  $('#btnSorteosList').addEventListener('click', loadSorteos);
  $('#btnSorteoGet').addEventListener('click', async () => {
    const id = API.N($('#sorteoGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try {
      const it = await API.getSorteo(id);
      renderSorteos([it]);
    } catch (e) { notify('error', 'No encontrado'); }
  });
  $('#btnSorteoReset').addEventListener('click', () => { formSorteo.reset(); $('#sorteoId').value=''; $('#sorteoIdDisplay').value=''; });
  $('#btnSorteoDelete').addEventListener('click', async () => {
    const id = API.N($('#sorteoId').value);
    if (!id) return notify('error', 'Seleccione un sorteo a eliminar');
    if (!confirm('¿Eliminar sorteo?')) return;
    await API.deleteSorteo(id).catch(() => {});
    formSorteo.reset();
    $('#sorteoId').value='';
    $('#sorteoIdDisplay').value='';
    notify('success', 'Eliminado');
    loadSorteos();
  });
  formSorteo.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = API.N($('#sorteoId').value);
    const fecha = $('#sorteoFecha').value;
    const hora = $('#sorteoHora').value;
    const estado = API.S($('#sorteoEstado').value);
    const lugar = API.S($('#sorteoLugar').value);
    if (!fecha || !hora || !estado || !lugar) return notify('error', 'Complete todos los campos');
    // Backend espera Date en fecha y hora. Componemos en ISO.
    const payload = {
      fecha: new Date(fecha).toISOString(),
      hora: new Date(`1970-01-01T${hora}:00.000Z`).toISOString(),
      estado, lugar
    };
    try {
      if (id) await API.updateSorteo(id, payload); else await API.createSorteo(payload);
      notify('success', 'Guardado');
      formSorteo.reset();
      $('#sorteoId').value='';
      $('#sorteoIdDisplay').value='';
      loadSorteos();
    } catch (e) { notify('error', 'Error al guardar'); }
  });

  $('#btnSorteoSaveNew').addEventListener('click', async () => {
    const fecha = $('#sorteoFecha').value;
    const hora = $('#sorteoHora').value;
    const estado = API.S($('#sorteoEstado').value);
    const lugar = API.S($('#sorteoLugar').value);
    if (!fecha || !hora || !estado || !lugar) return notify('error', 'Complete todos los campos');
    const payload = {
      fecha: new Date(fecha).toISOString(),
      hora: new Date(`1970-01-01T${hora}:00.000Z`).toISOString(),
      estado, lugar
    };
    try {
      await API.createSorteo(payload);
      notify('success', 'Creado como nuevo');
      formSorteo.reset();
      $('#sorteoId').value='';
      $('#sorteoIdDisplay').value='';
      loadSorteos();
    } catch { notify('error', 'Error al crear'); }
  });

  function renderSorteos(items) {
    const head = `<tr><th>ID</th><th>Fecha</th><th>Hora</th><th>Estado</th><th>Lugar</th><th>Acciones</th></tr>`;
    const rows = items.map(s => `
      <tr>
        <td>${s.id}</td>
        <td>${s.fecha ? toDateTimeLocal(s.fecha) : ''}</td>
        <td>${s.hora ? new Date(s.hora).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''}</td>
        <td>${s.estado ?? ''}</td>
        <td>${s.lugar ?? ''}</td>
        <td>
          <button data-id="${s.id}" class="sorteo-edit">Editar</button>
          <button data-id="${s.id}" class="sorteo-del danger">Eliminar</button>
        </td>
      </tr>`).join('');
    tblSorteos.innerHTML = head + rows;
    $$('#tblSorteos .sorteo-edit').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      const it = await API.getSorteo(id);
      $('#sorteoId').value = it.id;
      $('#sorteoIdDisplay').value = it.id ?? '';
      $('#sorteoFecha').value = toDateTimeLocal(it.fecha);
      const pad = (n) => n.toString().padStart(2,'0');
      const src = it.hora || it.fecha;
      if (src) {
        const h = new Date(src);
        if (!isNaN(h.getTime())) {
          $('#sorteoHora').value = `${pad(h.getHours())}:${pad(h.getMinutes())}`;
        } else {
          $('#sorteoHora').value = '';
        }
      } else {
        $('#sorteoHora').value = '';
      }
      $('#sorteoEstado').value = it.estado ?? '';
      $('#sorteoLugar').value = it.lugar ?? '';
      show('sorteos');
    }));
    $$('#tblSorteos .sorteo-del').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      if (!confirm('¿Eliminar sorteo?')) return;
      await API.deleteSorteo(id).catch(() => {});
      notify('success', 'Eliminado');
      loadSorteos();
    }));
  }

  async function loadSorteos() {
    try { const data = await API.getSorteos(); renderSorteos(data); }
    catch { tblSorteos.innerHTML = '<tr><td>Error al cargar</td></tr>'; }
  }

  // Premios
  const tblPremios = $('#tblPremios');
  const formPremio = $('#formPremio');
  $('#btnPremiosList').addEventListener('click', loadPremios);
  $('#btnPremioGet').addEventListener('click', async () => {
    const id = API.N($('#premioGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try { const it = await API.getPremio(id); renderPremios([it]); } catch { notify('error', 'No encontrado'); }
  });
  $('#btnPremioReset').addEventListener('click', () => { formPremio.reset(); $('#premioId').value=''; $('#premioIdDisplay').value=''; });
  $('#btnPremioDelete').addEventListener('click', async () => {
    const id = API.N($('#premioId').value);
    if (!id) return notify('error', 'Seleccione un premio');
    if (!confirm('¿Eliminar premio?')) return;
    await API.deletePremio(id).catch(() => {});
    formPremio.reset();
    notify('success', 'Eliminado');
    loadPremios();
  });
  formPremio.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = API.N($('#premioId').value);
    const tipo = API.S($('#premioTipo').value);
    const modelo = API.S($('#premioModelo').value);
    const marca = API.S($('#premioMarca').value);
    const sorteoId = API.N($('#premioSorteoId').value);
    if (!tipo || !modelo || !marca || !sorteoId) return notify('error', 'Complete todos los campos');
    const payload = { tipo, modelo, marca, sorteo: { id: sorteoId } };
    try {
      if (id) await API.updatePremio(id, payload); else await API.createPremio(payload);
      notify('success', 'Guardado');
      formPremio.reset(); $('#premioId').value=''; $('#premioIdDisplay').value='';
      loadPremios();
    } catch { notify('error', 'Error al guardar'); }
  });
  $('#btnPremioSaveNew').addEventListener('click', async () => {
    const tipo = API.S($('#premioTipo').value);
    const modelo = API.S($('#premioModelo').value);
    const marca = API.S($('#premioMarca').value);
    const sorteoId = API.N($('#premioSorteoId').value);
    if (!tipo || !modelo || !marca || !sorteoId) return notify('error', 'Complete todos los campos');
    const payload = { tipo, modelo, marca, sorteo: { id: sorteoId } };
    try {
      await API.createPremio(payload);
      notify('success', 'Creado como nuevo');
      formPremio.reset(); $('#premioId').value=''; $('#premioIdDisplay').value='';
      loadPremios();
    } catch { notify('error', 'Error al crear'); }
  });
  function renderPremios(items) {
    const head = `<tr><th>ID</th><th>Tipo</th><th>Modelo</th><th>Marca</th><th>Sorteo ID</th><th>Acciones</th></tr>`;
    const rows = items.map(p => `
      <tr>
        <td>${p.id}</td>
        <td>${p.tipo ?? ''}</td>
        <td>${p.modelo ?? ''}</td>
        <td>${p.marca ?? ''}</td>
        <td>${p.sorteo?.id ?? ''}</td>
        <td>
          <button data-id="${p.id}" class="premio-edit">Editar</button>
          <button data-id="${p.id}" class="premio-del danger">Eliminar</button>
        </td>
      </tr>`).join('');
    tblPremios.innerHTML = head + rows;
    $$('#tblPremios .premio-edit').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      const it = await API.getPremio(id);
      $('#premioId').value = it.id;
      $('#premioIdDisplay').value = it.id ?? '';
      $('#premioTipo').value = it.tipo ?? '';
      $('#premioModelo').value = it.modelo ?? '';
      $('#premioMarca').value = it.marca ?? '';
      $('#premioSorteoId').value = it.sorteo?.id ?? '';
      show('premios');
    }));
    $$('#tblPremios .premio-del').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      if (!confirm('¿Eliminar premio?')) return;
      await API.deletePremio(id).catch(() => {});
      notify('success', 'Eliminado');
      loadPremios();
    }));
  }
  async function loadPremios() { try { renderPremios(await API.getPremios()); } catch { tblPremios.innerHTML = '<tr><td>Error</td></tr>'; } }

  // Cartones
  const tblCartones = $('#tblCartones');
  const formCarton = $('#formCarton');
  $('#btnCartonesList').addEventListener('click', loadCartones);
  $('#btnCartonGetSerie').addEventListener('click', async () => {
    const ser = API.S($('#cartonGetSerie').value);
    if (!ser) return notify('error', 'Serie requerida');
    try { const it = await API.getCartonBySerie(ser); renderCartones(it ? [it] : []); } catch { notify('error', 'No encontrado'); }
  });
  $('#btnCartonGetId').addEventListener('click', async () => {
    const id = API.N($('#cartonGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try { const it = await API.getCartonById(id); renderCartones(it ? [it] : []); } catch { notify('error', 'No encontrado'); }
  });
  $('#btnCartonReset').addEventListener('click', () => { formCarton.reset(); $('#cartonId').value=''; });
  $('#btnCartonDelete').addEventListener('click', async () => {
    const serie = API.S($('#cartonSerie').value);
    if (!serie) return notify('error', 'Indique nro_serie a eliminar');
    if (!confirm('¿Eliminar cartón?')) return;
    try {
      await API.deleteCarton(serie);
      formCarton.reset();
      $('#cartonId').value='';
      notify('success', 'Eliminado');
      loadCartones();
    } catch (e) {
      notify('error', 'No se pudo eliminar');
    }
  });
  $('#formCartonEstado').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const serie = API.S($('#cartonEstadoSerie').value);
    const estado = API.S($('#cartonEstadoNuevo').value);
    if (!serie || !estado) return notify('error', 'Complete ambos campos');
    try { await API.updateCartonEstado(serie, estado); notify('success', 'Estado actualizado'); loadCartones(); }
    catch { notify('error', 'Error al actualizar estado'); }
  });
  $('#btnCartonEstadoReset').addEventListener('click', () => {
    $('#cartonEstadoSerie').value = '';
    $('#cartonEstadoNuevo').value = '';
  });
  formCarton.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = API.N($('#cartonId').value);
    const nro_serie = API.S($('#cartonSerie').value);
    const nombre_apellido = API.S($('#cartonNombre').value);
    const estado = API.S($('#cartonEstado').value);
    const numeros_b = API.S($('#cartonNumeros').value);
    if (!nro_serie || !nombre_apellido || !estado || !numeros_b) return notify('error', 'Complete todos los campos');
    const payload = { nro_serie, nombre_apellido, estado, numeros_b };
    try {
      if (id) await API.updateCarton(nro_serie, payload); else await API.createCarton(payload);
      notify('success', 'Guardado');
      formCarton.reset();
      $('#cartonId').value='';
      loadCartones();
    } catch { notify('error', 'Error al guardar'); }
  });

  $('#btnCartonSaveNew').addEventListener('click', async () => {
    const nro_serie = API.S($('#cartonSerie').value);
    const nombre_apellido = API.S($('#cartonNombre').value);
    const estado = API.S($('#cartonEstado').value);
    const numeros_b = API.S($('#cartonNumeros').value);
    if (!nro_serie || !nombre_apellido || !estado || !numeros_b) return notify('error', 'Complete todos los campos');
    const payload = { nro_serie, nombre_apellido, estado, numeros_b };
    try {
      await API.createCarton(payload);
      notify('success', 'Creado como nuevo');
      formCarton.reset();
      $('#cartonId').value='';
      loadCartones();
    } catch { notify('error', 'Error al crear'); }
  });
  function renderCartones(items) {
    const head = `<tr><th>ID</th><th>Serie</th><th>Nombre</th><th>Estado</th><th>Números B</th><th>Acciones</th></tr>`;
    const rows = (items || []).map(c => `
      <tr>
        <td>${c.id}</td>
        <td>${c.nro_serie ?? ''}</td>
        <td>${c.nombre_apellido ?? ''}</td>
        <td>${c.estado ?? ''}</td>
        <td>${c.numeros_b ?? ''}</td>
        <td>
          <button class="carton-edit" data-serie="${c.nro_serie}">Editar</button>
          <button class="carton-del danger" data-serie="${c.nro_serie}">Eliminar</button>
        </td>
      </tr>`).join('');
    tblCartones.innerHTML = head + rows;
    $$('#tblCartones .carton-edit').forEach(b => b.addEventListener('click', async () => {
      const it = await API.getCartonBySerie(b.dataset.serie);
      if (!it) return;
      $('#cartonId').value = it.id;
      $('#cartonSerie').value = it.nro_serie ?? '';
      $('#cartonNombre').value = it.nombre_apellido ?? '';
      $('#cartonEstado').value = it.estado ?? '';
      $('#cartonNumeros').value = it.numeros_b ?? '';
      show('cartones');
    }));
    $$('#tblCartones .carton-del').forEach(b => b.addEventListener('click', async () => {
      const serie = API.S(b.dataset.serie);
      if (!confirm('¿Eliminar cartón?')) return;
      try {
        await API.deleteCarton(serie);
        notify('success', 'Eliminado');
        loadCartones();
      } catch (e) {
        notify('error', 'No se pudo eliminar');
      }
    }));
  }
  async function loadCartones() { try { renderCartones(await API.getCartones()); } catch { tblCartones.innerHTML = '<tr><td>Error</td></tr>'; } }

  // Ganadores
  const tblGanadores = $('#tblGanadores');
  const formGanador = $('#formGanador');
  $('#btnGanadoresList').addEventListener('click', loadGanadores);
  $('#btnGanadorGet').addEventListener('click', async () => {
    const id = API.N($('#ganadorGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try { const it = await API.getGanador(id); renderGanadores([it]); } catch { notify('error', 'No encontrado'); }
  });
  $('#btnGanadorReset').addEventListener('click', () => { formGanador.reset(); $('#ganadorId').value=''; $('#ganadorIdDisplay').value=''; });
  $('#btnGanadorDelete').addEventListener('click', async () => {
    const id = API.N($('#ganadorId').value);
    if (!id) return notify('error', 'Seleccione un ganador');
    if (!confirm('¿Eliminar ganador?')) return;
    await API.deleteGanador(id).catch(() => {});
    formGanador.reset();
    $('#ganadorId').value='';
    $('#ganadorIdDisplay').value='';
    notify('success', 'Eliminado');
    loadGanadores();
  });
  formGanador.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const id = API.N($('#ganadorId').value);
    const dni = API.S($('#ganadorDni').value);
    const nombre_apellido = API.S($('#ganadorNombre').value);
    const nro_serie_carton = API.S($('#ganadorSerie').value);
    const telefono = API.S($('#ganadorTelefono').value);
    if (!dni || !nombre_apellido || !nro_serie_carton || !telefono) return notify('error', 'Complete todos los campos');
    const payload = { dni, nombre_apellido, nro_serie_carton, telefono };
    try {
      if (id) await API.updateGanador(id, payload); else await API.createGanador(payload);
      notify('success', 'Guardado');
      formGanador.reset();
      $('#ganadorId').value='';
      $('#ganadorIdDisplay').value='';
      loadGanadores();
    } catch { notify('error', 'Error al guardar'); }
  });

  $('#btnGanadorSaveNew').addEventListener('click', async () => {
    const dni = API.S($('#ganadorDni').value);
    const nombre_apellido = API.S($('#ganadorNombre').value);
    const nro_serie_carton = API.S($('#ganadorSerie').value);
    const telefono = API.S($('#ganadorTelefono').value);
    if (!dni || !nombre_apellido || !nro_serie_carton || !telefono) return notify('error', 'Complete todos los campos');
    const payload = { dni, nombre_apellido, nro_serie_carton, telefono };
    try {
      await API.createGanador(payload);
      notify('success', 'Creado como nuevo');
      formGanador.reset();
      $('#ganadorId').value='';
      $('#ganadorIdDisplay').value='';
      loadGanadores();
    } catch { notify('error', 'Error al crear'); }
  });
  function renderGanadores(items) {
    const head = `<tr><th>ID</th><th>DNI</th><th>Nombre</th><th>Serie Cartón</th><th>Teléfono</th><th>Acciones</th></tr>`;
    const rows = items.map(g => `
      <tr>
        <td>${g.id}</td>
        <td>${g.dni ?? ''}</td>
        <td>${g.nombre_apellido ?? ''}</td>
        <td>${g.nro_serie_carton ?? ''}</td>
        <td>${g.telefono ?? ''}</td>
        <td>
          <button class="ganador-edit" data-id="${g.id}">Editar</button>
          <button class="ganador-del danger" data-id="${g.id}">Eliminar</button>
        </td>
      </tr>`).join('');
    tblGanadores.innerHTML = head + rows;
    $$('#tblGanadores .ganador-edit').forEach(b => b.addEventListener('click', async () => {
      const it = await API.getGanador(API.N(b.dataset.id));
      $('#ganadorId').value = it.id;
      $('#ganadorIdDisplay').value = it.id ?? '';
      $('#ganadorDni').value = it.dni ?? '';
      $('#ganadorNombre').value = it.nombre_apellido ?? '';
      $('#ganadorSerie').value = it.nro_serie_carton ?? '';
      $('#ganadorTelefono').value = it.telefono ?? '';
      show('ganadores');
    }));
    $$('#tblGanadores .ganador-del').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      if (!confirm('¿Eliminar ganador?')) return;
      await API.deleteGanador(id).catch(() => {});
      notify('success', 'Eliminado');
      loadGanadores();
    }));
  }
  async function loadGanadores() { try { renderGanadores(await API.getGanadores()); } catch { tblGanadores.innerHTML = '<tr><td>Error</td></tr>'; } }

  // Inicialización
  loadSorteos();
  loadPremios();
  loadCartones();
  loadGanadores();
})();



