import { Injectable } from '@angular/core';

const USER = 'att_user';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {

  static saveUser(user: any): void {
    localStorage.setItem(USER, JSON.stringify(user));
  }

  static getUser(): any {
    const data = localStorage.getItem(USER);
    return data ? JSON.parse(data) : null;
  }

  static getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  static getUserProjectId(): number | null {
    const user = this.getUser();
    // console.log("Project11111111111111111111111111111111111111: ",user);
    return user ? user.projectId : null;  // ✅ FIXED
  }

  static getUserRole(): string {
    const user = this.getUser();
    return user ? user.userRole : '';
  }

  static isAdminLoggedIn(): boolean {
    return this.getUserRole() === 'ADMIN';
  }

  static isEmployeeLoggedIn(): boolean {
    return this.getUserRole() === 'EMPLOYEE';
  }

  static isManagerLoggedIn(): boolean {
    return this.getUserRole() === 'MANAGER';
  }

  static signOut(): void {
    localStorage.removeItem(USER);
  }
}
