import { LightningElement } from 'lwc';

export default class ConfettiBase extends LightningElement {
  fireConfetti() {
    const confetti = this.template.querySelector('avonni-confetti');
    if (confetti) confetti.fire();
  }
}
