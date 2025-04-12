import Dt, { Menu as Ol, ipcMain as Hr, app as gr, BrowserWindow as Dl } from "electron";
import nt from "node:path";
import { fileURLToPath as oc } from "node:url";
import ut from "fs";
import De from "path";
import vr from "os";
import qt from "crypto";
import sc from "constants";
import Er from "stream";
import Zi from "util";
import Il from "assert";
import jr from "child_process";
import Pl from "events";
import Nl from "tty";
import Mt from "url";
import lc from "string_decoder";
import Fl from "zlib";
import uc from "http";
var Ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, rt = { exports: {} };
const cc = "16.5.0", fc = {
  version: cc
};
var Ra;
function dc() {
  if (Ra) return rt.exports;
  Ra = 1;
  const r = ut, c = De, h = vr, u = qt, s = fc.version, a = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
  function d(I) {
    const R = {};
    let w = I.toString();
    w = w.replace(/\r\n?/mg, `
`);
    let A;
    for (; (A = a.exec(w)) != null; ) {
      const E = A[1];
      let $ = A[2] || "";
      $ = $.trim();
      const F = $[0];
      $ = $.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), F === '"' && ($ = $.replace(/\\n/g, `
`), $ = $.replace(/\\r/g, "\r")), R[E] = $;
    }
    return R;
  }
  function n(I) {
    const R = p(I), w = O.configDotenv({ path: R });
    if (!w.parsed) {
      const F = new Error(`MISSING_DATA: Cannot parse ${R} for an unknown reason`);
      throw F.code = "MISSING_DATA", F;
    }
    const A = o(I).split(","), E = A.length;
    let $;
    for (let F = 0; F < E; F++)
      try {
        const x = A[F].trim(), q = t(w, x);
        $ = O.decrypt(q.ciphertext, q.key);
        break;
      } catch (x) {
        if (F + 1 >= E)
          throw x;
      }
    return O.parse($);
  }
  function l(I) {
    console.log(`[dotenv@${s}][WARN] ${I}`);
  }
  function i(I) {
    console.log(`[dotenv@${s}][DEBUG] ${I}`);
  }
  function o(I) {
    return I && I.DOTENV_KEY && I.DOTENV_KEY.length > 0 ? I.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
  }
  function t(I, R) {
    let w;
    try {
      w = new URL(R);
    } catch (x) {
      if (x.code === "ERR_INVALID_URL") {
        const q = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
        throw q.code = "INVALID_DOTENV_KEY", q;
      }
      throw x;
    }
    const A = w.password;
    if (!A) {
      const x = new Error("INVALID_DOTENV_KEY: Missing key part");
      throw x.code = "INVALID_DOTENV_KEY", x;
    }
    const E = w.searchParams.get("environment");
    if (!E) {
      const x = new Error("INVALID_DOTENV_KEY: Missing environment part");
      throw x.code = "INVALID_DOTENV_KEY", x;
    }
    const $ = `DOTENV_VAULT_${E.toUpperCase()}`, F = I.parsed[$];
    if (!F) {
      const x = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${$} in your .env.vault file.`);
      throw x.code = "NOT_FOUND_DOTENV_ENVIRONMENT", x;
    }
    return { ciphertext: F, key: A };
  }
  function p(I) {
    let R = null;
    if (I && I.path && I.path.length > 0)
      if (Array.isArray(I.path))
        for (const w of I.path)
          r.existsSync(w) && (R = w.endsWith(".vault") ? w : `${w}.vault`);
      else
        R = I.path.endsWith(".vault") ? I.path : `${I.path}.vault`;
    else
      R = c.resolve(process.cwd(), ".env.vault");
    return r.existsSync(R) ? R : null;
  }
  function g(I) {
    return I[0] === "~" ? c.join(h.homedir(), I.slice(1)) : I;
  }
  function y(I) {
    !!(I && I.debug) && i("Loading env from encrypted .env.vault");
    const w = O._parseVault(I);
    let A = process.env;
    return I && I.processEnv != null && (A = I.processEnv), O.populate(A, w, I), { parsed: w };
  }
  function m(I) {
    const R = c.resolve(process.cwd(), ".env");
    let w = "utf8";
    const A = !!(I && I.debug);
    I && I.encoding ? w = I.encoding : A && i("No encoding is specified. UTF-8 is used by default");
    let E = [R];
    if (I && I.path)
      if (!Array.isArray(I.path))
        E = [g(I.path)];
      else {
        E = [];
        for (const q of I.path)
          E.push(g(q));
      }
    let $;
    const F = {};
    for (const q of E)
      try {
        const N = O.parse(r.readFileSync(q, { encoding: w }));
        O.populate(F, N, I);
      } catch (N) {
        A && i(`Failed to load ${q} ${N.message}`), $ = N;
      }
    let x = process.env;
    return I && I.processEnv != null && (x = I.processEnv), O.populate(x, F, I), $ ? { parsed: F, error: $ } : { parsed: F };
  }
  function S(I) {
    if (o(I).length === 0)
      return O.configDotenv(I);
    const R = p(I);
    return R ? O._configVault(I) : (l(`You set DOTENV_KEY but you are missing a .env.vault file at ${R}. Did you forget to build it?`), O.configDotenv(I));
  }
  function C(I, R) {
    const w = Buffer.from(R.slice(-64), "hex");
    let A = Buffer.from(I, "base64");
    const E = A.subarray(0, 12), $ = A.subarray(-16);
    A = A.subarray(12, -16);
    try {
      const F = u.createDecipheriv("aes-256-gcm", w, E);
      return F.setAuthTag($), `${F.update(A)}${F.final()}`;
    } catch (F) {
      const x = F instanceof RangeError, q = F.message === "Invalid key length", N = F.message === "Unsupported state or unable to authenticate data";
      if (x || q) {
        const P = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
        throw P.code = "INVALID_DOTENV_KEY", P;
      } else if (N) {
        const P = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
        throw P.code = "DECRYPTION_FAILED", P;
      } else
        throw F;
    }
  }
  function D(I, R, w = {}) {
    const A = !!(w && w.debug), E = !!(w && w.override);
    if (typeof R != "object") {
      const $ = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
      throw $.code = "OBJECT_REQUIRED", $;
    }
    for (const $ of Object.keys(R))
      Object.prototype.hasOwnProperty.call(I, $) ? (E === !0 && (I[$] = R[$]), A && i(E === !0 ? `"${$}" is already defined and WAS overwritten` : `"${$}" is already defined and was NOT overwritten`)) : I[$] = R[$];
  }
  const O = {
    configDotenv: m,
    _configVault: y,
    _parseVault: n,
    config: S,
    decrypt: C,
    parse: d,
    populate: D
  };
  return rt.exports.configDotenv = O.configDotenv, rt.exports._configVault = O._configVault, rt.exports._parseVault = O._parseVault, rt.exports.config = O.config, rt.exports.decrypt = O.decrypt, rt.exports.parse = O.parse, rt.exports.populate = O.populate, rt.exports = O, rt.exports;
}
var hc = dc(), St = {}, Zr = {}, Or = {}, Ca;
function Ye() {
  return Ca || (Ca = 1, Or.fromCallback = function(r) {
    return Object.defineProperty(function(...c) {
      if (typeof c[c.length - 1] == "function") r.apply(this, c);
      else
        return new Promise((h, u) => {
          c.push((f, s) => f != null ? u(f) : h(s)), r.apply(this, c);
        });
    }, "name", { value: r.name });
  }, Or.fromPromise = function(r) {
    return Object.defineProperty(function(...c) {
      const h = c[c.length - 1];
      if (typeof h != "function") return r.apply(this, c);
      c.pop(), r.apply(this, c).then((u) => h(null, u), h);
    }, "name", { value: r.name });
  }), Or;
}
var en, ba;
function pc() {
  if (ba) return en;
  ba = 1;
  var r = sc, c = process.cwd, h = null, u = process.env.GRACEFUL_FS_PLATFORM || process.platform;
  process.cwd = function() {
    return h || (h = c.call(process)), h;
  };
  try {
    process.cwd();
  } catch {
  }
  if (typeof process.chdir == "function") {
    var f = process.chdir;
    process.chdir = function(a) {
      h = null, f.call(process, a);
    }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, f);
  }
  en = s;
  function s(a) {
    r.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && d(a), a.lutimes || n(a), a.chown = o(a.chown), a.fchown = o(a.fchown), a.lchown = o(a.lchown), a.chmod = l(a.chmod), a.fchmod = l(a.fchmod), a.lchmod = l(a.lchmod), a.chownSync = t(a.chownSync), a.fchownSync = t(a.fchownSync), a.lchownSync = t(a.lchownSync), a.chmodSync = i(a.chmodSync), a.fchmodSync = i(a.fchmodSync), a.lchmodSync = i(a.lchmodSync), a.stat = p(a.stat), a.fstat = p(a.fstat), a.lstat = p(a.lstat), a.statSync = g(a.statSync), a.fstatSync = g(a.fstatSync), a.lstatSync = g(a.lstatSync), a.chmod && !a.lchmod && (a.lchmod = function(m, S, C) {
      C && process.nextTick(C);
    }, a.lchmodSync = function() {
    }), a.chown && !a.lchown && (a.lchown = function(m, S, C, D) {
      D && process.nextTick(D);
    }, a.lchownSync = function() {
    }), u === "win32" && (a.rename = typeof a.rename != "function" ? a.rename : function(m) {
      function S(C, D, O) {
        var I = Date.now(), R = 0;
        m(C, D, function w(A) {
          if (A && (A.code === "EACCES" || A.code === "EPERM" || A.code === "EBUSY") && Date.now() - I < 6e4) {
            setTimeout(function() {
              a.stat(D, function(E, $) {
                E && E.code === "ENOENT" ? m(C, D, w) : O(A);
              });
            }, R), R < 100 && (R += 10);
            return;
          }
          O && O(A);
        });
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(S, m), S;
    }(a.rename)), a.read = typeof a.read != "function" ? a.read : function(m) {
      function S(C, D, O, I, R, w) {
        var A;
        if (w && typeof w == "function") {
          var E = 0;
          A = function($, F, x) {
            if ($ && $.code === "EAGAIN" && E < 10)
              return E++, m.call(a, C, D, O, I, R, A);
            w.apply(this, arguments);
          };
        }
        return m.call(a, C, D, O, I, R, A);
      }
      return Object.setPrototypeOf && Object.setPrototypeOf(S, m), S;
    }(a.read), a.readSync = typeof a.readSync != "function" ? a.readSync : /* @__PURE__ */ function(m) {
      return function(S, C, D, O, I) {
        for (var R = 0; ; )
          try {
            return m.call(a, S, C, D, O, I);
          } catch (w) {
            if (w.code === "EAGAIN" && R < 10) {
              R++;
              continue;
            }
            throw w;
          }
      };
    }(a.readSync);
    function d(m) {
      m.lchmod = function(S, C, D) {
        m.open(
          S,
          r.O_WRONLY | r.O_SYMLINK,
          C,
          function(O, I) {
            if (O) {
              D && D(O);
              return;
            }
            m.fchmod(I, C, function(R) {
              m.close(I, function(w) {
                D && D(R || w);
              });
            });
          }
        );
      }, m.lchmodSync = function(S, C) {
        var D = m.openSync(S, r.O_WRONLY | r.O_SYMLINK, C), O = !0, I;
        try {
          I = m.fchmodSync(D, C), O = !1;
        } finally {
          if (O)
            try {
              m.closeSync(D);
            } catch {
            }
          else
            m.closeSync(D);
        }
        return I;
      };
    }
    function n(m) {
      r.hasOwnProperty("O_SYMLINK") && m.futimes ? (m.lutimes = function(S, C, D, O) {
        m.open(S, r.O_SYMLINK, function(I, R) {
          if (I) {
            O && O(I);
            return;
          }
          m.futimes(R, C, D, function(w) {
            m.close(R, function(A) {
              O && O(w || A);
            });
          });
        });
      }, m.lutimesSync = function(S, C, D) {
        var O = m.openSync(S, r.O_SYMLINK), I, R = !0;
        try {
          I = m.futimesSync(O, C, D), R = !1;
        } finally {
          if (R)
            try {
              m.closeSync(O);
            } catch {
            }
          else
            m.closeSync(O);
        }
        return I;
      }) : m.futimes && (m.lutimes = function(S, C, D, O) {
        O && process.nextTick(O);
      }, m.lutimesSync = function() {
      });
    }
    function l(m) {
      return m && function(S, C, D) {
        return m.call(a, S, C, function(O) {
          y(O) && (O = null), D && D.apply(this, arguments);
        });
      };
    }
    function i(m) {
      return m && function(S, C) {
        try {
          return m.call(a, S, C);
        } catch (D) {
          if (!y(D)) throw D;
        }
      };
    }
    function o(m) {
      return m && function(S, C, D, O) {
        return m.call(a, S, C, D, function(I) {
          y(I) && (I = null), O && O.apply(this, arguments);
        });
      };
    }
    function t(m) {
      return m && function(S, C, D) {
        try {
          return m.call(a, S, C, D);
        } catch (O) {
          if (!y(O)) throw O;
        }
      };
    }
    function p(m) {
      return m && function(S, C, D) {
        typeof C == "function" && (D = C, C = null);
        function O(I, R) {
          R && (R.uid < 0 && (R.uid += 4294967296), R.gid < 0 && (R.gid += 4294967296)), D && D.apply(this, arguments);
        }
        return C ? m.call(a, S, C, O) : m.call(a, S, O);
      };
    }
    function g(m) {
      return m && function(S, C) {
        var D = C ? m.call(a, S, C) : m.call(a, S);
        return D && (D.uid < 0 && (D.uid += 4294967296), D.gid < 0 && (D.gid += 4294967296)), D;
      };
    }
    function y(m) {
      if (!m || m.code === "ENOSYS")
        return !0;
      var S = !process.getuid || process.getuid() !== 0;
      return !!(S && (m.code === "EINVAL" || m.code === "EPERM"));
    }
  }
  return en;
}
var tn, Oa;
function mc() {
  if (Oa) return tn;
  Oa = 1;
  var r = Er.Stream;
  tn = c;
  function c(h) {
    return {
      ReadStream: u,
      WriteStream: f
    };
    function u(s, a) {
      if (!(this instanceof u)) return new u(s, a);
      r.call(this);
      var d = this;
      this.path = s, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, a = a || {};
      for (var n = Object.keys(a), l = 0, i = n.length; l < i; l++) {
        var o = n[l];
        this[o] = a[o];
      }
      if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.end === void 0)
          this.end = 1 / 0;
        else if (typeof this.end != "number")
          throw TypeError("end must be a Number");
        if (this.start > this.end)
          throw new Error("start must be <= end");
        this.pos = this.start;
      }
      if (this.fd !== null) {
        process.nextTick(function() {
          d._read();
        });
        return;
      }
      h.open(this.path, this.flags, this.mode, function(t, p) {
        if (t) {
          d.emit("error", t), d.readable = !1;
          return;
        }
        d.fd = p, d.emit("open", p), d._read();
      });
    }
    function f(s, a) {
      if (!(this instanceof f)) return new f(s, a);
      r.call(this), this.path = s, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, a = a || {};
      for (var d = Object.keys(a), n = 0, l = d.length; n < l; n++) {
        var i = d[n];
        this[i] = a[i];
      }
      if (this.start !== void 0) {
        if (typeof this.start != "number")
          throw TypeError("start must be a Number");
        if (this.start < 0)
          throw new Error("start must be >= zero");
        this.pos = this.start;
      }
      this.busy = !1, this._queue = [], this.fd === null && (this._open = h.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
    }
  }
  return tn;
}
var rn, Da;
function gc() {
  if (Da) return rn;
  Da = 1, rn = c;
  var r = Object.getPrototypeOf || function(h) {
    return h.__proto__;
  };
  function c(h) {
    if (h === null || typeof h != "object")
      return h;
    if (h instanceof Object)
      var u = { __proto__: r(h) };
    else
      var u = /* @__PURE__ */ Object.create(null);
    return Object.getOwnPropertyNames(h).forEach(function(f) {
      Object.defineProperty(u, f, Object.getOwnPropertyDescriptor(h, f));
    }), u;
  }
  return rn;
}
var Dr, Ia;
function Ve() {
  if (Ia) return Dr;
  Ia = 1;
  var r = ut, c = pc(), h = mc(), u = gc(), f = Zi, s, a;
  typeof Symbol == "function" && typeof Symbol.for == "function" ? (s = Symbol.for("graceful-fs.queue"), a = Symbol.for("graceful-fs.previous")) : (s = "___graceful-fs.queue", a = "___graceful-fs.previous");
  function d() {
  }
  function n(m, S) {
    Object.defineProperty(m, s, {
      get: function() {
        return S;
      }
    });
  }
  var l = d;
  if (f.debuglog ? l = f.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (l = function() {
    var m = f.format.apply(f, arguments);
    m = "GFS4: " + m.split(/\n/).join(`
GFS4: `), console.error(m);
  }), !r[s]) {
    var i = Ze[s] || [];
    n(r, i), r.close = function(m) {
      function S(C, D) {
        return m.call(r, C, function(O) {
          O || g(), typeof D == "function" && D.apply(this, arguments);
        });
      }
      return Object.defineProperty(S, a, {
        value: m
      }), S;
    }(r.close), r.closeSync = function(m) {
      function S(C) {
        m.apply(r, arguments), g();
      }
      return Object.defineProperty(S, a, {
        value: m
      }), S;
    }(r.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
      l(r[s]), Il.equal(r[s].length, 0);
    });
  }
  Ze[s] || n(Ze, r[s]), Dr = o(u(r)), process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !r.__patched && (Dr = o(r), r.__patched = !0);
  function o(m) {
    c(m), m.gracefulify = o, m.createReadStream = ce, m.createWriteStream = ue;
    var S = m.readFile;
    m.readFile = C;
    function C(K, Ee, T) {
      return typeof Ee == "function" && (T = Ee, Ee = null), v(K, Ee, T);
      function v(H, L, le, me) {
        return S(H, L, function(pe) {
          pe && (pe.code === "EMFILE" || pe.code === "ENFILE") ? t([v, [H, L, le], pe, me || Date.now(), Date.now()]) : typeof le == "function" && le.apply(this, arguments);
        });
      }
    }
    var D = m.writeFile;
    m.writeFile = O;
    function O(K, Ee, T, v) {
      return typeof T == "function" && (v = T, T = null), H(K, Ee, T, v);
      function H(L, le, me, pe, _e) {
        return D(L, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? t([H, [L, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var I = m.appendFile;
    I && (m.appendFile = R);
    function R(K, Ee, T, v) {
      return typeof T == "function" && (v = T, T = null), H(K, Ee, T, v);
      function H(L, le, me, pe, _e) {
        return I(L, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? t([H, [L, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var w = m.copyFile;
    w && (m.copyFile = A);
    function A(K, Ee, T, v) {
      return typeof T == "function" && (v = T, T = 0), H(K, Ee, T, v);
      function H(L, le, me, pe, _e) {
        return w(L, le, me, function(ye) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? t([H, [L, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    var E = m.readdir;
    m.readdir = F;
    var $ = /^v[0-5]\./;
    function F(K, Ee, T) {
      typeof Ee == "function" && (T = Ee, Ee = null);
      var v = $.test(process.version) ? function(le, me, pe, _e) {
        return E(le, H(
          le,
          me,
          pe,
          _e
        ));
      } : function(le, me, pe, _e) {
        return E(le, me, H(
          le,
          me,
          pe,
          _e
        ));
      };
      return v(K, Ee, T);
      function H(L, le, me, pe) {
        return function(_e, ye) {
          _e && (_e.code === "EMFILE" || _e.code === "ENFILE") ? t([
            v,
            [L, le, me],
            _e,
            pe || Date.now(),
            Date.now()
          ]) : (ye && ye.sort && ye.sort(), typeof me == "function" && me.call(this, _e, ye));
        };
      }
    }
    if (process.version.substr(0, 4) === "v0.8") {
      var x = h(m);
      M = x.ReadStream, V = x.WriteStream;
    }
    var q = m.ReadStream;
    q && (M.prototype = Object.create(q.prototype), M.prototype.open = J);
    var N = m.WriteStream;
    N && (V.prototype = Object.create(N.prototype), V.prototype.open = ne), Object.defineProperty(m, "ReadStream", {
      get: function() {
        return M;
      },
      set: function(K) {
        M = K;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(m, "WriteStream", {
      get: function() {
        return V;
      },
      set: function(K) {
        V = K;
      },
      enumerable: !0,
      configurable: !0
    });
    var P = M;
    Object.defineProperty(m, "FileReadStream", {
      get: function() {
        return P;
      },
      set: function(K) {
        P = K;
      },
      enumerable: !0,
      configurable: !0
    });
    var U = V;
    Object.defineProperty(m, "FileWriteStream", {
      get: function() {
        return U;
      },
      set: function(K) {
        U = K;
      },
      enumerable: !0,
      configurable: !0
    });
    function M(K, Ee) {
      return this instanceof M ? (q.apply(this, arguments), this) : M.apply(Object.create(M.prototype), arguments);
    }
    function J() {
      var K = this;
      Se(K.path, K.flags, K.mode, function(Ee, T) {
        Ee ? (K.autoClose && K.destroy(), K.emit("error", Ee)) : (K.fd = T, K.emit("open", T), K.read());
      });
    }
    function V(K, Ee) {
      return this instanceof V ? (N.apply(this, arguments), this) : V.apply(Object.create(V.prototype), arguments);
    }
    function ne() {
      var K = this;
      Se(K.path, K.flags, K.mode, function(Ee, T) {
        Ee ? (K.destroy(), K.emit("error", Ee)) : (K.fd = T, K.emit("open", T));
      });
    }
    function ce(K, Ee) {
      return new m.ReadStream(K, Ee);
    }
    function ue(K, Ee) {
      return new m.WriteStream(K, Ee);
    }
    var ie = m.open;
    m.open = Se;
    function Se(K, Ee, T, v) {
      return typeof T == "function" && (v = T, T = null), H(K, Ee, T, v);
      function H(L, le, me, pe, _e) {
        return ie(L, le, me, function(ye, xe) {
          ye && (ye.code === "EMFILE" || ye.code === "ENFILE") ? t([H, [L, le, me, pe], ye, _e || Date.now(), Date.now()]) : typeof pe == "function" && pe.apply(this, arguments);
        });
      }
    }
    return m;
  }
  function t(m) {
    l("ENQUEUE", m[0].name, m[1]), r[s].push(m), y();
  }
  var p;
  function g() {
    for (var m = Date.now(), S = 0; S < r[s].length; ++S)
      r[s][S].length > 2 && (r[s][S][3] = m, r[s][S][4] = m);
    y();
  }
  function y() {
    if (clearTimeout(p), p = void 0, r[s].length !== 0) {
      var m = r[s].shift(), S = m[0], C = m[1], D = m[2], O = m[3], I = m[4];
      if (O === void 0)
        l("RETRY", S.name, C), S.apply(null, C);
      else if (Date.now() - O >= 6e4) {
        l("TIMEOUT", S.name, C);
        var R = C.pop();
        typeof R == "function" && R.call(null, D);
      } else {
        var w = Date.now() - I, A = Math.max(I - O, 1), E = Math.min(A * 1.2, 100);
        w >= E ? (l("RETRY", S.name, C), S.apply(null, C.concat([O]))) : r[s].push(m);
      }
      p === void 0 && (p = setTimeout(y, 0));
    }
  }
  return Dr;
}
var Pa;
function Bt() {
  return Pa || (Pa = 1, function(r) {
    const c = Ye().fromCallback, h = Ve(), u = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "lchmod",
      "lchown",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((f) => typeof h[f] == "function");
    Object.assign(r, h), u.forEach((f) => {
      r[f] = c(h[f]);
    }), r.exists = function(f, s) {
      return typeof s == "function" ? h.exists(f, s) : new Promise((a) => h.exists(f, a));
    }, r.read = function(f, s, a, d, n, l) {
      return typeof l == "function" ? h.read(f, s, a, d, n, l) : new Promise((i, o) => {
        h.read(f, s, a, d, n, (t, p, g) => {
          if (t) return o(t);
          i({ bytesRead: p, buffer: g });
        });
      });
    }, r.write = function(f, s, ...a) {
      return typeof a[a.length - 1] == "function" ? h.write(f, s, ...a) : new Promise((d, n) => {
        h.write(f, s, ...a, (l, i, o) => {
          if (l) return n(l);
          d({ bytesWritten: i, buffer: o });
        });
      });
    }, typeof h.writev == "function" && (r.writev = function(f, s, ...a) {
      return typeof a[a.length - 1] == "function" ? h.writev(f, s, ...a) : new Promise((d, n) => {
        h.writev(f, s, ...a, (l, i, o) => {
          if (l) return n(l);
          d({ bytesWritten: i, buffers: o });
        });
      });
    }), typeof h.realpath.native == "function" ? r.realpath.native = c(h.realpath.native) : process.emitWarning(
      "fs.realpath.native is not a function. Is fs being monkey-patched?",
      "Warning",
      "fs-extra-WARN0003"
    );
  }(Zr)), Zr;
}
var Ir = {}, nn = {}, Na;
function vc() {
  if (Na) return nn;
  Na = 1;
  const r = De;
  return nn.checkPath = function(h) {
    if (process.platform === "win32" && /[<>:"|?*]/.test(h.replace(r.parse(h).root, ""))) {
      const f = new Error(`Path contains invalid characters: ${h}`);
      throw f.code = "EINVAL", f;
    }
  }, nn;
}
var Fa;
function Ec() {
  if (Fa) return Ir;
  Fa = 1;
  const r = /* @__PURE__ */ Bt(), { checkPath: c } = /* @__PURE__ */ vc(), h = (u) => {
    const f = { mode: 511 };
    return typeof u == "number" ? u : { ...f, ...u }.mode;
  };
  return Ir.makeDir = async (u, f) => (c(u), r.mkdir(u, {
    mode: h(f),
    recursive: !0
  })), Ir.makeDirSync = (u, f) => (c(u), r.mkdirSync(u, {
    mode: h(f),
    recursive: !0
  })), Ir;
}
var an, xa;
function it() {
  if (xa) return an;
  xa = 1;
  const r = Ye().fromPromise, { makeDir: c, makeDirSync: h } = /* @__PURE__ */ Ec(), u = r(c);
  return an = {
    mkdirs: u,
    mkdirsSync: h,
    // alias
    mkdirp: u,
    mkdirpSync: h,
    ensureDir: u,
    ensureDirSync: h
  }, an;
}
var on, La;
function It() {
  if (La) return on;
  La = 1;
  const r = Ye().fromPromise, c = /* @__PURE__ */ Bt();
  function h(u) {
    return c.access(u).then(() => !0).catch(() => !1);
  }
  return on = {
    pathExists: r(h),
    pathExistsSync: c.existsSync
  }, on;
}
var sn, Ua;
function xl() {
  if (Ua) return sn;
  Ua = 1;
  const r = Ve();
  function c(u, f, s, a) {
    r.open(u, "r+", (d, n) => {
      if (d) return a(d);
      r.futimes(n, f, s, (l) => {
        r.close(n, (i) => {
          a && a(l || i);
        });
      });
    });
  }
  function h(u, f, s) {
    const a = r.openSync(u, "r+");
    return r.futimesSync(a, f, s), r.closeSync(a);
  }
  return sn = {
    utimesMillis: c,
    utimesMillisSync: h
  }, sn;
}
var ln, $a;
function Ht() {
  if ($a) return ln;
  $a = 1;
  const r = /* @__PURE__ */ Bt(), c = De, h = Zi;
  function u(t, p, g) {
    const y = g.dereference ? (m) => r.stat(m, { bigint: !0 }) : (m) => r.lstat(m, { bigint: !0 });
    return Promise.all([
      y(t),
      y(p).catch((m) => {
        if (m.code === "ENOENT") return null;
        throw m;
      })
    ]).then(([m, S]) => ({ srcStat: m, destStat: S }));
  }
  function f(t, p, g) {
    let y;
    const m = g.dereference ? (C) => r.statSync(C, { bigint: !0 }) : (C) => r.lstatSync(C, { bigint: !0 }), S = m(t);
    try {
      y = m(p);
    } catch (C) {
      if (C.code === "ENOENT") return { srcStat: S, destStat: null };
      throw C;
    }
    return { srcStat: S, destStat: y };
  }
  function s(t, p, g, y, m) {
    h.callbackify(u)(t, p, y, (S, C) => {
      if (S) return m(S);
      const { srcStat: D, destStat: O } = C;
      if (O) {
        if (l(D, O)) {
          const I = c.basename(t), R = c.basename(p);
          return g === "move" && I !== R && I.toLowerCase() === R.toLowerCase() ? m(null, { srcStat: D, destStat: O, isChangingCase: !0 }) : m(new Error("Source and destination must not be the same."));
        }
        if (D.isDirectory() && !O.isDirectory())
          return m(new Error(`Cannot overwrite non-directory '${p}' with directory '${t}'.`));
        if (!D.isDirectory() && O.isDirectory())
          return m(new Error(`Cannot overwrite directory '${p}' with non-directory '${t}'.`));
      }
      return D.isDirectory() && i(t, p) ? m(new Error(o(t, p, g))) : m(null, { srcStat: D, destStat: O });
    });
  }
  function a(t, p, g, y) {
    const { srcStat: m, destStat: S } = f(t, p, y);
    if (S) {
      if (l(m, S)) {
        const C = c.basename(t), D = c.basename(p);
        if (g === "move" && C !== D && C.toLowerCase() === D.toLowerCase())
          return { srcStat: m, destStat: S, isChangingCase: !0 };
        throw new Error("Source and destination must not be the same.");
      }
      if (m.isDirectory() && !S.isDirectory())
        throw new Error(`Cannot overwrite non-directory '${p}' with directory '${t}'.`);
      if (!m.isDirectory() && S.isDirectory())
        throw new Error(`Cannot overwrite directory '${p}' with non-directory '${t}'.`);
    }
    if (m.isDirectory() && i(t, p))
      throw new Error(o(t, p, g));
    return { srcStat: m, destStat: S };
  }
  function d(t, p, g, y, m) {
    const S = c.resolve(c.dirname(t)), C = c.resolve(c.dirname(g));
    if (C === S || C === c.parse(C).root) return m();
    r.stat(C, { bigint: !0 }, (D, O) => D ? D.code === "ENOENT" ? m() : m(D) : l(p, O) ? m(new Error(o(t, g, y))) : d(t, p, C, y, m));
  }
  function n(t, p, g, y) {
    const m = c.resolve(c.dirname(t)), S = c.resolve(c.dirname(g));
    if (S === m || S === c.parse(S).root) return;
    let C;
    try {
      C = r.statSync(S, { bigint: !0 });
    } catch (D) {
      if (D.code === "ENOENT") return;
      throw D;
    }
    if (l(p, C))
      throw new Error(o(t, g, y));
    return n(t, p, S, y);
  }
  function l(t, p) {
    return p.ino && p.dev && p.ino === t.ino && p.dev === t.dev;
  }
  function i(t, p) {
    const g = c.resolve(t).split(c.sep).filter((m) => m), y = c.resolve(p).split(c.sep).filter((m) => m);
    return g.reduce((m, S, C) => m && y[C] === S, !0);
  }
  function o(t, p, g) {
    return `Cannot ${g} '${t}' to a subdirectory of itself, '${p}'.`;
  }
  return ln = {
    checkPaths: s,
    checkPathsSync: a,
    checkParentPaths: d,
    checkParentPathsSync: n,
    isSrcSubdir: i,
    areIdentical: l
  }, ln;
}
var un, ka;
function yc() {
  if (ka) return un;
  ka = 1;
  const r = Ve(), c = De, h = it().mkdirs, u = It().pathExists, f = xl().utimesMillis, s = /* @__PURE__ */ Ht();
  function a(F, x, q, N) {
    typeof q == "function" && !N ? (N = q, q = {}) : typeof q == "function" && (q = { filter: q }), N = N || function() {
    }, q = q || {}, q.clobber = "clobber" in q ? !!q.clobber : !0, q.overwrite = "overwrite" in q ? !!q.overwrite : q.clobber, q.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0001"
    ), s.checkPaths(F, x, "copy", q, (P, U) => {
      if (P) return N(P);
      const { srcStat: M, destStat: J } = U;
      s.checkParentPaths(F, M, x, "copy", (V) => V ? N(V) : q.filter ? n(d, J, F, x, q, N) : d(J, F, x, q, N));
    });
  }
  function d(F, x, q, N, P) {
    const U = c.dirname(q);
    u(U, (M, J) => {
      if (M) return P(M);
      if (J) return i(F, x, q, N, P);
      h(U, (V) => V ? P(V) : i(F, x, q, N, P));
    });
  }
  function n(F, x, q, N, P, U) {
    Promise.resolve(P.filter(q, N)).then((M) => M ? F(x, q, N, P, U) : U(), (M) => U(M));
  }
  function l(F, x, q, N, P) {
    return N.filter ? n(i, F, x, q, N, P) : i(F, x, q, N, P);
  }
  function i(F, x, q, N, P) {
    (N.dereference ? r.stat : r.lstat)(x, (M, J) => M ? P(M) : J.isDirectory() ? O(J, F, x, q, N, P) : J.isFile() || J.isCharacterDevice() || J.isBlockDevice() ? o(J, F, x, q, N, P) : J.isSymbolicLink() ? E(F, x, q, N, P) : J.isSocket() ? P(new Error(`Cannot copy a socket file: ${x}`)) : J.isFIFO() ? P(new Error(`Cannot copy a FIFO pipe: ${x}`)) : P(new Error(`Unknown file: ${x}`)));
  }
  function o(F, x, q, N, P, U) {
    return x ? t(F, q, N, P, U) : p(F, q, N, P, U);
  }
  function t(F, x, q, N, P) {
    if (N.overwrite)
      r.unlink(q, (U) => U ? P(U) : p(F, x, q, N, P));
    else return N.errorOnExist ? P(new Error(`'${q}' already exists`)) : P();
  }
  function p(F, x, q, N, P) {
    r.copyFile(x, q, (U) => U ? P(U) : N.preserveTimestamps ? g(F.mode, x, q, P) : C(q, F.mode, P));
  }
  function g(F, x, q, N) {
    return y(F) ? m(q, F, (P) => P ? N(P) : S(F, x, q, N)) : S(F, x, q, N);
  }
  function y(F) {
    return (F & 128) === 0;
  }
  function m(F, x, q) {
    return C(F, x | 128, q);
  }
  function S(F, x, q, N) {
    D(x, q, (P) => P ? N(P) : C(q, F, N));
  }
  function C(F, x, q) {
    return r.chmod(F, x, q);
  }
  function D(F, x, q) {
    r.stat(F, (N, P) => N ? q(N) : f(x, P.atime, P.mtime, q));
  }
  function O(F, x, q, N, P, U) {
    return x ? R(q, N, P, U) : I(F.mode, q, N, P, U);
  }
  function I(F, x, q, N, P) {
    r.mkdir(q, (U) => {
      if (U) return P(U);
      R(x, q, N, (M) => M ? P(M) : C(q, F, P));
    });
  }
  function R(F, x, q, N) {
    r.readdir(F, (P, U) => P ? N(P) : w(U, F, x, q, N));
  }
  function w(F, x, q, N, P) {
    const U = F.pop();
    return U ? A(F, U, x, q, N, P) : P();
  }
  function A(F, x, q, N, P, U) {
    const M = c.join(q, x), J = c.join(N, x);
    s.checkPaths(M, J, "copy", P, (V, ne) => {
      if (V) return U(V);
      const { destStat: ce } = ne;
      l(ce, M, J, P, (ue) => ue ? U(ue) : w(F, q, N, P, U));
    });
  }
  function E(F, x, q, N, P) {
    r.readlink(x, (U, M) => {
      if (U) return P(U);
      if (N.dereference && (M = c.resolve(process.cwd(), M)), F)
        r.readlink(q, (J, V) => J ? J.code === "EINVAL" || J.code === "UNKNOWN" ? r.symlink(M, q, P) : P(J) : (N.dereference && (V = c.resolve(process.cwd(), V)), s.isSrcSubdir(M, V) ? P(new Error(`Cannot copy '${M}' to a subdirectory of itself, '${V}'.`)) : F.isDirectory() && s.isSrcSubdir(V, M) ? P(new Error(`Cannot overwrite '${V}' with '${M}'.`)) : $(M, q, P)));
      else
        return r.symlink(M, q, P);
    });
  }
  function $(F, x, q) {
    r.unlink(x, (N) => N ? q(N) : r.symlink(F, x, q));
  }
  return un = a, un;
}
var cn, qa;
function wc() {
  if (qa) return cn;
  qa = 1;
  const r = Ve(), c = De, h = it().mkdirsSync, u = xl().utimesMillisSync, f = /* @__PURE__ */ Ht();
  function s(w, A, E) {
    typeof E == "function" && (E = { filter: E }), E = E || {}, E.clobber = "clobber" in E ? !!E.clobber : !0, E.overwrite = "overwrite" in E ? !!E.overwrite : E.clobber, E.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
      `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
      "Warning",
      "fs-extra-WARN0002"
    );
    const { srcStat: $, destStat: F } = f.checkPathsSync(w, A, "copy", E);
    return f.checkParentPathsSync(w, $, A, "copy"), a(F, w, A, E);
  }
  function a(w, A, E, $) {
    if ($.filter && !$.filter(A, E)) return;
    const F = c.dirname(E);
    return r.existsSync(F) || h(F), n(w, A, E, $);
  }
  function d(w, A, E, $) {
    if (!($.filter && !$.filter(A, E)))
      return n(w, A, E, $);
  }
  function n(w, A, E, $) {
    const x = ($.dereference ? r.statSync : r.lstatSync)(A);
    if (x.isDirectory()) return S(x, w, A, E, $);
    if (x.isFile() || x.isCharacterDevice() || x.isBlockDevice()) return l(x, w, A, E, $);
    if (x.isSymbolicLink()) return I(w, A, E, $);
    throw x.isSocket() ? new Error(`Cannot copy a socket file: ${A}`) : x.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${A}`) : new Error(`Unknown file: ${A}`);
  }
  function l(w, A, E, $, F) {
    return A ? i(w, E, $, F) : o(w, E, $, F);
  }
  function i(w, A, E, $) {
    if ($.overwrite)
      return r.unlinkSync(E), o(w, A, E, $);
    if ($.errorOnExist)
      throw new Error(`'${E}' already exists`);
  }
  function o(w, A, E, $) {
    return r.copyFileSync(A, E), $.preserveTimestamps && t(w.mode, A, E), y(E, w.mode);
  }
  function t(w, A, E) {
    return p(w) && g(E, w), m(A, E);
  }
  function p(w) {
    return (w & 128) === 0;
  }
  function g(w, A) {
    return y(w, A | 128);
  }
  function y(w, A) {
    return r.chmodSync(w, A);
  }
  function m(w, A) {
    const E = r.statSync(w);
    return u(A, E.atime, E.mtime);
  }
  function S(w, A, E, $, F) {
    return A ? D(E, $, F) : C(w.mode, E, $, F);
  }
  function C(w, A, E, $) {
    return r.mkdirSync(E), D(A, E, $), y(E, w);
  }
  function D(w, A, E) {
    r.readdirSync(w).forEach(($) => O($, w, A, E));
  }
  function O(w, A, E, $) {
    const F = c.join(A, w), x = c.join(E, w), { destStat: q } = f.checkPathsSync(F, x, "copy", $);
    return d(q, F, x, $);
  }
  function I(w, A, E, $) {
    let F = r.readlinkSync(A);
    if ($.dereference && (F = c.resolve(process.cwd(), F)), w) {
      let x;
      try {
        x = r.readlinkSync(E);
      } catch (q) {
        if (q.code === "EINVAL" || q.code === "UNKNOWN") return r.symlinkSync(F, E);
        throw q;
      }
      if ($.dereference && (x = c.resolve(process.cwd(), x)), f.isSrcSubdir(F, x))
        throw new Error(`Cannot copy '${F}' to a subdirectory of itself, '${x}'.`);
      if (r.statSync(E).isDirectory() && f.isSrcSubdir(x, F))
        throw new Error(`Cannot overwrite '${x}' with '${F}'.`);
      return R(F, E);
    } else
      return r.symlinkSync(F, E);
  }
  function R(w, A) {
    return r.unlinkSync(A), r.symlinkSync(w, A);
  }
  return cn = s, cn;
}
var fn, Ma;
function ea() {
  if (Ma) return fn;
  Ma = 1;
  const r = Ye().fromCallback;
  return fn = {
    copy: r(/* @__PURE__ */ yc()),
    copySync: /* @__PURE__ */ wc()
  }, fn;
}
var dn, Ba;
function _c() {
  if (Ba) return dn;
  Ba = 1;
  const r = Ve(), c = De, h = Il, u = process.platform === "win32";
  function f(g) {
    [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ].forEach((m) => {
      g[m] = g[m] || r[m], m = m + "Sync", g[m] = g[m] || r[m];
    }), g.maxBusyTries = g.maxBusyTries || 3;
  }
  function s(g, y, m) {
    let S = 0;
    typeof y == "function" && (m = y, y = {}), h(g, "rimraf: missing path"), h.strictEqual(typeof g, "string", "rimraf: path should be a string"), h.strictEqual(typeof m, "function", "rimraf: callback function required"), h(y, "rimraf: invalid options argument provided"), h.strictEqual(typeof y, "object", "rimraf: options should be object"), f(y), a(g, y, function C(D) {
      if (D) {
        if ((D.code === "EBUSY" || D.code === "ENOTEMPTY" || D.code === "EPERM") && S < y.maxBusyTries) {
          S++;
          const O = S * 100;
          return setTimeout(() => a(g, y, C), O);
        }
        D.code === "ENOENT" && (D = null);
      }
      m(D);
    });
  }
  function a(g, y, m) {
    h(g), h(y), h(typeof m == "function"), y.lstat(g, (S, C) => {
      if (S && S.code === "ENOENT")
        return m(null);
      if (S && S.code === "EPERM" && u)
        return d(g, y, S, m);
      if (C && C.isDirectory())
        return l(g, y, S, m);
      y.unlink(g, (D) => {
        if (D) {
          if (D.code === "ENOENT")
            return m(null);
          if (D.code === "EPERM")
            return u ? d(g, y, D, m) : l(g, y, D, m);
          if (D.code === "EISDIR")
            return l(g, y, D, m);
        }
        return m(D);
      });
    });
  }
  function d(g, y, m, S) {
    h(g), h(y), h(typeof S == "function"), y.chmod(g, 438, (C) => {
      C ? S(C.code === "ENOENT" ? null : m) : y.stat(g, (D, O) => {
        D ? S(D.code === "ENOENT" ? null : m) : O.isDirectory() ? l(g, y, m, S) : y.unlink(g, S);
      });
    });
  }
  function n(g, y, m) {
    let S;
    h(g), h(y);
    try {
      y.chmodSync(g, 438);
    } catch (C) {
      if (C.code === "ENOENT")
        return;
      throw m;
    }
    try {
      S = y.statSync(g);
    } catch (C) {
      if (C.code === "ENOENT")
        return;
      throw m;
    }
    S.isDirectory() ? t(g, y, m) : y.unlinkSync(g);
  }
  function l(g, y, m, S) {
    h(g), h(y), h(typeof S == "function"), y.rmdir(g, (C) => {
      C && (C.code === "ENOTEMPTY" || C.code === "EEXIST" || C.code === "EPERM") ? i(g, y, S) : C && C.code === "ENOTDIR" ? S(m) : S(C);
    });
  }
  function i(g, y, m) {
    h(g), h(y), h(typeof m == "function"), y.readdir(g, (S, C) => {
      if (S) return m(S);
      let D = C.length, O;
      if (D === 0) return y.rmdir(g, m);
      C.forEach((I) => {
        s(c.join(g, I), y, (R) => {
          if (!O) {
            if (R) return m(O = R);
            --D === 0 && y.rmdir(g, m);
          }
        });
      });
    });
  }
  function o(g, y) {
    let m;
    y = y || {}, f(y), h(g, "rimraf: missing path"), h.strictEqual(typeof g, "string", "rimraf: path should be a string"), h(y, "rimraf: missing options"), h.strictEqual(typeof y, "object", "rimraf: options should be object");
    try {
      m = y.lstatSync(g);
    } catch (S) {
      if (S.code === "ENOENT")
        return;
      S.code === "EPERM" && u && n(g, y, S);
    }
    try {
      m && m.isDirectory() ? t(g, y, null) : y.unlinkSync(g);
    } catch (S) {
      if (S.code === "ENOENT")
        return;
      if (S.code === "EPERM")
        return u ? n(g, y, S) : t(g, y, S);
      if (S.code !== "EISDIR")
        throw S;
      t(g, y, S);
    }
  }
  function t(g, y, m) {
    h(g), h(y);
    try {
      y.rmdirSync(g);
    } catch (S) {
      if (S.code === "ENOTDIR")
        throw m;
      if (S.code === "ENOTEMPTY" || S.code === "EEXIST" || S.code === "EPERM")
        p(g, y);
      else if (S.code !== "ENOENT")
        throw S;
    }
  }
  function p(g, y) {
    if (h(g), h(y), y.readdirSync(g).forEach((m) => o(c.join(g, m), y)), u) {
      const m = Date.now();
      do
        try {
          return y.rmdirSync(g, y);
        } catch {
        }
      while (Date.now() - m < 500);
    } else
      return y.rmdirSync(g, y);
  }
  return dn = s, s.sync = o, dn;
}
var hn, Ha;
function Gr() {
  if (Ha) return hn;
  Ha = 1;
  const r = Ve(), c = Ye().fromCallback, h = /* @__PURE__ */ _c();
  function u(s, a) {
    if (r.rm) return r.rm(s, { recursive: !0, force: !0 }, a);
    h(s, a);
  }
  function f(s) {
    if (r.rmSync) return r.rmSync(s, { recursive: !0, force: !0 });
    h.sync(s);
  }
  return hn = {
    remove: c(u),
    removeSync: f
  }, hn;
}
var pn, ja;
function Ac() {
  if (ja) return pn;
  ja = 1;
  const r = Ye().fromPromise, c = /* @__PURE__ */ Bt(), h = De, u = /* @__PURE__ */ it(), f = /* @__PURE__ */ Gr(), s = r(async function(n) {
    let l;
    try {
      l = await c.readdir(n);
    } catch {
      return u.mkdirs(n);
    }
    return Promise.all(l.map((i) => f.remove(h.join(n, i))));
  });
  function a(d) {
    let n;
    try {
      n = c.readdirSync(d);
    } catch {
      return u.mkdirsSync(d);
    }
    n.forEach((l) => {
      l = h.join(d, l), f.removeSync(l);
    });
  }
  return pn = {
    emptyDirSync: a,
    emptydirSync: a,
    emptyDir: s,
    emptydir: s
  }, pn;
}
var mn, Ga;
function Sc() {
  if (Ga) return mn;
  Ga = 1;
  const r = Ye().fromCallback, c = De, h = Ve(), u = /* @__PURE__ */ it();
  function f(a, d) {
    function n() {
      h.writeFile(a, "", (l) => {
        if (l) return d(l);
        d();
      });
    }
    h.stat(a, (l, i) => {
      if (!l && i.isFile()) return d();
      const o = c.dirname(a);
      h.stat(o, (t, p) => {
        if (t)
          return t.code === "ENOENT" ? u.mkdirs(o, (g) => {
            if (g) return d(g);
            n();
          }) : d(t);
        p.isDirectory() ? n() : h.readdir(o, (g) => {
          if (g) return d(g);
        });
      });
    });
  }
  function s(a) {
    let d;
    try {
      d = h.statSync(a);
    } catch {
    }
    if (d && d.isFile()) return;
    const n = c.dirname(a);
    try {
      h.statSync(n).isDirectory() || h.readdirSync(n);
    } catch (l) {
      if (l && l.code === "ENOENT") u.mkdirsSync(n);
      else throw l;
    }
    h.writeFileSync(a, "");
  }
  return mn = {
    createFile: r(f),
    createFileSync: s
  }, mn;
}
var gn, Va;
function Tc() {
  if (Va) return gn;
  Va = 1;
  const r = Ye().fromCallback, c = De, h = Ve(), u = /* @__PURE__ */ it(), f = It().pathExists, { areIdentical: s } = /* @__PURE__ */ Ht();
  function a(n, l, i) {
    function o(t, p) {
      h.link(t, p, (g) => {
        if (g) return i(g);
        i(null);
      });
    }
    h.lstat(l, (t, p) => {
      h.lstat(n, (g, y) => {
        if (g)
          return g.message = g.message.replace("lstat", "ensureLink"), i(g);
        if (p && s(y, p)) return i(null);
        const m = c.dirname(l);
        f(m, (S, C) => {
          if (S) return i(S);
          if (C) return o(n, l);
          u.mkdirs(m, (D) => {
            if (D) return i(D);
            o(n, l);
          });
        });
      });
    });
  }
  function d(n, l) {
    let i;
    try {
      i = h.lstatSync(l);
    } catch {
    }
    try {
      const p = h.lstatSync(n);
      if (i && s(p, i)) return;
    } catch (p) {
      throw p.message = p.message.replace("lstat", "ensureLink"), p;
    }
    const o = c.dirname(l);
    return h.existsSync(o) || u.mkdirsSync(o), h.linkSync(n, l);
  }
  return gn = {
    createLink: r(a),
    createLinkSync: d
  }, gn;
}
var vn, Wa;
function Rc() {
  if (Wa) return vn;
  Wa = 1;
  const r = De, c = Ve(), h = It().pathExists;
  function u(s, a, d) {
    if (r.isAbsolute(s))
      return c.lstat(s, (n) => n ? (n.message = n.message.replace("lstat", "ensureSymlink"), d(n)) : d(null, {
        toCwd: s,
        toDst: s
      }));
    {
      const n = r.dirname(a), l = r.join(n, s);
      return h(l, (i, o) => i ? d(i) : o ? d(null, {
        toCwd: l,
        toDst: s
      }) : c.lstat(s, (t) => t ? (t.message = t.message.replace("lstat", "ensureSymlink"), d(t)) : d(null, {
        toCwd: s,
        toDst: r.relative(n, s)
      })));
    }
  }
  function f(s, a) {
    let d;
    if (r.isAbsolute(s)) {
      if (d = c.existsSync(s), !d) throw new Error("absolute srcpath does not exist");
      return {
        toCwd: s,
        toDst: s
      };
    } else {
      const n = r.dirname(a), l = r.join(n, s);
      if (d = c.existsSync(l), d)
        return {
          toCwd: l,
          toDst: s
        };
      if (d = c.existsSync(s), !d) throw new Error("relative srcpath does not exist");
      return {
        toCwd: s,
        toDst: r.relative(n, s)
      };
    }
  }
  return vn = {
    symlinkPaths: u,
    symlinkPathsSync: f
  }, vn;
}
var En, Ya;
function Cc() {
  if (Ya) return En;
  Ya = 1;
  const r = Ve();
  function c(u, f, s) {
    if (s = typeof f == "function" ? f : s, f = typeof f == "function" ? !1 : f, f) return s(null, f);
    r.lstat(u, (a, d) => {
      if (a) return s(null, "file");
      f = d && d.isDirectory() ? "dir" : "file", s(null, f);
    });
  }
  function h(u, f) {
    let s;
    if (f) return f;
    try {
      s = r.lstatSync(u);
    } catch {
      return "file";
    }
    return s && s.isDirectory() ? "dir" : "file";
  }
  return En = {
    symlinkType: c,
    symlinkTypeSync: h
  }, En;
}
var yn, za;
function bc() {
  if (za) return yn;
  za = 1;
  const r = Ye().fromCallback, c = De, h = /* @__PURE__ */ Bt(), u = /* @__PURE__ */ it(), f = u.mkdirs, s = u.mkdirsSync, a = /* @__PURE__ */ Rc(), d = a.symlinkPaths, n = a.symlinkPathsSync, l = /* @__PURE__ */ Cc(), i = l.symlinkType, o = l.symlinkTypeSync, t = It().pathExists, { areIdentical: p } = /* @__PURE__ */ Ht();
  function g(S, C, D, O) {
    O = typeof D == "function" ? D : O, D = typeof D == "function" ? !1 : D, h.lstat(C, (I, R) => {
      !I && R.isSymbolicLink() ? Promise.all([
        h.stat(S),
        h.stat(C)
      ]).then(([w, A]) => {
        if (p(w, A)) return O(null);
        y(S, C, D, O);
      }) : y(S, C, D, O);
    });
  }
  function y(S, C, D, O) {
    d(S, C, (I, R) => {
      if (I) return O(I);
      S = R.toDst, i(R.toCwd, D, (w, A) => {
        if (w) return O(w);
        const E = c.dirname(C);
        t(E, ($, F) => {
          if ($) return O($);
          if (F) return h.symlink(S, C, A, O);
          f(E, (x) => {
            if (x) return O(x);
            h.symlink(S, C, A, O);
          });
        });
      });
    });
  }
  function m(S, C, D) {
    let O;
    try {
      O = h.lstatSync(C);
    } catch {
    }
    if (O && O.isSymbolicLink()) {
      const A = h.statSync(S), E = h.statSync(C);
      if (p(A, E)) return;
    }
    const I = n(S, C);
    S = I.toDst, D = o(I.toCwd, D);
    const R = c.dirname(C);
    return h.existsSync(R) || s(R), h.symlinkSync(S, C, D);
  }
  return yn = {
    createSymlink: r(g),
    createSymlinkSync: m
  }, yn;
}
var wn, Xa;
function Oc() {
  if (Xa) return wn;
  Xa = 1;
  const { createFile: r, createFileSync: c } = /* @__PURE__ */ Sc(), { createLink: h, createLinkSync: u } = /* @__PURE__ */ Tc(), { createSymlink: f, createSymlinkSync: s } = /* @__PURE__ */ bc();
  return wn = {
    // file
    createFile: r,
    createFileSync: c,
    ensureFile: r,
    ensureFileSync: c,
    // link
    createLink: h,
    createLinkSync: u,
    ensureLink: h,
    ensureLinkSync: u,
    // symlink
    createSymlink: f,
    createSymlinkSync: s,
    ensureSymlink: f,
    ensureSymlinkSync: s
  }, wn;
}
var _n, Ka;
function ta() {
  if (Ka) return _n;
  Ka = 1;
  function r(h, { EOL: u = `
`, finalEOL: f = !0, replacer: s = null, spaces: a } = {}) {
    const d = f ? u : "";
    return JSON.stringify(h, s, a).replace(/\n/g, u) + d;
  }
  function c(h) {
    return Buffer.isBuffer(h) && (h = h.toString("utf8")), h.replace(/^\uFEFF/, "");
  }
  return _n = { stringify: r, stripBom: c }, _n;
}
var An, Ja;
function Dc() {
  if (Ja) return An;
  Ja = 1;
  let r;
  try {
    r = Ve();
  } catch {
    r = ut;
  }
  const c = Ye(), { stringify: h, stripBom: u } = ta();
  async function f(o, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const p = t.fs || r, g = "throws" in t ? t.throws : !0;
    let y = await c.fromCallback(p.readFile)(o, t);
    y = u(y);
    let m;
    try {
      m = JSON.parse(y, t ? t.reviver : null);
    } catch (S) {
      if (g)
        throw S.message = `${o}: ${S.message}`, S;
      return null;
    }
    return m;
  }
  const s = c.fromPromise(f);
  function a(o, t = {}) {
    typeof t == "string" && (t = { encoding: t });
    const p = t.fs || r, g = "throws" in t ? t.throws : !0;
    try {
      let y = p.readFileSync(o, t);
      return y = u(y), JSON.parse(y, t.reviver);
    } catch (y) {
      if (g)
        throw y.message = `${o}: ${y.message}`, y;
      return null;
    }
  }
  async function d(o, t, p = {}) {
    const g = p.fs || r, y = h(t, p);
    await c.fromCallback(g.writeFile)(o, y, p);
  }
  const n = c.fromPromise(d);
  function l(o, t, p = {}) {
    const g = p.fs || r, y = h(t, p);
    return g.writeFileSync(o, y, p);
  }
  return An = {
    readFile: s,
    readFileSync: a,
    writeFile: n,
    writeFileSync: l
  }, An;
}
var Sn, Qa;
function Ic() {
  if (Qa) return Sn;
  Qa = 1;
  const r = Dc();
  return Sn = {
    // jsonfile exports
    readJson: r.readFile,
    readJsonSync: r.readFileSync,
    writeJson: r.writeFile,
    writeJsonSync: r.writeFileSync
  }, Sn;
}
var Tn, Za;
function ra() {
  if (Za) return Tn;
  Za = 1;
  const r = Ye().fromCallback, c = Ve(), h = De, u = /* @__PURE__ */ it(), f = It().pathExists;
  function s(d, n, l, i) {
    typeof l == "function" && (i = l, l = "utf8");
    const o = h.dirname(d);
    f(o, (t, p) => {
      if (t) return i(t);
      if (p) return c.writeFile(d, n, l, i);
      u.mkdirs(o, (g) => {
        if (g) return i(g);
        c.writeFile(d, n, l, i);
      });
    });
  }
  function a(d, ...n) {
    const l = h.dirname(d);
    if (c.existsSync(l))
      return c.writeFileSync(d, ...n);
    u.mkdirsSync(l), c.writeFileSync(d, ...n);
  }
  return Tn = {
    outputFile: r(s),
    outputFileSync: a
  }, Tn;
}
var Rn, eo;
function Pc() {
  if (eo) return Rn;
  eo = 1;
  const { stringify: r } = ta(), { outputFile: c } = /* @__PURE__ */ ra();
  async function h(u, f, s = {}) {
    const a = r(f, s);
    await c(u, a, s);
  }
  return Rn = h, Rn;
}
var Cn, to;
function Nc() {
  if (to) return Cn;
  to = 1;
  const { stringify: r } = ta(), { outputFileSync: c } = /* @__PURE__ */ ra();
  function h(u, f, s) {
    const a = r(f, s);
    c(u, a, s);
  }
  return Cn = h, Cn;
}
var bn, ro;
function Fc() {
  if (ro) return bn;
  ro = 1;
  const r = Ye().fromPromise, c = /* @__PURE__ */ Ic();
  return c.outputJson = r(/* @__PURE__ */ Pc()), c.outputJsonSync = /* @__PURE__ */ Nc(), c.outputJSON = c.outputJson, c.outputJSONSync = c.outputJsonSync, c.writeJSON = c.writeJson, c.writeJSONSync = c.writeJsonSync, c.readJSON = c.readJson, c.readJSONSync = c.readJsonSync, bn = c, bn;
}
var On, no;
function xc() {
  if (no) return On;
  no = 1;
  const r = Ve(), c = De, h = ea().copy, u = Gr().remove, f = it().mkdirp, s = It().pathExists, a = /* @__PURE__ */ Ht();
  function d(t, p, g, y) {
    typeof g == "function" && (y = g, g = {}), g = g || {};
    const m = g.overwrite || g.clobber || !1;
    a.checkPaths(t, p, "move", g, (S, C) => {
      if (S) return y(S);
      const { srcStat: D, isChangingCase: O = !1 } = C;
      a.checkParentPaths(t, D, p, "move", (I) => {
        if (I) return y(I);
        if (n(p)) return l(t, p, m, O, y);
        f(c.dirname(p), (R) => R ? y(R) : l(t, p, m, O, y));
      });
    });
  }
  function n(t) {
    const p = c.dirname(t);
    return c.parse(p).root === p;
  }
  function l(t, p, g, y, m) {
    if (y) return i(t, p, g, m);
    if (g)
      return u(p, (S) => S ? m(S) : i(t, p, g, m));
    s(p, (S, C) => S ? m(S) : C ? m(new Error("dest already exists.")) : i(t, p, g, m));
  }
  function i(t, p, g, y) {
    r.rename(t, p, (m) => m ? m.code !== "EXDEV" ? y(m) : o(t, p, g, y) : y());
  }
  function o(t, p, g, y) {
    h(t, p, {
      overwrite: g,
      errorOnExist: !0
    }, (S) => S ? y(S) : u(t, y));
  }
  return On = d, On;
}
var Dn, io;
function Lc() {
  if (io) return Dn;
  io = 1;
  const r = Ve(), c = De, h = ea().copySync, u = Gr().removeSync, f = it().mkdirpSync, s = /* @__PURE__ */ Ht();
  function a(o, t, p) {
    p = p || {};
    const g = p.overwrite || p.clobber || !1, { srcStat: y, isChangingCase: m = !1 } = s.checkPathsSync(o, t, "move", p);
    return s.checkParentPathsSync(o, y, t, "move"), d(t) || f(c.dirname(t)), n(o, t, g, m);
  }
  function d(o) {
    const t = c.dirname(o);
    return c.parse(t).root === t;
  }
  function n(o, t, p, g) {
    if (g) return l(o, t, p);
    if (p)
      return u(t), l(o, t, p);
    if (r.existsSync(t)) throw new Error("dest already exists.");
    return l(o, t, p);
  }
  function l(o, t, p) {
    try {
      r.renameSync(o, t);
    } catch (g) {
      if (g.code !== "EXDEV") throw g;
      return i(o, t, p);
    }
  }
  function i(o, t, p) {
    return h(o, t, {
      overwrite: p,
      errorOnExist: !0
    }), u(o);
  }
  return Dn = a, Dn;
}
var In, ao;
function Uc() {
  if (ao) return In;
  ao = 1;
  const r = Ye().fromCallback;
  return In = {
    move: r(/* @__PURE__ */ xc()),
    moveSync: /* @__PURE__ */ Lc()
  }, In;
}
var Pn, oo;
function gt() {
  return oo || (oo = 1, Pn = {
    // Export promiseified graceful-fs:
    .../* @__PURE__ */ Bt(),
    // Export extra methods:
    .../* @__PURE__ */ ea(),
    .../* @__PURE__ */ Ac(),
    .../* @__PURE__ */ Oc(),
    .../* @__PURE__ */ Fc(),
    .../* @__PURE__ */ it(),
    .../* @__PURE__ */ Uc(),
    .../* @__PURE__ */ ra(),
    .../* @__PURE__ */ It(),
    .../* @__PURE__ */ Gr()
  }), Pn;
}
var Yt = {}, Tt = {}, Nn = {}, Rt = {}, so;
function na() {
  if (so) return Rt;
  so = 1, Object.defineProperty(Rt, "__esModule", { value: !0 }), Rt.CancellationError = Rt.CancellationToken = void 0;
  const r = Pl;
  let c = class extends r.EventEmitter {
    get cancelled() {
      return this._cancelled || this._parent != null && this._parent.cancelled;
    }
    set parent(f) {
      this.removeParentCancelHandler(), this._parent = f, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
    }
    // babel cannot compile ... correctly for super calls
    constructor(f) {
      super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, f != null && (this.parent = f);
    }
    cancel() {
      this._cancelled = !0, this.emit("cancel");
    }
    onCancel(f) {
      this.cancelled ? f() : this.once("cancel", f);
    }
    createPromise(f) {
      if (this.cancelled)
        return Promise.reject(new h());
      const s = () => {
        if (a != null)
          try {
            this.removeListener("cancel", a), a = null;
          } catch {
          }
      };
      let a = null;
      return new Promise((d, n) => {
        let l = null;
        if (a = () => {
          try {
            l != null && (l(), l = null);
          } finally {
            n(new h());
          }
        }, this.cancelled) {
          a();
          return;
        }
        this.onCancel(a), f(d, n, (i) => {
          l = i;
        });
      }).then((d) => (s(), d)).catch((d) => {
        throw s(), d;
      });
    }
    removeParentCancelHandler() {
      const f = this._parent;
      f != null && this.parentCancelHandler != null && (f.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
    }
    dispose() {
      try {
        this.removeParentCancelHandler();
      } finally {
        this.removeAllListeners(), this._parent = null;
      }
    }
  };
  Rt.CancellationToken = c;
  class h extends Error {
    constructor() {
      super("cancelled");
    }
  }
  return Rt.CancellationError = h, Rt;
}
var Pr = {}, lo;
function Vr() {
  if (lo) return Pr;
  lo = 1, Object.defineProperty(Pr, "__esModule", { value: !0 }), Pr.newError = r;
  function r(c, h) {
    const u = new Error(c);
    return u.code = h, u;
  }
  return Pr;
}
var Be = {}, Nr = { exports: {} }, Fr = { exports: {} }, Fn, uo;
function $c() {
  if (uo) return Fn;
  uo = 1;
  var r = 1e3, c = r * 60, h = c * 60, u = h * 24, f = u * 7, s = u * 365.25;
  Fn = function(i, o) {
    o = o || {};
    var t = typeof i;
    if (t === "string" && i.length > 0)
      return a(i);
    if (t === "number" && isFinite(i))
      return o.long ? n(i) : d(i);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(i)
    );
  };
  function a(i) {
    if (i = String(i), !(i.length > 100)) {
      var o = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        i
      );
      if (o) {
        var t = parseFloat(o[1]), p = (o[2] || "ms").toLowerCase();
        switch (p) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return t * s;
          case "weeks":
          case "week":
          case "w":
            return t * f;
          case "days":
          case "day":
          case "d":
            return t * u;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return t * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return t * c;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return t * r;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return t;
          default:
            return;
        }
      }
    }
  }
  function d(i) {
    var o = Math.abs(i);
    return o >= u ? Math.round(i / u) + "d" : o >= h ? Math.round(i / h) + "h" : o >= c ? Math.round(i / c) + "m" : o >= r ? Math.round(i / r) + "s" : i + "ms";
  }
  function n(i) {
    var o = Math.abs(i);
    return o >= u ? l(i, o, u, "day") : o >= h ? l(i, o, h, "hour") : o >= c ? l(i, o, c, "minute") : o >= r ? l(i, o, r, "second") : i + " ms";
  }
  function l(i, o, t, p) {
    var g = o >= t * 1.5;
    return Math.round(i / t) + " " + p + (g ? "s" : "");
  }
  return Fn;
}
var xn, co;
function Ll() {
  if (co) return xn;
  co = 1;
  function r(c) {
    u.debug = u, u.default = u, u.coerce = l, u.disable = d, u.enable = s, u.enabled = n, u.humanize = $c(), u.destroy = i, Object.keys(c).forEach((o) => {
      u[o] = c[o];
    }), u.names = [], u.skips = [], u.formatters = {};
    function h(o) {
      let t = 0;
      for (let p = 0; p < o.length; p++)
        t = (t << 5) - t + o.charCodeAt(p), t |= 0;
      return u.colors[Math.abs(t) % u.colors.length];
    }
    u.selectColor = h;
    function u(o) {
      let t, p = null, g, y;
      function m(...S) {
        if (!m.enabled)
          return;
        const C = m, D = Number(/* @__PURE__ */ new Date()), O = D - (t || D);
        C.diff = O, C.prev = t, C.curr = D, t = D, S[0] = u.coerce(S[0]), typeof S[0] != "string" && S.unshift("%O");
        let I = 0;
        S[0] = S[0].replace(/%([a-zA-Z%])/g, (w, A) => {
          if (w === "%%")
            return "%";
          I++;
          const E = u.formatters[A];
          if (typeof E == "function") {
            const $ = S[I];
            w = E.call(C, $), S.splice(I, 1), I--;
          }
          return w;
        }), u.formatArgs.call(C, S), (C.log || u.log).apply(C, S);
      }
      return m.namespace = o, m.useColors = u.useColors(), m.color = u.selectColor(o), m.extend = f, m.destroy = u.destroy, Object.defineProperty(m, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => p !== null ? p : (g !== u.namespaces && (g = u.namespaces, y = u.enabled(o)), y),
        set: (S) => {
          p = S;
        }
      }), typeof u.init == "function" && u.init(m), m;
    }
    function f(o, t) {
      const p = u(this.namespace + (typeof t > "u" ? ":" : t) + o);
      return p.log = this.log, p;
    }
    function s(o) {
      u.save(o), u.namespaces = o, u.names = [], u.skips = [];
      const t = (typeof o == "string" ? o : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const p of t)
        p[0] === "-" ? u.skips.push(p.slice(1)) : u.names.push(p);
    }
    function a(o, t) {
      let p = 0, g = 0, y = -1, m = 0;
      for (; p < o.length; )
        if (g < t.length && (t[g] === o[p] || t[g] === "*"))
          t[g] === "*" ? (y = g, m = p, g++) : (p++, g++);
        else if (y !== -1)
          g = y + 1, m++, p = m;
        else
          return !1;
      for (; g < t.length && t[g] === "*"; )
        g++;
      return g === t.length;
    }
    function d() {
      const o = [
        ...u.names,
        ...u.skips.map((t) => "-" + t)
      ].join(",");
      return u.enable(""), o;
    }
    function n(o) {
      for (const t of u.skips)
        if (a(o, t))
          return !1;
      for (const t of u.names)
        if (a(o, t))
          return !0;
      return !1;
    }
    function l(o) {
      return o instanceof Error ? o.stack || o.message : o;
    }
    function i() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return u.enable(u.load()), u;
  }
  return xn = r, xn;
}
var fo;
function kc() {
  return fo || (fo = 1, function(r, c) {
    c.formatArgs = u, c.save = f, c.load = s, c.useColors = h, c.storage = a(), c.destroy = /* @__PURE__ */ (() => {
      let n = !1;
      return () => {
        n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), c.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function h() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let n;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function u(n) {
      if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors)
        return;
      const l = "color: " + this.color;
      n.splice(1, 0, l, "color: inherit");
      let i = 0, o = 0;
      n[0].replace(/%[a-zA-Z%]/g, (t) => {
        t !== "%%" && (i++, t === "%c" && (o = i));
      }), n.splice(o, 0, l);
    }
    c.log = console.debug || console.log || (() => {
    });
    function f(n) {
      try {
        n ? c.storage.setItem("debug", n) : c.storage.removeItem("debug");
      } catch {
      }
    }
    function s() {
      let n;
      try {
        n = c.storage.getItem("debug");
      } catch {
      }
      return !n && typeof process < "u" && "env" in process && (n = process.env.DEBUG), n;
    }
    function a() {
      try {
        return localStorage;
      } catch {
      }
    }
    r.exports = Ll()(c);
    const { formatters: d } = r.exports;
    d.j = function(n) {
      try {
        return JSON.stringify(n);
      } catch (l) {
        return "[UnexpectedJSONParseError]: " + l.message;
      }
    };
  }(Fr, Fr.exports)), Fr.exports;
}
var xr = { exports: {} }, Ln, ho;
function qc() {
  return ho || (ho = 1, Ln = (r, c = process.argv) => {
    const h = r.startsWith("-") ? "" : r.length === 1 ? "-" : "--", u = c.indexOf(h + r), f = c.indexOf("--");
    return u !== -1 && (f === -1 || u < f);
  }), Ln;
}
var Un, po;
function Mc() {
  if (po) return Un;
  po = 1;
  const r = vr, c = Nl, h = qc(), { env: u } = process;
  let f;
  h("no-color") || h("no-colors") || h("color=false") || h("color=never") ? f = 0 : (h("color") || h("colors") || h("color=true") || h("color=always")) && (f = 1), "FORCE_COLOR" in u && (u.FORCE_COLOR === "true" ? f = 1 : u.FORCE_COLOR === "false" ? f = 0 : f = u.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(u.FORCE_COLOR, 10), 3));
  function s(n) {
    return n === 0 ? !1 : {
      level: n,
      hasBasic: !0,
      has256: n >= 2,
      has16m: n >= 3
    };
  }
  function a(n, l) {
    if (f === 0)
      return 0;
    if (h("color=16m") || h("color=full") || h("color=truecolor"))
      return 3;
    if (h("color=256"))
      return 2;
    if (n && !l && f === void 0)
      return 0;
    const i = f || 0;
    if (u.TERM === "dumb")
      return i;
    if (process.platform === "win32") {
      const o = r.release().split(".");
      return Number(o[0]) >= 10 && Number(o[2]) >= 10586 ? Number(o[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in u)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((o) => o in u) || u.CI_NAME === "codeship" ? 1 : i;
    if ("TEAMCITY_VERSION" in u)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(u.TEAMCITY_VERSION) ? 1 : 0;
    if (u.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in u) {
      const o = parseInt((u.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (u.TERM_PROGRAM) {
        case "iTerm.app":
          return o >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(u.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(u.TERM) || "COLORTERM" in u ? 1 : i;
  }
  function d(n) {
    const l = a(n, n && n.isTTY);
    return s(l);
  }
  return Un = {
    supportsColor: d,
    stdout: s(a(!0, c.isatty(1))),
    stderr: s(a(!0, c.isatty(2)))
  }, Un;
}
var mo;
function Bc() {
  return mo || (mo = 1, function(r, c) {
    const h = Nl, u = Zi;
    c.init = i, c.log = d, c.formatArgs = s, c.save = n, c.load = l, c.useColors = f, c.destroy = u.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), c.colors = [6, 2, 3, 4, 5, 1];
    try {
      const t = Mc();
      t && (t.stderr || t).level >= 2 && (c.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    c.inspectOpts = Object.keys(process.env).filter((t) => /^debug_/i.test(t)).reduce((t, p) => {
      const g = p.substring(6).toLowerCase().replace(/_([a-z])/g, (m, S) => S.toUpperCase());
      let y = process.env[p];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), t[g] = y, t;
    }, {});
    function f() {
      return "colors" in c.inspectOpts ? !!c.inspectOpts.colors : h.isatty(process.stderr.fd);
    }
    function s(t) {
      const { namespace: p, useColors: g } = this;
      if (g) {
        const y = this.color, m = "\x1B[3" + (y < 8 ? y : "8;5;" + y), S = `  ${m};1m${p} \x1B[0m`;
        t[0] = S + t[0].split(`
`).join(`
` + S), t.push(m + "m+" + r.exports.humanize(this.diff) + "\x1B[0m");
      } else
        t[0] = a() + p + " " + t[0];
    }
    function a() {
      return c.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function d(...t) {
      return process.stderr.write(u.formatWithOptions(c.inspectOpts, ...t) + `
`);
    }
    function n(t) {
      t ? process.env.DEBUG = t : delete process.env.DEBUG;
    }
    function l() {
      return process.env.DEBUG;
    }
    function i(t) {
      t.inspectOpts = {};
      const p = Object.keys(c.inspectOpts);
      for (let g = 0; g < p.length; g++)
        t.inspectOpts[p[g]] = c.inspectOpts[p[g]];
    }
    r.exports = Ll()(c);
    const { formatters: o } = r.exports;
    o.o = function(t) {
      return this.inspectOpts.colors = this.useColors, u.inspect(t, this.inspectOpts).split(`
`).map((p) => p.trim()).join(" ");
    }, o.O = function(t) {
      return this.inspectOpts.colors = this.useColors, u.inspect(t, this.inspectOpts);
    };
  }(xr, xr.exports)), xr.exports;
}
var go;
function Hc() {
  return go || (go = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Nr.exports = kc() : Nr.exports = Bc()), Nr.exports;
}
var zt = {}, vo;
function Ul() {
  if (vo) return zt;
  vo = 1, Object.defineProperty(zt, "__esModule", { value: !0 }), zt.ProgressCallbackTransform = void 0;
  const r = Er;
  let c = class extends r.Transform {
    constructor(u, f, s) {
      super(), this.total = u, this.cancellationToken = f, this.onProgress = s, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
    }
    _transform(u, f, s) {
      if (this.cancellationToken.cancelled) {
        s(new Error("cancelled"), null);
        return;
      }
      this.transferred += u.length, this.delta += u.length;
      const a = Date.now();
      a >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = a + 1e3, this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.total * 100,
        bytesPerSecond: Math.round(this.transferred / ((a - this.start) / 1e3))
      }), this.delta = 0), s(null, u);
    }
    _flush(u) {
      if (this.cancellationToken.cancelled) {
        u(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.total,
        delta: this.delta,
        transferred: this.total,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, u(null);
    }
  };
  return zt.ProgressCallbackTransform = c, zt;
}
var Eo;
function jc() {
  if (Eo) return Be;
  Eo = 1, Object.defineProperty(Be, "__esModule", { value: !0 }), Be.DigestTransform = Be.HttpExecutor = Be.HttpError = void 0, Be.createHttpError = l, Be.parseJson = t, Be.configureRequestOptionsFromUrl = g, Be.configureRequestUrl = y, Be.safeGetHeader = C, Be.configureRequestOptions = O, Be.safeStringifyJson = I;
  const r = qt, c = Hc(), h = ut, u = Er, f = Mt, s = na(), a = Vr(), d = Ul(), n = (0, c.default)("electron-builder");
  function l(R, w = null) {
    return new o(R.statusCode || -1, `${R.statusCode} ${R.statusMessage}` + (w == null ? "" : `
` + JSON.stringify(w, null, "  ")) + `
Headers: ` + I(R.headers), w);
  }
  const i = /* @__PURE__ */ new Map([
    [429, "Too many requests"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [405, "Method not allowed"],
    [406, "Not acceptable"],
    [408, "Request timeout"],
    [413, "Request entity too large"],
    [500, "Internal server error"],
    [502, "Bad gateway"],
    [503, "Service unavailable"],
    [504, "Gateway timeout"],
    [505, "HTTP version not supported"]
  ]);
  class o extends Error {
    constructor(w, A = `HTTP error: ${i.get(w) || w}`, E = null) {
      super(A), this.statusCode = w, this.description = E, this.name = "HttpError", this.code = `HTTP_ERROR_${w}`;
    }
    isServerError() {
      return this.statusCode >= 500 && this.statusCode <= 599;
    }
  }
  Be.HttpError = o;
  function t(R) {
    return R.then((w) => w == null || w.length === 0 ? null : JSON.parse(w));
  }
  class p {
    constructor() {
      this.maxRedirects = 10;
    }
    request(w, A = new s.CancellationToken(), E) {
      O(w);
      const $ = E == null ? void 0 : JSON.stringify(E), F = $ ? Buffer.from($) : void 0;
      if (F != null) {
        n($);
        const { headers: x, ...q } = w;
        w = {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": F.length,
            ...x
          },
          ...q
        };
      }
      return this.doApiRequest(w, A, (x) => x.end(F));
    }
    doApiRequest(w, A, E, $ = 0) {
      return n.enabled && n(`Request: ${I(w)}`), A.createPromise((F, x, q) => {
        const N = this.createRequest(w, (P) => {
          try {
            this.handleResponse(P, w, A, F, x, $, E);
          } catch (U) {
            x(U);
          }
        });
        this.addErrorAndTimeoutHandlers(N, x, w.timeout), this.addRedirectHandlers(N, w, x, $, (P) => {
          this.doApiRequest(P, A, E, $).then(F).catch(x);
        }), E(N, x), q(() => N.abort());
      });
    }
    // noinspection JSUnusedLocalSymbols
    // eslint-disable-next-line
    addRedirectHandlers(w, A, E, $, F) {
    }
    addErrorAndTimeoutHandlers(w, A, E = 60 * 1e3) {
      this.addTimeOutHandler(w, A, E), w.on("error", A), w.on("aborted", () => {
        A(new Error("Request has been aborted by the server"));
      });
    }
    handleResponse(w, A, E, $, F, x, q) {
      var N;
      if (n.enabled && n(`Response: ${w.statusCode} ${w.statusMessage}, request options: ${I(A)}`), w.statusCode === 404) {
        F(l(w, `method: ${A.method || "GET"} url: ${A.protocol || "https:"}//${A.hostname}${A.port ? `:${A.port}` : ""}${A.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
        return;
      } else if (w.statusCode === 204) {
        $();
        return;
      }
      const P = (N = w.statusCode) !== null && N !== void 0 ? N : 0, U = P >= 300 && P < 400, M = C(w, "location");
      if (U && M != null) {
        if (x > this.maxRedirects) {
          F(this.createMaxRedirectError());
          return;
        }
        this.doApiRequest(p.prepareRedirectUrlOptions(M, A), E, q, x).then($).catch(F);
        return;
      }
      w.setEncoding("utf8");
      let J = "";
      w.on("error", F), w.on("data", (V) => J += V), w.on("end", () => {
        try {
          if (w.statusCode != null && w.statusCode >= 400) {
            const V = C(w, "content-type"), ne = V != null && (Array.isArray(V) ? V.find((ce) => ce.includes("json")) != null : V.includes("json"));
            F(l(w, `method: ${A.method || "GET"} url: ${A.protocol || "https:"}//${A.hostname}${A.port ? `:${A.port}` : ""}${A.path}

          Data:
          ${ne ? JSON.stringify(JSON.parse(J)) : J}
          `));
          } else
            $(J.length === 0 ? null : J);
        } catch (V) {
          F(V);
        }
      });
    }
    async downloadToBuffer(w, A) {
      return await A.cancellationToken.createPromise((E, $, F) => {
        const x = [], q = {
          headers: A.headers || void 0,
          // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
          redirect: "manual"
        };
        y(w, q), O(q), this.doDownload(q, {
          destination: null,
          options: A,
          onCancel: F,
          callback: (N) => {
            N == null ? E(Buffer.concat(x)) : $(N);
          },
          responseHandler: (N, P) => {
            let U = 0;
            N.on("data", (M) => {
              if (U += M.length, U > 524288e3) {
                P(new Error("Maximum allowed size is 500 MB"));
                return;
              }
              x.push(M);
            }), N.on("end", () => {
              P(null);
            });
          }
        }, 0);
      });
    }
    doDownload(w, A, E) {
      const $ = this.createRequest(w, (F) => {
        if (F.statusCode >= 400) {
          A.callback(new Error(`Cannot download "${w.protocol || "https:"}//${w.hostname}${w.path}", status ${F.statusCode}: ${F.statusMessage}`));
          return;
        }
        F.on("error", A.callback);
        const x = C(F, "location");
        if (x != null) {
          E < this.maxRedirects ? this.doDownload(p.prepareRedirectUrlOptions(x, w), A, E++) : A.callback(this.createMaxRedirectError());
          return;
        }
        A.responseHandler == null ? D(A, F) : A.responseHandler(F, A.callback);
      });
      this.addErrorAndTimeoutHandlers($, A.callback, w.timeout), this.addRedirectHandlers($, w, A.callback, E, (F) => {
        this.doDownload(F, A, E++);
      }), $.end();
    }
    createMaxRedirectError() {
      return new Error(`Too many redirects (> ${this.maxRedirects})`);
    }
    addTimeOutHandler(w, A, E) {
      w.on("socket", ($) => {
        $.setTimeout(E, () => {
          w.abort(), A(new Error("Request timed out"));
        });
      });
    }
    static prepareRedirectUrlOptions(w, A) {
      const E = g(w, { ...A }), $ = E.headers;
      if ($ != null && $.authorization) {
        const F = new f.URL(w);
        (F.hostname.endsWith(".amazonaws.com") || F.searchParams.has("X-Amz-Credential")) && delete $.authorization;
      }
      return E;
    }
    static retryOnServerError(w, A = 3) {
      for (let E = 0; ; E++)
        try {
          return w();
        } catch ($) {
          if (E < A && ($ instanceof o && $.isServerError() || $.code === "EPIPE"))
            continue;
          throw $;
        }
    }
  }
  Be.HttpExecutor = p;
  function g(R, w) {
    const A = O(w);
    return y(new f.URL(R), A), A;
  }
  function y(R, w) {
    w.protocol = R.protocol, w.hostname = R.hostname, R.port ? w.port = R.port : w.port && delete w.port, w.path = R.pathname + R.search;
  }
  class m extends u.Transform {
    // noinspection JSUnusedGlobalSymbols
    get actual() {
      return this._actual;
    }
    constructor(w, A = "sha512", E = "base64") {
      super(), this.expected = w, this.algorithm = A, this.encoding = E, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, r.createHash)(A);
    }
    // noinspection JSUnusedGlobalSymbols
    _transform(w, A, E) {
      this.digester.update(w), E(null, w);
    }
    // noinspection JSUnusedGlobalSymbols
    _flush(w) {
      if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
        try {
          this.validate();
        } catch (A) {
          w(A);
          return;
        }
      w(null);
    }
    validate() {
      if (this._actual == null)
        throw (0, a.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
      if (this._actual !== this.expected)
        throw (0, a.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
      return null;
    }
  }
  Be.DigestTransform = m;
  function S(R, w, A) {
    return R != null && w != null && R !== w ? (A(new Error(`checksum mismatch: expected ${w} but got ${R} (X-Checksum-Sha2 header)`)), !1) : !0;
  }
  function C(R, w) {
    const A = R.headers[w];
    return A == null ? null : Array.isArray(A) ? A.length === 0 ? null : A[A.length - 1] : A;
  }
  function D(R, w) {
    if (!S(C(w, "X-Checksum-Sha2"), R.options.sha2, R.callback))
      return;
    const A = [];
    if (R.options.onProgress != null) {
      const x = C(w, "content-length");
      x != null && A.push(new d.ProgressCallbackTransform(parseInt(x, 10), R.options.cancellationToken, R.options.onProgress));
    }
    const E = R.options.sha512;
    E != null ? A.push(new m(E, "sha512", E.length === 128 && !E.includes("+") && !E.includes("Z") && !E.includes("=") ? "hex" : "base64")) : R.options.sha2 != null && A.push(new m(R.options.sha2, "sha256", "hex"));
    const $ = (0, h.createWriteStream)(R.destination);
    A.push($);
    let F = w;
    for (const x of A)
      x.on("error", (q) => {
        $.close(), R.options.cancellationToken.cancelled || R.callback(q);
      }), F = F.pipe(x);
    $.on("finish", () => {
      $.close(R.callback);
    });
  }
  function O(R, w, A) {
    A != null && (R.method = A), R.headers = { ...R.headers };
    const E = R.headers;
    return w != null && (E.authorization = w.startsWith("Basic") || w.startsWith("Bearer") ? w : `token ${w}`), E["User-Agent"] == null && (E["User-Agent"] = "electron-builder"), (A == null || A === "GET" || E["Cache-Control"] == null) && (E["Cache-Control"] = "no-cache"), R.protocol == null && process.versions.electron != null && (R.protocol = "https:"), R;
  }
  function I(R, w) {
    return JSON.stringify(R, (A, E) => A.endsWith("Authorization") || A.endsWith("authorization") || A.endsWith("Password") || A.endsWith("PASSWORD") || A.endsWith("Token") || A.includes("password") || A.includes("token") || w != null && w.has(A) ? "<stripped sensitive data>" : E, 2);
  }
  return Be;
}
var Xt = {}, yo;
function Gc() {
  if (yo) return Xt;
  yo = 1, Object.defineProperty(Xt, "__esModule", { value: !0 }), Xt.MemoLazy = void 0;
  let r = class {
    constructor(u, f) {
      this.selector = u, this.creator = f, this.selected = void 0, this._value = void 0;
    }
    get hasValue() {
      return this._value !== void 0;
    }
    get value() {
      const u = this.selector();
      if (this._value !== void 0 && c(this.selected, u))
        return this._value;
      this.selected = u;
      const f = this.creator(u);
      return this.value = f, f;
    }
    set value(u) {
      this._value = u;
    }
  };
  Xt.MemoLazy = r;
  function c(h, u) {
    if (typeof h == "object" && h !== null && (typeof u == "object" && u !== null)) {
      const a = Object.keys(h), d = Object.keys(u);
      return a.length === d.length && a.every((n) => c(h[n], u[n]));
    }
    return h === u;
  }
  return Xt;
}
var Kt = {}, wo;
function Vc() {
  if (wo) return Kt;
  wo = 1, Object.defineProperty(Kt, "__esModule", { value: !0 }), Kt.githubUrl = r, Kt.getS3LikeProviderBaseUrl = c;
  function r(s, a = "github.com") {
    return `${s.protocol || "https"}://${s.host || a}`;
  }
  function c(s) {
    const a = s.provider;
    if (a === "s3")
      return h(s);
    if (a === "spaces")
      return f(s);
    throw new Error(`Not supported provider: ${a}`);
  }
  function h(s) {
    let a;
    if (s.accelerate == !0)
      a = `https://${s.bucket}.s3-accelerate.amazonaws.com`;
    else if (s.endpoint != null)
      a = `${s.endpoint}/${s.bucket}`;
    else if (s.bucket.includes(".")) {
      if (s.region == null)
        throw new Error(`Bucket name "${s.bucket}" includes a dot, but S3 region is missing`);
      s.region === "us-east-1" ? a = `https://s3.amazonaws.com/${s.bucket}` : a = `https://s3-${s.region}.amazonaws.com/${s.bucket}`;
    } else s.region === "cn-north-1" ? a = `https://${s.bucket}.s3.${s.region}.amazonaws.com.cn` : a = `https://${s.bucket}.s3.amazonaws.com`;
    return u(a, s.path);
  }
  function u(s, a) {
    return a != null && a.length > 0 && (a.startsWith("/") || (s += "/"), s += a), s;
  }
  function f(s) {
    if (s.name == null)
      throw new Error("name is missing");
    if (s.region == null)
      throw new Error("region is missing");
    return u(`https://${s.name}.${s.region}.digitaloceanspaces.com`, s.path);
  }
  return Kt;
}
var Lr = {}, _o;
function Wc() {
  if (_o) return Lr;
  _o = 1, Object.defineProperty(Lr, "__esModule", { value: !0 }), Lr.retry = c;
  const r = na();
  async function c(h, u, f, s = 0, a = 0, d) {
    var n;
    const l = new r.CancellationToken();
    try {
      return await h();
    } catch (i) {
      if ((!((n = d == null ? void 0 : d(i)) !== null && n !== void 0) || n) && u > 0 && !l.cancelled)
        return await new Promise((o) => setTimeout(o, f + s * a)), await c(h, u - 1, f, s, a + 1, d);
      throw i;
    }
  }
  return Lr;
}
var Ur = {}, Ao;
function Yc() {
  if (Ao) return Ur;
  Ao = 1, Object.defineProperty(Ur, "__esModule", { value: !0 }), Ur.parseDn = r;
  function r(c) {
    let h = !1, u = null, f = "", s = 0;
    c = c.trim();
    const a = /* @__PURE__ */ new Map();
    for (let d = 0; d <= c.length; d++) {
      if (d === c.length) {
        u !== null && a.set(u, f);
        break;
      }
      const n = c[d];
      if (h) {
        if (n === '"') {
          h = !1;
          continue;
        }
      } else {
        if (n === '"') {
          h = !0;
          continue;
        }
        if (n === "\\") {
          d++;
          const l = parseInt(c.slice(d, d + 2), 16);
          Number.isNaN(l) ? f += c[d] : (d++, f += String.fromCharCode(l));
          continue;
        }
        if (u === null && n === "=") {
          u = f, f = "";
          continue;
        }
        if (n === "," || n === ";" || n === "+") {
          u !== null && a.set(u, f), u = null, f = "";
          continue;
        }
      }
      if (n === " " && !h) {
        if (f.length === 0)
          continue;
        if (d > s) {
          let l = d;
          for (; c[l] === " "; )
            l++;
          s = l;
        }
        if (s >= c.length || c[s] === "," || c[s] === ";" || u === null && c[s] === "=" || u !== null && c[s] === "+") {
          d = s - 1;
          continue;
        }
      }
      f += n;
    }
    return a;
  }
  return Ur;
}
var Ct = {}, So;
function zc() {
  if (So) return Ct;
  So = 1, Object.defineProperty(Ct, "__esModule", { value: !0 }), Ct.nil = Ct.UUID = void 0;
  const r = qt, c = Vr(), h = "options.name must be either a string or a Buffer", u = (0, r.randomBytes)(16);
  u[0] = u[0] | 1;
  const f = {}, s = [];
  for (let o = 0; o < 256; o++) {
    const t = (o + 256).toString(16).substr(1);
    f[t] = o, s[o] = t;
  }
  class a {
    constructor(t) {
      this.ascii = null, this.binary = null;
      const p = a.check(t);
      if (!p)
        throw new Error("not a UUID");
      this.version = p.version, p.format === "ascii" ? this.ascii = t : this.binary = t;
    }
    static v5(t, p) {
      return l(t, "sha1", 80, p);
    }
    toString() {
      return this.ascii == null && (this.ascii = i(this.binary)), this.ascii;
    }
    inspect() {
      return `UUID v${this.version} ${this.toString()}`;
    }
    static check(t, p = 0) {
      if (typeof t == "string")
        return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
          version: (f[t[14] + t[15]] & 240) >> 4,
          variant: d((f[t[19] + t[20]] & 224) >> 5),
          format: "ascii"
        } : !1;
      if (Buffer.isBuffer(t)) {
        if (t.length < p + 16)
          return !1;
        let g = 0;
        for (; g < 16 && t[p + g] === 0; g++)
          ;
        return g === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
          version: (t[p + 6] & 240) >> 4,
          variant: d((t[p + 8] & 224) >> 5),
          format: "binary"
        };
      }
      throw (0, c.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
    }
    // read stringified uuid into a Buffer
    static parse(t) {
      const p = Buffer.allocUnsafe(16);
      let g = 0;
      for (let y = 0; y < 16; y++)
        p[y] = f[t[g++] + t[g++]], (y === 3 || y === 5 || y === 7 || y === 9) && (g += 1);
      return p;
    }
  }
  Ct.UUID = a, a.OID = a.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
  function d(o) {
    switch (o) {
      case 0:
      case 1:
      case 3:
        return "ncs";
      case 4:
      case 5:
        return "rfc4122";
      case 6:
        return "microsoft";
      default:
        return "future";
    }
  }
  var n;
  (function(o) {
    o[o.ASCII = 0] = "ASCII", o[o.BINARY = 1] = "BINARY", o[o.OBJECT = 2] = "OBJECT";
  })(n || (n = {}));
  function l(o, t, p, g, y = n.ASCII) {
    const m = (0, r.createHash)(t);
    if (typeof o != "string" && !Buffer.isBuffer(o))
      throw (0, c.newError)(h, "ERR_INVALID_UUID_NAME");
    m.update(g), m.update(o);
    const C = m.digest();
    let D;
    switch (y) {
      case n.BINARY:
        C[6] = C[6] & 15 | p, C[8] = C[8] & 63 | 128, D = C;
        break;
      case n.OBJECT:
        C[6] = C[6] & 15 | p, C[8] = C[8] & 63 | 128, D = new a(C);
        break;
      default:
        D = s[C[0]] + s[C[1]] + s[C[2]] + s[C[3]] + "-" + s[C[4]] + s[C[5]] + "-" + s[C[6] & 15 | p] + s[C[7]] + "-" + s[C[8] & 63 | 128] + s[C[9]] + "-" + s[C[10]] + s[C[11]] + s[C[12]] + s[C[13]] + s[C[14]] + s[C[15]];
        break;
    }
    return D;
  }
  function i(o) {
    return s[o[0]] + s[o[1]] + s[o[2]] + s[o[3]] + "-" + s[o[4]] + s[o[5]] + "-" + s[o[6]] + s[o[7]] + "-" + s[o[8]] + s[o[9]] + "-" + s[o[10]] + s[o[11]] + s[o[12]] + s[o[13]] + s[o[14]] + s[o[15]];
  }
  return Ct.nil = new a("00000000-0000-0000-0000-000000000000"), Ct;
}
var Lt = {}, $n = {}, To;
function Xc() {
  return To || (To = 1, function(r) {
    (function(c) {
      c.parser = function(T, v) {
        return new u(T, v);
      }, c.SAXParser = u, c.SAXStream = i, c.createStream = l, c.MAX_BUFFER_LENGTH = 64 * 1024;
      var h = [
        "comment",
        "sgmlDecl",
        "textNode",
        "tagName",
        "doctype",
        "procInstName",
        "procInstBody",
        "entity",
        "attribName",
        "attribValue",
        "cdata",
        "script"
      ];
      c.EVENTS = [
        "text",
        "processinginstruction",
        "sgmldeclaration",
        "doctype",
        "comment",
        "opentagstart",
        "attribute",
        "opentag",
        "closetag",
        "opencdata",
        "cdata",
        "closecdata",
        "error",
        "end",
        "ready",
        "script",
        "opennamespace",
        "closenamespace"
      ];
      function u(T, v) {
        if (!(this instanceof u))
          return new u(T, v);
        var H = this;
        s(H), H.q = H.c = "", H.bufferCheckPosition = c.MAX_BUFFER_LENGTH, H.opt = v || {}, H.opt.lowercase = H.opt.lowercase || H.opt.lowercasetags, H.looseCase = H.opt.lowercase ? "toLowerCase" : "toUpperCase", H.tags = [], H.closed = H.closedRoot = H.sawRoot = !1, H.tag = H.error = null, H.strict = !!T, H.noscript = !!(T || H.opt.noscript), H.state = E.BEGIN, H.strictEntities = H.opt.strictEntities, H.ENTITIES = H.strictEntities ? Object.create(c.XML_ENTITIES) : Object.create(c.ENTITIES), H.attribList = [], H.opt.xmlns && (H.ns = Object.create(y)), H.opt.unquotedAttributeValues === void 0 && (H.opt.unquotedAttributeValues = !T), H.trackPosition = H.opt.position !== !1, H.trackPosition && (H.position = H.line = H.column = 0), F(H, "onready");
      }
      Object.create || (Object.create = function(T) {
        function v() {
        }
        v.prototype = T;
        var H = new v();
        return H;
      }), Object.keys || (Object.keys = function(T) {
        var v = [];
        for (var H in T) T.hasOwnProperty(H) && v.push(H);
        return v;
      });
      function f(T) {
        for (var v = Math.max(c.MAX_BUFFER_LENGTH, 10), H = 0, L = 0, le = h.length; L < le; L++) {
          var me = T[h[L]].length;
          if (me > v)
            switch (h[L]) {
              case "textNode":
                q(T);
                break;
              case "cdata":
                x(T, "oncdata", T.cdata), T.cdata = "";
                break;
              case "script":
                x(T, "onscript", T.script), T.script = "";
                break;
              default:
                P(T, "Max buffer length exceeded: " + h[L]);
            }
          H = Math.max(H, me);
        }
        var pe = c.MAX_BUFFER_LENGTH - H;
        T.bufferCheckPosition = pe + T.position;
      }
      function s(T) {
        for (var v = 0, H = h.length; v < H; v++)
          T[h[v]] = "";
      }
      function a(T) {
        q(T), T.cdata !== "" && (x(T, "oncdata", T.cdata), T.cdata = ""), T.script !== "" && (x(T, "onscript", T.script), T.script = "");
      }
      u.prototype = {
        end: function() {
          U(this);
        },
        write: Ee,
        resume: function() {
          return this.error = null, this;
        },
        close: function() {
          return this.write(null);
        },
        flush: function() {
          a(this);
        }
      };
      var d;
      try {
        d = require("stream").Stream;
      } catch {
        d = function() {
        };
      }
      d || (d = function() {
      });
      var n = c.EVENTS.filter(function(T) {
        return T !== "error" && T !== "end";
      });
      function l(T, v) {
        return new i(T, v);
      }
      function i(T, v) {
        if (!(this instanceof i))
          return new i(T, v);
        d.apply(this), this._parser = new u(T, v), this.writable = !0, this.readable = !0;
        var H = this;
        this._parser.onend = function() {
          H.emit("end");
        }, this._parser.onerror = function(L) {
          H.emit("error", L), H._parser.error = null;
        }, this._decoder = null, n.forEach(function(L) {
          Object.defineProperty(H, "on" + L, {
            get: function() {
              return H._parser["on" + L];
            },
            set: function(le) {
              if (!le)
                return H.removeAllListeners(L), H._parser["on" + L] = le, le;
              H.on(L, le);
            },
            enumerable: !0,
            configurable: !1
          });
        });
      }
      i.prototype = Object.create(d.prototype, {
        constructor: {
          value: i
        }
      }), i.prototype.write = function(T) {
        if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(T)) {
          if (!this._decoder) {
            var v = lc.StringDecoder;
            this._decoder = new v("utf8");
          }
          T = this._decoder.write(T);
        }
        return this._parser.write(T.toString()), this.emit("data", T), !0;
      }, i.prototype.end = function(T) {
        return T && T.length && this.write(T), this._parser.end(), !0;
      }, i.prototype.on = function(T, v) {
        var H = this;
        return !H._parser["on" + T] && n.indexOf(T) !== -1 && (H._parser["on" + T] = function() {
          var L = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
          L.splice(0, 0, T), H.emit.apply(H, L);
        }), d.prototype.on.call(H, T, v);
      };
      var o = "[CDATA[", t = "DOCTYPE", p = "http://www.w3.org/XML/1998/namespace", g = "http://www.w3.org/2000/xmlns/", y = { xml: p, xmlns: g }, m = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, S = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, D = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
      function O(T) {
        return T === " " || T === `
` || T === "\r" || T === "	";
      }
      function I(T) {
        return T === '"' || T === "'";
      }
      function R(T) {
        return T === ">" || O(T);
      }
      function w(T, v) {
        return T.test(v);
      }
      function A(T, v) {
        return !w(T, v);
      }
      var E = 0;
      c.STATE = {
        BEGIN: E++,
        // leading byte order mark or whitespace
        BEGIN_WHITESPACE: E++,
        // leading whitespace
        TEXT: E++,
        // general stuff
        TEXT_ENTITY: E++,
        // &amp and such.
        OPEN_WAKA: E++,
        // <
        SGML_DECL: E++,
        // <!BLARG
        SGML_DECL_QUOTED: E++,
        // <!BLARG foo "bar
        DOCTYPE: E++,
        // <!DOCTYPE
        DOCTYPE_QUOTED: E++,
        // <!DOCTYPE "//blah
        DOCTYPE_DTD: E++,
        // <!DOCTYPE "//blah" [ ...
        DOCTYPE_DTD_QUOTED: E++,
        // <!DOCTYPE "//blah" [ "foo
        COMMENT_STARTING: E++,
        // <!-
        COMMENT: E++,
        // <!--
        COMMENT_ENDING: E++,
        // <!-- blah -
        COMMENT_ENDED: E++,
        // <!-- blah --
        CDATA: E++,
        // <![CDATA[ something
        CDATA_ENDING: E++,
        // ]
        CDATA_ENDING_2: E++,
        // ]]
        PROC_INST: E++,
        // <?hi
        PROC_INST_BODY: E++,
        // <?hi there
        PROC_INST_ENDING: E++,
        // <?hi "there" ?
        OPEN_TAG: E++,
        // <strong
        OPEN_TAG_SLASH: E++,
        // <strong /
        ATTRIB: E++,
        // <a
        ATTRIB_NAME: E++,
        // <a foo
        ATTRIB_NAME_SAW_WHITE: E++,
        // <a foo _
        ATTRIB_VALUE: E++,
        // <a foo=
        ATTRIB_VALUE_QUOTED: E++,
        // <a foo="bar
        ATTRIB_VALUE_CLOSED: E++,
        // <a foo="bar"
        ATTRIB_VALUE_UNQUOTED: E++,
        // <a foo=bar
        ATTRIB_VALUE_ENTITY_Q: E++,
        // <foo bar="&quot;"
        ATTRIB_VALUE_ENTITY_U: E++,
        // <foo bar=&quot
        CLOSE_TAG: E++,
        // </a
        CLOSE_TAG_SAW_WHITE: E++,
        // </a   >
        SCRIPT: E++,
        // <script> ...
        SCRIPT_ENDING: E++
        // <script> ... <
      }, c.XML_ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'"
      }, c.ENTITIES = {
        amp: "&",
        gt: ">",
        lt: "<",
        quot: '"',
        apos: "'",
        AElig: 198,
        Aacute: 193,
        Acirc: 194,
        Agrave: 192,
        Aring: 197,
        Atilde: 195,
        Auml: 196,
        Ccedil: 199,
        ETH: 208,
        Eacute: 201,
        Ecirc: 202,
        Egrave: 200,
        Euml: 203,
        Iacute: 205,
        Icirc: 206,
        Igrave: 204,
        Iuml: 207,
        Ntilde: 209,
        Oacute: 211,
        Ocirc: 212,
        Ograve: 210,
        Oslash: 216,
        Otilde: 213,
        Ouml: 214,
        THORN: 222,
        Uacute: 218,
        Ucirc: 219,
        Ugrave: 217,
        Uuml: 220,
        Yacute: 221,
        aacute: 225,
        acirc: 226,
        aelig: 230,
        agrave: 224,
        aring: 229,
        atilde: 227,
        auml: 228,
        ccedil: 231,
        eacute: 233,
        ecirc: 234,
        egrave: 232,
        eth: 240,
        euml: 235,
        iacute: 237,
        icirc: 238,
        igrave: 236,
        iuml: 239,
        ntilde: 241,
        oacute: 243,
        ocirc: 244,
        ograve: 242,
        oslash: 248,
        otilde: 245,
        ouml: 246,
        szlig: 223,
        thorn: 254,
        uacute: 250,
        ucirc: 251,
        ugrave: 249,
        uuml: 252,
        yacute: 253,
        yuml: 255,
        copy: 169,
        reg: 174,
        nbsp: 160,
        iexcl: 161,
        cent: 162,
        pound: 163,
        curren: 164,
        yen: 165,
        brvbar: 166,
        sect: 167,
        uml: 168,
        ordf: 170,
        laquo: 171,
        not: 172,
        shy: 173,
        macr: 175,
        deg: 176,
        plusmn: 177,
        sup1: 185,
        sup2: 178,
        sup3: 179,
        acute: 180,
        micro: 181,
        para: 182,
        middot: 183,
        cedil: 184,
        ordm: 186,
        raquo: 187,
        frac14: 188,
        frac12: 189,
        frac34: 190,
        iquest: 191,
        times: 215,
        divide: 247,
        OElig: 338,
        oelig: 339,
        Scaron: 352,
        scaron: 353,
        Yuml: 376,
        fnof: 402,
        circ: 710,
        tilde: 732,
        Alpha: 913,
        Beta: 914,
        Gamma: 915,
        Delta: 916,
        Epsilon: 917,
        Zeta: 918,
        Eta: 919,
        Theta: 920,
        Iota: 921,
        Kappa: 922,
        Lambda: 923,
        Mu: 924,
        Nu: 925,
        Xi: 926,
        Omicron: 927,
        Pi: 928,
        Rho: 929,
        Sigma: 931,
        Tau: 932,
        Upsilon: 933,
        Phi: 934,
        Chi: 935,
        Psi: 936,
        Omega: 937,
        alpha: 945,
        beta: 946,
        gamma: 947,
        delta: 948,
        epsilon: 949,
        zeta: 950,
        eta: 951,
        theta: 952,
        iota: 953,
        kappa: 954,
        lambda: 955,
        mu: 956,
        nu: 957,
        xi: 958,
        omicron: 959,
        pi: 960,
        rho: 961,
        sigmaf: 962,
        sigma: 963,
        tau: 964,
        upsilon: 965,
        phi: 966,
        chi: 967,
        psi: 968,
        omega: 969,
        thetasym: 977,
        upsih: 978,
        piv: 982,
        ensp: 8194,
        emsp: 8195,
        thinsp: 8201,
        zwnj: 8204,
        zwj: 8205,
        lrm: 8206,
        rlm: 8207,
        ndash: 8211,
        mdash: 8212,
        lsquo: 8216,
        rsquo: 8217,
        sbquo: 8218,
        ldquo: 8220,
        rdquo: 8221,
        bdquo: 8222,
        dagger: 8224,
        Dagger: 8225,
        bull: 8226,
        hellip: 8230,
        permil: 8240,
        prime: 8242,
        Prime: 8243,
        lsaquo: 8249,
        rsaquo: 8250,
        oline: 8254,
        frasl: 8260,
        euro: 8364,
        image: 8465,
        weierp: 8472,
        real: 8476,
        trade: 8482,
        alefsym: 8501,
        larr: 8592,
        uarr: 8593,
        rarr: 8594,
        darr: 8595,
        harr: 8596,
        crarr: 8629,
        lArr: 8656,
        uArr: 8657,
        rArr: 8658,
        dArr: 8659,
        hArr: 8660,
        forall: 8704,
        part: 8706,
        exist: 8707,
        empty: 8709,
        nabla: 8711,
        isin: 8712,
        notin: 8713,
        ni: 8715,
        prod: 8719,
        sum: 8721,
        minus: 8722,
        lowast: 8727,
        radic: 8730,
        prop: 8733,
        infin: 8734,
        ang: 8736,
        and: 8743,
        or: 8744,
        cap: 8745,
        cup: 8746,
        int: 8747,
        there4: 8756,
        sim: 8764,
        cong: 8773,
        asymp: 8776,
        ne: 8800,
        equiv: 8801,
        le: 8804,
        ge: 8805,
        sub: 8834,
        sup: 8835,
        nsub: 8836,
        sube: 8838,
        supe: 8839,
        oplus: 8853,
        otimes: 8855,
        perp: 8869,
        sdot: 8901,
        lceil: 8968,
        rceil: 8969,
        lfloor: 8970,
        rfloor: 8971,
        lang: 9001,
        rang: 9002,
        loz: 9674,
        spades: 9824,
        clubs: 9827,
        hearts: 9829,
        diams: 9830
      }, Object.keys(c.ENTITIES).forEach(function(T) {
        var v = c.ENTITIES[T], H = typeof v == "number" ? String.fromCharCode(v) : v;
        c.ENTITIES[T] = H;
      });
      for (var $ in c.STATE)
        c.STATE[c.STATE[$]] = $;
      E = c.STATE;
      function F(T, v, H) {
        T[v] && T[v](H);
      }
      function x(T, v, H) {
        T.textNode && q(T), F(T, v, H);
      }
      function q(T) {
        T.textNode = N(T.opt, T.textNode), T.textNode && F(T, "ontext", T.textNode), T.textNode = "";
      }
      function N(T, v) {
        return T.trim && (v = v.trim()), T.normalize && (v = v.replace(/\s+/g, " ")), v;
      }
      function P(T, v) {
        return q(T), T.trackPosition && (v += `
Line: ` + T.line + `
Column: ` + T.column + `
Char: ` + T.c), v = new Error(v), T.error = v, F(T, "onerror", v), T;
      }
      function U(T) {
        return T.sawRoot && !T.closedRoot && M(T, "Unclosed root tag"), T.state !== E.BEGIN && T.state !== E.BEGIN_WHITESPACE && T.state !== E.TEXT && P(T, "Unexpected end"), q(T), T.c = "", T.closed = !0, F(T, "onend"), u.call(T, T.strict, T.opt), T;
      }
      function M(T, v) {
        if (typeof T != "object" || !(T instanceof u))
          throw new Error("bad call to strictFail");
        T.strict && P(T, v);
      }
      function J(T) {
        T.strict || (T.tagName = T.tagName[T.looseCase]());
        var v = T.tags[T.tags.length - 1] || T, H = T.tag = { name: T.tagName, attributes: {} };
        T.opt.xmlns && (H.ns = v.ns), T.attribList.length = 0, x(T, "onopentagstart", H);
      }
      function V(T, v) {
        var H = T.indexOf(":"), L = H < 0 ? ["", T] : T.split(":"), le = L[0], me = L[1];
        return v && T === "xmlns" && (le = "xmlns", me = ""), { prefix: le, local: me };
      }
      function ne(T) {
        if (T.strict || (T.attribName = T.attribName[T.looseCase]()), T.attribList.indexOf(T.attribName) !== -1 || T.tag.attributes.hasOwnProperty(T.attribName)) {
          T.attribName = T.attribValue = "";
          return;
        }
        if (T.opt.xmlns) {
          var v = V(T.attribName, !0), H = v.prefix, L = v.local;
          if (H === "xmlns")
            if (L === "xml" && T.attribValue !== p)
              M(
                T,
                "xml: prefix must be bound to " + p + `
Actual: ` + T.attribValue
              );
            else if (L === "xmlns" && T.attribValue !== g)
              M(
                T,
                "xmlns: prefix must be bound to " + g + `
Actual: ` + T.attribValue
              );
            else {
              var le = T.tag, me = T.tags[T.tags.length - 1] || T;
              le.ns === me.ns && (le.ns = Object.create(me.ns)), le.ns[L] = T.attribValue;
            }
          T.attribList.push([T.attribName, T.attribValue]);
        } else
          T.tag.attributes[T.attribName] = T.attribValue, x(T, "onattribute", {
            name: T.attribName,
            value: T.attribValue
          });
        T.attribName = T.attribValue = "";
      }
      function ce(T, v) {
        if (T.opt.xmlns) {
          var H = T.tag, L = V(T.tagName);
          H.prefix = L.prefix, H.local = L.local, H.uri = H.ns[L.prefix] || "", H.prefix && !H.uri && (M(T, "Unbound namespace prefix: " + JSON.stringify(T.tagName)), H.uri = L.prefix);
          var le = T.tags[T.tags.length - 1] || T;
          H.ns && le.ns !== H.ns && Object.keys(H.ns).forEach(function(B) {
            x(T, "onopennamespace", {
              prefix: B,
              uri: H.ns[B]
            });
          });
          for (var me = 0, pe = T.attribList.length; me < pe; me++) {
            var _e = T.attribList[me], ye = _e[0], xe = _e[1], Ce = V(ye, !0), qe = Ce.prefix, vt = Ce.local, at = qe === "" ? "" : H.ns[qe] || "", e = {
              name: ye,
              value: xe,
              prefix: qe,
              local: vt,
              uri: at
            };
            qe && qe !== "xmlns" && !at && (M(T, "Unbound namespace prefix: " + JSON.stringify(qe)), e.uri = qe), T.tag.attributes[ye] = e, x(T, "onattribute", e);
          }
          T.attribList.length = 0;
        }
        T.tag.isSelfClosing = !!v, T.sawRoot = !0, T.tags.push(T.tag), x(T, "onopentag", T.tag), v || (!T.noscript && T.tagName.toLowerCase() === "script" ? T.state = E.SCRIPT : T.state = E.TEXT, T.tag = null, T.tagName = ""), T.attribName = T.attribValue = "", T.attribList.length = 0;
      }
      function ue(T) {
        if (!T.tagName) {
          M(T, "Weird empty close tag."), T.textNode += "</>", T.state = E.TEXT;
          return;
        }
        if (T.script) {
          if (T.tagName !== "script") {
            T.script += "</" + T.tagName + ">", T.tagName = "", T.state = E.SCRIPT;
            return;
          }
          x(T, "onscript", T.script), T.script = "";
        }
        var v = T.tags.length, H = T.tagName;
        T.strict || (H = H[T.looseCase]());
        for (var L = H; v--; ) {
          var le = T.tags[v];
          if (le.name !== L)
            M(T, "Unexpected close tag");
          else
            break;
        }
        if (v < 0) {
          M(T, "Unmatched closing tag: " + T.tagName), T.textNode += "</" + T.tagName + ">", T.state = E.TEXT;
          return;
        }
        T.tagName = H;
        for (var me = T.tags.length; me-- > v; ) {
          var pe = T.tag = T.tags.pop();
          T.tagName = T.tag.name, x(T, "onclosetag", T.tagName);
          var _e = {};
          for (var ye in pe.ns)
            _e[ye] = pe.ns[ye];
          var xe = T.tags[T.tags.length - 1] || T;
          T.opt.xmlns && pe.ns !== xe.ns && Object.keys(pe.ns).forEach(function(Ce) {
            var qe = pe.ns[Ce];
            x(T, "onclosenamespace", { prefix: Ce, uri: qe });
          });
        }
        v === 0 && (T.closedRoot = !0), T.tagName = T.attribValue = T.attribName = "", T.attribList.length = 0, T.state = E.TEXT;
      }
      function ie(T) {
        var v = T.entity, H = v.toLowerCase(), L, le = "";
        return T.ENTITIES[v] ? T.ENTITIES[v] : T.ENTITIES[H] ? T.ENTITIES[H] : (v = H, v.charAt(0) === "#" && (v.charAt(1) === "x" ? (v = v.slice(2), L = parseInt(v, 16), le = L.toString(16)) : (v = v.slice(1), L = parseInt(v, 10), le = L.toString(10))), v = v.replace(/^0+/, ""), isNaN(L) || le.toLowerCase() !== v ? (M(T, "Invalid character entity"), "&" + T.entity + ";") : String.fromCodePoint(L));
      }
      function Se(T, v) {
        v === "<" ? (T.state = E.OPEN_WAKA, T.startTagPosition = T.position) : O(v) || (M(T, "Non-whitespace before first tag."), T.textNode = v, T.state = E.TEXT);
      }
      function K(T, v) {
        var H = "";
        return v < T.length && (H = T.charAt(v)), H;
      }
      function Ee(T) {
        var v = this;
        if (this.error)
          throw this.error;
        if (v.closed)
          return P(
            v,
            "Cannot write after close. Assign an onready handler."
          );
        if (T === null)
          return U(v);
        typeof T == "object" && (T = T.toString());
        for (var H = 0, L = ""; L = K(T, H++), v.c = L, !!L; )
          switch (v.trackPosition && (v.position++, L === `
` ? (v.line++, v.column = 0) : v.column++), v.state) {
            case E.BEGIN:
              if (v.state = E.BEGIN_WHITESPACE, L === "\uFEFF")
                continue;
              Se(v, L);
              continue;
            case E.BEGIN_WHITESPACE:
              Se(v, L);
              continue;
            case E.TEXT:
              if (v.sawRoot && !v.closedRoot) {
                for (var le = H - 1; L && L !== "<" && L !== "&"; )
                  L = K(T, H++), L && v.trackPosition && (v.position++, L === `
` ? (v.line++, v.column = 0) : v.column++);
                v.textNode += T.substring(le, H - 1);
              }
              L === "<" && !(v.sawRoot && v.closedRoot && !v.strict) ? (v.state = E.OPEN_WAKA, v.startTagPosition = v.position) : (!O(L) && (!v.sawRoot || v.closedRoot) && M(v, "Text data outside of root node."), L === "&" ? v.state = E.TEXT_ENTITY : v.textNode += L);
              continue;
            case E.SCRIPT:
              L === "<" ? v.state = E.SCRIPT_ENDING : v.script += L;
              continue;
            case E.SCRIPT_ENDING:
              L === "/" ? v.state = E.CLOSE_TAG : (v.script += "<" + L, v.state = E.SCRIPT);
              continue;
            case E.OPEN_WAKA:
              if (L === "!")
                v.state = E.SGML_DECL, v.sgmlDecl = "";
              else if (!O(L)) if (w(m, L))
                v.state = E.OPEN_TAG, v.tagName = L;
              else if (L === "/")
                v.state = E.CLOSE_TAG, v.tagName = "";
              else if (L === "?")
                v.state = E.PROC_INST, v.procInstName = v.procInstBody = "";
              else {
                if (M(v, "Unencoded <"), v.startTagPosition + 1 < v.position) {
                  var me = v.position - v.startTagPosition;
                  L = new Array(me).join(" ") + L;
                }
                v.textNode += "<" + L, v.state = E.TEXT;
              }
              continue;
            case E.SGML_DECL:
              if (v.sgmlDecl + L === "--") {
                v.state = E.COMMENT, v.comment = "", v.sgmlDecl = "";
                continue;
              }
              v.doctype && v.doctype !== !0 && v.sgmlDecl ? (v.state = E.DOCTYPE_DTD, v.doctype += "<!" + v.sgmlDecl + L, v.sgmlDecl = "") : (v.sgmlDecl + L).toUpperCase() === o ? (x(v, "onopencdata"), v.state = E.CDATA, v.sgmlDecl = "", v.cdata = "") : (v.sgmlDecl + L).toUpperCase() === t ? (v.state = E.DOCTYPE, (v.doctype || v.sawRoot) && M(
                v,
                "Inappropriately located doctype declaration"
              ), v.doctype = "", v.sgmlDecl = "") : L === ">" ? (x(v, "onsgmldeclaration", v.sgmlDecl), v.sgmlDecl = "", v.state = E.TEXT) : (I(L) && (v.state = E.SGML_DECL_QUOTED), v.sgmlDecl += L);
              continue;
            case E.SGML_DECL_QUOTED:
              L === v.q && (v.state = E.SGML_DECL, v.q = ""), v.sgmlDecl += L;
              continue;
            case E.DOCTYPE:
              L === ">" ? (v.state = E.TEXT, x(v, "ondoctype", v.doctype), v.doctype = !0) : (v.doctype += L, L === "[" ? v.state = E.DOCTYPE_DTD : I(L) && (v.state = E.DOCTYPE_QUOTED, v.q = L));
              continue;
            case E.DOCTYPE_QUOTED:
              v.doctype += L, L === v.q && (v.q = "", v.state = E.DOCTYPE);
              continue;
            case E.DOCTYPE_DTD:
              L === "]" ? (v.doctype += L, v.state = E.DOCTYPE) : L === "<" ? (v.state = E.OPEN_WAKA, v.startTagPosition = v.position) : I(L) ? (v.doctype += L, v.state = E.DOCTYPE_DTD_QUOTED, v.q = L) : v.doctype += L;
              continue;
            case E.DOCTYPE_DTD_QUOTED:
              v.doctype += L, L === v.q && (v.state = E.DOCTYPE_DTD, v.q = "");
              continue;
            case E.COMMENT:
              L === "-" ? v.state = E.COMMENT_ENDING : v.comment += L;
              continue;
            case E.COMMENT_ENDING:
              L === "-" ? (v.state = E.COMMENT_ENDED, v.comment = N(v.opt, v.comment), v.comment && x(v, "oncomment", v.comment), v.comment = "") : (v.comment += "-" + L, v.state = E.COMMENT);
              continue;
            case E.COMMENT_ENDED:
              L !== ">" ? (M(v, "Malformed comment"), v.comment += "--" + L, v.state = E.COMMENT) : v.doctype && v.doctype !== !0 ? v.state = E.DOCTYPE_DTD : v.state = E.TEXT;
              continue;
            case E.CDATA:
              L === "]" ? v.state = E.CDATA_ENDING : v.cdata += L;
              continue;
            case E.CDATA_ENDING:
              L === "]" ? v.state = E.CDATA_ENDING_2 : (v.cdata += "]" + L, v.state = E.CDATA);
              continue;
            case E.CDATA_ENDING_2:
              L === ">" ? (v.cdata && x(v, "oncdata", v.cdata), x(v, "onclosecdata"), v.cdata = "", v.state = E.TEXT) : L === "]" ? v.cdata += "]" : (v.cdata += "]]" + L, v.state = E.CDATA);
              continue;
            case E.PROC_INST:
              L === "?" ? v.state = E.PROC_INST_ENDING : O(L) ? v.state = E.PROC_INST_BODY : v.procInstName += L;
              continue;
            case E.PROC_INST_BODY:
              if (!v.procInstBody && O(L))
                continue;
              L === "?" ? v.state = E.PROC_INST_ENDING : v.procInstBody += L;
              continue;
            case E.PROC_INST_ENDING:
              L === ">" ? (x(v, "onprocessinginstruction", {
                name: v.procInstName,
                body: v.procInstBody
              }), v.procInstName = v.procInstBody = "", v.state = E.TEXT) : (v.procInstBody += "?" + L, v.state = E.PROC_INST_BODY);
              continue;
            case E.OPEN_TAG:
              w(S, L) ? v.tagName += L : (J(v), L === ">" ? ce(v) : L === "/" ? v.state = E.OPEN_TAG_SLASH : (O(L) || M(v, "Invalid character in tag name"), v.state = E.ATTRIB));
              continue;
            case E.OPEN_TAG_SLASH:
              L === ">" ? (ce(v, !0), ue(v)) : (M(v, "Forward-slash in opening tag not followed by >"), v.state = E.ATTRIB);
              continue;
            case E.ATTRIB:
              if (O(L))
                continue;
              L === ">" ? ce(v) : L === "/" ? v.state = E.OPEN_TAG_SLASH : w(m, L) ? (v.attribName = L, v.attribValue = "", v.state = E.ATTRIB_NAME) : M(v, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME:
              L === "=" ? v.state = E.ATTRIB_VALUE : L === ">" ? (M(v, "Attribute without value"), v.attribValue = v.attribName, ne(v), ce(v)) : O(L) ? v.state = E.ATTRIB_NAME_SAW_WHITE : w(S, L) ? v.attribName += L : M(v, "Invalid attribute name");
              continue;
            case E.ATTRIB_NAME_SAW_WHITE:
              if (L === "=")
                v.state = E.ATTRIB_VALUE;
              else {
                if (O(L))
                  continue;
                M(v, "Attribute without value"), v.tag.attributes[v.attribName] = "", v.attribValue = "", x(v, "onattribute", {
                  name: v.attribName,
                  value: ""
                }), v.attribName = "", L === ">" ? ce(v) : w(m, L) ? (v.attribName = L, v.state = E.ATTRIB_NAME) : (M(v, "Invalid attribute name"), v.state = E.ATTRIB);
              }
              continue;
            case E.ATTRIB_VALUE:
              if (O(L))
                continue;
              I(L) ? (v.q = L, v.state = E.ATTRIB_VALUE_QUOTED) : (v.opt.unquotedAttributeValues || P(v, "Unquoted attribute value"), v.state = E.ATTRIB_VALUE_UNQUOTED, v.attribValue = L);
              continue;
            case E.ATTRIB_VALUE_QUOTED:
              if (L !== v.q) {
                L === "&" ? v.state = E.ATTRIB_VALUE_ENTITY_Q : v.attribValue += L;
                continue;
              }
              ne(v), v.q = "", v.state = E.ATTRIB_VALUE_CLOSED;
              continue;
            case E.ATTRIB_VALUE_CLOSED:
              O(L) ? v.state = E.ATTRIB : L === ">" ? ce(v) : L === "/" ? v.state = E.OPEN_TAG_SLASH : w(m, L) ? (M(v, "No whitespace between attributes"), v.attribName = L, v.attribValue = "", v.state = E.ATTRIB_NAME) : M(v, "Invalid attribute name");
              continue;
            case E.ATTRIB_VALUE_UNQUOTED:
              if (!R(L)) {
                L === "&" ? v.state = E.ATTRIB_VALUE_ENTITY_U : v.attribValue += L;
                continue;
              }
              ne(v), L === ">" ? ce(v) : v.state = E.ATTRIB;
              continue;
            case E.CLOSE_TAG:
              if (v.tagName)
                L === ">" ? ue(v) : w(S, L) ? v.tagName += L : v.script ? (v.script += "</" + v.tagName, v.tagName = "", v.state = E.SCRIPT) : (O(L) || M(v, "Invalid tagname in closing tag"), v.state = E.CLOSE_TAG_SAW_WHITE);
              else {
                if (O(L))
                  continue;
                A(m, L) ? v.script ? (v.script += "</" + L, v.state = E.SCRIPT) : M(v, "Invalid tagname in closing tag.") : v.tagName = L;
              }
              continue;
            case E.CLOSE_TAG_SAW_WHITE:
              if (O(L))
                continue;
              L === ">" ? ue(v) : M(v, "Invalid characters in closing tag");
              continue;
            case E.TEXT_ENTITY:
            case E.ATTRIB_VALUE_ENTITY_Q:
            case E.ATTRIB_VALUE_ENTITY_U:
              var pe, _e;
              switch (v.state) {
                case E.TEXT_ENTITY:
                  pe = E.TEXT, _e = "textNode";
                  break;
                case E.ATTRIB_VALUE_ENTITY_Q:
                  pe = E.ATTRIB_VALUE_QUOTED, _e = "attribValue";
                  break;
                case E.ATTRIB_VALUE_ENTITY_U:
                  pe = E.ATTRIB_VALUE_UNQUOTED, _e = "attribValue";
                  break;
              }
              if (L === ";") {
                var ye = ie(v);
                v.opt.unparsedEntities && !Object.values(c.XML_ENTITIES).includes(ye) ? (v.entity = "", v.state = pe, v.write(ye)) : (v[_e] += ye, v.entity = "", v.state = pe);
              } else w(v.entity.length ? D : C, L) ? v.entity += L : (M(v, "Invalid character in entity name"), v[_e] += "&" + v.entity + L, v.entity = "", v.state = pe);
              continue;
            default:
              throw new Error(v, "Unknown state: " + v.state);
          }
        return v.position >= v.bufferCheckPosition && f(v), v;
      }
      /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
      String.fromCodePoint || function() {
        var T = String.fromCharCode, v = Math.floor, H = function() {
          var L = 16384, le = [], me, pe, _e = -1, ye = arguments.length;
          if (!ye)
            return "";
          for (var xe = ""; ++_e < ye; ) {
            var Ce = Number(arguments[_e]);
            if (!isFinite(Ce) || // `NaN`, `+Infinity`, or `-Infinity`
            Ce < 0 || // not a valid Unicode code point
            Ce > 1114111 || // not a valid Unicode code point
            v(Ce) !== Ce)
              throw RangeError("Invalid code point: " + Ce);
            Ce <= 65535 ? le.push(Ce) : (Ce -= 65536, me = (Ce >> 10) + 55296, pe = Ce % 1024 + 56320, le.push(me, pe)), (_e + 1 === ye || le.length > L) && (xe += T.apply(null, le), le.length = 0);
          }
          return xe;
        };
        Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
          value: H,
          configurable: !0,
          writable: !0
        }) : String.fromCodePoint = H;
      }();
    })(r);
  }($n)), $n;
}
var Ro;
function Kc() {
  if (Ro) return Lt;
  Ro = 1, Object.defineProperty(Lt, "__esModule", { value: !0 }), Lt.XElement = void 0, Lt.parseXml = a;
  const r = Xc(), c = Vr();
  class h {
    constructor(n) {
      if (this.name = n, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !n)
        throw (0, c.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
      if (!f(n))
        throw (0, c.newError)(`Invalid element name: ${n}`, "ERR_XML_ELEMENT_INVALID_NAME");
    }
    attribute(n) {
      const l = this.attributes === null ? null : this.attributes[n];
      if (l == null)
        throw (0, c.newError)(`No attribute "${n}"`, "ERR_XML_MISSED_ATTRIBUTE");
      return l;
    }
    removeAttribute(n) {
      this.attributes !== null && delete this.attributes[n];
    }
    element(n, l = !1, i = null) {
      const o = this.elementOrNull(n, l);
      if (o === null)
        throw (0, c.newError)(i || `No element "${n}"`, "ERR_XML_MISSED_ELEMENT");
      return o;
    }
    elementOrNull(n, l = !1) {
      if (this.elements === null)
        return null;
      for (const i of this.elements)
        if (s(i, n, l))
          return i;
      return null;
    }
    getElements(n, l = !1) {
      return this.elements === null ? [] : this.elements.filter((i) => s(i, n, l));
    }
    elementValueOrEmpty(n, l = !1) {
      const i = this.elementOrNull(n, l);
      return i === null ? "" : i.value;
    }
  }
  Lt.XElement = h;
  const u = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
  function f(d) {
    return u.test(d);
  }
  function s(d, n, l) {
    const i = d.name;
    return i === n || l === !0 && i.length === n.length && i.toLowerCase() === n.toLowerCase();
  }
  function a(d) {
    let n = null;
    const l = r.parser(!0, {}), i = [];
    return l.onopentag = (o) => {
      const t = new h(o.name);
      if (t.attributes = o.attributes, n === null)
        n = t;
      else {
        const p = i[i.length - 1];
        p.elements == null && (p.elements = []), p.elements.push(t);
      }
      i.push(t);
    }, l.onclosetag = () => {
      i.pop();
    }, l.ontext = (o) => {
      i.length > 0 && (i[i.length - 1].value = o);
    }, l.oncdata = (o) => {
      const t = i[i.length - 1];
      t.value = o, t.isCData = !0;
    }, l.onerror = (o) => {
      throw o;
    }, l.write(d), n;
  }
  return Lt;
}
var Co;
function ke() {
  return Co || (Co = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.CURRENT_APP_PACKAGE_FILE_NAME = r.CURRENT_APP_INSTALLER_FILE_NAME = r.XElement = r.parseXml = r.UUID = r.parseDn = r.retry = r.githubUrl = r.getS3LikeProviderBaseUrl = r.ProgressCallbackTransform = r.MemoLazy = r.safeStringifyJson = r.safeGetHeader = r.parseJson = r.HttpExecutor = r.HttpError = r.DigestTransform = r.createHttpError = r.configureRequestUrl = r.configureRequestOptionsFromUrl = r.configureRequestOptions = r.newError = r.CancellationToken = r.CancellationError = void 0, r.asArray = o;
    var c = na();
    Object.defineProperty(r, "CancellationError", { enumerable: !0, get: function() {
      return c.CancellationError;
    } }), Object.defineProperty(r, "CancellationToken", { enumerable: !0, get: function() {
      return c.CancellationToken;
    } });
    var h = Vr();
    Object.defineProperty(r, "newError", { enumerable: !0, get: function() {
      return h.newError;
    } });
    var u = jc();
    Object.defineProperty(r, "configureRequestOptions", { enumerable: !0, get: function() {
      return u.configureRequestOptions;
    } }), Object.defineProperty(r, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
      return u.configureRequestOptionsFromUrl;
    } }), Object.defineProperty(r, "configureRequestUrl", { enumerable: !0, get: function() {
      return u.configureRequestUrl;
    } }), Object.defineProperty(r, "createHttpError", { enumerable: !0, get: function() {
      return u.createHttpError;
    } }), Object.defineProperty(r, "DigestTransform", { enumerable: !0, get: function() {
      return u.DigestTransform;
    } }), Object.defineProperty(r, "HttpError", { enumerable: !0, get: function() {
      return u.HttpError;
    } }), Object.defineProperty(r, "HttpExecutor", { enumerable: !0, get: function() {
      return u.HttpExecutor;
    } }), Object.defineProperty(r, "parseJson", { enumerable: !0, get: function() {
      return u.parseJson;
    } }), Object.defineProperty(r, "safeGetHeader", { enumerable: !0, get: function() {
      return u.safeGetHeader;
    } }), Object.defineProperty(r, "safeStringifyJson", { enumerable: !0, get: function() {
      return u.safeStringifyJson;
    } });
    var f = Gc();
    Object.defineProperty(r, "MemoLazy", { enumerable: !0, get: function() {
      return f.MemoLazy;
    } });
    var s = Ul();
    Object.defineProperty(r, "ProgressCallbackTransform", { enumerable: !0, get: function() {
      return s.ProgressCallbackTransform;
    } });
    var a = Vc();
    Object.defineProperty(r, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
      return a.getS3LikeProviderBaseUrl;
    } }), Object.defineProperty(r, "githubUrl", { enumerable: !0, get: function() {
      return a.githubUrl;
    } });
    var d = Wc();
    Object.defineProperty(r, "retry", { enumerable: !0, get: function() {
      return d.retry;
    } });
    var n = Yc();
    Object.defineProperty(r, "parseDn", { enumerable: !0, get: function() {
      return n.parseDn;
    } });
    var l = zc();
    Object.defineProperty(r, "UUID", { enumerable: !0, get: function() {
      return l.UUID;
    } });
    var i = Kc();
    Object.defineProperty(r, "parseXml", { enumerable: !0, get: function() {
      return i.parseXml;
    } }), Object.defineProperty(r, "XElement", { enumerable: !0, get: function() {
      return i.XElement;
    } }), r.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", r.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
    function o(t) {
      return t == null ? [] : Array.isArray(t) ? t : [t];
    }
  }(Nn)), Nn;
}
var He = {}, $r = {}, pt = {}, bo;
function yr() {
  if (bo) return pt;
  bo = 1;
  function r(a) {
    return typeof a > "u" || a === null;
  }
  function c(a) {
    return typeof a == "object" && a !== null;
  }
  function h(a) {
    return Array.isArray(a) ? a : r(a) ? [] : [a];
  }
  function u(a, d) {
    var n, l, i, o;
    if (d)
      for (o = Object.keys(d), n = 0, l = o.length; n < l; n += 1)
        i = o[n], a[i] = d[i];
    return a;
  }
  function f(a, d) {
    var n = "", l;
    for (l = 0; l < d; l += 1)
      n += a;
    return n;
  }
  function s(a) {
    return a === 0 && Number.NEGATIVE_INFINITY === 1 / a;
  }
  return pt.isNothing = r, pt.isObject = c, pt.toArray = h, pt.repeat = f, pt.isNegativeZero = s, pt.extend = u, pt;
}
var kn, Oo;
function wr() {
  if (Oo) return kn;
  Oo = 1;
  function r(h, u) {
    var f = "", s = h.reason || "(unknown reason)";
    return h.mark ? (h.mark.name && (f += 'in "' + h.mark.name + '" '), f += "(" + (h.mark.line + 1) + ":" + (h.mark.column + 1) + ")", !u && h.mark.snippet && (f += `

` + h.mark.snippet), s + " " + f) : s;
  }
  function c(h, u) {
    Error.call(this), this.name = "YAMLException", this.reason = h, this.mark = u, this.message = r(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
  }
  return c.prototype = Object.create(Error.prototype), c.prototype.constructor = c, c.prototype.toString = function(u) {
    return this.name + ": " + r(this, u);
  }, kn = c, kn;
}
var qn, Do;
function Jc() {
  if (Do) return qn;
  Do = 1;
  var r = yr();
  function c(f, s, a, d, n) {
    var l = "", i = "", o = Math.floor(n / 2) - 1;
    return d - s > o && (l = " ... ", s = d - o + l.length), a - d > o && (i = " ...", a = d + o - i.length), {
      str: l + f.slice(s, a).replace(/\t/g, "→") + i,
      pos: d - s + l.length
      // relative position
    };
  }
  function h(f, s) {
    return r.repeat(" ", s - f.length) + f;
  }
  function u(f, s) {
    if (s = Object.create(s || null), !f.buffer) return null;
    s.maxLength || (s.maxLength = 79), typeof s.indent != "number" && (s.indent = 1), typeof s.linesBefore != "number" && (s.linesBefore = 3), typeof s.linesAfter != "number" && (s.linesAfter = 2);
    for (var a = /\r?\n|\r|\0/g, d = [0], n = [], l, i = -1; l = a.exec(f.buffer); )
      n.push(l.index), d.push(l.index + l[0].length), f.position <= l.index && i < 0 && (i = d.length - 2);
    i < 0 && (i = d.length - 1);
    var o = "", t, p, g = Math.min(f.line + s.linesAfter, n.length).toString().length, y = s.maxLength - (s.indent + g + 3);
    for (t = 1; t <= s.linesBefore && !(i - t < 0); t++)
      p = c(
        f.buffer,
        d[i - t],
        n[i - t],
        f.position - (d[i] - d[i - t]),
        y
      ), o = r.repeat(" ", s.indent) + h((f.line - t + 1).toString(), g) + " | " + p.str + `
` + o;
    for (p = c(f.buffer, d[i], n[i], f.position, y), o += r.repeat(" ", s.indent) + h((f.line + 1).toString(), g) + " | " + p.str + `
`, o += r.repeat("-", s.indent + g + 3 + p.pos) + `^
`, t = 1; t <= s.linesAfter && !(i + t >= n.length); t++)
      p = c(
        f.buffer,
        d[i + t],
        n[i + t],
        f.position - (d[i] - d[i + t]),
        y
      ), o += r.repeat(" ", s.indent) + h((f.line + t + 1).toString(), g) + " | " + p.str + `
`;
    return o.replace(/\n$/, "");
  }
  return qn = u, qn;
}
var Mn, Io;
function je() {
  if (Io) return Mn;
  Io = 1;
  var r = wr(), c = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ], h = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function u(s) {
    var a = {};
    return s !== null && Object.keys(s).forEach(function(d) {
      s[d].forEach(function(n) {
        a[String(n)] = d;
      });
    }), a;
  }
  function f(s, a) {
    if (a = a || {}, Object.keys(a).forEach(function(d) {
      if (c.indexOf(d) === -1)
        throw new r('Unknown option "' + d + '" is met in definition of "' + s + '" YAML type.');
    }), this.options = a, this.tag = s, this.kind = a.kind || null, this.resolve = a.resolve || function() {
      return !0;
    }, this.construct = a.construct || function(d) {
      return d;
    }, this.instanceOf = a.instanceOf || null, this.predicate = a.predicate || null, this.represent = a.represent || null, this.representName = a.representName || null, this.defaultStyle = a.defaultStyle || null, this.multi = a.multi || !1, this.styleAliases = u(a.styleAliases || null), h.indexOf(this.kind) === -1)
      throw new r('Unknown kind "' + this.kind + '" is specified for "' + s + '" YAML type.');
  }
  return Mn = f, Mn;
}
var Bn, Po;
function $l() {
  if (Po) return Bn;
  Po = 1;
  var r = wr(), c = je();
  function h(s, a) {
    var d = [];
    return s[a].forEach(function(n) {
      var l = d.length;
      d.forEach(function(i, o) {
        i.tag === n.tag && i.kind === n.kind && i.multi === n.multi && (l = o);
      }), d[l] = n;
    }), d;
  }
  function u() {
    var s = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, a, d;
    function n(l) {
      l.multi ? (s.multi[l.kind].push(l), s.multi.fallback.push(l)) : s[l.kind][l.tag] = s.fallback[l.tag] = l;
    }
    for (a = 0, d = arguments.length; a < d; a += 1)
      arguments[a].forEach(n);
    return s;
  }
  function f(s) {
    return this.extend(s);
  }
  return f.prototype.extend = function(a) {
    var d = [], n = [];
    if (a instanceof c)
      n.push(a);
    else if (Array.isArray(a))
      n = n.concat(a);
    else if (a && (Array.isArray(a.implicit) || Array.isArray(a.explicit)))
      a.implicit && (d = d.concat(a.implicit)), a.explicit && (n = n.concat(a.explicit));
    else
      throw new r("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    d.forEach(function(i) {
      if (!(i instanceof c))
        throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      if (i.loadKind && i.loadKind !== "scalar")
        throw new r("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      if (i.multi)
        throw new r("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
    }), n.forEach(function(i) {
      if (!(i instanceof c))
        throw new r("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    });
    var l = Object.create(f.prototype);
    return l.implicit = (this.implicit || []).concat(d), l.explicit = (this.explicit || []).concat(n), l.compiledImplicit = h(l, "implicit"), l.compiledExplicit = h(l, "explicit"), l.compiledTypeMap = u(l.compiledImplicit, l.compiledExplicit), l;
  }, Bn = f, Bn;
}
var Hn, No;
function kl() {
  if (No) return Hn;
  No = 1;
  var r = je();
  return Hn = new r("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(c) {
      return c !== null ? c : "";
    }
  }), Hn;
}
var jn, Fo;
function ql() {
  if (Fo) return jn;
  Fo = 1;
  var r = je();
  return jn = new r("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(c) {
      return c !== null ? c : [];
    }
  }), jn;
}
var Gn, xo;
function Ml() {
  if (xo) return Gn;
  xo = 1;
  var r = je();
  return Gn = new r("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(c) {
      return c !== null ? c : {};
    }
  }), Gn;
}
var Vn, Lo;
function Bl() {
  if (Lo) return Vn;
  Lo = 1;
  var r = $l();
  return Vn = new r({
    explicit: [
      kl(),
      ql(),
      Ml()
    ]
  }), Vn;
}
var Wn, Uo;
function Hl() {
  if (Uo) return Wn;
  Uo = 1;
  var r = je();
  function c(f) {
    if (f === null) return !0;
    var s = f.length;
    return s === 1 && f === "~" || s === 4 && (f === "null" || f === "Null" || f === "NULL");
  }
  function h() {
    return null;
  }
  function u(f) {
    return f === null;
  }
  return Wn = new r("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: c,
    construct: h,
    predicate: u,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  }), Wn;
}
var Yn, $o;
function jl() {
  if ($o) return Yn;
  $o = 1;
  var r = je();
  function c(f) {
    if (f === null) return !1;
    var s = f.length;
    return s === 4 && (f === "true" || f === "True" || f === "TRUE") || s === 5 && (f === "false" || f === "False" || f === "FALSE");
  }
  function h(f) {
    return f === "true" || f === "True" || f === "TRUE";
  }
  function u(f) {
    return Object.prototype.toString.call(f) === "[object Boolean]";
  }
  return Yn = new r("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: c,
    construct: h,
    predicate: u,
    represent: {
      lowercase: function(f) {
        return f ? "true" : "false";
      },
      uppercase: function(f) {
        return f ? "TRUE" : "FALSE";
      },
      camelcase: function(f) {
        return f ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  }), Yn;
}
var zn, ko;
function Gl() {
  if (ko) return zn;
  ko = 1;
  var r = yr(), c = je();
  function h(n) {
    return 48 <= n && n <= 57 || 65 <= n && n <= 70 || 97 <= n && n <= 102;
  }
  function u(n) {
    return 48 <= n && n <= 55;
  }
  function f(n) {
    return 48 <= n && n <= 57;
  }
  function s(n) {
    if (n === null) return !1;
    var l = n.length, i = 0, o = !1, t;
    if (!l) return !1;
    if (t = n[i], (t === "-" || t === "+") && (t = n[++i]), t === "0") {
      if (i + 1 === l) return !0;
      if (t = n[++i], t === "b") {
        for (i++; i < l; i++)
          if (t = n[i], t !== "_") {
            if (t !== "0" && t !== "1") return !1;
            o = !0;
          }
        return o && t !== "_";
      }
      if (t === "x") {
        for (i++; i < l; i++)
          if (t = n[i], t !== "_") {
            if (!h(n.charCodeAt(i))) return !1;
            o = !0;
          }
        return o && t !== "_";
      }
      if (t === "o") {
        for (i++; i < l; i++)
          if (t = n[i], t !== "_") {
            if (!u(n.charCodeAt(i))) return !1;
            o = !0;
          }
        return o && t !== "_";
      }
    }
    if (t === "_") return !1;
    for (; i < l; i++)
      if (t = n[i], t !== "_") {
        if (!f(n.charCodeAt(i)))
          return !1;
        o = !0;
      }
    return !(!o || t === "_");
  }
  function a(n) {
    var l = n, i = 1, o;
    if (l.indexOf("_") !== -1 && (l = l.replace(/_/g, "")), o = l[0], (o === "-" || o === "+") && (o === "-" && (i = -1), l = l.slice(1), o = l[0]), l === "0") return 0;
    if (o === "0") {
      if (l[1] === "b") return i * parseInt(l.slice(2), 2);
      if (l[1] === "x") return i * parseInt(l.slice(2), 16);
      if (l[1] === "o") return i * parseInt(l.slice(2), 8);
    }
    return i * parseInt(l, 10);
  }
  function d(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && n % 1 === 0 && !r.isNegativeZero(n);
  }
  return zn = new c("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: s,
    construct: a,
    predicate: d,
    represent: {
      binary: function(n) {
        return n >= 0 ? "0b" + n.toString(2) : "-0b" + n.toString(2).slice(1);
      },
      octal: function(n) {
        return n >= 0 ? "0o" + n.toString(8) : "-0o" + n.toString(8).slice(1);
      },
      decimal: function(n) {
        return n.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(n) {
        return n >= 0 ? "0x" + n.toString(16).toUpperCase() : "-0x" + n.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  }), zn;
}
var Xn, qo;
function Vl() {
  if (qo) return Xn;
  qo = 1;
  var r = yr(), c = je(), h = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function u(n) {
    return !(n === null || !h.test(n) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    n[n.length - 1] === "_");
  }
  function f(n) {
    var l, i;
    return l = n.replace(/_/g, "").toLowerCase(), i = l[0] === "-" ? -1 : 1, "+-".indexOf(l[0]) >= 0 && (l = l.slice(1)), l === ".inf" ? i === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : l === ".nan" ? NaN : i * parseFloat(l, 10);
  }
  var s = /^[-+]?[0-9]+e/;
  function a(n, l) {
    var i;
    if (isNaN(n))
      switch (l) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    else if (Number.POSITIVE_INFINITY === n)
      switch (l) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    else if (Number.NEGATIVE_INFINITY === n)
      switch (l) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    else if (r.isNegativeZero(n))
      return "-0.0";
    return i = n.toString(10), s.test(i) ? i.replace("e", ".e") : i;
  }
  function d(n) {
    return Object.prototype.toString.call(n) === "[object Number]" && (n % 1 !== 0 || r.isNegativeZero(n));
  }
  return Xn = new c("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: u,
    construct: f,
    predicate: d,
    represent: a,
    defaultStyle: "lowercase"
  }), Xn;
}
var Kn, Mo;
function Wl() {
  return Mo || (Mo = 1, Kn = Bl().extend({
    implicit: [
      Hl(),
      jl(),
      Gl(),
      Vl()
    ]
  })), Kn;
}
var Jn, Bo;
function Yl() {
  return Bo || (Bo = 1, Jn = Wl()), Jn;
}
var Qn, Ho;
function zl() {
  if (Ho) return Qn;
  Ho = 1;
  var r = je(), c = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  ), h = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function u(a) {
    return a === null ? !1 : c.exec(a) !== null || h.exec(a) !== null;
  }
  function f(a) {
    var d, n, l, i, o, t, p, g = 0, y = null, m, S, C;
    if (d = c.exec(a), d === null && (d = h.exec(a)), d === null) throw new Error("Date resolve error");
    if (n = +d[1], l = +d[2] - 1, i = +d[3], !d[4])
      return new Date(Date.UTC(n, l, i));
    if (o = +d[4], t = +d[5], p = +d[6], d[7]) {
      for (g = d[7].slice(0, 3); g.length < 3; )
        g += "0";
      g = +g;
    }
    return d[9] && (m = +d[10], S = +(d[11] || 0), y = (m * 60 + S) * 6e4, d[9] === "-" && (y = -y)), C = new Date(Date.UTC(n, l, i, o, t, p, g)), y && C.setTime(C.getTime() - y), C;
  }
  function s(a) {
    return a.toISOString();
  }
  return Qn = new r("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: u,
    construct: f,
    instanceOf: Date,
    represent: s
  }), Qn;
}
var Zn, jo;
function Xl() {
  if (jo) return Zn;
  jo = 1;
  var r = je();
  function c(h) {
    return h === "<<" || h === null;
  }
  return Zn = new r("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: c
  }), Zn;
}
var ei, Go;
function Kl() {
  if (Go) return ei;
  Go = 1;
  var r = je(), c = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
  function h(a) {
    if (a === null) return !1;
    var d, n, l = 0, i = a.length, o = c;
    for (n = 0; n < i; n++)
      if (d = o.indexOf(a.charAt(n)), !(d > 64)) {
        if (d < 0) return !1;
        l += 6;
      }
    return l % 8 === 0;
  }
  function u(a) {
    var d, n, l = a.replace(/[\r\n=]/g, ""), i = l.length, o = c, t = 0, p = [];
    for (d = 0; d < i; d++)
      d % 4 === 0 && d && (p.push(t >> 16 & 255), p.push(t >> 8 & 255), p.push(t & 255)), t = t << 6 | o.indexOf(l.charAt(d));
    return n = i % 4 * 6, n === 0 ? (p.push(t >> 16 & 255), p.push(t >> 8 & 255), p.push(t & 255)) : n === 18 ? (p.push(t >> 10 & 255), p.push(t >> 2 & 255)) : n === 12 && p.push(t >> 4 & 255), new Uint8Array(p);
  }
  function f(a) {
    var d = "", n = 0, l, i, o = a.length, t = c;
    for (l = 0; l < o; l++)
      l % 3 === 0 && l && (d += t[n >> 18 & 63], d += t[n >> 12 & 63], d += t[n >> 6 & 63], d += t[n & 63]), n = (n << 8) + a[l];
    return i = o % 3, i === 0 ? (d += t[n >> 18 & 63], d += t[n >> 12 & 63], d += t[n >> 6 & 63], d += t[n & 63]) : i === 2 ? (d += t[n >> 10 & 63], d += t[n >> 4 & 63], d += t[n << 2 & 63], d += t[64]) : i === 1 && (d += t[n >> 2 & 63], d += t[n << 4 & 63], d += t[64], d += t[64]), d;
  }
  function s(a) {
    return Object.prototype.toString.call(a) === "[object Uint8Array]";
  }
  return ei = new r("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: h,
    construct: u,
    predicate: s,
    represent: f
  }), ei;
}
var ti, Vo;
function Jl() {
  if (Vo) return ti;
  Vo = 1;
  var r = je(), c = Object.prototype.hasOwnProperty, h = Object.prototype.toString;
  function u(s) {
    if (s === null) return !0;
    var a = [], d, n, l, i, o, t = s;
    for (d = 0, n = t.length; d < n; d += 1) {
      if (l = t[d], o = !1, h.call(l) !== "[object Object]") return !1;
      for (i in l)
        if (c.call(l, i))
          if (!o) o = !0;
          else return !1;
      if (!o) return !1;
      if (a.indexOf(i) === -1) a.push(i);
      else return !1;
    }
    return !0;
  }
  function f(s) {
    return s !== null ? s : [];
  }
  return ti = new r("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: u,
    construct: f
  }), ti;
}
var ri, Wo;
function Ql() {
  if (Wo) return ri;
  Wo = 1;
  var r = je(), c = Object.prototype.toString;
  function h(f) {
    if (f === null) return !0;
    var s, a, d, n, l, i = f;
    for (l = new Array(i.length), s = 0, a = i.length; s < a; s += 1) {
      if (d = i[s], c.call(d) !== "[object Object]" || (n = Object.keys(d), n.length !== 1)) return !1;
      l[s] = [n[0], d[n[0]]];
    }
    return !0;
  }
  function u(f) {
    if (f === null) return [];
    var s, a, d, n, l, i = f;
    for (l = new Array(i.length), s = 0, a = i.length; s < a; s += 1)
      d = i[s], n = Object.keys(d), l[s] = [n[0], d[n[0]]];
    return l;
  }
  return ri = new r("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: h,
    construct: u
  }), ri;
}
var ni, Yo;
function Zl() {
  if (Yo) return ni;
  Yo = 1;
  var r = je(), c = Object.prototype.hasOwnProperty;
  function h(f) {
    if (f === null) return !0;
    var s, a = f;
    for (s in a)
      if (c.call(a, s) && a[s] !== null)
        return !1;
    return !0;
  }
  function u(f) {
    return f !== null ? f : {};
  }
  return ni = new r("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: h,
    construct: u
  }), ni;
}
var ii, zo;
function ia() {
  return zo || (zo = 1, ii = Yl().extend({
    implicit: [
      zl(),
      Xl()
    ],
    explicit: [
      Kl(),
      Jl(),
      Ql(),
      Zl()
    ]
  })), ii;
}
var Xo;
function Qc() {
  if (Xo) return $r;
  Xo = 1;
  var r = yr(), c = wr(), h = Jc(), u = ia(), f = Object.prototype.hasOwnProperty, s = 1, a = 2, d = 3, n = 4, l = 1, i = 2, o = 3, t = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, p = /[\x85\u2028\u2029]/, g = /[,\[\]\{\}]/, y = /^(?:!|!!|![a-z\-]+!)$/i, m = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function S(e) {
    return Object.prototype.toString.call(e);
  }
  function C(e) {
    return e === 10 || e === 13;
  }
  function D(e) {
    return e === 9 || e === 32;
  }
  function O(e) {
    return e === 9 || e === 32 || e === 10 || e === 13;
  }
  function I(e) {
    return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
  }
  function R(e) {
    var B;
    return 48 <= e && e <= 57 ? e - 48 : (B = e | 32, 97 <= B && B <= 102 ? B - 97 + 10 : -1);
  }
  function w(e) {
    return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
  }
  function A(e) {
    return 48 <= e && e <= 57 ? e - 48 : -1;
  }
  function E(e) {
    return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
  }
  function $(e) {
    return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
      (e - 65536 >> 10) + 55296,
      (e - 65536 & 1023) + 56320
    );
  }
  for (var F = new Array(256), x = new Array(256), q = 0; q < 256; q++)
    F[q] = E(q) ? 1 : 0, x[q] = E(q);
  function N(e, B) {
    this.input = e, this.filename = B.filename || null, this.schema = B.schema || u, this.onWarning = B.onWarning || null, this.legacy = B.legacy || !1, this.json = B.json || !1, this.listener = B.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.firstTabInLine = -1, this.documents = [];
  }
  function P(e, B) {
    var G = {
      name: e.filename,
      buffer: e.input.slice(0, -1),
      // omit trailing \0
      position: e.position,
      line: e.line,
      column: e.position - e.lineStart
    };
    return G.snippet = h(G), new c(B, G);
  }
  function U(e, B) {
    throw P(e, B);
  }
  function M(e, B) {
    e.onWarning && e.onWarning.call(null, P(e, B));
  }
  var J = {
    YAML: function(B, G, re) {
      var W, te, Z;
      B.version !== null && U(B, "duplication of %YAML directive"), re.length !== 1 && U(B, "YAML directive accepts exactly one argument"), W = /^([0-9]+)\.([0-9]+)$/.exec(re[0]), W === null && U(B, "ill-formed argument of the YAML directive"), te = parseInt(W[1], 10), Z = parseInt(W[2], 10), te !== 1 && U(B, "unacceptable YAML version of the document"), B.version = re[0], B.checkLineBreaks = Z < 2, Z !== 1 && Z !== 2 && M(B, "unsupported YAML version of the document");
    },
    TAG: function(B, G, re) {
      var W, te;
      re.length !== 2 && U(B, "TAG directive accepts exactly two arguments"), W = re[0], te = re[1], y.test(W) || U(B, "ill-formed tag handle (first argument) of the TAG directive"), f.call(B.tagMap, W) && U(B, 'there is a previously declared suffix for "' + W + '" tag handle'), m.test(te) || U(B, "ill-formed tag prefix (second argument) of the TAG directive");
      try {
        te = decodeURIComponent(te);
      } catch {
        U(B, "tag prefix is malformed: " + te);
      }
      B.tagMap[W] = te;
    }
  };
  function V(e, B, G, re) {
    var W, te, Z, ae;
    if (B < G) {
      if (ae = e.input.slice(B, G), re)
        for (W = 0, te = ae.length; W < te; W += 1)
          Z = ae.charCodeAt(W), Z === 9 || 32 <= Z && Z <= 1114111 || U(e, "expected valid JSON character");
      else t.test(ae) && U(e, "the stream contains non-printable characters");
      e.result += ae;
    }
  }
  function ne(e, B, G, re) {
    var W, te, Z, ae;
    for (r.isObject(G) || U(e, "cannot merge mappings; the provided source object is unacceptable"), W = Object.keys(G), Z = 0, ae = W.length; Z < ae; Z += 1)
      te = W[Z], f.call(B, te) || (B[te] = G[te], re[te] = !0);
  }
  function ce(e, B, G, re, W, te, Z, ae, ge) {
    var ve, Te;
    if (Array.isArray(W))
      for (W = Array.prototype.slice.call(W), ve = 0, Te = W.length; ve < Te; ve += 1)
        Array.isArray(W[ve]) && U(e, "nested arrays are not supported inside keys"), typeof W == "object" && S(W[ve]) === "[object Object]" && (W[ve] = "[object Object]");
    if (typeof W == "object" && S(W) === "[object Object]" && (W = "[object Object]"), W = String(W), B === null && (B = {}), re === "tag:yaml.org,2002:merge")
      if (Array.isArray(te))
        for (ve = 0, Te = te.length; ve < Te; ve += 1)
          ne(e, B, te[ve], G);
      else
        ne(e, B, te, G);
    else
      !e.json && !f.call(G, W) && f.call(B, W) && (e.line = Z || e.line, e.lineStart = ae || e.lineStart, e.position = ge || e.position, U(e, "duplicated mapping key")), W === "__proto__" ? Object.defineProperty(B, W, {
        configurable: !0,
        enumerable: !0,
        writable: !0,
        value: te
      }) : B[W] = te, delete G[W];
    return B;
  }
  function ue(e) {
    var B;
    B = e.input.charCodeAt(e.position), B === 10 ? e.position++ : B === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : U(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
  }
  function ie(e, B, G) {
    for (var re = 0, W = e.input.charCodeAt(e.position); W !== 0; ) {
      for (; D(W); )
        W === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), W = e.input.charCodeAt(++e.position);
      if (B && W === 35)
        do
          W = e.input.charCodeAt(++e.position);
        while (W !== 10 && W !== 13 && W !== 0);
      if (C(W))
        for (ue(e), W = e.input.charCodeAt(e.position), re++, e.lineIndent = 0; W === 32; )
          e.lineIndent++, W = e.input.charCodeAt(++e.position);
      else
        break;
    }
    return G !== -1 && re !== 0 && e.lineIndent < G && M(e, "deficient indentation"), re;
  }
  function Se(e) {
    var B = e.position, G;
    return G = e.input.charCodeAt(B), !!((G === 45 || G === 46) && G === e.input.charCodeAt(B + 1) && G === e.input.charCodeAt(B + 2) && (B += 3, G = e.input.charCodeAt(B), G === 0 || O(G)));
  }
  function K(e, B) {
    B === 1 ? e.result += " " : B > 1 && (e.result += r.repeat(`
`, B - 1));
  }
  function Ee(e, B, G) {
    var re, W, te, Z, ae, ge, ve, Te, de = e.kind, Le = e.result, _;
    if (_ = e.input.charCodeAt(e.position), O(_) || I(_) || _ === 35 || _ === 38 || _ === 42 || _ === 33 || _ === 124 || _ === 62 || _ === 39 || _ === 34 || _ === 37 || _ === 64 || _ === 96 || (_ === 63 || _ === 45) && (W = e.input.charCodeAt(e.position + 1), O(W) || G && I(W)))
      return !1;
    for (e.kind = "scalar", e.result = "", te = Z = e.position, ae = !1; _ !== 0; ) {
      if (_ === 58) {
        if (W = e.input.charCodeAt(e.position + 1), O(W) || G && I(W))
          break;
      } else if (_ === 35) {
        if (re = e.input.charCodeAt(e.position - 1), O(re))
          break;
      } else {
        if (e.position === e.lineStart && Se(e) || G && I(_))
          break;
        if (C(_))
          if (ge = e.line, ve = e.lineStart, Te = e.lineIndent, ie(e, !1, -1), e.lineIndent >= B) {
            ae = !0, _ = e.input.charCodeAt(e.position);
            continue;
          } else {
            e.position = Z, e.line = ge, e.lineStart = ve, e.lineIndent = Te;
            break;
          }
      }
      ae && (V(e, te, Z, !1), K(e, e.line - ge), te = Z = e.position, ae = !1), D(_) || (Z = e.position + 1), _ = e.input.charCodeAt(++e.position);
    }
    return V(e, te, Z, !1), e.result ? !0 : (e.kind = de, e.result = Le, !1);
  }
  function T(e, B) {
    var G, re, W;
    if (G = e.input.charCodeAt(e.position), G !== 39)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, re = W = e.position; (G = e.input.charCodeAt(e.position)) !== 0; )
      if (G === 39)
        if (V(e, re, e.position, !0), G = e.input.charCodeAt(++e.position), G === 39)
          re = e.position, e.position++, W = e.position;
        else
          return !0;
      else C(G) ? (V(e, re, W, !0), K(e, ie(e, !1, B)), re = W = e.position) : e.position === e.lineStart && Se(e) ? U(e, "unexpected end of the document within a single quoted scalar") : (e.position++, W = e.position);
    U(e, "unexpected end of the stream within a single quoted scalar");
  }
  function v(e, B) {
    var G, re, W, te, Z, ae;
    if (ae = e.input.charCodeAt(e.position), ae !== 34)
      return !1;
    for (e.kind = "scalar", e.result = "", e.position++, G = re = e.position; (ae = e.input.charCodeAt(e.position)) !== 0; ) {
      if (ae === 34)
        return V(e, G, e.position, !0), e.position++, !0;
      if (ae === 92) {
        if (V(e, G, e.position, !0), ae = e.input.charCodeAt(++e.position), C(ae))
          ie(e, !1, B);
        else if (ae < 256 && F[ae])
          e.result += x[ae], e.position++;
        else if ((Z = w(ae)) > 0) {
          for (W = Z, te = 0; W > 0; W--)
            ae = e.input.charCodeAt(++e.position), (Z = R(ae)) >= 0 ? te = (te << 4) + Z : U(e, "expected hexadecimal character");
          e.result += $(te), e.position++;
        } else
          U(e, "unknown escape sequence");
        G = re = e.position;
      } else C(ae) ? (V(e, G, re, !0), K(e, ie(e, !1, B)), G = re = e.position) : e.position === e.lineStart && Se(e) ? U(e, "unexpected end of the document within a double quoted scalar") : (e.position++, re = e.position);
    }
    U(e, "unexpected end of the stream within a double quoted scalar");
  }
  function H(e, B) {
    var G = !0, re, W, te, Z = e.tag, ae, ge = e.anchor, ve, Te, de, Le, _, j = /* @__PURE__ */ Object.create(null), X, Y, Q, ee;
    if (ee = e.input.charCodeAt(e.position), ee === 91)
      Te = 93, _ = !1, ae = [];
    else if (ee === 123)
      Te = 125, _ = !0, ae = {};
    else
      return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = ae), ee = e.input.charCodeAt(++e.position); ee !== 0; ) {
      if (ie(e, !0, B), ee = e.input.charCodeAt(e.position), ee === Te)
        return e.position++, e.tag = Z, e.anchor = ge, e.kind = _ ? "mapping" : "sequence", e.result = ae, !0;
      G ? ee === 44 && U(e, "expected the node content, but found ','") : U(e, "missed comma between flow collection entries"), Y = X = Q = null, de = Le = !1, ee === 63 && (ve = e.input.charCodeAt(e.position + 1), O(ve) && (de = Le = !0, e.position++, ie(e, !0, B))), re = e.line, W = e.lineStart, te = e.position, xe(e, B, s, !1, !0), Y = e.tag, X = e.result, ie(e, !0, B), ee = e.input.charCodeAt(e.position), (Le || e.line === re) && ee === 58 && (de = !0, ee = e.input.charCodeAt(++e.position), ie(e, !0, B), xe(e, B, s, !1, !0), Q = e.result), _ ? ce(e, ae, j, Y, X, Q, re, W, te) : de ? ae.push(ce(e, null, j, Y, X, Q, re, W, te)) : ae.push(X), ie(e, !0, B), ee = e.input.charCodeAt(e.position), ee === 44 ? (G = !0, ee = e.input.charCodeAt(++e.position)) : G = !1;
    }
    U(e, "unexpected end of the stream within a flow collection");
  }
  function L(e, B) {
    var G, re, W = l, te = !1, Z = !1, ae = B, ge = 0, ve = !1, Te, de;
    if (de = e.input.charCodeAt(e.position), de === 124)
      re = !1;
    else if (de === 62)
      re = !0;
    else
      return !1;
    for (e.kind = "scalar", e.result = ""; de !== 0; )
      if (de = e.input.charCodeAt(++e.position), de === 43 || de === 45)
        l === W ? W = de === 43 ? o : i : U(e, "repeat of a chomping mode identifier");
      else if ((Te = A(de)) >= 0)
        Te === 0 ? U(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : Z ? U(e, "repeat of an indentation width identifier") : (ae = B + Te - 1, Z = !0);
      else
        break;
    if (D(de)) {
      do
        de = e.input.charCodeAt(++e.position);
      while (D(de));
      if (de === 35)
        do
          de = e.input.charCodeAt(++e.position);
        while (!C(de) && de !== 0);
    }
    for (; de !== 0; ) {
      for (ue(e), e.lineIndent = 0, de = e.input.charCodeAt(e.position); (!Z || e.lineIndent < ae) && de === 32; )
        e.lineIndent++, de = e.input.charCodeAt(++e.position);
      if (!Z && e.lineIndent > ae && (ae = e.lineIndent), C(de)) {
        ge++;
        continue;
      }
      if (e.lineIndent < ae) {
        W === o ? e.result += r.repeat(`
`, te ? 1 + ge : ge) : W === l && te && (e.result += `
`);
        break;
      }
      for (re ? D(de) ? (ve = !0, e.result += r.repeat(`
`, te ? 1 + ge : ge)) : ve ? (ve = !1, e.result += r.repeat(`
`, ge + 1)) : ge === 0 ? te && (e.result += " ") : e.result += r.repeat(`
`, ge) : e.result += r.repeat(`
`, te ? 1 + ge : ge), te = !0, Z = !0, ge = 0, G = e.position; !C(de) && de !== 0; )
        de = e.input.charCodeAt(++e.position);
      V(e, G, e.position, !1);
    }
    return !0;
  }
  function le(e, B) {
    var G, re = e.tag, W = e.anchor, te = [], Z, ae = !1, ge;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = te), ge = e.input.charCodeAt(e.position); ge !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, U(e, "tab characters must not be used in indentation")), !(ge !== 45 || (Z = e.input.charCodeAt(e.position + 1), !O(Z)))); ) {
      if (ae = !0, e.position++, ie(e, !0, -1) && e.lineIndent <= B) {
        te.push(null), ge = e.input.charCodeAt(e.position);
        continue;
      }
      if (G = e.line, xe(e, B, d, !1, !0), te.push(e.result), ie(e, !0, -1), ge = e.input.charCodeAt(e.position), (e.line === G || e.lineIndent > B) && ge !== 0)
        U(e, "bad indentation of a sequence entry");
      else if (e.lineIndent < B)
        break;
    }
    return ae ? (e.tag = re, e.anchor = W, e.kind = "sequence", e.result = te, !0) : !1;
  }
  function me(e, B, G) {
    var re, W, te, Z, ae, ge, ve = e.tag, Te = e.anchor, de = {}, Le = /* @__PURE__ */ Object.create(null), _ = null, j = null, X = null, Y = !1, Q = !1, ee;
    if (e.firstTabInLine !== -1) return !1;
    for (e.anchor !== null && (e.anchorMap[e.anchor] = de), ee = e.input.charCodeAt(e.position); ee !== 0; ) {
      if (!Y && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, U(e, "tab characters must not be used in indentation")), re = e.input.charCodeAt(e.position + 1), te = e.line, (ee === 63 || ee === 58) && O(re))
        ee === 63 ? (Y && (ce(e, de, Le, _, j, null, Z, ae, ge), _ = j = X = null), Q = !0, Y = !0, W = !0) : Y ? (Y = !1, W = !0) : U(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, ee = re;
      else {
        if (Z = e.line, ae = e.lineStart, ge = e.position, !xe(e, G, a, !1, !0))
          break;
        if (e.line === te) {
          for (ee = e.input.charCodeAt(e.position); D(ee); )
            ee = e.input.charCodeAt(++e.position);
          if (ee === 58)
            ee = e.input.charCodeAt(++e.position), O(ee) || U(e, "a whitespace character is expected after the key-value separator within a block mapping"), Y && (ce(e, de, Le, _, j, null, Z, ae, ge), _ = j = X = null), Q = !0, Y = !1, W = !1, _ = e.tag, j = e.result;
          else if (Q)
            U(e, "can not read an implicit mapping pair; a colon is missed");
          else
            return e.tag = ve, e.anchor = Te, !0;
        } else if (Q)
          U(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
        else
          return e.tag = ve, e.anchor = Te, !0;
      }
      if ((e.line === te || e.lineIndent > B) && (Y && (Z = e.line, ae = e.lineStart, ge = e.position), xe(e, B, n, !0, W) && (Y ? j = e.result : X = e.result), Y || (ce(e, de, Le, _, j, X, Z, ae, ge), _ = j = X = null), ie(e, !0, -1), ee = e.input.charCodeAt(e.position)), (e.line === te || e.lineIndent > B) && ee !== 0)
        U(e, "bad indentation of a mapping entry");
      else if (e.lineIndent < B)
        break;
    }
    return Y && ce(e, de, Le, _, j, null, Z, ae, ge), Q && (e.tag = ve, e.anchor = Te, e.kind = "mapping", e.result = de), Q;
  }
  function pe(e) {
    var B, G = !1, re = !1, W, te, Z;
    if (Z = e.input.charCodeAt(e.position), Z !== 33) return !1;
    if (e.tag !== null && U(e, "duplication of a tag property"), Z = e.input.charCodeAt(++e.position), Z === 60 ? (G = !0, Z = e.input.charCodeAt(++e.position)) : Z === 33 ? (re = !0, W = "!!", Z = e.input.charCodeAt(++e.position)) : W = "!", B = e.position, G) {
      do
        Z = e.input.charCodeAt(++e.position);
      while (Z !== 0 && Z !== 62);
      e.position < e.length ? (te = e.input.slice(B, e.position), Z = e.input.charCodeAt(++e.position)) : U(e, "unexpected end of the stream within a verbatim tag");
    } else {
      for (; Z !== 0 && !O(Z); )
        Z === 33 && (re ? U(e, "tag suffix cannot contain exclamation marks") : (W = e.input.slice(B - 1, e.position + 1), y.test(W) || U(e, "named tag handle cannot contain such characters"), re = !0, B = e.position + 1)), Z = e.input.charCodeAt(++e.position);
      te = e.input.slice(B, e.position), g.test(te) && U(e, "tag suffix cannot contain flow indicator characters");
    }
    te && !m.test(te) && U(e, "tag name cannot contain such characters: " + te);
    try {
      te = decodeURIComponent(te);
    } catch {
      U(e, "tag name is malformed: " + te);
    }
    return G ? e.tag = te : f.call(e.tagMap, W) ? e.tag = e.tagMap[W] + te : W === "!" ? e.tag = "!" + te : W === "!!" ? e.tag = "tag:yaml.org,2002:" + te : U(e, 'undeclared tag handle "' + W + '"'), !0;
  }
  function _e(e) {
    var B, G;
    if (G = e.input.charCodeAt(e.position), G !== 38) return !1;
    for (e.anchor !== null && U(e, "duplication of an anchor property"), G = e.input.charCodeAt(++e.position), B = e.position; G !== 0 && !O(G) && !I(G); )
      G = e.input.charCodeAt(++e.position);
    return e.position === B && U(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(B, e.position), !0;
  }
  function ye(e) {
    var B, G, re;
    if (re = e.input.charCodeAt(e.position), re !== 42) return !1;
    for (re = e.input.charCodeAt(++e.position), B = e.position; re !== 0 && !O(re) && !I(re); )
      re = e.input.charCodeAt(++e.position);
    return e.position === B && U(e, "name of an alias node must contain at least one character"), G = e.input.slice(B, e.position), f.call(e.anchorMap, G) || U(e, 'unidentified alias "' + G + '"'), e.result = e.anchorMap[G], ie(e, !0, -1), !0;
  }
  function xe(e, B, G, re, W) {
    var te, Z, ae, ge = 1, ve = !1, Te = !1, de, Le, _, j, X, Y;
    if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, te = Z = ae = n === G || d === G, re && ie(e, !0, -1) && (ve = !0, e.lineIndent > B ? ge = 1 : e.lineIndent === B ? ge = 0 : e.lineIndent < B && (ge = -1)), ge === 1)
      for (; pe(e) || _e(e); )
        ie(e, !0, -1) ? (ve = !0, ae = te, e.lineIndent > B ? ge = 1 : e.lineIndent === B ? ge = 0 : e.lineIndent < B && (ge = -1)) : ae = !1;
    if (ae && (ae = ve || W), (ge === 1 || n === G) && (s === G || a === G ? X = B : X = B + 1, Y = e.position - e.lineStart, ge === 1 ? ae && (le(e, Y) || me(e, Y, X)) || H(e, X) ? Te = !0 : (Z && L(e, X) || T(e, X) || v(e, X) ? Te = !0 : ye(e) ? (Te = !0, (e.tag !== null || e.anchor !== null) && U(e, "alias node should not have any properties")) : Ee(e, X, s === G) && (Te = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : ge === 0 && (Te = ae && le(e, Y))), e.tag === null)
      e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
    else if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && U(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), de = 0, Le = e.implicitTypes.length; de < Le; de += 1)
        if (j = e.implicitTypes[de], j.resolve(e.result)) {
          e.result = j.construct(e.result), e.tag = j.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else if (e.tag !== "!") {
      if (f.call(e.typeMap[e.kind || "fallback"], e.tag))
        j = e.typeMap[e.kind || "fallback"][e.tag];
      else
        for (j = null, _ = e.typeMap.multi[e.kind || "fallback"], de = 0, Le = _.length; de < Le; de += 1)
          if (e.tag.slice(0, _[de].tag.length) === _[de].tag) {
            j = _[de];
            break;
          }
      j || U(e, "unknown tag !<" + e.tag + ">"), e.result !== null && j.kind !== e.kind && U(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + j.kind + '", not "' + e.kind + '"'), j.resolve(e.result, e.tag) ? (e.result = j.construct(e.result, e.tag), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : U(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
    }
    return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || Te;
  }
  function Ce(e) {
    var B = e.position, G, re, W, te = !1, Z;
    for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (Z = e.input.charCodeAt(e.position)) !== 0 && (ie(e, !0, -1), Z = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || Z !== 37)); ) {
      for (te = !0, Z = e.input.charCodeAt(++e.position), G = e.position; Z !== 0 && !O(Z); )
        Z = e.input.charCodeAt(++e.position);
      for (re = e.input.slice(G, e.position), W = [], re.length < 1 && U(e, "directive name must not be less than one character in length"); Z !== 0; ) {
        for (; D(Z); )
          Z = e.input.charCodeAt(++e.position);
        if (Z === 35) {
          do
            Z = e.input.charCodeAt(++e.position);
          while (Z !== 0 && !C(Z));
          break;
        }
        if (C(Z)) break;
        for (G = e.position; Z !== 0 && !O(Z); )
          Z = e.input.charCodeAt(++e.position);
        W.push(e.input.slice(G, e.position));
      }
      Z !== 0 && ue(e), f.call(J, re) ? J[re](e, re, W) : M(e, 'unknown document directive "' + re + '"');
    }
    if (ie(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ie(e, !0, -1)) : te && U(e, "directives end mark is expected"), xe(e, e.lineIndent - 1, n, !1, !0), ie(e, !0, -1), e.checkLineBreaks && p.test(e.input.slice(B, e.position)) && M(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Se(e)) {
      e.input.charCodeAt(e.position) === 46 && (e.position += 3, ie(e, !0, -1));
      return;
    }
    if (e.position < e.length - 1)
      U(e, "end of the stream or a document separator is expected");
    else
      return;
  }
  function qe(e, B) {
    e = String(e), B = B || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
    var G = new N(e, B), re = e.indexOf("\0");
    for (re !== -1 && (G.position = re, U(G, "null byte is not allowed in input")), G.input += "\0"; G.input.charCodeAt(G.position) === 32; )
      G.lineIndent += 1, G.position += 1;
    for (; G.position < G.length - 1; )
      Ce(G);
    return G.documents;
  }
  function vt(e, B, G) {
    B !== null && typeof B == "object" && typeof G > "u" && (G = B, B = null);
    var re = qe(e, G);
    if (typeof B != "function")
      return re;
    for (var W = 0, te = re.length; W < te; W += 1)
      B(re[W]);
  }
  function at(e, B) {
    var G = qe(e, B);
    if (G.length !== 0) {
      if (G.length === 1)
        return G[0];
      throw new c("expected a single document in the stream, but found more");
    }
  }
  return $r.loadAll = vt, $r.load = at, $r;
}
var ai = {}, Ko;
function Zc() {
  if (Ko) return ai;
  Ko = 1;
  var r = yr(), c = wr(), h = ia(), u = Object.prototype.toString, f = Object.prototype.hasOwnProperty, s = 65279, a = 9, d = 10, n = 13, l = 32, i = 33, o = 34, t = 35, p = 37, g = 38, y = 39, m = 42, S = 44, C = 45, D = 58, O = 61, I = 62, R = 63, w = 64, A = 91, E = 93, $ = 96, F = 123, x = 124, q = 125, N = {};
  N[0] = "\\0", N[7] = "\\a", N[8] = "\\b", N[9] = "\\t", N[10] = "\\n", N[11] = "\\v", N[12] = "\\f", N[13] = "\\r", N[27] = "\\e", N[34] = '\\"', N[92] = "\\\\", N[133] = "\\N", N[160] = "\\_", N[8232] = "\\L", N[8233] = "\\P";
  var P = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ], U = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function M(_, j) {
    var X, Y, Q, ee, fe, oe, he;
    if (j === null) return {};
    for (X = {}, Y = Object.keys(j), Q = 0, ee = Y.length; Q < ee; Q += 1)
      fe = Y[Q], oe = String(j[fe]), fe.slice(0, 2) === "!!" && (fe = "tag:yaml.org,2002:" + fe.slice(2)), he = _.compiledTypeMap.fallback[fe], he && f.call(he.styleAliases, oe) && (oe = he.styleAliases[oe]), X[fe] = oe;
    return X;
  }
  function J(_) {
    var j, X, Y;
    if (j = _.toString(16).toUpperCase(), _ <= 255)
      X = "x", Y = 2;
    else if (_ <= 65535)
      X = "u", Y = 4;
    else if (_ <= 4294967295)
      X = "U", Y = 8;
    else
      throw new c("code point within a string may not be greater than 0xFFFFFFFF");
    return "\\" + X + r.repeat("0", Y - j.length) + j;
  }
  var V = 1, ne = 2;
  function ce(_) {
    this.schema = _.schema || h, this.indent = Math.max(1, _.indent || 2), this.noArrayIndent = _.noArrayIndent || !1, this.skipInvalid = _.skipInvalid || !1, this.flowLevel = r.isNothing(_.flowLevel) ? -1 : _.flowLevel, this.styleMap = M(this.schema, _.styles || null), this.sortKeys = _.sortKeys || !1, this.lineWidth = _.lineWidth || 80, this.noRefs = _.noRefs || !1, this.noCompatMode = _.noCompatMode || !1, this.condenseFlow = _.condenseFlow || !1, this.quotingType = _.quotingType === '"' ? ne : V, this.forceQuotes = _.forceQuotes || !1, this.replacer = typeof _.replacer == "function" ? _.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
  }
  function ue(_, j) {
    for (var X = r.repeat(" ", j), Y = 0, Q = -1, ee = "", fe, oe = _.length; Y < oe; )
      Q = _.indexOf(`
`, Y), Q === -1 ? (fe = _.slice(Y), Y = oe) : (fe = _.slice(Y, Q + 1), Y = Q + 1), fe.length && fe !== `
` && (ee += X), ee += fe;
    return ee;
  }
  function ie(_, j) {
    return `
` + r.repeat(" ", _.indent * j);
  }
  function Se(_, j) {
    var X, Y, Q;
    for (X = 0, Y = _.implicitTypes.length; X < Y; X += 1)
      if (Q = _.implicitTypes[X], Q.resolve(j))
        return !0;
    return !1;
  }
  function K(_) {
    return _ === l || _ === a;
  }
  function Ee(_) {
    return 32 <= _ && _ <= 126 || 161 <= _ && _ <= 55295 && _ !== 8232 && _ !== 8233 || 57344 <= _ && _ <= 65533 && _ !== s || 65536 <= _ && _ <= 1114111;
  }
  function T(_) {
    return Ee(_) && _ !== s && _ !== n && _ !== d;
  }
  function v(_, j, X) {
    var Y = T(_), Q = Y && !K(_);
    return (
      // ns-plain-safe
      (X ? (
        // c = flow-in
        Y
      ) : Y && _ !== S && _ !== A && _ !== E && _ !== F && _ !== q) && _ !== t && !(j === D && !Q) || T(j) && !K(j) && _ === t || j === D && Q
    );
  }
  function H(_) {
    return Ee(_) && _ !== s && !K(_) && _ !== C && _ !== R && _ !== D && _ !== S && _ !== A && _ !== E && _ !== F && _ !== q && _ !== t && _ !== g && _ !== m && _ !== i && _ !== x && _ !== O && _ !== I && _ !== y && _ !== o && _ !== p && _ !== w && _ !== $;
  }
  function L(_) {
    return !K(_) && _ !== D;
  }
  function le(_, j) {
    var X = _.charCodeAt(j), Y;
    return X >= 55296 && X <= 56319 && j + 1 < _.length && (Y = _.charCodeAt(j + 1), Y >= 56320 && Y <= 57343) ? (X - 55296) * 1024 + Y - 56320 + 65536 : X;
  }
  function me(_) {
    var j = /^\n* /;
    return j.test(_);
  }
  var pe = 1, _e = 2, ye = 3, xe = 4, Ce = 5;
  function qe(_, j, X, Y, Q, ee, fe, oe) {
    var he, we = 0, be = null, Pe = !1, Re = !1, Ft = Y !== -1, Je = -1, Et = H(le(_, 0)) && L(le(_, _.length - 1));
    if (j || fe)
      for (he = 0; he < _.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(_, he), !Ee(we))
          return Ce;
        Et = Et && v(we, be, oe), be = we;
      }
    else {
      for (he = 0; he < _.length; we >= 65536 ? he += 2 : he++) {
        if (we = le(_, he), we === d)
          Pe = !0, Ft && (Re = Re || // Foldable line = too long, and not more-indented.
          he - Je - 1 > Y && _[Je + 1] !== " ", Je = he);
        else if (!Ee(we))
          return Ce;
        Et = Et && v(we, be, oe), be = we;
      }
      Re = Re || Ft && he - Je - 1 > Y && _[Je + 1] !== " ";
    }
    return !Pe && !Re ? Et && !fe && !Q(_) ? pe : ee === ne ? Ce : _e : X > 9 && me(_) ? Ce : fe ? ee === ne ? Ce : _e : Re ? xe : ye;
  }
  function vt(_, j, X, Y, Q) {
    _.dump = function() {
      if (j.length === 0)
        return _.quotingType === ne ? '""' : "''";
      if (!_.noCompatMode && (P.indexOf(j) !== -1 || U.test(j)))
        return _.quotingType === ne ? '"' + j + '"' : "'" + j + "'";
      var ee = _.indent * Math.max(1, X), fe = _.lineWidth === -1 ? -1 : Math.max(Math.min(_.lineWidth, 40), _.lineWidth - ee), oe = Y || _.flowLevel > -1 && X >= _.flowLevel;
      function he(we) {
        return Se(_, we);
      }
      switch (qe(
        j,
        oe,
        _.indent,
        fe,
        he,
        _.quotingType,
        _.forceQuotes && !Y,
        Q
      )) {
        case pe:
          return j;
        case _e:
          return "'" + j.replace(/'/g, "''") + "'";
        case ye:
          return "|" + at(j, _.indent) + e(ue(j, ee));
        case xe:
          return ">" + at(j, _.indent) + e(ue(B(j, fe), ee));
        case Ce:
          return '"' + re(j) + '"';
        default:
          throw new c("impossible error: invalid scalar style");
      }
    }();
  }
  function at(_, j) {
    var X = me(_) ? String(j) : "", Y = _[_.length - 1] === `
`, Q = Y && (_[_.length - 2] === `
` || _ === `
`), ee = Q ? "+" : Y ? "" : "-";
    return X + ee + `
`;
  }
  function e(_) {
    return _[_.length - 1] === `
` ? _.slice(0, -1) : _;
  }
  function B(_, j) {
    for (var X = /(\n+)([^\n]*)/g, Y = function() {
      var we = _.indexOf(`
`);
      return we = we !== -1 ? we : _.length, X.lastIndex = we, G(_.slice(0, we), j);
    }(), Q = _[0] === `
` || _[0] === " ", ee, fe; fe = X.exec(_); ) {
      var oe = fe[1], he = fe[2];
      ee = he[0] === " ", Y += oe + (!Q && !ee && he !== "" ? `
` : "") + G(he, j), Q = ee;
    }
    return Y;
  }
  function G(_, j) {
    if (_ === "" || _[0] === " ") return _;
    for (var X = / [^ ]/g, Y, Q = 0, ee, fe = 0, oe = 0, he = ""; Y = X.exec(_); )
      oe = Y.index, oe - Q > j && (ee = fe > Q ? fe : oe, he += `
` + _.slice(Q, ee), Q = ee + 1), fe = oe;
    return he += `
`, _.length - Q > j && fe > Q ? he += _.slice(Q, fe) + `
` + _.slice(fe + 1) : he += _.slice(Q), he.slice(1);
  }
  function re(_) {
    for (var j = "", X = 0, Y, Q = 0; Q < _.length; X >= 65536 ? Q += 2 : Q++)
      X = le(_, Q), Y = N[X], !Y && Ee(X) ? (j += _[Q], X >= 65536 && (j += _[Q + 1])) : j += Y || J(X);
    return j;
  }
  function W(_, j, X) {
    var Y = "", Q = _.tag, ee, fe, oe;
    for (ee = 0, fe = X.length; ee < fe; ee += 1)
      oe = X[ee], _.replacer && (oe = _.replacer.call(X, String(ee), oe)), (ve(_, j, oe, !1, !1) || typeof oe > "u" && ve(_, j, null, !1, !1)) && (Y !== "" && (Y += "," + (_.condenseFlow ? "" : " ")), Y += _.dump);
    _.tag = Q, _.dump = "[" + Y + "]";
  }
  function te(_, j, X, Y) {
    var Q = "", ee = _.tag, fe, oe, he;
    for (fe = 0, oe = X.length; fe < oe; fe += 1)
      he = X[fe], _.replacer && (he = _.replacer.call(X, String(fe), he)), (ve(_, j + 1, he, !0, !0, !1, !0) || typeof he > "u" && ve(_, j + 1, null, !0, !0, !1, !0)) && ((!Y || Q !== "") && (Q += ie(_, j)), _.dump && d === _.dump.charCodeAt(0) ? Q += "-" : Q += "- ", Q += _.dump);
    _.tag = ee, _.dump = Q || "[]";
  }
  function Z(_, j, X) {
    var Y = "", Q = _.tag, ee = Object.keys(X), fe, oe, he, we, be;
    for (fe = 0, oe = ee.length; fe < oe; fe += 1)
      be = "", Y !== "" && (be += ", "), _.condenseFlow && (be += '"'), he = ee[fe], we = X[he], _.replacer && (we = _.replacer.call(X, he, we)), ve(_, j, he, !1, !1) && (_.dump.length > 1024 && (be += "? "), be += _.dump + (_.condenseFlow ? '"' : "") + ":" + (_.condenseFlow ? "" : " "), ve(_, j, we, !1, !1) && (be += _.dump, Y += be));
    _.tag = Q, _.dump = "{" + Y + "}";
  }
  function ae(_, j, X, Y) {
    var Q = "", ee = _.tag, fe = Object.keys(X), oe, he, we, be, Pe, Re;
    if (_.sortKeys === !0)
      fe.sort();
    else if (typeof _.sortKeys == "function")
      fe.sort(_.sortKeys);
    else if (_.sortKeys)
      throw new c("sortKeys must be a boolean or a function");
    for (oe = 0, he = fe.length; oe < he; oe += 1)
      Re = "", (!Y || Q !== "") && (Re += ie(_, j)), we = fe[oe], be = X[we], _.replacer && (be = _.replacer.call(X, we, be)), ve(_, j + 1, we, !0, !0, !0) && (Pe = _.tag !== null && _.tag !== "?" || _.dump && _.dump.length > 1024, Pe && (_.dump && d === _.dump.charCodeAt(0) ? Re += "?" : Re += "? "), Re += _.dump, Pe && (Re += ie(_, j)), ve(_, j + 1, be, !0, Pe) && (_.dump && d === _.dump.charCodeAt(0) ? Re += ":" : Re += ": ", Re += _.dump, Q += Re));
    _.tag = ee, _.dump = Q || "{}";
  }
  function ge(_, j, X) {
    var Y, Q, ee, fe, oe, he;
    for (Q = X ? _.explicitTypes : _.implicitTypes, ee = 0, fe = Q.length; ee < fe; ee += 1)
      if (oe = Q[ee], (oe.instanceOf || oe.predicate) && (!oe.instanceOf || typeof j == "object" && j instanceof oe.instanceOf) && (!oe.predicate || oe.predicate(j))) {
        if (X ? oe.multi && oe.representName ? _.tag = oe.representName(j) : _.tag = oe.tag : _.tag = "?", oe.represent) {
          if (he = _.styleMap[oe.tag] || oe.defaultStyle, u.call(oe.represent) === "[object Function]")
            Y = oe.represent(j, he);
          else if (f.call(oe.represent, he))
            Y = oe.represent[he](j, he);
          else
            throw new c("!<" + oe.tag + '> tag resolver accepts not "' + he + '" style');
          _.dump = Y;
        }
        return !0;
      }
    return !1;
  }
  function ve(_, j, X, Y, Q, ee, fe) {
    _.tag = null, _.dump = X, ge(_, X, !1) || ge(_, X, !0);
    var oe = u.call(_.dump), he = Y, we;
    Y && (Y = _.flowLevel < 0 || _.flowLevel > j);
    var be = oe === "[object Object]" || oe === "[object Array]", Pe, Re;
    if (be && (Pe = _.duplicates.indexOf(X), Re = Pe !== -1), (_.tag !== null && _.tag !== "?" || Re || _.indent !== 2 && j > 0) && (Q = !1), Re && _.usedDuplicates[Pe])
      _.dump = "*ref_" + Pe;
    else {
      if (be && Re && !_.usedDuplicates[Pe] && (_.usedDuplicates[Pe] = !0), oe === "[object Object]")
        Y && Object.keys(_.dump).length !== 0 ? (ae(_, j, _.dump, Q), Re && (_.dump = "&ref_" + Pe + _.dump)) : (Z(_, j, _.dump), Re && (_.dump = "&ref_" + Pe + " " + _.dump));
      else if (oe === "[object Array]")
        Y && _.dump.length !== 0 ? (_.noArrayIndent && !fe && j > 0 ? te(_, j - 1, _.dump, Q) : te(_, j, _.dump, Q), Re && (_.dump = "&ref_" + Pe + _.dump)) : (W(_, j, _.dump), Re && (_.dump = "&ref_" + Pe + " " + _.dump));
      else if (oe === "[object String]")
        _.tag !== "?" && vt(_, _.dump, j, ee, he);
      else {
        if (oe === "[object Undefined]")
          return !1;
        if (_.skipInvalid) return !1;
        throw new c("unacceptable kind of an object to dump " + oe);
      }
      _.tag !== null && _.tag !== "?" && (we = encodeURI(
        _.tag[0] === "!" ? _.tag.slice(1) : _.tag
      ).replace(/!/g, "%21"), _.tag[0] === "!" ? we = "!" + we : we.slice(0, 18) === "tag:yaml.org,2002:" ? we = "!!" + we.slice(18) : we = "!<" + we + ">", _.dump = we + " " + _.dump);
    }
    return !0;
  }
  function Te(_, j) {
    var X = [], Y = [], Q, ee;
    for (de(_, X, Y), Q = 0, ee = Y.length; Q < ee; Q += 1)
      j.duplicates.push(X[Y[Q]]);
    j.usedDuplicates = new Array(ee);
  }
  function de(_, j, X) {
    var Y, Q, ee;
    if (_ !== null && typeof _ == "object")
      if (Q = j.indexOf(_), Q !== -1)
        X.indexOf(Q) === -1 && X.push(Q);
      else if (j.push(_), Array.isArray(_))
        for (Q = 0, ee = _.length; Q < ee; Q += 1)
          de(_[Q], j, X);
      else
        for (Y = Object.keys(_), Q = 0, ee = Y.length; Q < ee; Q += 1)
          de(_[Y[Q]], j, X);
  }
  function Le(_, j) {
    j = j || {};
    var X = new ce(j);
    X.noRefs || Te(_, X);
    var Y = _;
    return X.replacer && (Y = X.replacer.call({ "": Y }, "", Y)), ve(X, 0, Y, !0, !0) ? X.dump + `
` : "";
  }
  return ai.dump = Le, ai;
}
var Jo;
function aa() {
  if (Jo) return He;
  Jo = 1;
  var r = Qc(), c = Zc();
  function h(u, f) {
    return function() {
      throw new Error("Function yaml." + u + " is removed in js-yaml 4. Use yaml." + f + " instead, which is now safe by default.");
    };
  }
  return He.Type = je(), He.Schema = $l(), He.FAILSAFE_SCHEMA = Bl(), He.JSON_SCHEMA = Wl(), He.CORE_SCHEMA = Yl(), He.DEFAULT_SCHEMA = ia(), He.load = r.load, He.loadAll = r.loadAll, He.dump = c.dump, He.YAMLException = wr(), He.types = {
    binary: Kl(),
    float: Vl(),
    map: Ml(),
    null: Hl(),
    pairs: Ql(),
    set: Zl(),
    timestamp: zl(),
    bool: jl(),
    int: Gl(),
    merge: Xl(),
    omap: Jl(),
    seq: ql(),
    str: kl()
  }, He.safeLoad = h("safeLoad", "load"), He.safeLoadAll = h("safeLoadAll", "loadAll"), He.safeDump = h("safeDump", "dump"), He;
}
var Jt = {}, Qo;
function ef() {
  if (Qo) return Jt;
  Qo = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.Lazy = void 0;
  class r {
    constructor(h) {
      this._value = null, this.creator = h;
    }
    get hasValue() {
      return this.creator == null;
    }
    get value() {
      if (this.creator == null)
        return this._value;
      const h = this.creator();
      return this.value = h, h;
    }
    set value(h) {
      this._value = h, this.creator = null;
    }
  }
  return Jt.Lazy = r, Jt;
}
var kr = { exports: {} }, oi, Zo;
function Wr() {
  if (Zo) return oi;
  Zo = 1;
  const r = "2.0.0", c = 256, h = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
  9007199254740991, u = 16, f = c - 6;
  return oi = {
    MAX_LENGTH: c,
    MAX_SAFE_COMPONENT_LENGTH: u,
    MAX_SAFE_BUILD_LENGTH: f,
    MAX_SAFE_INTEGER: h,
    RELEASE_TYPES: [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ],
    SEMVER_SPEC_VERSION: r,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2
  }, oi;
}
var si, es;
function Yr() {
  return es || (es = 1, si = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...c) => console.error("SEMVER", ...c) : () => {
  }), si;
}
var ts;
function _r() {
  return ts || (ts = 1, function(r, c) {
    const {
      MAX_SAFE_COMPONENT_LENGTH: h,
      MAX_SAFE_BUILD_LENGTH: u,
      MAX_LENGTH: f
    } = Wr(), s = Yr();
    c = r.exports = {};
    const a = c.re = [], d = c.safeRe = [], n = c.src = [], l = c.safeSrc = [], i = c.t = {};
    let o = 0;
    const t = "[a-zA-Z0-9-]", p = [
      ["\\s", 1],
      ["\\d", f],
      [t, u]
    ], g = (m) => {
      for (const [S, C] of p)
        m = m.split(`${S}*`).join(`${S}{0,${C}}`).split(`${S}+`).join(`${S}{1,${C}}`);
      return m;
    }, y = (m, S, C) => {
      const D = g(S), O = o++;
      s(m, O, S), i[m] = O, n[O] = S, l[O] = D, a[O] = new RegExp(S, C ? "g" : void 0), d[O] = new RegExp(D, C ? "g" : void 0);
    };
    y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${t}*`), y("MAINVERSION", `(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})\\.(${n[i.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})\\.(${n[i.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${n[i.NUMERICIDENTIFIER]}|${n[i.NONNUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${n[i.NUMERICIDENTIFIERLOOSE]}|${n[i.NONNUMERICIDENTIFIER]})`), y("PRERELEASE", `(?:-(${n[i.PRERELEASEIDENTIFIER]}(?:\\.${n[i.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${n[i.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${n[i.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${t}+`), y("BUILD", `(?:\\+(${n[i.BUILDIDENTIFIER]}(?:\\.${n[i.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${n[i.MAINVERSION]}${n[i.PRERELEASE]}?${n[i.BUILD]}?`), y("FULL", `^${n[i.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${n[i.MAINVERSIONLOOSE]}${n[i.PRERELEASELOOSE]}?${n[i.BUILD]}?`), y("LOOSE", `^${n[i.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${n[i.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${n[i.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:\\.(${n[i.XRANGEIDENTIFIER]})(?:${n[i.PRERELEASE]})?${n[i.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:\\.(${n[i.XRANGEIDENTIFIERLOOSE]})(?:${n[i.PRERELEASELOOSE]})?${n[i.BUILD]}?)?)?`), y("XRANGE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${n[i.GTLT]}\\s*${n[i.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${h}})(?:\\.(\\d{1,${h}}))?(?:\\.(\\d{1,${h}}))?`), y("COERCE", `${n[i.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", n[i.COERCEPLAIN] + `(?:${n[i.PRERELEASE]})?(?:${n[i.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", n[i.COERCE], !0), y("COERCERTLFULL", n[i.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${n[i.LONETILDE]}\\s+`, !0), c.tildeTrimReplace = "$1~", y("TILDE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${n[i.LONETILDE]}${n[i.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${n[i.LONECARET]}\\s+`, !0), c.caretTrimReplace = "$1^", y("CARET", `^${n[i.LONECARET]}${n[i.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${n[i.LONECARET]}${n[i.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${n[i.GTLT]}\\s*(${n[i.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${n[i.GTLT]}\\s*(${n[i.LOOSEPLAIN]}|${n[i.XRANGEPLAIN]})`, !0), c.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${n[i.XRANGEPLAIN]})\\s+-\\s+(${n[i.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${n[i.XRANGEPLAINLOOSE]})\\s+-\\s+(${n[i.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }(kr, kr.exports)), kr.exports;
}
var li, rs;
function oa() {
  if (rs) return li;
  rs = 1;
  const r = Object.freeze({ loose: !0 }), c = Object.freeze({});
  return li = (u) => u ? typeof u != "object" ? r : u : c, li;
}
var ui, ns;
function eu() {
  if (ns) return ui;
  ns = 1;
  const r = /^[0-9]+$/, c = (u, f) => {
    const s = r.test(u), a = r.test(f);
    return s && a && (u = +u, f = +f), u === f ? 0 : s && !a ? -1 : a && !s ? 1 : u < f ? -1 : 1;
  };
  return ui = {
    compareIdentifiers: c,
    rcompareIdentifiers: (u, f) => c(f, u)
  }, ui;
}
var ci, is;
function Ge() {
  if (is) return ci;
  is = 1;
  const r = Yr(), { MAX_LENGTH: c, MAX_SAFE_INTEGER: h } = Wr(), { safeRe: u, safeSrc: f, t: s } = _r(), a = oa(), { compareIdentifiers: d } = eu();
  class n {
    constructor(i, o) {
      if (o = a(o), i instanceof n) {
        if (i.loose === !!o.loose && i.includePrerelease === !!o.includePrerelease)
          return i;
        i = i.version;
      } else if (typeof i != "string")
        throw new TypeError(`Invalid version. Must be a string. Got type "${typeof i}".`);
      if (i.length > c)
        throw new TypeError(
          `version is longer than ${c} characters`
        );
      r("SemVer", i, o), this.options = o, this.loose = !!o.loose, this.includePrerelease = !!o.includePrerelease;
      const t = i.trim().match(o.loose ? u[s.LOOSE] : u[s.FULL]);
      if (!t)
        throw new TypeError(`Invalid Version: ${i}`);
      if (this.raw = i, this.major = +t[1], this.minor = +t[2], this.patch = +t[3], this.major > h || this.major < 0)
        throw new TypeError("Invalid major version");
      if (this.minor > h || this.minor < 0)
        throw new TypeError("Invalid minor version");
      if (this.patch > h || this.patch < 0)
        throw new TypeError("Invalid patch version");
      t[4] ? this.prerelease = t[4].split(".").map((p) => {
        if (/^[0-9]+$/.test(p)) {
          const g = +p;
          if (g >= 0 && g < h)
            return g;
        }
        return p;
      }) : this.prerelease = [], this.build = t[5] ? t[5].split(".") : [], this.format();
    }
    format() {
      return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
    }
    toString() {
      return this.version;
    }
    compare(i) {
      if (r("SemVer.compare", this.version, this.options, i), !(i instanceof n)) {
        if (typeof i == "string" && i === this.version)
          return 0;
        i = new n(i, this.options);
      }
      return i.version === this.version ? 0 : this.compareMain(i) || this.comparePre(i);
    }
    compareMain(i) {
      return i instanceof n || (i = new n(i, this.options)), d(this.major, i.major) || d(this.minor, i.minor) || d(this.patch, i.patch);
    }
    comparePre(i) {
      if (i instanceof n || (i = new n(i, this.options)), this.prerelease.length && !i.prerelease.length)
        return -1;
      if (!this.prerelease.length && i.prerelease.length)
        return 1;
      if (!this.prerelease.length && !i.prerelease.length)
        return 0;
      let o = 0;
      do {
        const t = this.prerelease[o], p = i.prerelease[o];
        if (r("prerelease compare", o, t, p), t === void 0 && p === void 0)
          return 0;
        if (p === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === p)
          continue;
        return d(t, p);
      } while (++o);
    }
    compareBuild(i) {
      i instanceof n || (i = new n(i, this.options));
      let o = 0;
      do {
        const t = this.build[o], p = i.build[o];
        if (r("build compare", o, t, p), t === void 0 && p === void 0)
          return 0;
        if (p === void 0)
          return 1;
        if (t === void 0)
          return -1;
        if (t === p)
          continue;
        return d(t, p);
      } while (++o);
    }
    // preminor will bump the version up to the next minor release, and immediately
    // down to pre-release. premajor and prepatch work the same way.
    inc(i, o, t) {
      if (i.startsWith("pre")) {
        if (!o && t === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (o) {
          const p = new RegExp(`^${this.options.loose ? f[s.PRERELEASELOOSE] : f[s.PRERELEASE]}$`), g = `-${o}`.match(p);
          if (!g || g[1] !== o)
            throw new Error(`invalid identifier: ${o}`);
        }
      }
      switch (i) {
        case "premajor":
          this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", o, t);
          break;
        case "preminor":
          this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", o, t);
          break;
        case "prepatch":
          this.prerelease.length = 0, this.inc("patch", o, t), this.inc("pre", o, t);
          break;
        // If the input is a non-prerelease version, this acts the same as
        // prepatch.
        case "prerelease":
          this.prerelease.length === 0 && this.inc("patch", o, t), this.inc("pre", o, t);
          break;
        case "release":
          if (this.prerelease.length === 0)
            throw new Error(`version ${this.raw} is not a prerelease`);
          this.prerelease.length = 0;
          break;
        case "major":
          (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
          break;
        case "minor":
          (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
          break;
        case "patch":
          this.prerelease.length === 0 && this.patch++, this.prerelease = [];
          break;
        // This probably shouldn't be used publicly.
        // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
        case "pre": {
          const p = Number(t) ? 1 : 0;
          if (this.prerelease.length === 0)
            this.prerelease = [p];
          else {
            let g = this.prerelease.length;
            for (; --g >= 0; )
              typeof this.prerelease[g] == "number" && (this.prerelease[g]++, g = -2);
            if (g === -1) {
              if (o === this.prerelease.join(".") && t === !1)
                throw new Error("invalid increment argument: identifier already exists");
              this.prerelease.push(p);
            }
          }
          if (o) {
            let g = [o, p];
            t === !1 && (g = [o]), d(this.prerelease[0], o) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = g) : this.prerelease = g;
          }
          break;
        }
        default:
          throw new Error(`invalid increment argument: ${i}`);
      }
      return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
    }
  }
  return ci = n, ci;
}
var fi, as;
function jt() {
  if (as) return fi;
  as = 1;
  const r = Ge();
  return fi = (h, u, f = !1) => {
    if (h instanceof r)
      return h;
    try {
      return new r(h, u);
    } catch (s) {
      if (!f)
        return null;
      throw s;
    }
  }, fi;
}
var di, os;
function tf() {
  if (os) return di;
  os = 1;
  const r = jt();
  return di = (h, u) => {
    const f = r(h, u);
    return f ? f.version : null;
  }, di;
}
var hi, ss;
function rf() {
  if (ss) return hi;
  ss = 1;
  const r = jt();
  return hi = (h, u) => {
    const f = r(h.trim().replace(/^[=v]+/, ""), u);
    return f ? f.version : null;
  }, hi;
}
var pi, ls;
function nf() {
  if (ls) return pi;
  ls = 1;
  const r = Ge();
  return pi = (h, u, f, s, a) => {
    typeof f == "string" && (a = s, s = f, f = void 0);
    try {
      return new r(
        h instanceof r ? h.version : h,
        f
      ).inc(u, s, a).version;
    } catch {
      return null;
    }
  }, pi;
}
var mi, us;
function af() {
  if (us) return mi;
  us = 1;
  const r = jt();
  return mi = (h, u) => {
    const f = r(h, null, !0), s = r(u, null, !0), a = f.compare(s);
    if (a === 0)
      return null;
    const d = a > 0, n = d ? f : s, l = d ? s : f, i = !!n.prerelease.length;
    if (!!l.prerelease.length && !i) {
      if (!l.patch && !l.minor)
        return "major";
      if (l.compareMain(n) === 0)
        return l.minor && !l.patch ? "minor" : "patch";
    }
    const t = i ? "pre" : "";
    return f.major !== s.major ? t + "major" : f.minor !== s.minor ? t + "minor" : f.patch !== s.patch ? t + "patch" : "prerelease";
  }, mi;
}
var gi, cs;
function of() {
  if (cs) return gi;
  cs = 1;
  const r = Ge();
  return gi = (h, u) => new r(h, u).major, gi;
}
var vi, fs;
function sf() {
  if (fs) return vi;
  fs = 1;
  const r = Ge();
  return vi = (h, u) => new r(h, u).minor, vi;
}
var Ei, ds;
function lf() {
  if (ds) return Ei;
  ds = 1;
  const r = Ge();
  return Ei = (h, u) => new r(h, u).patch, Ei;
}
var yi, hs;
function uf() {
  if (hs) return yi;
  hs = 1;
  const r = jt();
  return yi = (h, u) => {
    const f = r(h, u);
    return f && f.prerelease.length ? f.prerelease : null;
  }, yi;
}
var wi, ps;
function et() {
  if (ps) return wi;
  ps = 1;
  const r = Ge();
  return wi = (h, u, f) => new r(h, f).compare(new r(u, f)), wi;
}
var _i, ms;
function cf() {
  if (ms) return _i;
  ms = 1;
  const r = et();
  return _i = (h, u, f) => r(u, h, f), _i;
}
var Ai, gs;
function ff() {
  if (gs) return Ai;
  gs = 1;
  const r = et();
  return Ai = (h, u) => r(h, u, !0), Ai;
}
var Si, vs;
function sa() {
  if (vs) return Si;
  vs = 1;
  const r = Ge();
  return Si = (h, u, f) => {
    const s = new r(h, f), a = new r(u, f);
    return s.compare(a) || s.compareBuild(a);
  }, Si;
}
var Ti, Es;
function df() {
  if (Es) return Ti;
  Es = 1;
  const r = sa();
  return Ti = (h, u) => h.sort((f, s) => r(f, s, u)), Ti;
}
var Ri, ys;
function hf() {
  if (ys) return Ri;
  ys = 1;
  const r = sa();
  return Ri = (h, u) => h.sort((f, s) => r(s, f, u)), Ri;
}
var Ci, ws;
function zr() {
  if (ws) return Ci;
  ws = 1;
  const r = et();
  return Ci = (h, u, f) => r(h, u, f) > 0, Ci;
}
var bi, _s;
function la() {
  if (_s) return bi;
  _s = 1;
  const r = et();
  return bi = (h, u, f) => r(h, u, f) < 0, bi;
}
var Oi, As;
function tu() {
  if (As) return Oi;
  As = 1;
  const r = et();
  return Oi = (h, u, f) => r(h, u, f) === 0, Oi;
}
var Di, Ss;
function ru() {
  if (Ss) return Di;
  Ss = 1;
  const r = et();
  return Di = (h, u, f) => r(h, u, f) !== 0, Di;
}
var Ii, Ts;
function ua() {
  if (Ts) return Ii;
  Ts = 1;
  const r = et();
  return Ii = (h, u, f) => r(h, u, f) >= 0, Ii;
}
var Pi, Rs;
function ca() {
  if (Rs) return Pi;
  Rs = 1;
  const r = et();
  return Pi = (h, u, f) => r(h, u, f) <= 0, Pi;
}
var Ni, Cs;
function nu() {
  if (Cs) return Ni;
  Cs = 1;
  const r = tu(), c = ru(), h = zr(), u = ua(), f = la(), s = ca();
  return Ni = (d, n, l, i) => {
    switch (n) {
      case "===":
        return typeof d == "object" && (d = d.version), typeof l == "object" && (l = l.version), d === l;
      case "!==":
        return typeof d == "object" && (d = d.version), typeof l == "object" && (l = l.version), d !== l;
      case "":
      case "=":
      case "==":
        return r(d, l, i);
      case "!=":
        return c(d, l, i);
      case ">":
        return h(d, l, i);
      case ">=":
        return u(d, l, i);
      case "<":
        return f(d, l, i);
      case "<=":
        return s(d, l, i);
      default:
        throw new TypeError(`Invalid operator: ${n}`);
    }
  }, Ni;
}
var Fi, bs;
function pf() {
  if (bs) return Fi;
  bs = 1;
  const r = Ge(), c = jt(), { safeRe: h, t: u } = _r();
  return Fi = (s, a) => {
    if (s instanceof r)
      return s;
    if (typeof s == "number" && (s = String(s)), typeof s != "string")
      return null;
    a = a || {};
    let d = null;
    if (!a.rtl)
      d = s.match(a.includePrerelease ? h[u.COERCEFULL] : h[u.COERCE]);
    else {
      const p = a.includePrerelease ? h[u.COERCERTLFULL] : h[u.COERCERTL];
      let g;
      for (; (g = p.exec(s)) && (!d || d.index + d[0].length !== s.length); )
        (!d || g.index + g[0].length !== d.index + d[0].length) && (d = g), p.lastIndex = g.index + g[1].length + g[2].length;
      p.lastIndex = -1;
    }
    if (d === null)
      return null;
    const n = d[2], l = d[3] || "0", i = d[4] || "0", o = a.includePrerelease && d[5] ? `-${d[5]}` : "", t = a.includePrerelease && d[6] ? `+${d[6]}` : "";
    return c(`${n}.${l}.${i}${o}${t}`, a);
  }, Fi;
}
var xi, Os;
function mf() {
  if (Os) return xi;
  Os = 1;
  class r {
    constructor() {
      this.max = 1e3, this.map = /* @__PURE__ */ new Map();
    }
    get(h) {
      const u = this.map.get(h);
      if (u !== void 0)
        return this.map.delete(h), this.map.set(h, u), u;
    }
    delete(h) {
      return this.map.delete(h);
    }
    set(h, u) {
      if (!this.delete(h) && u !== void 0) {
        if (this.map.size >= this.max) {
          const s = this.map.keys().next().value;
          this.delete(s);
        }
        this.map.set(h, u);
      }
      return this;
    }
  }
  return xi = r, xi;
}
var Li, Ds;
function tt() {
  if (Ds) return Li;
  Ds = 1;
  const r = /\s+/g;
  class c {
    constructor(P, U) {
      if (U = f(U), P instanceof c)
        return P.loose === !!U.loose && P.includePrerelease === !!U.includePrerelease ? P : new c(P.raw, U);
      if (P instanceof s)
        return this.raw = P.value, this.set = [[P]], this.formatted = void 0, this;
      if (this.options = U, this.loose = !!U.loose, this.includePrerelease = !!U.includePrerelease, this.raw = P.trim().replace(r, " "), this.set = this.raw.split("||").map((M) => this.parseRange(M.trim())).filter((M) => M.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const M = this.set[0];
        if (this.set = this.set.filter((J) => !y(J[0])), this.set.length === 0)
          this.set = [M];
        else if (this.set.length > 1) {
          for (const J of this.set)
            if (J.length === 1 && m(J[0])) {
              this.set = [J];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let P = 0; P < this.set.length; P++) {
          P > 0 && (this.formatted += "||");
          const U = this.set[P];
          for (let M = 0; M < U.length; M++)
            M > 0 && (this.formatted += " "), this.formatted += U[M].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(P) {
      const M = ((this.options.includePrerelease && p) | (this.options.loose && g)) + ":" + P, J = u.get(M);
      if (J)
        return J;
      const V = this.options.loose, ne = V ? n[l.HYPHENRANGELOOSE] : n[l.HYPHENRANGE];
      P = P.replace(ne, x(this.options.includePrerelease)), a("hyphen replace", P), P = P.replace(n[l.COMPARATORTRIM], i), a("comparator trim", P), P = P.replace(n[l.TILDETRIM], o), a("tilde trim", P), P = P.replace(n[l.CARETTRIM], t), a("caret trim", P);
      let ce = P.split(" ").map((K) => C(K, this.options)).join(" ").split(/\s+/).map((K) => F(K, this.options));
      V && (ce = ce.filter((K) => (a("loose invalid filter", K, this.options), !!K.match(n[l.COMPARATORLOOSE])))), a("range list", ce);
      const ue = /* @__PURE__ */ new Map(), ie = ce.map((K) => new s(K, this.options));
      for (const K of ie) {
        if (y(K))
          return [K];
        ue.set(K.value, K);
      }
      ue.size > 1 && ue.has("") && ue.delete("");
      const Se = [...ue.values()];
      return u.set(M, Se), Se;
    }
    intersects(P, U) {
      if (!(P instanceof c))
        throw new TypeError("a Range is required");
      return this.set.some((M) => S(M, U) && P.set.some((J) => S(J, U) && M.every((V) => J.every((ne) => V.intersects(ne, U)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(P) {
      if (!P)
        return !1;
      if (typeof P == "string")
        try {
          P = new d(P, this.options);
        } catch {
          return !1;
        }
      for (let U = 0; U < this.set.length; U++)
        if (q(this.set[U], P, this.options))
          return !0;
      return !1;
    }
  }
  Li = c;
  const h = mf(), u = new h(), f = oa(), s = Xr(), a = Yr(), d = Ge(), {
    safeRe: n,
    t: l,
    comparatorTrimReplace: i,
    tildeTrimReplace: o,
    caretTrimReplace: t
  } = _r(), { FLAG_INCLUDE_PRERELEASE: p, FLAG_LOOSE: g } = Wr(), y = (N) => N.value === "<0.0.0-0", m = (N) => N.value === "", S = (N, P) => {
    let U = !0;
    const M = N.slice();
    let J = M.pop();
    for (; U && M.length; )
      U = M.every((V) => J.intersects(V, P)), J = M.pop();
    return U;
  }, C = (N, P) => (a("comp", N, P), N = R(N, P), a("caret", N), N = O(N, P), a("tildes", N), N = A(N, P), a("xrange", N), N = $(N, P), a("stars", N), N), D = (N) => !N || N.toLowerCase() === "x" || N === "*", O = (N, P) => N.trim().split(/\s+/).map((U) => I(U, P)).join(" "), I = (N, P) => {
    const U = P.loose ? n[l.TILDELOOSE] : n[l.TILDE];
    return N.replace(U, (M, J, V, ne, ce) => {
      a("tilde", N, M, J, V, ne, ce);
      let ue;
      return D(J) ? ue = "" : D(V) ? ue = `>=${J}.0.0 <${+J + 1}.0.0-0` : D(ne) ? ue = `>=${J}.${V}.0 <${J}.${+V + 1}.0-0` : ce ? (a("replaceTilde pr", ce), ue = `>=${J}.${V}.${ne}-${ce} <${J}.${+V + 1}.0-0`) : ue = `>=${J}.${V}.${ne} <${J}.${+V + 1}.0-0`, a("tilde return", ue), ue;
    });
  }, R = (N, P) => N.trim().split(/\s+/).map((U) => w(U, P)).join(" "), w = (N, P) => {
    a("caret", N, P);
    const U = P.loose ? n[l.CARETLOOSE] : n[l.CARET], M = P.includePrerelease ? "-0" : "";
    return N.replace(U, (J, V, ne, ce, ue) => {
      a("caret", N, J, V, ne, ce, ue);
      let ie;
      return D(V) ? ie = "" : D(ne) ? ie = `>=${V}.0.0${M} <${+V + 1}.0.0-0` : D(ce) ? V === "0" ? ie = `>=${V}.${ne}.0${M} <${V}.${+ne + 1}.0-0` : ie = `>=${V}.${ne}.0${M} <${+V + 1}.0.0-0` : ue ? (a("replaceCaret pr", ue), V === "0" ? ne === "0" ? ie = `>=${V}.${ne}.${ce}-${ue} <${V}.${ne}.${+ce + 1}-0` : ie = `>=${V}.${ne}.${ce}-${ue} <${V}.${+ne + 1}.0-0` : ie = `>=${V}.${ne}.${ce}-${ue} <${+V + 1}.0.0-0`) : (a("no pr"), V === "0" ? ne === "0" ? ie = `>=${V}.${ne}.${ce}${M} <${V}.${ne}.${+ce + 1}-0` : ie = `>=${V}.${ne}.${ce}${M} <${V}.${+ne + 1}.0-0` : ie = `>=${V}.${ne}.${ce} <${+V + 1}.0.0-0`), a("caret return", ie), ie;
    });
  }, A = (N, P) => (a("replaceXRanges", N, P), N.split(/\s+/).map((U) => E(U, P)).join(" ")), E = (N, P) => {
    N = N.trim();
    const U = P.loose ? n[l.XRANGELOOSE] : n[l.XRANGE];
    return N.replace(U, (M, J, V, ne, ce, ue) => {
      a("xRange", N, M, J, V, ne, ce, ue);
      const ie = D(V), Se = ie || D(ne), K = Se || D(ce), Ee = K;
      return J === "=" && Ee && (J = ""), ue = P.includePrerelease ? "-0" : "", ie ? J === ">" || J === "<" ? M = "<0.0.0-0" : M = "*" : J && Ee ? (Se && (ne = 0), ce = 0, J === ">" ? (J = ">=", Se ? (V = +V + 1, ne = 0, ce = 0) : (ne = +ne + 1, ce = 0)) : J === "<=" && (J = "<", Se ? V = +V + 1 : ne = +ne + 1), J === "<" && (ue = "-0"), M = `${J + V}.${ne}.${ce}${ue}`) : Se ? M = `>=${V}.0.0${ue} <${+V + 1}.0.0-0` : K && (M = `>=${V}.${ne}.0${ue} <${V}.${+ne + 1}.0-0`), a("xRange return", M), M;
    });
  }, $ = (N, P) => (a("replaceStars", N, P), N.trim().replace(n[l.STAR], "")), F = (N, P) => (a("replaceGTE0", N, P), N.trim().replace(n[P.includePrerelease ? l.GTE0PRE : l.GTE0], "")), x = (N) => (P, U, M, J, V, ne, ce, ue, ie, Se, K, Ee) => (D(M) ? U = "" : D(J) ? U = `>=${M}.0.0${N ? "-0" : ""}` : D(V) ? U = `>=${M}.${J}.0${N ? "-0" : ""}` : ne ? U = `>=${U}` : U = `>=${U}${N ? "-0" : ""}`, D(ie) ? ue = "" : D(Se) ? ue = `<${+ie + 1}.0.0-0` : D(K) ? ue = `<${ie}.${+Se + 1}.0-0` : Ee ? ue = `<=${ie}.${Se}.${K}-${Ee}` : N ? ue = `<${ie}.${Se}.${+K + 1}-0` : ue = `<=${ue}`, `${U} ${ue}`.trim()), q = (N, P, U) => {
    for (let M = 0; M < N.length; M++)
      if (!N[M].test(P))
        return !1;
    if (P.prerelease.length && !U.includePrerelease) {
      for (let M = 0; M < N.length; M++)
        if (a(N[M].semver), N[M].semver !== s.ANY && N[M].semver.prerelease.length > 0) {
          const J = N[M].semver;
          if (J.major === P.major && J.minor === P.minor && J.patch === P.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Li;
}
var Ui, Is;
function Xr() {
  if (Is) return Ui;
  Is = 1;
  const r = Symbol("SemVer ANY");
  class c {
    static get ANY() {
      return r;
    }
    constructor(i, o) {
      if (o = h(o), i instanceof c) {
        if (i.loose === !!o.loose)
          return i;
        i = i.value;
      }
      i = i.trim().split(/\s+/).join(" "), a("comparator", i, o), this.options = o, this.loose = !!o.loose, this.parse(i), this.semver === r ? this.value = "" : this.value = this.operator + this.semver.version, a("comp", this);
    }
    parse(i) {
      const o = this.options.loose ? u[f.COMPARATORLOOSE] : u[f.COMPARATOR], t = i.match(o);
      if (!t)
        throw new TypeError(`Invalid comparator: ${i}`);
      this.operator = t[1] !== void 0 ? t[1] : "", this.operator === "=" && (this.operator = ""), t[2] ? this.semver = new d(t[2], this.options.loose) : this.semver = r;
    }
    toString() {
      return this.value;
    }
    test(i) {
      if (a("Comparator.test", i, this.options.loose), this.semver === r || i === r)
        return !0;
      if (typeof i == "string")
        try {
          i = new d(i, this.options);
        } catch {
          return !1;
        }
      return s(i, this.operator, this.semver, this.options);
    }
    intersects(i, o) {
      if (!(i instanceof c))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new n(i.value, o).test(this.value) : i.operator === "" ? i.value === "" ? !0 : new n(this.value, o).test(i.semver) : (o = h(o), o.includePrerelease && (this.value === "<0.0.0-0" || i.value === "<0.0.0-0") || !o.includePrerelease && (this.value.startsWith("<0.0.0") || i.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && i.operator.startsWith(">") || this.operator.startsWith("<") && i.operator.startsWith("<") || this.semver.version === i.semver.version && this.operator.includes("=") && i.operator.includes("=") || s(this.semver, "<", i.semver, o) && this.operator.startsWith(">") && i.operator.startsWith("<") || s(this.semver, ">", i.semver, o) && this.operator.startsWith("<") && i.operator.startsWith(">")));
    }
  }
  Ui = c;
  const h = oa(), { safeRe: u, t: f } = _r(), s = nu(), a = Yr(), d = Ge(), n = tt();
  return Ui;
}
var $i, Ps;
function Kr() {
  if (Ps) return $i;
  Ps = 1;
  const r = tt();
  return $i = (h, u, f) => {
    try {
      u = new r(u, f);
    } catch {
      return !1;
    }
    return u.test(h);
  }, $i;
}
var ki, Ns;
function gf() {
  if (Ns) return ki;
  Ns = 1;
  const r = tt();
  return ki = (h, u) => new r(h, u).set.map((f) => f.map((s) => s.value).join(" ").trim().split(" ")), ki;
}
var qi, Fs;
function vf() {
  if (Fs) return qi;
  Fs = 1;
  const r = Ge(), c = tt();
  return qi = (u, f, s) => {
    let a = null, d = null, n = null;
    try {
      n = new c(f, s);
    } catch {
      return null;
    }
    return u.forEach((l) => {
      n.test(l) && (!a || d.compare(l) === -1) && (a = l, d = new r(a, s));
    }), a;
  }, qi;
}
var Mi, xs;
function Ef() {
  if (xs) return Mi;
  xs = 1;
  const r = Ge(), c = tt();
  return Mi = (u, f, s) => {
    let a = null, d = null, n = null;
    try {
      n = new c(f, s);
    } catch {
      return null;
    }
    return u.forEach((l) => {
      n.test(l) && (!a || d.compare(l) === 1) && (a = l, d = new r(a, s));
    }), a;
  }, Mi;
}
var Bi, Ls;
function yf() {
  if (Ls) return Bi;
  Ls = 1;
  const r = Ge(), c = tt(), h = zr();
  return Bi = (f, s) => {
    f = new c(f, s);
    let a = new r("0.0.0");
    if (f.test(a) || (a = new r("0.0.0-0"), f.test(a)))
      return a;
    a = null;
    for (let d = 0; d < f.set.length; ++d) {
      const n = f.set[d];
      let l = null;
      n.forEach((i) => {
        const o = new r(i.semver.version);
        switch (i.operator) {
          case ">":
            o.prerelease.length === 0 ? o.patch++ : o.prerelease.push(0), o.raw = o.format();
          /* fallthrough */
          case "":
          case ">=":
            (!l || h(o, l)) && (l = o);
            break;
          case "<":
          case "<=":
            break;
          /* istanbul ignore next */
          default:
            throw new Error(`Unexpected operation: ${i.operator}`);
        }
      }), l && (!a || h(a, l)) && (a = l);
    }
    return a && f.test(a) ? a : null;
  }, Bi;
}
var Hi, Us;
function wf() {
  if (Us) return Hi;
  Us = 1;
  const r = tt();
  return Hi = (h, u) => {
    try {
      return new r(h, u).range || "*";
    } catch {
      return null;
    }
  }, Hi;
}
var ji, $s;
function fa() {
  if ($s) return ji;
  $s = 1;
  const r = Ge(), c = Xr(), { ANY: h } = c, u = tt(), f = Kr(), s = zr(), a = la(), d = ca(), n = ua();
  return ji = (i, o, t, p) => {
    i = new r(i, p), o = new u(o, p);
    let g, y, m, S, C;
    switch (t) {
      case ">":
        g = s, y = d, m = a, S = ">", C = ">=";
        break;
      case "<":
        g = a, y = n, m = s, S = "<", C = "<=";
        break;
      default:
        throw new TypeError('Must provide a hilo val of "<" or ">"');
    }
    if (f(i, o, p))
      return !1;
    for (let D = 0; D < o.set.length; ++D) {
      const O = o.set[D];
      let I = null, R = null;
      if (O.forEach((w) => {
        w.semver === h && (w = new c(">=0.0.0")), I = I || w, R = R || w, g(w.semver, I.semver, p) ? I = w : m(w.semver, R.semver, p) && (R = w);
      }), I.operator === S || I.operator === C || (!R.operator || R.operator === S) && y(i, R.semver))
        return !1;
      if (R.operator === C && m(i, R.semver))
        return !1;
    }
    return !0;
  }, ji;
}
var Gi, ks;
function _f() {
  if (ks) return Gi;
  ks = 1;
  const r = fa();
  return Gi = (h, u, f) => r(h, u, ">", f), Gi;
}
var Vi, qs;
function Af() {
  if (qs) return Vi;
  qs = 1;
  const r = fa();
  return Vi = (h, u, f) => r(h, u, "<", f), Vi;
}
var Wi, Ms;
function Sf() {
  if (Ms) return Wi;
  Ms = 1;
  const r = tt();
  return Wi = (h, u, f) => (h = new r(h, f), u = new r(u, f), h.intersects(u, f)), Wi;
}
var Yi, Bs;
function Tf() {
  if (Bs) return Yi;
  Bs = 1;
  const r = Kr(), c = et();
  return Yi = (h, u, f) => {
    const s = [];
    let a = null, d = null;
    const n = h.sort((t, p) => c(t, p, f));
    for (const t of n)
      r(t, u, f) ? (d = t, a || (a = t)) : (d && s.push([a, d]), d = null, a = null);
    a && s.push([a, null]);
    const l = [];
    for (const [t, p] of s)
      t === p ? l.push(t) : !p && t === n[0] ? l.push("*") : p ? t === n[0] ? l.push(`<=${p}`) : l.push(`${t} - ${p}`) : l.push(`>=${t}`);
    const i = l.join(" || "), o = typeof u.raw == "string" ? u.raw : String(u);
    return i.length < o.length ? i : u;
  }, Yi;
}
var zi, Hs;
function Rf() {
  if (Hs) return zi;
  Hs = 1;
  const r = tt(), c = Xr(), { ANY: h } = c, u = Kr(), f = et(), s = (o, t, p = {}) => {
    if (o === t)
      return !0;
    o = new r(o, p), t = new r(t, p);
    let g = !1;
    e: for (const y of o.set) {
      for (const m of t.set) {
        const S = n(y, m, p);
        if (g = g || S !== null, S)
          continue e;
      }
      if (g)
        return !1;
    }
    return !0;
  }, a = [new c(">=0.0.0-0")], d = [new c(">=0.0.0")], n = (o, t, p) => {
    if (o === t)
      return !0;
    if (o.length === 1 && o[0].semver === h) {
      if (t.length === 1 && t[0].semver === h)
        return !0;
      p.includePrerelease ? o = a : o = d;
    }
    if (t.length === 1 && t[0].semver === h) {
      if (p.includePrerelease)
        return !0;
      t = d;
    }
    const g = /* @__PURE__ */ new Set();
    let y, m;
    for (const A of o)
      A.operator === ">" || A.operator === ">=" ? y = l(y, A, p) : A.operator === "<" || A.operator === "<=" ? m = i(m, A, p) : g.add(A.semver);
    if (g.size > 1)
      return null;
    let S;
    if (y && m) {
      if (S = f(y.semver, m.semver, p), S > 0)
        return null;
      if (S === 0 && (y.operator !== ">=" || m.operator !== "<="))
        return null;
    }
    for (const A of g) {
      if (y && !u(A, String(y), p) || m && !u(A, String(m), p))
        return null;
      for (const E of t)
        if (!u(A, String(E), p))
          return !1;
      return !0;
    }
    let C, D, O, I, R = m && !p.includePrerelease && m.semver.prerelease.length ? m.semver : !1, w = y && !p.includePrerelease && y.semver.prerelease.length ? y.semver : !1;
    R && R.prerelease.length === 1 && m.operator === "<" && R.prerelease[0] === 0 && (R = !1);
    for (const A of t) {
      if (I = I || A.operator === ">" || A.operator === ">=", O = O || A.operator === "<" || A.operator === "<=", y) {
        if (w && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === w.major && A.semver.minor === w.minor && A.semver.patch === w.patch && (w = !1), A.operator === ">" || A.operator === ">=") {
          if (C = l(y, A, p), C === A && C !== y)
            return !1;
        } else if (y.operator === ">=" && !u(y.semver, String(A), p))
          return !1;
      }
      if (m) {
        if (R && A.semver.prerelease && A.semver.prerelease.length && A.semver.major === R.major && A.semver.minor === R.minor && A.semver.patch === R.patch && (R = !1), A.operator === "<" || A.operator === "<=") {
          if (D = i(m, A, p), D === A && D !== m)
            return !1;
        } else if (m.operator === "<=" && !u(m.semver, String(A), p))
          return !1;
      }
      if (!A.operator && (m || y) && S !== 0)
        return !1;
    }
    return !(y && O && !m && S !== 0 || m && I && !y && S !== 0 || w || R);
  }, l = (o, t, p) => {
    if (!o)
      return t;
    const g = f(o.semver, t.semver, p);
    return g > 0 ? o : g < 0 || t.operator === ">" && o.operator === ">=" ? t : o;
  }, i = (o, t, p) => {
    if (!o)
      return t;
    const g = f(o.semver, t.semver, p);
    return g < 0 ? o : g > 0 || t.operator === "<" && o.operator === "<=" ? t : o;
  };
  return zi = s, zi;
}
var Xi, js;
function iu() {
  if (js) return Xi;
  js = 1;
  const r = _r(), c = Wr(), h = Ge(), u = eu(), f = jt(), s = tf(), a = rf(), d = nf(), n = af(), l = of(), i = sf(), o = lf(), t = uf(), p = et(), g = cf(), y = ff(), m = sa(), S = df(), C = hf(), D = zr(), O = la(), I = tu(), R = ru(), w = ua(), A = ca(), E = nu(), $ = pf(), F = Xr(), x = tt(), q = Kr(), N = gf(), P = vf(), U = Ef(), M = yf(), J = wf(), V = fa(), ne = _f(), ce = Af(), ue = Sf(), ie = Tf(), Se = Rf();
  return Xi = {
    parse: f,
    valid: s,
    clean: a,
    inc: d,
    diff: n,
    major: l,
    minor: i,
    patch: o,
    prerelease: t,
    compare: p,
    rcompare: g,
    compareLoose: y,
    compareBuild: m,
    sort: S,
    rsort: C,
    gt: D,
    lt: O,
    eq: I,
    neq: R,
    gte: w,
    lte: A,
    cmp: E,
    coerce: $,
    Comparator: F,
    Range: x,
    satisfies: q,
    toComparators: N,
    maxSatisfying: P,
    minSatisfying: U,
    minVersion: M,
    validRange: J,
    outside: V,
    gtr: ne,
    ltr: ce,
    intersects: ue,
    simplifyRange: ie,
    subset: Se,
    SemVer: h,
    re: r.re,
    src: r.src,
    tokens: r.t,
    SEMVER_SPEC_VERSION: c.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: c.RELEASE_TYPES,
    compareIdentifiers: u.compareIdentifiers,
    rcompareIdentifiers: u.rcompareIdentifiers
  }, Xi;
}
var Ut = {}, mr = { exports: {} };
mr.exports;
var Gs;
function Cf() {
  return Gs || (Gs = 1, function(r, c) {
    var h = 200, u = "__lodash_hash_undefined__", f = 1, s = 2, a = 9007199254740991, d = "[object Arguments]", n = "[object Array]", l = "[object AsyncFunction]", i = "[object Boolean]", o = "[object Date]", t = "[object Error]", p = "[object Function]", g = "[object GeneratorFunction]", y = "[object Map]", m = "[object Number]", S = "[object Null]", C = "[object Object]", D = "[object Promise]", O = "[object Proxy]", I = "[object RegExp]", R = "[object Set]", w = "[object String]", A = "[object Symbol]", E = "[object Undefined]", $ = "[object WeakMap]", F = "[object ArrayBuffer]", x = "[object DataView]", q = "[object Float32Array]", N = "[object Float64Array]", P = "[object Int8Array]", U = "[object Int16Array]", M = "[object Int32Array]", J = "[object Uint8Array]", V = "[object Uint8ClampedArray]", ne = "[object Uint16Array]", ce = "[object Uint32Array]", ue = /[\\^$.*+?()[\]{}|]/g, ie = /^\[object .+?Constructor\]$/, Se = /^(?:0|[1-9]\d*)$/, K = {};
    K[q] = K[N] = K[P] = K[U] = K[M] = K[J] = K[V] = K[ne] = K[ce] = !0, K[d] = K[n] = K[F] = K[i] = K[x] = K[o] = K[t] = K[p] = K[y] = K[m] = K[C] = K[I] = K[R] = K[w] = K[$] = !1;
    var Ee = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, T = typeof self == "object" && self && self.Object === Object && self, v = Ee || T || Function("return this")(), H = c && !c.nodeType && c, L = H && !0 && r && !r.nodeType && r, le = L && L.exports === H, me = le && Ee.process, pe = function() {
      try {
        return me && me.binding && me.binding("util");
      } catch {
      }
    }(), _e = pe && pe.isTypedArray;
    function ye(b, k) {
      for (var z = -1, se = b == null ? 0 : b.length, Oe = 0, Ae = []; ++z < se; ) {
        var Ne = b[z];
        k(Ne, z, b) && (Ae[Oe++] = Ne);
      }
      return Ae;
    }
    function xe(b, k) {
      for (var z = -1, se = k.length, Oe = b.length; ++z < se; )
        b[Oe + z] = k[z];
      return b;
    }
    function Ce(b, k) {
      for (var z = -1, se = b == null ? 0 : b.length; ++z < se; )
        if (k(b[z], z, b))
          return !0;
      return !1;
    }
    function qe(b, k) {
      for (var z = -1, se = Array(b); ++z < b; )
        se[z] = k(z);
      return se;
    }
    function vt(b) {
      return function(k) {
        return b(k);
      };
    }
    function at(b, k) {
      return b.has(k);
    }
    function e(b, k) {
      return b == null ? void 0 : b[k];
    }
    function B(b) {
      var k = -1, z = Array(b.size);
      return b.forEach(function(se, Oe) {
        z[++k] = [Oe, se];
      }), z;
    }
    function G(b, k) {
      return function(z) {
        return b(k(z));
      };
    }
    function re(b) {
      var k = -1, z = Array(b.size);
      return b.forEach(function(se) {
        z[++k] = se;
      }), z;
    }
    var W = Array.prototype, te = Function.prototype, Z = Object.prototype, ae = v["__core-js_shared__"], ge = te.toString, ve = Z.hasOwnProperty, Te = function() {
      var b = /[^.]+$/.exec(ae && ae.keys && ae.keys.IE_PROTO || "");
      return b ? "Symbol(src)_1." + b : "";
    }(), de = Z.toString, Le = RegExp(
      "^" + ge.call(ve).replace(ue, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    ), _ = le ? v.Buffer : void 0, j = v.Symbol, X = v.Uint8Array, Y = Z.propertyIsEnumerable, Q = W.splice, ee = j ? j.toStringTag : void 0, fe = Object.getOwnPropertySymbols, oe = _ ? _.isBuffer : void 0, he = G(Object.keys, Object), we = xt(v, "DataView"), be = xt(v, "Map"), Pe = xt(v, "Promise"), Re = xt(v, "Set"), Ft = xt(v, "WeakMap"), Je = xt(Object, "create"), Et = _t(we), hu = _t(be), pu = _t(Pe), mu = _t(Re), gu = _t(Ft), pa = j ? j.prototype : void 0, Jr = pa ? pa.valueOf : void 0;
    function yt(b) {
      var k = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++k < z; ) {
        var se = b[k];
        this.set(se[0], se[1]);
      }
    }
    function vu() {
      this.__data__ = Je ? Je(null) : {}, this.size = 0;
    }
    function Eu(b) {
      var k = this.has(b) && delete this.__data__[b];
      return this.size -= k ? 1 : 0, k;
    }
    function yu(b) {
      var k = this.__data__;
      if (Je) {
        var z = k[b];
        return z === u ? void 0 : z;
      }
      return ve.call(k, b) ? k[b] : void 0;
    }
    function wu(b) {
      var k = this.__data__;
      return Je ? k[b] !== void 0 : ve.call(k, b);
    }
    function _u(b, k) {
      var z = this.__data__;
      return this.size += this.has(b) ? 0 : 1, z[b] = Je && k === void 0 ? u : k, this;
    }
    yt.prototype.clear = vu, yt.prototype.delete = Eu, yt.prototype.get = yu, yt.prototype.has = wu, yt.prototype.set = _u;
    function ot(b) {
      var k = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++k < z; ) {
        var se = b[k];
        this.set(se[0], se[1]);
      }
    }
    function Au() {
      this.__data__ = [], this.size = 0;
    }
    function Su(b) {
      var k = this.__data__, z = Sr(k, b);
      if (z < 0)
        return !1;
      var se = k.length - 1;
      return z == se ? k.pop() : Q.call(k, z, 1), --this.size, !0;
    }
    function Tu(b) {
      var k = this.__data__, z = Sr(k, b);
      return z < 0 ? void 0 : k[z][1];
    }
    function Ru(b) {
      return Sr(this.__data__, b) > -1;
    }
    function Cu(b, k) {
      var z = this.__data__, se = Sr(z, b);
      return se < 0 ? (++this.size, z.push([b, k])) : z[se][1] = k, this;
    }
    ot.prototype.clear = Au, ot.prototype.delete = Su, ot.prototype.get = Tu, ot.prototype.has = Ru, ot.prototype.set = Cu;
    function wt(b) {
      var k = -1, z = b == null ? 0 : b.length;
      for (this.clear(); ++k < z; ) {
        var se = b[k];
        this.set(se[0], se[1]);
      }
    }
    function bu() {
      this.size = 0, this.__data__ = {
        hash: new yt(),
        map: new (be || ot)(),
        string: new yt()
      };
    }
    function Ou(b) {
      var k = Tr(this, b).delete(b);
      return this.size -= k ? 1 : 0, k;
    }
    function Du(b) {
      return Tr(this, b).get(b);
    }
    function Iu(b) {
      return Tr(this, b).has(b);
    }
    function Pu(b, k) {
      var z = Tr(this, b), se = z.size;
      return z.set(b, k), this.size += z.size == se ? 0 : 1, this;
    }
    wt.prototype.clear = bu, wt.prototype.delete = Ou, wt.prototype.get = Du, wt.prototype.has = Iu, wt.prototype.set = Pu;
    function Ar(b) {
      var k = -1, z = b == null ? 0 : b.length;
      for (this.__data__ = new wt(); ++k < z; )
        this.add(b[k]);
    }
    function Nu(b) {
      return this.__data__.set(b, u), this;
    }
    function Fu(b) {
      return this.__data__.has(b);
    }
    Ar.prototype.add = Ar.prototype.push = Nu, Ar.prototype.has = Fu;
    function ft(b) {
      var k = this.__data__ = new ot(b);
      this.size = k.size;
    }
    function xu() {
      this.__data__ = new ot(), this.size = 0;
    }
    function Lu(b) {
      var k = this.__data__, z = k.delete(b);
      return this.size = k.size, z;
    }
    function Uu(b) {
      return this.__data__.get(b);
    }
    function $u(b) {
      return this.__data__.has(b);
    }
    function ku(b, k) {
      var z = this.__data__;
      if (z instanceof ot) {
        var se = z.__data__;
        if (!be || se.length < h - 1)
          return se.push([b, k]), this.size = ++z.size, this;
        z = this.__data__ = new wt(se);
      }
      return z.set(b, k), this.size = z.size, this;
    }
    ft.prototype.clear = xu, ft.prototype.delete = Lu, ft.prototype.get = Uu, ft.prototype.has = $u, ft.prototype.set = ku;
    function qu(b, k) {
      var z = Rr(b), se = !z && ec(b), Oe = !z && !se && Qr(b), Ae = !z && !se && !Oe && Sa(b), Ne = z || se || Oe || Ae, Ue = Ne ? qe(b.length, String) : [], $e = Ue.length;
      for (var Ie in b)
        ve.call(b, Ie) && !(Ne && // Safari 9 has enumerable `arguments.length` in strict mode.
        (Ie == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        Oe && (Ie == "offset" || Ie == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        Ae && (Ie == "buffer" || Ie == "byteLength" || Ie == "byteOffset") || // Skip index properties.
        Xu(Ie, $e))) && Ue.push(Ie);
      return Ue;
    }
    function Sr(b, k) {
      for (var z = b.length; z--; )
        if (ya(b[z][0], k))
          return z;
      return -1;
    }
    function Mu(b, k, z) {
      var se = k(b);
      return Rr(b) ? se : xe(se, z(b));
    }
    function Vt(b) {
      return b == null ? b === void 0 ? E : S : ee && ee in Object(b) ? Yu(b) : Zu(b);
    }
    function ma(b) {
      return Wt(b) && Vt(b) == d;
    }
    function ga(b, k, z, se, Oe) {
      return b === k ? !0 : b == null || k == null || !Wt(b) && !Wt(k) ? b !== b && k !== k : Bu(b, k, z, se, ga, Oe);
    }
    function Bu(b, k, z, se, Oe, Ae) {
      var Ne = Rr(b), Ue = Rr(k), $e = Ne ? n : dt(b), Ie = Ue ? n : dt(k);
      $e = $e == d ? C : $e, Ie = Ie == d ? C : Ie;
      var We = $e == C, Qe = Ie == C, Me = $e == Ie;
      if (Me && Qr(b)) {
        if (!Qr(k))
          return !1;
        Ne = !0, We = !1;
      }
      if (Me && !We)
        return Ae || (Ae = new ft()), Ne || Sa(b) ? va(b, k, z, se, Oe, Ae) : Vu(b, k, $e, z, se, Oe, Ae);
      if (!(z & f)) {
        var ze = We && ve.call(b, "__wrapped__"), Xe = Qe && ve.call(k, "__wrapped__");
        if (ze || Xe) {
          var ht = ze ? b.value() : b, st = Xe ? k.value() : k;
          return Ae || (Ae = new ft()), Oe(ht, st, z, se, Ae);
        }
      }
      return Me ? (Ae || (Ae = new ft()), Wu(b, k, z, se, Oe, Ae)) : !1;
    }
    function Hu(b) {
      if (!Aa(b) || Ju(b))
        return !1;
      var k = wa(b) ? Le : ie;
      return k.test(_t(b));
    }
    function ju(b) {
      return Wt(b) && _a(b.length) && !!K[Vt(b)];
    }
    function Gu(b) {
      if (!Qu(b))
        return he(b);
      var k = [];
      for (var z in Object(b))
        ve.call(b, z) && z != "constructor" && k.push(z);
      return k;
    }
    function va(b, k, z, se, Oe, Ae) {
      var Ne = z & f, Ue = b.length, $e = k.length;
      if (Ue != $e && !(Ne && $e > Ue))
        return !1;
      var Ie = Ae.get(b);
      if (Ie && Ae.get(k))
        return Ie == k;
      var We = -1, Qe = !0, Me = z & s ? new Ar() : void 0;
      for (Ae.set(b, k), Ae.set(k, b); ++We < Ue; ) {
        var ze = b[We], Xe = k[We];
        if (se)
          var ht = Ne ? se(Xe, ze, We, k, b, Ae) : se(ze, Xe, We, b, k, Ae);
        if (ht !== void 0) {
          if (ht)
            continue;
          Qe = !1;
          break;
        }
        if (Me) {
          if (!Ce(k, function(st, At) {
            if (!at(Me, At) && (ze === st || Oe(ze, st, z, se, Ae)))
              return Me.push(At);
          })) {
            Qe = !1;
            break;
          }
        } else if (!(ze === Xe || Oe(ze, Xe, z, se, Ae))) {
          Qe = !1;
          break;
        }
      }
      return Ae.delete(b), Ae.delete(k), Qe;
    }
    function Vu(b, k, z, se, Oe, Ae, Ne) {
      switch (z) {
        case x:
          if (b.byteLength != k.byteLength || b.byteOffset != k.byteOffset)
            return !1;
          b = b.buffer, k = k.buffer;
        case F:
          return !(b.byteLength != k.byteLength || !Ae(new X(b), new X(k)));
        case i:
        case o:
        case m:
          return ya(+b, +k);
        case t:
          return b.name == k.name && b.message == k.message;
        case I:
        case w:
          return b == k + "";
        case y:
          var Ue = B;
        case R:
          var $e = se & f;
          if (Ue || (Ue = re), b.size != k.size && !$e)
            return !1;
          var Ie = Ne.get(b);
          if (Ie)
            return Ie == k;
          se |= s, Ne.set(b, k);
          var We = va(Ue(b), Ue(k), se, Oe, Ae, Ne);
          return Ne.delete(b), We;
        case A:
          if (Jr)
            return Jr.call(b) == Jr.call(k);
      }
      return !1;
    }
    function Wu(b, k, z, se, Oe, Ae) {
      var Ne = z & f, Ue = Ea(b), $e = Ue.length, Ie = Ea(k), We = Ie.length;
      if ($e != We && !Ne)
        return !1;
      for (var Qe = $e; Qe--; ) {
        var Me = Ue[Qe];
        if (!(Ne ? Me in k : ve.call(k, Me)))
          return !1;
      }
      var ze = Ae.get(b);
      if (ze && Ae.get(k))
        return ze == k;
      var Xe = !0;
      Ae.set(b, k), Ae.set(k, b);
      for (var ht = Ne; ++Qe < $e; ) {
        Me = Ue[Qe];
        var st = b[Me], At = k[Me];
        if (se)
          var Ta = Ne ? se(At, st, Me, k, b, Ae) : se(st, At, Me, b, k, Ae);
        if (!(Ta === void 0 ? st === At || Oe(st, At, z, se, Ae) : Ta)) {
          Xe = !1;
          break;
        }
        ht || (ht = Me == "constructor");
      }
      if (Xe && !ht) {
        var Cr = b.constructor, br = k.constructor;
        Cr != br && "constructor" in b && "constructor" in k && !(typeof Cr == "function" && Cr instanceof Cr && typeof br == "function" && br instanceof br) && (Xe = !1);
      }
      return Ae.delete(b), Ae.delete(k), Xe;
    }
    function Ea(b) {
      return Mu(b, nc, zu);
    }
    function Tr(b, k) {
      var z = b.__data__;
      return Ku(k) ? z[typeof k == "string" ? "string" : "hash"] : z.map;
    }
    function xt(b, k) {
      var z = e(b, k);
      return Hu(z) ? z : void 0;
    }
    function Yu(b) {
      var k = ve.call(b, ee), z = b[ee];
      try {
        b[ee] = void 0;
        var se = !0;
      } catch {
      }
      var Oe = de.call(b);
      return se && (k ? b[ee] = z : delete b[ee]), Oe;
    }
    var zu = fe ? function(b) {
      return b == null ? [] : (b = Object(b), ye(fe(b), function(k) {
        return Y.call(b, k);
      }));
    } : ic, dt = Vt;
    (we && dt(new we(new ArrayBuffer(1))) != x || be && dt(new be()) != y || Pe && dt(Pe.resolve()) != D || Re && dt(new Re()) != R || Ft && dt(new Ft()) != $) && (dt = function(b) {
      var k = Vt(b), z = k == C ? b.constructor : void 0, se = z ? _t(z) : "";
      if (se)
        switch (se) {
          case Et:
            return x;
          case hu:
            return y;
          case pu:
            return D;
          case mu:
            return R;
          case gu:
            return $;
        }
      return k;
    });
    function Xu(b, k) {
      return k = k ?? a, !!k && (typeof b == "number" || Se.test(b)) && b > -1 && b % 1 == 0 && b < k;
    }
    function Ku(b) {
      var k = typeof b;
      return k == "string" || k == "number" || k == "symbol" || k == "boolean" ? b !== "__proto__" : b === null;
    }
    function Ju(b) {
      return !!Te && Te in b;
    }
    function Qu(b) {
      var k = b && b.constructor, z = typeof k == "function" && k.prototype || Z;
      return b === z;
    }
    function Zu(b) {
      return de.call(b);
    }
    function _t(b) {
      if (b != null) {
        try {
          return ge.call(b);
        } catch {
        }
        try {
          return b + "";
        } catch {
        }
      }
      return "";
    }
    function ya(b, k) {
      return b === k || b !== b && k !== k;
    }
    var ec = ma(/* @__PURE__ */ function() {
      return arguments;
    }()) ? ma : function(b) {
      return Wt(b) && ve.call(b, "callee") && !Y.call(b, "callee");
    }, Rr = Array.isArray;
    function tc(b) {
      return b != null && _a(b.length) && !wa(b);
    }
    var Qr = oe || ac;
    function rc(b, k) {
      return ga(b, k);
    }
    function wa(b) {
      if (!Aa(b))
        return !1;
      var k = Vt(b);
      return k == p || k == g || k == l || k == O;
    }
    function _a(b) {
      return typeof b == "number" && b > -1 && b % 1 == 0 && b <= a;
    }
    function Aa(b) {
      var k = typeof b;
      return b != null && (k == "object" || k == "function");
    }
    function Wt(b) {
      return b != null && typeof b == "object";
    }
    var Sa = _e ? vt(_e) : ju;
    function nc(b) {
      return tc(b) ? qu(b) : Gu(b);
    }
    function ic() {
      return [];
    }
    function ac() {
      return !1;
    }
    r.exports = rc;
  }(mr, mr.exports)), mr.exports;
}
var Vs;
function bf() {
  if (Vs) return Ut;
  Vs = 1, Object.defineProperty(Ut, "__esModule", { value: !0 }), Ut.DownloadedUpdateHelper = void 0, Ut.createTempUpdateFile = d;
  const r = qt, c = ut, h = Cf(), u = /* @__PURE__ */ gt(), f = De;
  let s = class {
    constructor(l) {
      this.cacheDir = l, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
    }
    get downloadedFileInfo() {
      return this._downloadedFileInfo;
    }
    get file() {
      return this._file;
    }
    get packageFile() {
      return this._packageFile;
    }
    get cacheDirForPendingUpdate() {
      return f.join(this.cacheDir, "pending");
    }
    async validateDownloadedPath(l, i, o, t) {
      if (this.versionInfo != null && this.file === l && this.fileInfo != null)
        return h(this.versionInfo, i) && h(this.fileInfo.info, o.info) && await (0, u.pathExists)(l) ? l : null;
      const p = await this.getValidCachedUpdateFile(o, t);
      return p === null ? null : (t.info(`Update has already been downloaded to ${l}).`), this._file = p, p);
    }
    async setDownloadedFile(l, i, o, t, p, g) {
      this._file = l, this._packageFile = i, this.versionInfo = o, this.fileInfo = t, this._downloadedFileInfo = {
        fileName: p,
        sha512: t.info.sha512,
        isAdminRightsRequired: t.info.isAdminRightsRequired === !0
      }, g && await (0, u.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
    }
    async clear() {
      this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
    }
    async cleanCacheDirForPendingUpdate() {
      try {
        await (0, u.emptyDir)(this.cacheDirForPendingUpdate);
      } catch {
      }
    }
    /**
     * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
     * @param fileInfo
     * @param logger
     */
    async getValidCachedUpdateFile(l, i) {
      const o = this.getUpdateInfoFile();
      if (!await (0, u.pathExists)(o))
        return null;
      let p;
      try {
        p = await (0, u.readJson)(o);
      } catch (S) {
        let C = "No cached update info available";
        return S.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), C += ` (error on read: ${S.message})`), i.info(C), null;
      }
      if (!((p == null ? void 0 : p.fileName) !== null))
        return i.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
      if (l.info.sha512 !== p.sha512)
        return i.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p.sha512}, expected: ${l.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
      const y = f.join(this.cacheDirForPendingUpdate, p.fileName);
      if (!await (0, u.pathExists)(y))
        return i.info("Cached update file doesn't exist"), null;
      const m = await a(y);
      return l.info.sha512 !== m ? (i.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${l.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = p, y);
    }
    getUpdateInfoFile() {
      return f.join(this.cacheDirForPendingUpdate, "update-info.json");
    }
  };
  Ut.DownloadedUpdateHelper = s;
  function a(n, l = "sha512", i = "base64", o) {
    return new Promise((t, p) => {
      const g = (0, r.createHash)(l);
      g.on("error", p).setEncoding(i), (0, c.createReadStream)(n, {
        ...o,
        highWaterMark: 1024 * 1024
        /* better to use more memory but hash faster */
      }).on("error", p).on("end", () => {
        g.end(), t(g.read());
      }).pipe(g, { end: !1 });
    });
  }
  async function d(n, l, i) {
    let o = 0, t = f.join(l, n);
    for (let p = 0; p < 3; p++)
      try {
        return await (0, u.unlink)(t), t;
      } catch (g) {
        if (g.code === "ENOENT")
          return t;
        i.warn(`Error on remove temp update file: ${g}`), t = f.join(l, `${o++}-${n}`);
      }
    return t;
  }
  return Ut;
}
var Qt = {}, qr = {}, Ws;
function Of() {
  if (Ws) return qr;
  Ws = 1, Object.defineProperty(qr, "__esModule", { value: !0 }), qr.getAppCacheDir = h;
  const r = De, c = vr;
  function h() {
    const u = (0, c.homedir)();
    let f;
    return process.platform === "win32" ? f = process.env.LOCALAPPDATA || r.join(u, "AppData", "Local") : process.platform === "darwin" ? f = r.join(u, "Library", "Caches") : f = process.env.XDG_CACHE_HOME || r.join(u, ".cache"), f;
  }
  return qr;
}
var Ys;
function Df() {
  if (Ys) return Qt;
  Ys = 1, Object.defineProperty(Qt, "__esModule", { value: !0 }), Qt.ElectronAppAdapter = void 0;
  const r = De, c = Of();
  let h = class {
    constructor(f = Dt.app) {
      this.app = f;
    }
    whenReady() {
      return this.app.whenReady();
    }
    get version() {
      return this.app.getVersion();
    }
    get name() {
      return this.app.getName();
    }
    get isPackaged() {
      return this.app.isPackaged === !0;
    }
    get appUpdateConfigPath() {
      return this.isPackaged ? r.join(process.resourcesPath, "app-update.yml") : r.join(this.app.getAppPath(), "dev-app-update.yml");
    }
    get userDataPath() {
      return this.app.getPath("userData");
    }
    get baseCachePath() {
      return (0, c.getAppCacheDir)();
    }
    quit() {
      this.app.quit();
    }
    relaunch() {
      this.app.relaunch();
    }
    onQuit(f) {
      this.app.once("quit", (s, a) => f(a));
    }
  };
  return Qt.ElectronAppAdapter = h, Qt;
}
var Ki = {}, zs;
function If() {
  return zs || (zs = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.ElectronHttpExecutor = r.NET_SESSION_NAME = void 0, r.getNetSession = h;
    const c = ke();
    r.NET_SESSION_NAME = "electron-updater";
    function h() {
      return Dt.session.fromPartition(r.NET_SESSION_NAME, {
        cache: !1
      });
    }
    class u extends c.HttpExecutor {
      constructor(s) {
        super(), this.proxyLoginCallback = s, this.cachedSession = null;
      }
      async download(s, a, d) {
        return await d.cancellationToken.createPromise((n, l, i) => {
          const o = {
            headers: d.headers || void 0,
            redirect: "manual"
          };
          (0, c.configureRequestUrl)(s, o), (0, c.configureRequestOptions)(o), this.doDownload(o, {
            destination: a,
            options: d,
            onCancel: i,
            callback: (t) => {
              t == null ? n(a) : l(t);
            },
            responseHandler: null
          }, 0);
        });
      }
      createRequest(s, a) {
        s.headers && s.headers.Host && (s.host = s.headers.Host, delete s.headers.Host), this.cachedSession == null && (this.cachedSession = h());
        const d = Dt.net.request({
          ...s,
          session: this.cachedSession
        });
        return d.on("response", a), this.proxyLoginCallback != null && d.on("login", this.proxyLoginCallback), d;
      }
      addRedirectHandlers(s, a, d, n, l) {
        s.on("redirect", (i, o, t) => {
          s.abort(), n > this.maxRedirects ? d(this.createMaxRedirectError()) : l(c.HttpExecutor.prepareRedirectUrlOptions(t, a));
        });
      }
    }
    r.ElectronHttpExecutor = u;
  }(Ki)), Ki;
}
var Zt = {}, bt = {}, Ji, Xs;
function Pf() {
  if (Xs) return Ji;
  Xs = 1;
  var r = "[object Symbol]", c = /[\\^$.*+?()[\]{}|]/g, h = RegExp(c.source), u = typeof Ze == "object" && Ze && Ze.Object === Object && Ze, f = typeof self == "object" && self && self.Object === Object && self, s = u || f || Function("return this")(), a = Object.prototype, d = a.toString, n = s.Symbol, l = n ? n.prototype : void 0, i = l ? l.toString : void 0;
  function o(m) {
    if (typeof m == "string")
      return m;
    if (p(m))
      return i ? i.call(m) : "";
    var S = m + "";
    return S == "0" && 1 / m == -1 / 0 ? "-0" : S;
  }
  function t(m) {
    return !!m && typeof m == "object";
  }
  function p(m) {
    return typeof m == "symbol" || t(m) && d.call(m) == r;
  }
  function g(m) {
    return m == null ? "" : o(m);
  }
  function y(m) {
    return m = g(m), m && h.test(m) ? m.replace(c, "\\$&") : m;
  }
  return Ji = y, Ji;
}
var Ks;
function Pt() {
  if (Ks) return bt;
  Ks = 1, Object.defineProperty(bt, "__esModule", { value: !0 }), bt.newBaseUrl = h, bt.newUrlFromBase = u, bt.getChannelFilename = f, bt.blockmapFiles = s;
  const r = Mt, c = Pf();
  function h(a) {
    const d = new r.URL(a);
    return d.pathname.endsWith("/") || (d.pathname += "/"), d;
  }
  function u(a, d, n = !1) {
    const l = new r.URL(a, d), i = d.search;
    return i != null && i.length !== 0 ? l.search = i : n && (l.search = `noCache=${Date.now().toString(32)}`), l;
  }
  function f(a) {
    return `${a}.yml`;
  }
  function s(a, d, n) {
    const l = u(`${a.pathname}.blockmap`, a);
    return [u(`${a.pathname.replace(new RegExp(c(n), "g"), d)}.blockmap`, a), l];
  }
  return bt;
}
var lt = {}, Js;
function Ke() {
  if (Js) return lt;
  Js = 1, Object.defineProperty(lt, "__esModule", { value: !0 }), lt.Provider = void 0, lt.findFile = f, lt.parseUpdateInfo = s, lt.getFileList = a, lt.resolveFiles = d;
  const r = ke(), c = aa(), h = Pt();
  let u = class {
    constructor(l) {
      this.runtimeOptions = l, this.requestHeaders = null, this.executor = l.executor;
    }
    get isUseMultipleRangeRequest() {
      return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
    }
    getChannelFilePrefix() {
      if (this.runtimeOptions.platform === "linux") {
        const l = process.env.TEST_UPDATER_ARCH || process.arch;
        return "-linux" + (l === "x64" ? "" : `-${l}`);
      } else
        return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
    }
    // due to historical reasons for windows we use channel name without platform specifier
    getDefaultChannelName() {
      return this.getCustomChannelName("latest");
    }
    getCustomChannelName(l) {
      return `${l}${this.getChannelFilePrefix()}`;
    }
    get fileExtraDownloadHeaders() {
      return null;
    }
    setRequestHeaders(l) {
      this.requestHeaders = l;
    }
    /**
     * Method to perform API request only to resolve update info, but not to download update.
     */
    httpRequest(l, i, o) {
      return this.executor.request(this.createRequestOptions(l, i), o);
    }
    createRequestOptions(l, i) {
      const o = {};
      return this.requestHeaders == null ? i != null && (o.headers = i) : o.headers = i == null ? this.requestHeaders : { ...this.requestHeaders, ...i }, (0, r.configureRequestUrl)(l, o), o;
    }
  };
  lt.Provider = u;
  function f(n, l, i) {
    if (n.length === 0)
      throw (0, r.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
    const o = n.find((t) => t.url.pathname.toLowerCase().endsWith(`.${l}`));
    return o ?? (i == null ? n[0] : n.find((t) => !i.some((p) => t.url.pathname.toLowerCase().endsWith(`.${p}`))));
  }
  function s(n, l, i) {
    if (n == null)
      throw (0, r.newError)(`Cannot parse update info from ${l} in the latest release artifacts (${i}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    let o;
    try {
      o = (0, c.load)(n);
    } catch (t) {
      throw (0, r.newError)(`Cannot parse update info from ${l} in the latest release artifacts (${i}): ${t.stack || t.message}, rawData: ${n}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    }
    return o;
  }
  function a(n) {
    const l = n.files;
    if (l != null && l.length > 0)
      return l;
    if (n.path != null)
      return [
        {
          url: n.path,
          sha2: n.sha2,
          sha512: n.sha512
        }
      ];
    throw (0, r.newError)(`No files provided: ${(0, r.safeStringifyJson)(n)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
  }
  function d(n, l, i = (o) => o) {
    const t = a(n).map((y) => {
      if (y.sha2 == null && y.sha512 == null)
        throw (0, r.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, r.safeStringifyJson)(y)}`, "ERR_UPDATER_NO_CHECKSUM");
      return {
        url: (0, h.newUrlFromBase)(i(y.url), l),
        info: y
      };
    }), p = n.packages, g = p == null ? null : p[process.arch] || p.ia32;
    return g != null && (t[0].packageInfo = {
      ...g,
      path: (0, h.newUrlFromBase)(i(g.path), l).href
    }), t;
  }
  return lt;
}
var Qs;
function au() {
  if (Qs) return Zt;
  Qs = 1, Object.defineProperty(Zt, "__esModule", { value: !0 }), Zt.GenericProvider = void 0;
  const r = ke(), c = Pt(), h = Ke();
  let u = class extends h.Provider {
    constructor(s, a, d) {
      super(d), this.configuration = s, this.updater = a, this.baseUrl = (0, c.newBaseUrl)(this.configuration.url);
    }
    get channel() {
      const s = this.updater.channel || this.configuration.channel;
      return s == null ? this.getDefaultChannelName() : this.getCustomChannelName(s);
    }
    async getLatestVersion() {
      const s = (0, c.getChannelFilename)(this.channel), a = (0, c.newUrlFromBase)(s, this.baseUrl, this.updater.isAddNoCacheQuery);
      for (let d = 0; ; d++)
        try {
          return (0, h.parseUpdateInfo)(await this.httpRequest(a), s, a);
        } catch (n) {
          if (n instanceof r.HttpError && n.statusCode === 404)
            throw (0, r.newError)(`Cannot find channel "${s}" update info: ${n.stack || n.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
          if (n.code === "ECONNREFUSED" && d < 3) {
            await new Promise((l, i) => {
              try {
                setTimeout(l, 1e3 * d);
              } catch (o) {
                i(o);
              }
            });
            continue;
          }
          throw n;
        }
    }
    resolveFiles(s) {
      return (0, h.resolveFiles)(s, this.baseUrl);
    }
  };
  return Zt.GenericProvider = u, Zt;
}
var er = {}, tr = {}, Zs;
function Nf() {
  if (Zs) return tr;
  Zs = 1, Object.defineProperty(tr, "__esModule", { value: !0 }), tr.BitbucketProvider = void 0;
  const r = ke(), c = Pt(), h = Ke();
  let u = class extends h.Provider {
    constructor(s, a, d) {
      super({
        ...d,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = a;
      const { owner: n, slug: l } = s;
      this.baseUrl = (0, c.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${n}/${l}/downloads`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "latest";
    }
    async getLatestVersion() {
      const s = new r.CancellationToken(), a = (0, c.getChannelFilename)(this.getCustomChannelName(this.channel)), d = (0, c.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(d, void 0, s);
        return (0, h.parseUpdateInfo)(n, a, d);
      } catch (n) {
        throw (0, r.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, h.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { owner: s, slug: a } = this.configuration;
      return `Bitbucket (owner: ${s}, slug: ${a}, channel: ${this.channel})`;
    }
  };
  return tr.BitbucketProvider = u, tr;
}
var mt = {}, el;
function ou() {
  if (el) return mt;
  el = 1, Object.defineProperty(mt, "__esModule", { value: !0 }), mt.GitHubProvider = mt.BaseGitHubProvider = void 0, mt.computeReleaseNotes = l;
  const r = ke(), c = iu(), h = Mt, u = Pt(), f = Ke(), s = /\/tag\/([^/]+)$/;
  class a extends f.Provider {
    constructor(o, t, p) {
      super({
        ...p,
        /* because GitHib uses S3 */
        isUseMultipleRangeRequest: !1
      }), this.options = o, this.baseUrl = (0, u.newBaseUrl)((0, r.githubUrl)(o, t));
      const g = t === "github.com" ? "api.github.com" : t;
      this.baseApiUrl = (0, u.newBaseUrl)((0, r.githubUrl)(o, g));
    }
    computeGithubBasePath(o) {
      const t = this.options.host;
      return t && !["github.com", "api.github.com"].includes(t) ? `/api/v3${o}` : o;
    }
  }
  mt.BaseGitHubProvider = a;
  let d = class extends a {
    constructor(o, t, p) {
      super(o, "github.com", p), this.options = o, this.updater = t;
    }
    get channel() {
      const o = this.updater.channel || this.options.channel;
      return o == null ? this.getDefaultChannelName() : this.getCustomChannelName(o);
    }
    async getLatestVersion() {
      var o, t, p, g, y;
      const m = new r.CancellationToken(), S = await this.httpRequest((0, u.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
        accept: "application/xml, application/atom+xml, text/xml, */*"
      }, m), C = (0, r.parseXml)(S);
      let D = C.element("entry", !1, "No published versions on GitHub"), O = null;
      try {
        if (this.updater.allowPrerelease) {
          const $ = ((o = this.updater) === null || o === void 0 ? void 0 : o.channel) || ((t = c.prerelease(this.updater.currentVersion)) === null || t === void 0 ? void 0 : t[0]) || null;
          if ($ === null)
            O = s.exec(D.element("link").attribute("href"))[1];
          else
            for (const F of C.getElements("entry")) {
              const x = s.exec(F.element("link").attribute("href"));
              if (x === null)
                continue;
              const q = x[1], N = ((p = c.prerelease(q)) === null || p === void 0 ? void 0 : p[0]) || null, P = !$ || ["alpha", "beta"].includes($), U = N !== null && !["alpha", "beta"].includes(String(N));
              if (P && !U && !($ === "beta" && N === "alpha")) {
                O = q;
                break;
              }
              if (N && N === $) {
                O = q;
                break;
              }
            }
        } else {
          O = await this.getLatestTagName(m);
          for (const $ of C.getElements("entry"))
            if (s.exec($.element("link").attribute("href"))[1] === O) {
              D = $;
              break;
            }
        }
      } catch ($) {
        throw (0, r.newError)(`Cannot parse releases feed: ${$.stack || $.message},
XML:
${S}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
      }
      if (O == null)
        throw (0, r.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
      let I, R = "", w = "";
      const A = async ($) => {
        R = (0, u.getChannelFilename)($), w = (0, u.newUrlFromBase)(this.getBaseDownloadPath(String(O), R), this.baseUrl);
        const F = this.createRequestOptions(w);
        try {
          return await this.executor.request(F, m);
        } catch (x) {
          throw x instanceof r.HttpError && x.statusCode === 404 ? (0, r.newError)(`Cannot find ${R} in the latest release artifacts (${w}): ${x.stack || x.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : x;
        }
      };
      try {
        let $ = this.channel;
        this.updater.allowPrerelease && (!((g = c.prerelease(O)) === null || g === void 0) && g[0]) && ($ = this.getCustomChannelName(String((y = c.prerelease(O)) === null || y === void 0 ? void 0 : y[0]))), I = await A($);
      } catch ($) {
        if (this.updater.allowPrerelease)
          I = await A(this.getDefaultChannelName());
        else
          throw $;
      }
      const E = (0, f.parseUpdateInfo)(I, R, w);
      return E.releaseName == null && (E.releaseName = D.elementValueOrEmpty("title")), E.releaseNotes == null && (E.releaseNotes = l(this.updater.currentVersion, this.updater.fullChangelog, C, D)), {
        tag: O,
        ...E
      };
    }
    async getLatestTagName(o) {
      const t = this.options, p = t.host == null || t.host === "github.com" ? (0, u.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new h.URL(`${this.computeGithubBasePath(`/repos/${t.owner}/${t.repo}/releases`)}/latest`, this.baseApiUrl);
      try {
        const g = await this.httpRequest(p, { Accept: "application/json" }, o);
        return g == null ? null : JSON.parse(g).tag_name;
      } catch (g) {
        throw (0, r.newError)(`Unable to find latest version on GitHub (${p}), please ensure a production release exists: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return `/${this.options.owner}/${this.options.repo}/releases`;
    }
    resolveFiles(o) {
      return (0, f.resolveFiles)(o, this.baseUrl, (t) => this.getBaseDownloadPath(o.tag, t.replace(/ /g, "-")));
    }
    getBaseDownloadPath(o, t) {
      return `${this.basePath}/download/${o}/${t}`;
    }
  };
  mt.GitHubProvider = d;
  function n(i) {
    const o = i.elementValueOrEmpty("content");
    return o === "No content." ? "" : o;
  }
  function l(i, o, t, p) {
    if (!o)
      return n(p);
    const g = [];
    for (const y of t.getElements("entry")) {
      const m = /\/tag\/v?([^/]+)$/.exec(y.element("link").attribute("href"))[1];
      c.lt(i, m) && g.push({
        version: m,
        note: n(y)
      });
    }
    return g.sort((y, m) => c.rcompare(y.version, m.version));
  }
  return mt;
}
var rr = {}, tl;
function Ff() {
  if (tl) return rr;
  tl = 1, Object.defineProperty(rr, "__esModule", { value: !0 }), rr.KeygenProvider = void 0;
  const r = ke(), c = Pt(), h = Ke();
  let u = class extends h.Provider {
    constructor(s, a, d) {
      super({
        ...d,
        isUseMultipleRangeRequest: !1
      }), this.configuration = s, this.updater = a, this.defaultHostname = "api.keygen.sh";
      const n = this.configuration.host || this.defaultHostname;
      this.baseUrl = (0, c.newBaseUrl)(`https://${n}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
    }
    get channel() {
      return this.updater.channel || this.configuration.channel || "stable";
    }
    async getLatestVersion() {
      const s = new r.CancellationToken(), a = (0, c.getChannelFilename)(this.getCustomChannelName(this.channel)), d = (0, c.newUrlFromBase)(a, this.baseUrl, this.updater.isAddNoCacheQuery);
      try {
        const n = await this.httpRequest(d, {
          Accept: "application/vnd.api+json",
          "Keygen-Version": "1.1"
        }, s);
        return (0, h.parseUpdateInfo)(n, a, d);
      } catch (n) {
        throw (0, r.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${n.stack || n.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    resolveFiles(s) {
      return (0, h.resolveFiles)(s, this.baseUrl);
    }
    toString() {
      const { account: s, product: a, platform: d } = this.configuration;
      return `Keygen (account: ${s}, product: ${a}, platform: ${d}, channel: ${this.channel})`;
    }
  };
  return rr.KeygenProvider = u, rr;
}
var nr = {}, rl;
function xf() {
  if (rl) return nr;
  rl = 1, Object.defineProperty(nr, "__esModule", { value: !0 }), nr.PrivateGitHubProvider = void 0;
  const r = ke(), c = aa(), h = De, u = Mt, f = Pt(), s = ou(), a = Ke();
  let d = class extends s.BaseGitHubProvider {
    constructor(l, i, o, t) {
      super(l, "api.github.com", t), this.updater = i, this.token = o;
    }
    createRequestOptions(l, i) {
      const o = super.createRequestOptions(l, i);
      return o.redirect = "manual", o;
    }
    async getLatestVersion() {
      const l = new r.CancellationToken(), i = (0, f.getChannelFilename)(this.getDefaultChannelName()), o = await this.getLatestVersionInfo(l), t = o.assets.find((y) => y.name === i);
      if (t == null)
        throw (0, r.newError)(`Cannot find ${i} in the release ${o.html_url || o.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      const p = new u.URL(t.url);
      let g;
      try {
        g = (0, c.load)(await this.httpRequest(p, this.configureHeaders("application/octet-stream"), l));
      } catch (y) {
        throw y instanceof r.HttpError && y.statusCode === 404 ? (0, r.newError)(`Cannot find ${i} in the latest release artifacts (${p}): ${y.stack || y.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : y;
      }
      return g.assets = o.assets, g;
    }
    get fileExtraDownloadHeaders() {
      return this.configureHeaders("application/octet-stream");
    }
    configureHeaders(l) {
      return {
        accept: l,
        authorization: `token ${this.token}`
      };
    }
    async getLatestVersionInfo(l) {
      const i = this.updater.allowPrerelease;
      let o = this.basePath;
      i || (o = `${o}/latest`);
      const t = (0, f.newUrlFromBase)(o, this.baseUrl);
      try {
        const p = JSON.parse(await this.httpRequest(t, this.configureHeaders("application/vnd.github.v3+json"), l));
        return i ? p.find((g) => g.prerelease) || p[0] : p;
      } catch (p) {
        throw (0, r.newError)(`Unable to find latest version on GitHub (${t}), please ensure a production release exists: ${p.stack || p.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
      }
    }
    get basePath() {
      return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
    }
    resolveFiles(l) {
      return (0, a.getFileList)(l).map((i) => {
        const o = h.posix.basename(i.url).replace(/ /g, "-"), t = l.assets.find((p) => p != null && p.name === o);
        if (t == null)
          throw (0, r.newError)(`Cannot find asset "${o}" in: ${JSON.stringify(l.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
        return {
          url: new u.URL(t.url),
          info: i
        };
      });
    }
  };
  return nr.PrivateGitHubProvider = d, nr;
}
var nl;
function Lf() {
  if (nl) return er;
  nl = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.isUrlProbablySupportMultiRangeRequests = a, er.createClient = d;
  const r = ke(), c = Nf(), h = au(), u = ou(), f = Ff(), s = xf();
  function a(n) {
    return !n.includes("s3.amazonaws.com");
  }
  function d(n, l, i) {
    if (typeof n == "string")
      throw (0, r.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
    const o = n.provider;
    switch (o) {
      case "github": {
        const t = n, p = (t.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || t.token;
        return p == null ? new u.GitHubProvider(t, l, i) : new s.PrivateGitHubProvider(t, l, p, i);
      }
      case "bitbucket":
        return new c.BitbucketProvider(n, l, i);
      case "keygen":
        return new f.KeygenProvider(n, l, i);
      case "s3":
      case "spaces":
        return new h.GenericProvider({
          provider: "generic",
          url: (0, r.getS3LikeProviderBaseUrl)(n),
          channel: n.channel || null
        }, l, {
          ...i,
          // https://github.com/minio/minio/issues/5285#issuecomment-350428955
          isUseMultipleRangeRequest: !1
        });
      case "generic": {
        const t = n;
        return new h.GenericProvider(t, l, {
          ...i,
          isUseMultipleRangeRequest: t.useMultipleRangeRequest !== !1 && a(t.url)
        });
      }
      case "custom": {
        const t = n, p = t.updateProvider;
        if (!p)
          throw (0, r.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
        return new p(t, l, i);
      }
      default:
        throw (0, r.newError)(`Unsupported provider: ${o}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
    }
  }
  return er;
}
var ir = {}, ar = {}, $t = {}, kt = {}, il;
function da() {
  if (il) return kt;
  il = 1, Object.defineProperty(kt, "__esModule", { value: !0 }), kt.OperationKind = void 0, kt.computeOperations = c;
  var r;
  (function(a) {
    a[a.COPY = 0] = "COPY", a[a.DOWNLOAD = 1] = "DOWNLOAD";
  })(r || (kt.OperationKind = r = {}));
  function c(a, d, n) {
    const l = s(a.files), i = s(d.files);
    let o = null;
    const t = d.files[0], p = [], g = t.name, y = l.get(g);
    if (y == null)
      throw new Error(`no file ${g} in old blockmap`);
    const m = i.get(g);
    let S = 0;
    const { checksumToOffset: C, checksumToOldSize: D } = f(l.get(g), y.offset, n);
    let O = t.offset;
    for (let I = 0; I < m.checksums.length; O += m.sizes[I], I++) {
      const R = m.sizes[I], w = m.checksums[I];
      let A = C.get(w);
      A != null && D.get(w) !== R && (n.warn(`Checksum ("${w}") matches, but size differs (old: ${D.get(w)}, new: ${R})`), A = void 0), A === void 0 ? (S++, o != null && o.kind === r.DOWNLOAD && o.end === O ? o.end += R : (o = {
        kind: r.DOWNLOAD,
        start: O,
        end: O + R
        // oldBlocks: null,
      }, u(o, p, w, I))) : o != null && o.kind === r.COPY && o.end === A ? o.end += R : (o = {
        kind: r.COPY,
        start: A,
        end: A + R
        // oldBlocks: [checksum]
      }, u(o, p, w, I));
    }
    return S > 0 && n.info(`File${t.name === "file" ? "" : " " + t.name} has ${S} changed blocks`), p;
  }
  const h = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
  function u(a, d, n, l) {
    if (h && d.length !== 0) {
      const i = d[d.length - 1];
      if (i.kind === a.kind && a.start < i.end && a.start > i.start) {
        const o = [i.start, i.end, a.start, a.end].reduce((t, p) => t < p ? t : p);
        throw new Error(`operation (block index: ${l}, checksum: ${n}, kind: ${r[a.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${a.start} until ${a.end}
rel: ${i.start - o} until ${i.end - o} and ${a.start - o} until ${a.end - o}`);
      }
    }
    d.push(a);
  }
  function f(a, d, n) {
    const l = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
    let o = d;
    for (let t = 0; t < a.checksums.length; t++) {
      const p = a.checksums[t], g = a.sizes[t], y = i.get(p);
      if (y === void 0)
        l.set(p, o), i.set(p, g);
      else if (n.debug != null) {
        const m = y === g ? "(same size)" : `(size: ${y}, this size: ${g})`;
        n.debug(`${p} duplicated in blockmap ${m}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
      }
      o += g;
    }
    return { checksumToOffset: l, checksumToOldSize: i };
  }
  function s(a) {
    const d = /* @__PURE__ */ new Map();
    for (const n of a)
      d.set(n.name, n);
    return d;
  }
  return kt;
}
var al;
function su() {
  if (al) return $t;
  al = 1, Object.defineProperty($t, "__esModule", { value: !0 }), $t.DataSplitter = void 0, $t.copyData = a;
  const r = ke(), c = ut, h = Er, u = da(), f = Buffer.from(`\r
\r
`);
  var s;
  (function(n) {
    n[n.INIT = 0] = "INIT", n[n.HEADER = 1] = "HEADER", n[n.BODY = 2] = "BODY";
  })(s || (s = {}));
  function a(n, l, i, o, t) {
    const p = (0, c.createReadStream)("", {
      fd: i,
      autoClose: !1,
      start: n.start,
      // end is inclusive
      end: n.end - 1
    });
    p.on("error", o), p.once("end", t), p.pipe(l, {
      end: !1
    });
  }
  let d = class extends h.Writable {
    constructor(l, i, o, t, p, g) {
      super(), this.out = l, this.options = i, this.partIndexToTaskIndex = o, this.partIndexToLength = p, this.finishHandler = g, this.partIndex = -1, this.headerListBuffer = null, this.readState = s.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = t.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
    }
    get isFinished() {
      return this.partIndex === this.partIndexToLength.length;
    }
    // noinspection JSUnusedGlobalSymbols
    _write(l, i, o) {
      if (this.isFinished) {
        console.error(`Trailing ignored data: ${l.length} bytes`);
        return;
      }
      this.handleData(l).then(o).catch(o);
    }
    async handleData(l) {
      let i = 0;
      if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
        throw (0, r.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
      if (this.ignoreByteCount > 0) {
        const o = Math.min(this.ignoreByteCount, l.length);
        this.ignoreByteCount -= o, i = o;
      } else if (this.remainingPartDataCount > 0) {
        const o = Math.min(this.remainingPartDataCount, l.length);
        this.remainingPartDataCount -= o, await this.processPartData(l, 0, o), i = o;
      }
      if (i !== l.length) {
        if (this.readState === s.HEADER) {
          const o = this.searchHeaderListEnd(l, i);
          if (o === -1)
            return;
          i = o, this.readState = s.BODY, this.headerListBuffer = null;
        }
        for (; ; ) {
          if (this.readState === s.BODY)
            this.readState = s.INIT;
          else {
            this.partIndex++;
            let g = this.partIndexToTaskIndex.get(this.partIndex);
            if (g == null)
              if (this.isFinished)
                g = this.options.end;
              else
                throw (0, r.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
            const y = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
            if (y < g)
              await this.copyExistingData(y, g);
            else if (y > g)
              throw (0, r.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
            if (this.isFinished) {
              this.onPartEnd(), this.finishHandler();
              return;
            }
            if (i = this.searchHeaderListEnd(l, i), i === -1) {
              this.readState = s.HEADER;
              return;
            }
          }
          const o = this.partIndexToLength[this.partIndex], t = i + o, p = Math.min(t, l.length);
          if (await this.processPartStarted(l, i, p), this.remainingPartDataCount = o - (p - i), this.remainingPartDataCount > 0)
            return;
          if (i = t + this.boundaryLength, i >= l.length) {
            this.ignoreByteCount = this.boundaryLength - (l.length - t);
            return;
          }
        }
      }
    }
    copyExistingData(l, i) {
      return new Promise((o, t) => {
        const p = () => {
          if (l === i) {
            o();
            return;
          }
          const g = this.options.tasks[l];
          if (g.kind !== u.OperationKind.COPY) {
            t(new Error("Task kind must be COPY"));
            return;
          }
          a(g, this.out, this.options.oldFileFd, t, () => {
            l++, p();
          });
        };
        p();
      });
    }
    searchHeaderListEnd(l, i) {
      const o = l.indexOf(f, i);
      if (o !== -1)
        return o + f.length;
      const t = i === 0 ? l : l.slice(i);
      return this.headerListBuffer == null ? this.headerListBuffer = t : this.headerListBuffer = Buffer.concat([this.headerListBuffer, t]), -1;
    }
    onPartEnd() {
      const l = this.partIndexToLength[this.partIndex - 1];
      if (this.actualPartLength !== l)
        throw (0, r.newError)(`Expected length: ${l} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
      this.actualPartLength = 0;
    }
    processPartStarted(l, i, o) {
      return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(l, i, o);
    }
    processPartData(l, i, o) {
      this.actualPartLength += o - i;
      const t = this.out;
      return t.write(i === 0 && l.length === o ? l : l.slice(i, o)) ? Promise.resolve() : new Promise((p, g) => {
        t.on("error", g), t.once("drain", () => {
          t.removeListener("error", g), p();
        });
      });
    }
  };
  return $t.DataSplitter = d, $t;
}
var or = {}, ol;
function Uf() {
  if (ol) return or;
  ol = 1, Object.defineProperty(or, "__esModule", { value: !0 }), or.executeTasksUsingMultipleRangeRequests = u, or.checkIsRangesSupported = s;
  const r = ke(), c = su(), h = da();
  function u(a, d, n, l, i) {
    const o = (t) => {
      if (t >= d.length) {
        a.fileMetadataBuffer != null && n.write(a.fileMetadataBuffer), n.end();
        return;
      }
      const p = t + 1e3;
      f(a, {
        tasks: d,
        start: t,
        end: Math.min(d.length, p),
        oldFileFd: l
      }, n, () => o(p), i);
    };
    return o;
  }
  function f(a, d, n, l, i) {
    let o = "bytes=", t = 0;
    const p = /* @__PURE__ */ new Map(), g = [];
    for (let S = d.start; S < d.end; S++) {
      const C = d.tasks[S];
      C.kind === h.OperationKind.DOWNLOAD && (o += `${C.start}-${C.end - 1}, `, p.set(t, S), t++, g.push(C.end - C.start));
    }
    if (t <= 1) {
      const S = (C) => {
        if (C >= d.end) {
          l();
          return;
        }
        const D = d.tasks[C++];
        if (D.kind === h.OperationKind.COPY)
          (0, c.copyData)(D, n, d.oldFileFd, i, () => S(C));
        else {
          const O = a.createRequestOptions();
          O.headers.Range = `bytes=${D.start}-${D.end - 1}`;
          const I = a.httpExecutor.createRequest(O, (R) => {
            s(R, i) && (R.pipe(n, {
              end: !1
            }), R.once("end", () => S(C)));
          });
          a.httpExecutor.addErrorAndTimeoutHandlers(I, i), I.end();
        }
      };
      S(d.start);
      return;
    }
    const y = a.createRequestOptions();
    y.headers.Range = o.substring(0, o.length - 2);
    const m = a.httpExecutor.createRequest(y, (S) => {
      if (!s(S, i))
        return;
      const C = (0, r.safeGetHeader)(S, "content-type"), D = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(C);
      if (D == null) {
        i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${C}"`));
        return;
      }
      const O = new c.DataSplitter(n, d, p, D[1] || D[2], g, l);
      O.on("error", i), S.pipe(O), S.on("end", () => {
        setTimeout(() => {
          m.abort(), i(new Error("Response ends without calling any handlers"));
        }, 1e4);
      });
    });
    a.httpExecutor.addErrorAndTimeoutHandlers(m, i), m.end();
  }
  function s(a, d) {
    if (a.statusCode >= 400)
      return d((0, r.createHttpError)(a)), !1;
    if (a.statusCode !== 206) {
      const n = (0, r.safeGetHeader)(a, "accept-ranges");
      if (n == null || n === "none")
        return d(new Error(`Server doesn't support Accept-Ranges (response code ${a.statusCode})`)), !1;
    }
    return !0;
  }
  return or;
}
var sr = {}, sl;
function $f() {
  if (sl) return sr;
  sl = 1, Object.defineProperty(sr, "__esModule", { value: !0 }), sr.ProgressDifferentialDownloadCallbackTransform = void 0;
  const r = Er;
  var c;
  (function(u) {
    u[u.COPY = 0] = "COPY", u[u.DOWNLOAD = 1] = "DOWNLOAD";
  })(c || (c = {}));
  let h = class extends r.Transform {
    constructor(f, s, a) {
      super(), this.progressDifferentialDownloadInfo = f, this.cancellationToken = s, this.onProgress = a, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = c.COPY, this.nextUpdate = this.start + 1e3;
    }
    _transform(f, s, a) {
      if (this.cancellationToken.cancelled) {
        a(new Error("cancelled"), null);
        return;
      }
      if (this.operationType == c.COPY) {
        a(null, f);
        return;
      }
      this.transferred += f.length, this.delta += f.length;
      const d = Date.now();
      d >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = d + 1e3, this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((d - this.start) / 1e3))
      }), this.delta = 0), a(null, f);
    }
    beginFileCopy() {
      this.operationType = c.COPY;
    }
    beginRangeDownload() {
      this.operationType = c.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
    }
    endRangeDownload() {
      this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      });
    }
    // Called when we are 100% done with the connection/download
    _flush(f) {
      if (this.cancellationToken.cancelled) {
        f(new Error("cancelled"));
        return;
      }
      this.onProgress({
        total: this.progressDifferentialDownloadInfo.grandTotal,
        delta: this.delta,
        transferred: this.transferred,
        percent: 100,
        bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
      }), this.delta = 0, this.transferred = 0, f(null);
    }
  };
  return sr.ProgressDifferentialDownloadCallbackTransform = h, sr;
}
var ll;
function lu() {
  if (ll) return ar;
  ll = 1, Object.defineProperty(ar, "__esModule", { value: !0 }), ar.DifferentialDownloader = void 0;
  const r = ke(), c = /* @__PURE__ */ gt(), h = ut, u = su(), f = Mt, s = da(), a = Uf(), d = $f();
  let n = class {
    // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
    constructor(t, p, g) {
      this.blockAwareFileInfo = t, this.httpExecutor = p, this.options = g, this.fileMetadataBuffer = null, this.logger = g.logger;
    }
    createRequestOptions() {
      const t = {
        headers: {
          ...this.options.requestHeaders,
          accept: "*/*"
        }
      };
      return (0, r.configureRequestUrl)(this.options.newUrl, t), (0, r.configureRequestOptions)(t), t;
    }
    doDownload(t, p) {
      if (t.version !== p.version)
        throw new Error(`version is different (${t.version} - ${p.version}), full download is required`);
      const g = this.logger, y = (0, s.computeOperations)(t, p, g);
      g.debug != null && g.debug(JSON.stringify(y, null, 2));
      let m = 0, S = 0;
      for (const D of y) {
        const O = D.end - D.start;
        D.kind === s.OperationKind.DOWNLOAD ? m += O : S += O;
      }
      const C = this.blockAwareFileInfo.size;
      if (m + S + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== C)
        throw new Error(`Internal error, size mismatch: downloadSize: ${m}, copySize: ${S}, newSize: ${C}`);
      return g.info(`Full: ${l(C)}, To download: ${l(m)} (${Math.round(m / (C / 100))}%)`), this.downloadFile(y);
    }
    downloadFile(t) {
      const p = [], g = () => Promise.all(p.map((y) => (0, c.close)(y.descriptor).catch((m) => {
        this.logger.error(`cannot close file "${y.path}": ${m}`);
      })));
      return this.doDownloadFile(t, p).then(g).catch((y) => g().catch((m) => {
        try {
          this.logger.error(`cannot close files: ${m}`);
        } catch (S) {
          try {
            console.error(S);
          } catch {
          }
        }
        throw y;
      }).then(() => {
        throw y;
      }));
    }
    async doDownloadFile(t, p) {
      const g = await (0, c.open)(this.options.oldFile, "r");
      p.push({ descriptor: g, path: this.options.oldFile });
      const y = await (0, c.open)(this.options.newFile, "w");
      p.push({ descriptor: y, path: this.options.newFile });
      const m = (0, h.createWriteStream)(this.options.newFile, { fd: y });
      await new Promise((S, C) => {
        const D = [];
        let O;
        if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
          const x = [];
          let q = 0;
          for (const P of t)
            P.kind === s.OperationKind.DOWNLOAD && (x.push(P.end - P.start), q += P.end - P.start);
          const N = {
            expectedByteCounts: x,
            grandTotal: q
          };
          O = new d.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), D.push(O);
        }
        const I = new r.DigestTransform(this.blockAwareFileInfo.sha512);
        I.isValidateOnEnd = !1, D.push(I), m.on("finish", () => {
          m.close(() => {
            p.splice(1, 1);
            try {
              I.validate();
            } catch (x) {
              C(x);
              return;
            }
            S(void 0);
          });
        }), D.push(m);
        let R = null;
        for (const x of D)
          x.on("error", C), R == null ? R = x : R = R.pipe(x);
        const w = D[0];
        let A;
        if (this.options.isUseMultipleRangeRequest) {
          A = (0, a.executeTasksUsingMultipleRangeRequests)(this, t, w, g, C), A(0);
          return;
        }
        let E = 0, $ = null;
        this.logger.info(`Differential download: ${this.options.newUrl}`);
        const F = this.createRequestOptions();
        F.redirect = "manual", A = (x) => {
          var q, N;
          if (x >= t.length) {
            this.fileMetadataBuffer != null && w.write(this.fileMetadataBuffer), w.end();
            return;
          }
          const P = t[x++];
          if (P.kind === s.OperationKind.COPY) {
            O && O.beginFileCopy(), (0, u.copyData)(P, w, g, C, () => A(x));
            return;
          }
          const U = `bytes=${P.start}-${P.end - 1}`;
          F.headers.range = U, (N = (q = this.logger) === null || q === void 0 ? void 0 : q.debug) === null || N === void 0 || N.call(q, `download range: ${U}`), O && O.beginRangeDownload();
          const M = this.httpExecutor.createRequest(F, (J) => {
            J.on("error", C), J.on("aborted", () => {
              C(new Error("response has been aborted by the server"));
            }), J.statusCode >= 400 && C((0, r.createHttpError)(J)), J.pipe(w, {
              end: !1
            }), J.once("end", () => {
              O && O.endRangeDownload(), ++E === 100 ? (E = 0, setTimeout(() => A(x), 1e3)) : A(x);
            });
          });
          M.on("redirect", (J, V, ne) => {
            this.logger.info(`Redirect to ${i(ne)}`), $ = ne, (0, r.configureRequestUrl)(new f.URL($), F), M.followRedirect();
          }), this.httpExecutor.addErrorAndTimeoutHandlers(M, C), M.end();
        }, A(0);
      });
    }
    async readRemoteBytes(t, p) {
      const g = Buffer.allocUnsafe(p + 1 - t), y = this.createRequestOptions();
      y.headers.range = `bytes=${t}-${p}`;
      let m = 0;
      if (await this.request(y, (S) => {
        S.copy(g, m), m += S.length;
      }), m !== g.length)
        throw new Error(`Received data length ${m} is not equal to expected ${g.length}`);
      return g;
    }
    request(t, p) {
      return new Promise((g, y) => {
        const m = this.httpExecutor.createRequest(t, (S) => {
          (0, a.checkIsRangesSupported)(S, y) && (S.on("error", y), S.on("aborted", () => {
            y(new Error("response has been aborted by the server"));
          }), S.on("data", p), S.on("end", () => g()));
        });
        this.httpExecutor.addErrorAndTimeoutHandlers(m, y), m.end();
      });
    }
  };
  ar.DifferentialDownloader = n;
  function l(o, t = " KB") {
    return new Intl.NumberFormat("en").format((o / 1024).toFixed(2)) + t;
  }
  function i(o) {
    const t = o.indexOf("?");
    return t < 0 ? o : o.substring(0, t);
  }
  return ar;
}
var ul;
function kf() {
  if (ul) return ir;
  ul = 1, Object.defineProperty(ir, "__esModule", { value: !0 }), ir.GenericDifferentialDownloader = void 0;
  const r = lu();
  let c = class extends r.DifferentialDownloader {
    download(u, f) {
      return this.doDownload(u, f);
    }
  };
  return ir.GenericDifferentialDownloader = c, ir;
}
var Qi = {}, cl;
function Nt() {
  return cl || (cl = 1, function(r) {
    Object.defineProperty(r, "__esModule", { value: !0 }), r.UpdaterSignal = r.UPDATE_DOWNLOADED = r.DOWNLOAD_PROGRESS = r.CancellationToken = void 0, r.addHandler = u;
    const c = ke();
    Object.defineProperty(r, "CancellationToken", { enumerable: !0, get: function() {
      return c.CancellationToken;
    } }), r.DOWNLOAD_PROGRESS = "download-progress", r.UPDATE_DOWNLOADED = "update-downloaded";
    class h {
      constructor(s) {
        this.emitter = s;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(s) {
        u(this.emitter, "login", s);
      }
      progress(s) {
        u(this.emitter, r.DOWNLOAD_PROGRESS, s);
      }
      updateDownloaded(s) {
        u(this.emitter, r.UPDATE_DOWNLOADED, s);
      }
      updateCancelled(s) {
        u(this.emitter, "update-cancelled", s);
      }
    }
    r.UpdaterSignal = h;
    function u(f, s, a) {
      f.on(s, a);
    }
  }(Qi)), Qi;
}
var fl;
function ha() {
  if (fl) return Tt;
  fl = 1, Object.defineProperty(Tt, "__esModule", { value: !0 }), Tt.NoOpLogger = Tt.AppUpdater = void 0;
  const r = ke(), c = qt, h = vr, u = Pl, f = /* @__PURE__ */ gt(), s = aa(), a = ef(), d = De, n = iu(), l = bf(), i = Df(), o = If(), t = au(), p = Lf(), g = Fl, y = Pt(), m = kf(), S = Nt();
  let C = class uu extends u.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(R) {
      if (this._channel != null) {
        if (typeof R != "string")
          throw (0, r.newError)(`Channel must be a string, but got: ${R}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (R.length === 0)
          throw (0, r.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = R, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(R) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: R
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, o.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(R) {
      this._logger = R ?? new O();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(R) {
      this.clientPromise = null, this._appUpdateConfigPath = R, this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig());
    }
    /**
     * Allows developer to override default logic for determining if an update is supported.
     * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
     */
    get isUpdateSupported() {
      return this._isUpdateSupported;
    }
    set isUpdateSupported(R) {
      R && (this._isUpdateSupported = R);
    }
    constructor(R, w) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new S.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = ($) => this.checkIfUpdateSupported($), this.clientPromise = null, this.stagingUserIdPromise = new a.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new a.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", ($) => {
        this._logger.error(`Error: ${$.stack || $.message}`);
      }), w == null ? (this.app = new i.ElectronAppAdapter(), this.httpExecutor = new o.ElectronHttpExecutor(($, F) => this.emit("login", $, F))) : (this.app = w, this.httpExecutor = null);
      const A = this.app.version, E = (0, n.parse)(A);
      if (E == null)
        throw (0, r.newError)(`App version is not a valid semver version: "${A}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = E, this.allowPrerelease = D(E), R != null && (this.setFeedURL(R), typeof R != "string" && R.requestHeaders && (this.requestHeaders = R.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(R) {
      const w = this.createProviderRuntimeOptions();
      let A;
      typeof R == "string" ? A = new t.GenericProvider({ provider: "generic", url: R }, this, {
        ...w,
        isUseMultipleRangeRequest: (0, p.isUrlProbablySupportMultiRangeRequests)(R)
      }) : A = (0, p.createClient)(R, this, w), this.clientPromise = Promise.resolve(A);
    }
    /**
     * Asks the server whether there is an update.
     * @returns null if the updater is disabled, otherwise info about the latest version
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let R = this.checkForUpdatesPromise;
      if (R != null)
        return this._logger.info("Checking for update (already in progress)"), R;
      const w = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), R = this.doCheckForUpdates().then((A) => (w(), A)).catch((A) => {
        throw w(), this.emit("error", A, `Cannot check for updates: ${(A.stack || A).toString()}`), A;
      }), this.checkForUpdatesPromise = R, R;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(R) {
      return this.checkForUpdates().then((w) => w != null && w.downloadPromise ? (w.downloadPromise.then(() => {
        const A = uu.formatDownloadNotification(w.updateInfo.version, this.app.name, R);
        new Dt.Notification(A).show();
      }), w) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), w));
    }
    static formatDownloadNotification(R, w, A) {
      return A == null && (A = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), A = {
        title: A.title.replace("{appName}", w).replace("{version}", R),
        body: A.body.replace("{appName}", w).replace("{version}", R)
      }, A;
    }
    async isStagingMatch(R) {
      const w = R.stagingPercentage;
      let A = w;
      if (A == null)
        return !0;
      if (A = parseInt(A, 10), isNaN(A))
        return this._logger.warn(`Staging percentage is NaN: ${w}`), !0;
      A = A / 100;
      const E = await this.stagingUserIdPromise.value, F = r.UUID.parse(E).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${A}, percentage: ${F}, user id: ${E}`), F < A;
    }
    computeFinalHeaders(R) {
      return this.requestHeaders != null && Object.assign(R, this.requestHeaders), R;
    }
    async isUpdateAvailable(R) {
      const w = (0, n.parse)(R.version);
      if (w == null)
        throw (0, r.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${R.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const A = this.currentVersion;
      if ((0, n.eq)(w, A) || !await Promise.resolve(this.isUpdateSupported(R)) || !await this.isStagingMatch(R))
        return !1;
      const $ = (0, n.gt)(w, A), F = (0, n.lt)(w, A);
      return $ ? !0 : this.allowDowngrade && F;
    }
    checkIfUpdateSupported(R) {
      const w = R == null ? void 0 : R.minimumSystemVersion, A = (0, h.release)();
      if (w)
        try {
          if ((0, n.lt)(A, w))
            return this._logger.info(`Current OS version ${A} is less than the minimum OS version required ${w} for version ${A}`), !1;
        } catch (E) {
          this._logger.warn(`Failed to compare current OS version(${A}) with minimum OS version(${w}): ${(E.message || E).toString()}`);
        }
      return !0;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((A) => (0, p.createClient)(A, this, this.createProviderRuntimeOptions())));
      const R = await this.clientPromise, w = await this.stagingUserIdPromise.value;
      return R.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": w })), {
        info: await R.getLatestVersion(),
        provider: R
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const R = await this.getUpdateInfoAndProvider(), w = R.info;
      if (!await this.isUpdateAvailable(w))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${w.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", w), {
          isUpdateAvailable: !1,
          versionInfo: w,
          updateInfo: w
        };
      this.updateInfoAndProvider = R, this.onUpdateAvailable(w);
      const A = new r.CancellationToken();
      return {
        isUpdateAvailable: !0,
        versionInfo: w,
        updateInfo: w,
        cancellationToken: A,
        downloadPromise: this.autoDownload ? this.downloadUpdate(A) : null
      };
    }
    onUpdateAvailable(R) {
      this._logger.info(`Found version ${R.version} (url: ${(0, r.asArray)(R.files).map((w) => w.url).join(", ")})`), this.emit("update-available", R);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(R = new r.CancellationToken()) {
      const w = this.updateInfoAndProvider;
      if (w == null) {
        const E = new Error("Please check update first");
        return this.dispatchError(E), Promise.reject(E);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, r.asArray)(w.info.files).map((E) => E.url).join(", ")}`);
      const A = (E) => {
        if (!(E instanceof r.CancellationError))
          try {
            this.dispatchError(E);
          } catch ($) {
            this._logger.warn(`Cannot dispatch error event: ${$.stack || $}`);
          }
        return E;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: w,
        requestHeaders: this.computeRequestHeaders(w.provider),
        cancellationToken: R,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((E) => {
        throw A(E);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(R) {
      this.emit("error", R, (R.stack || R).toString());
    }
    dispatchUpdateDownloaded(R) {
      this.emit(S.UPDATE_DOWNLOADED, R);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, s.load)(await (0, f.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(R) {
      const w = R.fileExtraDownloadHeaders;
      if (w != null) {
        const A = this.requestHeaders;
        return A == null ? w : {
          ...w,
          ...A
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const R = d.join(this.app.userDataPath, ".updaterId");
      try {
        const A = await (0, f.readFile)(R, "utf-8");
        if (r.UUID.check(A))
          return A;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${A}`);
      } catch (A) {
        A.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${A}`);
      }
      const w = r.UUID.v5((0, c.randomBytes)(4096), r.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${w}`);
      try {
        await (0, f.outputFile)(R, w);
      } catch (A) {
        this._logger.warn(`Couldn't write out staging user ID: ${A}`);
      }
      return w;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const R = this.requestHeaders;
      if (R == null)
        return !0;
      for (const w of Object.keys(R)) {
        const A = w.toLowerCase();
        if (A === "authorization" || A === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let R = this.downloadedUpdateHelper;
      if (R == null) {
        const w = (await this.configOnDisk.value).updaterCacheDirName, A = this._logger;
        w == null && A.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const E = d.join(this.app.baseCachePath, w || this.app.name);
        A.debug != null && A.debug(`updater cache dir: ${E}`), R = new l.DownloadedUpdateHelper(E), this.downloadedUpdateHelper = R;
      }
      return R;
    }
    async executeDownload(R) {
      const w = R.fileInfo, A = {
        headers: R.downloadUpdateOptions.requestHeaders,
        cancellationToken: R.downloadUpdateOptions.cancellationToken,
        sha2: w.info.sha2,
        sha512: w.info.sha512
      };
      this.listenerCount(S.DOWNLOAD_PROGRESS) > 0 && (A.onProgress = (ie) => this.emit(S.DOWNLOAD_PROGRESS, ie));
      const E = R.downloadUpdateOptions.updateInfoAndProvider.info, $ = E.version, F = w.packageInfo;
      function x() {
        const ie = decodeURIComponent(R.fileInfo.url.pathname);
        return ie.endsWith(`.${R.fileExtension}`) ? d.basename(ie) : R.fileInfo.info.url;
      }
      const q = await this.getOrCreateDownloadHelper(), N = q.cacheDirForPendingUpdate;
      await (0, f.mkdir)(N, { recursive: !0 });
      const P = x();
      let U = d.join(N, P);
      const M = F == null ? null : d.join(N, `package-${$}${d.extname(F.path) || ".7z"}`), J = async (ie) => (await q.setDownloadedFile(U, M, E, w, P, ie), await R.done({
        ...E,
        downloadedFile: U
      }), M == null ? [U] : [U, M]), V = this._logger, ne = await q.validateDownloadedPath(U, E, w, V);
      if (ne != null)
        return U = ne, await J(!1);
      const ce = async () => (await q.clear().catch(() => {
      }), await (0, f.unlink)(U).catch(() => {
      })), ue = await (0, l.createTempUpdateFile)(`temp-${P}`, N, V);
      try {
        await R.task(ue, A, M, ce), await (0, r.retry)(() => (0, f.rename)(ue, U), 60, 500, 0, 0, (ie) => ie instanceof Error && /^EBUSY:/.test(ie.message));
      } catch (ie) {
        throw await ce(), ie instanceof r.CancellationError && (V.info("cancelled"), this.emit("update-cancelled", E)), ie;
      }
      return V.info(`New version ${$} has been downloaded to ${U}`), await J(!0);
    }
    async differentialDownloadInstaller(R, w, A, E, $) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const F = (0, y.blockmapFiles)(R.url, this.app.version, w.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${F[0]}", new: ${F[1]})`);
        const x = async (P) => {
          const U = await this.httpExecutor.downloadToBuffer(P, {
            headers: w.requestHeaders,
            cancellationToken: w.cancellationToken
          });
          if (U == null || U.length === 0)
            throw new Error(`Blockmap "${P.href}" is empty`);
          try {
            return JSON.parse((0, g.gunzipSync)(U).toString());
          } catch (M) {
            throw new Error(`Cannot parse blockmap "${P.href}", error: ${M}`);
          }
        }, q = {
          newUrl: R.url,
          oldFile: d.join(this.downloadedUpdateHelper.cacheDir, $),
          logger: this._logger,
          newFile: A,
          isUseMultipleRangeRequest: E.isUseMultipleRangeRequest,
          requestHeaders: w.requestHeaders,
          cancellationToken: w.cancellationToken
        };
        this.listenerCount(S.DOWNLOAD_PROGRESS) > 0 && (q.onProgress = (P) => this.emit(S.DOWNLOAD_PROGRESS, P));
        const N = await Promise.all(F.map((P) => x(P)));
        return await new m.GenericDifferentialDownloader(R.info, this.httpExecutor, q).download(N[0], N[1]), !1;
      } catch (F) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${F.stack || F}`), this._testOnlyOptions != null)
          throw F;
        return !0;
      }
    }
  };
  Tt.AppUpdater = C;
  function D(I) {
    const R = (0, n.prerelease)(I);
    return R != null && R.length > 0;
  }
  class O {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(R) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(R) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(R) {
    }
  }
  return Tt.NoOpLogger = O, Tt;
}
var dl;
function Gt() {
  if (dl) return Yt;
  dl = 1, Object.defineProperty(Yt, "__esModule", { value: !0 }), Yt.BaseUpdater = void 0;
  const r = jr, c = ha();
  let h = class extends c.AppUpdater {
    constructor(f, s) {
      super(f, s), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(f = !1, s = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(f, f ? s : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Dt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(f) {
      return super.executeDownload({
        ...f,
        done: (s) => (this.dispatchUpdateDownloaded(s), this.addQuitHandler(), Promise.resolve())
      });
    }
    get installerPath() {
      return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
    }
    // must be sync (because quit even handler is not async)
    install(f = !1, s = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const a = this.downloadedUpdateHelper, d = this.installerPath, n = a == null ? null : a.downloadedFileInfo;
      if (d == null || n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${f}, isForceRunAfter: ${s}`), this.doInstall({
          isSilent: f,
          isForceRunAfter: s,
          isAdminRightsRequired: n.isAdminRightsRequired
        });
      } catch (l) {
        return this.dispatchError(l), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((f) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (f !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${f}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: f } = this.app, s = `"${f} would like to update"`, a = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), d = [a];
      return /kdesudo/i.test(a) ? (d.push("--comment", s), d.push("-c")) : /gksudo/i.test(a) ? d.push("--message", s) : /pkexec/i.test(a) && d.push("--disable-internal-agent"), d.join(" ");
    }
    spawnSyncLog(f, s = [], a = {}) {
      this._logger.info(`Executing: ${f} with args: ${s}`);
      const d = (0, r.spawnSync)(f, s, {
        env: { ...process.env, ...a },
        encoding: "utf-8",
        shell: !0
      }), { error: n, status: l, stdout: i, stderr: o } = d;
      if (n != null)
        throw this._logger.error(o), n;
      if (l != null && l !== 0)
        throw this._logger.error(o), new Error(`Command ${f} exited with code ${l}`);
      return i.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(f, s = [], a = void 0, d = "ignore") {
      return this._logger.info(`Executing: ${f} with args: ${s}`), new Promise((n, l) => {
        try {
          const i = { stdio: d, env: a, detached: !0 }, o = (0, r.spawn)(f, s, i);
          o.on("error", (t) => {
            l(t);
          }), o.unref(), o.pid !== void 0 && n(!0);
        } catch (i) {
          l(i);
        }
      });
    }
  };
  return Yt.BaseUpdater = h, Yt;
}
var lr = {}, ur = {}, hl;
function cu() {
  if (hl) return ur;
  hl = 1, Object.defineProperty(ur, "__esModule", { value: !0 }), ur.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
  const r = /* @__PURE__ */ gt(), c = lu(), h = Fl;
  let u = class extends c.DifferentialDownloader {
    async download() {
      const d = this.blockAwareFileInfo, n = d.size, l = n - (d.blockMapSize + 4);
      this.fileMetadataBuffer = await this.readRemoteBytes(l, n - 1);
      const i = f(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
      await this.doDownload(await s(this.options.oldFile), i);
    }
  };
  ur.FileWithEmbeddedBlockMapDifferentialDownloader = u;
  function f(a) {
    return JSON.parse((0, h.inflateRawSync)(a).toString());
  }
  async function s(a) {
    const d = await (0, r.open)(a, "r");
    try {
      const n = (await (0, r.fstat)(d)).size, l = Buffer.allocUnsafe(4);
      await (0, r.read)(d, l, 0, l.length, n - l.length);
      const i = Buffer.allocUnsafe(l.readUInt32BE(0));
      return await (0, r.read)(d, i, 0, i.length, n - l.length - i.length), await (0, r.close)(d), f(i);
    } catch (n) {
      throw await (0, r.close)(d), n;
    }
  }
  return ur;
}
var pl;
function ml() {
  if (pl) return lr;
  pl = 1, Object.defineProperty(lr, "__esModule", { value: !0 }), lr.AppImageUpdater = void 0;
  const r = ke(), c = jr, h = /* @__PURE__ */ gt(), u = ut, f = De, s = Gt(), a = cu(), d = Ke(), n = Nt();
  let l = class extends s.BaseUpdater {
    constructor(o, t) {
      super(o, t);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(o) {
      const t = o.updateInfoAndProvider.provider, p = (0, d.findFile)(t.resolveFiles(o.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: p,
        downloadUpdateOptions: o,
        task: async (g, y) => {
          const m = process.env.APPIMAGE;
          if (m == null)
            throw (0, r.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          (o.disableDifferentialDownload || await this.downloadDifferential(p, m, g, t, o)) && await this.httpExecutor.download(p.url, g, y), await (0, h.chmod)(g, 493);
        }
      });
    }
    async downloadDifferential(o, t, p, g, y) {
      try {
        const m = {
          newUrl: o.url,
          oldFile: t,
          logger: this._logger,
          newFile: p,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          requestHeaders: y.requestHeaders,
          cancellationToken: y.cancellationToken
        };
        return this.listenerCount(n.DOWNLOAD_PROGRESS) > 0 && (m.onProgress = (S) => this.emit(n.DOWNLOAD_PROGRESS, S)), await new a.FileWithEmbeddedBlockMapDifferentialDownloader(o.info, this.httpExecutor, m).download(), !1;
      } catch (m) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${m.stack || m}`), process.platform === "linux";
      }
    }
    doInstall(o) {
      const t = process.env.APPIMAGE;
      if (t == null)
        throw (0, r.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, u.unlinkSync)(t);
      let p;
      const g = f.basename(t), y = this.installerPath;
      if (y == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      f.basename(y) === g || !/\d+\.\d+\.\d+/.test(g) ? p = t : p = f.join(f.dirname(t), f.basename(y)), (0, c.execFileSync)("mv", ["-f", y, p]), p !== t && this.emit("appimage-filename-updated", p);
      const m = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return o.isForceRunAfter ? this.spawnLog(p, [], m) : (m.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, c.execFileSync)(p, [], { env: m })), !0;
    }
  };
  return lr.AppImageUpdater = l, lr;
}
var cr = {}, gl;
function vl() {
  if (gl) return cr;
  gl = 1, Object.defineProperty(cr, "__esModule", { value: !0 }), cr.DebUpdater = void 0;
  const r = Gt(), c = Ke(), h = Nt();
  let u = class extends r.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, d = (0, c.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: d,
        downloadUpdateOptions: s,
        task: async (n, l) => {
          this.listenerCount(h.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (i) => this.emit(h.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(d.url, n, l);
        }
      });
    }
    get installerPath() {
      var s, a;
      return (a = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/ /g, "\\ ")) !== null && a !== void 0 ? a : null;
    }
    doInstall(s) {
      const a = this.wrapSudo(), d = /pkexec/i.test(a) ? "" : '"', n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const l = ["dpkg", "-i", n, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(a, [`${d}/bin/bash`, "-c", `'${l.join(" ")}'${d}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return cr.DebUpdater = u, cr;
}
var fr = {}, El;
function yl() {
  if (El) return fr;
  El = 1, Object.defineProperty(fr, "__esModule", { value: !0 }), fr.PacmanUpdater = void 0;
  const r = Gt(), c = Nt(), h = Ke();
  let u = class extends r.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, d = (0, h.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
      return this.executeDownload({
        fileExtension: "pacman",
        fileInfo: d,
        downloadUpdateOptions: s,
        task: async (n, l) => {
          this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (i) => this.emit(c.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(d.url, n, l);
        }
      });
    }
    get installerPath() {
      var s, a;
      return (a = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/ /g, "\\ ")) !== null && a !== void 0 ? a : null;
    }
    doInstall(s) {
      const a = this.wrapSudo(), d = /pkexec/i.test(a) ? "" : '"', n = this.installerPath;
      if (n == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const l = ["pacman", "-U", "--noconfirm", n];
      return this.spawnSyncLog(a, [`${d}/bin/bash`, "-c", `'${l.join(" ")}'${d}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return fr.PacmanUpdater = u, fr;
}
var dr = {}, wl;
function _l() {
  if (wl) return dr;
  wl = 1, Object.defineProperty(dr, "__esModule", { value: !0 }), dr.RpmUpdater = void 0;
  const r = Gt(), c = Nt(), h = Ke();
  let u = class extends r.BaseUpdater {
    constructor(s, a) {
      super(s, a);
    }
    /*** @private */
    doDownloadUpdate(s) {
      const a = s.updateInfoAndProvider.provider, d = (0, h.findFile)(a.resolveFiles(s.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: d,
        downloadUpdateOptions: s,
        task: async (n, l) => {
          this.listenerCount(c.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (i) => this.emit(c.DOWNLOAD_PROGRESS, i)), await this.httpExecutor.download(d.url, n, l);
        }
      });
    }
    get installerPath() {
      var s, a;
      return (a = (s = super.installerPath) === null || s === void 0 ? void 0 : s.replace(/ /g, "\\ ")) !== null && a !== void 0 ? a : null;
    }
    doInstall(s) {
      const a = this.wrapSudo(), d = /pkexec/i.test(a) ? "" : '"', n = this.spawnSyncLog("which zypper"), l = this.installerPath;
      if (l == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      let i;
      return n ? i = [n, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", l] : i = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", l], this.spawnSyncLog(a, [`${d}/bin/bash`, "-c", `'${i.join(" ")}'${d}`]), s.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return dr.RpmUpdater = u, dr;
}
var hr = {}, Al;
function Sl() {
  if (Al) return hr;
  Al = 1, Object.defineProperty(hr, "__esModule", { value: !0 }), hr.MacUpdater = void 0;
  const r = ke(), c = /* @__PURE__ */ gt(), h = ut, u = De, f = uc, s = ha(), a = Ke(), d = jr, n = qt;
  let l = class extends s.AppUpdater {
    constructor(o, t) {
      super(o, t), this.nativeUpdater = Dt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (p) => {
        this._logger.warn(p), this.emit("error", p);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(o) {
      this._logger.debug != null && this._logger.debug(o);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((o) => {
        o && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(o) {
      let t = o.updateInfoAndProvider.provider.resolveFiles(o.updateInfoAndProvider.info);
      const p = this._logger, g = "sysctl.proc_translated";
      let y = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), y = (0, d.execFileSync)("sysctl", [g], { encoding: "utf8" }).includes(`${g}: 1`), p.info(`Checked for macOS Rosetta environment (isRosetta=${y})`);
      } catch (I) {
        p.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${I}`);
      }
      let m = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const R = (0, d.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        p.info(`Checked 'uname -a': arm64=${R}`), m = m || R;
      } catch (I) {
        p.warn(`uname shell command to check for arm64 failed: ${I}`);
      }
      m = m || process.arch === "arm64" || y;
      const S = (I) => {
        var R;
        return I.url.pathname.includes("arm64") || ((R = I.info.url) === null || R === void 0 ? void 0 : R.includes("arm64"));
      };
      m && t.some(S) ? t = t.filter((I) => m === S(I)) : t = t.filter((I) => !S(I));
      const C = (0, a.findFile)(t, "zip", ["pkg", "dmg"]);
      if (C == null)
        throw (0, r.newError)(`ZIP file not provided: ${(0, r.safeStringifyJson)(t)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const D = o.updateInfoAndProvider.provider, O = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: C,
        downloadUpdateOptions: o,
        task: async (I, R) => {
          const w = u.join(this.downloadedUpdateHelper.cacheDir, O), A = () => (0, c.pathExistsSync)(w) ? !o.disableDifferentialDownload : (p.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let E = !0;
          A() && (E = await this.differentialDownloadInstaller(C, o, I, D, O)), E && await this.httpExecutor.download(C.url, I, R);
        },
        done: async (I) => {
          if (!o.disableDifferentialDownload)
            try {
              const R = u.join(this.downloadedUpdateHelper.cacheDir, O);
              await (0, c.copyFile)(I.downloadedFile, R);
            } catch (R) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${R.message}`);
            }
          return this.updateDownloaded(C, I);
        }
      });
    }
    async updateDownloaded(o, t) {
      var p;
      const g = t.downloadedFile, y = (p = o.info.size) !== null && p !== void 0 ? p : (await (0, c.stat)(g)).size, m = this._logger, S = `fileToProxy=${o.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${S})`), this.server = (0, f.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${S})`), this.server.on("close", () => {
        m.info(`Proxy server for native Squirrel.Mac is closed (${S})`);
      });
      const C = (D) => {
        const O = D.address();
        return typeof O == "string" ? O : `http://127.0.0.1:${O == null ? void 0 : O.port}`;
      };
      return await new Promise((D, O) => {
        const I = (0, n.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), R = Buffer.from(`autoupdater:${I}`, "ascii"), w = `/${(0, n.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (A, E) => {
          const $ = A.url;
          if (m.info(`${$} requested`), $ === "/") {
            if (!A.headers.authorization || A.headers.authorization.indexOf("Basic ") === -1) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("No authenthication info");
              return;
            }
            const q = A.headers.authorization.split(" ")[1], N = Buffer.from(q, "base64").toString("ascii"), [P, U] = N.split(":");
            if (P !== "autoupdater" || U !== I) {
              E.statusCode = 401, E.statusMessage = "Invalid Authentication Credentials", E.end(), m.warn("Invalid authenthication credentials");
              return;
            }
            const M = Buffer.from(`{ "url": "${C(this.server)}${w}" }`);
            E.writeHead(200, { "Content-Type": "application/json", "Content-Length": M.length }), E.end(M);
            return;
          }
          if (!$.startsWith(w)) {
            m.warn(`${$} requested, but not supported`), E.writeHead(404), E.end();
            return;
          }
          m.info(`${w} requested by Squirrel.Mac, pipe ${g}`);
          let F = !1;
          E.on("finish", () => {
            F || (this.nativeUpdater.removeListener("error", O), D([]));
          });
          const x = (0, h.createReadStream)(g);
          x.on("error", (q) => {
            try {
              E.end();
            } catch (N) {
              m.warn(`cannot end response: ${N}`);
            }
            F = !0, this.nativeUpdater.removeListener("error", O), O(new Error(`Cannot pipe "${g}": ${q}`));
          }), E.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": y
          }), x.pipe(E);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${S})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${C(this.server)}, ${S})`), this.nativeUpdater.setFeedURL({
            url: C(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${R.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(t), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", O), this.nativeUpdater.checkForUpdates()) : D([]);
        });
      });
    }
    handleUpdateDownloaded() {
      this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return hr.MacUpdater = l, hr;
}
var pr = {}, Mr = {}, Tl;
function qf() {
  if (Tl) return Mr;
  Tl = 1, Object.defineProperty(Mr, "__esModule", { value: !0 }), Mr.verifySignature = f;
  const r = ke(), c = jr, h = vr, u = De;
  function f(n, l, i) {
    return new Promise((o, t) => {
      const p = l.replace(/'/g, "''");
      i.info(`Verifying signature ${p}`), (0, c.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${p}' | ConvertTo-Json -Compress"`], {
        shell: !0,
        timeout: 20 * 1e3
      }, (g, y, m) => {
        var S;
        try {
          if (g != null || m) {
            a(i, g, m, t), o(null);
            return;
          }
          const C = s(y);
          if (C.Status === 0) {
            try {
              const R = u.normalize(C.Path), w = u.normalize(l);
              if (i.info(`LiteralPath: ${R}. Update Path: ${w}`), R !== w) {
                a(i, new Error(`LiteralPath of ${R} is different than ${w}`), m, t), o(null);
                return;
              }
            } catch (R) {
              i.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(S = R.message) !== null && S !== void 0 ? S : R.stack}`);
            }
            const O = (0, r.parseDn)(C.SignerCertificate.Subject);
            let I = !1;
            for (const R of n) {
              const w = (0, r.parseDn)(R);
              if (w.size ? I = Array.from(w.keys()).every((E) => w.get(E) === O.get(E)) : R === O.get("CN") && (i.warn(`Signature validated using only CN ${R}. Please add your full Distinguished Name (DN) to publisherNames configuration`), I = !0), I) {
                o(null);
                return;
              }
            }
          }
          const D = `publisherNames: ${n.join(" | ")}, raw info: ` + JSON.stringify(C, (O, I) => O === "RawData" ? void 0 : I, 2);
          i.warn(`Sign verification failed, installer signed with incorrect certificate: ${D}`), o(D);
        } catch (C) {
          a(i, C, null, t), o(null);
          return;
        }
      });
    });
  }
  function s(n) {
    const l = JSON.parse(n);
    delete l.PrivateKey, delete l.IsOSBinary, delete l.SignatureType;
    const i = l.SignerCertificate;
    return i != null && (delete i.Archived, delete i.Extensions, delete i.Handle, delete i.HasPrivateKey, delete i.SubjectName), l;
  }
  function a(n, l, i, o) {
    if (d()) {
      n.warn(`Cannot execute Get-AuthenticodeSignature: ${l || i}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    try {
      (0, c.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
    } catch (t) {
      n.warn(`Cannot execute ConvertTo-Json: ${t.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
      return;
    }
    l != null && o(l), i && o(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${i}. Failing signature validation due to unknown stderr.`));
  }
  function d() {
    const n = h.release();
    return n.startsWith("6.") && !n.startsWith("6.3");
  }
  return Mr;
}
var Rl;
function Cl() {
  if (Rl) return pr;
  Rl = 1, Object.defineProperty(pr, "__esModule", { value: !0 }), pr.NsisUpdater = void 0;
  const r = ke(), c = De, h = Gt(), u = cu(), f = Nt(), s = Ke(), a = /* @__PURE__ */ gt(), d = qf(), n = Mt;
  let l = class extends h.BaseUpdater {
    constructor(o, t) {
      super(o, t), this._verifyUpdateCodeSignature = (p, g) => (0, d.verifySignature)(p, g, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(o) {
      o && (this._verifyUpdateCodeSignature = o);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const t = o.updateInfoAndProvider.provider, p = (0, s.findFile)(t.resolveFiles(o.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: o,
        fileInfo: p,
        task: async (g, y, m, S) => {
          const C = p.packageInfo, D = C != null && m != null;
          if (D && o.disableWebInstaller)
            throw (0, r.newError)(`Unable to download new version ${o.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !D && !o.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (D || o.disableDifferentialDownload || await this.differentialDownloadInstaller(p, o, g, t, r.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(p.url, g, y);
          const O = await this.verifySignature(g);
          if (O != null)
            throw await S(), (0, r.newError)(`New version ${o.updateInfoAndProvider.info.version} is not signed by the application owner: ${O}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (D && await this.differentialDownloadWebPackage(o, C, m, t))
            try {
              await this.httpExecutor.download(new n.URL(C.path), m, {
                headers: o.requestHeaders,
                cancellationToken: o.cancellationToken,
                sha512: C.sha512
              });
            } catch (I) {
              try {
                await (0, a.unlink)(m);
              } catch {
              }
              throw I;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(o) {
      let t;
      try {
        if (t = (await this.configOnDisk.value).publisherName, t == null)
          return null;
      } catch (p) {
        if (p.code === "ENOENT")
          return null;
        throw p;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(t) ? t : [t], o);
    }
    doInstall(o) {
      const t = this.installerPath;
      if (t == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      const p = ["--updated"];
      o.isSilent && p.push("/S"), o.isForceRunAfter && p.push("--force-run"), this.installDirectory && p.push(`/D=${this.installDirectory}`);
      const g = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      g != null && p.push(`--package-file=${g}`);
      const y = () => {
        this.spawnLog(c.join(process.resourcesPath, "elevate.exe"), [t].concat(p)).catch((m) => this.dispatchError(m));
      };
      return o.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), y(), !0) : (this.spawnLog(t, p).catch((m) => {
        const S = m.code;
        this._logger.info(`Cannot run installer: error code: ${S}, error message: "${m.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), S === "UNKNOWN" || S === "EACCES" ? y() : S === "ENOENT" ? Dt.shell.openPath(t).catch((C) => this.dispatchError(C)) : this.dispatchError(m);
      }), !0);
    }
    async differentialDownloadWebPackage(o, t, p, g) {
      if (t.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new n.URL(t.path),
          oldFile: c.join(this.downloadedUpdateHelper.cacheDir, r.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: p,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: g.isUseMultipleRangeRequest,
          cancellationToken: o.cancellationToken
        };
        this.listenerCount(f.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (m) => this.emit(f.DOWNLOAD_PROGRESS, m)), await new u.FileWithEmbeddedBlockMapDifferentialDownloader(t, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return pr.NsisUpdater = l, pr;
}
var bl;
function Mf() {
  return bl || (bl = 1, function(r) {
    var c = St && St.__createBinding || (Object.create ? function(m, S, C, D) {
      D === void 0 && (D = C);
      var O = Object.getOwnPropertyDescriptor(S, C);
      (!O || ("get" in O ? !S.__esModule : O.writable || O.configurable)) && (O = { enumerable: !0, get: function() {
        return S[C];
      } }), Object.defineProperty(m, D, O);
    } : function(m, S, C, D) {
      D === void 0 && (D = C), m[D] = S[C];
    }), h = St && St.__exportStar || function(m, S) {
      for (var C in m) C !== "default" && !Object.prototype.hasOwnProperty.call(S, C) && c(S, m, C);
    };
    Object.defineProperty(r, "__esModule", { value: !0 }), r.NsisUpdater = r.MacUpdater = r.RpmUpdater = r.PacmanUpdater = r.DebUpdater = r.AppImageUpdater = r.Provider = r.NoOpLogger = r.AppUpdater = r.BaseUpdater = void 0;
    const u = /* @__PURE__ */ gt(), f = De;
    var s = Gt();
    Object.defineProperty(r, "BaseUpdater", { enumerable: !0, get: function() {
      return s.BaseUpdater;
    } });
    var a = ha();
    Object.defineProperty(r, "AppUpdater", { enumerable: !0, get: function() {
      return a.AppUpdater;
    } }), Object.defineProperty(r, "NoOpLogger", { enumerable: !0, get: function() {
      return a.NoOpLogger;
    } });
    var d = Ke();
    Object.defineProperty(r, "Provider", { enumerable: !0, get: function() {
      return d.Provider;
    } });
    var n = ml();
    Object.defineProperty(r, "AppImageUpdater", { enumerable: !0, get: function() {
      return n.AppImageUpdater;
    } });
    var l = vl();
    Object.defineProperty(r, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var i = yl();
    Object.defineProperty(r, "PacmanUpdater", { enumerable: !0, get: function() {
      return i.PacmanUpdater;
    } });
    var o = _l();
    Object.defineProperty(r, "RpmUpdater", { enumerable: !0, get: function() {
      return o.RpmUpdater;
    } });
    var t = Sl();
    Object.defineProperty(r, "MacUpdater", { enumerable: !0, get: function() {
      return t.MacUpdater;
    } });
    var p = Cl();
    Object.defineProperty(r, "NsisUpdater", { enumerable: !0, get: function() {
      return p.NsisUpdater;
    } }), h(Nt(), r);
    let g;
    function y() {
      if (process.platform === "win32")
        g = new (Cl()).NsisUpdater();
      else if (process.platform === "darwin")
        g = new (Sl()).MacUpdater();
      else {
        g = new (ml()).AppImageUpdater();
        try {
          const m = f.join(process.resourcesPath, "package-type");
          if (!(0, u.existsSync)(m))
            return g;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const S = (0, u.readFileSync)(m).toString().trim();
          switch (console.info("Found package-type:", S), S) {
            case "deb":
              g = new (vl()).DebUpdater();
              break;
            case "rpm":
              g = new (_l()).RpmUpdater();
              break;
            case "pacman":
              g = new (yl()).PacmanUpdater();
              break;
            default:
              break;
          }
        } catch (m) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", m.message);
        }
      }
      return g;
    }
    Object.defineProperty(r, "autoUpdater", {
      enumerable: !0,
      get: () => g || y()
    });
  }(St)), St;
}
var ct = Mf();
const fu = nt.dirname(oc(import.meta.url));
hc.config();
process.env.APP_ROOT = nt.join(fu, "..");
const Ot = process.env.VITE_DEV_SERVER_URL, Id = nt.join(process.env.APP_ROOT, "dist-electron"), Br = nt.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ot ? nt.join(process.env.APP_ROOT, "public") : Br;
let Fe;
function du() {
  Fe = new Dl({
    title: "Trackhounds",
    icon: nt.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: nt.join(fu, "preload.mjs")
    }
  }), Fe.webContents.on("did-finish-load", () => {
    Fe == null || Fe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ot ? Fe.loadURL(Ot) : Fe.loadFile(nt.join(Br, "index.html"));
}
const Bf = [
  {
    label: "Help",
    submenu: [
      {
        label: "Documentation",
        click: () => {
          Fe && Fe.loadURL(Ot ? `${Ot}#/documentation` : `file://${nt.join(Br, "index.html#/documentation")}`);
        }
      },
      {
        label: "About",
        click: () => {
          Fe && Fe.loadURL(Ot ? `${Ot}#/about` : `file://${nt.join(Br, "index.html#/about")}`);
        }
      }
    ]
  }
], Hf = Ol.buildFromTemplate(Bf);
Ol.setApplicationMenu(Hf);
ct.autoUpdater.autoDownload = !1;
ct.autoUpdater.autoInstallOnAppQuit = !0;
Hr.handle("check-for-updates", async () => {
  var r, c;
  try {
    const h = await ct.autoUpdater.checkForUpdates();
    return {
      updateAvailable: !!(h != null && h.updateInfo),
      version: ((r = h == null ? void 0 : h.updateInfo) == null ? void 0 : r.version) || null,
      releaseNotes: ((c = h == null ? void 0 : h.updateInfo) == null ? void 0 : c.releaseNotes) || null
    };
  } catch (h) {
    return console.error("Error checking for updates:", h), {
      updateAvailable: !1,
      error: h instanceof Error ? h.message : "Unknown error"
    };
  }
});
Hr.handle("download-update", async () => {
  try {
    const r = await ct.autoUpdater.downloadUpdate();
    return {
      success: !0,
      downloadedPath: Array.isArray(r) ? r.join(", ") : null
    };
  } catch (r) {
    return console.error("Error downloading update:", r), {
      success: !1,
      error: r instanceof Error ? r.message : "Unknown error"
    };
  }
});
Hr.on("install-update", () => {
  ct.autoUpdater.quitAndInstall(!1, !0);
});
Hr.handle("get-app-version", () => gr.getVersion());
ct.autoUpdater.on("update-available", (r) => {
  Fe && Fe.webContents.send("update-available", r);
});
ct.autoUpdater.on("update-not-available", (r) => {
  Fe && Fe.webContents.send("update-not-available", r);
});
ct.autoUpdater.on("download-progress", (r) => {
  Fe && Fe.webContents.send("download-progress", r);
});
ct.autoUpdater.on("update-downloaded", (r) => {
  Fe && Fe.webContents.send("update-downloaded", r);
});
gr.on("window-all-closed", () => {
  process.platform !== "darwin" && (gr.quit(), Fe = null);
});
gr.on("activate", () => {
  Dl.getAllWindows().length === 0 && du();
});
gr.whenReady().then(du);
export {
  Id as MAIN_DIST,
  Br as RENDERER_DIST,
  Ot as VITE_DEV_SERVER_URL
};
