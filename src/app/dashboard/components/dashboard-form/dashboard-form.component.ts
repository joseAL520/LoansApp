import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import { min, switchMap } from 'rxjs';
import { FormUtils } from '../../utils/form-utils';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-form',
  imports: [RouterLink,ReactiveFormsModule,],
  templateUrl: './dashboard-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFormComponent  { 

  dashboardService = inject(DashboardService)
  router = inject(Router)   
  activateRouter= inject(ActivatedRoute)
  public id: any;
  private fb  = inject(FormBuilder)

  myForm = this.fb.group({
    id:['66cfc27f-e3e2-4619-9a01-6f0a583f1841'],
    nit:[,[Validators.required, Validators.min(5)]],
    fullName:['',[Validators.required, Validators.minLength(7)]],
    email:['',[Validators.required, Validators.email]],
    loans:[,[Validators.required, Validators.min(10000),Validators.max(100000)]],
    payDate: ['']
  })
  formUtils= FormUtils;
  
  onSubmit(){
   this.myForm.markAllAsTouched();
   if(!this.myForm.valid)return
    const newClient = this.myForm.value
    this.dashboardService.postClients(newClient).subscribe()
    this.myForm.reset()
  }
  

  ngOnInit(): void {

    if(!this.router.url.includes('lonsEdit')) return
    
    this.activateRouter.params.pipe(
      switchMap(params => {
        this.id = params['id'];
        return []; 
      })
    ).subscribe();

   console.log(this.id)
    
  }


//     ngOnInit(): void {
//     if (!this.router.url.includes('edit')) return;
  
//     this.activateRouter.params
//       .pipe(
//         switchMap(({ id }) => this.serviceProduct.getProductByid(id))
//       )
//       .subscribe(
//         prod => {
//           if (!prod) {
//             this.router.navigateByUrl('/');
//             return;
//           }
//           this.productForm.patchValue({
//             id: prod.id,
//             title: prod.title,
//             price: prod.price,
//             category: prod.category, // Asegúrate de que esto coincida con los valores en el select
//             count: prod.count,
//             image: prod.image,
//             description: prod.description
//           });
//           this.imagePreview = prod.image;
//         },
//         error => {
//           console.error('Error fetching product:', error);
//           this.router.navigateByUrl('/');
//         }
//       );
// }


}
