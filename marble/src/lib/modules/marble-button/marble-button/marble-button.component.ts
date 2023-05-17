import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.http.get(`http://localhost:9000/marble?key=${this.key}`).subscribe((response) => {
            this.isLoaded = true;
            this.specification = response;
        });
    }

    public handleClassChange(buttonClass: string) {
        this.specification.buttonClass = buttonClass;
        this.saveSpecification();
    }

    public saveSpecification() {
        this.http.post(`http://localhost:9000/marble?key=${this.key}`, this.specification).subscribe();
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
