package com.api.demo.Servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.demo.Modelo.Premio;
import com.api.demo.Repositorio.PremioRepositorio;

@Service
public class PremioServicio {

	private final PremioRepositorio premioRepositorio;

	public PremioServicio(PremioRepositorio premioRepositorio) {
		this.premioRepositorio = premioRepositorio;
	}

	// insertar
	public Premio crear(Premio premio) {
		return premioRepositorio.save(premio);
	}
	
	
	// listar
	public List<Premio> listar() {
		return premioRepositorio.findAll();
	}

	
	// obtener por ID
	public Premio obtenerPorId(Long id) {
		return premioRepositorio.findById(id).orElse(null);
	}

	
	// actualizar 
	public Premio actualizar(Long id, Premio datos) {
		return premioRepositorio.findById(id)
			.map(actual -> {
				actual.setMarca(datos.getMarca());
				actual.setModelo(datos.getModelo());
				actual.setTipo(datos.getTipo());
				actual.setSorteo(datos.getSorteo());
				return premioRepositorio.save(actual);
			})
			.orElse(null);
	}

	// eliminar
	public boolean eliminar(Long id) {
		if (premioRepositorio.existsById(id)) {
			premioRepositorio.deleteById(id);
			return true;
		}
		return false;
	}
}


