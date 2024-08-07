import Swal from 'sweetalert2';
import { restApi } from '../composables/axios';

export const show_alert = (message: string, icon: any, focus = '') => {
  if (focus !== '') {
    document.getElementById(focus)?.focus();
  }
  Swal.fire({
    title: message,
    icon,
    customClass: { confirmButton: 'btn btn-primary', popup: 'animated zoomIn' },
    buttonsStyling: false,
  });
};

export const confirm = (id: number, url: string, name: string, redirect = '/') => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: { confirmButton: 'btn btn-success me-3', cancelButton: 'btn btn-danger' },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
      title: 'Seguro quiere eliminar el registro ' + name,
      text: 'Se perderá la información del proveedor',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-check"></i> Sí,eliminar',
      cancelButtonText: '<i class="fa-solid fa-ban"></i> Cancelar',
    })
    .then((result) => {
      if (result.isConfirmed) {
        sendRequest('DELETE', { id: id }, url, 'Producto eliminado', redirect);
      } else {
        show_alert('Operación cancelada', 'info');
      }
    });
};

export const sendRequest = (
  method: string,
  parameters: {},
  url: string,
  message: string,
  redirect = '/',
) => {
  restApi({
    method,
    url,
    data: parameters,
  })
    .then(() => {
      show_alert(message, 'success');
      window.setTimeout(() => {
        window.location.href = redirect;
      }, 1500);
    })
    .catch(() => {
      show_alert('Error en la solicitud', 'error');
    });
};
