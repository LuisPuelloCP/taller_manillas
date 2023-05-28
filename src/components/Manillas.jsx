import React from "react";

const Manillas = () => {
  return (
    <div className="container mt-5">
      <h1 className="text-center">Empresa Manillas SA</h1>
      <hr />
      <div className="row">
        <div className="col-5">
            <h4 className="text-center">Seleccione la combinacion de materiales</h4>
            <form action="#">
                <div className="mb-3">
                    <select class="form-select mb-3" aria-label="Default select example">
                        <option selected>Seleccione el material</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select class="form-select mb-3" aria-label="Default select example">
                        <option selected>Seleccione el dije</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <select class="form-select mb-3" aria-label="Default select example">
                        <option selected>Seleccione el tipo de dije</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <input type="text" className="form-control mb-2" placeholder='Ingrese la cantidad'/>
                    <button class="btn btn-primary">Agregar al carrito</button>
                </div>
            </form>
        </div>
        <div className="col-7">
            <h4 className="text-center">Carrito</h4>
            <form action="##">
                <ul class="list-group list-group-horizontal text-center mb-2">
                    <li class="list-group-item"><h5>Material</h5><span>Cuero</span></li>
                    <li class="list-group-item"><h5>Dije</h5><span>Martillo</span></li>
                    <li class="list-group-item"><h5>Tipo</h5><span>Plata</span></li>
                    <li class="list-group-item"><h5>Cantidad</h5><span>1</span></li>
                    <li class="list-group-item"><h5>Precio</h5><span>$80</span></li>
                    <li class="list-group-item"><h5>Total</h5><span>$80</span></li>
                    <button class="btn btn-danger">Eliminar</button>
                </ul>
                <input type="text" className="form-control mb-2" placeholder='Ingrese Nombre del cliente'/>
                <h4>Total con cambio de moneda: </h4>
                <button class="btn btn-primary">Pagar</button>
            </form>
            
        </div>
      </div>
      

    </div>
  );
};

export default Manillas;
