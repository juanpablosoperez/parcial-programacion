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
public class Premio {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_premio")
	private long id;
	
	
	@ManyToOne
    @JoinColumn(name = "id_sorteo", nullable = false)
    private Sorteo sorteo;
	
	@Column(name = "tipo", length = 50)
	private String tipo;
	
	@Column(name = "modelo", length = 100)
	private String modelo;
	
	@Column(name = "marca", length = 50)
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