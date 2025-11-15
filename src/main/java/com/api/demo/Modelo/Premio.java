package com.api.demo.Modelo;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.*;

@Entity

@Table(name = "premio")
// Esta clase representa un Premio que se entrega en un sorteo.
public class Premio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_premio")
	// Identificador del premio
	private long id;
	
	
	@ManyToOne
    @JoinColumn(name = "id_sorteo", nullable = false)
    // A qué sorteo pertenece este premio
    private Sorteo sorteo;
	
	@Column(name = "tipo", length = 50)
	// Tipo de premio (ej: electrodoméstico, viaje)
	private String tipo;
	
	@Column(name = "modelo", length = 100)
	// Modelo del premio (si aplica)
	private String modelo;
	
	@Column(name = "marca", length = 50)
	// Marca del premio (si aplica)
	private String marca;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Sorteo getSorteo() {
		return sorteo;
	}

	public void setSorteo(Sorteo sorteo) {
		this.sorteo = sorteo;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getModelo() {
		return modelo;
	}

	public void setModelo(String modelo) {
		this.modelo = modelo;
	}

	public String getMarca() {
		return marca;
	}

	public void setMarca(String marca) {
		this.marca = marca;
	}


	
}