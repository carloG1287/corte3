// Obtener referencias a los elementos del formulario
const form = document.getElementById("vehicleForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const cedulaInput = document.getElementById("cedula");
const vehicleBrandInput = document.getElementById("vehicleBrand");
const vehicleModelInput = document.getElementById("vehicleModel");
const maintenanceTypeInput = document.getElementById("maintenanceType");
const maintenanceLog = document.getElementById("maintenanceLog");

// Función para guardar el registro de mantenimiento en Local Storage
function saveMaintenance(event) {
  event.preventDefault();

  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const cedula = cedulaInput.value;
  const vehicleBrand = vehicleBrandInput.value;
  const vehicleModel = vehicleModelInput.value;
  const maintenanceType = maintenanceTypeInput.value;

  // Verificar si la cédula contiene solo números
  if (!/^\d+$/.test(cedula)) {
    alert("La cédula debe contener solo números.");
    return;
  }

  // Verificar si ya existe información en Local Storage
  const existingData = JSON.parse(localStorage.getItem("maintenanceData")) || [];

  // Agregar el nuevo registro a la información existente
  existingData.push({
    firstName,
    lastName,
    cedula,
    vehicleBrand,
    vehicleModel,
    maintenanceType,
    date: new Date().toLocaleDateString(), // Puedes usar otra lógica para manejar las fechas
  });

  // Guardar la información actualizada en Local Storage
  localStorage.setItem("maintenanceData", JSON.stringify(existingData));

  // Mostrar el registro de mantenimiento actualizado en la página
  showMaintenanceLog();

  // Limpiar el formulario después de guardar
  form.reset();
}

// Función para mostrar el registro de mantenimiento en la página
function showMaintenanceLog() {
  const data = JSON.parse(localStorage.getItem("maintenanceData")) || [];

  if (data.length === 0) {
    maintenanceLog.innerHTML = "<p>No hay registros de mantenimiento.</p>";
    return;
  }

  let html = "<ul>";
  for (const entry of data) {
    html += `<li>
      <strong>Nombre:</strong> ${entry.firstName} ${entry.lastName}<br>
      <strong>Cédula:</strong> ${entry.cedula}<br>
      <strong>Vehículo:</strong> ${entry.vehicleBrand} ${entry.vehicleModel}<br>
      <strong>Tipo de Mantenimiento:</strong> ${entry.maintenanceType}<br>
      <strong>Fecha:</strong> ${entry.date}<br>
    </li>`;
  }
  html += "</ul>";
  maintenanceLog.innerHTML = html;
}

// Mostrar el registro de mantenimiento inicial
showMaintenanceLog();

// Agregar un escuchador de eventos para guardar el mantenimiento cuando se envíe el formulario
form.addEventListener("submit", saveMaintenance);
