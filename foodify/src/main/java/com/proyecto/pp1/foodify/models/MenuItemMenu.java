package com.proyecto.pp1.foodify.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "menu_itemMenu")
public class MenuItemMenu {
    @Id
    @Getter
    @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_menu")
    private Menu menu;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "id_itemMenu")
    private ItemMenu itemMenu;
}
