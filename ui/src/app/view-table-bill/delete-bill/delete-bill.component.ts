import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-delete-bill',
  templateUrl: './delete-bill.component.html',
  styleUrls: ['./delete-bill.component.css']
})
export class DeleteBillComponent implements OnInit {

  username = undefined;
  BillName = '';
  BillDescription = '';
  BillAmount: string = undefined;
  BillEnum: any = undefined;
  BillHasImage: boolean = undefined;
  BillIdentifier: string = undefined;
  BillImage: any = undefined;
  BillDate: any = undefined;
  MappedImageName = undefined;
  ActualImageName = undefined;
  imageToShow = undefined;
  canShowImage = false;
  base64Data = undefined;

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  ngOnInit() {
  }

}
