import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-dashboard-form',
  imports: [RouterLink],
  templateUrl: './dashboard-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardFormComponent  { 

  router = inject(Router)   
  activateRouter= inject(ActivatedRoute)
  public id: any;

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
