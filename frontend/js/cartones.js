/*
  Módulo: Cartones
  ----------------
  ABM de cartones y actualización de estado por separado.
  Incluye búsquedas por serie o por id.
*/
(() => {
  const { $, $$, notify, show } = window.UI;

  const tblCartones = $('#tblCartones');
  const formCarton = $('#formCarton');

  // Listado general
  $('#btnCartonesList').addEventListener('click', loadCartones);
  $('#btnCartonGetSerie').addEventListener('click', async () => {
    // Búsqueda por nro_serie
    const ser = API.S($('#cartonGetSerie').value);
    if (!ser) return notify('error', 'Serie requerida');
    try { const it = await API.getCartonBySerie(ser); renderCartones(it ? [it] : []); } catch { notify('error', 'No encontrado'); }
  });
  $('#btnCartonGetId').addEventListener('click', async () => {
    // Búsqueda por id
    const id = API.N($('#cartonGetId').value);
    if (!id) return notify('error', 'ID inválido');
    try { const it = await API.getCartonById(id); renderCartones(it ? [it] : []); } catch { notify('error', 'No encontrado'); }
  });
  // Reset del form de alta/edición
  $('#btnCartonReset').addEventListener('click', () => { formCarton.reset(); $('#cartonId').value=''; });
  $('#btnCartonDelete').addEventListener('click', async () => {
    // Eliminación por nro_serie cargado en el form
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
    // Endpoint específico para actualizar SOLO el estado
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
    // Alta/Edición de cartón (id solo para edición; PK real es nro_serie en la API)
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
    // Alta directa
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

  // Render de tabla/cartones y acciones por fila
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
          <button class="carton-edit secondary" data-serie="${c.nro_serie}">Editar</button>
          <button class="carton-del danger" data-serie="${c.nro_serie}">Eliminar</button>
        </td>
      </tr>`).join('');
    tblCartones.innerHTML = head + rows;
    // Cargar datos de un cartón al formulario
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
    // Eliminar desde la tabla por serie
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

  // Carga inicial del listado
  async function loadCartones() { try { renderCartones(await API.getCartones()); } catch { tblCartones.innerHTML = '<tr><td>Error</td></tr>'; } }

  // init
  loadCartones();
})();


