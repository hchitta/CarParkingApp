import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { CommonModule } from '@angular/common';
import { ParkingSpot } from '../../models/ParkingSpot';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-parking',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent implements OnInit{
  

  masterService = inject(MasterService);
  parkingLotList: any[] = [];
  parkingList: any[] = [];
  selectedParkingLot: any = {};
  parkingSpotList: number[] = [];
  selectedParkingSpotNumber: number = 0;
  bookingObj: ParkingSpot = new ParkingSpot();
  parkingForm: FormGroup;
  fb = inject(FormBuilder);
  selectedParkingObj : any = {};
  

  constructor() {
    this.parkingForm = this.fb.group({
      spotNo: [{value:0,disabled: true}, Validators.required],
      vehicleNo: ['', [Validators.required]],
      inTime: ['', [Validators.required]],
      mobileNo: ['', [Validators.required]],
      outTime: ''
    });
  }

  ngOnInit(): void {
   
    this.getParkingLots();
    
  }

  getParkingLots() {
    this.masterService.getAllParkingLots().subscribe((res:any) => {
      this.parkingLotList = res.data;
      this.selectedParkingLot = this.parkingLotList[0];
      this.getActiveParkingByParkingLotId();
      this.createList(this.selectedParkingLot.totalParkingSpot);
    });
  }

  createList(totalSpots: number) {
    this.parkingSpotList = [];
    for (let index = 1; index <= totalSpots; index++) {
      this.parkingSpotList.push(index);
      
    }
  }

  setSelectedParkingLot(data: any){
    this.selectedParkingLot = data;
    this.getActiveParkingByParkingLotId();
    this.createList(this.selectedParkingLot.totalParkingSpot);
  }

  openModal(parkingSpotNumber: number) {
    this.selectedParkingSpotNumber = parkingSpotNumber;
    const model = document.getElementById("bookModal");
    if(model != null) {
      model.style.display = 'block';
    }
  }

  openReleaseModal(parkingObj: any) {
    this.selectedParkingObj = parkingObj;
    const model = document.getElementById("releaseBookModal");
    if(model != null) {
      model.style.display = 'block';
    }
  }

  
  closeModal() {
    const model = document.getElementById("bookModal");
    if(model != null) {
      model.style.display = 'none';
    }
  }

  closeReleaseModal() {
    const model = document.getElementById("releaseBookModal");
    if(model != null) {
      model.style.display = 'none';
    }
  }

  onSubmit() {
    if (this.parkingForm.valid) {
      this.bookingObj.parkingLotId = this.selectedParkingLot.parkingLotId;
      this.bookingObj.inTime = this.parkingForm.value.inTime;
      this.bookingObj.vehicleNo = this.parkingForm.value.vehicleNo;
      this.bookingObj.mobileNo = this.parkingForm.value.mobileNo;
      this.bookingObj.spotNo = this.selectedParkingSpotNumber;
      this.masterService.bookSpot(this.bookingObj).subscribe((res:any) => {
        console.log(res)
          if(res.result) {
            alert("Booking done");
            this.getActiveParkingByParkingLotId();
            this.closeModal();
        } else {
          alert(res.message);
        } 
      });
    }
  }

  getActiveParkingByParkingLotId() {
    this.masterService.getActiveParkingByParkingLotId(this.selectedParkingLot.parkingLotId).subscribe((res:any) => {
      this.parkingList = res.data;
    });
  }

  checkIfParkingSpotBooked(spotNo: number) {
    return this.parkingList.find(m => m.spotNo == spotNo);
  }

  releaseSpot() {
    
     this.selectedParkingObj.outTime = this.parkingForm.value.outTime;
      this.masterService.releaseSpot(this.selectedParkingObj).subscribe((res:any) => {
          if(res.result) {
            alert("Spot Released");
            this.getActiveParkingByParkingLotId();
            this.closeReleaseModal();
        } else {
          alert(res.message);
        } 
      });
  
  }
}
