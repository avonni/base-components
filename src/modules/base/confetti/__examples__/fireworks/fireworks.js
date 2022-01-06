import { LightningElement } from 'lwc';

export default class ConfettiFireworks extends LightningElement {
  colors = ["012a4a","013a63","01497c","014f86","2a6f97","2c7da0","468faf","61a5c2","89c2d9","a9d6e5"];
  
  fireConfetti() {
    const confetti = this.template.querySelector('avonni-confetti');
    if (confetti) confetti.fire();
  }
}
