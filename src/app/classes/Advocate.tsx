import { spec } from "node:test/reporters";

export default class Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string;
    yearsOfExperience: number;
    phoneNumber: string;
  
    constructor(data: Advocate) {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.city = data.city;
      this.degree = data.degree;
      this.specialties = Advocate.formatSpecialties([data.specialties])
      this.yearsOfExperience = data.yearsOfExperience;
      this.phoneNumber = Advocate.formatPhoneNumber(data.phoneNumber.toString())
    }

    private static formatPhoneNumber(phoneNumber: string): string {
        return phoneNumber.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }

    private static formatSpecialties(specialties: string[]): string { 
        return specialties.join(',')
    }
}