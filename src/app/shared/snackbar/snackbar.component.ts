import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SnackbarService } from './snackbar.service';
@Component({
  selector: 'app-snackbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  @ViewChild('snackbar') snackbar: ElementRef;
  message: string;

  constructor(private _snackbarService: SnackbarService, private cr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this._snackbarService.successMessage$.subscribe(val => {
      this.message = val;
      this.cr.detectChanges();
      if(val) {
        this.snackbar.nativeElement.className = "show alert alert-success";
      } else {
        this.snackbar.nativeElement.className = this.snackbar.nativeElement.className.replace("show alert alert-success", "");
      }
    });

    this._snackbarService.errorMessage$.subscribe(val => {
      this.message = val;
      this.cr.detectChanges();
      if(val) {
        this.snackbar.nativeElement.className = "show alert alert-danger";
      } else {
        this.snackbar.nativeElement.className = this.snackbar.nativeElement.className.replace("show alert alert-danger", "");
      }
    });
  }
}
