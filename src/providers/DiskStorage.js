const fs = require("fs")
const path = require("path")
const uploadConfig = require("../config/upload")

class DiskStorage {
    async saveFile(file) {
        await fs.promises.rename( // vai mudar o arquivo de lugar 
            path.resolve(uploadConfig.TMP_FOLDER, file),
            path.resolve(uploadConfig.UPLOAD_FOLDER, file) // A IMAGEM VAI FICAR ARMAZENADA NO ARQUIVO TEMPORARIO E DEPOIS VAI SER PASSADA PARA O ARQEUIVO DE UPLOAD

        );
        return file
    }

    async deleteFile(file) {
        const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file);

        try {
            await fs.promises.stat(filePath)

        } catch {
            return
        }

        await fs.promises.unlink(filePath);
    }
}

module.exports = DiskStorage