import { System } from "../core/models/System";
import { IKeyEventStrategy } from "../core/interfaces/IStrategy";

export class InputKeySystem extends System {

    constructor(
        private setupAlready: boolean = false,
        public strategy: IKeyEventStrategy | null = null
    ) {
        super();
    }

    execute(): void {
        this.setup();
    }

    setup(): void {
        if(this.setupAlready) return;
        this.setupAlready = true;
        document.addEventListener('keydown', (e) => {
            if(this.strategy){
                this.strategy.trigger(e.key);
            }
        });
    }
    
}