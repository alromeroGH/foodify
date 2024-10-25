package com.proyecto.pp1.foodify.request;

import java.util.ArrayList;
import java.util.List;

import com.proyecto.pp1.foodify.models.ItemMenu;
import com.proyecto.pp1.foodify.models.Pedido;
import com.proyecto.pp1.foodify.models.PedidoItemMenu;
import com.proyecto.pp1.foodify.models.modelsEnum.CategoriaEnum;
import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;

import lombok.Getter;
import lombok.Setter;

public class PedidoRequest {
    @Getter
    @Setter
    private Pedido pedido;

    @Getter
    @Setter
    private List<PedidoItemMenu> pedidoItemMenus;

    public PedidoRequest(DiaEnum diaEnum, int cantidad, String nombre, CategoriaEnum categoriaEnum) {
        ItemMenu itemMenu = new ItemMenu();
        itemMenu.setNombre(nombre);
        itemMenu.setCategoria(categoriaEnum);

        PedidoItemMenu pedidoItemMenu = new PedidoItemMenu();

        pedidoItemMenu.setDia(diaEnum);
        pedidoItemMenu.setCantidad(cantidad);
        pedidoItemMenu.setItemMenu(itemMenu);

        this.pedidoItemMenus = new ArrayList<>();

        pedidoItemMenus.add(pedidoItemMenu);
    }
}
