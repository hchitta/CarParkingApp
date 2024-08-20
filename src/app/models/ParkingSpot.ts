export class ParkingSpot {
    parkingId: number
    parkingLotId: number
    vehicleNo: string
    mobileNo: string
    inTime: string
    outTime: string
    parkingDate: Date
    spotNo: number

    constructor() {
        this.parkingId = 0;
        this.parkingLotId = 0;
        this.vehicleNo = '';
        this.mobileNo = '';
        this.inTime = '';
        this.outTime = '';
        this.parkingDate = new Date();
        this.spotNo = 0;
    }
  }