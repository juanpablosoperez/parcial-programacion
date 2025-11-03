package com.api.demo.Servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.demo.Modelo.Sorteo;
import com.api.demo.Repositorio.SorteoRepositorio;

@Service
public class SorteoServicio {

	private final SorteoRepositorio sorteoRepositorio;

	public SorteoServicio(SorteoRepositorio sorteoRepositorio) {
		this.sorteoRepositorio = sorteoRepositorio;
	}
	
	// insertar sorteo

	public Sorteo crear(Sorteo sorteo) {
		return sorteoRepositorio.save(sorteo);
	}

	
	// listar
	public List<Sorteo> listar() {
		return sorteoRepositorio.findAll();
	}

	
	// obtener por id
	public Sorteo obtenerPorId(Long id) {
		return sorteoRepositorio.findById(id).orElse(null);
	}

	// actualizar
	public Sorteo actualizar(Long id, Sorteo datos) {
		return sorteoRepositorio.findById(id)
			.map(actual -> {
				actual.setFecha(datos.getFecha());
				actual.setHora(datos.getHora());
				actual.setEstado(datos.getEstado());
				actual.setLugar(datos.getLugar());
				return sorteoRepositorio.save(actual);
			})
			.orElse(null);
	}

	// eliminar
	public boolean eliminar(Long id) {
		if (sorteoRepositorio.existsById(id)) {
			sorteoRepositorio.deleteById(id);
			return true;
		}
		return false;
	}
}


