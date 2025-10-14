import { useState } from 'react';

export function ligaFormValidation() {
  const [errors, setErrors] = useState({});

  // Validar campo vacío
  const esCampoVacio = (valor) => {
    return !valor || valor.trim() === '';
  };

  // Validar caracteres especiales (solo permite letras, números y espacios)
  const tieneCaracteresEspeciales = (valor) => {
    const regex = /[^a-zA-Z0-9\sáéíóúÁÉÍÓÚñÑ]/;
    return regex.test(valor);
  };

  // Validar solo números
  const soloNumeros = (valor) => {
    const regex = /^[0-9]+$/;
    return regex.test(valor);
  };

  // Validar email
  const esEmailValido = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Validar teléfono (10 dígitos)
  const esTelefonoValido = (telefono) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(telefono);
  };

  // Validar rango de edad
  const validarRangoEdad = (min, max) => {
    if (min < 1 || min > 100) {
      return 'La edad mínima debe estar entre 1 y 100';
    }
    if (max < 1 || max > 100) {
      return 'La edad máxima debe estar entre 1 y 100';
    }
    if (min > max) {
      return 'La edad mínima no puede ser mayor que la máxima';
    }
    return null;
  };

  // Validar formulario completo de liga
  const validarFormularioLiga = (datos) => {
    const nuevosErrores = {};

    // Nombre de liga
    if (esCampoVacio(datos.nombreLiga)) {
      nuevosErrores.nombreLiga = 'El nombre de la liga es obligatorio';
    } else if (tieneCaracteresEspeciales(datos.nombreLiga)) {
      nuevosErrores.nombreLiga = 'El nombre no puede contener caracteres especiales';
    }

    // Rango de edad
    const errorEdad = validarRangoEdad(datos.edadMin, datos.edadMax);
    if (errorEdad) {
      nuevosErrores.rangoEdad = errorEdad;
    }

    // Categoría
    if (esCampoVacio(datos.categoria)) {
      nuevosErrores.categoria = 'La categoría es obligatoria';
    }

    // Nombre presidente
    if (esCampoVacio(datos.nombrePresidente)) {
      nuevosErrores.nombrePresidente = 'El nombre del presidente es obligatorio';
    } else if (tieneCaracteresEspeciales(datos.nombrePresidente)) {
      nuevosErrores.nombrePresidente = 'El nombre no puede contener caracteres especiales';
    }

    // Contacto presidente
    if (esCampoVacio(datos.contactoPresidente)) {
      nuevosErrores.contactoPresidente = 'El contacto es obligatorio';
    } else if (!soloNumeros(datos.contactoPresidente)) {
      nuevosErrores.contactoPresidente = 'El contacto debe contener solo números';
    } else if (!esTelefonoValido(datos.contactoPresidente)) {
      nuevosErrores.contactoPresidente = 'El contacto debe tener 10 dígitos';
    }

    setErrors(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Limpiar un error específico
  const limpiarError = (campo) => {
    setErrors((prevErrors) => {
      const nuevosErrores = { ...prevErrors };
      delete nuevosErrores[campo];
      return nuevosErrores;
    });
  };

  // Limpiar todos los errores
  const limpiarErrores = () => {
    setErrors({});
  };

  return {
    errors,
    validarFormularioLiga,
    limpiarError,
    limpiarErrores,
    esCampoVacio,
    tieneCaracteresEspeciales,
    soloNumeros,
    esEmailValido,
    esTelefonoValido
  };
}