package com.proyecto.pp1.foodify.dao;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.proyecto.pp1.foodify.models.Pedido;
import com.proyecto.pp1.foodify.models.PedidoItemMenu;
import com.proyecto.pp1.foodify.models.modelsEnum.CategoriaEnum;
import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;
import com.proyecto.pp1.foodify.request.PedidoRequest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class EmpleadoDaoImpl implements IEmpleadoDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public void agregarPedido(Pedido pedido, List<PedidoItemMenu> pedidoItemMenu) {
        entityManager.createQuery("DELETE FROM PedidoItemMenu").executeUpdate();
        entityManager.createQuery("DELETE FROM Pedido").executeUpdate();

        entityManager.persist(pedido);

        for (PedidoItemMenu pedidoItemMenu2 : pedidoItemMenu) {

            pedidoItemMenu2.setPedido(pedido);
            entityManager.persist(pedidoItemMenu2);
        }
    }

    @Override
    public void modificarPedido(PedidoItemMenu pedidoItemMenu) {

    }

    @Override
    public List<PedidoRequest> getPedido() {
        String sql = "SELECT pim.dia, pim.cantidad, im.nombre, im.categoria FROM pedido_item_menu pim" +
                " INNER JOIN item_menu im ON im.id = pim.id_item_menu";

        List<Object[]> resultados = entityManager.createNativeQuery(sql).getResultList();

        List<PedidoRequest> pedidoRequests = resultados.stream()
                .map(r -> {
                    DiaEnum dia = DiaEnum.valueOf((String) r[0]);
                    int cantidad = (Integer) r[1];
                    String nombre = (String) r[2];
                    CategoriaEnum categoria = CategoriaEnum.valueOf((String) r[3]);

                    return new PedidoRequest(dia, cantidad, nombre, categoria);
                })
                .collect(Collectors.toList());

        return pedidoRequests;
    }

}
