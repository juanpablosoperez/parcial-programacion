/*
  Módulo: Sorteos
  ---------------
  Contiene toda la lógica de UI para listar, crear, editar y eliminar Sorteos.
  Se apoya en utilidades de `UI` y en el cliente `API` para llamar al backend.
*/
(() => {
  const { $, $$, notify, toDateTimeLocal, show } = window.UI;

  const tblSorteos = $('#tblSorteos');
  const formSorteo = $('#formSorteo');

  // Listar todos los sorteos
  $('#btnSorteosList').addEventListener('click', loadSorteos);
  $('#btnSorteoGet').addEventListener('click', async () => {
    // Buscar un sorteo puntual por ID y renderizar solo ese
    const id = API.N($('#sorteoGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try {
      const it = await API.getSorteo(id);
      renderSorteos([it]);
    } catch (e) { notify('error', 'No encontrado'); }
  });
  // Limpiar formulario y estado interno
  $('#btnSorteoReset').addEventListener('click', () => { formSorteo.reset(); $('#sorteoId').value=''; $('#sorteoIdDisplay').value=''; });
  $('#btnSorteoDelete').addEventListener('click', async () => {
    // Eliminar sorteo seleccionado por ID oculto
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
    // Armo payload y guardo: si hay id -> update, sino -> create
    const id = API.N($('#sorteoId').value);
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
      if (id) await API.updateSorteo(id, payload); else await API.createSorteo(payload);
      notify('success', 'Guardado');
      formSorteo.reset();
      $('#sorteoId').value='';
      $('#sorteoIdDisplay').value='';
      loadSorteos();
    } catch (e) { notify('error', 'Error al guardar'); }
  });

  $('#btnSorteoSaveNew').addEventListener('click', async () => {
    // Forzar alta siempre como nuevo (ignora id)
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

  // Pinta la tabla de sorteos y conecta acciones de cada fila
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
          <button data-id="${s.id}" class="sorteo-edit secondary">Editar</button>
          <button data-id="${s.id}" class="sorteo-del danger">Eliminar</button>
        </td>
      </tr>`).join('');
    tblSorteos.innerHTML = head + rows;
    // Cargar datos del sorteo en el formulario para editar
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
    // Eliminar desde la tabla
    $$('#tblSorteos .sorteo-del').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      if (!confirm('¿Eliminar sorteo?')) return;
      await API.deleteSorteo(id).catch(() => {});
      notify('success', 'Eliminado');
      loadSorteos();
    }));
  }

  // Obtiene desde API y renderiza (maneja error sencillo)
  async function loadSorteos() {
    try { const data = await API.getSorteos(); renderSorteos(data); }
    catch { tblSorteos.innerHTML = '<tr><td>Error al cargar</td></tr>'; }
  }

  // init: cargo listado al iniciar módulo
  loadSorteos();
})();


