import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  SYSTEM_CONSTANTS,
  VALIDATION_MSG,
} from 'src/app/core/system.constants';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private _location: Location) {}
  imageURL = SYSTEM_CONSTANTS.PAGE_NOT_FOUND_IMAGE_URL;
  msg = VALIDATION_MSG.PAGE_NOT_FOUND_ERROR_MSG;

  ngOnInit() {}

  /**
   * @ngdoc component
   * @name redirectBack
   * @memberof PageNotFoundComponent
   *
   * @description
   *
   * This function is used to Redirect to your previous page on back button click.
   **/

  redirectBack = () => {
    this._location.back();
  };
}
