/**
 * Created by jboerner on 23.12.17.
 */
const path = require('path');

let replaceAll = function(target ,search, replacement) {
    return target.split(search).join(replacement);
};

/**
 * SuperPath:
 *
 * A class to resolve os paths like in a bash script.
 * Fox e.x %USERHOME%/foo/bar/zonk.txt.
 */
class SuperPath {
    /**
     * Os values are 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'.
     * To overwrite the os value just set one of this os values in
     * the constructor.
     *
     * The os value determines which kind of prefix is used in the paths
     * for marking environment variables. For windows: %HOMEDRIVE%, for unix like: $FOO.
     *
     * @param os
     */
    constructor (os=process.platform) {
        this.os=os;
    }

    /**
     * Dissolves a path from the current process.env state.
     *
     * @param {String} p path as a string
     * @returns {*}
     */
    dissolve(p) {
        let env = process.env;
        return this.dissolveFromEnvironment (p, env);
    }

    /**
     * Dissolves a path from a given environment object.
     *
     * @param {String} p the path as a string
     * @param {Object} e the env as key value object
     * @returns {XML|string|XMLList}
     */
    dissolveFromEnvironment (p, e) {
        let pp = path.normalize(p);

        for(let key in e) {
            let value = e[key];

            let envvar, regex;

            if (this.os==="win32") {
                envvar = `%${key}%`;
                regex = new RegExp(envvar, 'g');
                pp = pp.replace(regex, value);
            } else {
                envvar = `$${key}`;
                pp = replaceAll(pp, envvar, value);
            }
        }

        pp = path.normalize(pp);
        return pp;
    }
}

exports.SuperPath = SuperPath;