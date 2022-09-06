import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { NewTableItem, UserDataSource } from 'src/app/data-table/data-table-datasource';

@Component({
  selector: 'app-filter-section',
  templateUrl: './filter-section.component.html',
  styleUrls: ['./filter-section.component.scss'],
})
export class FilterSectionComponent implements OnInit, OnChanges {
  @Input() filter: UserDataSource | undefined;
  @Output() dataChanged = new EventEmitter();
  isSelected: boolean = false;
  constructor() {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter'].currentValue) {
      changes['filter'].currentValue.selection.changed.subscribe(
        (selected: { added: string | any[] }) => {
          this.isSelected = selected.added.length > 0;
        }
      );
    }
  }
  isAllSelected() {
    const numSelected = this.filter?.selection.selected.length;
    const numRows = this.filter?.data?.length;
    return numSelected === numRows;
  }
  valueChanged(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.filter?.filter$.next(filterValue.trim().toLowerCase());
  }
  deleteAllSelected() {
    if (this.isAllSelected()) {
      this.dataChanged.emit('All');
    } else {
      if (this.filter) {
        const newData: NewTableItem[] = this.filter.data.filter(
          (data) =>
            !this.filter?.selection.selected.find(
              (selected) => data.id === selected.id
            )
        );
        this.dataChanged.emit(newData);
      }
    }
    this.isSelected = false;
  }
}
