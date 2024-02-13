import { Component, EventEmitter, Output } from "@angular/core";
import { isDateBefore } from "src/app/utils/validation";
import { Message } from "primeng/api";
import { calculateProfit } from "../../utils/computation";
import { workplaces } from "src/app/utils/workplaces";
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-add-form",
  templateUrl: "./add-form.component.html",
  styleUrls: ["./add-form.component.scss"],
})
export class AddFormComponent {
  @Output() submit = new EventEmitter<any>();
  @Output() errorEvent = new EventEmitter<string>();
  loading = false;
  workTime: any;
  hourlyWage: any;
  workplace: any;
  comments: any;
  messages: Message[] = [];
  workplaces = workplaces;
  authorFullName = "";

  constructor(private auth: AuthenticationService) {
    this.auth.getLoggedUser().subscribe((value: any) => {
      this.authorFullName = value.firstName + " " + value.lastName;
    });
  }

  async onSubmit() {
    if (
      !this.workTime ||
      !Array.isArray(this.workTime) ||
      this.workTime.length < 2
    ) {
      this.errorEvent.emit("Start time and end time are mandatory.");
      return;
    }

    const [startTime, endTime] = this.workTime;

    if (!startTime || !endTime || !isDateBefore(startTime, endTime)) {
      this.errorEvent.emit("The start time must be before the end time.");
      return;
    }

    if (!this.hourlyWage || isNaN(this.hourlyWage) || this.hourlyWage <= 0) {
      this.errorEvent.emit("Hourly wage must be over 0.");
      return;
    }

    if (!this.workplace) {
      this.errorEvent.emit("You must select a workplace.");
      return;
    }

    const shift = {
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      hourlyWage: parseFloat(this.hourlyWage),
      workplace: this.workplace,
      comments: this.comments || "",
      profit: calculateProfit(startTime, endTime, this.hourlyWage),
      authorFullName: this.authorFullName,
    };

    this.submit.emit(shift);
  }
}
