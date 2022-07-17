import fs from "fs";

class FileReader {
    static key = "file-reader";

    read(filename) {
        return new Promise((resolve, reject) => {
             fs.readFile(filename, {}, (err, content) => {
                if (err) {
                    reject(err);
                } else resolve(content.toString());
             });
        });
    }
}

export default FileReader;