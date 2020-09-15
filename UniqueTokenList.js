//#
const uniqueOf = tokens => tokens.length > 1 ? tokens.filter((v, i, m) => i === m.indexOf(v)) : tokens;

//#
class UniqueTokenList {
    #list;
    get value() {return this.#list;}
    set value(tokens) {this.#list =tokens?.length && Array.isArray(tokens) ? uniqueOf(tokens) : null;}
    constructor(...tokens) {
        this.#list = uniqueOf(tokens);
        return this;
    }
    toString = () => {
        const m = this.#list;
        return m?.length ? m.join('\u0020') : '';
    };
    item = index => {
        const m = this.#list,i = 0 + index;
        return m?.length > i ? m[i] : null;
    };
    contains = token => {
        const m = this.#list;
        return m?.length ? -1 !== m.indexOf(token) : false;
    };
    add = (...tokens) => {
        if (tokens.length) {
            const e = uniqueOf(tokens), m = this.#list;
            if (m?.length) {
                const l = e.length;
                for (let j, i = 0; i < l; ++i) {
                    if (-1 !== (j = m.indexOf(e[i]))) {
                        e.splice(j, 1);
                    }
                }
                if (e?.length) {
                    m.push(e);
                }
            } else {
                this.#list = e;
            }
        }
        return this;
    };
    remove = (...tokens) => {
        if (tokens.length) {
            const m = this.#list;
            if (m?.length) {
                for (const token of tokens) {
                    let i;
                    while (-1 !== (i = m.indexOf(token))) {
                        m.splice(i, 1);
                        if (0 === m.length) {
                            return this;
                        }
                    }
                }
            }
        }
        return this;
    };
    replace = (token, substitute, dedupe = false) => {
        const m = this.#list;
        if (m?.length) {
            const e = []; // substituted
            let i;
            while (-1 !== (i = m.indexOf(token))) {
                m[(e[e.length] = i)] = substitute;
            }
            const l = e.length;
            if (l > 0) {
                if (dedupe) {
                    for (i = 1; i < l; ++i) {
                        m.splice(e[i], 1);
                    }
                }
                return true;
            }
        }
        return false;
    };
    toggle = (token, force) => {
        const m = this.#list;
        if (m?.length) {
            const i = m.indexOf(token);
            return -1 !== i ? force? true: (m.splice(i, 1), false) : (m.push(token), true);
        } else {
            this.#list = [token];
            return true;
        }
    };
    flatten = () => {
        const m = this.#list;
        this.#list = m?.length ? uniqueOf(m.flat(Infinity)) : null;
        return this;
    };
}

//export default UniqueTokenList;
