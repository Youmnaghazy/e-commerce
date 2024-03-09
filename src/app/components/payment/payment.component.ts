import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(private _ActivatedRoute: ActivatedRoute,private _CartService:CartService) {}
  cartdId: any = '';
  cities: string[] = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Shubra El Kheima',
    'Port Said',
    'Suez',
    'Luxor',
    'Mansoura',
    'El-Mahalla El-Kubra',
    'Tanta',
    'Asyut',
    'Ismailia',
    'Faiyum',
    'Zagazig',
    'Aswan',
    'Damietta',
    'Damanhur',
    'El-Minya',
    'Beni Suef',
    'Sohag',
    'Hurghada',
    '6th of October City',
    'Banha',
    'Kafr el-Sheikh',
    'Arish',
    'Mallawi',
    '10th of Ramadan City',
    'Bilbais',
    'Marsa Matruh',
    'Idfu',
    'Mit Ghamr',
    'Al-Hamidiyya',
    'Desouk',
    'Qalyub',
    'Abu Kabir',
    'Kafr el-Dawwar',
    'Girga',
    'Akhmim',
    'El Matareya',
    'Edko',
    'Badr',
    'Abnub',
    'El Tur',
    'New Cairo',
    'Talkha',
    'Dahab',
    'Quesna',
    'Abu Tig',
  ];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.cartdId = params.get('id');
      },
    });
  }
  orderForm: FormGroup = new FormGroup({
    details: new FormControl('',[
      Validators.required,
    ]),
    phone: new FormControl('',[
      Validators.required,
      Validators.pattern(/^01[0125]\d{8}$/),
    ]),
    city: new FormControl('',[
      Validators.required
    ]),
  });
  handleForm(data:FormGroup):void{
    if(data.valid){
      this._CartService.checkOut(this.cartdId,data.value).subscribe({
        next:res=>{
          if(res.status == "success"){
            window.open(res.session.url,'_self');
          }
        },error:err=>{
          console.log(err);
        }
      })
    }
  }
}
