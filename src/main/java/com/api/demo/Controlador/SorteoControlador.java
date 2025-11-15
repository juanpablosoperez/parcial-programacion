package com.api.demo.Controlador;

import java.util.List;

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

import com.api.demo.Modelo.Sorteo;
import com.api.demo.Servicio.SorteoServicio;

@RestController
@RequestMapping("/api/sorteos")
// Controlador REST para sorteos. Define los endpoints de CRUD
public class SorteoControlador {

	private final SorteoServicio sorteoServicio;

	public SorteoControlador(SorteoServicio sorteoServicio) {
		this.sorteoServicio = sorteoServicio;
	}

	@PostMapping
	// Crea un sorteo nuevo
	public ResponseEntity<Sorteo> crear(@RequestBody Sorteo body) {
		Sorteo creado = sorteoServicio.crear(body);
		return new ResponseEntity<>(creado, HttpStatus.CREATED);
	}

	@GetMapping
	// Lista todos los sorteos
	public ResponseEntity<List<Sorteo>> listar() {
		return new ResponseEntity<>(sorteoServicio.listar(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	// Trae un sorteo por id
	public ResponseEntity<Sorteo> obtener(@PathVariable("id") Long id) {
		Sorteo s = sorteoServicio.obtenerPorId(id);
		return s != null ? new ResponseEntity<>(s, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{id}")
	// Actualiza datos de un sorteo
	public ResponseEntity<Sorteo> actualizar(@PathVariable("id") Long id, @RequestBody Sorteo body) {
		Sorteo actualizado = sorteoServicio.actualizar(id, body);
		return actualizado != null ? new ResponseEntity<>(actualizado, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	// Elimina un sorteo por id
	public ResponseEntity<Void> eliminar(@PathVariable("id") Long id) {
		boolean eliminado = sorteoServicio.eliminar(id);
		return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}


