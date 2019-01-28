import { observable, action, computed } from 'mobx'

export default class HomeData {
  @observable store = {
    currentType: 'air',
    choosenLabels: {
      air: null,
      pet: null,
      staff: null,
      plant: null
    }
  }

  @computed get hideLabel() {
    return this.store.choosenLabels[this.store.currentType]
  }

  @action setDataByKey = (key, value) => {
    this.store[key] = value
  }

  @action updateChoosenLabels = value => {
    this.store.choosenLabels[this.store.currentType] = value
  }
}
