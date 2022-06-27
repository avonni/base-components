const INITIAL_VELOCITY = 10;

class ToolManager {
    xPositions;
    yPositions;
    velocities;
    moveCoordinatesAdded = 0;
    prevDist = 0;
    color;
    mode;
    size;
    ctx;
    canvasElement;

    constructor(
        xPositions,
        yPositions,
        velocities,
        color,
        mode,
        size,
        ctx,
        canvasElement
    ) {
        this.xPositions = xPositions;
        this.yPositions = yPositions;
        this.velocities = velocities;
        this.color = color;
        this.mode = mode;
        this.size = size;
        this.ctx = ctx;
        this.canvasElement = canvasElement;
    }

    /**
     * Sets up coordinates for beginning of a line
     *
     * @param {Event} event
     */
    setupLine() {
        // setup all tools should do
    }

    /**
     * Draws a stroke between coordinates
     *
     * @param {Event} event
     */
    draw() {
        // draw all tools should do
    }

    /**
     * Finishes coordinate management for end of a line
     *
     * @param {Event} event
     */
    closeLine() {
        // close all tools should do
        this.xPositions = [];
        this.yPositions = [];
        this.velocities = [];
    }

    setupStroke(strokeSize) {
        const colored = false;
        this.ctx.beginPath();
        this.ctx.globalCompositeOperation =
            this.mode === 'erase' ? 'destination-out' : 'source-over';
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.strokeStyle = colored
            ? `hsl(${Math.random() * 355},75%,50%)`
            : this.color;
        this.ctx.lineWidth = strokeSize;
    }
}

export class StraightToolManager extends ToolManager {
    setupLine(event) {
        super.setupLine();
        const clientRect = this.canvasElement.getBoundingClientRect();
        this.xPositions.unshift(event.clientX - clientRect.left);
        this.yPositions.unshift(event.clientY - clientRect.top);
    }

    draw(event) {
        super.draw();
        this.setupLine(event);
        super.setupStroke(this.size);
        this.ctx.moveTo(this.xPositions[1], this.yPositions[1]);
        this.ctx.lineTo(this.xPositions[0], this.yPositions[0]);
        this.ctx.stroke();
        this.xPositions.pop();
        this.yPositions.pop();
    }

    closeLine(event) {
        this.draw(event);
        super.closeLine();
    }
}

export class SmoothToolManager extends ToolManager {
    setupLine(event) {
        super.setupLine();
        this.xPositions = [];
        this.yPositions = [];
        this.velocities = Array(4).fill(INITIAL_VELOCITY);
        const clientRect = this.canvasElement.getBoundingClientRect();
        for (let i = 0; i < 4; i++) {
            this.xPositions.unshift(event.clientX - clientRect.left);
            this.yPositions.unshift(event.clientY - clientRect.top);
        }
    }

    draw() {
        super.draw();
        //TODO: implement draw for smooth tools
    }

    closeLine() {
        for (let i = 0; i < this.moveCoordinatesAdded; i++) {
            this.xPositions.shift();
            this.yPositions.shift();
            this.velocities.shift();
        }
        this.smoothVelocities();
        for (let i = 0; i < 2; i++) {
            // add two "phantom" points for calculations
            for (let j = 0; j < 2; j++) {
                this.xPositions.unshift(this.xPositions[0]);
                this.yPositions.unshift(this.yPositions[0]);
                this.velocities.unshift(this.velocities[0] + 2);
            }
            this.drawSpline();
        }
        super.closeLine();
    }
}
