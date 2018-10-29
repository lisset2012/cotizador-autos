import React, { Component } from 'react';
import Header from './Header';
import Formulario from './Formulario';
import {obtenerDiferenciaAnio, calcularMarca, obtenerPlan} from '../helper';
import Resumen from './Resumen';

class App extends Component {

  state ={
    resultado: '',
    datos: {}
  }

  cotizarSeguro = (datos) => {
      const {marca, year, plan} = datos;

      //agregar una base
      let resultado = 2000;

      //obtener la dif de anos
      const diferencia = obtenerDiferenciaAnio(year);

      // por cada ano menor que 2018 resta 3% al valor del seguro
      resultado -= ((diferencia*3)*resultado)/100;

      //americano 15% asiatico 5% europeo 30% de incremento al valor actual
      resultado = calcularMarca(marca) * resultado;

      //el plan del ano, el basico incrementa el valor 20% y cobertura completa 50%
      let incrementoPlan = obtenerPlan(plan);

      // dependiendo del plan incremento
      resultado = parseFloat(incrementoPlan * resultado).toFixed(2);

      //crear objeto para el resumen
      const datosAuto = {
        marca: marca,
        plan: plan,
        year: year
      }

      //ya tenemos el costo
      console.log(resultado);
      this.setState({
        resultado: resultado,
        datos: datosAuto
      })
  }

  render() {
    return (
      <div className="contenedor">
        <Header 
          titulo="Cotizador de Seguro de Autos"
        />
         <div className="contenedor-formulario">
          <Formulario 
            cotizarSeguro = {this.cotizarSeguro}
          />
        </div>
        <div>
          <Resumen 
            datos = {this.state.datos}
            resultado = {this.state.resultado}
          />
        </div>
        
      </div>
     
    );
  }
}

export default App;
