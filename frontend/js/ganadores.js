/*
  Módulo: Ganadores
  -----------------
  ABM de ganadores vinculados a un cartón (nro_serie_carton).
*/
(() => {
  const { $, $$, notify, show } = window.UI;

  const tblGanadores = $('#tblGanadores');
  const formGanador = $('#formGanador');

  // Listado general
  $('#btnGanadoresList').addEventListener('click', loadGanadores);
  $('#btnGanadorGet').addEventListener('click', async () => {
    // Obtener un ganador por ID
    const id = API.N($('#ganadorGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try { const it = await API.getGanador(id); renderGanadores([it]); } catch { notify('error', 'No encontrado'); }
  });
  // Limpiar form de ganador
  $('#btnGanadorReset').addEventListener('click', () => { formGanador.reset(); $('#ganadorId').value=''; $('#ganadorIdDisplay').value=''; });
  $('#btnGanadorDelete').addEventListener('click', async () => {
    // Eliminar por ID
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
    // Alta/Edición según id presente
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
    // Alta directa
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

  // Render de tabla y acciones
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
          <button class="ganador-edit secondary" data-id="${g.id}">Editar</button>
          <button class="ganador-del danger" data-id="${g.id}">Eliminar</button>
        </td>
      </tr>`).join('');
    tblGanadores.innerHTML = head + rows;
    // Cargar un ganador al form para editar
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
    // Eliminar desde tabla
    $$('#tblGanadores .ganador-del').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      if (!confirm('¿Eliminar ganador?')) return;
      await API.deleteGanador(id).catch(() => {});
      notify('success', 'Eliminado');
      loadGanadores();
    }));
  }

  // Carga de lista con manejo de error sencillo
  async function loadGanadores() { try { renderGanadores(await API.getGanadores()); } catch { tblGanadores.innerHTML = '<tr><td>Error</td></tr>'; } }

  // init
  loadGanadores();
})();


