package com.api.demo.Modelo;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name = "carton")
// Esta clase representa un Cartón del sorteo. Acá guardamos sus datos básicos.
public class Carton {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_carton")
	// Identificador único del cartón (lo genera la base de datos)
	private long id;
	
	@Column(name = "nro_serie", length = 20, unique = true)
	// Número de serie del cartón (no se puede repetir)
	private String nroserie;
	
	@Column(name = "nombre_apellido", length = 100)
	// Nombre y apellido de la persona dueña del cartón
	private String nombreapellido;
	
	@Column(name = "estado", length = 15)
	// Estado del cartón (por ejemplo: activo, anulado, usado)
	private String estado;
	
	@Column(name = "numeros_b", length = 50)
	// Números del cartón (formato en texto)
	private String numerosb;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNro_serie() {
		return nroserie;
	}

	public void setNro_serie(String nro_serie) {
		this.nroserie = nro_serie;
	}

	public String getNombre_apellido() {
		return nombreapellido;
	}

	public void setNombre_apellido(String nombre_apellido) {
		this.nombreapellido = nombre_apellido;
	}

	public String getEstado() {
		return estado;
	}

	public void setEstado(String estado) {
		this.estado = estado;
	}

	public String getNumeros_b() {
		return numerosb;
	}

	public void setNumeros_b(String numeros_b) {
		this.numerosb = numeros_b;
	}

}