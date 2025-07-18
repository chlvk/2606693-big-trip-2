import { render } from '../render.js';
import ListSortView from '../view/list-sort-view.js';
import PointEditView from '../view/point-edit-view.js';
import PointsListView from '../view/points-list-view.js';
import PointView from '../view/point-view.js';

class TablePresenter {
  pointsListComponent = new PointsListView();

  constructor({container, pointsModel}) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new ListSortView(), this.container);
    render(this.pointsListComponent, this.container);

    const pointEditProperties = {
      point: this.points[0],
      destinations: this.destinations,
      offers: this.offers
    };
    render(new PointEditView(pointEditProperties), this.pointsListComponent.getElement());

    for (let i = 1; i < this.points.length; i++) {
      const properties = {
        point: this.points[i],
        destinations: this.destinations,
        offers: this.offers
      };
      render(new PointView(properties), this.pointsListComponent.getElement());
    }

  }
}

export default TablePresenter;
