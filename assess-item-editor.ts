import { html, customElement } from 'functional-element';
import '@polymer/iron-meta';
import 'wysiwyg-e';
import './juicy-ace-editor';
import '@polymer/paper-button';
import '@polymer/paper-tooltip';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

const ASSESSML_EDITOR = 'ASSESSML_EDITOR';
const JAVA_SCRIPT_EDITOR = 'JAVA_SCRIPT_EDITOR';

const ASSESSML = 'AssessML';
const JAVA_SCRIPT = 'JavaScript';

customElement('assess-item-editor', ({ constructing, connecting, props, update, element }) => {
    if (constructing) {
        return {
            showEditor: ASSESSML_EDITOR,
            toggleButtonText: JAVA_SCRIPT,
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

            .assess-item-editor-assessml-toggle-button {
                position: absolute;
                right: -5px;
                top: 0px;
                cursor: pointer;
                z-index: 1;
                background-color: grey;
                color: white;
            }

            .assess-item-editor-java-script-toggle-button {
                position: absolute;
                right: -5px;
                top: 40px;
                cursor: pointer;
                z-index: 1;
            }

            .assess-item-editor-container {
                position: relative;
            }
        </style>
            
        <div class="assess-item-editor-container">
            <div ?hidden=${props.showEditor !== ASSESSML_EDITOR}>
                <paper-button
                    id="switchEditorToJavaScriptIcon"
                    class="assess-item-editor-java-script-toggle-button"
                    @click="${() => toggleButtonClicked(props, update)}"
                >
                    <iron-icon icon="icons:tab"></iron-icon>
                </paper-button>

                <paper-tooltip for="switchEditorToJavaScriptIcon" offset="5">
                    <span>JavaScript</span>
                </paper-tooltip>

                <wysiwyg-e
                    class="assess-item-editor-editor"
                    @value-changed=${(e) => assessMLEditorValueChanged(update, props, e.currentTarget, element)}
                    .value=${props.assessML}
                >
                </wysiwyg-e>
            </div>

            <div ?hidden=${props.showEditor !== JAVA_SCRIPT_EDITOR}>
                <paper-button
                    id="switchEditorToAssessMLIcon"
                    class="assess-item-editor-assessml-toggle-button"
                    @click="${() => toggleButtonClicked(props, update)}"
                >
                    <iron-icon icon="icons:tab"></iron-icon>
                </paper-button>

                <paper-tooltip for="switchEditorToAssessMLIcon" offset="5">
                    <span>AssessML</span>
                </paper-tooltip>

                <juicy-ace-editor
                    class="assess-item-editor-editor"
                    @value-changed=${(e) => javaScriptEditorValueChanged(update, props, e.currentTarget, element)}
                    .value=${props.javaScript}
                ></juicy-ace-editor>
            </div>
        </div>

    `;
});

function assessMLEditorValueChanged(update, props, assessMLEditor, element) {
    if (props.assessML === assessMLEditor.value || assessMLEditor.value === '') {
        return;
    }

    //TODO I am not sure why I need to put this in a setTimeout
    //TODO without it, lit-html seemed to be rendering one too many times, thus not saving the state of everything
    //TODO assess-item had two instances being created, when there is only one in the template
    setTimeout(() => {
        update({
            ...props,
            assessML: assessMLEditor.value
        });

        element.dispatchEvent(new CustomEvent('assessml-changed', {
            detail: {
                value: assessMLEditor.value
            }
        }));
    });
}

function javaScriptEditorValueChanged(update, props, javaScriptEditor, element) {
    console.log('props.javaScript', props.javaScript);
    console.log('javaScriptEditor.value', javaScriptEditor.value);

    if (props.javaScript === javaScriptEditor.value || javaScriptEditor.value === '') {
        return;
    }

    update({
        ...props,
        javaScript: javaScriptEditor.value
    });

    element.dispatchEvent(new CustomEvent('java-script-changed', {
        detail: {
            value: javaScriptEditor.value
        }
    }));
}

function toggleButtonClicked(props, update) {
    update({
        ...props,
        showEditor: props.showEditor === ASSESSML_EDITOR ? JAVA_SCRIPT_EDITOR : ASSESSML_EDITOR
    });
}