import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent implements OnInit{
  ngOnInit() {
    this.navAnimation();
  }
  navAnimation(){
    $(()=>{
      $(window).on('scroll',function(){
        if($(window).scrollTop()){
          $(".navbar").removeClass('py-4')
          $(".navbar").addClass('py-2')
        }else{
          $(".navbar").removeClass('py-2')
          $(".navbar").addClass('py-4')
        }
      })
    })
  }
}
