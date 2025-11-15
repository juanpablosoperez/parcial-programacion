package com.api.demo.Servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.demo.Modelo.Ganador;
import com.api.demo.Repositorio.GanadorRepositorio;

@Service
// Servicio con la lógica de Ganadores (crear, listar, etc.)
public class GanadorServicio {

	// Repositorio para acceder a los ganadores en la base
	private final GanadorRepositorio ganadorRepositorio;

	public GanadorServicio(GanadorRepositorio ganadorRepositorio) {
		this.ganadorRepositorio = ganadorRepositorio;
	}

	// insertar
	public Ganador crear(Ganador ganador) {
		return ganadorRepositorio.save(ganador);
	}

	// listar
	public List<Ganador> listar() {
		return ganadorRepositorio.findAll();
	}
	
	//obtener por id

	public Ganador obtenerPorId(Long id) {
		return ganadorRepositorio.findById(id).orElse(null);
	}

	// actualizar
	public Ganador actualizar(Long id, Ganador datos) {
		return ganadorRepositorio.findById(id)
			.map(actual -> {
				actual.setDni(datos.getDni());
				actual.setNombre_apellido(datos.getNombre_apellido());
				actual.setNro_serie_carton(datos.getNro_serie_carton());
				actual.setTelefono(datos.getTelefono());
				return ganadorRepositorio.save(actual);
			})
			.orElse(null);
	}

	// eliminar
	public boolean eliminar(Long id) {
		if (ganadorRepositorio.existsById(id)) {
			ganadorRepositorio.deleteById(id);
			return true;
		}
		return false;
	}
}


