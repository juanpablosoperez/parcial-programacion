package com.api.demo.Modelo;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity

@Table(name = "carton")
public class Carton {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_carton")
	private long id;
	
	@Column(name = "nro_serie", length = 20)
	private String nroserie;
	
	@Column(name = "nombre_apellido", length = 100)
	private String nombreapellido;
	
	@Column(name = "estado", length = 15)
	private String estado;
	
	@Column(name = "numeros_b", length = 50)
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