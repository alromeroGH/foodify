package com.proyecto.pp1.foodify.dao;

import java.util.List;

import com.proyecto.pp1.foodify.models.Pedido;
import com.proyecto.pp1.foodify.models.PedidoItemMenu;
import com.proyecto.pp1.foodify.request.PedidoRequest;

public interface IEmpleadoDao {
    void agregarPedido(Pedido pedido, List<PedidoItemMenu> pedidoItemMenu);

    void modificarPedido(PedidoItemMenu pedidoItemMenu);

    void eliminarPedido();

    List<PedidoRequest> getPedido();
}
