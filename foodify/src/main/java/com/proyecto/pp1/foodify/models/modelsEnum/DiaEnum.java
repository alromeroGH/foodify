package com.proyecto.pp1.foodify.models.modelsEnum;

public enum DiaEnum {
    LUNES("LUNES"),
    MARTES("MARTES"),
    MIERCOLES("MIERCOLES"),
    JUEVES("JUEVES"),
    VIERNES("VIERNES");

    private final String valor;

    DiaEnum (String valor) {
        this.valor = valor;
    }

    public String getValor(){
        return valor;
    }
}
