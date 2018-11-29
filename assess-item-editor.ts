import { html, customElement } from 'functional-element';
import '@polymer/iron-meta';
import 'wysiwyg-e';
import './juicy-ace-editor';
import './assess-item';

const ASSESSML_EDITOR = 'ASSESSML_EDITOR';
const JAVASCRIPT_EDITOR = 'JAVASCRIPT_EDITOR';

customElement('assess-item-editor', ({ constructing, connecting, props, update }) => {

    if (constructing) {
        return {
            showEditor: ASSESSML_EDITOR,
            assessML: '',
            javaScript: ''
        };
    }

    return html`
        <style>
            .assess-item-editor-editor {
                width: 100%;
                height: 50vh;
                box-shadow: 0px 0px 3px grey;
                margin: 0 auto;
            }
        </style>

        ${props.showEditor === ASSESSML_EDITOR ? html`
            <wysiwyg-e
                class="assess-item-editor-editor"
                @value-changed=${(e) => assessMLEditorValueChanged(update, props, e.currentTarget)}
            ></wysiwyg-e>
        ` : html`
            <juicy-ace-editor class="assess-item-editor-editor"></juicy-ace-editor>
        `}

        <assess-item .question=${{ assessML: props.assessML, javaScript: props.javaScript }}></assess-item>

        <button @click=${() => update({...props, showEditor: props.showEditor === ASSESSML_EDITOR ? JAVASCRIPT_EDITOR : ASSESSML_EDITOR })}>Switch</button>
    `;
});

function assessMLEditorValueChanged(update, props, assessMLEditor) {
    if (assessMLEditor.value === '') {
        return;
    }

    if (props.assessML !== assessMLEditor.value) {
        //TODO I am not sure why I need to put this in a setTimeout
        //TODO without it, lit-html seemed to be rendering one too many times, thus not saving the state of everything
        //TODO assess-item had two instances being created, when there is only one in the template
        setTimeout(() => {
            update({
                ...props,
                assessML: assessMLEditor.value
            });
        });
    }
}