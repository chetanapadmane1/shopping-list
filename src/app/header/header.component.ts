import { Component, OnInit } from '@angular/core';
import { } from '@angular/core/src/metadata/directives';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private dss: DataStorageService) { }

  ngOnInit() {
  }
  onSaveData() {
    this.dss.storeRecipes();
  }
  onFetchData() {
    this.dss.fetchRecipes();
  }
}
