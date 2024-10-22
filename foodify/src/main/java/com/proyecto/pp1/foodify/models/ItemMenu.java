package com.proyecto.pp1.foodify.models;

import java.util.HashSet;
import java.util.Set;

import com.proyecto.pp1.foodify.models.modelsEnum.CategoriaEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "item_menu")
public class ItemMenu {
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Getter
    @Setter
    @Column(name = "nombre")
    private String nombre;

    @Getter
    @Setter
    @Column(name = "stock")
    private int stock;

    @Getter
    @Setter
    @Column(name = "descripcion")
    private String descripcion;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(name = "categoria")
    private CategoriaEnum categoria;

    @OneToMany(mappedBy = "itemMenu")
    private Set<Dia> dia = new HashSet<>();

    @OneToMany(mappedBy = "itemMenu")
    private Set<PedidoItemMenu> pedidos = new HashSet<>();

    @OneToMany(mappedBy = "itemMenu")
    private Set<MenuItemMenu> menus = new HashSet<>();
}
