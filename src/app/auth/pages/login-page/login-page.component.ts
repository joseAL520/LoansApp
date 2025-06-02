import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { FormUtils } from '../../../dashboard/utils/form-utils';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdmBankService } from '../../services/admBank.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {


  service = inject(AdmBankService);
  router = inject(Router);
  fb = inject(FormBuilder);
  hasError = signal(false);
  hasLoad = signal(false);


  logingForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })
    
  onSubmit(){
    if(!this.logingForm.valid){
      
      this.hasError.set(true)
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return
    }
   const {email,password} = this.logingForm.value
    this.service.login(email!,password!).subscribe( isAuth => {

      if(isAuth)return this.router.navigateByUrl('/')

      this.hasError.set(true);
      setTimeout(() => {
        this.hasError.set(false)
      }, 2000);
      return
    })
  }

}
