import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'marble/src/lib/services/api.service';
import { MarbleService } from 'marble/src/public-api';
@Component({
    selector: 'lib-marble-button',
    templateUrl: './marble-button.component.html',
    styleUrls: ['./marble-button.component.scss']
})
export class MarbleButtonComponent implements OnInit {
    @Input() key: string = '';
    @Input() text: string = '';
    @Input() status: string = '';
    @Input() borderRadius: string = '';
    @Input() isPreview: boolean = false;
    @Output() click: EventEmitter<any> = new EventEmitter();

    public editorMode: boolean = false;

    public availableClasses = ['danger', 'success', 'warning', 'basic'];

    @Input() public specification: any = {};

    /* public editorSpecification: any = {
        key: 'MarbleButtonComponent',
        components: [[{ propertyKey: 'buttonClass', propertyValue: 'danger', text:"" }]]
    }; */

    public isLoaded: boolean = false;

    constructor(private apiService: ApiService, private marbleService: MarbleService) {}

    ngOnInit() {
        this.marbleService.prepareComponent(this.constructor.name, this.key).subscribe((specification) => {
            this.specification = specification;
            this.isLoaded = true;
        });
    }

    public handlePropertyChange(propertyKey: string, propertyValue: string) {
        this.specification[propertyKey] = propertyValue;
        this.saveSpecification();
    }

    public saveSpecification() {
        this.isLoaded = false;
        this.apiService
            .post(
                [
                    { path: 'marble' },
                    { query: 'componentKey', value: this.constructor.name },
                    { query: 'uniqueKey', value: this.key }
                ],
                this.specification
            )
            .subscribe((response) => {
                this.isLoaded = true;
            });
    }

    public toggleEditorMode() {
        if (!this.isPreview) this.editorMode = !this.editorMode;
    }

    public getButtonClasses(): string {
        return this.getButtonStatusClass() + ' ' + this.getButtonBorderClass();
    }

    public getButtonStatusClass(): string {
        if (this.status) return this.status;
        if (this.specification.buttonClass) return this.specification.buttonClass;
        return 'basic';
    }

    public getButtonBorderClass(): string {
        if (this.borderRadius) return this.borderRadius;
        if (this.specification.borderRadius) return this.specification.borderRadius;
        return 'border-elegant';
    }

    public getButtonText(): string {
        if (this.text) return this.text;
        if (this.specification.buttonText) return this.specification.buttonText;
        return 'Button';
    }
}
