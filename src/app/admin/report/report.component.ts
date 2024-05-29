import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin/admin.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { TrackById } from 'src/app/utils/trackFn';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  participantList: any[] = [];
  trackFn = TrackById;

  constructor(private _route: ActivatedRoute, private _toastr: ToastrService, private _navRouter: Router, private _adminApi: AdminService, private _excel: ExcelService ) {

  }

  ngOnInit(): void {
    this.fetchData()
  }

  fetchData = () => {
    this._route.paramMap.subscribe(params => {
      const eventId = params.get('report')
      if(eventId === null) {
        this._navRouter.navigate(['/admin/home'])
      } else {
        this._adminApi.participantsByEventIdApi(eventId)
        .then((res: any) => {
          if(!res || !res.success){
            this._toastr.error("event doesn't exist")
            this._navRouter.navigate(['/admin/home']);
          }

          this.participantList = res.data;
        })
        .catch(() => {
          this._toastr.error("Something went wrong");
          this._navRouter.navigate(['/admin/home']);
        })
      }
    })
  }

  onDeleteParticipantDelete = (userId: string) => {
    this._adminApi.deleteParticipantByIdApi(userId)
    .then((res: any) => {
      if(!res || !res.success){
        this._toastr.error("Failed to delete.");
      }

      this._toastr.success("Successfully deleted.");
      this.fetchData();
    })
    .catch(() => {
      this._toastr.error("Something went wrong!")
    })
  }

  onExportToExcel = () => {
    this._excel.generateExcel(this.participantList, "Participant_List")
  }
}
