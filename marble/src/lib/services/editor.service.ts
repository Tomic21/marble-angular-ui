import { Injectable, Injector, ComponentFactoryResolver, EmbeddedViewRef, ApplicationRef } from '@angular/core';
import { EditorComponent } from '../components/editor/editor.component';

@Injectable({
    providedIn: 'root'
})
export class EditorService {
    public editorMode: boolean = false;
    private editorRef: any;
    private lastActivatedComponentUniqueKey: string = '';

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector
    ) {}

    public handleEditorDialog(event: any, uniqueKey: string, editorSpecification?: any) {
        event.stopPropagation();

        if (this.lastActivatedComponentUniqueKey === uniqueKey) this.editorMode = !this.editorMode;
        if (this.lastActivatedComponentUniqueKey !== uniqueKey) this.editorMode = true;

        if (this.editorMode && !this.editorRef) this.appendEditorComponentToBody(EditorComponent);
        if (!this.editorMode && this.editorRef) this.closeEditor();

        if (editorSpecification && this.editorMode) this.editorRef.instance.specification = editorSpecification;

        this.lastActivatedComponentUniqueKey = uniqueKey;
    }

    private appendEditorComponentToBody(component: any) {
        // 1. Create a component reference from the component.
        this.editorRef = this.componentFactoryResolver.resolveComponentFactory(component).create(this.injector);

        const style = this.editorRef.location.nativeElement.style;

        style.position = 'absolute';
        style.top = '0';
        style.left = '0';
        style.width = '100%';
        style.height = '100%';
        style.zIndex = '999';

        // 2. Attach component to the appRef so that it's inside the ng component tree.
        this.appRef.attachView(this.editorRef.hostView);

        // 3. Get DOM element from component should be tested in production.
        const domElem = (this.editorRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;

        // 5. Append DOM element to the body.
        document.body.appendChild(domElem);
    }

    private closeEditor() {
        this.appRef.detachView(this.editorRef.hostView);
        this.editorRef?.destroy();
        this.editorRef = null;
    }
}
