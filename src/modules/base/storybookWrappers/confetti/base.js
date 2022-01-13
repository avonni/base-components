import { LightningElement, api } from 'lwc';

export default class ConfettiBase extends LightningElement {
  @api colors;
  @api name;
  @api originX;
  @api originY;
  @api variant;
  @api zIndex;

  fireConfetti() {
    const confetti = this.template.querySelector('[data-element-id="avonni-confetti"]');
    if (confetti) confetti.fire();
  }
}
