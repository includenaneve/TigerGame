import { observable, action, computed } from 'mobx'

export default class HomeData {
  @observable store = {
    currentType: 'air',
    choosenLabels: {
      air: null,
      pet: null,
      staff: null,
      plant: null
    },
    remain: null,
    used: null,
    won: null,
    cloudShow: 0,
    resArr: null,
    godArr: null
  }
  
  @computed get cardShow() {
    return this.store.resArr && this.store.resArr.length > 0 && this.store.cloudShow === 0
  }

  @computed get cardClosedAll() {
    return this.store.resArr && this.store.resArr.length === 0 && this.store.cloudShow === 0
  }

  @computed get canSubmit() {
    const { air, pet, staff, plant } = this.store.choosenLabels
    return air && pet && staff && plant
  }

  @computed get hideLabel() {
    return this.store.choosenLabels[this.store.currentType]
  }

  @action removeCard = () => {
    this.store.resArr && this.store.resArr.length > 0 && this.store.resArr.splice(0, 1)
  }

  @action cloudAppear = () => {
    this.store.cloudShow = 1
  }

  @action cloudDisappear = () => {
    this.store.cloudShow = 0
  }

  @action setDataByKey = (key, value) => {
    this.store[key] = value
  }

  @action updateChoosenLabels = value => {
    this.store.choosenLabels[this.store.currentType] = value
  }
}
