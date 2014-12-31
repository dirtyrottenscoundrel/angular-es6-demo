describe("Service: VenueStore", function() {
  beforeEach(angular.mock.module('angularEs6Demo'));

  var venueStore;

  beforeEach(inject(function(_venueStore_) {
    venueStore = _venueStore_;
  }));

  it("creates an injectable VenueStore service", function() {
    venueStore.should.not.equal(null);
  });

  it("has three entries", function() {
    venueStore.venues.should.have.length(3);
  });
});
