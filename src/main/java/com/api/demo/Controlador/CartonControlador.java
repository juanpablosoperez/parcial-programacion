package com.api.demo.Controlador;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.demo.Modelo.Carton;
import com.api.demo.Servicio.CartonServicio;

@RestController
@RequestMapping("/api/cartones")
// Controlador REST para cartones. Maneja altas, bajas, cambios y consultas
public class CartonControlador {

	private final CartonServicio cartonServicio;

	public CartonControlador(CartonServicio cartonServicio) {
		this.cartonServicio = cartonServicio;
	}

	@PostMapping
	// Crea un cartón nuevo
	public ResponseEntity<Carton> crear(@RequestBody Carton body) {
		Carton creado = cartonServicio.crear(body);
		return new ResponseEntity<>(creado, HttpStatus.CREATED);
	}

	@GetMapping
	// Lista todos los cartones
	public ResponseEntity<List<Carton>> listar() {
		return new ResponseEntity<>(cartonServicio.listar(), HttpStatus.OK);
	}

	@GetMapping("/{nro_serie}")
	// Busca un cartón por su número de serie
	public ResponseEntity<Carton> obtenerPorNroSerie(@PathVariable("nro_serie") String nroSerie) {
		Carton c = cartonServicio.obtenerPorNroSerie(nroSerie);
		return c != null ? new ResponseEntity<>(c, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@GetMapping("/id/{id}")
	// Busca un cartón por id
	public ResponseEntity<Carton> obtenerPorId(@PathVariable("id") Long id) {
		Carton c = cartonServicio.obtenerPorId(id);
		return c != null ? new ResponseEntity<>(c, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{nro_serie}")
	// Actualiza datos de un cartón
	public ResponseEntity<Carton> actualizar(
			@PathVariable("nro_serie") String nroSerie,
			@RequestBody Carton body) {
		Carton actualizado = cartonServicio.actualizar(nroSerie, body);
		return actualizado != null ? new ResponseEntity<>(actualizado, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{nro_serie}/estado")
	// Cambia solo el estado del cartón
	public ResponseEntity<Carton> actualizarEstado(
			@PathVariable("nro_serie") String nroSerie,
			@RequestBody Map<String, String> body) {
		String estado = body.get("estado");
		Carton actualizado = cartonServicio.actualizarEstado(nroSerie, estado);
		return actualizado != null ? new ResponseEntity<>(actualizado, HttpStatus.OK)
				: new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{nro_serie}")
	// Elimina un cartón por número de serie
	public ResponseEntity<Void> eliminar(@PathVariable("nro_serie") String nroSerie) {
		boolean eliminado = cartonServicio.eliminar(nroSerie);
		return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}



