import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'lib-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
    @Input() specification: any = null;
    @Output() handleCloseClicked: EventEmitter<any> = new EventEmitter();
}
