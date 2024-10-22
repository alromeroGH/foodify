package com.proyecto.pp1.foodify.request;

import com.proyecto.pp1.foodify.models.ItemMenu;
import com.proyecto.pp1.foodify.models.modelsEnum.CategoriaEnum;
import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

public class MenuRequest {
    @Getter
    @Setter
    private ItemMenu itemMenuNuevo;

    @Getter
    @Setter
    private List<DiaEnum> diasMenuNuevo;

    @Getter
    @Setter
    private String diasMenu;

    public MenuRequest(int id, String nombre, String descripcion, CategoriaEnum categoria, int stock,
            String dias) {
        this.itemMenuNuevo = new ItemMenu();
        this.itemMenuNuevo.setId(id);
        this.itemMenuNuevo.setNombre(nombre);
        this.itemMenuNuevo.setDescripcion(descripcion);
        this.itemMenuNuevo.setCategoria(categoria);
        this.itemMenuNuevo.setStock(stock);

        this.diasMenu = dias;
    }
}
