/*jshint esnext: true */

class VenueStore {
  constructor() {
    this.store = {
      venues: [
        { name: 'Filmore East' },
        { name: '40 Watt' },
        { name: 'State Palace' }
      ]
    };
  }

  get venues() {
    return this.store.venues;
  }
}

export default VenueStore;
