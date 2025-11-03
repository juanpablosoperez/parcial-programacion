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

import com.api.demo.Modelo.Ganador;
import com.api.demo.Servicio.GanadorServicio;

@RestController
@RequestMapping("/api/ganadores")
public class GanadorControlador {

	private final GanadorServicio ganadorServicio;

	public GanadorControlador(GanadorServicio ganadorServicio) {
		this.ganadorServicio = ganadorServicio;
	}

	@PostMapping
	public ResponseEntity<Ganador> crear(@RequestBody Ganador body) {
		Ganador creado = ganadorServicio.crear(body);
		return new ResponseEntity<>(creado, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Ganador>> listar() {
		return new ResponseEntity<>(ganadorServicio.listar(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Ganador> obtener(@PathVariable("id") Long id) {
		Ganador g = ganadorServicio.obtenerPorId(id);
		return g != null ? new ResponseEntity<>(g, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Ganador> actualizar(@PathVariable("id") Long id, @RequestBody Ganador body) {
		Ganador actualizado = ganadorServicio.actualizar(id, body);
		return actualizado != null ? new ResponseEntity<>(actualizado, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable("id") Long id) {
		boolean eliminado = ganadorServicio.eliminar(id);
		return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}


