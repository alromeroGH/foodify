package com.proyecto.pp1.foodify.models;

import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "pedido_item_menu")
public class PedidoItemMenu {
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter
    @Setter
    @Enumerated(EnumType.STRING)
    @Column(name = "dia")
    private DiaEnum dia;

    @Getter
    @Setter
    @Column(name = "cantidad")
    private int cantidad;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_pedido")
    private Pedido pedido;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_item_menu")
    private ItemMenu itemMenu;
}
