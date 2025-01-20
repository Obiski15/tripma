export interface IEmergencyContact {
  // dialCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
}

export interface IPassenger extends IEmergencyContact {
  suffix?:
    | "Mr"
    | "Mrs"
    | "Miss"
    | "Ms"
    | "Sir"
    | "Hon"
    | "Fr"
    | "Rev"
    | "Pastor"
    | "Col"
    | "Lt"
    | "Eng"
    | "Prof"
    | "Dr";
  travellerNumber?: string;
  middleName?: string;
  redress?: number;
  dob: Date;
}

export interface IPassengerForm {
  emergencyContact: IEmergencyContact;
  passengers: IPassenger[];
}
