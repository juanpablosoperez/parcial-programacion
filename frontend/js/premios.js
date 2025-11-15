/*
  Módulo: Premios
  ---------------
  Maneja ABM de Premios y su asociación a un Sorteo por id.
*/
(() => {
  const { $, $$, notify, show } = window.UI;

  const tblPremios = $('#tblPremios');
  const formPremio = $('#formPremio');

  // Listar todos
  $('#btnPremiosList').addEventListener('click', loadPremios);
  $('#btnPremioGet').addEventListener('click', async () => {
    // Obtener un premio por ID
    const id = API.N($('#premioGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try { const it = await API.getPremio(id); renderPremios([it]); } catch { notify('error', 'No encontrado'); }
  });
  // Limpiar formulario
  $('#btnPremioReset').addEventListener('click', () => { formPremio.reset(); $('#premioId').value=''; $('#premioIdDisplay').value=''; });
  $('#btnPremioDelete').addEventListener('click', async () => {
    // Eliminar por ID cargado en form
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
    // Alta/Edición según id
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
    // Alta directa sin considerar id
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

  // Render de tabla y enlaces de acción por fila
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
          <button data-id="${p.id}" class="premio-edit secondary">Editar</button>
          <button data-id="${p.id}" class="premio-del danger">Eliminar</button>
        </td>
      </tr>`).join('');
    tblPremios.innerHTML = head + rows;
    // Cargar un premio para edición
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
    // Eliminar desde tabla
    $$('#tblPremios .premio-del').forEach(b => b.addEventListener('click', async () => {
      const id = API.N(b.dataset.id);
      if (!confirm('¿Eliminar premio?')) return;
      await API.deletePremio(id).catch(() => {});
      notify('success', 'Eliminado');
      loadPremios();
    }));
  }

  // Listar con manejo de error básico
  async function loadPremios() { try { renderPremios(await API.getPremios()); } catch { tblPremios.innerHTML = '<tr><td>Error</td></tr>'; } }

  // init
  loadPremios();
})();


