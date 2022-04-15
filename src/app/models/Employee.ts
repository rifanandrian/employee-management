export class Employee {
  public username?: string;
  public firstname?: string;
  public lastname?: string;
  public email?: string;
  public birthdate?: Date;
  public basicSalary?: number;
  public status?: string;
  public group?: string;
  public description?: Date;

  constructor(values: Object = {}) {
    Object.assign(<Employee>this, values);
  }
}