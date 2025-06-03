import { ChangeDetectionStrategy, Component, inject, input, output, signal, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { from, map, min, switchMap } from 'rxjs';
import { FormUtils } from '../../utils/form-utils';
import { v4 as uuidv4 } from 'uuid';
import { DashboardService } from '../../services/dashboard.service';


@Component({
  selector: 'app-dashboard-form',
  imports: [RouterLink,ReactiveFormsModule,],
  templateUrl: './dashboard-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFormComponent  {
  private idGenel = '';
  private fb  = inject(FormBuilder)

  router = inject(Router)
  activateRouter= inject(ActivatedRoute)
  serviceClient = inject(DashboardService)

  isActiveAlertError = signal<boolean>(false)
  isActiveAlertSuccess = signal<boolean>(false)

  deactivateRequestButton =input<boolean>(false)
  capital = input<number|undefined>()
  
  formUtils= FormUtils; //
  formOutput = output<any>();
  myForm = this.fb.group({
    id:[uuidv4()],
    nit:[0,[Validators.required, Validators.min(5)]],
    fullName:['',[Validators.required, Validators.minLength(7)]],
    email:['',[Validators.required, Validators.email]],
    loans:[0,[Validators.required, Validators.min(10000)]],
    payDate:['']
  })

  onSubmit(){

   this.myForm.markAllAsTouched();
   if(!this.myForm.valid)return
   if(this.idGenel) return this.updateClient()

   if(!this.randomClientAprobation()) {
    this.myForm.reset( {id: uuidv4()})
    this.isActiveAlertError.set(true)
      if( this.isActiveAlertError){
          setTimeout(() => {
        this.isActiveAlertError.set(false)
      }, 3000);
      }

    return
   }

    this.isActiveAlertSuccess.set(true)
   setTimeout(() => {
    this.isActiveAlertSuccess.set(false)
   }, 3000);

    const newClient = this.myForm.value
    this.formOutput.emit(newClient)
    this.myForm.reset( {id: uuidv4()})
  }

  updateClient(){
    const client = this.myForm.value;

    this.serviceClient.updateClients(this.idGenel, client).subscribe();
    this.router.navigateByUrl('/lonsAgg');
  }

  randomClientAprobation(){
    const data =  Math.random() * 2 + 0
    const data2 = Math.floor(data)
    if(data2){
      return true
    }
   return false
  }

  // detecta los cambios del capital disponble 
  //EJEMPLO: si en caso dado el capital o fondo es de 999.999 o 87321 
  // se coloca como rango maximo de valor disponible

  ngOnChanges(changes: SimpleChanges) {
    if ('capital' in changes) {
      const cap = changes['capital'].currentValue ?? 0;
      const maxRanger = cap < 100000 ? cap : 100000;

      const loansControl = this.myForm.get('loans');
      loansControl?.setValidators([
        Validators.required,
        Validators.min(10000),
        Validators.max(maxRanger),
      ]);
      loansControl?.updateValueAndValidity();
    }
  }

  ngOnInit(): void {
    if(!this.router.url.includes('lonsEdit')) return

    this.activateRouter.params.pipe(
      switchMap(params  => {
           const id = params['id'];
           this.idGenel = id
          return this.serviceClient.getClientsIdBy(id);
      })
    ).subscribe(
      prod => {
         if (!prod) {
            this.router.navigateByUrl('/');
            return;
         }
        this.myForm.patchValue({
          id:this.idGenel,
          email : prod[0].email,
          fullName : prod[0].fullName,
          loans : prod[0].loans,
          nit : prod[0].nit,
          payDate : prod[0].payDate,
        })
      }
    );

  }
}
