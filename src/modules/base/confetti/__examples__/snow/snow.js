import { LightningElement } from 'lwc';

export default class ConfettiSnow extends LightningElement {
  colors = ["e63946","f1faee","a8dadc","457b9d","1d3557"];

  fireConfetti() {
    const confetti = this.template.querySelector('avonni-confetti');
    if (confetti) confetti.fire();
  }
}
