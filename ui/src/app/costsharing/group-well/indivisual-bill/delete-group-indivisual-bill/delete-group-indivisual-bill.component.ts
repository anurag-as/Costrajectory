import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { GroupBillPostUtilitiesService } from '../group-bill-post-utilities.service';

@Component({
  selector: 'app-delete-group-indivisual-bill',
  templateUrl: './delete-group-indivisual-bill.component.html',
  styleUrls: ['./delete-group-indivisual-bill.component.css']
})
export class DeleteGroupIndivisualBillComponent implements OnInit {
  @Input() BillId: number;
  @Input() Amount: string;
  @Input() category: string;
  @Input() dateTime: string;
  @Input() Discription: string;
  @Input() GroupId: string;
  @Input() payer: string;
  @Input() share: string[];
  @Input() uploader: string;
  @Input() Username: string;
  @Input() ImageName: string;
  @Input() BillName: string;
  @Input() Participants: string[];
  @Input() ShareCopy: string[];
  @Output() RefreshCopy = new EventEmitter();
  constructor( private PosterService: GroupBillPostUtilitiesService ) { }

  ngOnInit() {
  }

  DeleteBill() {
    this.PosterService.DeleteRequestToServer(this.Username, this.GroupId, String(this.BillId), this.ImageName).subscribe( data => {
      this.RefreshCopy.emit();
    });
  }

}
