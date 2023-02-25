var firebaseConfig = {
    apiKey: "AIzaSyDFoNSFxv8F4xg-gv5B7IDslTPzvWqeFX4",
    authDomain: "lavadudee-82696.firebaseapp.com",
    databaseURL: "https://lavadudee-82696-default-rtdb.firebaseio.com",
    projectId: "lavadudee-82696",
    storageBucket: "lavadudee-82696.appspot.com",
    messagingSenderId: "753245521551",
    appId: "1:753245521551:web:e9bab6d49a29282376d2fa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='';
    document.getElementById("Input5").value='';
    document.getElementById("Input6").value='';
    document.getElementById("Input7").value='Selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var horas = document.getElementById("Input3").value;
    var salario = document.getElementById("Input4").value;
    var fecha = document.getElementById("Input5").value;
    var correo = document.getElementById("Input6").value;
    var departamento = document.getElementById("Input7").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Empleado = {
            id, //matricula:id
            nombre,
            horas,
            salario,
            fecha,
            correo,
            departamento,

        }

        //console.log(alumno);

        firebase.database().ref('Empleados/' + id).update(Empleado).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Alumnos').push().key;
    //data[`Alumnos/${key}`]= alumno;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Empleados');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}
//funcion imprimir empleado
function printRow(Empleado){
    
    if(Empleado!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);

        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);
        
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Empleado.id;
        cell2.innerHTML = Empleado.nombre; 
        cell3.innerHTML = Empleado.horas;
        cell4.innerHTML = Empleado.salario; 
        cell5.innerHTML = Empleado.fecha; 

        cell6.innerHTML = Empleado.correo; 
        cell7.innerHTML = Empleado.departamento; 

        cell8.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Empleado.id})">Eliminar</button>`;
        cell9.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Empleado.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Empleado/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Empleados/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Empleado){
    if(Empleado!=null)
    {
        document.getElementById("Input1").value=Empleado.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Empleado.nombre;
        document.getElementById("Input3").value=Empleado.horas;
        document.getElementById("Input4").value=Empleado.salario;
        document.getElementById("Input5").value=Empleado.fecha;
        document.getElementById("Input6").value=Empleado.correo;
        document.getElementById("Input7").value=Empleado.departamento;
    }
}


//Para consulta de DEPARTAMENTO
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input7").value;

    var ref = firebase.database().ref("Empleado");
    ref.orderByChild("departamento").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Empleado){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Empleado.id;
    cell2.innerHTML = Empleado.nombre; 
    cell3.innerHTML = Empleado.horas;
    cell4.innerHTML = alumno.salario; 
    cell5.innerHTML = alumno.fecha; 
    cell6.innerHTML = alumno.correo; 
    cell7.innerHTML = alumno.departamento; 
   
}