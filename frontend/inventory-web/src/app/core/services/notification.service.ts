import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  
  private toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    background: '#0f172a', // Slate 900 (Tu header)
    color: '#ffffff',
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    }
  });

  success(title: string) {
    this.toast.fire({
      icon: 'success',
      title,
      iconColor: '#10b981' // Emerald 500
    });
  }

  error(title: string) {
    this.toast.fire({
      icon: 'error',
      title,
      iconColor: '#ef4444' // Red 500
    });
  }


  // Alerta de confirmación para eliminar
  async confirmDelete(productName: string): Promise<boolean> {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `Vas a eliminar "${productName}". Esta acción no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444', // Red 500
      cancelButtonColor: '#64748b',  // Slate 500
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#ffffff',
      color: '#0f172a',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl px-4 py-2 font-bold',
        cancelButton: 'rounded-xl px-4 py-2 font-bold'
      }
    });
    return result.isConfirmed;
  }
}