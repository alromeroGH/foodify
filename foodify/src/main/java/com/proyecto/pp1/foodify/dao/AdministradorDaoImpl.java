package com.proyecto.pp1.foodify.dao;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.proyecto.pp1.foodify.models.Dia;
import com.proyecto.pp1.foodify.models.ItemMenu;
import com.proyecto.pp1.foodify.models.modelsEnum.CategoriaEnum;
import com.proyecto.pp1.foodify.models.modelsEnum.DiaEnum;
import com.proyecto.pp1.foodify.repository.DiaRepository;
import com.proyecto.pp1.foodify.repository.ItemMenuRepository;
import com.proyecto.pp1.foodify.request.MenuRequest;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class AdministradorDaoImpl implements IAdministradorDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private ItemMenuRepository itemMenuRepository;

    @Autowired
    private DiaRepository diaRepository;

    @Override
    public void agregarMenu(ItemMenu menuNuevo, List<DiaEnum> diasMenuNuevo) {
        entityManager.persist(menuNuevo);

        for (DiaEnum diaEnum : diasMenuNuevo) {
            Dia dia = new Dia();
            dia.setDia(diaEnum);
            dia.setItemMenu(menuNuevo);
            entityManager.persist(dia);
        }
    }

    @Override
    public void modificarMenu(ItemMenu menuModificar, List<DiaEnum> diasMenuModificar) {
        // Verifica si el menú existe
        ItemMenu menuExistente = itemMenuRepository.findById(menuModificar.getId())
                .orElseThrow(() -> new RuntimeException("Menú no encontrado"));

        // Actualiza los campos del menú
        menuExistente.setNombre(menuModificar.getNombre());
        menuExistente.setDescripcion(menuModificar.getDescripcion());
        menuExistente.setCategoria(menuModificar.getCategoria());
        menuExistente.setStock(menuModificar.getStock());

        // Guarda el menú actualizado
        itemMenuRepository.save(menuExistente);

        // Actualiza los días asociados al menú
        diaRepository.deleteByItemMenu(menuExistente); // Elimina días anteriores

        for (DiaEnum diaEnum : diasMenuModificar) {
            Dia dia = new Dia();
            dia.setDia(diaEnum);
            dia.setItemMenu(menuModificar);
            diaRepository.save(dia);
        }
    }

    @Override
    public void eliminarMenu(int id) {
        ItemMenu itemMenu = new ItemMenu();
        itemMenu.setId(id);
        diaRepository.deleteByItemMenu(itemMenu);
        itemMenuRepository.delete(itemMenu);
    }

    @Override
    public List<MenuRequest> getMenu() {
        // devuelve array de objetos
        String sql = "SELECT im.id, im.nombre, im.descripcion, im.categoria, im.stock, " +
                "GROUP_CONCAT(d.dia SEPARATOR ', ') AS dias " +
                "FROM item_menu im " +
                "INNER JOIN dia d ON d.id_item_menu = im.id " +
                "GROUP BY im.id " +
                "ORDER BY FIELD(im.categoria, 'PRINCIPAL', 'EMPANADA', 'TARTA', 'BEBIDA')";
        // FIELD() permite definir un orden específico para los valores de categoria

        // lista que contiene los array de objeto
        List<Object[]> resultados = entityManager.createNativeQuery(sql).getResultList();

        // proceso de conversión de Object[] a MenuRequest, se hace ya que tiene datos
        // más complejos (enums)
        List<MenuRequest> menuRequests = resultados.stream() // se itera sobre cada Object[]
                .map(r -> {
                    // extraer los valores del array uno por uno
                    int id = (Integer) r[0];
                    String nombre = (String) r[1];
                    String descripcion = (String) r[2];
                    CategoriaEnum categoria = CategoriaEnum.valueOf((String) r[3]); // convierte al enum
                    int stock = (Integer) r[4];
                    String dias = (String) r[5];

                    // se crea un nuevo objeto MenuRequest con los valores extraídos
                    return new MenuRequest(id, nombre, descripcion, categoria, stock, dias);
                })
                .collect(Collectors.toList()); // se convierte el stream en una lista

        return menuRequests;
    }
}
