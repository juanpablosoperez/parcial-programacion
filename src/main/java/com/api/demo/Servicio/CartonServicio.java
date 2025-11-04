package com.api.demo.Servicio;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.api.demo.Modelo.Carton;
import com.api.demo.Repositorio.CartonRepositorio;

@Service
public class CartonServicio {

	private final CartonRepositorio cartonRepositorio;

	public CartonServicio(CartonRepositorio cartonRepositorio) {
		this.cartonRepositorio = cartonRepositorio;
	}

	
    // crear carton 
    @Transactional
    public Carton crear(Carton carton) {
		return cartonRepositorio.save(carton);
	}
	
	
	// listar carton
	public List<Carton> listar() {
		return cartonRepositorio.findAll();
	}
	
    // obtener por nro de serie (si existen duplicados devuelve el primero)
    public Carton obtenerPorNroSerie(String nroSerie) {
        var lista = cartonRepositorio.findAllByNroserie(nroSerie);
        return (lista == null || lista.isEmpty()) ? null : lista.get(0);
    }

	// obtener por id
	public Carton obtenerPorId(Long id) {
		return cartonRepositorio.findById(id).orElse(null);
	}

	
	// actualizar estado
    @Transactional
    public Carton actualizarEstado(String nroSerie, String nuevoEstado) {
        var lista = cartonRepositorio.findAllByNroserie(nroSerie);
        if (lista == null || lista.isEmpty()) {
            return null;
        }
        Carton carton = lista.get(0);
        carton.setEstado(nuevoEstado);
        return cartonRepositorio.save(carton);
    }

	// actualizar completo por nro_serie
    @Transactional
    public Carton actualizar(String nroSerie, Carton datos) {
        var lista = cartonRepositorio.findAllByNroserie(nroSerie);
        if (lista == null || lista.isEmpty()) {
            return null;
        }
        Carton carton = lista.get(0);
        carton.setNro_serie(datos.getNro_serie());
        carton.setNombre_apellido(datos.getNombre_apellido());
        carton.setEstado(datos.getEstado());
        carton.setNumeros_b(datos.getNumeros_b());
        return cartonRepositorio.save(carton);
    }

	// eliminar por nro_serie
    @Transactional
    public boolean eliminar(String nroSerie) {
        long eliminados = cartonRepositorio.deleteByNroserie(nroSerie);
        return eliminados > 0;
    }
}


