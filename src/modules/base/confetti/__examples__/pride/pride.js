import { LightningElement } from 'lwc';

export default class ConfettiPride extends LightningElement {
  colors = ["f94144","f3722c","f8961e","f9c74f","90be6d","43aa8b","577590"];
  
  fireConfetti() {
    const confetti = this.template.querySelector('avonni-confetti');
    if (confetti) confetti.fire();
  }
}
