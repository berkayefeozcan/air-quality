import {makeAutoObservable, configure} from 'mobx';
configure({
  enforceActions: 'never',
});
class Store {
  constructor() {
    this.defaultValue = 0;
    this.mq2_veriler = [this.defaultValue];
    this.mq2_labels = [''];
    // this.mq135_veriler=[this.defaultValue]
    // this.mq135_labels=[""]
    this.mq135_veri = '';
    makeAutoObservable(this);
  }
  pushMQ2data(data) {
    var kesmeSayisi = 13;
    if (this.mq2_veriler.length >= kesmeSayisi) {
      this.mq2_veriler = this.mq2_veriler.slice(-kesmeSayisi);
      this.mq2_labels = this.mq2_labels.slice(-kesmeSayisi);
    }
    this.mq2_veriler.push(data);
    this.mq2_labels.push('');
  }
//   pushMQ135data(data) {
//     var kesmeSayisi = 19;
//     if (this.mq135_veriler.length >= kesmeSayisi) {
//       this.mq135_veriler = this.mq135_veriler.slice(-kesmeSayisi);
//       this.mq135_labels = this.mq135_labels.slice(-kesmeSayisi);
//     }
//     this.mq135_veriler.push(data);
//     this.mq135_labels.push('');
//   }
  clearAllData() {
    this.mq2_veriler = [this.defaultValue];
    this.mq2_labels = [''];
    this.mq135_veri = '';
  }
}

export default new Store();
