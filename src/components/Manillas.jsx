import swal from 'sweetalert';
import React, { useEffect, useState } from "react";
import { db } from '../firebase'
import { collection, doc, addDoc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore'


const Manillas = () => {
    const [listaConf, setListaConf] = useState([]);
    const [listMaterial, setListMaterial] = useState([]);
    const [listDijes, setListDijes] = useState([]);
    const [listTipoDijes, setListTipoDijes] = useState([]);
    const [listCarrito, setListCarrito] = useState([]);
    const [material, setMaterial] = useState('')
    const [dije, setDije] = useState('')
    const [tipo_dije, setTipoDije] = useState('')
    const [cliente, setCliente] = useState('')
    const [cantidad, setCantidad] = useState(1)
    const [totalConversion, setTotalConversion] = useState(0)


    //Trayendo configuraciones
    useEffect(() => {
        const obtenerConf = async () => {
            try {
                onSnapshot(collection(db, 'configuracion'), (query) => {
                    setListaConf(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
                })
            } catch (error) {
                console.log(error);
            }
        }
        obtenerConf();
    },[])
    
    // Trayendo Materiales
    useEffect(() => {
        const obtenerMaterial = async () => {
            try {
                onSnapshot(collection(db, 'material'), (query) => {
                    setListMaterial(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
                })
            } catch (error) {
                console.log(error);
            }
        }
        obtenerMaterial();
    },[])

    // Trayendo Dijes
    useEffect(() => {
        const obtenerDijes = async () => {
            try {
                onSnapshot(collection(db, 'dije'), (query) => {
                    setListDijes(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
                })
            } catch (error) {
                console.log(error);
            }
        }
        obtenerDijes();
    },[])

    // Trayendo tipo de Dijes

    useEffect(() => {
        const obtenerTipoDijes = async () => {
            try {
                onSnapshot(collection(db, 'tipo_dije'), (query) => {
                    setListTipoDijes(query.docs.map((doc) => ({...doc.data(), id:doc.id})))
                })
            } catch (error) {
                console.log(error);
            }
        }
        obtenerTipoDijes();
    },[])
    
    // Realizando conversion a peso
    const totalPeso = () => {
        let suma = 0;
        listCarrito.forEach(element => {
            suma = suma + element.total * 5000
        });
        setTotalConversion(suma);
    }

    // Realizando conversion a dolar
    const total = () => {
        let suma = 0;
        listCarrito.forEach(element => {
            suma = suma + element.total
        });
        setTotalConversion(suma);
    }

    // guardar manillas creadas en db
     const pagar = async () => {
        try {
            const data = await addDoc(collection (db, 'comprado'),{
                manillas: listCarrito,
                cliente: cliente,
                pago_total: totalConversion
            })
            swal({
                title: "Pago Exitoso",
                text: "Su pago fue guardado en la base de datos",
                icon: "success",
                button: "Continuar",
              });
              setCliente("")
              setMaterial("")
              setDije("")
              setTipoDije("")
              setListCarrito([])
              setTotalConversion(0)

        } catch (error) {
            console.log(error);
        }
     }
    

    //Eliminar item

    const eliminarItem = (itemId) => {
        const carritoActulizado = listCarrito.filter((manilla) => manilla.id !== itemId)
        setListCarrito(carritoActulizado)
    }

    // Agregando item al carrito
    const agregarCarrito = (e) => {
        e.preventDefault();
        if (material != "" && dije != "" && tipo_dije != "" && cantidad > 0) {
            const rep = listCarrito.find((item) => item.material == material && item.dije == dije && item.tipo_dije == tipo_dije)
            if (rep) {
                rep.cantidad += Number(cantidad)  ;
                rep.total = rep.cantidad * rep.precio;
                setListCarrito([...listCarrito])
                return
            }
            let precio = 0;
            listaConf.forEach(item => {
                if(item.material === material && item.dije === dije && item.tipo_dije === tipo_dije){
                    precio = item.valor
                }
            });
            
            const manilla = listaConf.filter((config) => {
                return (config.material == material && config.dije == dije && config.tipo_dije && config.valor == precio)
            })
            setListCarrito([...listCarrito, {
                "id": manilla[0].id,
                "material": material,
                "dije": dije,
                "tipo_dije": tipo_dije,
                "cantidad": Number(cantidad),
                "precio": precio,
                "total": cantidad*precio
            }]);
        }
    }



  return (
    <div className="container mt-5">
      <h1 className="text-center">Empresa Manillas SA</h1>
      <hr />
      <div className="row">
        <div className="col-5">
            <h4 className="text-center">Seleccione la combinacion de materiales</h4>
            <form onSubmit={agregarCarrito}>
                <div className="mb-3">
                    <select className="form-select mb-3" name="material" value={material} onChange={(e) => setMaterial(e.target.value)}>
                        <option>Seleccione el material</option>
                        {
                            listMaterial.map(item => (
                                <option key={item.id} value={item.tipo}>{item.tipo}</option>
                            ))
                        }
                    </select>
                    <select className="form-select mb-3" value={dije} onChange={(e) => setDije(e.target.value)}>
                        <option>Seleccione el dije</option>
                        {
                            listDijes.map(item => (
                                <option key={item.id} value={item.tipo}>{item.tipo}</option>
                            ))
                        }
                    </select>
                    <select className="form-select mb-3" value={tipo_dije} onChange={(e) => setTipoDije(e.target.value)}>
                        <option>Seleccione el tipo de dije</option>
                        {
                            listTipoDijes.map(item => (
                                <option key={item.id} value={item.tipo}>{item.tipo}</option>
                            ))
                        }
                    </select>
                    <input type="number" className="form-control mb-2" placeholder='Ingrese la cantidad' value={cantidad} onChange={(e) =>setCantidad(e.target.value)}/>
                    <button className="btn btn-primary">Agregar al carrito</button>
                </div>
            </form>
        </div>
        <div className="col-7">
            <h4 className="text-center">Carrito</h4>
                {
                    listCarrito.map(item => (
                        <ul className="list-group list-group-horizontal text-center mb-2" key={item.id}>
                            <li className="list-group-item"><h5>Material</h5><span>{item.material}</span></li>
                            <li className="list-group-item"><h5>Dije</h5><span>{item.dije}</span></li>
                            <li className="list-group-item"><h5>Tipo</h5><span>{item.tipo_dije}</span></li>
                            <li className="list-group-item"><h5>Cantidad</h5><span>{item.cantidad}</span></li>
                            <li className="list-group-item"><h5>Precio</h5><span>${item.precio}</span></li>
                            <li className="list-group-item"><h5>Total</h5><span>${item.total}</span></li>
                            <button className="btn btn-danger mx-1" onClick={()=>eliminarItem(item.id)} >Eliminar</button>
                        </ul>
                    ))
                }                    
            <input type="text" className="form-control mb-2" placeholder='Ingrese cedula del cliente' value={cliente} onChange={(e) =>setCliente(e.target.value)}/>
            <h4>Total con cambio de moneda: {new Intl.NumberFormat().format(totalConversion)}</h4>
            <button className="btn btn-info mx-2" onClick={()=>total()}>Total en dolares</button>
            <button className="btn btn-info mx-2" onClick={()=>totalPeso()}>Total en peso</button>
            {
                totalConversion == "" || totalConversion == null  || cliente == "" ? (
                    <button className="btn btn-success mx-2" disabled onClick={()=>pagar()}>Pagar</button>
                    )
                    :
                    <button className="btn btn-success mx-2" onClick={()=>pagar()}>Pagar</button>
            }
            
        </div>
      </div>
      

    </div>
  );
};

export default Manillas;
