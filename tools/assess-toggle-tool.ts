import { WysiwygTool } from 'wysiwyg-e/wysiwyg-tool.js';
import { html, render } from 'lit-html';
import '@polymer/paper-button';
import '@polymer/paper-tooltip';
import '@polymer/iron-icon';
import '@polymer/iron-icons';

class AssessToggleTool extends WysiwygTool {
    connectedCallback() {
        render(html`
            <paper-button id="button">
                <iron-icon icon="icons:tab"></iron-icon>
            </paper-button>

            <paper-tooltip id="tooltip" for="button" position="${this.tooltipPosition}" offset="5">
    			<span>Toggle editor</span>
    		</paper-tooltip>
        `, this);
    }
}

window.customElements.define('assess-toggle-tool', AssessToggleTool);