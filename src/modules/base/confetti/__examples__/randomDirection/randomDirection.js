import { LightningElement } from 'lwc';

export default class ConfettiRandomDirection extends LightningElement {
  fireConfetti() {
    const confetti = this.template.querySelector('avonni-confetti');
    if (confetti) confetti.fire();
  }
}
