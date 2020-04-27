import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddBillsComponent } from '../add-bills/add-bills.component';
import { Input } from '@angular/core';
import {Router} from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';

interface UsageStats {
  TotalQuota: number;
  UsedQuota: number;
}

@Component({
  selector: 'app-iconbar',
  templateUrl: './iconbar.component.html',
  styleUrls: ['./iconbar.component.css']
})
export class IconbarComponent implements OnInit {
  @Input() userName;
  usageQuota = undefined;
  maxQuota = undefined;
  color: ThemePalette = 'warn';
  constructor(public dialog: MatDialog, private route: Router, private http: HttpClient) {}

  getUsageQuota() {
    const endpoint = 'http://127.0.0.1:5000/analytics/usage';
    const QueryPayload = {username: this.userName};
    // console.log('USAGE:',QueryPayload);
    return this.http.post<UsageStats>(endpoint, QueryPayload);
  }

  ngOnInit() {
    this.usageQuota = 10;
    this.getUsageQuota().subscribe(data => {
      this.maxQuota = data.TotalQuota;
      this.usageQuota = data.UsedQuota;
      this.usageQuota = Math.min(Math.round((this.usageQuota + Number.EPSILON) * 100) / 100 , data.TotalQuota);
    });
  }

  addBill(): void {
    const dialogRef = this.dialog.open(AddBillsComponent, {
      width: '1300px'
    });
    dialogRef.componentInstance.username = this.userName;

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  analytics(): void {
    this.route.navigate(['/analytics']);
  }

  GoHome(): void {
    this.route.navigate(['']);
  }

  CostSharing(): void {
    this.route.navigate(['CostSharing']);
  }

}

