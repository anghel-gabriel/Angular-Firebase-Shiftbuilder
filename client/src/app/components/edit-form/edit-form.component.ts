import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { isDateBefore } from "../../utils/validation";
import { calculateProfit } from "../../utils/computation";
import { workplaces } from "src/app/utils/workplaces";

@Component({
  selector: "app-edit-form",
  templateUrl: "./edit-form.component.html",
  styleUrl: "./edit-form.component.scss",
})
export class EditFormComponent implements OnChanges {
  @Input() editShift: any;
  @Output() submit = new EventEmitter<any>();
  @Output() errorEvent = new EventEmitter<string>();
  @Output() successEvent = new EventEmitter<string>();
  workTime: any;
  hourlyWage: any;
  workplace: any;
  comments: any;
  workplaces = workplaces;

  ngOnChanges(changes: SimpleChanges) {
    if (changes["editShift"] && this.editShift) {
      this.workTime = [
        new Date(this.editShift.startTime),
        new Date(this.editShift.endTime),
      ];
      this.hourlyWage = this.editShift.hourlyWage;
      this.workplace = this.editShift.workplace;
      this.comments = this.editShift.comments;
    }
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

    if (!this.hourlyWage || this.hourlyWage <= 0) {
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
      comments: this.comments,
      profit: calculateProfit(startTime, endTime, this.hourlyWage),
    };

    this.submit.emit(shift);
    this.successEvent.emit("Shift updated successfully.");
  }
}
