/*jshint esnext: true */

import _ from 'lodash';

class VenuesController {
  constructor(venueStore) {
    this.viewModel = {
      venues: venueStore.venues
    };
  }
}

VenuesController.$inject = ['venueStore'];

export default VenuesController;
