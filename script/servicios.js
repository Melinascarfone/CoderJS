//GETJSON
  const URLJSON = "../servicios.json";
  //Agregamos un botón con jQuery
  $("#mas").prepend('<button id="btnMas" class="btn btn-outline-secondary">Ver mas servicios</button>');
  //Escuchamos el evento click del botón agregado
  $("#btnMas").click(() => {
      $.getJSON(URLJSON, function(respuesta, estado) {
          if (estado === "success") {
              let servDatos = respuesta.datosServicios;
              for (const dato of servDatos) {
                  $("#mas").append(`<div class="row row-cols-1 row-cols-md-3 g-4">
                                      <div class="col">
                                        <div class="card h-100">
                                          <img src="${dato.imagen}" class="card-img-top" alt="...">
                                          <div class="card-body">
                                           <h5 class="card-title">${dato.nombre}</h5>
                                           <p class="card-text">${dato.datos}</p>
                                         </div>
                                        </div>
                                      </div>
                                    </div>`)
              }
          }
      });
  });

  
