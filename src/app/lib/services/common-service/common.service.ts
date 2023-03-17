import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  BASE_URL = environment.apiURL;

  constructor(private _http: HttpClient) { }

  showSuccessMessage(message: any) {
    return Swal.fire({
      title: 'Success!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#00bfd8',
    })
  }

  showErrorMsg(msg: string) {
    return Swal.fire({
      title: 'Error!',
      text: msg,
      icon: 'error',
      confirmButtonColor: '#00bfd8',
    })
  }

  uploadFiles(file: any) {
    return this._http.post<any>(
      this.BASE_URL + 'Common/UploadFiles',
      file
    );
  }

  // DestroyDataTable() {
  //   $('#data-table-setup').DataTable().clear().destroy();
  // }

  // GetDataTable() {
  //   setTimeout(() => {
  //     $('#data-table-setup').DataTable({
  //       pagingType: 'full_numbers',
  //       pageLength: 5,
  //       processing: true,
  //       lengthMenu: [5, 10, 25],
  //     });
  //   }, 1);
  // }
  
}
