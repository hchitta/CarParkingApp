import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParkingSpot } from '../models/ParkingSpot';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  apiUrl: string = "https://freeapi.miniprojectideas.com/api/ParkingSpotBooking/";



  constructor(private http: HttpClient) { }

  getAllParkingLots() {
    return this.http.get(`${this.apiUrl}GetAllParkingLots`)
  }

  bookSpot(obj: any) {
    return this.http.post(`${this.apiUrl}BookSpot`,obj)
  }

  getActiveParkingByParkingLotId(parkingLotId: number) {
    return this.http.get(`${this.apiUrl}GetActiveParkingByPrakingLotId?parkingLotId=${parkingLotId}`)
  }

  releaseSpot(obj: any) {
    return this.http.put(`${this.apiUrl}ReleaseSpot`,obj)
  }
}
