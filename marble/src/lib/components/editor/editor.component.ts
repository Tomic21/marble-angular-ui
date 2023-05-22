import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'lib-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    @Input() specification;
    ngOnInit(): void {
        console.log(this.specification);
    }
}
