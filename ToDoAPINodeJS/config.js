const fs = require("fs");
const fileName = "./ToDoCQRS-config.json";
let configFile = require(fileName);

const DEFAULT_INDENTATION_SPACES = 4;

class Settings
{
    constructor()
    {
        this.settings = configFile;
        this.repository = null;
    }

    get Repository()
    {
        //lazy loading
        if (this.repository === null)
        {
            this.repository = require(this.settings.RepositoryPath);
        }

        return this.repository;
    }
    set Repository(repository)
    {
        this.repository = typeof repository == "string" ? require(repository) : repository;
    }

    save()
    {
        return new Promise((resolve, reject) => fs.writeFile(fileName, JSON.stringify(this.settings, null, DEFAULT_INDENTATION_SPACES), error =>
        {
            if (!error)
            {
                resolve();
            }
            else
            {
                reject(error);
            }
        }));
    }
}

module.exports = new Settings();
