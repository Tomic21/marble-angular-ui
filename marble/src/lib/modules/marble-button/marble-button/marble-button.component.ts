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
    @Input() isPreview: boolean = false;
    @Output() click: EventEmitter<any> = new EventEmitter();

    public editorMode: boolean = false;

    public availableClasses = ['danger', 'success', 'warning', 'basic'];

    @Input() public specification: any = {};

    public isLoaded: boolean = false;

    constructor(private apiService: ApiService, private marbleService: MarbleService) {}

    ngOnInit() {
        this.marbleService.isLoaded.subscribe((isLoaded) => {
            if (isLoaded === true) {
                this.apiService
                    .post([{ path: 'marble', value: 'register' }], { componentKey: this.constructor.name })
                    .subscribe(() => {
                        this.specification = this.marbleService.components['MarbleButtonComponent'][this.key];
                        if (!this.specification) this.specification = {};
                        this.isLoaded = true;
                    });
            }
        });
    }

    public handleClassChange(buttonClass: string) {
        this.specification.buttonClass = buttonClass;
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

    public getButtonStatusClass() {
        if (this.status) return this.status;
        if (this.specification.buttonClass) return this.specification.buttonClass;
        return 'basic';
    }

    public getButtonText() {
        if (this.text) return this.text;
        if (this.specification.buttonText) return this.specification.buttonText;
        return 'Button';
    }
}
