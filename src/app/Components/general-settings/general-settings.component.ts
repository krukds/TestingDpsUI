import { Component, ViewChild } from '@angular/core';
import { LocationListComponent } from '../location-list/location-list.component';
import { DepartmentListComponent } from '../department-list/department-list.component';
import { TestingDropDownComponent } from '../testing-drop-down/testing-drop-down.component';
import { UserTestingService } from '../../Services/user-testing.service';
import { AuthService } from '../../Services/auth.service';
import { UserDetailModel } from '../../../Models/user.model';
import { AlertComponent } from '../alert/alert.component';
import { FormsModule } from '@angular/forms';
import { UserTestingModel } from '../../../Models/user-testing.model';


@Component({
  selector: 'app-general-settings',
  standalone: true,
  imports: [LocationListComponent, DepartmentListComponent, TestingDropDownComponent, AlertComponent, FormsModule],
  providers: [AuthService, UserTestingService],
  templateUrl: './general-settings.component.html',
  styleUrls: ['./general-settings.component.css']
})
export class GeneralSettingsComponent {
  location_id: number | null = null;
  department_id: number | null = null;
  testing_id_l: number | null = null;
  testing_id_d: number | null = null;
  testing_id_email: number | null = null;
  testing_id_all: number | null = null;
  userEmail: string = '';

  @ViewChild('alertComponent') alertComponent!: AlertComponent;

  constructor(
    private userTestingService: UserTestingService,
    private authService: AuthService
  ) {}

  onLocationSelected(locationId: number | null) {
    this.location_id = locationId;
    console.log('location: ' + this.location_id);
  }

  onDepartmentSelected(departmentId: number | null) {
    this.department_id = departmentId;
    console.log('department: ' + this.department_id);
  }

  onTestingSelectedL(testingId: number | null) {
    this.testing_id_l = testingId;
    console.log('testing_l: ' + this.testing_id_l);
  }

  onTestingSelectedD(testingId: number | null) {
    this.testing_id_d = testingId;
    console.log('testing_d: ' + this.testing_id_d);
  }

  onTestingSelectedByEmail(testingId: number | null) {
    this.testing_id_email = testingId;
    console.log('testing_email: ' + this.testing_id_email);
  }

  onTestingSelectedAll(testingId: number | null) {
      this.testing_id_all = testingId;
      console.log('testing_all: ' + this.testing_id_all);
  }

  grantAccessToLocation() {
    if (this.location_id !== null && this.testing_id_l !== null) {
      this.authService.getAllUsers(this.location_id, null).subscribe({
        next: (users: UserDetailModel[]) => {
          users.forEach(user => {
            this.userTestingService.getAllUserTestings(user.id, this.testing_id_l).subscribe({
              next: (existingAccesses) => {
                if (existingAccesses.length === 0) {
                  this.userTestingService.addUserTesting(user.id, this.testing_id_l!).subscribe({
                    next: (response) => {
                      console.log(`Доступ надано користувачу з id ${user.id} до тестування з id ${this.testing_id_l}`);
                    },
                    error: (error) => {
                      console.error(`Помилка при наданні доступу користувачу з id ${user.id}`, error);
                    }
                  });
                } else {
                  console.log(`Доступ вже надано користувачу з id ${user.id} до тестування з id ${this.testing_id_l}`);
                  this.alertComponent.message = `Доступ вже надано користувачу з id ${user.id} до тестування з id ${this.testing_id_l}`;
                  this.alertComponent.showAlert();
                }
              },
              error: (error) => {
                console.error('Помилка при перевірці доступу користувача', error);
              }
            });
          });
          this.alertComponent.message = `Надано доступ користувачам з локацією з id ${this.location_id} до тестування з id ${this.testing_id_l}`;
          this.alertComponent.showAlert();
        },
        error: (error) => {
          console.error('Помилка при отриманні користувачів за локацією', error);
          this.alertComponent.message = 'Помилка при отриманні користувачів за локацією ' + error;
          this.alertComponent.showAlert();
        }
      });
    } else {
      console.warn('Локація та тестування повинні бути обрані');
      this.alertComponent.message = 'Локація та тестування повинні бути обрані';
      this.alertComponent.showAlert();
    }
  }

  grantAccessToDepartment() {
    if (this.department_id !== null && this.testing_id_d !== null) {
      this.authService.getAllUsers(null, this.department_id).subscribe({
        next: (users: UserDetailModel[]) => {
          users.forEach(user => {
            this.userTestingService.getAllUserTestings(user.id, this.testing_id_d).subscribe({
              next: (existingAccesses) => {
                if (existingAccesses.length === 0) {
                  this.userTestingService.addUserTesting(user.id, this.testing_id_d!).subscribe({
                    next: (response) => {
                      console.log(`Доступ надано користувачу з id ${user.id} до тестування з id ${this.testing_id_d}`);
                    },
                    error: (error) => {
                      console.error(`Помилка при наданні доступу користувачу з id ${user.id}`, error);
                    }
                  });
                } else {
                  console.log(`Доступ вже надано користувачу з id ${user.id} до тестування з id ${this.testing_id_d}`);
                  this.alertComponent.message = `Доступ вже надано користувачу з id ${user.id} до тестування з id ${this.testing_id_d}`;
                  this.alertComponent.showAlert();
                }
              },
              error: (error) => {
                console.error('Помилка при перевірці доступу користувача', error);
              }
            });
          });
          this.alertComponent.message = `Надано доступ користувачам з відділом з id ${this.department_id} до тестування з id ${this.testing_id_d}`;
          this.alertComponent.showAlert();
        },
        error: (error) => {
          console.error('Помилка при отриманні користувачів за відділом', error);
          this.alertComponent.message = 'Помилка при отриманні користувачів за відділом ' + error;
          this.alertComponent.showAlert();
        }
      });
    } else {
      console.warn('Відділ та тестування повинні бути обрані');
      this.alertComponent.message = 'Відділ та тестування повинні бути обрані';
      this.alertComponent.showAlert();
    }
  }

  revokeAccessFromLocation() {
    if (this.location_id !== null && this.testing_id_l !== null) {
      this.authService.getAllUsers(this.location_id, null).subscribe({
        next: (users: UserDetailModel[]) => {
          users.forEach(user => {
            this.userTestingService.getAllUserTestings(user.id, this.testing_id_l).subscribe({
              next: (existingAccesses) => {
                existingAccesses.forEach(access => {
                  this.userTestingService.deleteUserTesting(access.id).subscribe({
                    next: () => {
                      console.log(`Доступ видалено для користувача з id ${user.id} до тестування з id ${this.testing_id_l}`);
                    },
                    error: (error) => {
                      console.error(`Помилка при видаленні доступу для користувача з id ${user.id}`, error);
                    }
                  });
                });
              },
              error: (error) => {
                console.error('Помилка при отриманні доступу користувача', error);
              }
            });
          });
          this.alertComponent.message = `Доступ видалено для користувачів з локацією з id ${this.location_id} до тестування з id ${this.testing_id_l}`;
          this.alertComponent.showAlert();
        },
        error: (error) => {
          console.error('Помилка при отриманні користувачів за локацією', error);
          this.alertComponent.message = 'Помилка при отриманні користувачів за локацією ' + error;
          this.alertComponent.showAlert();
        }
      });
    } else {
      console.warn('Локація та тестування повинні бути обрані');
      this.alertComponent.message = 'Локація та тестування повинні бути обрані';
      this.alertComponent.showAlert();
    }
  }

  revokeAccessFromDepartment() {
    if (this.department_id !== null && this.testing_id_d !== null) {
      this.authService.getAllUsers(null, this.department_id).subscribe({
        next: (users: UserDetailModel[]) => {
          users.forEach(user => {
            this.userTestingService.getAllUserTestings(user.id, this.testing_id_d).subscribe({
              next: (existingAccesses) => {
                existingAccesses.forEach(access => {
                  this.userTestingService.deleteUserTesting(access.id).subscribe({
                    next: () => {
                      console.log(`Доступ видалено для користувача з id ${user.id} до тестування з id ${this.testing_id_d}`);
                    },
                    error: (error) => {
                      console.error(`Помилка при видаленні доступу для користувача з id ${user.id}`, error);
                    }
                  });
                });
              },
              error: (error) => {
                console.error('Помилка при отриманні доступу користувача', error);
              }
            });
          });
          this.alertComponent.message = `Доступ видалено для користувачів з відділом з id ${this.department_id} до тестування з id ${this.testing_id_d}`;
          this.alertComponent.showAlert();
        },
        error: (error) => {
          console.error('Помилка при отриманні користувачів за відділом', error);
          this.alertComponent.message = 'Помилка при отриманні користувачів за відділом ' + error;
          this.alertComponent.showAlert();
        }
      });
    } else {
      console.warn('Відділ та тестування повинні бути обрані');
      this.alertComponent.message = 'Відділ та тестування повинні бути обрані';
      this.alertComponent.showAlert();
    }
  }

  revokeAccessFromUserByEmail() {
    if (this.userEmail !== null && this.testing_id_email !== null) {
        this.authService.getUserByEmail(this.userEmail).subscribe({
            next: (user: UserDetailModel) => {
                this.userTestingService.getAllUserTestings(user.id, this.testing_id_email).subscribe({
                    next: (existingAccesses) => {
                        if (existingAccesses.length > 0) {
                            existingAccesses.forEach(access => {
                                this.userTestingService.deleteUserTesting(access.id).subscribe({
                                    next: () => {
                                        console.log(`Доступ закрито для користувача з email ${this.userEmail} до тестування з id ${this.testing_id_email}`);
                                        this.alertComponent.message = `Доступ закрито для користувача з email ${this.userEmail} до тестування з id ${this.testing_id_email}`;
                                        this.alertComponent.showAlert();
                                      },
                                    error: (error) => {
                                        console.error(`Помилка при закритті доступу для користувача з email ${this.userEmail}`, error);
                                        this.alertComponent.message = `Помилка при закритті доступу для користувача з email ${this.userEmail} ` + error;
                                        this.alertComponent.showAlert();
                                    }
                                });
                            });
                        } else {
                            console.warn(`Доступ до тестування з id ${this.testing_id_email} не надано користувачу з email ${this.userEmail}`);
                            this.alertComponent.message = `Доступ до тестування з id ${this.testing_id_email} не надано користувачу з email ${this.userEmail}`;
                            this.alertComponent.showAlert();
                        }
                    },
                    error: (error) => {
                        console.error('Помилка при перевірці доступу користувача', error);
                        this.alertComponent.message = 'Помилка при перевірці доступу користувача ' + error;
                        this.alertComponent.showAlert();
                    }
                });
            },
            error: (error) => {
                console.error('Помилка при отриманні користувача за email', error);
                this.alertComponent.message = 'Помилка при отриманні користувача за email ' + error;
                this.alertComponent.showAlert();
            }
        });
    } else {
        console.warn('Електронна пошта та тестування повинні бути обрані');
        this.alertComponent.message = 'Електронна пошта та тестування повинні бути обрані';
        this.alertComponent.showAlert();
    }
  }   
  
  grantAccessToUserByEmail() {
    if (this.userEmail !== null && this.testing_id_email !== null) {
        this.authService.getUserByEmail(this.userEmail).subscribe({
            next: (user: UserDetailModel) => {
                this.userTestingService.getAllUserTestings(user.id, this.testing_id_email).subscribe({
                    next: (existingAccesses) => {
                        if (existingAccesses.length === 0) {
                            this.userTestingService.addUserTesting(user.id, this.testing_id_email!).subscribe({
                                next: (response) => {
                                    console.log(`Доступ надано користувачу з email ${this.userEmail} до тестування з id ${this.testing_id_email}`);
                                    this.alertComponent.message = `Доступ надано користувачу з email ${this.userEmail} до тестування з id ${this.testing_id_email}`;
                                    this.alertComponent.showAlert();
                                  },
                                error: (error) => {
                                    console.error(`Помилка при наданні доступу користувачу з email ${this.userEmail}`, error);
                                  }
                              });
                          } else {
                              console.warn(`Доступ до тестування з id ${this.testing_id_email} вже надано користувачу з email ${this.userEmail}`);
                              this.alertComponent.message = `Доступ до тестування з id ${this.testing_id_email} вже надано користувачу з email ${this.userEmail}`;
                              this.alertComponent.showAlert();
                            }
                      },
                      error: (error) => {
                          console.error('Помилка при перевірці доступу користувача', error);
                          this.alertComponent.message = 'Помилка при перевірці доступу користувача ' + error;
                          this.alertComponent.showAlert();
                      }
                  });
              },
              error: (error) => {
                  console.error('Помилка при отриманні користувача за email', error);
                  this.alertComponent.message = 'Помилка при отриманні користувача за email ' + error;
                  this.alertComponent.showAlert();
              }
          });
      } else {
          console.warn('Електронна пошта та тестування повинні бути обрані');
          this.alertComponent.message = 'Електронна пошта та тестування повинні бути обрані';
          this.alertComponent.showAlert();
      }
  }


  grantAccessToAllUsers() {
    if (this.testing_id_all !== null) {
        this.authService.getAllUsers(null, null).subscribe({
            next: (users: UserDetailModel[]) => {

                users.forEach(user => {
                    // Перевіряємо, чи користувачу вже надано доступ
                    this.userTestingService.getAllUserTestings(user.id, this.testing_id_all!).subscribe({
                        next: (userTestings: UserTestingModel[]) => {
                            if (userTestings.length === 0) {

                                this.userTestingService.addUserTesting(user.id, this.testing_id_all!).subscribe({
                                    next: (response) => {
                                        console.log(`Доступ надано користувачу з id ${user.id} до тестування з id ${this.testing_id_all}`);
                                    },
                                    error: (error) => {
                                        console.error(`Помилка при наданні доступу користувачу з id ${user.id}`, error);
                                    }
                                });
                            }
                        },
                        error: (error) => {
                            console.error(`Помилка при перевірці доступу користувача з id ${user.id}`, error);
                        }
                    });
                });
                this.alertComponent.message = `Надано доступ всім користувачам до тестування з id ${this.testing_id_all}`;
                this.alertComponent.showAlert();

            },
            error: (error) => {
                console.error('Помилка при отриманні списку користувачів', error);
                this.alertComponent.message = 'Помилка при отриманні списку користувачів ' + error;
                this.alertComponent.showAlert();
            }
        });
    } else {
        console.warn('Тестування повинно бути обране');
        this.alertComponent.message = 'Тестування повинно бути обране';
        this.alertComponent.showAlert();
    }
}


revokeAccessFromAllUsers() {
    if (this.testing_id_all !== null) {
        this.userTestingService.getAllUserTestings(null, this.testing_id_all).subscribe({
            next: (userTestings: UserTestingModel[]) => {
                userTestings.forEach(userTesting => {
                    this.userTestingService.deleteUserTesting(userTesting.id).subscribe({
                        next: () => {
                            console.log(`Доступ закрито для користувача з id ${userTesting.user_id} до тестування з id ${this.testing_id_all}`);
                        },
                        error: (error) => {
                            console.error(`Помилка при закритті доступу для користувача з id ${userTesting.user_id}`, error);
                        }
                    });
                });
                this.alertComponent.message = `Закрито доступ всім користувачам до тестування з id ${this.testing_id_all}`;
                this.alertComponent.showAlert();
            },
            error: (error) => {
                console.error('Помилка при отриманні доступу користувачів', error);
                this.alertComponent.message = 'Помилка при отриманні доступу користувачів ' + error;
                this.alertComponent.showAlert();
            }
        });
    } else {
        console.warn('Тестування повинно бути обране');
        this.alertComponent.message = 'Тестування повинно бути обране';
        this.alertComponent.showAlert();
    }
}


}
