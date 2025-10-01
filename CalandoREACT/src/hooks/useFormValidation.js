export default function useFormValidation(){
    const textoConNumeros = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ0-9\s]+$/
    const soloTexto = /^[a-zA-ZÁÉÍÓÚáéíóúÑñ\s]+$/

    function validarEquipos({ nombre, entrenador }){
        const errores = {}
        if(!nombre.trim()){
            errores.nombre = 'El nombre no puede estar vacío'
        }else if (!textoConNumeros.test(nombre)){
            errores.nombre = 'El nombre no puede contener caracteres especiales'
        }

        if(!entrenador.trim()){
            errores.entrenador = 'El nombre del entrenador no puede estar vacío'
        }else if(!soloTexto.test(entrenador)){
            errores.entrenador = 'El nombre no puede contener caracteres especiales'
        }
        return errores
    }
    return { validarEquipos }
}