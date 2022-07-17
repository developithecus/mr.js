import di from "../../di";
import { renderToString } from "react-dom/server";
import path from "path";

class Controller {
    async render(jsx) {
        const template = path.resolve(di().getConfiguration('project_root'), di().getConfiguration('base_html'));
        const html = await di().get('file-reader').read(template);

        return html.replace(/{{\s*reactApp\s*}}/, renderToString(jsx));
    }
}

export default Controller;