package com.proyecto.pp1.foodify.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.pp1.foodify.dao.IEmpleadoDao;
import com.proyecto.pp1.foodify.models.Pedido;
import com.proyecto.pp1.foodify.models.PedidoItemMenu;
import com.proyecto.pp1.foodify.request.PedidoRequest;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class EmpleadoController {
    @Autowired
    public IEmpleadoDao empleadoDao;

    @PostMapping("/agregar/pedido")
    public String agregarPedido(@RequestBody PedidoRequest pedidoRequest) {
        Pedido pedido = pedidoRequest.getPedido();
        List<PedidoItemMenu> pedidoItemMenu = pedidoRequest.getPedidoItemMenus();

        empleadoDao.agregarPedido(pedido, pedidoItemMenu);

        return "OK";
    }

    @PostMapping("/eliminar/pedido")
    public String eliminarPedido() {
        empleadoDao.eliminarPedido();
        return "OK";
    }

    @GetMapping("/obtener/pedido")
    public List<PedidoRequest> getPedido() {
        return empleadoDao.getPedido();
    }
}
