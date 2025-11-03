package com.api.demo.Servicio;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.demo.Modelo.Carton;
import com.api.demo.Repositorio.CartonRepositorio;

@Service
public class CartonServicio {

	private final CartonRepositorio cartonRepositorio;

	public CartonServicio(CartonRepositorio cartonRepositorio) {
		this.cartonRepositorio = cartonRepositorio;
	}

	
	// crear carton 
	public Carton crear(Carton carton) {
		return cartonRepositorio.save(carton);
	}
	
	
	// listar carton
	public List<Carton> listar() {
		return cartonRepositorio.findAll();
	}
	
	// obtener por nro de serie
	public Carton obtenerPorNroSerie(String nroSerie) {
		return cartonRepositorio.findByNroserie(nroSerie);
	}

	// obtener por id
	public Carton obtenerPorId(Long id) {
		return cartonRepositorio.findById(id).orElse(null);
	}

	
	// actualizar estado
	public Carton actualizarEstado(String nroSerie, String nuevoEstado) {
		Carton carton = cartonRepositorio.findByNroserie(nroSerie);
		if (carton == null) {
			return null;
		}
		carton.setEstado(nuevoEstado);
		return cartonRepositorio.save(carton);
	}

	// actualizar completo por nro_serie
	public Carton actualizar(String nroSerie, Carton datos) {
		Carton carton = cartonRepositorio.findByNroserie(nroSerie);
		if (carton == null) {
			return null;
		}
		carton.setNro_serie(datos.getNro_serie());
		carton.setNombre_apellido(datos.getNombre_apellido());
		carton.setEstado(datos.getEstado());
		carton.setNumeros_b(datos.getNumeros_b());
		return cartonRepositorio.save(carton);
	}

	// eliminar por nro_serie
	public boolean eliminar(String nroSerie) {
		Carton carton = cartonRepositorio.findByNroserie(nroSerie);
		if (carton == null) {
			return false;
		}
		cartonRepositorio.deleteById(carton.getId());
		return true;
	}
}


