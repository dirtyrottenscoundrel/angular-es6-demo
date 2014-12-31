/*jshint esnext: true */

class SelectableController {
  constructor ($scope, $element) {
    this._selection = undefined;
  }

  get selection () {
    return this._selection;
  }

  select (selection) {
    this._selection = selection;
  }
}

function Selectable () {
 return {
  controller: SelectableController,
  controllerAs: 'selectable',
  link: function postLink (scope, iElement, iAttrs, controller) {
    iElement.on('click', ($event) => {
      var clicked = angular.element($event.target)
        , isChild = clicked.parent().is(iElement);

      // If user clicked on the selectable, then ignore
      if (iElement.is(clicked)) return;

      while (!isChild) {
        clicked = clicked.parent();
        isChild = clicked.parent().is(iElement);
      }

      // For now, no toggle, just ignore if already selected
      if (clicked.hasClass('active')) return;

      iElement.children().removeClass('active');
      clicked.addClass('active');
    });
  }
 };
}

export default Selectable;
