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

import com.api.demo.Modelo.Premio;
import com.api.demo.Servicio.PremioServicio;

@RestController
@RequestMapping("/api/premios")
public class PremioControlador {

	private final PremioServicio premioServicio;

	public PremioControlador(PremioServicio premioServicio) {
		this.premioServicio = premioServicio;
	}

	@PostMapping
	public ResponseEntity<Premio> crear(@RequestBody Premio body) {
		Premio creado = premioServicio.crear(body);
		return new ResponseEntity<>(creado, HttpStatus.CREATED);
	}

	@GetMapping
	public ResponseEntity<List<Premio>> listar() {
		return new ResponseEntity<>(premioServicio.listar(), HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Premio> obtener(@PathVariable("id") Long id) {
		Premio p = premioServicio.obtenerPorId(id);
		return p != null ? new ResponseEntity<>(p, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@PutMapping("/{id}")
	public ResponseEntity<Premio> actualizar(@PathVariable("id") Long id, @RequestBody Premio body) {
		Premio actualizado = premioServicio.actualizar(id, body);
		return actualizado != null ? new ResponseEntity<>(actualizado, HttpStatus.OK) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> eliminar(@PathVariable("id") Long id) {
		boolean eliminado = premioServicio.eliminar(id);
		return eliminado ? new ResponseEntity<>(HttpStatus.NO_CONTENT) : new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
}



