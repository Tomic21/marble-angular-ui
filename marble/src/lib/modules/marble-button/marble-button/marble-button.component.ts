import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'lib-marble-button',
    templateUrl: './marble-button.component.html',
    styleUrls: ['./marble-button.component.scss']
})
export class MarbleButtonComponent {
    @Input() text: string = 'Button';
    @Input() status: string = 'basic';
    @Input() isPreview: boolean = false;
    @Output() click: EventEmitter<any> = new EventEmitter();

    public editorMode: boolean = false;

    public availableClasses = ['danger', 'success', 'warning', 'basic'];

    @Input() public specification: any = {};

    public handleClassChange(buttonClass: string) {
        this.specification.buttonClass = buttonClass;
    }

    public saveSpecification() {}

    public toggleEditorMode() {
        if (!this.isPreview) this.editorMode = !this.editorMode;
    }

    public getButtonStatusClass() {}
}
